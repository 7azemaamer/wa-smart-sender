<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import AppSEO from "@/components/common/AppSEO.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Prose from "@/components/common/Prose.vue";
import TOC from "@/components/common/TOC.vue";
import CTAInline from "@/components/common/CTAInline.vue";
import FaqAccordion from "@/components/common/FaqAccordion.vue";
import { generateBlogPostJsonLD } from "@/utils/seo";
import ApiService from "@/utils/api.js";

const route = useRoute();
const post = ref(null);
const loading = ref(true);
const error = ref(null);

const headings = ref([]);

const parsedContent = computed(() =>
  post.value && post.value.content ? marked(post.value.content) : ""
);
const jsonLd = computed(() =>
  post.value ? generateBlogPostJsonLD(post.value) : {}
);

const fetchArticle = async () => {
  try {
    loading.value = true;
    error.value = null;
    const slug = route.params.slug;
    const response = await ApiService.getArticle(slug);

    if (response.data && response.data.length > 0) {
      post.value = ApiService.formatArticle(response.data[0]);
      extractHeadings();
    } else {
      error.value = "المقال غير موجود";
    }
  } catch (err) {
    error.value = "حدث خطأ في تحميل المقال";
    console.error("Error fetching article:", err);
  } finally {
    loading.value = false;
  }
};

// Extract headings for Table of Contents
const extractHeadings = () => {
  if (!post.value?.content) return;

  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const extractedHeadings = [];
  let match;

  while ((match = headingRegex.exec(post.value.content)) !== null) {
    const level = match[1].length;
    const text = match[2];
    const id = text
      .toLowerCase()
      .replace(/[^\w\u0600-\u06FF\s-]/g, "")
      .replace(/\s+/g, "-");

    extractedHeadings.push({
      id,
      text,
      level,
    });
  }

  headings.value = extractedHeadings;
};

const shareOnFacebook = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}`, '_blank');
};

const shareOnTwitter = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value.title);
  window.open(`https://x.com/intent/tweet?text=${title}&url=${url}`, '_blank');
};

const shareOnWhatsApp = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(post.value.title);
  window.open(`https://api.whatsapp.com/send?text=${title}%20${url}`, '_blank');
};

const shareOnLinkedIn = () => {
  if (!post.value) return;
  const url = encodeURIComponent(window.location.href);
  window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
};

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
  } catch (err) {
  }
};

onMounted(() => {
  fetchArticle();
});
</script>

<template>
  <!-- Loading State -->
  <div v-if="loading" class="py-16">
    <div class="container mx-auto px-6 max-w-4xl text-center">
      <i class="pi pi-spinner pi-spin text-6xl text-[#489f91] mb-6"></i>
      <h2 class="text-2xl font-semibold text-gray-700">جاري تحميل المقال...</h2>
    </div>
  </div>

  <!-- Error State -->
  <div v-else-if="error" class="py-16">
    <div class="container mx-auto px-6 max-w-4xl text-center">
      <i class="pi pi-exclamation-triangle text-6xl text-red-500 mb-6"></i>
      <h2 class="text-2xl font-semibold text-gray-700 mb-4">{{ error }}</h2>
      <button @click="fetchArticle" class="btn btn-primary">
        <i class="pi pi-refresh me-2"></i>
        إعادة المحاولة
      </button>
    </div>
  </div>

  <!-- Article Content -->
  <div v-else-if="post">
    <AppSEO
      :title="post.title"
      :description="post.excerpt"
      :canonical="`/blog/${post.slug}`"
      :image="`/og/blog/${post.slug}.png`"
      :json-ld="jsonLd"
      type="article"
    />

    <div class="py-4 md:py-12">
      <!-- Breadcrumbs -->
      <Breadcrumbs :last-item-name="post.title" />

      <div class="container mx-auto px-6 max-w-7xl mt-12">
        <div class="grid grid-cols-1 lg:grid-cols-4 gap-12">
          <!-- Main Content -->
          <article class="lg:col-span-3">
            <!-- Article Header -->
            <header class="mb-12">
              <div class="flex flex-wrap gap-2 mb-4">
                <span
                  v-for="tag in post.tags"
                  :key="tag"
                  class="bg-[#489f9120] text-[#489f91] px-3 py-1 rounded-full text-sm"
                >
                  {{ tag }}
                </span>
              </div>

              <h1
                class="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              >
                {{ post.title }}
              </h1>

              <div class="flex items-center gap-6 text-gray-600 text-sm mb-8">
                <div class="flex items-center">
                  <i class="pi pi-calendar me-2"></i>
                  {{ new Date(post.publishedDate).toLocaleDateString("ar-SA") }}
                </div>
                <div class="flex items-center">
                  <i class="pi pi-clock me-2"></i>
                  {{ post.readTime }}
                </div>
                <div class="flex items-center">
                  <i class="pi pi-file me-2"></i>
                  {{ post.wordCount }} كلمة
                </div>
              </div>

              <!-- Author Info -->
              <div
                v-if="post.author"
                class="flex items-center p-6 bg-gray-50 rounded-xl"
              >
                <div class="relative w-16 h-16 me-4">
                  <img
                    v-if="
                      post.author.avatar &&
                      post.author.avatar !== '/images/placeholder.jpg'
                    "
                    :src="post.author.avatar"
                    :alt="post.author.name"
                    class="w-16 h-16 rounded-full object-cover"
                    @error="$event.target.style.display = 'none'"
                  />
                  <div
                    v-else
                    class="w-16 h-16 rounded-full bg-[#489f91] flex items-center justify-center text-white font-bold text-xl"
                  >
                    <i class="pi pi-user"></i>
                  </div>
                </div>
                <div>
                  <h3 class="font-semibold text-gray-900">
                    {{ post.author.name }}
                  </h3>
                  <p class="text-gray-600 text-sm">{{ post.author.bio }}</p>
                </div>
              </div>
            </header>

            <!-- Featured Image -->
            <div
              class="mb-12 h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center overflow-hidden"
            >
              <img
                v-if="post.cover && post.cover !== '/images/placeholder.jpg'"
                :src="post.cover"
                :alt="post.title"
                class="w-full h-full object-cover"
                @error="$event.target.style.display = 'none'"
              />
              <div v-else class="text-center text-gray-500">
                <i class="pi pi-image text-6xl mb-4"></i>
                <p class="text-lg">صورة المقال</p>
              </div>
            </div>

            <!-- Article Content -->
            <Prose v-html="parsedContent" class="mb-12" />

            <!-- FAQ Section -->
            <section v-if="post.faqs && post.faqs.length > 0" class="mb-12">
              <h2 class="text-2xl font-bold text-gray-900 mb-6">أسئلة شائعة</h2>
              <FaqAccordion :faqs="post.faqs" />
            </section>

            <!-- CTA Section -->
            <div class="mb-12">
              <CTAInline
                title="جرّب WA Smart Sender الآن"
                description="ابدأ إرسال رسائل جماعية آمنة مع أفضل معدلات الحماية في السوق"
                button-text="ابدأ التجربة المجانية"
                button-link="/pricing"
                variant="primary"
                size="lg"
              />
            </div>

            <!-- Share Section -->
            <div class="border-t border-gray-200 pt-8">
              <h3 class="text-lg font-semibold text-gray-900 mb-4">
                شارك المقال
              </h3>
              <div class="flex flex-wrap gap-2 md:gap-4">
                <button
                  @click="shareOnFacebook"
                  class="flex items-center gap-1 md:gap-2 bg-[#1877F2] text-white px-2 md:px-4 py-2 rounded-lg hover:bg-[#166fe5] transition-colors text-sm md:text-base"
                >
                  <i class="pi pi-facebook"></i>
                  <span class="hidden sm:inline">فيسبوك</span>
                </button>
                <button
                  @click="shareOnTwitter"
                  class="flex items-center gap-1 md:gap-2 bg-[#1DA1F2] text-white px-2 md:px-4 py-2 rounded-lg hover:bg-[#1a94da] transition-colors text-sm md:text-base"
                >
                  <i class="pi pi-twitter"></i>
                  <span class="hidden sm:inline">تويتر</span>
                </button>
                <button
                  @click="shareOnWhatsApp"
                  class="flex items-center gap-1 md:gap-2 bg-[#25D366] text-white px-2 md:px-4 py-2 rounded-lg hover:bg-[#22c35e] transition-colors text-sm md:text-base"
                >
                  <i class="pi pi-whatsapp"></i>
                  <span class="hidden sm:inline">واتساب</span>
                </button>
                <button
                  @click="shareOnLinkedIn"
                  class="flex items-center gap-1 md:gap-2 bg-[#0077B5] text-white px-2 md:px-4 py-2 rounded-lg hover:bg-[#006ba1] transition-colors text-sm md:text-base"
                >
                  <i class="pi pi-linkedin"></i>
                  <span class="hidden sm:inline">لينكد إن</span>
                </button>
                <button
                  @click="copyToClipboard"
                  class="flex items-center gap-1 md:gap-2 bg-gray-600 text-white px-2 md:px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm md:text-base"
                  title="نسخ الرابط"
                >
                  <i class="pi pi-copy"></i>
                  <span class="hidden sm:inline">نسخ الرابط</span>
                </button>
              </div>
            </div>
          </article>

          <!-- Sidebar -->
          <aside class="lg:col-span-1">
            <div class="space-y-6">
              <!-- Table of Contents -->
              <TOC :headings="headings" />

              <!-- Related Articles -->
              <div
                class="bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg p-6 shadow-lg z-20"
              >
                <h3 class="text-lg font-semibold text-gray-900 mb-4">
                  مقالات ذات صلة
                </h3>
                <div class="space-y-4">
                  <article class="group">
                    <h4
                      class="font-medium text-gray-900 group-hover:text-[#489f91] transition-colors mb-1 leading-tight"
                    >
                      القوالب الجاهزة لأتمتة الردود بالعربية
                    </h4>
                    <p class="text-sm text-gray-600">7 دقائق قراءة</p>
                  </article>

                  <article class="group">
                    <h4
                      class="font-medium text-gray-900 group-hover:text-[#489f91] transition-colors mb-1 leading-tight"
                    >
                      أفضل ممارسات التقارير وتتبع الأداء
                    </h4>
                    <p class="text-sm text-gray-600">6 دقائق قراءة</p>
                  </article>

                  <article class="group">
                    <h4
                      class="font-medium text-gray-900 group-hover:text-[#489f91] transition-colors mb-1 leading-tight"
                    >
                      كيف تنظّف قوائم الأرقام وتزيل التكرارات
                    </h4>
                    <p class="text-sm text-gray-600">5 دقائق قراءة</p>
                  </article>
                </div>
              </div>

              <!-- Newsletter Signup -->
              <div
                class="bg-[#489f91] text-white rounded-lg p-6 shadow-lg z-20"
              >
                <h3 class="text-lg font-semibold mb-3">
                  اشترك في النشرة الإخبارية
                </h3>
                <p class="text-[#489f91] text-sm mb-4">
                  احصل على أحدث النصائح والأدلة
                </p>
                <div class="space-y-3">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    class="w-full px-3 py-2 rounded text-white border border-white placeholder:text-white text-sm focus:ring-2 focus:ring-[#489f91] focus:outline-none"
                  />
                  <button
                    class="w-full bg-white text-[#489f91] py-2 rounded font-medium text-sm hover:bg-gray-100 transition-colors"
                  >
                    اشترك الآن
                  </button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  </div>
</template>
