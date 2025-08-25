// SEO utility functions for meta tag generation

/**
 * Generate a properly formatted page title
 * @param {string} title - Page specific title
 * @param {boolean} includeBrand - Whether to include brand name
 * @returns {string} Formatted title
 */
export const generateTitle = (title, includeBrand = true) => {
  const brand = 'WA Smart Sender'
  if (!includeBrand || title.includes(brand)) {
    return title
  }
  return `${title} | ${brand}`
}

/**
 * Truncate description to SEO-friendly length
 * @param {string} description - Description text
 * @param {number} maxLength - Maximum length (default: 155)
 * @returns {string} Truncated description
 */
export const generateDescription = (description, maxLength = 155) => {
  if (description.length <= maxLength) {
    return description
  }
  return description.substring(0, maxLength - 3).trim() + '...'
}

/**
 * Generate canonical URL
 * @param {string} path - Page path
 * @param {string} baseUrl - Base URL (default from environment)
 * @returns {string} Full canonical URL
 */
export const generateCanonical = (path, baseUrl = 'https://your-domain.com') => {
  return `${baseUrl}${path.startsWith('/') ? path : `/${path}`}`
}

/**
 * Generate Open Graph image URL
 * @param {string} imagePath - Image path
 * @param {string} baseUrl - Base URL
 * @returns {string} Full image URL
 */
export const generateOGImage = (imagePath, baseUrl = 'https://your-domain.com') => {
  if (imagePath.startsWith('http')) {
    return imagePath
  }
  return `${baseUrl}${imagePath.startsWith('/') ? imagePath : `/${imagePath}`}`
}

/**
 * Generate structured data for blog posts
 * @param {Object} post - Blog post data
 * @returns {Object} BlogPosting JSON-LD
 */
export const generateBlogPostJsonLD = (post) => {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "datePublished": post.date,
    "dateModified": post.updatedAt || post.date,
    "author": {
      "@type": "Person",
      "name": post.author || "Hazem Aamer"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WA Smart Sender",
      "logo": {
        "@type": "ImageObject",
        "url": "https://your-domain.com/images/logo.png"
      }
    },
    "image": generateOGImage(post.cover || '/og/blog-default.png'),
    "mainEntityOfPage": generateCanonical(`/blog/${post.slug}`),
    "description": post.excerpt,
    "keywords": post.tags?.join(', ') || '',
    "wordCount": post.wordCount || undefined,
    "timeRequired": post.readTime || undefined
  }
}

/**
 * Generate FAQ Page structured data
 * @param {Array} faqs - Array of FAQ objects
 * @returns {Object} FAQPage JSON-LD
 */
export const generateFAQJsonLD = (faqs) => {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  }
}

/**
 * Generate breadcrumb structured data
 * @param {Array} breadcrumbs - Array of breadcrumb objects
 * @returns {Object} BreadcrumbList JSON-LD
 */
export const generateBreadcrumbJsonLD = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": generateCanonical(item.path)
    }))
  }
}

/**
 * Generate software application structured data
 * @param {Object} app - Application data
 * @returns {Object} SoftwareApplication JSON-LD
 */
export const generateSoftwareApplicationJsonLD = (app = {}) => {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": app.name || "WA Smart Sender",
    "applicationCategory": app.category || "BrowserExtension",
    "operatingSystem": app.os || "Web",
    "offers": {
      "@type": "Offer",
      "price": app.price || "12.04",
      "priceCurrency": app.currency || "USD",
      "availability": "https://schema.org/InStock"
    },
    "description": app.description || "إضافة كروم لأتمتة وتسويق واتساب: رسائل جماعية، ردود تلقائية بالذكاء الاصطناعي، قوالب وتقارير، وأمان عالي.",
    "url": generateCanonical('/was'),
    "image": generateOGImage(app.image || '/og/was.png'),
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": app.rating || "4.8",
      "reviewCount": app.reviews || "127"
    },
    "author": {
      "@type": "Person",
      "name": "Hazem Aamer"
    },
    "datePublished": app.publishDate || "2025-01-01",
    "softwareVersion": app.version || "1.0.0"
  }
}

/**
 * Extract headings from HTML content for TOC generation
 * @param {string} htmlContent - HTML content
 * @returns {Array} Array of heading objects
 */
export const extractHeadings = (htmlContent) => {
  const headings = []
  const headingRegex = /<h([2-6])[^>]*id="([^"]*)"[^>]*>(.*?)<\/h[2-6]>/gi
  let match
  
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    headings.push({
      level: parseInt(match[1]),
      id: match[2],
      text: match[3].replace(/<[^>]*>/g, '').trim()
    })
  }
  
  return headings
}

/**
 * Generate a URL-friendly slug from text
 * @param {string} text - Text to convert
 * @returns {string} URL-friendly slug
 */
export const generateSlug = (text) => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[\s\u0600-\u06FF]+/g, '-') // Replace Arabic characters and spaces with hyphens
    .replace(/[^\w\-]+/g, '') // Remove non-word characters
    .replace(/\-\-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-+/, '') // Remove leading hyphens
    .replace(/-+$/, '') // Remove trailing hyphens
}

/**
 * Validate and format phone numbers
 * @param {string} phone - Phone number
 * @returns {string} Formatted phone number
 */
export const formatPhone = (phone) => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Saudi Arabia format
  if (cleaned.startsWith('966')) {
    return `+966 ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  
  // Generic international format
  if (cleaned.length > 10) {
    return `+${cleaned.slice(0, 3)} ${cleaned.slice(3, 5)} ${cleaned.slice(5, 8)} ${cleaned.slice(8)}`
  }
  
  return phone
}

/**
 * Format dates for Arabic locale
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date
 */
export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('ar-SA', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}