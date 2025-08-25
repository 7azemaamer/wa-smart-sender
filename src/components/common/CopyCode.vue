<script setup>
import { ref } from "vue";

defineProps({
  code: {
    type: String,
    required: true,
  },
  language: {
    type: String,
    default: "text",
  },
});

const copied = ref(false);

const copyToClipboard = async (text) => {
  try {
    await navigator.clipboard.writeText(text);
    copied.value = true;
    setTimeout(() => {
      copied.value = false;
    }, 2000);
  } catch (err) {
    console.error("Failed to copy text: ", err);
  }
};
</script>

<template>
  <div class="relative bg-gray-900 rounded-lg overflow-hidden">
    <!-- Header -->
    <div
      class="flex items-center justify-between bg-gray-800 px-4 py-2 text-sm"
    >
      <span class="text-gray-400">{{ language }}</span>
      <button
        @click="copyToClipboard(code)"
        class="flex items-center text-gray-400 hover:text-white transition-colors"
        :class="copied ? 'text-[#489f91]' : 'text-gray-400'"
      >
        <i :class="copied ? 'pi pi-check' : 'pi pi-copy'" class="me-2"></i>
        {{ copied ? "تم النسخ!" : "نسخ" }}
      </button>
    </div>

    <!-- Code Content -->
    <div class="p-4">
      <pre
        class="text-gray-100 text-sm leading-relaxed overflow-x-auto"
      ><code>{{ code }}</code></pre>
    </div>
  </div>
</template>

<style scoped>
pre {
  direction: ltr;
  text-align: left;
  white-space: pre;
  word-spacing: normal;
  word-break: normal;
  word-wrap: normal;
  tab-size: 2;
  hyphens: none;
}

code {
  font-family: "Fira Code", "Monaco", "Cascadia Code", "Roboto Mono", monospace;
}
</style>
