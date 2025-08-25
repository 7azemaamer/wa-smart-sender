<script setup>
import AppSEO from '@/components/common/AppSEO.vue'
import SectionHeading from '@/components/common/SectionHeading.vue'
import FaqAccordion from '@/components/common/FaqAccordion.vue'
import CTAInline from '@/components/common/CTAInline.vue'

const faqs = [
  {
    question: 'هل يسبب الإرسال الجماعي حظر حسابي؟',
    answer: 'استخدم فواصل زمنية عشوائية ونصوصاً متنوعة وتحقق من الأرقام لتقليل المخاطر. WA Smart Sender يحتوي على حماية متقدمة ضد الحظر.'
  },
  {
    question: 'كم عدد الرسائل التي يمكنني إرسالها يومياً؟',
    answer: 'يُنصح بعدم تجاوز 100-200 رسالة يومياً للحسابات الجديدة، و500+ للحسابات المتقدمة. الخطط المدفوعة تتيح إرسال أكثر مع ضمانات أمان.'
  },
  {
    question: 'هل WA Smart Sender آمن للاستخدام؟',
    answer: 'نعم، WA Smart Sender يستخدم أحدث تقنيات الحماية مع فواصل زمنية عشوائية، تنويع النصوص، وفلترة الأرقام المحظورة تلقائياً.'
  },
  {
    question: 'هل يمكنني استخدام متغيرات في الرسائل؟',
    answer: 'نعم، يمكنك استخدام متغيرات مثل [الاسم] و{التاريخ} و{الشركة} لتخصيص كل رسالة حسب بيانات المستلم.'
  },
  {
    question: 'كيف تعمل الردود التلقائية؟',
    answer: 'يمكنك إعداد ردود تلقائية تُرسل عند استلام رسائل تحتوي على كلمات مفتاحية محددة. الخطط المتقدمة تدعم الردود بالذكاء الاصطناعي.'
  },
  {
    question: 'هل يمكنني إرسال ملفات ووسائط؟',
    answer: 'نعم، يدعم WA Smart Sender إرسال الصور والمستندات والملفات الصوتية وحتى كتالوجات المنتجات مع كل رسالة جماعية.'
  },
  {
    question: 'كيف أقوم بتنظيف قائمة الأرقام؟',
    answer: 'WA Smart Sender يتضمن أدوات تنظيف متقدمة لإزالة الأرقام المكررة والمحظورة وغير الصحيحة تلقائياً قبل الإرسال.'
  },
  {
    question: 'هل يعمل مع واتساب بيزنس؟',
    answer: 'نعم، WA Smart Sender متوافق مع واتساب ويب العادي وواتساب بيزنس. ننصح باستخدام واتساب بيزنس للحصول على مزايا إضافية.'
  },
  {
    question: 'ما هي التقارير المتوفرة؟',
    answer: 'نوفر تقارير مفصلة تشمل معدلات التسليم، الردود، الرسائل المقروءة، الأرقام المحظورة، وإحصائيات الأداء الزمني.'
  },
  {
    question: 'هل يمكنني جدولة الرسائل؟',
    answer: 'نعم، يمكنك جدولة الحملات لإرسالها في أوقات محددة أو توزيعها على فترات زمنية مختلفة لتحسين معدلات الوصول.'
  },
  {
    question: 'كيف أتجنب اعتبار رسائلي كسبام؟',
    answer: 'استخدم نصوص متنوعة، فواصل عشوائية، أرسل لأرقام متفاعلة فقط، وتجنب المحتوى الترويجي المفرط. اتبع قواعد آداب التسويق.'
  },
  {
    question: 'هل توجد حدود على حجم قوائم الأرقام؟',
    answer: 'الخطة الأساسية تدعم حتى 10,000 رقم، والمتقدمة حتى 50,000، والشركات لا توجد حدود. يمكن رفع الحدود حسب الطلب.'
  },
  {
    question: 'كيف يتم حفظ البيانات وهل هي آمنة؟',
    answer: 'جميع البيانات محفوظة محلياً في متصفحك ومشفرة. لا نحفظ أي بيانات شخصية أو أرقام على خوادمنا لضمان خصوصيتك الكاملة.'
  },
  {
    question: 'هل يمكنني استخدام الإضافة على أجهزة متعددة؟',
    answer: 'نعم، يمكنك تسجيل الدخول واستخدام الإضافة على أي جهاز. البيانات تتزامن تلقائياً عبر حسابك في Chrome.'
  },
  {
    question: 'ما هو الدعم الفني المتوفر؟',
    answer: 'نوفر دعماً فنياً عبر البريد الإلكتروني للخطة الأساسية، دعم أولوية 24/7 للمتقدمة، ومدير حساب مخصص للشركات.'
  },
  {
    question: 'هل يمكنني تصدير التقارير؟',
    answer: 'نعم، يمكنك تصدير جميع التقارير بصيغات مختلفة (Excel, PDF, CSV) لتحليل البيانات أو مشاركتها مع فريقك.'
  },
  {
    question: 'كيف أقوم بتحديث الإضافة؟',
    answer: 'التحديثات تتم تلقائياً عبر Chrome Web Store. ستحصل على إشعار عند توفر تحديثات جديدة مع المزايا والتحسينات الأمنية.'
  },
  {
    question: 'هل يمكنني استرداد المال؟',
    answer: 'نعم، نوفر ضمان استرداد المال خلال 14 يوم من الاشتراك إذا لم تكن راضياً عن الخدمة لأي سبب كان.'
  },
  {
    question: 'كيف أبدأ الاستخدام بعد التثبيت؟',
    answer: 'بعد تثبيت الإضافة، افتح واتساب ويب وستظهر واجهة WA Smart Sender. اتبع دليل البدء السريع المتضمن لإعداد حملتك الأولى.'
  },
  {
    question: 'هل يدعم اللغة العربية بالكامل؟',
    answer: 'نعم، WA Smart Sender مُطور خصيصاً للسوق العربي مع دعم كامل للغة العربية في الواجهة، القوالب، والردود التلقائية.'
  }
]
</script>

<template>
  <AppSEO
    title="الأسئلة الشائعة - WA Smart Sender"
    description="إجابات شاملة على أكثر الأسئلة شيوعاً حول WA Smart Sender: الأمان، الاستخدام، المزايا، التسعير وكل ما تحتاج معرفته."
    canonical="/faq"
    image="/og/faq.png"
  />

  <div class="py-12">
    <!-- Hero Section -->
    <section class="py-20">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <SectionHeading
          title="الأسئلة الشائعة"
          subtitle="إجابات شاملة على كل ما تحتاج معرفته حول WA Smart Sender"
          size="xl"
          class="mb-8"
        />
        
        <p class="text-lg text-gray-600 mb-12 leading-relaxed">
          لم تجد إجابة سؤالك؟ 
          <a href="/contact" class="text-blue-600 hover:underline font-medium">تواصل معنا</a>
          وسنساعدك في أسرع وقت ممكن
        </p>
      </div>
    </section>

    <!-- FAQ Categories -->
    <section class="pb-12">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          <a href="#safety" class="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow text-center">
            <i class="pi pi-shield text-3xl text-green-600 mb-4"></i>
            <h3 class="font-semibold text-gray-900">الأمان والحماية</h3>
            <p class="text-sm text-gray-600 mt-2">5 أسئلة</p>
          </a>
          <a href="#features" class="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow text-center">
            <i class="pi pi-cog text-3xl text-blue-600 mb-4"></i>
            <h3 class="font-semibold text-gray-900">المزايا والاستخدام</h3>
            <p class="text-sm text-gray-600 mt-2">8 أسئلة</p>
          </a>
          <a href="#pricing" class="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow text-center">
            <i class="pi pi-credit-card text-3xl text-purple-600 mb-4"></i>
            <h3 class="font-semibold text-gray-900">التسعير والدفع</h3>
            <p class="text-sm text-gray-600 mt-2">4 أسئلة</p>
          </a>
          <a href="#support" class="bg-white p-6 rounded-xl shadow-lg border hover:shadow-xl transition-shadow text-center">
            <i class="pi pi-headphones text-3xl text-orange-600 mb-4"></i>
            <h3 class="font-semibold text-gray-900">الدعم الفني</h3>
            <p class="text-sm text-gray-600 mt-2">3 أسئلة</p>
          </a>
        </div>
      </div>
    </section>

    <!-- FAQ Accordion -->
    <section class="pb-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <FaqAccordion :faqs="faqs" />
      </div>
    </section>

    <!-- CTA Section -->
    <section class="pb-20">
      <div class="container mx-auto px-6 max-w-4xl">
        <CTAInline
          title="جاهز للبدء؟"
          description="احصل على إجابات لجميع أسئلتك من خلال تجربة مجانية لمدة 7 أيام"
          button-text="ابدأ التجربة المجانية"
          button-link="/contact"
          variant="primary"
          size="lg"
        />
      </div>
    </section>

    <!-- Contact Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-4xl text-center">
        <h2 class="text-3xl font-bold text-gray-900 mb-6">
          ألا تزال لديك أسئلة؟
        </h2>
        <p class="text-xl text-gray-600 mb-8 leading-relaxed">
          فريق الدعم لدينا متاح لمساعدتك في أي استفسار
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <i class="pi pi-envelope text-4xl text-blue-600 mb-4"></i>
            <h3 class="text-xl font-semibold mb-4">راسلنا</h3>
            <p class="text-gray-600 mb-6">
              أرسل استفسارك وسنجيبك خلال 24 ساعة
            </p>
            <a href="mailto:support@wasmartsender.com" class="btn btn-primary">
              <i class="pi pi-send me-2"></i>
              أرسل رسالة
            </a>
          </div>
          
          <div class="bg-white p-8 rounded-xl shadow-lg">
            <i class="pi pi-comments text-4xl text-green-600 mb-4"></i>
            <h3 class="text-xl font-semibold mb-4">الدردشة المباشرة</h3>
            <p class="text-gray-600 mb-6">
              تحدث مع فريق الدعم مباشرة
            </p>
            <button class="btn btn-secondary">
              <i class="pi pi-comment me-2"></i>
              ابدأ المحادثة
            </button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>