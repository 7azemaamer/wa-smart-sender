<script setup>
import { useHead } from "@vueuse/head";
import { computed } from "vue";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  canonical: {
    type: String,
    default: "",
  },
  image: {
    type: String,
    default: "/og/default.png",
  },
  lang: {
    type: String,
    default: "ar",
  },
  dir: {
    type: String,
    default: "rtl",
  },
  type: {
    type: String,
    default: "website",
  },
  jsonLd: {
    type: Object,
    default: null,
  },
});

const fullTitle = computed(() =>
  props.title.includes("WA Smart Sender")
    ? props.title
    : `${props.title} | WA Smart Sender`
);

const canonicalUrl = computed(() => {
  if (props.canonical) {
    return props.canonical.startsWith("http")
      ? props.canonical
      : `https://wsmartsender.com${props.canonical}`;
  }

  return typeof window !== "undefined" ? window.location.href : "";
});

const imageUrl = computed(() =>
  props.image.startsWith("http")
    ? props.image
    : `https://wsmartsender.com${props.image}`
);

useHead(() => ({
  title: fullTitle.value,
  htmlAttrs: {
    lang: props.lang,
    dir: props.dir,
  },
  meta: [
    {
      name: "description",
      content: props.description,
    },
    {
      property: "og:title",
      content: fullTitle.value,
    },
    {
      property: "og:description",
      content: props.description,
    },
    {
      property: "og:image",
      content: imageUrl.value,
    },
    {
      property: "og:url",
      content: canonicalUrl.value,
    },
    {
      property: "og:type",
      content: props.type,
    },
    {
      property: "og:site_name",
      content: "WA Smart Sender",
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: fullTitle.value,
    },
    {
      name: "twitter:description",
      content: props.description,
    },
    {
      name: "twitter:image",
      content: imageUrl.value,
    },
  ],
  link: [
    ...(canonicalUrl.value
      ? [
          {
            rel: "canonical",
            href: canonicalUrl.value,
          },
        ]
      : []),
  ],
  script: [
    ...(props.jsonLd
      ? [
          {
            type: "application/ld+json",
            children: JSON.stringify(props.jsonLd),
          },
        ]
      : []),
  ],
}));
</script>

<template>
  <!-- This component only handles meta tags, no visual content -->
</template>
