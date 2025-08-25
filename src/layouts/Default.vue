<script setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import SkipToContent from "@/components/common/SkipToContent.vue";
</script>

<template>
  <div class="min-h-screen flex flex-col" dir="rtl" lang="ar">
    <SkipToContent />
    <Header />
    <main id="main-content" class="flex-1 mt-20 md:mt-12">
      <router-view />
    </main>
    <Footer />
  </div>
</template>