<script setup>
import { computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { marked } from "marked";
import AppSEO from "@/components/common/AppSEO.vue";
import ApiService from "@/utils/api.js";

marked.setOptions({
  gfm: true,
  breaks: true,
});

const route = useRoute();
const loading = ref(true);
const error = ref(null);
const guide = ref(null);

const slug = computed(() => String(route.params.slug || "").trim());

const seoTitle = computed(() => {
  if (!guide.value?.title) return "دليل الاستخدام - WA Smart Sender";
  return `${guide.value.title} - WA Smart Sender`;
});

const seoDescription = computed(() => {
  if (!guide.value?.description) {
    return "شرح تفصيلي لاستخدام ميزات WA Smart Sender خطوة بخطوة.";
  }
  return guide.value.description;
});

const renderedContent = computed(() => {
  if (!guide.value?.content) return "";
  return marked.parse(String(guide.value.content));
});

async function fetchGuideBySlug(value) {
  if (!value) {
    error.value = "رابط الدليل غير صحيح";
    guide.value = null;
    loading.value = false;
    return;
  }

  try {
    loading.value = true;
    error.value = null;
    const response = await ApiService.getGuide(value);
    const items = Array.isArray(response?.data) ? response.data : [];
    const selected = items[0];

    if (!selected) {
      guide.value = null;
      error.value = "الدليل غير موجود أو غير منشور حالياً";
      return;
    }

    guide.value = ApiService.formatGuide(selected);
  } catch (err) {
    console.error("Error fetching guide details:", err);
    guide.value = null;
    error.value = "حدث خطأ أثناء تحميل الدليل";
  } finally {
    loading.value = false;
  }
}

watch(
  () => slug.value,
  (newSlug) => {
    fetchGuideBySlug(newSlug);
  },
  { immediate: true }
);
</script>

<template>
  <AppSEO
    :title="seoTitle"
    :description="seoDescription"
    :canonical="`/guides/${slug}`"
    image="/og/guides.png"
  />

  <section class="py-10 md:py-16 bg-gray-50 min-h-[60vh]">
    <div class="container mx-auto px-6 max-w-4xl">
      <div class="mb-8">
        <router-link
          to="/guides"
          class="inline-flex items-center text-[#489f91] hover:text-green-700 font-medium"
        >
          <i class="pi pi-arrow-right ms-2"></i>
          العودة إلى صفحة الأدلة
        </router-link>
      </div>

      <div v-if="loading" class="text-center py-16 bg-white rounded-xl shadow border">
        <i class="pi pi-spinner pi-spin text-5xl text-[#489f91] mb-4"></i>
        <p class="text-lg text-gray-700">جاري تحميل الدليل...</p>
      </div>

      <div v-else-if="error" class="text-center py-16 bg-white rounded-xl shadow border">
        <i class="pi pi-exclamation-triangle text-5xl text-red-500 mb-4"></i>
        <p class="text-lg text-gray-700 mb-6">{{ error }}</p>
        <router-link to="/guides" class="btn btn-primary">
          العودة إلى الأدلة
        </router-link>
      </div>

      <article v-else-if="guide" class="bg-white rounded-xl shadow border p-6 md:p-10">
        <header class="mb-8">
          <div class="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-4">
            <i :class="guide.icon" class="text-2xl text-[#489f91]"></i>
          </div>

          <h1 class="text-2xl md:text-4xl font-bold text-gray-900 mb-4">
            {{ guide.title }}
          </h1>

          <p class="text-gray-600 text-base md:text-lg leading-relaxed mb-6">
            {{ guide.description }}
          </p>

          <div class="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <span class="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <i class="pi pi-chart-bar me-2"></i>
              {{ guide.difficulty }}
            </span>
            <span class="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <i class="pi pi-clock me-2"></i>
              {{ guide.duration }}
            </span>
            <span class="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full">
              <i class="pi pi-list me-2"></i>
              {{ guide.steps }} خطوات
            </span>
          </div>
        </header>

        <div class="guide-content" v-html="renderedContent"></div>
      </article>
    </div>
  </section>
</template>

<style scoped>
.guide-content :deep(h2) {
  font-size: 1.5rem;
  line-height: 2rem;
  font-weight: 800;
  color: #111827;
  margin-top: 2rem;
  margin-bottom: 0.75rem;
}

.guide-content :deep(h3) {
  font-size: 1.125rem;
  line-height: 1.75rem;
  font-weight: 700;
  color: #111827;
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
}

.guide-content :deep(p) {
  color: #374151;
  line-height: 1.9;
  margin-bottom: 0.75rem;
}

.guide-content :deep(ul),
.guide-content :deep(ol) {
  color: #374151;
  margin-bottom: 1rem;
  padding-right: 1.25rem;
}

.guide-content :deep(li) {
  margin-bottom: 0.35rem;
  line-height: 1.9;
}

.guide-content :deep(code) {
  background: #f3f4f6;
  color: #111827;
  border-radius: 0.375rem;
  padding: 0.1rem 0.3rem;
  font-size: 0.875rem;
}

.guide-content :deep(pre) {
  background: #111827;
  color: #e5e7eb;
  border-radius: 0.75rem;
  padding: 1rem;
  margin-bottom: 1rem;
  overflow-x: auto;
}

.guide-content :deep(strong) {
  color: #111827;
  font-weight: 700;
}
</style>
