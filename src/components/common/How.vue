<script setup>
import { ref, onMounted, nextTick } from "vue";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "primeicons/primeicons.css";
import { howFeatures } from "@/constants";

gsap.registerPlugin(ScrollTrigger);

const sectionRef = ref(null);
const cardsRef = ref([]);

onMounted(async () => {
  await nextTick();

  gsap.set(cardsRef.value, { opacity: 0, y: 50 });

  ScrollTrigger.batch(cardsRef.value, {
    onEnter: (batch) =>
      gsap.to(batch, {
        opacity: 1,
        y: 0,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
      }),
    once: true,
    start: "top 80%",
  });
});
</script>

<template>
  <section
    ref="sectionRef"
    class="relative py-24 bg-white text-right"
    dir="rtl"
  >
    <div class="max-w-7xl mx-auto px-6">
      <h2 class="text-4xl font-bold text-slate-800 mb-4">
        كيف يساعدك WA Smart Sender؟
      </h2>
      <p class="text-slate-500 text-lg mb-12 max-w-2xl">
        أدوات ذكية لتوسيع نطاق رسائلك وتحقيق أقصى فعالية ممكنة — دون تعقيد.
      </p>

      <div class="grid md:grid-cols-3 gap-8">
        <div
          v-for="(feature, index) in howFeatures"
          :key="index"
          class="bg-white rounded-2xl shadow-md p-6 border border-slate-100 hover:shadow-lg transition duration-300"
        >
          <div class="flex items-center gap-3 mb-4">
            <i class="pi pi-check-circle text-emerald-500 text-xl"></i>
            <h3 class="text-xl font-semibold text-slate-700">
              {{ feature.title }}
            </h3>
          </div>
          <p class="text-slate-500 leading-relaxed">
            {{ feature.desc }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
section {
  background: linear-gradient(to bottom, #ffffff 0%, #f9fafb 100%);
}
</style>
