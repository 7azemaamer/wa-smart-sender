export const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1 },
  SAR: { symbol: 'ر.س', rate: 3.75 },
  EGP: { symbol: 'ج.م', rate: 48 }
}

export const pricingPlans = [
  {
    id: "starter",
    name: "Starter",
    nameAr: "المبتدئ",
    monthlyPrice: 9.99,
    annualPrice: 89.99,
    annualDiscount: 25,
    popular: false,
    main_features: ["5,000 messages/month", "50 AI Auto-Replies"],
    main_features_ar: ["5,000 رسالة/شهر", "50 رد ذكي تلقائي"],
    extra_features: [
      "Groups Extraction",
      "Message Templates",
      "Keyword Auto-Replies",
      "50 AI Redrafts/month",
      "Excel Import",
      "Reports & Analytics",
      "10 Affiliate Points"
    ],
    extra_features_ar: [
      "استخراج المجموعات",
      "قوالب الرسائل",
      "ردود تلقائية بالكلمات المفتاحية",
      "50 إعادة صياغة ذكية/شهر",
      "استيراد إكسل",
      "التقارير والتحليلات",
      "10 نقاط تسويق بالعمولة"
    ],
    buttonText: "ابدأ مع المبتدئ",
    buttonLink: "https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj"
  },
  {
    id: "pro",
    name: "Pro",
    nameAr: "الاحترافي",
    tag: "Most Popular",
    tagAr: "الأكثر شيوعاً",
    monthlyPrice: 24.99,
    annualPrice: 224.99,
    annualDiscount: 25,
    popular: true,
    main_features: ["Unlimited messages", "500 AI Auto-Replies"],
    main_features_ar: ["رسائل غير محدودة", "500 رد ذكي تلقائي"],
    extra_features: [
      "Everything in Starter",
      "Unlimited message sending",
      "200 AI Redrafts/month",
      "Priority Support",
      "Advanced Bulk Campaigns",
      "15 Affiliate Points"
    ],
    extra_features_ar: [
      "كل مزايا المبتدئ",
      "إرسال رسائل غير محدود",
      "200 إعادة صياغة ذكية/شهر",
      "دعم ذو أولوية",
      "حملات جماعية متقدمة",
      "15 نقطة تسويق بالعمولة"
    ],
    buttonText: "ابدأ مع الاحترافي",
    buttonLink: "https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj"
  },
  {
    id: "business",
    name: "Business",
    nameAr: "الأعمال",
    monthlyPrice: 49.99,
    annualPrice: 449.99,
    annualDiscount: 25,
    popular: false,
    main_features: ["Unlimited messages", "2,000 AI Auto-Replies"],
    main_features_ar: ["رسائل غير محدودة", "2,000 رد ذكي تلقائي"],
    extra_features: [
      "Everything in Pro",
      "2,000 AI Auto-Replies",
      "500 AI Redrafts/month",
      "Premium 24/7 Support",
      "Custom Integrations",
      "Team Collaboration",
      "25 Affiliate Points"
    ],
    extra_features_ar: [
      "كل مزايا الاحترافي",
      "2,000 رد ذكي تلقائي",
      "500 إعادة صياغة ذكية/شهر",
      "دعم مميز على مدار الساعة",
      "تكاملات مخصصة",
      "تعاون الفريق",
      "25 نقطة تسويق بالعمولة"
    ],
    buttonText: "ابدأ مع الأعمال",
    buttonLink: "https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj"
  }
]

export const freeTrial = {
  name: "Free Trial",
  nameAr: "تجربة مجانية",
  durationDays: 3,
  limit: 350,
  features: ["350 messages", "10 AI Redrafts"],
  featuresAr: ["350 رسالة", "10 إعادة صياغة ذكية"]
}

export const formatPrice = (amount, currency = 'USD') => {
  const currencyInfo = CURRENCY_RATES[currency]
  if (!currencyInfo) return `${amount}`

  const rounded = Math.round(amount * 100) / 100
  return `${currencyInfo.symbol}${rounded.toLocaleString()}`
}

export const convertPrice = (usdAmount, targetCurrency = 'USD') => {
  const rate = CURRENCY_RATES[targetCurrency]?.rate || 1
  return Math.round(usdAmount * rate * 100) / 100
}
