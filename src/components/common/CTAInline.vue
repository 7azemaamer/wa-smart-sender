<script setup>
import { RouterLink } from "vue-router";

defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  buttonText: {
    type: String,
    required: true,
  },
  buttonLink: {
    type: String,
    required: true,
  },
  variant: {
    type: String,
    default: "primary",
    validator: (value) => ["primary", "secondary", "outline"].includes(value),
  },
  size: {
    type: String,
    default: "md",
    validator: (value) => ["sm", "md", "lg"].includes(value),
  },
});

const variantClasses = {
  primary: "bg-[#489f91] hover:bg-[#3a7a6f] text-white",
  secondary: "bg-[#489f91] hover:bg-[#3a7a6f] text-white",
  outline:
    "border-2 border-[#489f91] text-[#489f91] hover:bg-[#489f91] hover:text-white",
};

const sizeClasses = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};
</script>

<template>
  <div
    class="bg-gradient-to-br from-[#489f91]/5 to-[#489f91]/10 rounded-xl p-6 md:p-8 my-8"
  >
    <div class="text-center">
      <h3 class="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
        {{ title }}
      </h3>
      <p v-if="description" class="text-gray-600 text-lg mb-6 leading-relaxed">
        {{ description }}
      </p>
      <RouterLink
        :to="buttonLink"
        :class="[
          'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl',
          variantClasses[variant],
          sizeClasses[size],
        ]"
      >
        <i class="pi pi-arrow-left me-2"></i>
        {{ buttonText }}
      </RouterLink>
    </div>
  </div>
</template>
