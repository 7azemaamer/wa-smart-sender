<script setup>
defineProps({
  feature: {
    type: Object,
    required: true
    // Expected: { icon, title, description, highlighted }
  }
})
</script>

<template>
  <div
    class="bg-white rounded-xl p-6 shadow-lg border transition-all duration-200 hover:shadow-xl hover:scale-105 h-full"
    :class="feature.highlighted ? 'border-[#489f91] ring-2 ring-green-100' : 'border-gray-200'"
  >
    <!-- Icon -->
    <div
      class="w-14 h-14 rounded-lg flex items-center justify-center mb-4"
      :class="feature.highlighted ? 'bg-green-50' : 'bg-gray-100'"
    >
      <i
        :class="[
          feature.icon,
          'text-2xl',
          feature.highlighted ? 'text-[#489f91]' : 'text-gray-600'
        ]"
      ></i>
    </div>

    <!-- Content -->
    <h3
      class="text-xl font-semibold mb-3 leading-tight"
      :class="feature.highlighted ? 'text-gray-900' : 'text-gray-900'"
    >
      {{ feature.title }}
    </h3>
    
    <p class="text-gray-600 leading-relaxed">
      {{ feature.description }}
    </p>

    <!-- Badge for highlighted features -->
    <div v-if="feature.highlighted" class="mt-4">
      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-[#489f91]">
        <i class="pi pi-star-fill me-1"></i>
        مميز
      </span>
    </div>
  </div>
</template>