<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  faqs: {
    type: Array,
    required: true
  },
  jsonLd: {
    type: Boolean,
    default: true
  }
})

const openItems = ref(new Set())

const toggleItem = (index) => {
  if (openItems.value.has(index)) {
    openItems.value.delete(index)
  } else {
    openItems.value.add(index)
  }
}

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": props.faqs.map(faq => ({
    "@type": "Question",
    "name": faq.question,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.answer
    }
  }))
}

let jsonLdScript = null

onMounted(() => {
  if (props.jsonLd) {
    jsonLdScript = document.createElement('script')
    jsonLdScript.type = 'application/ld+json'
    jsonLdScript.textContent = JSON.stringify(faqJsonLd)
    document.head.appendChild(jsonLdScript)
  }
})

onUnmounted(() => {
  if (jsonLdScript && document.head.contains(jsonLdScript)) {
    document.head.removeChild(jsonLdScript)
  }
})
</script>

<template>
  <div class="space-y-4">
    <div
      v-for="(faq, index) in faqs"
      :key="index"
      class="border border-gray-200 rounded-lg overflow-hidden"
    >
      <button
        @click="toggleItem(index)"
        class="w-full px-6 py-4 text-start bg-white hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-[#489f91] focus:ring-inset"
        :aria-expanded="openItems.has(index)"
        :aria-controls="`faq-answer-${index}`"
      >
        <div class="flex items-center justify-between">
          <h3 class="text-lg font-semibold text-gray-900 leading-relaxed">
            {{ faq.question }}
          </h3>
          <i
            class="pi transition-transform duration-200 text-gray-500"
            :class="openItems.has(index) ? 'pi-minus' : 'pi-plus'"
          ></i>
        </div>
      </button>
      
      <div
        v-show="openItems.has(index)"
        :id="`faq-answer-${index}`"
        class="px-6 pb-4 bg-gray-50 border-t border-gray-200"
      >
        <div class="text-gray-700 leading-relaxed pt-4" v-html="faq.answer"></div>
      </div>
    </div>
  </div>
</template>