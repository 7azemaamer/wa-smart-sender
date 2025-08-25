0. Master Context (paste first in any chat)

You are an expert Vue 3 + Vite + Tailwind v4 + GSAP developer and Arabic SEO content strategist.
Project: “WA Smart Sender” (Chrome extension for WhatsApp automation).
Site is Arabic‑first (RTL), responsive, modern, production‑grade performance.

Current stack/components (already built): Vue 3 (Composition API), Vite, Tailwind v4, GSAP animations, PrimeIcons, PNPM.
Done: Header.vue (fixed nav, blur), Hero.vue (animated), How.vue (features grid), global RTL, animations.

Your goals now:

Finish website pages & components (pricing, testimonials, FAQ, contact, blog, single post, docs).

Wire SEO (Arabic i18n meta, OpenGraph/Twitter, Sitemap, robots, canonical, JSON‑LD).

Add analytics + events (GA4).

Prepare content system (Markdown posts + TOC, CTA blocks, FAQ schema, breadcrumbs).

Produce a 90‑day Arabic content plan + on‑page templates for posts about WhatsApp & WAS.

Constraints:

Arabic RTL by default, Cairo font, primary color #1C75BC.

Lighthouse: LCP < 2.5s, CLS < 0.1, TBT < 200ms on mid‑range mobile.

Clean, accessible, semantic HTML.

No UI libraries beyond what’s listed (PrimeIcons ok).

Strong internal linking & schema.

1. Task: Project Structure & Routing (dev prompt)

Goal: Scaffold pages & routes with clean layout and shared SEO.

Do:

Create routes:

/ (Home), /was (Product), /pricing, /guides, /templates, /compare, /case-studies, /faq, /blog, /blog/:slug, /contact, /privacy, /terms.

Add layouts/Default.vue with Header/Footer/SkipToContent.

Add components/common:

AppSEO.vue (props: title, desc, canonical, image, lang="ar", dir="rtl")

Breadcrumbs.vue, SectionHeading.vue, Prose.vue, TOC.vue, CTAInline.vue, CTASticky.vue, FaqAccordion.vue, TestimonialCard.vue, PricingCard.vue, FeatureCard.vue, CopyCode.vue.

Tailwind v4 tokens in tailwind.config.js (colors, spacing, fontFamily = Cairo).

Global RTL utilities (logical properties: ps/pe, ms/me, start/end).

Add utils/formatters.ts (phone, dates), utils/seo.ts (meta builders).

Add plugins/gsap.ts (ScrollTrigger, safe SSR guards).

Create content/blog/\*.md loader via vite-plugin-md or a minimal MD loader (front‑matter: title, slug, excerpt, date, tags, cover).

Acceptance:

Running pnpm dev shows working routes, header active state, and shared layout.

Each page renders <AppSEO> with correct meta from page data.

2. Task: Core Pages & Sections (dev prompt)

Goal: Ship production‑ready sections.

Home (/)

Hero (exists) + trust badges (logos), primary CTA “جرّب WAS الآن” and secondary “تعرّف على المزايا”.

“كيف يعمل WAS؟” (exists) + “الحماية والامتثال” (random interval, نصوص عشوائية، إزالة التكرار).

“لمن هذا المنتج؟” (تجّار، دعم عملاء، مسوّقون).

“نتائج حقيقية” (3 case stats).

“أسئلة شائعة مختصرة” + button to /faq.

Sticky CTA on mobile.

Product (/was)

Detailed features: Bulk إرسال، متغيرات الرسائل، كتالوج، ردود تلقائية + AI، القوالب، التقارير، الأرقام المحظورة، الشروط المخصّصة.

Screenshots/GIFs placeholders.

Comparison grid vs بدائل (manual WA, excel scripts).

CTA to /pricing and Chrome Web Store listing (placeholder link).

Pricing (/pricing)

3 tiers (Basic, Pro, Business). Cards with monthly price, features, “الأكثر شيوعًا” badge.

FAQ specific to التسعير.

FAQ (/faq)

20 سؤال شائع، مع Schema FAQPage.

Blog (/blog) & Post (/blog/:slug)

List with search by tag (“واتساب للأعمال”, “أمان”, “حظر”, “قوالب”).

Single post layout: title, author, date, read‑time, TOC, headings, FAQs, CTA block.

Contact (/contact)

Form (name, email, الهاتف, الرسالة) + Netlify/Formspark/Simple backend placeholder.

Success state + GA event.

Compare (/compare)

WAS vs بدائل مع جدول ميزات.

Case Studies (/case-studies)

2–3 دراسات حالة قصيرة مع نتائج رقمية.

Acceptance:

All pages pass basic Lighthouse SEO & a11y checks.

Internal links between related pages exist.

3. Task: SEO & JSON‑LD (dev prompt)

Goal: robust Arabic SEO.

Do:

public/robots.txt, sitemap.xml (auto build from routes), canonical tags per page.

Meta helpers: title 60c, desc 155c, OG: image 1200x630, twitter: summary_large_image.

JSON‑LD snippets (inject with <script type="application/ld+json">):

SoftwareApplication (on /was):

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"SoftwareApplication",
  "name":"WA Smart Sender",
  "applicationCategory":"BrowserExtension",
  "operatingSystem":"Web",
  "offers":{
    "@type":"Offer",
    "price":"12.04",
    "priceCurrency":"USD",
    "availability":"https://schema.org/InStock"
  },
  "description":"إضافة كروم لأتمتة وتسويق واتساب: رسائل جماعية، ردود تلقائية بالذكاء الاصطناعي، قوالب وتقارير، وأمان عالي.",
  "url":"https://your-domain.com/was",
  "image":"https://your-domain.com/og/was.png",
  "aggregateRating":{
    "@type":"AggregateRating",
    "ratingValue":"4.8",
    "reviewCount":"127"
  }
}
</script>

BlogPosting (on post page):

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"BlogPosting",
  "headline":"{{title}}",
  "datePublished":"{{YYYY-MM-DD}}",
  "dateModified":"{{YYYY-MM-DD}}",
  "author":{"@type":"Person","name":"Hazem Aamer"},
  "publisher":{"@type":"Organization","name":"WA Smart Sender"},
  "image":"https://your-domain.com{{cover}}",
  "mainEntityOfPage":"https://your-domain.com/blog/{{slug}}",
  "description":"{{excerpt}}"
}
</script>

FAQPage (on /faq or inside post with FAQ section):

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"FAQPage",
  "mainEntity":[
    {"@type":"Question","name":"هل يسبب الإرسال الجماعي حظر حسابي؟",
     "acceptedAnswer":{"@type":"Answer","text":"استخدم فواصل زمنية عشوائية ونصوصًا متنوعة وتحقق من الأرقام لتقليل المخاطر."}}
  ]
}
</script>

BreadcrumbList (on post):

<script type="application/ld+json">
{
  "@context":"https://schema.org",
  "@type":"BreadcrumbList",
  "itemListElement":[
    {"@type":"ListItem","position":1,"name":"المدونة","item":"https://your-domain.com/blog"},
    {"@type":"ListItem","position":2,"name":"{{title}}","item":"https://your-domain.com/blog/{{slug}}"}
  ]
}
</script>

Acceptance:

/was, /blog/:slug, /faq validate in Rich Results Test.

sitemap.xml includes all routes.

4. Task: Performance & Analytics (dev prompt)

Goal: pass CWV and track leads.

Do:

Preload critical Cairo font (swap), compress images (WebP/AVIF), lazy‑load below‑the‑fold.

Defer non‑critical scripts. Use GSAP only on client & only where needed.

Add GA4 + events:

ga_event('cta_click', {location:'hero'})

ga_event('lead_submit', {source:'contact'})

ga_event('download_template', {file:'excel-template'})

Add @media (prefers-reduced-motion) to limit animations.

Acceptance:

Mobile Lighthouse: Perf ≥ 90, LCP < 2.5s, CLS < 0.1.

Events visible in GA4 debug.

5. Task: Content System (dev prompt)

Goal: Markdown blog with TOC, code, FAQ, CTA.

Do:

Configure MD loader to parse front‑matter:

---

title: "أمان الإرسال الجماعي في واتساب للأعمال: دليل شامل"
slug: "whatsapp-bulk-safety-guide"
excerpt: "كيف تُرسل رسائل جماعية بأمان دون حظر؟ أفضل الممارسات والإعدادات داخل WA Smart Sender."
date: "2025-08-24"
tags: ["واتساب", "أمان", "WA Smart Sender"]
cover: "/blog/whatsapp-bulk-safety/cover.jpg"
faq:

- q: "هل الحظر مضمون عند الإرسال الجماعي؟"
  a: "لا. يعتمد على السلوك—استخدم فواصل عشوائية ونصوص متنوعة وتحقق من الأرقام."
  cta:
  text: "جرّب WA Smart Sender الآن"
  href: "/pricing"

---

Generate TOC from h2/h3.

Auto‑inject FAQ schema if faq exists.

Render CTA blocks after H2 #2 and at the end.

Acceptance:

A sample post renders with TOC, FAQ, CTA, JSON‑LD.

6. Task: Legal & Trust (dev prompt)

Goal: add privacy/terms + trust badges.

Do:

/privacy, /terms basic Arabic pages.

“يعمل مع WhatsApp Web” (تحذير: أداة مستقلة غير تابعة لواتساب).

Add security note on safety page.

7. 90‑Day Arabic Content Plan (strategy prompt)

Goal: publish 2 posts/week (≈ 24 posts) + 2 cornerstones.

Cornerstones (6–8k words each):

الدليل الكامل للتسويق عبر واتساب للأعمال في 2025 (slug: whatsapp-business-2025-ar)

كل ما تحتاجه لتخصيص الرسائل باستخدام Excel والمتغيرات (slug: whatsapp-variables-excel-ar)

Supporting Articles (ideas & slugs):

مخاطر الحظر وكيف تتجنبها بفواصل زمنية عشوائية (avoid-ban-random-intervals)

القوالب الجاهزة لأتمتة الردود بالعربية (arabic-templates-auto-replies)

أفضل ممارسات التقارير وتتبع الأداء (was-reports-best-practices)

الفرق بين الردود بالكلمات المفتاحية والردود بالذكاء الاصطناعي (keyword-vs-ai-replies)

كيف تنظّف قوائم الأرقام وتزيل التكرارات (clean-numbers-deduplicate)

إرسال كتالوج المنتجات في واتساب خطوة بخطوة (send-catalog-messages)

شروط مخصصة لتجزئة العملاء حسب الدولة (custom-conditions-country)

حماية علامتك من الإبلاغات والسبام (protect-from-spam-reports)

مقارنة WAS مع البدائل (was-vs-alternatives)

دراسة حالة: زيادة التحويل 35% بحملة مخصّصة (case-study-segmentation-35)

… (أكمل حتى 24 مقالًا، ركّز على نوايا بحث: how‑to, best practices, comparison, templates)

Cadence:

أسبوع 1–2: Cornerstone #1 + 2 مقالات دعم

أسبوع 3–4: Cornerstone #2 + 2 مقالات دعم

الأسابيع 5–12: مقالتان أسبوعيًا + 1 دراسة حالة شهريًا

8. On‑Page Template (writer prompt)

Goal: consistent SEO pages in Arabic.

Instructions (for each article):

العنوان H1 ≤ 60 حرفًا، يتضمن الكلمة المفتاحية.

مقدّمة 120–160 كلمة توضّح المشكلة والحل.

بنية H2/H3 منطقية (لا تقفز في المستويات).

أمثلة عملية، خطوات مرقّمة، مقتطفات كود عند الحاجة.

قسم “أخطاء شائعة” + “تحسينات متقدمة”.

FAQ: 3–5 أسئلة قصيرة بإجابات مباشرة.

CTA: “حمّل قالب الرسائل” أو “جرّب WAS الآن”.

Meta:

Title: {{H1}} | WA Smart Sender

Description: 140–155 حرفًا، يتضمن فائدة واضحة.

Slug قصير، عربي بدون تشكيل أو إنجليزي مفهوم.

Mini‑outline (copy this and fill):

# {{H1}}

مقدّمة (120–160 كلمة)

## ما هو {{الموضوع}}؟

تعريف سريع + لماذا يهم الأنشطة التجارية؟

## الخطوات العملية

1. ...
2. ...
3. ...

## أفضل الممارسات

- ...
- ...

## أخطاء شائعة وكيف تتجنبها

- خطأ: ...
- الصواب: ...

## أسئلة شائعة

### س: ...

ج: ...

### س: ...

ج: ...

## خاتمة + CTA

9. Article Brief Generator (prompt you can reuse)

Prompt:
“أنشئ لي موجز كتابة عربي لمقال بعنوان: {{العنوان}}. الجمهور: أصحاب متاجر وفرق دعم. الهدف: ترتيب على الكلمات: {{قائمة كلمات}}. طول: 1500–2200 كلمة. الصيغة: مقدّمة، تعريف، خطوات عملية، أفضل ممارسات، أخطاء شائعة، FAQ (5)، خاتمة + CTA. اقترح عناوين H2/H3، أسئلة FAQ، وزوايا أمثلة عمليّة داخل WA Smart Sender. أعطني أيضًا Title/Meta Description وSlug مُقترح.”

10. Sample First Article Start (paste and expand)

Title: أمان الإرسال الجماعي في واتساب للأعمال: دليل شامل
Slug: whatsapp-bulk-safety-guide
Meta Description: تعرّف على أفضل طرق إرسال الرسائل الجماعية في واتساب دون حظر: فواصل زمنية عشوائية، نصوص متغيّرة، إزالة التكرارات، والتحقق من الأرقام—مع تطبيق عملي داخل WA Smart Sender.

H2s/H3s suggested:

لماذا يحدث الحظر؟ (سلوكيات تُشبه السبام / معدّل الشكاوى / تكرار الرسائل)

إعداد الفواصل العشوائية داخل WAS (10–20 ثانية مثال)

نصوص عشوائية ومتغيرات [name] و{date} لتقليل التكرار

تنظيف القوائم: إزالة الأرقام المكرّرة والمحظورة

مؤشرات أداء يجب مراقبتها في التقارير (نسبة تسليم/ردّ/حظر)

أخطاء شائعة (إعادة استخدام نفس النص/إرسال دفعات كبيرة فجأة…)

أسئلة شائعة (5)

CTA: “جرّب WAS الآن” + رابط /pricing

11. CTAs & Lead Magnets (copy blocks)

Inline CTA:
“هل تريد نموذج رسالة جاهزة للحملات؟ حمّل القالب المجاني وشاهد الفرق.” → /templates

Sticky CTA (mobile):
Button: “ابدأ التجربة الآن”

Lead Magnet PDF:
“قائمة التحقق للأمان في واتساب: 12 خطوة لتجنّب الحظر” (أرسل بعد الاشتراك بالبريد)

12. Acceptance Checklist (final QA prompt)

جميع الصفحات تعمل وتحتوي على <AppSEO> بمعلومات عربية صحيحة

JSON‑LD يظهر لـ SoftwareApplication/BlogPosting/FAQ/Breadcrumb

sitemap.xml و robots.txt صحيحان

قياسات CWV على موبايل ضمن الحدود

المقالة الأولى منشورة مع TOC وFAQ وCTA

أحداث GA4 للـ CTA والـ Leads تعمل

روابط داخلية بين المقالات والمنتج والتسعير موجودة

نصوص واضحة ولهجة عربية مهنية مبسطة (بدون تعقيد)
