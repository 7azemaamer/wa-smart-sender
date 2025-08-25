<script setup>
import AppSEO from '@/components/common/AppSEO.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import CTAInline from '@/components/common/CTAInline.vue'

const competitors = [
  {
    name: 'WA Smart Sender',
    logo: '/images/logo.png',
    isOurs: true,
    price: '$19.99/شهر',
    rating: 4.8,
    features: {
      bulkSending: '✅ غير محدود مع حماية',
      aiReplies: '✅ ردود ذكية بالـ AI',
      templates: '✅ 50+ قالب',
      reports: '✅ تقارير متقدمة',
      safety: '✅ حماية ضد الحظر',
      arabicSupport: '✅ دعم كامل للعربية',
      customization: '✅ تخصيص كامل',
      support: '✅ دعم 24/7',
      api: '✅ API للمطورين',
      multiAccount: '✅ حسابات متعددة'
    }
  },
  {
    name: 'الإرسال اليدوي',
    logo: '/images/manual-sending.png',
    isOurs: false,
    price: 'مجاني',
    rating: 2.0,
    features: {
      bulkSending: '❌ بطيء ومحدود',
      aiReplies: '❌ غير متاح',
      templates: '❌ يدوي فقط',
      reports: '❌ لا توجد',
      safety: '❌ خطر عالي للحظر',
      arabicSupport: '⚠️ محدود',
      customization: '❌ غير متاح',
      support: '❌ لا يوجد',
      api: '❌ غير متاح',
      multiAccount: '❌ حساب واحد'
    }
  },
  {
    name: 'سكريبت Excel',
    logo: '/images/excel-script.png',
    isOurs: false,
    price: '$5-50',
    rating: 3.2,
    features: {
      bulkSending: '⚠️ محدود ومعقد',
      aiReplies: '❌ غير متاح',
      templates: '⚠️ أساسية',
      reports: '⚠️ بسيطة',
      safety: '❌ خطر متوسط',
      arabicSupport: '⚠️ مشاكل في الترميز',
      customization: '⚠️ صعب',
      support: '⚠️ محدود',
      api: '❌ غير متاح',
      multiAccount: '❌ حساب واحد'
    }
  },
  {
    name: 'أدوات منافسة',
    logo: '/images/competitors.png',
    isOurs: false,
    price: '$25-100/شهر',
    rating: 3.8,
    features: {
      bulkSending: '✅ متاح لكن بدون حماية',
      aiReplies: '⚠️ محدود وباللغة الإنجليزية',
      templates: '⚠️ قليلة وإنجليزية',
      reports: '✅ جيدة',
      safety: '⚠️ حماية أساسية',
      arabicSupport: '❌ دعم ضعيف',
      customization: '⚠️ محدود',
      support: '⚠️ ساعات عمل فقط',
      api: '⚠️ مدفوع إضافي',
      multiAccount: '✅ متاح'
    }
  }
]

const featureLabels = {
  bulkSending: 'الإرسال الجماعي',
  aiReplies: 'الردود بالذكاء الاصطناعي',
  templates: 'القوالب الجاهزة',
  reports: 'التقارير والإحصائيات',
  safety: 'الحماية من الحظر',
  arabicSupport: 'الدعم العربي',
  customization: 'التخصيص',
  support: 'الدعم الفني',
  api: 'API للمطورين',
  multiAccount: 'الحسابات المتعددة'
}

const advantages = [
  {
    icon: 'pi pi-shield',
    title: 'الحماية المتقدمة',
    description: 'نظام حماية متطور ضد الحظر مع فواصل زمنية ذكية ونصوص متنوعة'
  },
  {
    icon: 'pi pi-language',
    title: 'مُطور للسوق العربي',
    description: 'واجهة عربية كاملة وقوالب محسّنة للثقافة العربية'
  },
  {
    icon: 'pi pi-cog',
    title: 'ذكاء اصطناعي متقدم',
    description: 'ردود تلقائية ذكية تفهم السياق وتتفاعل بطريقة طبيعية'
  },
  {
    icon: 'pi pi-chart-line',
    title: 'تقارير شاملة',
    description: 'إحصائيات مفصلة ورؤى قابلة للتنفيذ لتحسين حملاتك'
  },
  {
    icon: 'pi pi-headphones',
    title: 'دعم فني متميز',
    description: 'فريق دعم عربي متاح 24/7 لمساعدتك في أي وقت'
  },
  {
    icon: 'pi pi-dollar',
    title: 'قيمة استثنائية',
    description: 'أفضل سعر مقابل المزايا المتقدمة مقارنة بالبدائل'
  }
]
</script>

<template>
  <AppSEO
    title="مقارنة WA Smart Sender مع البدائل - لماذا نحن الأفضل"
    description="مقارنة شاملة بين WA Smart Sender وبدائل أتمتة واتساب الأخرى. اكتشف لماذا نحن الخيار الأفضل للسوق العربي."
    canonical="/compare"
    image="/og/compare.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl text-center">
        <SectionHeading
          title="لماذا WA Smart Sender هو الأفضل؟"
          subtitle="مقارنة شاملة وعادلة مع جميع البدائل المتاحة في السوق"
          size="xl"
          class="mb-16"
        />

        <div class="bg-blue-50 rounded-2xl p-8 mb-16">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="text-center">
              <div class="text-3xl font-bold text-blue-600 mb-2">#1</div>
              <p class="text-gray-700">أفضل أداة عربية</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-green-600 mb-2">4.8/5</div>
              <p class="text-gray-700">تقييم المستخدمين</p>
            </div>
            <div class="text-center">
              <div class="text-3xl font-bold text-purple-600 mb-2">1000+</div>
              <p class="text-gray-700">عميل راضي</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Comparison Table -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="مقارنة تفصيلية"
          subtitle="قارن بين WA Smart Sender والبدائل الأخرى"
          class="mb-12"
        />

        <div class="bg-white rounded-2xl shadow-2xl overflow-hidden">
          <div class="overflow-x-auto">
            <table class="w-full">
              <!-- Header -->
              <thead>
                <tr class="bg-gray-900 text-white">
                  <th class="py-6 px-4 text-start font-semibold">المزايا</th>
                  <th 
                    v-for="competitor in competitors" 
                    :key="competitor.name"
                    class="py-6 px-4 text-center font-semibold min-w-40"
                    :class="competitor.isOurs ? 'bg-blue-600' : ''"
                  >
                    <div class="flex flex-col items-center">
                      <div class="w-10 h-10 bg-white rounded-lg mb-2 flex items-center justify-center">
                        <span class="text-gray-800 text-xs font-bold">{{ competitor.name.charAt(0) }}</span>
                      </div>
                      <div class="text-sm">{{ competitor.name }}</div>
                      <div class="text-xs opacity-75">{{ competitor.price }}</div>
                      <div class="flex items-center mt-1">
                        <i class="pi pi-star-fill text-yellow-400 text-xs me-1"></i>
                        <span class="text-xs">{{ competitor.rating }}</span>
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>

              <!-- Body -->
              <tbody>
                <tr 
                  v-for="(label, feature) in featureLabels" 
                  :key="feature"
                  :class="feature === 'bulkSending' || feature === 'safety' || feature === 'arabicSupport' ? 'bg-blue-50' : feature % 2 === 0 ? 'bg-gray-50' : 'bg-white'"
                >
                  <td class="py-4 px-4 font-medium text-gray-900">{{ label }}</td>
                  <td 
                    v-for="competitor in competitors" 
                    :key="competitor.name"
                    class="py-4 px-4 text-center text-sm"
                    :class="competitor.isOurs ? 'bg-blue-50 font-semibold' : ''"
                  >
                    <span v-html="competitor.features[feature]"></span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <!-- Legend -->
        <div class="flex justify-center mt-8">
          <div class="flex flex-wrap gap-6 text-sm">
            <div class="flex items-center">
              <span class="text-green-600 me-2">✅</span>
              <span>متاح ومتطور</span>
            </div>
            <div class="flex items-center">
              <span class="text-yellow-600 me-2">⚠️</span>
              <span>متاح لكن محدود</span>
            </div>
            <div class="flex items-center">
              <span class="text-red-600 me-2">❌</span>
              <span>غير متاح</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Advantages -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="مزايا حصرية في WA Smart Sender"
          subtitle="ما يجعلنا مختلفين عن جميع البدائل الأخرى"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="advantage in advantages"
            :key="advantage.title"
            class="bg-white rounded-xl shadow-lg border p-8 text-center hover:shadow-2xl transition-shadow"
          >
            <div class="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 text-2xl">
              <i :class="advantage.icon"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ advantage.title }}</h3>
            <p class="text-gray-600 leading-relaxed">{{ advantage.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Cost Comparison -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-4xl">
        <SectionHeading
          title="مقارنة التكلفة والعائد"
          subtitle="احسب كم ستوفر مع WA Smart Sender"
          class="mb-12"
        />

        <div class="bg-white rounded-2xl shadow-lg p-8">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 class="text-lg font-semibold text-red-600 mb-4">البدائل الأخرى</h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex justify-between">
                  <span>أداة منافسة متقدمة</span>
                  <span class="font-semibold">$79/شهر</span>
                </li>
                <li class="flex justify-between">
                  <span>رسوم إضافية للـ API</span>
                  <span class="font-semibold">$25/شهر</span>
                </li>
                <li class="flex justify-between">
                  <span>دعم اللغة العربية</span>
                  <span class="font-semibold">$20/شهر</span>
                </li>
                <li class="flex justify-between border-t pt-3 font-bold text-red-600">
                  <span>المجموع الشهري</span>
                  <span>$124/شهر</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 class="text-lg font-semibold text-green-600 mb-4">WA Smart Sender</h3>
              <ul class="space-y-3 text-gray-700">
                <li class="flex justify-between">
                  <span>الخطة الشاملة</span>
                  <span class="font-semibold">$19.99/شهر</span>
                </li>
                <li class="flex justify-between">
                  <span>جميع المزايا مشمولة</span>
                  <span class="font-semibold text-green-600">مجاني</span>
                </li>
                <li class="flex justify-between">
                  <span>دعم عربي كامل</span>
                  <span class="font-semibold text-green-600">مجاني</span>
                </li>
                <li class="flex justify-between border-t pt-3 font-bold text-green-600">
                  <span>المجموع الشهري</span>
                  <span>$19.99/شهر</span>
                </li>
              </ul>
            </div>
          </div>

          <div class="text-center mt-8 p-4 bg-green-50 rounded-lg">
            <p class="text-green-800 font-semibold">
              💰 توفر أكثر من <span class="text-2xl">$104</span> شهرياً مع WA Smart Sender!
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- User Testimonials -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-6xl">
        <SectionHeading
          title="ماذا يقول عملاؤنا؟"
          subtitle="تجارب حقيقية من عملاء انتقلوا من البدائل الأخرى"
          class="mb-16"
        />

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <img src="/images/user1.jpg" alt="أحمد محمد" class="w-12 h-12 rounded-full me-4">
              <div>
                <h4 class="font-semibold">أحمد محمد</h4>
                <p class="text-sm text-gray-600">مالك متجر إلكتروني</p>
              </div>
            </div>
            <p class="text-gray-700 italic leading-relaxed">
              "انتقلت من أداة أجنبية لـ WAS وتحسنت نتائجي بشكل كبير. الدعم العربي والحماية من الحظر تستحق كل ريال."
            </p>
            <div class="flex mt-4">
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400"></i>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <img src="/images/user2.jpg" alt="فاطمة العلي" class="w-12 h-12 rounded-full me-4">
              <div>
                <h4 class="font-semibold">فاطمة العلي</h4>
                <p class="text-sm text-gray-600">مسوقة رقمية</p>
              </div>
            </div>
            <p class="text-gray-700 italic leading-relaxed">
              "جربت 3 أدوات قبل WAS. الفرق واضح في سهولة الاستخدام والنتائج. أنصح به بقوة."
            </p>
            <div class="flex mt-4">
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400"></i>
            </div>
          </div>

          <div class="bg-white rounded-xl shadow-lg p-6">
            <div class="flex items-center mb-4">
              <img src="/images/user3.jpg" alt="سعد الرشيد" class="w-12 h-12 rounded-full me-4">
              <div>
                <h4 class="font-semibold">سعد الرشيد</h4>
                <p class="text-sm text-gray-600">رائد أعمال</p>
              </div>
            </div>
            <p class="text-gray-700 italic leading-relaxed">
              "السعر ممتاز مقارنة بالمنافسين، والمزايا أكثر. وفرت أكثر من 300 ريال شهرياً."
            </p>
            <div class="flex mt-4">
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400 me-1"></i>
              <i class="pi pi-star-fill text-yellow-400"></i>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Migration Help -->
    <section class="py-20 bg-blue-600 text-white">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-3xl font-bold mb-6">انتقل إلى WA Smart Sender اليوم</h2>
        <p class="text-xl mb-8 opacity-90">
          فريقنا سيساعدك في نقل بياناتك وإعداداتك من أي أداة أخرى مجاناً
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center mb-8">
          <a href="/contact" class="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 text-lg">
            <i class="pi pi-phone me-2"></i>
            اطلب مساعدة الانتقال
          </a>
          <a href="/pricing" class="btn border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 text-lg">
            <i class="pi pi-eye me-2"></i>
            شاهد الأسعار
          </a>
        </div>
        <p class="text-sm opacity-75">
          ✅ انتقال مجاني للبيانات | ✅ دعم كامل أثناء الانتقال | ✅ ضمان الرضا 14 يوم
        </p>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <CTAInline
          title="جاهز للتجربة؟"
          description="ابدأ تجربتك المجانية لمدة 7 أيام واكتشف الفرق بنفسك"
          button-text="ابدأ التجربة المجانية"
          button-link="/contact"
          variant="primary"
          size="lg"
        />
      </div>
    </section>
  </div>
</template>