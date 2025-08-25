<script setup>
import { ref, computed } from "vue";
import { RouterLink } from "vue-router";
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";

const posts = ref([
  {
    id: 1,
    title: "أمان الإرسال الجماعي في واتساب للأعمال: دليل شامل",
    slug: "whatsapp-bulk-safety-guide",
    excerpt:
      "كيف تُرسل رسائل جماعية بأمان دون حظر؟ أفضل الممارسات والإعدادات داخل WA Smart Sender.",
    date: "2025-08-24",
    tags: ["واتساب", "أمان", "WA Smart Sender"],
    cover: "/blog/whatsapp-bulk-safety/cover.jpg",
    readTime: "5 دقائق",
    author: "Hazem Aamer",
    featured: true,
  },
  {
    id: 2,
    title: "القوالب الجاهزة لأتمتة الردود بالعربية",
    slug: "arabic-templates-auto-replies",
    excerpt:
      "مجموعة من أفضل قوالب الردود التلقائية باللغة العربية لتحسين تفاعل العملاء.",
    date: "2025-08-20",
    tags: ["قوالب", "ردود تلقائية", "خدمة العملاء"],
    cover: "/blog/arabic-templates/cover.jpg",
    readTime: "7 دقائق",
    author: "Hazem Aamer",
    featured: false,
  },
  {
    id: 3,
    title: "أفضل ممارسات التقارير وتتبع الأداء",
    slug: "was-reports-best-practices",
    excerpt:
      "كيفية قراءة وتحليل تقارير WA Smart Sender لتحسين حملاتك التسويقية.",
    date: "2025-08-18",
    tags: ["تقارير", "تحليلات", "أداء"],
    cover: "/blog/reports-best-practices/cover.jpg",
    readTime: "6 دقائق",
    author: "Hazem Aamer",
    featured: true,
  },
  {
    id: 4,
    title: "الفرق بين الردود بالكلمات المفتاحية والردود بالذكاء الاصطناعي",
    slug: "keyword-vs-ai-replies",
    excerpt:
      "دليل مقارن لفهم متى تستخدم الردود بالكلمات المفتاحية أو الذكاء الاصطناعي.",
    date: "2025-08-15",
    tags: ["ذكاء اصطناعي", "ردود تلقائية", "مقارنة"],
    cover: "/blog/keyword-vs-ai/cover.jpg",
    readTime: "4 دقائق",
    author: "Hazem Aamer",
    featured: false,
  },
  {
    id: 5,
    title: "كيف تنظّف قوائم الأرقام وتزيل التكرارات",
    slug: "clean-numbers-deduplicate",
    excerpt:
      "خطوات عملية لتنظيف قوائم الأرقام وإزالة المكررات والأرقام غير الصحيحة.",
    date: "2025-08-12",
    tags: ["إدارة البيانات", "تنظيف", "أرقام"],
    cover: "/blog/clean-numbers/cover.jpg",
    readTime: "5 دقائق",
    author: "Hazem Aamer",
    featured: false,
  },
  {
    id: 6,
    title: "إرسال كتالوج المنتجات في واتساب خطوة بخطوة",
    slug: "send-catalog-messages",
    excerpt: "دليل تفصيلي لإنشاء وإرسال كتالوجات المنتجات عبر واتساب بفعالية.",
    date: "2025-08-10",
    tags: ["كتالوج", "منتجات", "تسويق"],
    cover: "/blog/catalog-messages/cover.jpg",
    readTime: "8 دقائق",
    author: "Hazem Aamer",
    featured: false,
  },
]);

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
</script>

<template>
  <AppSEO
    title="مدونة WA Smart Sender - نصائح وأدلة أتمتة واتساب"
    description="اكتشف أحدث النصائح والأدلة لأتمتة واتساب، استراتيجيات التسويق، وأفضل الممارسات لتحسين حملاتك التسويقية."
    canonical="/blog"
    image="/og/blog.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
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
                class="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <select
              v-model="selectedTag"
              class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
            >
              {{ selectedTag }}
              <button
                @click="selectedTag = ''"
                class="ms-2 text-blue-600 hover:text-blue-800"
              >
                <i class="pi pi-times text-xs"></i>
              </button>
            </span>
            <span
              v-if="searchQuery"
              class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800"
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
          <div class="w-16 h-1 bg-blue-600 rounded"></div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="post in featuredPosts.slice(0, 2)"
            :key="post.id"
            class="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow group"
          >
            <div
              class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-image text-4xl mb-4"></i>
                <p>{{ post.cover }}</p>
              </div>
            </div>
            <div class="p-8">
              <div class="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span class="flex items-center">
                  <i class="pi pi-calendar me-2"></i>
                  {{ new Date(post.date).toLocaleDateString("ar-SA") }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-2"></i>
                  {{ post.readTime }}
                </span>
              </div>

              <h3
                class="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors leading-tight"
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
                  class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
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
          <span class="text-gray-600">{{ filteredPosts.length }} مقال</span>
        </div>

        <div v-if="filteredPosts.length === 0" class="text-center py-16">
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
              class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-image text-3xl mb-2"></i>
                <p class="text-xs">{{ post.cover }}</p>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-3 text-xs text-gray-600 mb-3">
                <span class="flex items-center">
                  <i class="pi pi-calendar me-1"></i>
                  {{ new Date(post.date).toLocaleDateString("ar-SA") }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-1"></i>
                  {{ post.readTime }}
                </span>
              </div>

              <h3
                class="text-lg font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors leading-tight"
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
                class="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
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
          class="bg-gradient-to-r from-blue-600 to-blue-800 rounded-2xl p-12 text-white text-center"
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
              class="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:ring-2 focus:ring-white focus:outline-none"
            />
            <button
              class="btn bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 whitespace-nowrap"
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
