import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");

const SITE_URL = (process.env.SITE_URL || "https://wsmartsender.com").replace(
  /\/+$/,
  ""
);
const STRAPI_API_BASE = (
  process.env.SITEMAP_STRAPI_API_BASE ||
  process.env.VITE_API_BASE_URL ||
  "https://strapi.wsmartsender.com/api"
).replace(/\/+$/, "");
const PAGE_SIZE = 100;

const STRICT_MODE =
  process.argv.includes("--strict") || process.env.SITEMAP_STRICT === "1";

const XML_NS = {
  sitemap: "http://www.sitemaps.org/schemas/sitemap/0.9",
  news: "http://www.google.com/schemas/sitemap-news/0.9",
  xhtml: "http://www.w3.org/1999/xhtml",
  mobile: "http://www.google.com/schemas/sitemap-mobile/1.0",
  image: "http://www.google.com/schemas/sitemap-image/1.1",
  video: "http://www.google.com/schemas/sitemap-video/1.1",
};

const STATIC_ROUTES = [
  { path: "/", changefreq: "daily", priority: "1.0" },
  { path: "/was", changefreq: "weekly", priority: "0.9" },
  { path: "/pricing", changefreq: "daily", priority: "0.85" },
  { path: "/faq", changefreq: "weekly", priority: "0.7" },
  { path: "/blog", changefreq: "daily", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.6" },
  { path: "/compare", changefreq: "weekly", priority: "0.7" },
  { path: "/case-studies", changefreq: "weekly", priority: "0.7" },
  { path: "/guides", changefreq: "daily", priority: "0.8" },
  { path: "/templates", changefreq: "weekly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

function toIsoDate(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return new Date().toISOString().slice(0, 10);
  }
  return date.toISOString().slice(0, 10);
}

function escapeXml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

function toAbsoluteUrl(pathname) {
  if (!pathname) return SITE_URL;
  if (pathname.startsWith("http://") || pathname.startsWith("https://")) {
    return pathname;
  }
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${SITE_URL}${normalized}`;
}

function normalizeStrapiItem(item) {
  if (!item || typeof item !== "object") return {};
  return item.attributes && typeof item.attributes === "object"
    ? item.attributes
    : item;
}

async function fetchJson(url, timeoutMs = 20000) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(url, {
      method: "GET",
      headers: { Accept: "application/json" },
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status} for ${url}`);
    }
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

async function fetchCollectionSlugs(collection) {
  const results = [];
  let page = 1;
  let pageCount = 1;

  while (page <= pageCount) {
    const params = new URLSearchParams();
    params.set("pagination[page]", String(page));
    params.set("pagination[pageSize]", String(PAGE_SIZE));
    params.set("sort[0]", "updatedAt:desc");
    params.set("fields[0]", "slug");
    params.set("fields[1]", "updatedAt");
    params.set("fields[2]", "publishedAt");
    params.set("fields[3]", "createdAt");
    params.set("filters[slug][$notNull]", "true");
    params.set("filters[slug][$ne]", "");

    const url = `${STRAPI_API_BASE}/${collection}?${params.toString()}`;
    const json = await fetchJson(url);
    const data = Array.isArray(json?.data) ? json.data : [];
    const metaPageCount = Number(json?.meta?.pagination?.pageCount || 1);
    pageCount = Number.isFinite(metaPageCount) ? metaPageCount : 1;

    for (const raw of data) {
      const item = normalizeStrapiItem(raw);
      const slug = String(item?.slug || "").trim();
      if (!slug) continue;
      const lastmod = toIsoDate(item.updatedAt || item.publishedAt || item.createdAt);
      results.push({ slug, lastmod });
    }

    page += 1;
  }

  return results;
}

function buildSitemapXml(entries) {
  const lines = [];
  lines.push('<?xml version="1.0" encoding="UTF-8"?>');
  lines.push(
    `<urlset xmlns="${XML_NS.sitemap}" xmlns:news="${XML_NS.news}" xmlns:xhtml="${XML_NS.xhtml}" xmlns:mobile="${XML_NS.mobile}" xmlns:image="${XML_NS.image}" xmlns:video="${XML_NS.video}">`
  );

  for (const entry of entries) {
    lines.push("  <url>");
    lines.push(`    <loc>${escapeXml(entry.loc)}</loc>`);
    lines.push(`    <lastmod>${escapeXml(entry.lastmod)}</lastmod>`);
    lines.push(`    <changefreq>${escapeXml(entry.changefreq)}</changefreq>`);
    lines.push(`    <priority>${escapeXml(entry.priority)}</priority>`);
    lines.push("  </url>");
  }

  lines.push("</urlset>");
  return `${lines.join("\n")}\n`;
}

function dedupeEntries(entries) {
  const seen = new Set();
  const unique = [];

  for (const entry of entries) {
    if (!entry?.loc || seen.has(entry.loc)) continue;
    seen.add(entry.loc);
    unique.push(entry);
  }

  return unique;
}

async function writeSitemap(xml) {
  const publicPath = path.join(projectRoot, "public", "sitemap.xml");
  const distPath = path.join(projectRoot, "dist", "sitemap.xml");

  await fs.writeFile(publicPath, xml, "utf8");

  try {
    await fs.access(path.join(projectRoot, "dist"));
    await fs.writeFile(distPath, xml, "utf8");
  } catch {
    // dist may not exist before the first build.
  }

  return { publicPath, distPath };
}

async function generate() {
  const now = toIsoDate(new Date());
  const entries = [];

  for (const route of STATIC_ROUTES) {
    entries.push({
      loc: toAbsoluteUrl(route.path),
      lastmod: now,
      changefreq: route.changefreq,
      priority: route.priority,
    });
  }

  let guideSlugs = [];
  let articleSlugs = [];

  try {
    guideSlugs = await fetchCollectionSlugs("guides");
  } catch (error) {
    console.error(`[sitemap] Failed to load guides: ${error.message}`);
    if (STRICT_MODE) throw error;
  }

  try {
    articleSlugs = await fetchCollectionSlugs("articles");
  } catch (error) {
    console.error(`[sitemap] Failed to load articles: ${error.message}`);
    if (STRICT_MODE) throw error;
  }

  for (const item of guideSlugs) {
    entries.push({
      loc: toAbsoluteUrl(`/guides/${item.slug}`),
      lastmod: item.lastmod,
      changefreq: "monthly",
      priority: "0.7",
    });
  }

  for (const item of articleSlugs) {
    entries.push({
      loc: toAbsoluteUrl(`/blog/${item.slug}`),
      lastmod: item.lastmod,
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  const deduped = dedupeEntries(entries);
  const xml = buildSitemapXml(deduped);
  const { publicPath, distPath } = await writeSitemap(xml);

  console.log(`[sitemap] Generated ${deduped.length} URLs`);
  console.log(`[sitemap] Source API: ${STRAPI_API_BASE}`);
  console.log(`[sitemap] Wrote: ${publicPath}`);
  console.log(`[sitemap] Wrote (if exists): ${distPath}`);
}

generate().catch((error) => {
  console.error(`[sitemap] Generation failed: ${error.message}`);
  if (STRICT_MODE) {
    process.exit(1);
  }
  process.exit(0);
});
