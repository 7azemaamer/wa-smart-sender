<script setup>
import { useHead } from '@vueuse/head'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  canonical: {
    type: String,
    default: ''
  },
  image: {
    type: String,
    default: '/og/default.png'
  },
  lang: {
    type: String,
    default: 'ar'
  },
  dir: {
    type: String,
    default: 'rtl'
  },
  type: {
    type: String,
    default: 'website'
  },
  jsonLd: {
    type: Object,
    default: null
  }
})

const fullTitle = props.title.includes('WA Smart Sender') ? props.title : `${props.title} | WA Smart Sender`
const canonicalUrl = props.canonical || (typeof window !== 'undefined' ? window.location.href : '')
const imageUrl = props.image.startsWith('http') ? props.image : `https://your-domain.com${props.image}`

useHead({
  title: fullTitle,
  htmlAttrs: {
    lang: props.lang,
    dir: props.dir
  },
  meta: [
    {
      name: 'description',
      content: props.description
    },
    {
      property: 'og:title',
      content: fullTitle
    },
    {
      property: 'og:description',
      content: props.description
    },
    {
      property: 'og:image',
      content: imageUrl
    },
    {
      property: 'og:url',
      content: canonicalUrl
    },
    {
      property: 'og:type',
      content: props.type
    },
    {
      property: 'og:site_name',
      content: 'WA Smart Sender'
    },
    {
      name: 'twitter:card',
      content: 'summary_large_image'
    },
    {
      name: 'twitter:title',
      content: fullTitle
    },
    {
      name: 'twitter:description',
      content: props.description
    },
    {
      name: 'twitter:image',
      content: imageUrl
    }
  ],
  link: [
    ...(canonicalUrl ? [{
      rel: 'canonical',
      href: canonicalUrl
    }] : [])
  ],
  script: [
    ...(props.jsonLd ? [{
      type: 'application/ld+json',
      children: JSON.stringify(props.jsonLd)
    }] : [])
  ]
})
</script>

<template>
  <!-- This component only handles meta tags, no visual content -->
</template>