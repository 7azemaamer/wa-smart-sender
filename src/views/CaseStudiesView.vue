<script setup>
import { ref, computed } from "vue";
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import CTAInline from "@/components/common/CTAInline.vue";

// ROI Calculator
const customers = ref(500);
const orderValue = ref(150);
const monthlyOrders = ref(2.5);

const calculatedROI = computed(() => {
  const currentRevenue =
    customers.value * orderValue.value * monthlyOrders.value;
  const increasePercent = 35; // Average increase based on case studies
  const revenueIncrease = currentRevenue * (increasePercent / 100);
  const marketingSavings = 8000; // Static marketing savings
  const wasCost = 75; // WAS monthly cost
  const netReturn = revenueIncrease + marketingSavings - wasCost;

  return {
    currentRevenue,
    revenueIncrease,
    marketingSavings,
    wasCost,
    netReturn,
  };
});

const caseStudies = [
  {
    id: 1,
    title: "متجر إلكتروني يزيد مبيعاته 35% بحملة مخصّصة",
    company: "متجر الأزياء العصرية",
    industry: "أزياء وموضة",
    challenge: "انخفاض معدلات التحويل وضعف التفاعل مع العملاء",
    solution: "استخدام الإرسال الجماعي المخصص والردود التلقائية الذكية",
    results: {
      metric1: {
        label: "زيادة المبيعات",
        value: "+35%",
        color: "text-green-600",
      },
      metric2: {
        label: "تحسن التفاعل",
        value: "+60%",
        color: "text-[#489f91]",
      },
      metric3: {
        label: "توفير الوقت",
        value: "15 ساعة/أسبوع",
        color: "text-purple-600",
      },
    },
    duration: "3 أشهر",
    image: "/case-studies/fashion-store.jpg",
    featured: true,
  },
  {
    id: 2,
    title: "شركة عقارات تضاعف عدد العملاء المتوقعين",
    company: "العقارات المتميزة",
    industry: "عقارات",
    challenge: "صعوبة في الوصول للعملاء المهتمين والمتابعة الدورية",
    solution: "حملات استهداف جغرافي وردود تلقائية لاستفسارات العقارات",
    results: {
      metric1: {
        label: "زيادة العملاء المحتملين",
        value: "+120%",
        color: "text-green-600",
      },
      metric2: {
        label: "تحسن معدل الرد",
        value: "+85%",
        color: "text-[#489f91]",
      },
      metric3: {
        label: "تسريع عملية البيع",
        value: "40%",
        color: "text-orange-600",
      },
    },
    duration: "4 أشهر",
    image: "/case-studies/real-estate.jpg",
    featured: true,
  },
  {
    id: 3,
    title: "مطعم يحقق رقماً قياسياً في طلبات التوصيل",
    company: "مطعم الأصالة",
    industry: "مطاعم وأغذية",
    challenge: "منافسة شديدة في التوصيل وحاجة لبناء قاعدة عملاء مخلصين",
    solution: "عروض ترويجية مخصصة وتذكيرات للطلبات الدورية",
    results: {
      metric1: {
        label: "زيادة طلبات التوصيل",
        value: "+45%",
        color: "text-green-600",
      },
      metric2: {
        label: "عودة العملاء",
        value: "+70%",
        color: "text-[#489f91]",
      },
      metric3: {
        label: "توفير تكلفة إعلانات",
        value: "25%",
        color: "text-purple-600",
      },
    },
    duration: "2 أشهر",
    image: "/case-studies/restaurant.jpg",
    featured: false,
  },
];

const industries = [
  { name: "التجارة الإلكترونية", count: 45, icon: "pi pi-shopping-cart" },
  { name: "العقارات", count: 32, icon: "pi pi-home" },
  { name: "المطاعم والأغذية", count: 28, icon: "pi pi-shopping-bag" },
  { name: "الخدمات التعليمية", count: 22, icon: "pi pi-book" },
  { name: "الصحة والجمال", count: 18, icon: "pi pi-heart" },
  { name: "الخدمات المالية", count: 15, icon: "pi pi-credit-card" },
];

const successMetrics = [
  {
    label: "متوسط زيادة المبيعات",
    value: "42%",
    description: "نمو في الإيرادات خلال 3 أشهر",
  },
  {
    label: "تحسن التفاعل",
    value: "65%",
    description: "زيادة في معدلات الرد والتفاعل",
  },
  {
    label: "توفير الوقت",
    value: "20 ساعة",
    description: "أسبوعياً في المهام اليدوية",
  },
  {
    label: "تحسن رضا العملاء",
    value: "78%",
    description: "زيادة في تقييمات العملاء الإيجابية",
  },
];
</script>

<template>
  <AppSEO
    title="دراسات حالة ناجحة - WA Smart Sender"
    description="قصص نجاح حقيقية من عملاء WA Smart Sender. اكتشف كيف ضاعفت الشركات مبيعاتها وحسنت تفاعلها مع العملاء."
    canonical="/case-studies"
    image="/og/case-studies.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="قصص نجاح حقيقية"
          subtitle="كيف غيّر WA Smart Sender مسار الأعمال وضاعف النتائج لعملائنا"
          size="xl"
          class="mb-16"
        />

        <!-- Success Metrics Overview -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          <div
            v-for="metric in successMetrics"
            :key="metric.label"
            class="text-center"
          >
            <div class="text-4xl font-bold text-[#489f91] mb-2">
              {{ metric.value }}
            </div>
            <div class="text-lg font-semibold text-gray-900 mb-1">
              {{ metric.label }}
            </div>
            <p class="text-sm text-gray-600">{{ metric.description }}</p>
          </div>
        </div>

        <div class="bg-[#489f91] rounded-2xl p-8">
          <h3 class="text-2xl font-bold text-white mb-4">
            عملاؤنا حققوا نتائج مذهلة
          </h3>
          <p class="text-lg text-gray-200 max-w-3xl mx-auto">
            من الشركات الناشئة إلى المؤسسات الكبيرة، WA Smart Sender ساعد مئات
            العملاء على تحسين تسويقهم وزيادة مبيعاتهم
          </p>
        </div>
      </div>
    </section>

    <!-- Featured Case Studies -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="دراسات الحالة المميزة"
          subtitle="تفاصيل مُعمقة لقصص النجاح الأكثر إلهاماً"
          class="mb-16"
        />

        <div class="space-y-16">
          <article
            v-for="study in caseStudies.filter((s) => s.featured)"
            :key="study.id"
            class="bg-white rounded-2xl shadow-2xl overflow-hidden"
          >
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-0">
              <!-- Image Section -->
              <div
                class="h-80 bg-gradient-to-br from-[#489f9120] to-[#489f91] flex items-center justify-center"
              >
                <div class="w-full h-full object-cover">
                  <div class="w-full h-full bg-gray-200"></div>
                </div>
              </div>

              <!-- Content Section -->
              <div class="p-12">
                <div class="flex items-center gap-3 text-sm text-gray-600 mb-4">
                  <span
                    class="bg-[#489f9120] text-[#489f91] px-3 py-1 rounded-full"
                    >{{ study.industry }}</span
                  >
                  <span class="flex items-center">
                    <i class="pi pi-clock me-2"></i>
                    {{ study.duration }}
                  </span>
                </div>

                <h3 class="text-2xl font-bold text-gray-900 mb-4 leading-tight">
                  {{ study.title }}
                </h3>

                <div class="space-y-6">
                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">التحدي:</h4>
                    <p class="text-gray-600 leading-relaxed">
                      {{ study.challenge }}
                    </p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-gray-900 mb-2">الحل:</h4>
                    <p class="text-gray-600 leading-relaxed">
                      {{ study.solution }}
                    </p>
                  </div>

                  <div>
                    <h4 class="font-semibold text-gray-900 mb-4">النتائج:</h4>
                    <div class="grid grid-cols-1 gap-4">
                      <div
                        v-for="(result, key) in study.results"
                        :key="key"
                        class="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <span class="text-gray-700">{{ result.label }}</span>
                        <span :class="`text-xl font-bold ${result.color}`">{{
                          result.value
                        }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- All Case Studies Grid -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="المزيد من قصص النجاح"
          subtitle="عملاؤنا من جميع القطاعات حققوا نتائج استثنائية"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="study in caseStudies"
            :key="study.id"
            class="bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-2xl transition-shadow"
          >
            <div
              class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-image text-3xl mb-2"></i>
              </div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-2 text-xs text-gray-600 mb-3">
                <span class="bg-[#489f9120] text-[#489f91] px-2 py-1 rounded">{{
                  study.industry
                }}</span>
                <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded">{{
                  study.duration
                }}</span>
              </div>

              <h3
                class="text-lg font-semibold text-gray-900 mb-3 leading-tight"
              >
                {{ study.title }}
              </h3>

              <div class="grid grid-cols-1 gap-3 mb-4">
                <div
                  v-for="(result, key) in study.results"
                  :key="key"
                  class="flex items-center justify-between text-sm"
                >
                  <span class="text-gray-600">{{ result.label }}:</span>
                  <span :class="`font-semibold ${result.color}`">{{
                    result.value
                  }}</span>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Industries Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="قطاعات متنوعة"
          subtitle="عملاؤنا من جميع المجالات يحققون نتائج مميزة"
          class="mb-16"
        />

        <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          <div
            v-for="industry in industries"
            :key="industry.name"
            class="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-shadow"
          >
            <div
              class="w-16 h-16 bg-[#489f9120] text-[#489f91] rounded-full flex items-center justify-center mx-auto mb-4 text-2xl"
            >
              <i :class="industry.icon"></i>
            </div>
            <h3 class="font-semibold text-gray-900 mb-2 text-sm">
              {{ industry.name }}
            </h3>
            <p class="text-xs text-gray-600">{{ industry.count }} عميل</p>
          </div>
        </div>
      </div>
    </section>

    <!-- ROI Calculator -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <SectionHeading
          title="احسب عائدك المتوقع"
          subtitle="اكتشف كم يمكن أن توفر وتكسب مع WA Smart Sender"
          class="mb-12"
        />

        <div class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold mb-6">معلومات نشاطك التجاري</h3>
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    عدد العملاء الحاليين
                  </label>
                  <input
                    v-model.number="customers"
                    type="number"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
                    placeholder="مثال: 500"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    متوسط قيمة الطلب (ريال)
                  </label>
                  <input
                    v-model.number="orderValue"
                    type="number"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
                    placeholder="مثال: 150"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">
                    معدل الطلبات الشهرية لكل عميل
                  </label>
                  <input
                    v-model.number="monthlyOrders"
                    type="number"
                    step="0.1"
                    class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91]"
                    placeholder="مثال: 2.5"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 class="text-lg font-semibold mb-6">العائد المتوقع مع WAS</h3>
              <div class="bg-[#489f91] rounded-lg p-6 space-y-4">
                <div class="flex justify-between">
                  <span class="text-gray-100">الإيرادات الحالية (شهرياً)</span>
                  <span class="font-semibold text-white"
                    >{{
                      calculatedROI.currentRevenue.toLocaleString()
                    }}
                    ريال</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-100">الزيادة المتوقعة (+35%)</span>
                  <span class="font-semibold text-green-300"
                    >+{{
                      calculatedROI.revenueIncrease.toLocaleString()
                    }}
                    ريال</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-100">توفير في التسويق</span>
                  <span class="font-semibold text-green-300"
                    >{{
                      calculatedROI.marketingSavings.toLocaleString()
                    }}
                    ريال</span
                  >
                </div>
                <div class="flex justify-between">
                  <span class="text-gray-100">تكلفة WA Smart Sender</span>
                  <span class="font-semibold text-red-300"
                    >-{{ calculatedROI.wasCost }} ريال</span
                  >
                </div>
                <hr class="border-white/20" />
                <div class="flex justify-between text-lg">
                  <span class="font-bold text-white">صافي العائد الشهري</span>
                  <span class="font-bold text-green-200 text-xl"
                    >+{{ calculatedROI.netReturn.toLocaleString() }} ريال</span
                  >
                </div>
              </div>
              <p class="text-sm text-gray-600 mt-4 text-center">
                * التقديرات مبنية على متوسط نتائج عملائنا
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonial Quote -->
    <section class="py-20 bg-[#489f91] text-white">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <div class="mb-8">
          <i class="pi pi-quote-left text-4xl opacity-50"></i>
        </div>
        <blockquote
          class="text-2xl md:text-3xl font-light leading-relaxed mb-8"
        >
          "بعد 6 أشهر من استخدام WA Smart Sender، مبيعاتي زادت 50% ووفرت أكثر من
          20 ساعة أسبوعياً. كان أفضل استثمار لنشاطي التجاري."
        </blockquote>
        <div class="flex items-center justify-center">
          <div
            class="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center me-4"
          >
            <i class="pi pi-user text-2xl text-white/80"></i>
          </div>
          <div class="text-start">
            <div class="font-semibold text-lg">عبدالرحمن السعيد</div>
            <div class="text-gray-200">مؤسس متجر التقنية المتقدمة</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <CTAInline
          title="اكتب قصة نجاحك التالية"
          description="انضم لمئات العملاء الذين غيروا مسار أعمالهم مع WA Smart Sender"
          button-text="ابدأ قصة نجاحك"
          button-link="/pricing"
          variant="primary"
          size="lg"
        />
      </div>
    </section>
  </div>
</template>
