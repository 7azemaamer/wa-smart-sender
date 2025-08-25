<script setup>
import { RouterLink, useRoute } from "vue-router";
import { computed, onMounted, onUnmounted } from "vue";

const route = useRoute();

const breadcrumbs = computed(() => {
  const pathArray = route.path.split("/").filter((path) => path);
  const breadcrumbs = [];

  breadcrumbs.push({
    name: "الرئيسية",
    path: "/",
    current: route.path === "/",
  });

  let currentPath = "";
  pathArray.forEach((path, index) => {
    currentPath += `/${path}`;
    const isLast = index === pathArray.length - 1;

    const pathNames = {
      was: "المنتج",
      pricing: "الأسعار",
      blog: "المدونة",
      faq: "الأسئلة الشائعة",
      contact: "تواصل معنا",
      compare: "المقارنات",
      "case-studies": "دراسات الحالة",
      guides: "الأدلة",
      templates: "القوالب",
      privacy: "سياسة الخصوصية",
      terms: "شروط الاستخدام",
    };

    breadcrumbs.push({
      name: pathNames[path] || path,
      path: currentPath,
      current: isLast,
    });
  });

  return breadcrumbs;
});

const jsonLd = computed(() => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.value.map((item, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: item.name,
    item: `https://wsmartsender.com${item.path}`,
  })),
}));

let jsonLdScript = null;

onMounted(() => {
  jsonLdScript = document.createElement("script");
  jsonLdScript.type = "application/ld+json";
  jsonLdScript.textContent = JSON.stringify(jsonLd.value);
  document.head.appendChild(jsonLdScript);
});

onUnmounted(() => {
  if (jsonLdScript && document.head.contains(jsonLdScript)) {
    document.head.removeChild(jsonLdScript);
  }
});
</script>

<template>
  <nav
    class="bg-gradient-to-r from-gray-50 to-gray-100 mb-6 py-4 border-b-2 border-gray-200/60 shadow-sm"
    aria-label="مسار التنقل"
  >
    <div class="container mx-auto px-6 max-w-6xl">
      <ol class="flex items-center space-x-2 space-x-reverse text-sm">
        <li
          v-for="(item, index) in breadcrumbs"
          :key="item.path"
          class="flex items-center"
        >
          <RouterLink
            v-if="!item.current"
            :to="item.path"
            class="text-gray-600 hover:text-[#489f91] transition-all duration-200 hover:underline hover:underline-offset-2 px-2 py-1 rounded-md hover:bg-white/60"
          >
            {{ item.name }}
          </RouterLink>
          <span
            v-else
            class="text-gray-900 font-semibold bg-white/80 px-2 py-1 rounded-md shadow-sm"
            :aria-current="item.current ? 'page' : undefined"
          >
            {{ item.name }}
          </span>
          <i
            v-if="index < breadcrumbs.length - 1"
            class="pi pi-angle-left text-gray-400 mx-3 text-xs"
          ></i>
        </li>
      </ol>
    </div>
  </nav>
</template>
