<script setup>
import { ref, computed, onMounted } from "vue";
import { RouterLink } from "vue-router";
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import ApiService from "@/utils/api.js";

const posts = ref([]);
const loading = ref(true);
const error = ref(null);

const selectedTag = ref("");
const searchQuery = ref("");

const availableTags = computed(() => {
  const tags = new Set();
  posts.value.forEach((post) => {
    post.tags.forEach((tag) => tags.add(tag));
  });
  return Array.from(tags).sort();
});

const filteredPosts = computed(() => {
  let filtered = posts.value;

  if (selectedTag.value) {
    filtered = filtered.filter((post) => post.tags.includes(selectedTag.value));
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (post) =>
        post.title.toLowerCase().includes(query) ||
        post.excerpt.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
    );
  }

  return filtered;
});

const featuredPosts = computed(() => {
  return posts.value.filter((post) => post.featured);
});

const clearFilters = () => {
  selectedTag.value = "";
  searchQuery.value = "";
};

// Fetch articles from Strapi
const fetchArticles = async () => {
  try {
    loading.value = true;
    error.value = null;
    const response = await ApiService.getArticles();
    posts.value = response.data.map(article => ApiService.formatArticle(article));
  } catch (err) {
    error.value = 'حدث خطأ في تحميل المقالات';
    console.error('Error fetching articles:', err);
    // Fallback to empty array if API fails
    posts.value = [];
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchArticles();
});
</script>

<template>
  <AppSEO
    title="مدونة WA Smart Sender - نصائح وأدلة أتمتة واتساب"
    description="اكتشف أحدث النصائح والأدلة لأتمتة واتساب، استراتيجيات التسويق، وأفضل الممارسات لتحسين حملاتك التسويقية."
    canonical="/blog"
    image="/og/blog.png"
  />

  <div class="">
    <!-- Hero Section -->
    <section class="py-4 md:py-12">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="مدونة WA Smart Sender"
          subtitle="نصائح وأدلة متخصصة في أتمتة واتساب والتسويق الرقمي"
          size="xl"
          class="mb-12"
        />

        <!-- Search and Filter -->
        <div class="max-w-2xl mx-auto">
          <div class="flex flex-col sm:flex-row gap-4 mb-8">
            <div class="flex-1">
              <input
                v-model="searchQuery"
                type="text"
                placeholder="ابحث في المقالات..."
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
              />
            </div>
            <select
              v-model="selectedTag"
              class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
            >
              <option value="">جميع المواضيع</option>
              <option v-for="tag in availableTags" :key="tag" :value="tag">
                {{ tag }}
              </option>
            </select>
          </div>

          <!-- Active Filters -->
          <div
            v-if="selectedTag || searchQuery"
            class="flex items-center gap-2 mb-8"
          >
            <span class="text-sm text-gray-600">الفلاتر النشطة:</span>
            <span
              v-if="selectedTag"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#489f9120] text-[#489f91]"
            >
              {{ selectedTag }}
              <button
                @click="selectedTag = ''"
                class="ms-2 text-[#489f91] hover:text-[#3d8a7d]"
              >
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <span
              v-if="searchQuery"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-[#489f9120] text-[#489f91]"
            >
              "{{ searchQuery }}"
              <button
                @click="searchQuery = ''"
                class="ms-2 text-green-600 hover:text-green-800"
              >
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <button
              @click="clearFilters"
              class="text-sm text-gray-500 hover:text-gray-700 underline"
            >
              مسح الكل
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Posts -->
    <section v-if="!selectedTag && !searchQuery" class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-gray-900">المقالات المميزة</h2>
          <div class="w-16 h-1 bg-[#489f91] rounded"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="post in featuredPosts.slice(0, 2)"
            :key="post.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
          >
            <div
              class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden"
            >
              <img 
                v-if="post.cover && post.cover !== '/images/placeholder.jpg'"
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover"
                @error="$event.target.style.display = 'none'"
              />
              <div v-else class="text-center text-gray-500">
                <i class="pi pi-image text-4xl mb-4"></i>
                <p>صورة المقال</p>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span class="flex items-center">
                  <i class="pi pi-calendar me-2"></i>
                  {{ new Date(post.publishedDate).toLocaleDateString("ar-SA") }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-2"></i>
                  {{ post.readTime }}
                </span>
              </div>

              <h3
                class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-[#489f91] transition-colors leading-tight"
              >
                {{ post.title }}
              </h3>

              <p class="text-gray-600 mb-6 leading-relaxed">
                {{ post.excerpt }}
              </p>

              <div class="flex items-center justify-between">
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="tag in post.tags.slice(0, 2)"
                    :key="tag"
                    class="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                  >
                    {{ tag }}
                  </span>
                </div>
                <RouterLink
                  :to="`/blog/${post.slug}`"
                  class="inline-flex items-center text-[#489f91] hover:text-[#489f91] font-medium"
                >
                  اقرأ المزيد
                  <i class="pi pi-arrow-left ms-2"></i>
                </RouterLink>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- All Posts -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-gray-900">
            {{ selectedTag || searchQuery ? "نتائج البحث" : "جميع المقالات" }}
          </h2>
          <span class="text-gray-600" v-if="!loading">{{ filteredPosts.length }} مقال</span>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="text-center py-16">
          <i class="pi pi-spinner pi-spin text-6xl text-[#489f91] mb-6"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">
            جاري تحميل المقالات...
          </h3>
        </div>

        <!-- Error State -->
        <div v-else-if="error" class="text-center py-16">
          <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-6"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">
            {{ error }}
          </h3>
          <button @click="fetchArticles" class="btn btn-primary">
            <i class="pi pi-refresh me-2"></i>
            إعادة المحاولة
          </button>
        </div>

        <!-- No Results -->
        <div v-else-if="filteredPosts.length === 0" class="text-center py-16">
          <i class="pi pi-search text-6xl text-gray-400 mb-6"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">
            لم نجد أي مقالات
          </h3>
          <p class="text-gray-600 mb-6">جرب كلمات بحث أخرى أو امسح الفلاتر</p>
          <button @click="clearFilters" class="btn btn-primary">
            <i class="pi pi-refresh me-2"></i>
            مسح الفلاتر
          </button>
        </div>

        <div
          v-else
          class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
          >
            <div
              class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center overflow-hidden"
            >
              <img 
                v-if="post.cover && post.cover !== '/images/placeholder.jpg'"
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover"
                @error="$event.target.style.display = 'none'"
              />
              <div v-else class="text-center text-gray-500">
                <i class="pi pi-image text-3xl mb-2"></i>
                <p class="text-xs">صورة المقال</p>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <span class="flex items-center">
                  <i class="pi pi-calendar me-1"></i>
                  {{ new Date(post.publishedDate).toLocaleDateString("ar-SA") }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-1"></i>
                  {{ post.readTime }}
                </span>
              </div>

              <h3
                class="text-lg font-bold text-gray-900 mb-3 group-hover:text-[#489f91] transition-colors leading-tight"
              >
                {{ post.title }}
              </h3>

              <p
                class="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3"
              >
                {{ post.excerpt }}
              </p>

              <div class="flex flex-wrap gap-1 mb-4">
                <span
                  v-for="tag in post.tags.slice(0, 2)"
                  :key="tag"
                  class="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                >
                  {{ tag }}
                </span>
                <span
                  v-if="post.tags.length > 2"
                  class="px-2 py-1 text-gray-500 text-xs"
                >
                  +{{ post.tags.length - 2 }}
                </span>
              </div>

              <RouterLink
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-[#489f91] hover:text-[#489f91] font-medium text-sm"
              >
                اقرأ المقال
                <i class="pi pi-arrow-left ms-2"></i>
              </RouterLink>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Subscribe -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <div
          class="bg-gradient-to-r from-[#489f91] to-[#489f91] rounded-2xl p-12 text-white text-center"
        >
          <h2 class="text-3xl font-bold mb-4">اشترك في النشرة الإخبارية</h2>
          <p class="text-xl mb-8 opacity-90">
            احصل على أحدث النصائح والأدلة في أتمتة واتساب مباشرة في بريدك
            الإلكتروني
          </p>
          <div class="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="بريدك الإلكتروني"
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none placeholder:text-white border border-gray-300"
            />
            <button
              class="btn bg-white text-[#489f91] hover:bg-gray-100 px-6 py-3 whitespace-nowrap"
            >
              اشترك الآن
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
