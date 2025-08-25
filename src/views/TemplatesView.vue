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
      "أهلاً وسهلاً {Name} 👋\n\nنشكرك على انضمامك لعائلة {CompanyName}!\n\nنحن هنا لخدمتك على مدار الساعة. إذا كان لديك أي استفسار، لا تتردد في التواصل معنا.\n\nفريق {CompanyName}",
    variables: ["Name", "CompanyName"],
    excelColumns: ["Name", "CompanyName"],
    usage: "ترحيب",
    downloads: 1250,
  },
  {
    id: 2,
    title: "متابعة العميل بعد الشراء",
    category: "follow-up",
    content:
      "مرحباً {Name} 😊\n\nنشكرك على ثقتك بنا وشراء {Product} بتاريخ {Date}.\n\nنتمنى أن تكون راضياً عن المنتج. إذا كان لديك أي ملاحظات أو تحتاج للمساعدة، نحن في الخدمة!\n\nتقييمك يهمنا ⭐\n\n{CompanyName}",
    variables: ["Name", "Product", "Date", "CompanyName"],
    excelColumns: ["Name", "Product", "Date", "CompanyName"],
    usage: "متابعة",
    downloads: 980,
  },
  {
    id: 3,
    title: "عرض ترويجي محدود",
    category: "promotion",
    content:
      "🔥 عرض خاص لك {Name}!\n\nخصم {DiscountPercent}% على جميع المنتجات\n\n⏰ العرض ساري حتى {ExpiryDate}\n\n• شحن مجاني\n• ضمان الجودة\n• دفع عند الاستلام\n\nللطلب: {WhatsAppNumber}\n\n{CompanyName}",
    variables: [
      "Name",
      "DiscountPercent",
      "ExpiryDate",
      "WhatsAppNumber",
      "CompanyName",
    ],
    excelColumns: [
      "Name",
      "DiscountPercent",
      "ExpiryDate",
      "WhatsAppNumber",
      "CompanyName",
    ],
    usage: "تسويق",
    downloads: 2100,
  },
  {
    id: 4,
    title: "تأكيد الطلب",
    category: "order",
    content:
      "تم تأكيد طلبك {Name} ✅\n\nرقم الطلب: {OrderNumber}\nالمنتج: {Product}\nالسعر: {Price} ريال\nالعنوان: {Address}\n\n📦 سيتم التسليم خلال 2-3 أيام\n\n💬 للاستفسار: {SupportNumber}\n\nشكراً لك,\nفريق {CompanyName}",
    variables: [
      "Name",
      "OrderNumber",
      "Product",
      "Price",
      "Address",
      "SupportNumber",
      "CompanyName",
    ],
    excelColumns: [
      "Name",
      "OrderNumber",
      "Product",
      "Price",
      "Address",
      "SupportNumber",
      "CompanyName",
    ],
    usage: "طلبات",
    downloads: 750,
  },
  {
    id: 5,
    title: "رد تلقائي - ساعات العمل",
    category: "auto-reply",
    content:
      "مرحباً بك! 👋\n\nشكراً لتواصلك مع {CompanyName}\n\n🕐 ساعات العمل:\nالأحد - الخميس: {WorkHours}\nالجمعة - السبت: مغلق\n\nسنرد على رسالتك في أقرب وقت ممكن خلال ساعات العمل.\n\nللطوارئ: {EmergencyNumber}",
    variables: ["CompanyName", "WorkHours", "EmergencyNumber"],
    excelColumns: ["CompanyName", "WorkHours", "EmergencyNumber"],
    usage: "رد تلقائي",
    downloads: 1600,
  },
  {
    id: 6,
    title: "دعوة لتقييم الخدمة",
    category: "feedback",
    content:
      "مرحباً {Name} 🌟\n\nنشكرك على تعاملك معنا. رأيك يهمنا!\n\nيرجى تقييم تجربتك معنا:\n⭐⭐⭐⭐⭐\n\nأو شاركنا ملاحظاتك هنا: {ReviewLink}\n\nتقييمك يساعدنا على تحسين خدماتنا.\n\nمع التقدير,\n{CompanyName}",
    variables: ["Name", "ReviewLink", "CompanyName"],
    excelColumns: ["Name", "ReviewLink", "CompanyName"],
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

const downloadExcelTemplate = (template) => {
  // Create CSV content with headers
  const headers = template.excelColumns.join(",");
  const sampleRow = template.excelColumns.map(() => "مثال").join(",");
  const csvContent = `${headers}\n${sampleRow}`;

  const blob = new Blob(["\ufeff" + csvContent], {
    type: "text/csv;charset=utf-8;",
  });
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.style.display = "none";
  a.href = url;
  a.download = `${template.title} - Excel Template.csv`;
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
              class="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
            />
            <select
              v-model="selectedCategory"
              class="px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
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
            <i class="pi pi-file-edit text-[#489f91] me-2"></i>
            {{ templates.length }}+ قالب
          </div>
          <div class="flex items-center">
            <i class="pi pi-download text-[#489f91] me-2"></i>
            7000+ تحميل
          </div>
          <div class="flex items-center">
            <i class="pi pi-check-circle text-[#489f91] me-2"></i>
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
            class="bg-white rounded-2xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow"
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
                      class="bg-[#489f9120] text-[#489f91] px-3 py-1 rounded-full"
                    >
                      {{ template.usage }}
                    </span>
                    <span class="flex items-center cursor-pointer">
                      <i class="pi pi-download me-1"></i>
                      {{ template.downloads }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Template Preview -->
              <div class="bg-gray-50 rounded-lg p-4 mb-6">
                <div
                  class="bg-[#489f91] text-white p-3 rounded-lg rounded-bl-sm max-w-xs"
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
                    class="bg-[#489f9120] text-[#489f91] px-2 py-1 rounded text-xs font-medium"
                  >
                    [{{ variable }}]
                  </span>
                </div>
              </div>

              <!-- Actions -->
              <div class="flex gap-3">
                <button
                  @click="downloadTemplate(template)"
                  class="flex-1 cursor-pointer bg-[#489f91] hover:bg-[#489f91] text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                >
                  <i class="pi pi-download me-2"></i>
                  تحميل القالب
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
              class="w-16 h-16 bg-[#489f9120] text-[#489f91] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
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
              class="w-16 h-16 bg-[#489f9120] text-[#489f91] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
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
              class="w-16 h-16 bg-[#489f9120] text-[#489f91] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
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
              class="w-16 h-16 bg-[#489f9120] text-[#489f91] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
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

    <!-- Excel Usage Guide -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="كيفية استخدام ملفات Excel مع القوالب"
          subtitle="دليل شامل لربط القوالب مع بيانات العملاء من ملفات Excel"
          class="mb-16"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <!-- Left Column - Steps -->
          <div>
            <div class="space-y-6">
              <div class="flex items-start">
                <div class="w-8 h-8 bg-[#489f91] text-white rounded-full flex items-center justify-center font-bold text-sm me-4 flex-shrink-0">
                  1
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">حمّل ملف Excel للقالب</h3>
                  <p class="text-gray-600">اضغط على زر "تحميل Excel" لتحصل على ملف يحتوي على الأعمدة المطلوبة مسبقاً</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-8 h-8 bg-[#489f91] text-white rounded-full flex items-center justify-center font-bold text-sm me-4 flex-shrink-0">
                  2
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">املأ بيانات العملاء</h3>
                  <p class="text-gray-600">أضف معلومات كل عميل في صف منفصل تحت الأعمدة المناسبة</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-8 h-8 bg-[#489f91] text-white rounded-full flex items-center justify-center font-bold text-sm me-4 flex-shrink-0">
                  3
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">ارفع في WA Smart Sender</h3>
                  <p class="text-gray-600">استورد الملف في الإضافة وسيتم استبدال المتغيرات تلقائياً</p>
                </div>
              </div>

              <div class="flex items-start">
                <div class="w-8 h-8 bg-[#489f91] text-white rounded-full flex items-center justify-center font-bold text-sm me-4 flex-shrink-0">
                  4
                </div>
                <div>
                  <h3 class="text-lg font-semibold mb-2">أرسل رسائل مخصصة</h3>
                  <p class="text-gray-600">كل عميل سيحصل على رسالة مخصصة بمعلوماته الشخصية</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Column - Example -->
          <div>
            <div class="bg-white rounded-xl shadow-lg p-6">
              <h3 class="text-lg font-semibold mb-4">مثال على ملف Excel:</h3>
              <div class="overflow-hidden border border-gray-200 rounded-lg">
                <table class="w-full text-sm">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-4 py-3 text-right font-medium">Name</th>
                      <th class="px-4 py-3 text-right font-medium">CompanyName</th>
                    </tr>
                  </thead>
                  <tbody class="divide-y divide-gray-200">
                    <tr>
                      <td class="px-4 py-3">أحمد محمد</td>
                      <td class="px-4 py-3">شركة النور</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3">فاطمة أحمد</td>
                      <td class="px-4 py-3">مؤسسة الأمل</td>
                    </tr>
                    <tr>
                      <td class="px-4 py-3">محمد علي</td>
                      <td class="px-4 py-3">متجر السعادة</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              
              <div class="mt-4 p-4 bg-gray-50 rounded-lg">
                <h4 class="font-medium mb-2">النتيجة للعميل الأول:</h4>
                <div class="bg-[#489f91] text-white p-3 rounded-lg text-sm">
                  أهلاً وسهلاً أحمد محمد 👋<br><br>
                  نشكرك على انضمامك لعائلة شركة النور!<br><br>
                  نحن هنا لخدمتك على مدار الساعة...
                </div>
              </div>
            </div>
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
                :code="`[name] - اسم العميل\n[phone] - رقم هاتف العميل`"
                language="متغيرات"
              />
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-4">متغيرات التاريخ والوقت</h3>
              <CopyCode
                :code="`{date} - التاريخ الحالي\n{time} - الوقت الحالي`"
                language="تواريخ"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Custom Template Request -->
    <section
      class="py-20 bg-gradient-to-r from-[#489f91] to-[#489f91] text-white"
    >
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-3xl font-bold mb-6">تحتاج قالب مخصص؟</h2>
        <p class="text-xl mb-8 opacity-90">
          فريقنا يمكن أن ينشئ لك قوالب مخصصة تناسب نشاطك التجاري تماماً
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/guides"
            class="btn border-2 border-white bg-white text-[#489f91] hover:bg-[#489f91] hover:text-white px-8 py-4 text-lg"
          >
            <i class="pi pi-book me-2"></i>
            تعلم إنشاء القوالب
          </a>
        </div>
      </div>
    </section>
  </div>
</template>
