<script setup>
import { ref, computed } from "vue";
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import CopyCode from "@/components/common/CopyCode.vue";

const selectedCategory = ref("all");
const searchQuery = ref("");

const templates = ref([
  {
    id: 1,
    title: "رسالة ترحيب للعملاء الجدد",
    category: "welcome",
    content:
      "أهلاً وسهلاً [الاسم] 👋\n\nنشكرك على انضمامك لعائلة [اسم_الشركة]!\n\nنحن هنا لخدمتك على مدار الساعة. إذا كان لديك أي استفسار، لا تتردد في التواصل معنا.\n\nفريق [اسم_الشركة]",
    variables: ["الاسم", "اسم_الشركة"],
    usage: "ترحيب",
    downloads: 1250,
  },
  {
    id: 2,
    title: "متابعة العميل بعد الشراء",
    category: "follow-up",
    content:
      "مرحباً [الاسم] 😊\n\nنشكرك على ثقتك بنا وشراء [المنتج] بتاريخ {التاريخ}.\n\nنتمنى أن تكون راضياً عن المنتج. إذا كان لديك أي ملاحظات أو تحتاج للمساعدة، نحن في الخدمة!\n\nتقييمك يهمنا ⭐\n\n[اسم_الشركة]",
    variables: ["الاسم", "المنتج", "التاريخ", "اسم_الشركة"],
    usage: "متابعة",
    downloads: 980,
  },
  {
    id: 3,
    title: "عرض ترويجي محدود",
    category: "promotion",
    content:
      "🔥 عرض خاص لك [الاسم]!\n\nخصم {النسبة}% على جميع المنتجات\n\n⏰ العرض ساري حتى {تاريخ_الانتهاء}\n\n✅ شحن مجاني\n✅ ضمان الجودة\n✅ دفع عند الاستلام\n\nللطلب: [رقم_الواتس]\n\n[اسم_الشركة]",
    variables: [
      "الاسم",
      "النسبة",
      "تاريخ_الانتهاء",
      "رقم_الواتس",
      "اسم_الشركة",
    ],
    usage: "تسويق",
    downloads: 2100,
  },
  {
    id: 4,
    title: "تأكيد الطلب",
    category: "order",
    content:
      "تم تأكيد طلبك [الاسم] ✅\n\nرقم الطلب: {رقم_الطلب}\nالمنتج: {المنتج}\nالسعر: {السعر} ريال\nالعنوان: {العنوان}\n\n📦 سيتم التسليم خلال 2-3 أيام\n\n💬 للاستفسار: [رقم_الدعم]\n\nشكراً لك,\nفريق [اسم_الشركة]",
    variables: [
      "الاسم",
      "رقم_الطلب",
      "المنتج",
      "السعر",
      "العنوان",
      "رقم_الدعم",
      "اسم_الشركة",
    ],
    usage: "طلبات",
    downloads: 750,
  },
  {
    id: 5,
    title: "رد تلقائي - ساعات العمل",
    category: "auto-reply",
    content:
      "مرحباً بك! 👋\n\nشكراً لتواصلك مع [اسم_الشركة]\n\n🕐 ساعات العمل:\nالأحد - الخميس: 9:00 ص - 6:00 م\nالجمعة - السبت: مغلق\n\nسنرد على رسالتك في أقرب وقت ممكن خلال ساعات العمل.\n\nللطوارئ: [رقم_الطوارئ]",
    variables: ["اسم_الشركة", "رقم_الطوارئ"],
    usage: "رد تلقائي",
    downloads: 1600,
  },
  {
    id: 6,
    title: "دعوة لتقييم الخدمة",
    category: "feedback",
    content:
      "مرحباً [الاسم] 🌟\n\nنشكرك على تعاملك معنا. رأيك يهمنا!\n\nيرجى تقييم تجربتك معنا:\n⭐⭐⭐⭐⭐\n\nأو شاركنا ملاحظاتك هنا: [رابط_التقييم]\n\nتقييمك يساعدنا على تحسين خدماتنا.\n\nمع التقدير,\n[اسم_الشركة]",
    variables: ["الاسم", "رابط_التقييم", "اسم_الشركة"],
    usage: "تقييم",
    downloads: 890,
  },
]);

const categories = [
  { value: "all", label: "جميع القوالب", count: templates.value.length },
  {
    value: "welcome",
    label: "ترحيب",
    count: templates.value.filter((t) => t.category === "welcome").length,
  },
  {
    value: "promotion",
    label: "عروض ترويجية",
    count: templates.value.filter((t) => t.category === "promotion").length,
  },
  {
    value: "follow-up",
    label: "متابعة العملاء",
    count: templates.value.filter((t) => t.category === "follow-up").length,
  },
  {
    value: "order",
    label: "إدارة الطلبات",
    count: templates.value.filter((t) => t.category === "order").length,
  },
  {
    value: "auto-reply",
    label: "ردود تلقائية",
    count: templates.value.filter((t) => t.category === "auto-reply").length,
  },
  {
    value: "feedback",
    label: "تقييمات",
    count: templates.value.filter((t) => t.category === "feedback").length,
  },
];

const filteredTemplates = computed(() => {
  let filtered = templates.value;

  if (selectedCategory.value !== "all") {
    filtered = filtered.filter(
      (template) => template.category === selectedCategory.value
    );
  }

  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase();
    filtered = filtered.filter(
      (template) =>
        template.title.toLowerCase().includes(query) ||
        template.content.toLowerCase().includes(query) ||
        template.usage.toLowerCase().includes(query)
    );
  }

  return filtered;
});

const downloadTemplate = (template) => {
  const blob = new Blob([template.content], { type: "text/plain" });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${template.title}.txt`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
};
</script>

<template>
  <AppSEO
    title="قوالب رسائل واتساب جاهزة - WA Smart Sender"
    description="مجموعة شاملة من قوالب رسائل واتساب المحسنة للتسويق، خدمة العملاء، والردود التلقائية. قوالب مجانية وقابلة للتخصيص."
    canonical="/templates"
    image="/og/templates.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="قوالب رسائل واتساب الجاهزة"
          subtitle="مجموعة شاملة من القوالب المحسنة لجميع احتياجاتك التسويقية"
          size="xl"
          class="mb-16"
        />

        <!-- Search and Filter -->
        <div class="max-w-2xl mx-auto mb-12">
          <div class="flex flex-col sm:flex-row gap-4">
            <input
              v-model="searchQuery"
              type="text"
              placeholder="ابحث في القوالب..."
              class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            <select
              v-model="selectedCategory"
              class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option
                v-for="category in categories"
                :key="category.value"
                :value="category.value"
              >
                {{ category.label }} ({{ category.count }})
              </option>
            </select>
          </div>
        </div>

        <!-- Stats -->
        <div
          class="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm"
        >
          <div class="flex items-center">
            <i class="pi pi-file-edit text-blue-600 me-2"></i>
            {{ templates.length }}+ قالب مجاني
          </div>
          <div class="flex items-center">
            <i class="pi pi-download text-green-600 me-2"></i>
            7000+ تحميل
          </div>
          <div class="flex items-center">
            <i class="pi pi-check-circle text-purple-600 me-2"></i>
            جاهز للاستخدام
          </div>
        </div>
      </div>
    </section>

    <!-- Templates Grid -->
    <section class="py-8">
      <div class="container mx-auto px-6 max-w-6xl">
        <div v-if="filteredTemplates.length === 0" class="text-center py-16">
          <i class="pi pi-search text-6xl text-gray-400 mb-6"></i>
          <h3 class="text-2xl font-semibold text-gray-700 mb-4">
            لم نجد أي قوالب
          </h3>
          <p class="text-gray-600 mb-6">جرب كلمات بحث أخرى أو غيّر التصنيف</p>
          <button
            @click="
              searchQuery = '';
              selectedCategory = 'all';
            "
            class="btn btn-primary"
          >
            <i class="pi pi-refresh me-2"></i>
            عرض جميع القوالب
          </button>
        </div>

        <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <article
            v-for="template in filteredTemplates"
            :key="template.id"
            class="bg-white rounded-2xl shadow-lg border hover:shadow-2xl transition-shadow"
          >
            <div class="p-8">
              <!-- Header -->
              <div class="flex items-start justify-between mb-6">
                <div class="flex-1">
                  <h3 class="text-xl font-bold text-gray-900 mb-2">
                    {{ template.title }}
                  </h3>
                  <div class="flex items-center gap-4 text-sm text-gray-600">
                    <span
                      class="bg-blue-100 text-blue-800 px-3 py-1 rounded-full"
                    >
                      {{ template.usage }}
                    </span>
                    <span class="flex items-center">
                      <i class="pi pi-download me-1"></i>
                      {{ template.downloads }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Template Preview -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <div
                  class="bg-green-500 text-white p-3 rounded-lg rounded-bl-sm max-w-xs"
                >
                  <p class="text-sm leading-relaxed whitespace-pre-line">
                    {{ template.content }}
                  </p>
                </div>
              </div>

              <!-- Variables -->
              <div
                v-if="template.variables && template.variables.length > 0"
                class="mb-6"
              >
                <h4 class="text-sm font-semibold text-gray-700 mb-3">
                  المتغيرات المتاحة:
                </h4>
                <div class="flex flex-wrap gap-2">
                  <span
                    v-for="variable in template.variables"
                    :key="variable"
                    class="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-xs font-medium"
                  >
                    [{{ variable }}]
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  @click="downloadTemplate(template)"
                  class="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <i class="pi pi-download me-2"></i>
                  تحميل القالب
                </button>
                <button
                  class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-3 px-4 rounded-lg transition-colors"
                >
                  <i class="pi pi-eye"></i>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- How to Use Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="كيفية استخدام القوالب"
          subtitle="خطوات بسيطة لتخصيص واستخدام القوالب في حملاتك"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div class="text-center">
            <div
              class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            >
              <i class="pi pi-download"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">1. حمّل القالب</h3>
            <p class="text-gray-600 text-sm">
              اختر القالب المناسب وحمّله على جهازك
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            >
              <i class="pi pi-edit"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">2. خصّص المحتوى</h3>
            <p class="text-gray-600 text-sm">
              عدّل النص وأضف متغيرات حسب احتياجاتك
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            >
              <i class="pi pi-upload"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">3. ارفع في WAS</h3>
            <p class="text-gray-600 text-sm">
              استورد القالب في WA Smart Sender
            </p>
          </div>

          <div class="text-center">
            <div
              class="w-16 h-16 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            >
              <i class="pi pi-send"></i>
            </div>
            <h3 class="text-lg font-semibold mb-2">4. أرسل الحملة</h3>
            <p class="text-gray-600 text-sm">
              ابدأ حملتك واحصل على نتائج رائعة
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Variables Guide -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <SectionHeading
          title="دليل المتغيرات"
          subtitle="تعرف على كيفية استخدام المتغيرات لتخصيص رسائلك"
          class="mb-12"
        />

        <div class="bg-white rounded-2xl shadow-lg border p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-4">المتغيرات الأساسية</h3>
              <CopyCode
                :code="`[الاسم] - اسم العميل
[الشركة] - اسم شركة العميل
[المنتج] - اسم المنتج
[السعر] - سعر المنتج
[الهاتف] - رقم هاتف العميل`"
                language="متغيرات"
              />
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">متغيرات التاريخ والوقت</h3>
              <CopyCode
                :code="`{التاريخ} - التاريخ الحالي
{الوقت} - الوقت الحالي
{اليوم} - اسم اليوم
{الشهر} - اسم الشهر
{السنة} - السنة الحالية`"
                language="تواريخ"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Template Request -->
    <section
      class="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white"
    >
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-3xl font-bold mb-6">تحتاج قالب مخصص؟</h2>
        <p class="text-xl mb-8 opacity-90">
          فريقنا يمكن أن ينشئ لك قوالب مخصصة تناسب نشاطك التجاري تماماً
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            class="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg"
          >
            <i class="pi pi-envelope me-2"></i>
            اطلب قالب مخصص
          </a>
          <a
            href="/guides"
            class="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg"
          >
            <i class="pi pi-book me-2"></i>
            تعلم إنشاء القوالب
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
