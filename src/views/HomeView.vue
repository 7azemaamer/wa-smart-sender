<script setup>
import AppSEO from "@/components/common/AppSEO.vue";
import Hero from "@/components/common/Hero.vue";
import How from "@/components/common/How.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";
import CTAInline from "@/components/common/CTAInline.vue";
import FeatureCard from "@/components/common/FeatureCard.vue";
import TestimonialCard from "@/components/common/TestimonialCard.vue";
import { RouterLink } from "vue-router";
import "swiper/css";
import { Swiper, SwiperSlide } from "vue-awesome-swiper";
import "@/assets/swiper-custom.css";

const blogPosts = [
  {
    id: 1,
    title: "أمان الإرسال الجماعي في واتساب للأعمال: دليل شامل",
    excerpt:
      "كيف تُرسل رسائل جماعية بأمان دون حظر؟ أفضل الممارسات والإعدادات داخل WA Smart Sender.",
    date: "2025-01-20",
    readTime: "5 دقائق",
    image: "/blog/whatsapp-bulk-safety.jpg",
    slug: "whatsapp-bulk-safety-guide",
  },
  {
    id: 2,
    title: "القوالب الجاهزة لأتمتة الردود بالعربية",
    excerpt:
      "مجموعة شاملة من قوالب الردود التلقائية المُحسنة للسوق العربي مع أمثلة عملية.",
    date: "2025-01-18",
    readTime: "7 دقائق",
    image: "/blog/arabic-templates.jpg",
    slug: "arabic-auto-reply-templates",
  },
  {
    id: 3,
    title: "أفضل ممارسات التقارير وتتبع الأداء",
    excerpt:
      "كيفية قراءة وتحليل تقارير الأداء لتحسين نتائج حملاتك التسويقية على واتساب.",
    date: "2025-01-15",
    readTime: "6 دقائق",
    image: "/blog/performance-reports.jpg",
    slug: "performance-tracking-best-practices",
  },
];

const keyFeatures = [
  {
    icon: "pi pi-send",
    title: "إرسال جماعي ذكي",
    description: "أرسل آلاف الرسائل مع فواصل زمنية عشوائية لتجنب الحظر",
    highlighted: true,
  },
  {
    icon: "pi pi-cog",
    title: "ردود تلقائية بالذكاء الاصطناعي",
    description: "ردود ذكية مخصصة تفهم السياق وتتفاعل بطريقة طبيعية",
    highlighted: false,
  },
  {
    icon: "pi pi-chart-line",
    title: "تحليلات متقدمة",
    description: "تقارير مفصلة عن الأداء مع رؤى قابلة للتنفيذ",
    highlighted: false,
  },
  {
    icon: "pi pi-shield",
    title: "حماية ضد الحظر",
    description: "تقنيات متطورة للحفاظ على أمان حسابك من الحظر",
    highlighted: false,
  },
];

const testimonials = [
  {
    name: "أحمد محمد",
    role: "مدير التسويق، شركة الرؤية",
    content:
      "WA Smart Sender غيّر طريقة تعاملنا مع العملاء. وفرنا 70% من الوقت في الردود اليدوية.",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "فاطمة العلي",
    role: "صاحبة متجر إلكتروني",
    content:
      "الأداة الوحيدة التي تدعم العربية بشكل كامل. أرسل 500+ رسالة يومياً بدون مشاكل.",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "محمد السعيد",
    role: "مطور تطبيقات",
    content: "API ممتاز ودعم فني رائع. تكاملت بسهولة مع نظامنا الحالي.",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "أحمد وحيد",
    role: "مستخدم Chrome Web Store",
    content: "إضافة رائعة ومفيدة للـ CRMs والأعمال الإلكترونية للمبيعات",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "محمود سعيد",
    role: "مستخدم Chrome Web Store",
    content: "إضافة مفيدة للـ CRMs والمبيعات والتسويق والمزيد",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "مروان محمد",
    role: "مستخدم Chrome Web Store",
    content: "فعالة جداً",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "عبدالرحمن علي",
    role: "مستخدم Chrome Web Store",
    content: "مذهلة!",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "عمر",
    role: "مستخدم Chrome Web Store",
    content:
      "الإضافة قوية بشكل لا يصدق ومفيدة للغاية، تجعل المهام أكثر كفاءة وسلاسة. أنصح بها بشدة",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "أسترو موفي",
    role: "مستخدم Chrome Web Store",
    content:
      "WA Smart Sender أداة مذهلة تفي بوعودها حقاً! إنها مثالية للشركات والمسوقين وأي شخص يبحث عن تبسيط اتصالاته عبر واتساب. القدرة على إرسال رسائل جماعية وإعداد ردود تلقائية واستخدام ميزات الذكاء الاصطناعي أمر رائع. أنصح بها بشدة",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "YN Lines",
    role: "مستخدم Chrome Web Store",
    content: "أعجبنا بها، يرجى الاستمرار في تحديثها",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "أحمد سلامة",
    role: "مستخدم Chrome Web Store",
    content: "أداة واتساب سندر مفيدة جداً",
    rating: 5,
    avatar: "pi pi-user",
  },
  {
    name: "محمود سعيد",
    role: "مستخدم Chrome Web Store",
    content: "إضافة جيدة ومفيدة حقاً",
    rating: 5,
    avatar: "pi pi-user",
  },
];

// Stats
const stats = [
  { number: "100+", label: "مستخدم نشط" },
  { number: "500,000+", label: "رسالة شهرياً" },
  { number: "99.9%", label: "معدل التشغيل" },
  { number: "24/7", label: "دعم فني" },
];

const swiperOptions = {
  slidesPerView: 3,
  spaceBetween: 24,
  loop: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    640: {
      slidesPerView: 1,
      spaceBetween: 16,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
  },
};
</script>

<template>
  <AppSEO
    title="WA Smart Sender - أتمتة واتساب للأعمال"
    description="أداة شاملة لأتمتة واتساب: رسائل جماعية، ردود تلقائية بالذكاء الاصطناعي، قوالب جاهزة، وتقارير مفصلة. ابدأ مجاناً اليوم!"
    canonical="/"
    image="/og/home.png"
  />

  <div>
    <!-- Hero Section -->
    <Hero />

    <!-- How It Works -->
    <How />

    <!-- Key Features Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="لماذا WA Smart Sender؟"
          subtitle="الحل الشامل لأتمتة واتساب في السوق العربي"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            v-for="feature in keyFeatures"
            :key="feature.title"
            :feature="feature"
          />
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-16 bg-[#489f91]">
      <div class="container mx-auto px-6 max-w-6xl">
        <div
          class="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white"
        >
          <div v-for="stat in stats" :key="stat.label" class="">
            <div class="text-3xl md:text-4xl font-bold mb-2">
              {{ stat.number }}
            </div>
            <div class="text-white text-sm md:text-base">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="من نحن؟"
              subtitle="فريق متخصص في تطوير حلول التسويق الرقمي"
              align="start"
              class="mb-8"
            />

            <div class="space-y-6 text-gray-700 leading-relaxed">
              <p>
                نحن فريق من المطورين والمسوقين الرقميين المتخصصين في تقنيات
                الأتمتة. بدأنا WA Smart Sender لحل تحديات التسويق عبر واتساب في
                السوق العربي.
              </p>
              <p>
                مع أكثر من 5 سنوات من الخبرة في تطوير أدوات التسويق الرقمي،
                نساعد الشركات على الوصول لعملائها بطريقة أكثر فعالية وأماناً.
              </p>
              <div class="flex items-center gap-4">
                <div
                  class="w-12 h-12 bg-[#489f91] text-white rounded-full flex items-center justify-center"
                >
                  <i class="pi pi-users text-lg"></i>
                </div>
                <div>
                  <h4 class="font-semibold text-gray-900">فريق من الخبراء</h4>
                  <p class="text-sm text-gray-600">مطورين ومسوقين متخصصين</p>
                </div>
              </div>
            </div>
          </div>

          <div class="relative">
            <div
              class="bg-gradient-to-br from-[#489f91]/10 to-[#489f91]/20 rounded-2xl p-8 h-96 flex items-center justify-center"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-users text-6xl mb-4 text-[#489f91]"></i>
                <p class="text-lg font-medium">فريق WA Smart Sender</p>
              </div>
            </div>
            <!-- Floating elements -->
            <div
              class="absolute -top-4 -left-4 w-8 h-8 bg-[#489f91] rounded-full animate-pulse opacity-60"
            ></div>
            <div
              class="absolute -bottom-4 -right-4 w-12 h-12 bg-[#489f91]/40 rounded-full animate-pulse opacity-40"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="py-20 bg-white">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="ماذا يقول عملاؤنا؟"
          subtitle="آراء حقيقية من أصحاب الأعمال والمسوقين الذين يستخدمون WA Smart Sender"
          class="mb-16"
        />
        <div class="relative">
          <swiper :options="swiperOptions" class="swiper">
            <swiper-slide
              v-for="testimonial in testimonials"
              :key="testimonial.name"
            >
              <TestimonialCard :testimonial="testimonial" />
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
          </swiper>

          <!-- Custom Navigation Buttons -->
          <button class="swiper-button-prev custom-nav-btn" slot="button-prev">
            <i class="pi pi-chevron-right text-lg"></i>
          </button>
          <button class="swiper-button-next custom-nav-btn" slot="button-next">
            <i class="pi pi-chevron-left text-lg"></i>
          </button>
        </div>
      </div>
    </section>

    <!-- Blog Preview Section -->
    <section class="py-20 bg-gradient-to-br from-[#489f91]/5 to-[#489f91]/10">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex items-center justify-between mb-12">
          <SectionHeading
            title="أحدث المقالات"
            subtitle="نصائح ودلائل لتحسين حملاتك التسويقية"
            align="start"
          />
          <RouterLink
            to="/blog"
            class="hidden md:inline-flex items-center text-[#489f91] hover:text-[#3a7a6f] font-medium transition-colors"
          >
            عرض جميع المقالات
            <i class="pi pi-arrow-left ms-2"></i>
          </RouterLink>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <article
            v-for="post in blogPosts"
            :key="post.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 group"
          >
            <div
              class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative overflow-hidden"
            >
              <div class="text-center text-gray-500">
                <i class="pi pi-file-text text-3xl mb-2"></i>
                <p class="text-xs">{{ post.image }}</p>
              </div>
              <!-- Hover overlay -->
              <div
                class="absolute inset-0 bg-[#489f91] bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300"
              ></div>
            </div>

            <div class="p-6">
              <div class="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span class="flex items-center">
                  <i class="pi pi-calendar me-1"></i>
                  {{ new Date(post.date).toLocaleDateString("ar-SA") }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-1"></i>
                  {{ post.readTime }}
                </span>
              </div>

              <h3
                class="text-lg font-semibold text-gray-900 mb-3 group-hover:text-[#489f91] transition-colors leading-tight"
              >
                {{ post.title }}
              </h3>

              <p class="text-gray-600 text-sm leading-relaxed mb-4">
                {{ post.excerpt }}
              </p>

              <RouterLink
                :to="`/blog/${post.slug}`"
                class="inline-flex items-center text-[#489f91] hover:text-[#3a7a6f] font-medium text-sm transition-colors"
              >
                اقرأ المزيد
                <i class="pi pi-arrow-left ms-2"></i>
              </RouterLink>
            </div>
          </article>
        </div>

        <div class="text-center mt-8 md:hidden">
          <RouterLink
            to="/blog"
            class="inline-flex items-center text-[#489f91] hover:text-[#3a7a6f] font-medium transition-colors"
          >
            عرض جميع المقالات
            <i class="pi pi-arrow-left ms-2"></i>
          </RouterLink>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <CTAInline
          title="جاهز لتحويل طريقة تواصلك مع العملاء؟"
          description="انضم إلى آلاف الشركات التي تستخدم WA Smart Sender لتحسين تجربة العملاء وزيادة المبيعات. ابدأ تجربتك المجانية اليوم!"
          button-text="ابدأ التجربة المجانية الآن"
          button-link="https://chromewebstore.google.com/detail/wa-smart-sender/ckibonklempheenficakknnojmemhhcj?hl=en"
          variant="primary"
          size="lg"
        />
      </div>
    </section>

    <!-- Final Stats Banner -->
    <section class="py-12 bg-gray-900 text-white">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex flex-col md:flex-row items-center justify-between">
          <div class="text-center md:text-start mb-6 md:mb-0">
            <h3 class="text-2xl font-bold mb-2">
              انضم للآلاف من المستخدمين السعداء
            </h3>
            <p class="text-gray-300">ابدأ رحلتك نحو أتمتة أكثر ذكاءً اليوم</p>
          </div>
          <RouterLink
            to="/contact"
            class="bg-[#489f91] hover:bg-[#3a7a6f] text-white px-8 py-3 rounded-lg font-semibold transition-colors inline-flex items-center gap-2"
          >
            <i class="pi pi-phone"></i>
            تواصل معنا
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
