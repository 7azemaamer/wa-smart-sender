<script setup>
import { ref, onMounted, nextTick } from "vue";
import { RouterLink, useRoute } from "vue-router";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { navLinks } from "@/constants";

const route = useRoute();
const mobileMenuOpen = ref(false);

gsap.registerPlugin(ScrollTrigger);

const navRef = ref(null);
const logoRef = ref(null);
const navItemsRef = ref(null);

onMounted(async () => {
  await nextTick();

  gsap.set(logoRef.value, { opacity: 0, scale: 0.8 });
  gsap.set(navItemsRef.value?.children || [], { opacity: 0, y: -10 });

  const tl = gsap.timeline();
  tl.to(logoRef.value, {
    opacity: 1,
    scale: 1,
    duration: 0.5,
    ease: "power2.out",
  }).to(
    navItemsRef.value?.children || [],
    {
      opacity: 1,
      y: 0,
      duration: 0.4,
      stagger: 0.05,
      ease: "power2.out",
    },
    "-=0.3"
  );

  ScrollTrigger.create({
    trigger: "body",
    start: "100px top",
    end: "bottom bottom",
    onEnter: () => {
      gsap.to(navRef.value, {
        backdropFilter: "blur(16px)",
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderBottomColor: "rgba(203, 213, 225, 0.3)",
        duration: 0.3,
        ease: "power2.out",
      });
    },
    onLeaveBack: () => {
      gsap.to(navRef.value, {
        backdropFilter: "blur(0px)",
        backgroundColor: "transparent",
        borderBottomColor: "transparent",
        duration: 0.3,
        ease: "power2.out",
      });
    },
  });
});

const handleNavHover = (event, isEntering) => {
  const item = event.currentTarget;
  const underline = item.querySelector(".nav-underline");

  gsap.to(item, {
    scale: isEntering ? 1.025 : 1,
    duration: 0.2,
    ease: "power2.out",
  });

  gsap.to(underline, {
    scaleX: isEntering ? 1 : 0,
    duration: 0.3,
    ease: "power2.out",
  });
};

const handleLogoHover = (isEntering) => {
  gsap.to(logoRef.value, {
    scale: isEntering ? 1.05 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
};

const toggleMobileMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
</script>

<template>
  <nav
    ref="navRef"
    class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent"
    dir="rtl"
  >
    <div class="flex items-center justify-between max-w-7xl mx-auto px-6 py-3">
      <RouterLink
        to="/"
        ref="logoRef"
        class="cursor-pointer"
        @mouseenter="handleLogoHover(true)"
        @mouseleave="handleLogoHover(false)"
      >
        <img
          src="/images/logo.png"
          alt="WA Smart Sender Logo"
          class="w-20 h-15 object-contain transition-transform"
        />
      </RouterLink>

      <!-- Desktop Navigation -->
      <ul
        ref="navItemsRef"
        class="hidden lg:flex items-center gap-6 md:gap-8 text-sm font-medium text-slate-600"
      >
        <li
          v-for="{ path, name } of navLinks"
          :key="path"
          class="relative cursor-pointer transition-transform duration-200"
          @mouseenter="handleNavHover($event, true)"
          @mouseleave="handleNavHover($event, false)"
        >
          <RouterLink
            :to="path"
            class="block text-lg py-1 hover:text-slate-900 transition-colors duration-200"
            :class="{
              'text-[#489f91] font-semibold': route.path === path,
              'text-slate-600': route.path !== path,
            }"
          >
            {{ name }}
            <div
              class="nav-underline absolute bottom-0 right-0 h-0.5 w-full bg-gradient-to-l from-[#489f91] to-[#3a7a6f] transform origin-right transition-transform duration-300"
              :class="{
                'scale-x-100': route.path === path,
                'scale-x-0': route.path !== path,
              }"
            ></div>
          </RouterLink>
        </li>
      </ul>

      <!-- Mobile Menu Button -->
      <button
        @click="toggleMobileMenu"
        class="lg:hidden p-2 text-slate-600 hover:text-slate-900 transition-colors"
        aria-label="القائمة"
      >
        <i class="pi pi-bars text-xl" v-if="!mobileMenuOpen"></i>
        <i class="pi pi-times text-xl" v-else></i>
      </button>
    </div>

    <!-- Mobile Menu -->
    <div
      v-if="mobileMenuOpen"
      class="lg:hidden bg-white border-b border-gray-200 shadow-lg"
    >
      <div class="max-w-7xl mx-auto px-6 py-4">
        <ul class="space-y-4">
          <li v-for="{ path, name } of navLinks" :key="path">
            <RouterLink
              :to="path"
              @click="mobileMenuOpen = false"
              class="block text-lg py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              :class="{
                'text-[#489f91] font-semibold bg-[#489f91]/10':
                  route.path === path,
                'text-slate-600': route.path !== path,
              }"
            >
              {{ name }}
            </RouterLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
nav {
  backdrop-filter: blur(0px);
  background-color: transparent;
  transition: background-color 0.3s ease, backdrop-filter 0.3s ease;
}

a:focus-visible {
  outline: 1px solid #64748b;
  outline-offset: 2px;
  border-radius: 4px;
}
</style>
