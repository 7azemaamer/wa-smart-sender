<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  centered: {
    type: Boolean,
    default: true
  },
  size: {
    type: String,
    default: 'lg',
    validator: (value) => ['sm', 'md', 'lg', 'xl'].includes(value)
  }
})

const sizeClasses = {
  sm: 'text-2xl',
  md: 'text-3xl',
  lg: 'text-4xl',
  xl: 'text-5xl'
}

const subtitleSizes = {
  sm: 'text-base',
  md: 'text-lg',
  lg: 'text-xl',
  xl: 'text-2xl'
}
</script>

<template>
  <div :class="centered ? 'text-center' : 'text-start'">
    <h2 
      :class="[
        'font-bold text-gray-900 leading-tight',
        sizeClasses[size]
      ]"
    >
      {{ title }}
    </h2>
    <p 
      v-if="subtitle" 
      :class="[
        'text-gray-600 mt-4 leading-relaxed',
        subtitleSizes[size]
      ]"
    >
      {{ subtitle }}
    </p>
  </div>
</template>