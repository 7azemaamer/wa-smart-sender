<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import AppSEO from "@/components/common/AppSEO.vue";
import Breadcrumbs from "@/components/common/Breadcrumbs.vue";
import Prose from "@/components/common/Prose.vue";
import TOC from "@/components/common/TOC.vue";
import CTAInline from "@/components/common/CTAInline.vue";
import FaqAccordion from "@/components/common/FaqAccordion.vue";
import { generateBlogPostJsonLD } from "@/utils/seo";

const route = useRoute();

const post = ref({
  title: "أمان الإرسال الجماعي في واتساب للأعمال: دليل شامل",
  slug: "whatsapp-bulk-safety-guide",
  excerpt:
    "كيف تُرسل رسائل جماعية بأمان دون حظر؟ أفضل الممارسات والإعدادات داخل WA Smart Sender.",
  date: "2025-08-24",
  updatedAt: "2025-08-24",
  tags: ["واتساب", "أمان", "WA Smart Sender"],
  cover: "/blog/whatsapp-bulk-safety/cover.jpg",
  readTime: "5 دقائق",
  wordCount: 1200,
  author: "Hazem Aamer",
  authorBio: "خبير في أتمتة واتساب والتسويق الرقمي",
  authorImage: "/authors/hazem-aamer.jpg",
  content: `
# لماذا يحدث الحظر في واتساب؟

واتساب يستخدم خوارزميات متقدمة لاكتشاف السلوكيات التي تُشبه السبام. العوامل الرئيسية التي تؤدي للحظر تشمل:

## سلوكيات تُشبه السبام

- **إرسال رسائل متطابقة** لعدد كبير من الأرقام
- **الإرسال السريع** بدون فواصل زمنية
- **معدّل الشكاوى العالي** من المستلمين
- **استخدام أرقام غير موثقة** أو مشكوك فيها

## معدّل الشكاوى والإبلاغات

عندما يتلقى واتساب عدة تقارير عن حساب واحد، يتم وضع الحساب تحت المراقبة المشددة.

# إعداد الفواصل العشوائية داخل WAS

WA Smart Sender يوفر نظام حماية متقدم للحفاظ على أمان حسابك:

## الإعدادات المُوصى بها

- **الفاصل الزمني الأدنى:** 10-15 ثانية
- **الفاصل الزمني الأقصى:** 25-30 ثانية
- **فترة راحة كل:** 50 رسالة لمدة 5 دقائق

## كيفية الإعداد

1. افتح لوحة تحكم WA Smart Sender
2. انتقل إلى إعدادات الحماية
3. اختر "الوضع الآمن" للحسابات الجديدة
4. اضبط الفواصل حسب عمر حسابك

# نصوص عشوائية ومتغيرات لتقليل التكرار

## استخدام المتغيرات

- **[الاسم]:** اسم العميل
- **{التاريخ}:** التاريخ الحالي
- **{الوقت}:** الوقت الحالي
- **[الشركة]:** اسم الشركة

## أمثلة عملية

\`\`\`
مرحباً [الاسم]! 👋

نشكرك على اهتمامك بمنتجاتنا في تاريخ {التاريخ}.

فريق [الشركة]
\`\`\`

# تنظيف القوائم: إزالة الأرقام المكرّرة والمحظورة

## خطوات التنظيف الأساسية

1. **إزالة التكرارات:** استخدم ميزة إزالة التكرار المدمجة
2. **فحص صحة الأرقام:** تأكد من صيغة الأرقام الصحيحة
3. **استبعاد القائمة السوداء:** أرقام سبق حظرها أو شكت منك

## أدوات WAS للتنظيف

- فلترة تلقائية للأرقام المكررة
- فحص صيغة الأرقام الدولية
- قاعدة بيانات الأرقام المحظورة المحدّثة

# مؤشرات أداء يجب مراقبتها في التقارير

## المؤشرات الحرجة

- **معدل التسليم:** يجب أن يكون أعلى من 90%
- **معدل القراءة:** المؤشر على تفاعل العملاء
- **معدل الردود:** يُظهر جودة المحتوى
- **نسبة الحظر:** يجب أن تكون أقل من 2%

## كيفية تحسين المؤشرات

1. **راقب التقارير يومياً** خلال الحملات النشطة
2. **اضبط الإعدادات** عند ملاحظة انخفاض في الأداء
3. **غيّر استراتيجية المحتوى** إذا انخفضت معدلات التفاعل

# أخطاء شائعة يجب تجنبها

## الأخطاء الفادحة

- **إعادة استخدام نفس النص** لحملات متعددة
- **الإرسال المكثف في أول يوم** للحسابات الجديدة
- **تجاهل تقارير الأداء** وعدم التعديل
- **استخدام محتوى ترويجي مفرط** بدون قيمة

## نصائح للتجنب

- دائماً ابدأ بحملات صغيرة (50-100 رسالة)
- اختبر المحتوى على مجموعة صغيرة أولاً
- انتظر 24-48 ساعة بين الحملات الكبيرة
- استخدم محتوى متنوع وذو قيمة
  `,
  faqs: [
    {
      question: "هل الحظر مضمون عند الإرسال الجماعي؟",
      answer:
        "لا. يعتمد على السلوك—استخدم فواصل عشوائية ونصوص متنوعة وتحقق من الأرقام لتقليل المخاطر بشكل كبير.",
    },
    {
      question: "كم عدد الرسائل الآمن يومياً؟",
      answer:
        "للحسابات الجديدة: 50-100 رسالة. للحسابات المتقدمة: 200-500 رسالة. WAS يضبط هذا تلقائياً حسب عمر حسابك.",
    },
    {
      question: "ماذا أفعل إذا تم حظر حسابي؟",
      answer:
        "توقف فوراً عن الإرسال، انتظر 24-48 ساعة، راجع إعداداتك، وابدأ بحملات أصغر مع محتوى أكثر تنوعاً.",
    },
  ],
});

const headings = ref([]);

const jsonLd = computed(() => generateBlogPostJsonLD(post.value));

onMounted(() => {
  headings.value = [
    { id: "why-ban", text: "لماذا يحدث الحظر في واتساب؟", level: 2 },
    { id: "spam-behavior", text: "سلوكيات تُشبه السبام", level: 3 },
    { id: "complaints", text: "معدّل الشكاوى والإبلاغات", level: 3 },
    {
      id: "random-intervals",
      text: "إعداد الفواصل العشوائية داخل WAS",
      level: 2,
    },
    { id: "recommended-settings", text: "الإعدادات المُوصى بها", level: 3 },
    { id: "setup-guide", text: "كيفية الإعداد", level: 3 },
    { id: "variables", text: "نصوص عشوائية ومتغيرات لتقليل التكرار", level: 2 },
    {
      id: "clean-lists",
      text: "تنظيف القوائم: إزالة الأرقام المكرّرة والمحظورة",
      level: 2,
    },
    {
      id: "performance",
      text: "مؤشرات أداء يجب مراقبتها في التقارير",
      level: 2,
    },
    { id: "common-mistakes", text: "أخطاء شائعة يجب تجنبها", level: 2 },
  ];
});
</script>

<template>
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
    <Breadcrumbs />

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
                {{ new Date(post.date).toLocaleDateString("ar-SA") }}
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
            <div class="flex items-center p-6 bg-gray-50 rounded-xl">
              <img
                :src="post.authorImage || '/authors/default.png'"
                :alt="post.author"
                class="w-16 h-16 rounded-full object-cover me-4"
              />
              <div>
                <h3 class="font-semibold text-gray-900">{{ post.author }}</h3>
                <p class="text-gray-600 text-sm">{{ post.authorBio }}</p>
              </div>
            </div>
          </header>

          <!-- Featured Image -->
          <div
            class="mb-12 h-64 md:h-96 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center"
          >
            <div class="text-center text-gray-500">
              <i class="pi pi-image text-6xl mb-4"></i>
              <p class="text-lg">{{ post.cover }}</p>
            </div>
          </div>

          <!-- Article Content -->
          <Prose v-html="post.content" class="mb-12" />

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
            <div class="flex gap-4">
              <button
                class="flex items-center gap-2 bg-[#489f91] text-white px-4 py-2 rounded-lg hover:bg-[#489f91] transition-colors"
              >
                <i class="pi pi-facebook"></i>
                فيسبوك
              </button>
              <button
                class="flex items-center gap-2 bg-[#489f91] text-white px-4 py-2 rounded-lg hover:bg-[#489f91] transition-colors"
              >
                <i class="pi pi-twitter"></i>
                تويتر
              </button>
              <button
                class="flex items-center gap-2 bg-[#489f91] text-white px-4 py-2 rounded-lg hover:bg-[#489f91] transition-colors"
              >
                <i class="pi pi-whatsapp"></i>
                واتساب
              </button>
              <button
                class="flex items-center gap-2 bg-[#489f91] text-white px-4 py-2 rounded-lg hover:bg-[#489f91] transition-colors"
              >
                <i class="pi pi-linkedin"></i>
                لينكد إن
              </button>
            </div>
          </div>
        </article>

        <!-- Sidebar -->
        <aside class="lg:col-span-1">
          <div class="sticky top-24 space-y-6 z-10">
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
            <div class="bg-[#489f91] text-white rounded-lg p-6 shadow-lg z-20">
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
                  class="w-full px-3 py-2 rounded text-gray-900 text-sm focus:ring-2 focus:ring-white focus:outline-none"
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
</template>
