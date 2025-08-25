<script setup>
import { RouterLink } from 'vue-router'
import { inject } from 'vue'
import { formatPrice } from '@/constants/pricing.js'

defineProps({
  plan: {
    type: Object,
    required: true
  }
})

const selectedCurrency = inject('globalCurrency')

const getCurrencyPrice = (plan, currency) => {
  switch(currency) {
    case 'SAR': return plan.price_sar
    case 'EGP': return plan.price_egp  
    case 'USD':
    default: return plan.price_usd
  }
}

const getOldPrice = (plan, currency) => {
  if (!plan.old_price_usd) return null
  switch(currency) {
    case 'SAR': return Math.round(plan.old_price_usd * 3.75 * 100) / 100
    case 'EGP': return Math.round(plan.old_price_usd * 48 * 100) / 100
    case 'USD':
    default: return plan.old_price_usd
  }
}

const getCurrencySymbol = (currency) => {
  switch(currency) {
    case 'SAR': return 'ر.س'
    case 'EGP': return 'ج.م'
    case 'USD':
    default: return '$'
  }
}
</script>

<template>
  <div
    class="relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-200 hover:shadow-2xl hover:scale-105"
    :class="plan.popular ? 'border-[#489f91] ring-4 ring-green-100' : 'border-gray-200'"
  >
    <!-- Popular/Tag Badge -->
    <div
      v-if="plan.popular"
      class="absolute -top-4 left-1/2 transform -translate-x-1/2"
    >
      <span class="bg-[#489f91] text-white px-6 py-2 rounded-full text-sm font-semibold shadow-lg">
        {{ plan.tagAr || plan.tag || 'الأكثر شيوعاً' }}
      </span>
    </div>

    <div class="p-8">
      <!-- Plan Header -->
      <div class="text-center mb-6">
        <h3 class="text-xl font-bold text-gray-900 mb-4">{{ plan.nameAr || plan.name }}</h3>
        
        <div class="flex items-baseline justify-center mb-4">
          <div class="flex flex-col items-center">
            <div class="flex items-baseline">
              <span v-if="getOldPrice(plan, selectedCurrency)" class="text-lg text-gray-400 line-through me-2">
                {{ getCurrencySymbol(selectedCurrency) }}{{ getOldPrice(plan, selectedCurrency) }}
              </span>
              <span class="text-4xl font-bold text-gray-900">{{ getCurrencyPrice(plan, selectedCurrency) }}</span>
              <span class="text-gray-600 ms-2 text-lg">{{ getCurrencySymbol(selectedCurrency) }}</span>
            </div>
            <span class="text-gray-600 text-sm mt-1">/{{ plan.durationAr || plan.duration || 'شهر' }}</span>
          </div>
        </div>
        
        <!-- Main Features -->
        <div class="mb-6">
          <div class="flex flex-wrap justify-center gap-2 mb-4">
            <span 
              v-for="(feature, index) in (plan.main_features_ar || plan.main_features)"
              :key="index"
              class="bg-green-50 text-[#489f91] px-3 py-1 rounded-full text-sm font-medium"
            >
              {{ feature }}
            </span>
          </div>
        </div>
      </div>

      <!-- Features List -->
      <ul class="space-y-3 mb-8 max-h-48 overflow-y-auto">
        <li
          v-for="(feature, index) in (plan.extra_features_ar || plan.extra_features || plan.features)"
          :key="index"
          class="flex items-start"
        >
          <i class="pi pi-check text-green-500 mt-1 me-3 text-sm flex-shrink-0"></i>
          <span class="text-gray-700 leading-relaxed text-sm">{{ feature }}</span>
        </li>
      </ul>

      <!-- CTA Button -->
      <RouterLink
        :to="plan.buttonLink || '/contact'"
        :class="[
          'w-full inline-flex items-center justify-center py-3 px-6 rounded-lg font-semibold transition-all duration-200 transform hover:scale-105',
          plan.popular
            ? 'bg-[#489f91] hover:bg-green-700 text-white shadow-lg hover:shadow-xl'
            : 'bg-gray-800 hover:bg-gray-900 text-white shadow-md hover:shadow-lg'
        ]"
      >
        <i class="pi pi-arrow-left me-2"></i>
        {{ plan.buttonText || 'ابدأ الآن' }}
      </RouterLink>
    </div>
  </div>
</template>