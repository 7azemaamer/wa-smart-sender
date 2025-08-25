<script setup>
defineProps({
  testimonial: {
    type: Object,
    required: true,
    // Expected: { name, role, company, content, avatar, rating }
  },
});
</script>

<template>
  <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6 h-full">
    <div class="flex items-center mb-4">
      <div class="flex">
        <i
          v-for="star in 5"
          :key="star"
          class="pi pi-star-fill text-yellow-400 me-1"
          :class="
            star <= testimonial.rating ? 'text-yellow-400' : 'text-gray-300'
          "
        ></i>
      </div>
      <span class="ms-2 text-sm text-gray-600">{{ testimonial.rating }}/5</span>
    </div>

    <!-- Testimonial Content -->
    <blockquote class="text-gray-700 leading-relaxed mb-6 italic">
      "{{ testimonial.content }}"
    </blockquote>

    <!-- Author Info -->
    <div class="flex items-center">
      <div
        v-if="testimonial.avatar && testimonial.avatar.startsWith('pi')"
        class="w-12 h-12 rounded-full bg-[#489f91] text-white flex items-center justify-center border-2 border-gray-200 me-4"
      >
        <i :class="testimonial.avatar" class="text-lg"></i>
      </div>
      <img
        v-else
        :src="testimonial.avatar || '/images/default-avatar.png'"
        :alt="`صورة ${testimonial.name}`"
        class="w-12 h-12 rounded-full object-cover border-2 border-gray-200 me-4"
      />
      <div>
        <h4 class="font-semibold text-gray-900">{{ testimonial.name }}</h4>
        <p class="text-sm text-gray-600">
          {{ testimonial.role }}
          <span v-if="testimonial.company" class="text-[#489f91]">
            في {{ testimonial.company }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>
