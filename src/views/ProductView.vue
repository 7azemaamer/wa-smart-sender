<script setup>
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import FeatureCard from "@/components/common/FeatureCard.vue";
import CTASticky from "@/components/common/CTASticky.vue";

const features = [
  {
    icon: "pi pi-send",
    title: "الإرسال الجماعي الذكي",
    description:
      "إرسال رسائل واتساب مخصصة لمئات أو آلاف جهات الاتصال بدون حفظ أرقامهم. استيراد عبر Excel وإرفاق الوسائط.",
    highlighted: true,
  },
  {
    icon: "pi pi-file-excel",
    title: "استيراد Excel مع المتغيرات",
    description:
      "تخصيص الرسائل تلقائياً باستخدام حقول مخصصة مثل [الاسم] و[البريد الإلكتروني] و[الطلب] من ملفات Excel.",
    highlighted: false,
  },
  {
    icon: "pi pi-robot",
    title: "الردود التلقائية بالذكاء الاصطناعي",
    description:
      "دع الذكاء الاصطناعي يتعامل مع الأسئلة الشائعة والدعم ومعلومات المنتجات مع دعم متعدد اللغات واللهجات.",
    highlighted: true,
  },
  {
    icon: "pi pi-edit",
    title: "إعادة صياغة الذكاء الاصطناعي",
    description:
      "أعد كتابة رسائلك بسهولة مع اقتراحات الذكاء الاصطناعي التي تحسن الوضوح والنبرة والتفاعل.",
    highlighted: false,
  },
  {
    icon: "pi pi-file",
    title: "مدير القوالب الذكي",
    description:
      "إنشاء وتنظيم وإعادة استخدام قوالب رسائل واتساب ذكية للحملات والمبيعات والمتابعة والدعم.",
    highlighted: false,
  },
  {
    icon: "pi pi-users",
    title: "إدارة المجموعات + تصدير Excel",
    description:
      "تجميع الأرقام بسهولة وحفظها في Excel وإعادة استخدامها في الحملات المستقبلية.",
    highlighted: false,
  },
  {
    icon: "pi pi-chart-bar",
    title: "تقارير مفصلة وسجلات قابلة للتصدير",
    description:
      "تتبع الرسائل المرسلة وحالة التسليم والمستلمين وسجلات الرسائل. تصدير التقارير للتحليل أو المراجعة.",
    highlighted: false,
  },
  {
    icon: "pi pi-shield",
    title: "حقن النص العشوائي للأمان",
    description:
      "إضافة عبارات ديناميكية وعشوائية لتقليل فرصة اكتشاف الرسائل المزعجة.",
    highlighted: false,
  },
];

const comparison = [
  {
    feature: "الإرسال الجماعي",
    manual: { icon: "pi pi-times", text: "يدوي وبطيء", status: "negative" },
    excel: {
      icon: "pi pi-exclamation-triangle",
      text: "محدود ومعقد",
      status: "warning",
    },
    was: { icon: "pi pi-check", text: "آمن وآلي بالكامل", status: "positive" },
  },
  {
    feature: "تجنب الحظر",
    manual: { icon: "pi pi-times", text: "غير محمي", status: "negative" },
    excel: { icon: "pi pi-times", text: "خطر عالي", status: "negative" },
    was: { icon: "pi pi-check", text: "حماية متقدمة", status: "positive" },
  },
  {
    feature: "الردود التلقائية",
    manual: { icon: "pi pi-times", text: "غير متاح", status: "negative" },
    excel: { icon: "pi pi-times", text: "غير متاح", status: "negative" },
    was: { icon: "pi pi-check", text: "بالذكاء الاصطناعي", status: "positive" },
  },
  {
    feature: "التقارير",
    manual: { icon: "pi pi-times", text: "لا توجد", status: "negative" },
    excel: {
      icon: "pi pi-exclamation-triangle",
      text: "أساسية",
      status: "warning",
    },
    was: { icon: "pi pi-check", text: "مفصلة ومتقدمة", status: "positive" },
  },
  {
    feature: "سهولة الاستخدام",
    manual: { icon: "pi pi-times", text: "صعب جداً", status: "negative" },
    excel: {
      icon: "pi pi-exclamation-triangle",
      text: "يتطلب خبرة",
      status: "warning",
    },
    was: { icon: "pi pi-check", text: "بنقرة واحدة", status: "positive" },
  },
];

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "WA Smart Sender",
  applicationCategory: "BrowserExtension",
  operatingSystem: "Web",
  offers: {
    "@type": "Offer",
    price: "12.04",
    priceCurrency: "USD",
    availability: "https://schema.org/InStock",
  },
  description:
    "إضافة كروم لأتمتة وتسويق واتساب رسائل جماعية، ردود تلقائية بالذكاء الاصطناعي، قوالب وتقارير، وأمان عالي.",
  url: "https://wsmartsender.com/was",
  image: "https://wsmartsender.com/og/was.png",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    reviewCount: "127",
  },
};
</script>

<template>
  <AppSEO
    title="WA Smart Sender - إضافة كروم لأتمتة واتساب"
    description="إضافة كروم متقدمة لأتمتة وتسويق واتساب: رسائل جماعية آمنة، ردود تلقائية بالذكاء الاصطناعي، قوالب جاهزة، وتقارير مفصلة. جرب الآن!"
    canonical="/was"
    image="/og/was.png"
    :json-ld="jsonLd"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <h1
          class="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
        >
          أتمت واتساب بذكاء<br />
          <span class="gradient-text">واربح أكثر</span>
        </h1>
        <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
          إضافة كروم متقدمة تحول واتساب إلى أداة تسويق قوية مع الإرسال الجماعي
          الآمن والردود التلقائية بالذكاء الاصطناعي
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <a
            href="https://chromewebstore.google.com/detail/WA%20Smart%20Sender/ckibonklempheenficakknnojmemhhcj"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-primary px-8 py-4 text-lg"
          >
            <i class="pi pi-download me-2"></i>
            حمّل من Chrome Web Store
          </a>
          <a href="/pricing" class="btn btn-secondary px-8 py-4 text-lg">
            <i class="pi pi-eye me-2"></i>
            شاهد الأسعار
          </a>
        </div>

        <!-- Trust Badges -->
        <div
          class="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm"
        >
          <div class="flex items-center">
            <i class="pi pi-shield-check text-[#489f91] me-2"></i>
            آمن 100%
          </div>
          <div class="flex items-center">
            <i class="pi pi-star-fill text-yellow-500 me-2"></i>
            تقييم 5.0/5 (12 تقييم)
          </div>
          <div class="flex items-center">
            <i class="pi pi-users text-[#489f91] me-2"></i>
            100+ مستخدم
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="المزايا المتقدمة"
          subtitle="كل ما تحتاجه لأتمتة واتساب وزيادة مبيعاتك"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            v-for="feature in features"
            :key="feature.title"
            :feature="feature"
          />
        </div>
      </div>
    </section>

    <!-- Screenshots Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="شاهد WAS في العمل"
          subtitle="لقطات شاشة من الواجهة الفعلية للإضافة"
          class="mb-16"
        />

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div
              class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-image text-4xl mb-4"></i>
                <p>لقطة شاشة الإرسال الجماعي</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">إرسال آلاف الرسائل</h3>
              <p class="text-gray-600">
                واجهة بسيطة لإرسال رسائل مخصصة لآلاف العملاء
              </p>
            </div>
          </div>

          <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div
              class="h-64 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-cog text-4xl mb-4"></i>
                <p>لقطة شاشة الردود التلقائية</p>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-xl font-semibold mb-2">الردود الذكية</h3>
              <p class="text-gray-600">إعداد ردود تلقائية بالذكاء الاصطناعي</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="لماذا WAS أفضل من البدائل؟"
          subtitle="مقارنة شاملة مع الطرق التقليدية"
          class="mb-16"
        />

        <div class="overflow-x-auto">
          <table class="w-full bg-white rounded-2xl shadow-lg overflow-hidden">
            <thead class="bg-[#489f91] text-white">
              <tr>
                <th class="py-4 px-6 text-start">الميزة</th>
                <th class="py-4 px-6 text-center">الإرسال اليدوي</th>
                <th class="py-4 px-6 text-center">سكريبت Excel</th>
                <th class="py-4 px-6 text-center">WA Smart Sender</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="(row, index) in comparison"
                :key="row.feature"
                :class="index % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
              >
                <td class="py-4 px-6 font-medium text-gray-900">
                  {{ row.feature }}
                </td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <i :class="row.manual.icon" class="text-red-500"></i>
                    <span class="text-gray-700">{{ row.manual.text }}</span>
                  </div>
                </td>
                <td class="py-4 px-6 text-center">
                  <div class="flex items-center justify-center gap-2">
                    <i
                      :class="[
                        row.excel.icon,
                        row.excel.status === 'warning'
                          ? 'text-yellow-500'
                          : 'text-red-500',
                      ]"
                    ></i>
                    <span class="text-gray-700">{{ row.excel.text }}</span>
                  </div>
                </td>
                <td class="py-4 px-6 text-center font-semibold">
                  <div class="flex items-center justify-center gap-2">
                    <i :class="row.was.icon" class="text-[#489f91]"></i>
                    <span class="text-[#489f91]">{{ row.was.text }}</span>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 bg-gradient-to-br from-[#489f91] to-[#3a7a6f] text-white"
    >
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-4xl md:text-5xl font-bold mb-6">جاهز لتسريع أعمالك؟</h2>
        <p class="text-xl mb-8 opacity-90 leading-relaxed">
          انضم لآلاف المستخدمين الذين ضاعفوا مبيعاتهم باستخدام WA Smart Sender
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="https://chromewebstore.google.com/detail/WA%20Smart%20Sender/ckibonklempheenficakknnojmemhhcj"
            target="_blank"
            rel="noopener noreferrer"
            class="btn bg-white text-[#489f91] hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
          >
            <i class="pi pi-download me-2"></i>
            ابدأ مجاناً الآن
          </a>
          <a
            href="/pricing"
            class="btn border-2 border-white text-white hover:bg-white hover:text-[#489f91] px-8 py-4 text-lg font-semibold"
          >
            <i class="pi pi-credit-card me-2"></i>
            شاهد خطط الأسعار
          </a>
        </div>
      </div>
    </section>
  </div>

  <CTASticky />
</template>
