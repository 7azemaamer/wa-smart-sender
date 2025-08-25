<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <footer class="bg-gray-50 border-t border-gray-200 text-gray-700 py-8 mt-16">
    <div class="container mx-auto px-6 max-w-6xl">
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
        <!-- Logo and Description -->
        <div class="md:col-span-1">
          <div class="flex items-center mb-4">
            <img
              src="/images/logo.png"
              alt="WA Smart Sender"
              class="w-8 h-8 me-3"
            />
            <h3 class="text-lg font-semibold text-gray-900">WA Smart Sender</h3>
          </div>
          <p class="text-gray-600 text-sm leading-relaxed max-w-xs">
            إضافة كروم لأتمتة وتسويق واتساب: رسائل جماعية، ردود تلقائية بالذكاء
            الاصطناعي، قوالب وتقارير، وأمان عالي.
          </p>
        </div>

        <!-- Product Links -->
        <div>
          <h4 class="text-base font-medium text-gray-900 mb-3">المنتج</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/was"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                المزايا
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/pricing"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                الأسعار
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/compare"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                المقارنات
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/case-studies"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                دراسات الحالة
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Resources Links -->
        <div>
          <h4 class="text-base font-medium text-gray-900 mb-3">الموارد</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/blog"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                المدونة
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/guides"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                الأدلة
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/templates"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                القوالب
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/faq"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                الأسئلة الشائعة
              </RouterLink>
            </li>
          </ul>
        </div>

        <!-- Support Links -->
        <div>
          <h4 class="text-base font-medium text-gray-900 mb-3">الدعم</h4>
          <ul class="space-y-2">
            <li>
              <RouterLink
                to="/contact"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                تواصل معنا
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/privacy"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                سياسة الخصوصية
              </RouterLink>
            </li>
            <li>
              <RouterLink
                to="/terms"
                class="text-gray-600 hover:text-[#489f91] transition-colors text-sm"
              >
                شروط الاستخدام
              </RouterLink>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="border-t border-gray-200 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center"
      >
        <p class="text-gray-500 text-xs">
          © {{ new Date().getFullYear() }} WA Smart Sender. جميع الحقوق محفوظة.
        </p>
        <div class="flex items-center mt-4 md:mt-0">
          <p class="text-gray-400 text-xs">
            أداة مستقلة غير تابعة لشركة واتساب
          </p>
        </div>
      </div>
    </div>
  </footer>
</template>
