const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:1337/api";
const IMG_BASE_URL =
  import.meta.env.VITE_APP_IMG_URL || "http://localhost:1337";
class ApiService {
  async get(endpoint) {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("API Error:", error);
      throw error;
    }
  }

  // Articles API
  async getArticles(params = {}) {
    const queryParams = new URLSearchParams(params).toString();
    const url = queryParams 
      ? `/articles?populate=*&${queryParams}`
      : '/articles?populate=*';
    return this.get(url);
  }

  async getArticle(slug) {
    return this.get(`/articles?filters[slug][$eq]=${slug}&populate=*`);
  }

  async getFeaturedArticles() {
    return this.get(
      "/articles?filters[featured][$eq]=true&populate=*&sort[0]=publishedDate:desc"
    );
  }

  // Guides API
  async getGuides() {
    return this.get("/guides?populate=*&sort[0]=order:asc");
  }

  async getGuide(slug) {
    return this.get(`/guides?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Video Guides API
  async getVideoGuides() {
    return this.get("/video-guides?populate=*&sort[0]=order:asc");
  }

  async getVideoGuide(slug) {
    return this.get(`/video-guides?filters[slug][$eq]=${slug}&populate=*`);
  }

  // Authors API
  async getAuthors() {
    return this.get("/authors?populate=*");
  }

  // Categories API
  async getCategories() {
    return this.get("/categories?populate=*");
  }

  // Search functionality
  async searchArticles(query) {
    return this.get(
      `/articles?filters[$or][0][title][$containsi]=${query}&filters[$or][1][excerpt][$containsi]=${query}&populate=*`
    );
  }

  // Contact form submission
  async submitContactForm(formData) {
    try {
      const response = await fetch(`${API_BASE_URL}/contacts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: formData
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Contact form submission error:', error);
      throw error;
    }
  }

  getImageUrl(image) {
    if (!image) return "/images/placeholder.jpg";
    if (typeof image === "string") return image;
    if (image.url) {
      return `${IMG_BASE_URL}${image.url}`;
    }
    if (image.data?.attributes?.url) {
      return `${IMG_BASE_URL}${image.data.attributes.url}`;
    }
    return "/images/placeholder.jpg";
  }

  //  format article data
  formatArticle(article) {
    const data = article.attributes || article;

    return {
      id: article.id,
      title: data.title,
      excerpt: data.excerpt,
      slug: data.slug,
      content: data.content,
      readTime: data.readTime || "5 دقائق",
      wordCount: data.wordCount || 0,
      tags: data.tags || [],
      featured: data.featured || false,
      publishedDate: data.publishedDate || data.publishedAt,
      cover: this.getImageUrl(data.cover),
      author: data.author
        ? {
            name: data.author.name,
            bio: data.author.bio,
            avatar: this.getImageUrl(data.author.avatar),
          }
        : null,
      category: data.category
        ? {
            name: data.category.name,
            slug: data.category.slug,
          }
        : null,
      faqs: data.faqs || [],
      relatedArticles:
        data.relatedArticles?.map((related) => this.formatArticle(related)) ||
        [],
    };
  }

  //format guide data
  formatGuide(guide) {
    const data = guide.attributes || guide;

    return {
      id: guide.id,
      title: data.title,
      description: data.description,
      icon: data.icon || "pi pi-book",
      difficulty: data.difficulty || "مبتدئ",
      duration: data.duration || "5 دقائق",
      steps: data.steps || 1,
      slug: data.slug,
      content: data.content,
      featured: data.featured || false,
      order: data.order || 0,
    };
  }

  formatVideoGuide(videoGuide) {
    const data = videoGuide.attributes || videoGuide;

    return {
      id: videoGuide.id,
      title: data.title,
      description: data.description,
      thumbnail: this.getImageUrl(data.thumbnail),
      duration: data.duration || "0:00",
      views: data.views || "0",
      videoUrl: data.videoUrl || "#",
      slug: data.slug,
      featured: data.featured || false,
      isComingSoon: data.isComingSoon || true,
      order: data.order || 0,
    };
  }
}

export default new ApiService();
