<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { RouterLink } from "vue-router";

defineProps({
  buttonText: {
    type: String,
    default: "ابدأ التجربة الآن",
  },
  buttonLink: {
    type: String,
    default: "/pricing",
  },
});

const isVisible = ref(false);
const isSticky = ref(false);

const handleScroll = () => {
  const scrollY = window.scrollY;
  const windowHeight = window.innerHeight;
  const documentHeight = document.documentElement.scrollHeight;

  // Show after scrolling 50% of viewport height
  isVisible.value = scrollY > windowHeight * 0.5;

  // Hide when near footer (last 200px)
  isSticky.value = scrollY < documentHeight - windowHeight - 200;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
  handleScroll();
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <Teleport to="body">
    <div
      v-show="isVisible && isSticky"
      class="fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-xs z-50 transition-all duration-300 transform"
      :class="
        isVisible && isSticky
          ? 'translate-y-0 opacity-100'
          : 'translate-y-4 opacity-0'
      "
    >
      <div
        class="bg-white border border-gray-200 rounded-xl shadow-2xl p-4 backdrop-blur-sm"
      >
        <div class="text-center">
          <p class="text-sm text-gray-600 mb-3">جاهز للبدء؟</p>
          <RouterLink
            :to="buttonLink"
            class="w-full inline-flex items-center justify-center bg-[#489f91] hover:bg-[#3a7a6f] text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <i class="pi pi-arrow-left me-2"></i>
            {{ buttonText }}
          </RouterLink>
        </div>
      </div>
    </div>
  </Teleport>
</template>
