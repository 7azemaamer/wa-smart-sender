<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { TextPlugin } from "gsap/TextPlugin";

gsap.registerPlugin(TextPlugin);

const heroRef = ref(null);
const titleRef = ref(null);
const subtitleRef = ref(null);
const descRef = ref(null);
const ctaRef = ref(null);
const floatingRef = ref(null);
const backgroundRef = ref(null);
const trustRef = ref(null);

onMounted(async () => {
  await nextTick();

  try {
    gsap.set(
      [
        titleRef.value,
        subtitleRef.value,
        descRef.value,
        ctaRef.value,
        trustRef.value,
      ],
      {
        opacity: 0,
        y: 50,
      }
    );

    if (floatingRef.value?.children) {
      gsap.set(floatingRef.value.children, {
        opacity: 0,
        scale: 0.8,
        rotation: -10,
      });
    }

    if (backgroundRef.value) {
      gsap.set(backgroundRef.value, {
        opacity: 0,
        scale: 1.1,
      });
    }

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to(backgroundRef.value, {
      opacity: 1,
      scale: 1,
      duration: 1.5,
      ease: "power2.out",
    })
      .to(
        titleRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=1"
      )
      .to(
        subtitleRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.4"
      )
      .to(
        descRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.3"
      )
      .to(
        ctaRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      )
      .to(
        floatingRef.value?.children || [],
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 1,
          stagger: 0.2,
          ease: "elastic.out(1, 0.5)",
        },
        "-=0.8"
      )
      .to(
        trustRef.value,
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        "-=0.4"
      );

    gsap.to(floatingRef.value?.children || [], {
      y: -10,
      rotation: 5,
      duration: 3,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      stagger: 0.5,
    });
  } catch (error) {
    console.error("Animation error:", error);
  }
});

const handleCTAHover = (event, isEntering) => {
  gsap.to(event.currentTarget, {
    scale: isEntering ? 1.05 : 1,
    duration: 0.3,
    ease: "power2.out",
  });
};
</script>

<template>
  <section
    ref="heroRef"
    class="relative min-h-screen flex items-center justify-center overflow-hidden"
    dir="rtl"
  >
    <div
      ref="backgroundRef"
      class="absolute inset-0 bg-gradient-to-br from-[#489f91]/10 via-white to-[#489f91]/5"
    />

    <div ref="floatingRef" class="absolute inset-0 pointer-events-none">
      <div
        class="absolute top-20 right-20 w-20 h-20 bg-gradient-to-br from-[#489f91] to-[#3a7a6f] rounded-full opacity-20 blur-xl"
      />
      <div
        class="absolute top-40 left-32 w-16 h-16 bg-gradient-to-br from-[#489f91]/80 to-[#3a7a6f] rounded-full opacity-20 blur-lg"
      />
      <div
        class="absolute bottom-32 right-40 w-24 h-24 bg-gradient-to-br from-[#489f91] to-[#2d5f57] rounded-full opacity-15 blur-2xl"
      />
      <div
        class="absolute bottom-20 left-20 w-12 h-12 bg-gradient-to-br from-[#489f91]/60 to-[#3a7a6f] rounded-full opacity-25 blur-md"
      />
    </div>

    <div class="container relative z-10 text-center px-6">
      <h1
        ref="titleRef"
        class="text-5xl md:text-7xl font-bold mb-6 leading-tight gradient-text"
      >
        وسّع نطاق رسائلك على واتساب
        <br />
        <span class="text-[#489f91]">كما لم يحدث من قبل</span>
      </h1>

      <p
        ref="subtitleRef"
        class="text-xl md:text-2xl text-slate-600 mb-4 max-w-4xl mx-auto leading-relaxed"
      >
        أتمتة، تخصيص، تفاعل — مباشرة من متصفحك
      </p>

      <p ref="descRef" class="text-lg text-slate-500 mb-12 max-w-3xl mx-auto">
        WA Smart Sender هو إضافة كروم مثالية لإرسال رسائل واتساب جماعية، والرد
        التلقائي باستخدام الذكاء الاصطناعي، وإدارة الحملات، وتحليل الأداء — بدون
        الحاجة لحفظ أي جهة اتصال.
      </p>

      <div
        ref="ctaRef"
        class="flex flex-col sm:flex-row gap-4 justify-center items-center"
      >
        <button
          class="btn btn-primary text-lg px-8 py-4 shadow-xl"
          @mouseenter="(e) => handleCTAHover(e, true)"
          @mouseleave="(e) => handleCTAHover(e, false)"
        >
          <span>جرّبه مجانًا الآن</span>
        </button>

        <button
          class="btn btn-secondary text-lg px-8 py-4"
          @mouseenter="(e) => handleCTAHover(e, true)"
          @mouseleave="(e) => handleCTAHover(e, false)"
        >
          <span>شاهد العرض التوضيحي</span>
        </button>
      </div>

      <div ref="trustRef" class="mt-16 opacity-60">
        <p class="text-sm text-slate-400 mb-4">
          موثوق به من قبل آلاف المستخدمين
        </p>
        <div class="flex justify-center items-center gap-8 flex-wrap">
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#489f91] rounded-full animate-pulse" />
            <span class="text-sm text-slate-500">متاح الآن</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-[#489f91] rounded-full animate-pulse" />
            <span class="text-sm text-slate-500">آمن ومحمي</span>
          </div>
          <div class="flex items-center gap-2">
            <div class="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
            <span class="text-sm text-slate-500">سهل الاستخدام</span>
          </div>
        </div>
      </div>
    </div>

    <div
      class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce"
    >
      <div class="w-6 h-10 border-2 border-slate-300 rounded-full p-1">
        <div class="w-1 h-3 bg-slate-400 rounded-full mx-auto animate-pulse" />
      </div>
    </div>
  </section>
</template>
