<script setup>
import { ref } from "vue";
import AppSEO from "@/components/common/AppSEO.vue";
import SectionHeading from "@/components/common/SectionHeading.vue";

const form = ref({
  name: "",
  email: "",
  phone: "",
  message: "",
});

const isSubmitting = ref(false);
const showSuccess = ref(false);

const submitForm = async () => {
  isSubmitting.value = true;

  setTimeout(() => {
    showSuccess.value = true;
    isSubmitting.value = false;

    form.value = {
      name: "",
      email: "",
      phone: "",
      message: "",
    };

    setTimeout(() => {
      showSuccess.value = false;
    }, 5000);
  }, 1000);
};
</script>

<template>
  <AppSEO
    title="تواصل معنا - WA Smart Sender"
    description="تواصل مع فريق WA Smart Sender للحصول على الدعم، طلب عرض سعر مخصص، أو أي استفسارات حول أتمتة واتساب."
    canonical="/contact"
    image="/og/contact.png"
  />

  <div class="">
    <section class="py-4 md:py-12">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <!-- Left Side - Content -->
          <div>
            <SectionHeading
              title="تواصل معنا"
              subtitle="نحن هنا لمساعدتك في تحويل واتساب إلى أداة تسويق قوية"
              :centered="false"
              size="xl"
              class="mb-8"
            />

            <div class="space-y-8">
              <div class="flex items-start">
                <div
                  class="w-14 h-14 bg-[#489f9120] rounded-lg flex items-center justify-center me-4"
                >
                  <i class="pi pi-envelope text-[#489f91] text-xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    البريد الإلكتروني
                  </h3>
                  <p class="text-gray-600 mb-2">راسلنا وسنجيبك خلال 24 ساعة</p>
                  <a
                    href="mailto:wasmartsender@gmail.com"
                    class="text-[#489f91] hover:underline font-medium"
                  >
                    wasmartsender@gmail.com
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-14 h-14 bg-green-100 rounded-lg flex items-center justify-center me-4"
                >
                  <i class="pi pi-whatsapp text-green-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    واتساب
                  </h3>
                  <p class="text-gray-600 mb-2">تحدث معنا مباشرة عبر واتساب</p>
                  <a
                    dir="ltr"
                    href="https://wa.me/201020039219"
                    class="text-green-600 hover:underline font-medium"
                  >
                    +20 102 003 9219
                  </a>
                </div>
              </div>

              <div class="flex items-start">
                <div
                  class="w-14 h-14 bg-purple-100 rounded-lg flex items-center justify-center me-4"
                >
                  <i class="pi pi-clock text-purple-600 text-xl"></i>
                </div>
                <div>
                  <h3 class="text-xl font-semibold text-gray-900 mb-2">
                    ساعات العمل
                  </h3>
                  <p class="text-gray-600">الأحد - الخميس: 9:00 ص - 6:00 م</p>
                  <p class="text-gray-600">توقيت السعودية (GMT+3)</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right Side - Form -->
          <div
            class="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8"
          >
            <div
              v-if="showSuccess"
              class="mb-8 p-4 bg-green-50 border border-green-200 rounded-lg"
            >
              <div class="flex items-center">
                <i class="pi pi-check-circle text-green-600 me-3"></i>
                <div>
                  <h4 class="font-semibold text-green-800">
                    تم إرسال رسالتك بنجاح!
                  </h4>
                  <p class="text-green-700 text-sm">
                    سنتواصل معك في أقرب وقت ممكن.
                  </p>
                </div>
              </div>
            </div>

            <form @submit.prevent="submitForm" class="space-y-6">
              <div>
                <label
                  for="name"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  الاسم الكامل *
                </label>
                <input
                  id="name"
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91] transition-colors"
                  placeholder="أدخل اسمك الكامل"
                />
              </div>

              <div>
                <label
                  for="email"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  البريد الإلكتروني *
                </label>
                <input
                  id="email"
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91] transition-colors"
                  placeholder="example@domain.com"
                />
              </div>

              <div>
                <label
                  for="phone"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  رقم الهاتف
                </label>
                <input
                  id="phone"
                  v-model="form.phone"
                  type="tel"
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91] transition-colors"
                  placeholder="+966 50 123 4567"
                />
              </div>

              <div>
                <label
                  for="message"
                  class="block text-sm font-medium text-gray-700 mb-2"
                >
                  الرسالة *
                </label>
                <textarea
                  id="message"
                  v-model="form.message"
                  rows="5"
                  required
                  class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#489f91] focus:border-[#489f91] transition-colors"
                  placeholder="اكتب رسالتك هنا..."
                ></textarea>
              </div>

              <button
                type="submit"
                :disabled="isSubmitting"
                class="w-full bg-[#489f91] hover:bg-[#489f91] disabled:bg-[#489f91] text-white font-semibold py-3 px-6 rounded-lg transition-colors flex items-center justify-center"
              >
                <i v-if="isSubmitting" class="pi pi-spin pi-spinner me-2"></i>
                <i v-else class="pi pi-send me-2"></i>
                {{ isSubmitting ? "جارٍ الإرسال..." : "إرسال الرسالة" }}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- FAQ Quick Section -->
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-6 max-w-6xl">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-gray-900 mb-4">أسئلة سريعة؟</h2>
          <p class="text-gray-600 text-lg">
            قد تجد إجابة سؤالك في قسم الأسئلة الشائعة
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-white p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-question-circle text-3xl text-[#489f91] mb-4"></i>
            <h3 class="text-lg font-semibold mb-2">الأسئلة الشائعة</h3>
            <p class="text-gray-600 text-sm mb-4">إجابات على 20+ سؤال شائع</p>
            <a href="/faq" class="text-[#489f91] hover:underline font-medium">
              اطلع على الأسئلة →
            </a>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-book text-3xl text-green-600 mb-4"></i>
            <h3 class="text-lg font-semibold mb-2">الأدلة والشروحات</h3>
            <p class="text-gray-600 text-sm mb-4">تعلم كيفية استخدام WAS</p>
            <a
              href="/guides"
              class="text-green-600 hover:underline font-medium"
            >
              شاهد الأدلة →
            </a>
          </div>

          <div class="bg-white p-6 rounded-xl shadow-lg text-center">
            <i class="pi pi-video text-3xl text-purple-600 mb-4"></i>
            <h3 class="text-lg font-semibold mb-2">فيديوهات تعليمية</h3>
            <p class="text-gray-600 text-sm mb-4">شروحات مرئية خطوة بخطوة</p>
            <a
              href="/guides"
              class="text-purple-600 hover:underline font-medium"
            >
              شاهد الفيديوهات →
            </a>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
