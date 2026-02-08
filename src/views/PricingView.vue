<script setup>
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import PricingCard from "@/components/common/PricingCard.vue";
import FaqAccordion from "@/components/common/FaqAccordion.vue";
import { pricingPlans } from "@/constants/pricing.js";
import { ref, provide } from "vue";

const plans = pricingPlans;
const globalCurrency = ref("USD");
const billingPeriod = ref("monthly");

provide("globalCurrency", globalCurrency);
provide("billingPeriod", billingPeriod);

const pricingFaqs = [
  {
    question: "هل يمكنني تغيير خطتي لاحقاً؟",
    answer:
      "نعم، يمكنك ترقية أو تخفيض خطتك في أي وقت. التغييرات ستأخذ مفعولها فوراً وسيتم احتساب الفرق بالتناسب.",
  },
  {
    question: "هل توجد فترة تجريبية مجانية؟",
    answer:
      "نعم، نقدم فترة تجريبية مجانية لمدة 3 أيام مع 350 رسالة. لا حاجة لبطاقة ائتمان للبدء.",
  },
  {
    question: "ما هي طرق الدفع المقبولة؟",
    answer:
      "نقبل جميع بطاقات الائتمان الرئيسية (Visa, MasterCard, American Express) وPayPal. جميع المدفوعات آمنة ومشفرة.",
  },
  {
    question: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
    answer:
      "نعم، يمكنك إلغاء اشتراكك في أي وقت. ستستمر في الوصول للخدمة حتى نهاية دورة الفواتير الحالية.",
  },
  {
    question: "ما الفرق بين الباقات الشهرية والسنوية؟",
    answer:
      "الباقات السنوية توفر لك خصم 25% مقارنة بالدفع الشهري. تحصل على نفس المزايا بسعر أقل عند الالتزام السنوي.",
  },
  {
    question: "هل الأسعار شاملة الضريبة؟",
    answer:
      "الأسعار المعروضة قبل الضريبة. قد تُطبق ضريبة القيمة المضافة حسب موقعك الجغرافي.",
  },
];
</script>

<template>
  <AppSEO
    title="أسعار WA Smart Sender - خطط مرنة لجميع الأحجام"
    description="اختر الخطة المناسبة لك من أسعار WA Smart Sender. خطط مرنة تبدأ من 9.99$ شهرياً مع فترة تجريبية مجانية."
    canonical="/pricing"
    image="/og/pricing.png"
  />

  <div class="">
    <!-- Hero Section -->
    <section class="py-4 md:py-12">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="اختر الخطة المناسبة لك"
          subtitle="أسعار شفافة وعادلة لجميع أحجام الأعمال"
          size="xl"
          class="mb-8"
        />

        <!-- Trust Elements -->
        <div
          class="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm mb-10"
        >
          <div class="flex items-center">
            <i class="pi pi-check-circle text-[#489f91] me-2"></i>
            3 أيام تجريبي مجاني
          </div>
          <div class="flex items-center">
            <i class="pi pi-refresh text-[#489f91] me-2"></i>
            إلغاء في أي وقت
          </div>
          <div class="flex items-center">
            <i class="pi pi-shield text-[#489f91] me-2"></i>
            دفع آمن 100%
          </div>
          <div class="flex items-center">
            <i class="pi pi-headphones text-purple-600 me-2"></i>
            دعم مجاني
          </div>
        </div>

        <!-- Billing Period Toggle -->
        <div class="flex justify-center mb-6">
          <div
            class="relative bg-gray-100 rounded-full p-1 flex items-center shadow-inner"
          >
            <div
              class="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
              :style="{
                width: 'calc(50% - 0.25rem)',
                transform: billingPeriod === 'monthly'
                  ? 'translateX(0.25rem)'
                  : 'translateX(calc(-100% + 0.375rem))',
              }"
            ></div>

            <button
              @click="billingPeriod = 'monthly'"
              :class="[
                'relative z-10 px-8 py-3 rounded-full font-medium transition-all duration-200 min-w-32',
                billingPeriod === 'monthly'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700',
              ]"
            >
              شهري
            </button>
            <button
              @click="billingPeriod = 'annual'"
              :class="[
                'relative z-10 px-8 py-3 rounded-full font-medium transition-all duration-200 min-w-32 flex items-center gap-2',
                billingPeriod === 'annual'
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700',
              ]"
            >
              سنوي
              <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold">وفّر 25%</span>
            </button>
          </div>
        </div>

        <!-- Currency Selector -->
        <div class="flex justify-center">
          <div
            class="relative bg-gray-100 rounded-full p-1 flex items-center shadow-inner"
          >
            <div
              class="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
              :style="{
                width: 'calc(33.333% - 0.125rem)',
                transform: `translateX(${
                  globalCurrency === 'USD'
                    ? '0.25rem'
                    : globalCurrency === 'SAR'
                    ? 'calc(-100% + 0.375rem)'
                    : 'calc(-200% + 0.5rem)'
                })`,
              }"
            ></div>

            <button
              v-for="currency in ['USD', 'SAR', 'EGP']"
              :key="currency"
              @click="globalCurrency = currency"
              :class="[
                'relative z-10 px-6 py-3 rounded-full font-medium transition-all duration-200 flex-1 text-center min-w-24',
                globalCurrency === currency
                  ? 'text-gray-900 font-semibold'
                  : 'text-gray-500 hover:text-gray-700',
              ]"
            >
              <div class="flex flex-col items-center">
                <span class="text-sm font-semibold">{{ currency }}</span>
                <span class="text-xs opacity-75">{{
                  currency === "USD"
                    ? "دولار"
                    : currency === "SAR"
                    ? "ريال"
                    : "جنيه"
                }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="pb-8 pt-6 md:pt-4">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <PricingCard
            v-for="plan in plans"
            :key="plan.id"
            :plan="plan"
          />
        </div>
      </div>
    </section>

    <!-- Features Comparison Table -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="مقارنة مفصلة للخطط"
          subtitle="جميع المزايا والحدود لكل خطة"
          class="mb-16"
        />

        <div class="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <thead class="bg-gray-900 text-white">
                <tr>
                  <th class="py-4 px-6 text-start">الميزة</th>
                  <th class="py-4 px-6 text-center text-xs">تجربة مجانية</th>
                  <th class="py-4 px-6 text-center text-xs">المبتدئ</th>
                  <th class="py-4 px-6 text-center text-xs">
                    <span class="bg-[#489f91] text-white px-2 py-1 rounded-full">الاحترافي</span>
                  </th>
                  <th class="py-4 px-6 text-center text-xs">الأعمال</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">عدد الرسائل</td>
                  <td class="py-4 px-6 text-center">350</td>
                  <td class="py-4 px-6 text-center">5,000</td>
                  <td class="py-4 px-6 text-center text-[#489f91] font-semibold">غير محدود</td>
                  <td class="py-4 px-6 text-center text-[#489f91] font-semibold">غير محدود</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">الردود الذكية التلقائية</td>
                  <td class="py-4 px-6 text-center text-gray-400">—</td>
                  <td class="py-4 px-6 text-center">50</td>
                  <td class="py-4 px-6 text-center">500</td>
                  <td class="py-4 px-6 text-center">2,000</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">إعادة صياغة ذكية/شهر</td>
                  <td class="py-4 px-6 text-center">10</td>
                  <td class="py-4 px-6 text-center">50</td>
                  <td class="py-4 px-6 text-center">200</td>
                  <td class="py-4 px-6 text-center">500</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">استخراج المجموعات</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">قوالب الرسائل</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91] me-1"></i><span class="text-xs">متقدم</span></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91] me-1"></i><span class="text-xs">متقدم</span></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">استيراد إكسل</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">التقارير والتحليلات</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">حملات جماعية متقدمة</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">دعم ذو أولوية</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91] me-1"></i><span class="text-xs">24/7</span></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">تكاملات مخصصة</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">تعاون الفريق</td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-times text-gray-400"></i></td>
                  <td class="py-4 px-6 text-center"><i class="pi pi-check text-[#489f91]"></i></td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">نقاط التسويق بالعمولة</td>
                  <td class="py-4 px-6 text-center text-gray-400">—</td>
                  <td class="py-4 px-6 text-center">10</td>
                  <td class="py-4 px-6 text-center">15</td>
                  <td class="py-4 px-6 text-center">25</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <SectionHeading
          title="أسئلة شائعة حول الأسعار"
          subtitle="إجابات على الأسئلة الأكثر شيوعاً حول خطط التسعير"
          class="mb-16"
        />

        <FaqAccordion :faqs="pricingFaqs" />
      </div>
    </section>

    <!-- Final CTA -->
    <section class="py-20 text-[#489f91]">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-4xl font-bold mb-6">ابدأ رحلتك اليوم</h2>
        <p class="text-xl mb-8 opacity-90">
          حمّل الإضافة مجاناً وابدأ بتجربة 3 أيام مجانية
        </p>
        <a
          href="https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj"
          target="_blank"
          class="group relative inline-flex items-center justify-center px-10 py-4 text-lg font-bold text-white transition-all duration-300 ease-out bg-gradient-to-r from-[#489f91] via-[#3a7a6f] to-[#2d5f57] rounded-xl shadow-lg hover:shadow-xl hover:shadow-[#489f91]/25 hover:scale-105 transform overflow-hidden"
        >
          <div
            class="absolute inset-0 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"
          ></div>

          <div class="relative flex items-center gap-3">
            <i class="pi pi-play text-xl group-hover:animate-pulse"></i>
            <span class="text-xl font-extrabold tracking-wide"
              >حمّل الإضافة مجاناً</span
            >
            <i
              class="pi pi-arrow-left text-lg group-hover:translate-x-1 transition-transform duration-300"
            ></i>
          </div>

          <!-- Pulse ring -->
          <div
            class="absolute inset-0 rounded-xl border-2 border-[#489f91]/30 animate-ping opacity-20"
          ></div>
        </a>
      </div>
    </section>
  </div>
</template>
