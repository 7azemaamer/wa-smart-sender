<script setup>
import AppSEO from '@/components/common/AppSEO.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import CTAInline from '@/components/common/CTAInline.vue'

const guides = [
  {
    id: 1,
    title: 'دليل البدء السريع',
    description: 'تعلم كيفية تثبيت وإعداد WA Smart Sender في 5 دقائق',
    icon: 'pi pi-play-circle',
    difficulty: 'مبتدئ',
    duration: '5 دقائق',
    steps: 4,
    link: '#quick-start'
  },
  {
    id: 2,
    title: 'إعداد الإرسال الجماعي الآمن',
    description: 'كيفية إعداد حملة إرسال جماعي مع تجنب الحظر',
    icon: 'pi pi-send',
    difficulty: 'متوسط',
    duration: '10 دقائق',
    steps: 6,
    link: '#bulk-sending'
  },
  {
    id: 3,
    title: 'تخصيص الردود التلقائية',
    description: 'إنشاء ردود ذكية تتفاعل مع استفسارات العملاء',
    icon: 'pi pi-cog',
    difficulty: 'متوسط',
    duration: '8 دقائق',
    steps: 5,
    link: '#auto-replies'
  },
  {
    id: 4,
    title: 'استخدام متغيرات الرسائل',
    description: 'تخصيص الرسائل باستخدام [الاسم] و{التاريخ} ومتغيرات أخرى',
    icon: 'pi pi-code',
    difficulty: 'متقدم',
    duration: '12 دقائق',
    steps: 7,
    link: '#message-variables'
  },
  {
    id: 5,
    title: 'قراءة التقارير والإحصائيات',
    description: 'فهم وتحليل تقارير الأداء لتحسين حملاتك',
    icon: 'pi pi-chart-line',
    difficulty: 'متوسط',
    duration: '6 دقائق',
    steps: 4,
    link: '#reports'
  },
  {
    id: 6,
    title: 'إدارة الأرقام المحظورة',
    description: 'حماية سمعتك من خلال إدارة قوائم الأرقام المحظورة',
    icon: 'pi pi-ban',
    difficulty: 'مبتدئ',
    duration: '4 دقائق',
    steps: 3,
    link: '#blocked-numbers'
  }
]

const videoGuides = [
  {
    id: 1,
    title: 'شرح شامل للإرسال الجماعي',
    description: 'فيديو تعليمي كامل يوضح جميع خطوات الإرسال الجماعي',
    thumbnail: '/videos/bulk-sending-thumb.jpg',
    duration: '15:30',
    views: '2,450',
    link: 'https://youtube.com/watch?v=example1'
  },
  {
    id: 2,
    title: 'إعداد الردود التلقائية بالذكاء الاصطناعي',
    description: 'كيفية تفعيل واستخدام الردود الذكية المدعومة بالـ AI',
    thumbnail: '/videos/ai-replies-thumb.jpg',
    duration: '12:15',
    views: '1,890',
    link: 'https://youtube.com/watch?v=example2'
  },
  {
    id: 3,
    title: 'تحليل التقارير وتحسين الأداء',
    description: 'شرح مفصل لقراءة التقارير واستخدامها لتحسين النتائج',
    thumbnail: '/videos/reports-thumb.jpg',
    duration: '10:45',
    views: '1,230',
    link: 'https://youtube.com/watch?v=example3'
  }
]
</script>

<template>
  <AppSEO
    title="الأدلة والشروحات - WA Smart Sender"
    description="أدلة شاملة وفيديوهات تعليمية لاستخدام WA Smart Sender بأقصى فعالية. تعلم الإرسال الجماعي، الردود التلقائية، والمزيد."
    canonical="/guides"
    image="/og/guides.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="الأدلة والشروحات"
          subtitle="تعلم كيفية استخدام WA Smart Sender لتحقيق أقصى استفادة من حملاتك التسويقية"
          size="xl"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div class="bg-white p-6 rounded-xl shadow-lg border">
            <i class="pi pi-book text-4xl text-[#489f91] mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">أدلة مكتوبة</h3>
            <p class="text-gray-600 text-sm">شروحات خطوة بخطوة مع صور توضيحية</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border">
            <i class="pi pi-video text-4xl text-red-600 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">فيديوهات تعليمية</h3>
            <p class="text-gray-600 text-sm">شروحات مرئية مفصلة وسهلة المتابعة</p>
          </div>
          <div class="bg-white p-6 rounded-xl shadow-lg border">
            <i class="pi pi-headphones text-4xl text-green-600 mb-4"></i>
            <h3 class="text-xl font-semibold mb-2">دعم مباشر</h3>
            <p class="text-gray-600 text-sm">مساعدة فورية من فريق الدعم الفني</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Written Guides -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-gray-900">الأدلة المكتوبة</h2>
          <div class="w-16 h-1 bg-[#489f91] rounded"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="guide in guides"
            :key="guide.id"
            class="bg-white rounded-xl shadow-lg border hover:shadow-2xl transition-shadow group"
          >
            <div class="p-6">
              <div class="w-16 h-16 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <i :class="guide.icon" class="text-2xl text-[#489f91]"></i>
              </div>

              <h3 class="text-xl font-semibold text-gray-900 mb-3 group-hover:text-[#489f91] transition-colors">
                {{ guide.title }}
              </h3>

              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                {{ guide.description }}
              </p>

              <div class="flex items-center gap-4 text-xs text-gray-500 mb-6">
                <span class="flex items-center">
                  <i class="pi pi-chart-bar me-1"></i>
                  {{ guide.difficulty }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-clock me-1"></i>
                  {{ guide.duration }}
                </span>
                <span class="flex items-center">
                  <i class="pi pi-list me-1"></i>
                  {{ guide.steps }} خطوات
                </span>
              </div>

              <a
                :href="guide.link"
                class="inline-flex items-center text-[#489f91] hover:text-green-700 font-medium"
              >
                ابدأ الدليل
                <i class="pi pi-arrow-left ms-2"></i>
              </a>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Video Guides -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="flex items-center justify-between mb-12">
          <h2 class="text-3xl font-bold text-gray-900">الفيديوهات التعليمية</h2>
          <div class="w-16 h-1 bg-red-600 rounded"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <article
            v-for="video in videoGuides"
            :key="video.id"
            class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group relative"
          >
            <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
              <!-- Background video placeholder -->
              <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                <i class="pi pi-play text-4xl text-white opacity-50"></i>
              </div>
              <div class="text-center text-gray-500">
                <i class="pi pi-video text-3xl mb-2"></i>
                <p class="text-xs">{{ video.thumbnail }}</p>
              </div>
              <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-sm opacity-50">
                {{ video.duration }}
              </div>
              
              <!-- Cool Blurry Overlay -->
              <div class="absolute inset-0 backdrop-blur-sm bg-white/30 border-2 border-white/50 flex flex-col items-center justify-center transition-all duration-300 group-hover:backdrop-blur-md group-hover:bg-white/40">
                <!-- Animated lock icon -->
                <div class="relative mb-4">
                  <i class="pi pi-lock text-4xl text-gray-700 group-hover:animate-bounce"></i>
                  <!-- Pulse ring around lock -->
                  <div class="absolute inset-0 border-2 border-gray-400 rounded-full animate-ping opacity-30"></div>
                </div>
                
                <!-- Coming Soon text -->
                <div class="text-center">
                  <h3 class="text-lg font-bold text-gray-800 mb-1 group-hover:scale-105 transition-transform">قريباً</h3>
                  <p class="text-sm text-gray-600 font-medium">Coming Soon</p>
                </div>
                
                <!-- Shimmer effect -->
                <div class="absolute inset-0 -skew-y-3 bg-gradient-to-r from-transparent via-white/30 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
              </div>
            </div>

            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                {{ video.title }}
              </h3>

              <p class="text-gray-600 text-sm mb-4 leading-relaxed">
                {{ video.description }}
              </p>

              <div class="flex items-center justify-between">
                <span class="flex items-center text-xs text-gray-500">
                  <i class="pi pi-eye me-1"></i>
                  {{ video.views }} مشاهدة
                </span>
                <button
                  class="inline-flex items-center text-gray-400 cursor-not-allowed font-medium opacity-50"
                  disabled
                >
                  شاهد الفيديو
                  <i class="pi pi-lock ms-2"></i>
                </button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Quick Start Section -->
    <section class="py-20 bg-gradient-to-br from-green-50 to-green-100"
      <div class="container mx-auto px-6 max-w-4xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">ابدأ في 3 خطوات</h2>
          <p class="text-xl text-gray-600">من التثبيت إلى أول حملة ناجحة</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div class="text-center">
            <div class="w-20 h-20 bg-[#489f91] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              1
            </div>
            <h3 class="text-xl font-semibold mb-4">ثبّت الإضافة</h3>
            <p class="text-gray-600">حمّل وثبّت WA Smart Sender من Chrome Web Store</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-[#489f91] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              2
            </div>
            <h3 class="text-xl font-semibold mb-4">اضبط الإعدادات</h3>
            <p class="text-gray-600">اتبع المعالج السريع لإعداد حسابك والإعدادات الأساسية</p>
          </div>

          <div class="text-center">
            <div class="w-20 h-20 bg-[#489f91] text-white rounded-full flex items-center justify-center mx-auto mb-6 text-2xl font-bold">
              3
            </div>
            <h3 class="text-xl font-semibold mb-4">أرسل أول حملة</h3>
            <p class="text-gray-600">أنشئ وأرسل حملتك الأولى باستخدام القوالب الجاهزة</p>
          </div>
        </div>

        <div class="text-center mt-12">
          <a href="#" class="btn btn-primary px-8 py-4 text-lg">
            <i class="pi pi-download me-2"></i>
            ابدأ الآن مجاناً
          </a>
        </div>
      </div>
    </section>

    <!-- Help Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <CTAInline
          title="تحتاج مساعدة إضافية؟"
          description="فريق الدعم الفني متاح لمساعدتك في أي خطوة. لا تتردد في التواصل معنا."
          button-text="تواصل مع الدعم"
          button-link="/contact"
          variant="secondary"
          size="lg"
        />
      </div>
    </section>
  </div>
</template>