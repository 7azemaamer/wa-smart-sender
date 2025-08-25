<template>
  <a
    href="#main-content"
    class="skip-to-content sr-only focus:not-sr-only focus:absolute focus:top-4 focus:right-4 bg-[#489f91] text-white px-4 py-2 rounded-md font-medium z-50 focus:z-50"
  >
    انتقل إلى المحتوى الرئيسي
  </a>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.sr-only:focus,
.focus\:not-sr-only:focus {
  position: static;
  width: auto;
  height: auto;
  padding: 0.5rem 1rem;
  margin: 0;
  overflow: visible;
  clip: auto;
  white-space: normal;
}
</style>