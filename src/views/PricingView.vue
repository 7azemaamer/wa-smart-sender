<script setup>
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import PricingCard from "@/components/common/PricingCard.vue";
import FaqAccordion from "@/components/common/FaqAccordion.vue";
import { freeTrial, pricingPlans } from "@/constants/pricing.js";
import ApiService from "@/utils/api.js";
import { computed, onMounted, provide, ref } from "vue";

const ANNUAL_DISCOUNT_PERCENT = 80;

const globalCurrency = ref("USD");
const billingPeriod = ref("monthly");
const plans = ref([]);
const trialPlan = ref(null);
const loadingPlans = ref(false);
const plansError = ref(null);

provide("globalCurrency", globalCurrency);
provide("billingPeriod", billingPeriod);

function toNumber(value, fallback = 0) {
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function roundCurrency(value) {
  return Math.round(toNumber(value) * 100) / 100;
}

function normalizePlanFamilyName(name) {
  return String(name || "")
    .replace(
      /\b(annual|yearly|monthly)\b|(?:^|\s)(سنوي|سنوية|شهري|شهرية)(?:\s|$)/gi,
      " "
    )
    .replace(/[-_/()]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function inferBillingCycle(plan) {
  const explicitCycle = String(plan?.billingCycle || "")
    .trim()
    .toLowerCase();
  if (explicitCycle === "monthly" || explicitCycle === "yearly") {
    return explicitCycle;
  }

  const durationMonths = toNumber(plan?.durationMonths, 1);
  const planName = String(plan?.name || "").toLowerCase();
  const isYearlyByName =
    planName.includes("annual") ||
    planName.includes("yearly") ||
    planName.includes("سنوي") ||
    planName.includes("سنوية");

  if (isYearlyByName || durationMonths >= 11.5) {
    return "yearly";
  }

  return "monthly";
}

function planNameToArabic(planName) {
  const normalized = String(planName || "").toLowerCase();
  if (normalized.includes("starter")) return "المبتدئ";
  if (normalized.includes("pro")) return "الاحترافي";
  if (normalized.includes("business")) return "الأعمال";
  if (normalized.includes("trial")) return "تجربة مجانية";
  return normalizePlanFamilyName(planName) || planName || "الخطة";
}

function formatLimitLabel(limitValue) {
  const limit = toNumber(limitValue, 0);
  if (limit >= 999999) return "رسائل غير محدودة";
  if (limit <= 0) return "0 رسالة/شهر";
  return `${limit.toLocaleString()} رسالة/شهر`;
}

function formatAiAutoReplyLabel(aiValue) {
  const limit = toNumber(aiValue, 0);
  if (limit >= 999999) return "ردود ذكية غير محدودة";
  if (limit <= 0) return "بدون رد ذكي تلقائي";
  return `${limit.toLocaleString()} رد ذكي تلقائي`;
}

function ensureArray(value) {
  if (Array.isArray(value)) return value;
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed;
    } catch (_) {}

    return value
      .split(/[,\n]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function choosePreferredVariant(existingPlan, candidatePlan, cycle) {
  if (!existingPlan) return candidatePlan;
  if (!candidatePlan) return existingPlan;

  const existingOrder = toNumber(existingPlan.displayOrder ?? existingPlan.order, 9999);
  const candidateOrder = toNumber(candidatePlan.displayOrder ?? candidatePlan.order, 9999);

  if (candidateOrder < existingOrder) return candidatePlan;
  if (candidateOrder > existingOrder) return existingPlan;

  const existingDuration = toNumber(existingPlan.durationMonths, 0);
  const candidateDuration = toNumber(candidatePlan.durationMonths, 0);

  if (cycle === "yearly") {
    const existingDelta = Math.abs(existingDuration - 12);
    const candidateDelta = Math.abs(candidateDuration - 12);
    return candidateDelta < existingDelta ? candidatePlan : existingPlan;
  }

  return candidateDuration < existingDuration ? candidatePlan : existingPlan;
}

function buildWebsitePlans(rawPlans = []) {
  const plansList = Array.isArray(rawPlans) ? rawPlans : [];
  const trial = plansList.find((plan) => plan?.is_trial) || null;
  const groups = new Map();

  for (const plan of plansList) {
    if (!plan || plan.is_trial) continue;
    if (toNumber(plan.displayOrder, 0) === -1) continue;

    const familyKey =
      String(plan.planFamily || "").trim().toLowerCase() ||
      normalizePlanFamilyName(plan.name).toLowerCase() ||
      `plan-${plan.id}`;

    const cycle = inferBillingCycle(plan);

    if (!groups.has(familyKey)) {
      groups.set(familyKey, {
        familyKey,
        displayOrder: toNumber(plan.displayOrder, 9999),
        isPopular: Boolean(plan.isPopular),
        variants: {},
      });
    }

    const group = groups.get(familyKey);
    group.variants[cycle] = choosePreferredVariant(group.variants[cycle], plan, cycle);
    group.displayOrder = Math.min(group.displayOrder, toNumber(plan.displayOrder, 9999));
    group.isPopular = group.isPopular || Boolean(plan.isPopular);
  }

  const mappedPlans = [...groups.values()]
    .sort((a, b) => a.displayOrder - b.displayOrder)
    .map((group) => {
      const monthlyVariant = group.variants.monthly || group.variants.yearly || null;
      const yearlyVariant = group.variants.yearly || null;
      if (!monthlyVariant) return null;

      const monthlyPrice = roundCurrency(monthlyVariant.price);
      const annualBasePrice = roundCurrency(monthlyPrice * 12);
      const annualPrice = roundCurrency(
        annualBasePrice * (1 - ANNUAL_DISCOUNT_PERCENT / 100)
      );
      const features = ensureArray(monthlyVariant.features);
      const familyName = normalizePlanFamilyName(monthlyVariant.name);

      return {
        id: group.familyKey,
        backendMonthlyId: monthlyVariant.id,
        backendAnnualId: yearlyVariant?.id || null,
        name: familyName || monthlyVariant.name,
        nameAr: planNameToArabic(monthlyVariant.name),
        monthlyPrice,
        annualPrice,
        annualDiscount: ANNUAL_DISCOUNT_PERCENT,
        popular: Boolean(monthlyVariant.isPopular || group.isPopular),
        tagAr: "الأكثر شيوعاً",
        main_features_ar: [
          formatLimitLabel(monthlyVariant.limit),
          formatAiAutoReplyLabel(monthlyVariant.maxAiAutoReplies),
        ],
        extra_features_ar: features,
        maxMonthlyAiRedrafts: toNumber(monthlyVariant.maxMonthlyAiRedrafts, 0),
        affiliatePoints: toNumber(monthlyVariant.affiliate_points, 0),
        limit: toNumber(monthlyVariant.limit, 0),
        maxAiAutoReplies: toNumber(monthlyVariant.maxAiAutoReplies, 0),
        buttonText: `ابدأ مع ${planNameToArabic(monthlyVariant.name)}`,
        buttonLink:
          "https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj",
      };
    })
    .filter(Boolean);

  return { trial, plans: mappedPlans };
}

function fallbackPlansFromConstants() {
  const plansFromConstants = pricingPlans.map((plan) => {
    const monthlyPrice = roundCurrency(plan.monthlyPrice);
    const annualBasePrice = roundCurrency(monthlyPrice * 12);
    const annualPrice = roundCurrency(
      annualBasePrice * (1 - ANNUAL_DISCOUNT_PERCENT / 100)
    );

    return {
      ...plan,
      annualPrice,
      annualDiscount: ANNUAL_DISCOUNT_PERCENT,
      limit: plan.id === "starter" ? 5000 : 999999,
      maxAiAutoReplies:
        plan.id === "starter" ? 50 : plan.id === "pro" ? 500 : 2000,
      maxMonthlyAiRedrafts:
        plan.id === "starter" ? 50 : plan.id === "pro" ? 200 : 500,
      affiliatePoints:
        plan.id === "starter" ? 10 : plan.id === "pro" ? 15 : 25,
    };
  });

  return { trial: freeTrial, plans: plansFromConstants };
}

async function fetchPlans() {
  try {
    loadingPlans.value = true;
    plansError.value = null;

    const response = await ApiService.getPublicPlans();
    const backendPlans = Array.isArray(response?.data) ? response.data : [];

    if (!backendPlans.length) {
      throw new Error("No plans returned from backend");
    }

    const mapped = buildWebsitePlans(backendPlans);
    if (!mapped.plans.length) {
      throw new Error("No billable plans after mapping");
    }

    plans.value = mapped.plans;
    trialPlan.value = mapped.trial;
  } catch (error) {
    console.error("Failed to fetch dynamic plans:", error);
    plansError.value = "تعذر تحميل الأسعار اللحظية. تم عرض نسخة احتياطية.";
    const fallback = fallbackPlansFromConstants();
    plans.value = fallback.plans;
    trialPlan.value = fallback.trial;
  } finally {
    loadingPlans.value = false;
  }
}

const monthlyBasePrice = computed(() => {
  if (!plans.value.length) return null;
  return Math.min(...plans.value.map((plan) => toNumber(plan.monthlyPrice, 0)));
});

const seoDescription = computed(() => {
  if (monthlyBasePrice.value == null) {
    return "خطط WA Smart Sender الشهرية والسنوية محدثة مباشرة من النظام مع خيارات مرنة لجميع الأحجام.";
  }

  return `خطط WA Smart Sender محدثة مباشرة من النظام، تبدأ من ${monthlyBasePrice.value}$ شهرياً مع خصم سنوي ${ANNUAL_DISCOUNT_PERCENT}%.`;
});

const trialDaysLabel = computed(() => {
  return toNumber(trialPlan.value?.trialDays ?? freeTrial.durationDays, freeTrial.durationDays);
});

const trialMessagesLimitLabel = computed(() => {
  const limit = toNumber(trialPlan.value?.limit ?? freeTrial.limit, freeTrial.limit);
  return limit.toLocaleString();
});

const trialAiRedrafts = computed(() => {
  return toNumber(trialPlan.value?.maxMonthlyAiRedrafts, 10);
});

const byFamily = computed(() => {
  const pickByKeyword = (keyword, fallbackIndex) => {
    return (
      plans.value.find((plan) =>
        String(plan.id || plan.name || "").toLowerCase().includes(keyword)
      ) || plans.value[fallbackIndex] || null
    );
  };

  return {
    starter: pickByKeyword("starter", 0),
    pro: pickByKeyword("pro", 1),
    business: pickByKeyword("business", 2),
  };
});

function displayQuota(value, empty = "—") {
  const numeric = toNumber(value, NaN);
  if (!Number.isFinite(numeric)) return empty;
  if (numeric >= 999999) return "غير محدود";
  if (numeric <= 0) return "—";
  return numeric.toLocaleString();
}

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
      "نقبل طرق الدفع المتاحة في صفحة الخطط داخل النظام. قد تختلف الوسائل حسب بلدك وإعدادات الحساب.",
  },
  {
    question: "هل يمكنني إلغاء اشتراكي في أي وقت؟",
    answer:
      "نعم، يمكنك إلغاء اشتراكك في أي وقت. ستستمر في الوصول للخدمة حتى نهاية دورة الفواتير الحالية.",
  },
  {
    question: "ما الفرق بين الباقات الشهرية والسنوية؟",
    answer: `الخطة السنوية على الموقع تعرض حالياً خصم ${ANNUAL_DISCOUNT_PERCENT}% مقارنة بالتكلفة الشهرية السنوية.`,
  },
  {
    question: "هل الأسعار شاملة الضريبة؟",
    answer:
      "الأسعار المعروضة قبل الضريبة. قد تُطبق ضريبة القيمة المضافة حسب موقعك الجغرافي.",
  },
];

onMounted(() => {
  fetchPlans();
});
</script>

<template>
  <AppSEO
    title="أسعار WA Smart Sender - خطط مرنة لجميع الأحجام"
    :description="seoDescription"
    canonical="/pricing"
    image="/og/pricing.png"
  />

  <div class="">
    <section class="py-4 md:py-12">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="اختر الخطة المناسبة لك"
          subtitle="أسعار شفافة وعادلة لجميع أحجام الأعمال"
          size="xl"
          class="mb-8"
        />

        <div
          class="flex flex-wrap justify-center items-center gap-8 text-gray-600 text-sm mb-10"
        >
          <div class="flex items-center">
            <i class="pi pi-check-circle text-[#489f91] me-2"></i>
            {{ trialDaysLabel }} أيام تجريبي مجاني
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

        <div class="flex justify-center mb-6">
          <div class="relative bg-gray-100 rounded-full p-1 flex items-center shadow-inner">
            <div
              class="absolute top-1 bottom-1 bg-white rounded-full shadow-sm transition-all duration-300 ease-in-out"
              :style="{
                width: 'calc(50% - 0.25rem)',
                transform:
                  billingPeriod === 'monthly'
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
              <span class="bg-green-100 text-green-700 text-xs px-2 py-0.5 rounded-full font-bold"
                >وفّر {{ ANNUAL_DISCOUNT_PERCENT }}%</span
              >
            </button>
          </div>
        </div>

        <div class="flex justify-center">
          <div class="relative bg-gray-100 rounded-full p-1 flex items-center shadow-inner">
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
                  currency === 'USD' ? 'دولار' : currency === 'SAR' ? 'ريال' : 'جنيه'
                }}</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </section>

    <section class="pb-8 pt-6 md:pt-4">
      <div class="container mx-auto px-6 max-w-6xl">
        <div v-if="loadingPlans" class="text-center py-14">
          <i class="pi pi-spinner pi-spin text-5xl text-[#489f91] mb-4"></i>
          <p class="text-gray-700 text-lg">جاري تحميل الخطط من النظام...</p>
        </div>

        <div v-else>
          <div
            v-if="plansError"
            class="mb-6 rounded-xl border border-amber-300 bg-amber-50 text-amber-800 px-4 py-3 text-sm"
          >
            {{ plansError }}
          </div>

          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <PricingCard v-for="plan in plans" :key="plan.id" :plan="plan" />
          </div>
        </div>
      </div>
    </section>

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
                  <th class="py-4 px-6 text-center text-xs">{{ byFamily.starter?.nameAr || 'المبتدئ' }}</th>
                  <th class="py-4 px-6 text-center text-xs">
                    <span class="bg-[#489f91] text-white px-2 py-1 rounded-full">{{ byFamily.pro?.nameAr || 'الاحترافي' }}</span>
                  </th>
                  <th class="py-4 px-6 text-center text-xs">{{ byFamily.business?.nameAr || 'الأعمال' }}</th>
                </tr>
              </thead>
              <tbody class="divide-y divide-gray-200">
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">عدد الرسائل</td>
                  <td class="py-4 px-6 text-center">{{ trialMessagesLimitLabel }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.starter?.limit) }}</td>
                  <td class="py-4 px-6 text-center text-[#489f91] font-semibold">{{ displayQuota(byFamily.pro?.limit) }}</td>
                  <td class="py-4 px-6 text-center text-[#489f91] font-semibold">{{ displayQuota(byFamily.business?.limit) }}</td>
                </tr>
                <tr class="bg-gray-50">
                  <td class="py-4 px-6 font-medium text-gray-900">الردود الذكية التلقائية</td>
                  <td class="py-4 px-6 text-center text-gray-400">—</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.starter?.maxAiAutoReplies) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.pro?.maxAiAutoReplies) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.business?.maxAiAutoReplies) }}</td>
                </tr>
                <tr>
                  <td class="py-4 px-6 font-medium text-gray-900">إعادة صياغة ذكية/شهر</td>
                  <td class="py-4 px-6 text-center">{{ trialAiRedrafts }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.starter?.maxMonthlyAiRedrafts) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.pro?.maxMonthlyAiRedrafts) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.business?.maxMonthlyAiRedrafts) }}</td>
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
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.starter?.affiliatePoints) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.pro?.affiliatePoints) }}</td>
                  <td class="py-4 px-6 text-center">{{ displayQuota(byFamily.business?.affiliatePoints) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

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
            <span class="text-xl font-extrabold tracking-wide">حمّل الإضافة مجاناً</span>
            <i
              class="pi pi-arrow-left text-lg group-hover:translate-x-1 transition-transform duration-300"
            ></i>
          </div>

          <div
            class="absolute inset-0 rounded-xl border-2 border-[#489f91]/30 animate-ping opacity-20"
          ></div>
        </a>
      </div>
    </section>
  </div>
</template>
