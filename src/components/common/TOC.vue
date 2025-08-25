<script setup>
import { ref, onMounted, onUnmounted } from "vue";

defineProps({
  headings: {
    type: Array,
    required: true,
    // Array of { id, text, level } objects
  },
});

const activeId = ref("");

const updateActiveId = () => {
  const headingElements = document.querySelectorAll("h2, h3, h4, h5, h6");
  const headingOffsets = Array.from(headingElements).map((el) => ({
    id: el.id,
    offset: el.getBoundingClientRect().top + window.scrollY,
  }));

  const currentOffset = window.scrollY + 100;

  for (let i = headingOffsets.length - 1; i >= 0; i--) {
    if (currentOffset >= headingOffsets[i].offset) {
      activeId.value = headingOffsets[i].id;
      break;
    }
  }
};

const scrollToHeading = (id) => {
  const element = document.getElementById(id);
  if (element) {
    const headerHeight = 80; // adjust based on your header height
    const top =
      element.getBoundingClientRect().top + window.scrollY - headerHeight;
    window.scrollTo({ top, behavior: "smooth" });
  }
};

onMounted(() => {
  updateActiveId();
  window.addEventListener("scroll", updateActiveId);
});

onUnmounted(() => {
  window.removeEventListener("scroll", updateActiveId);
});
</script>

<template>
  <nav
    class="toc sticky top-24 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg z-20 overflow-hidden"
  >
    <div class="p-6 pb-4">
      <h3 class="text-lg font-semibold text-gray-900 mb-4 flex items-center">
        <i class="pi pi-list me-2"></i>
        جدول المحتويات
      </h3>
    </div>
    <div class="px-6 pb-6 max-h-60 overflow-y-auto">
      <ul class="space-y-2">
        <li
          v-for="heading in headings"
          :key="heading.id"
          :class="[
            'text-sm transition-colors',
            heading.level === 2 ? 'font-medium' : 'font-normal text-gray-600',
            heading.level === 3 ? 'pr-4' : '',
            heading.level === 4 ? 'pr-8' : '',
            activeId === heading.id
              ? 'text-[#489f91] font-semibold'
              : 'hover:text-[#489f91]',
          ]"
        >
          <button
            @click="scrollToHeading(heading.id)"
            class="text-start w-full py-1 leading-relaxed"
            :class="
              activeId === heading.id
                ? 'text-[#489f91]'
                : 'text-gray-700 hover:text-[#489f91]'
            "
          >
            {{ heading.text }}
          </button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<style scoped>
/* Custom scrollbar for TOC content */
.toc div:has(ul) {
  scrollbar-width: thin;
  scrollbar-color: #cbd5e1 #f8fafc;
}

.toc div:has(ul)::-webkit-scrollbar {
  width: 6px;
}

.toc div:has(ul)::-webkit-scrollbar-track {
  background: #f8fafc;
  border-radius: 3px;
}

.toc div:has(ul)::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.toc div:has(ul)::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>
