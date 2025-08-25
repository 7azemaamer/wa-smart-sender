export const generateTitle = (title, includeBrand = true) => {
  const brand = "WA Smart Sender";
  if (!includeBrand || title.includes(brand)) {
    return title;
  }
  return `${title} | ${brand}`;
};

export const generateDescription = (description, maxLength = 155) => {
  if (description.length <= maxLength) {
    return description;
  }
  return description.substring(0, maxLength - 3).trim() + "...";
};

export const generateCanonical = (path, baseUrl = "https://was.sa") => {
  return `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;
};

export const generateOGImage = (
  imagePath,
  baseUrl = "https://wsmartsender.com"
) => {
  if (imagePath.startsWith("http")) {
    return imagePath;
  }
  return `${baseUrl}${imagePath.startsWith("/") ? imagePath : `/${imagePath}`}`;
};

export const generateBlogPostJsonLD = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    datePublished: post.date,
    dateModified: post.updatedAt || post.date,
    author: {
      "@type": "Person",
      name: post.author || "Hazem Aamer",
    },
    publisher: {
      "@type": "Organization",
      name: "WA Smart Sender",
      logo: {
        "@type": "ImageObject",
        url: "https://wsmartsender.com/images/logo.png",
      },
    },
    image: generateOGImage(post.cover || "/og/blog-default.png"),
    mainEntityOfPage: generateCanonical(`/blog/${post.slug}`),
    description: post.excerpt,
    keywords: post.tags?.join(", ") || "",
    wordCount: post.wordCount || undefined,
    timeRequired: post.readTime || undefined,
  };
};

export const generateFAQJsonLD = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
};

export const generateBreadcrumbJsonLD = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: generateCanonical(item.path),
    })),
  };
};

export const generateSoftwareApplicationJsonLD = (app = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: app.name || "WA Smart Sender",
    applicationCategory: app.category || "BrowserExtension",
    operatingSystem: app.os || "Web",
    offers: {
      "@type": "Offer",
      price: app.price || "12.04",
      priceCurrency: app.currency || "USD",
      availability: "https://schema.org/InStock",
    },
    description:
      app.description ||
      "إضافة كروم لأتمتة وتسويق واتساب: رسائل جماعية، ردود تلقائية بالذكاء الاصطناعي، قوالب وتقارير، وأمان عالي.",
    url: generateCanonical("/was"),
    image: generateOGImage(app.image || "/og/was.png"),
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: app.rating || "4.8",
      reviewCount: app.reviews || "127",
    },
    author: {
      "@type": "Person",
      name: "Hazem Aamer",
    },
    datePublished: app.publishDate || "2025-01-01",
    softwareVersion: app.version || "1.0.0",
  };
};

export const extractHeadings = (htmlContent) => {
  const headings = [];
  const headingRegex = /<h([2-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-6]>/gi;
  let match;

  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, "").trim(),
    });
  }

  return headings;
};

export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\u0600-\u06FF]+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
};

export const formatPhone = (phone) => {
  const cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("966")) {
    return `+966 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(
      8
    )}`;
  }

  if (cleaned.length > 10) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(
      5,
      8
    )} ${cleaned.slice(8)}`;
  }

  return phone;
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};
