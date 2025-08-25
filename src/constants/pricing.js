export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  SAR: { symbol: 'ر.س', rate: 3.75 },
  EGP: { symbol: 'ج.م', rate: 48 }
}

export const pricingPlans = [
  {
    name: "Basic Plan",
    nameAr: "الباقة الأساسية",
    tag: "Most Popular", 
    tagAr: "الأكثر شيوعاً",
    price_usd: 7.50,
    price_sar: 28.13,
    price_egp: 360,
    duration: "1 Month",
    durationAr: "شهر واحد",
    popular: true,
    main_features: [
      "10,000 messages",
      "200 AI"
    ],
    main_features_ar: [
      "10,000 رسالة",
      "200 رد ذكي"
    ],
    extra_features: [
      "Ideal for managing leads, sending campaigns, and automating replies",
      "Fast setup with manual or bank transfer payment",
      "Groups Extraction",
      "Message Templates Management", 
      "Keywords based auto replies",
      "300 AI Auto-Replies",
      "10 affiliate points",
      "49 redrafts"
    ],
    extra_features_ar: [
      "مثالي لإدارة العملاء المحتملين وإرسال الحملات وأتمتة الردود",
      "إعداد سريع مع دفع يدوي أو تحويل بنكي",
      "استخراج المجموعات",
      "إدارة قوالب الرسائل",
      "ردود تلقائية مبنية على الكلمات المفتاحية",
      "300 رد ذكي تلقائي",
      "10 نقاط تسويق بالعمولة",
      "49 إعادة صياغة"
    ],
    buttonText: "ابدأ الباقة الأساسية",
    buttonLink: "/contact"
  },
  {
    name: "Enterprise Plan (Monthly)",
    nameAr: "باقة الشركات (شهرية)",
    price_usd: 26.10,
    old_price_usd: 30.00,
    price_sar: 97.88,
    price_egp: 1253,
    duration: "1 Month", 
    durationAr: "شهر واحد",
    popular: false,
    main_features: [
      "Unlimited messages",
      "4000 AI"
    ],
    main_features_ar: [
      "رسائل غير محدودة", 
      "4000 رد ذكي"
    ],
    extra_features: [
      "All basic plan features with unlimited messages limit",
      "Higher support priority",
      "3000 AI auto-reply",
      "600 AI Redrafts (Monthly)",
      "10 affiliate points",
      "600 redrafts"
    ],
    extra_features_ar: [
      "جميع مزايا الباقة الأساسية مع رسائل غير محدودة",
      "أولوية دعم أعلى",
      "3000 رد ذكي تلقائي",
      "600 إعادة صياغة ذكية (شهرياً)",
      "10 نقاط تسويق بالعمولة", 
      "600 إعادة صياغة"
    ],
    buttonText: "ابدأ الباقة الشهرية",
    buttonLink: "/contact"
  },
  {
    name: "Enterprise Plan (3-Month)",
    nameAr: "باقة الشركات (3 أشهر)",
    price_usd: 75.60,
    old_price_usd: 90.00,
    price_sar: 283.5,
    price_egp: 3629,
    duration: "3 Months",
    durationAr: "3 أشهر", 
    popular: false,
    main_features: [
      "Unlimited messages",
      "7000 AI"
    ],
    main_features_ar: [
      "رسائل غير محدودة",
      "7000 رد ذكي"
    ],
    extra_features: [
      "All core Enterprise features",
      "Unlimited messaging & contacts",
      "7,000 AI Auto-Replies",
      "Excel import + random injection",
      "Template manager",
      "Reports + Logs export",
      "Works with Arabic/English", 
      "Priority message delivery logic",
      "1200 AI Redrafts (Monthly)",
      "10 affiliate points",
      "1200 redrafts"
    ],
    extra_features_ar: [
      "جميع مزايا باقة الشركات الأساسية",
      "رسائل وجهات اتصال غير محدودة",
      "7,000 رد ذكي تلقائي",
      "استيراد إكسل + حقن عشوائي",
      "مدير القوالب",
      "تصدير التقارير والسجلات",
      "يعمل مع العربية/الإنجليزية",
      "منطق تسليم الرسائل الأولوية",
      "1200 إعادة صياغة ذكية (شهرياً)",
      "10 نقاط تسويق بالعمولة",
      "1200 إعادة صياغة"
    ],
    buttonText: "ابدأ باقة 3 أشهر",
    buttonLink: "/contact"
  },
  {
    name: "Enterprise Plan (6-Month)",
    nameAr: "باقة الشركات (6 أشهر)",
    price_usd: 145.80,
    old_price_usd: 180.00,
    price_sar: 546.75,
    price_egp: 6998,
    duration: "6 Months",
    durationAr: "6 أشهر",
    popular: false,
    main_features: [
      "Unlimited messages",
      "12000 AI"
    ],
    main_features_ar: [
      "رسائل غير محدودة",
      "12000 رد ذكي"
    ],
    extra_features: [
      "All monthly features included",
      "Extended support for 6 months", 
      "Save 1 month's cost compared to monthly",
      "2000 AI Redrafts",
      "10 affiliate points",
      "2000 redrafts"
    ],
    extra_features_ar: [
      "جميع المزايا الشهرية مضمنة",
      "دعم ممتد لمدة 6 أشهر",
      "وفر تكلفة شهر واحد مقارنة بالشهرية",
      "2000 إعادة صياغة ذكية",
      "10 نقاط تسويق بالعمولة",
      "2000 إعادة صياغة"
    ],
    buttonText: "ابدأ باقة 6 أشهر", 
    buttonLink: "/contact"
  },
  {
    name: "Enterprise Plan (Yearly)",
    nameAr: "باقة الشركات (سنوية)",
    price_usd: 270.00,
    old_price_usd: 360.00,
    price_sar: 1012.5,
    price_egp: 12960,
    duration: "12 Months",
    durationAr: "12 شهر",
    popular: false,
    main_features: [
      "Unlimited messages",
      "30000 AI"
    ],
    main_features_ar: [
      "رسائل غير محدودة",
      "30000 رد ذكي"
    ],
    extra_features: [
      "Everything in monthly & 6-month plans",
      "Save $90 vs monthly plan",
      "30,000 AI auto reply",
      "3000 AI Redrafts (Monthly)",
      "10 affiliate points", 
      "3000 redrafts"
    ],
    extra_features_ar: [
      "كل شيء في الباقات الشهرية و 6 أشهر",
      "وفر $90 مقارنة بالباقة الشهرية",
      "30,000 رد ذكي تلقائي",
      "3000 إعادة صياغة ذكية (شهرياً)",
      "10 نقاط تسويق بالعمولة",
      "3000 إعادة صياغة"
    ],
    buttonText: "ابدأ الباقة السنوية",
    buttonLink: "/contact"
  }
]

export const formatPrice = (amount, currency = 'USD') => {
  const currencyInfo = CURRENCY_RATES[currency]
  if (!currencyInfo) return `${amount}`
  
  return `${currencyInfo.symbol}${amount.toLocaleString()}`
}

export const convertPrice = (usdAmount, targetCurrency = 'USD') => {
  const rate = CURRENCY_RATES[targetCurrency]?.rate || 1
  return Math.round(usdAmount * rate * 100) / 100
}