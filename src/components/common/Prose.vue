<template>
  <div class="prose prose-lg prose-gray max-w-none prose-headings:text-gray-900 prose-a:text-[#489f91] prose-a:no-underline hover:prose-a:underline">
    <slot />
  </div>
</template>

<style>
/* Custom prose styles for Arabic content */
.prose {
  direction: rtl;
  text-align: start;
}

.prose h1,
.prose h2,
.prose h3,
.prose h4,
.prose h5,
.prose h6 {
  font-family: 'Cairo', sans-serif;
  font-weight: 700;
  line-height: 1.3;
  margin-top: 2rem;
  margin-bottom: 1rem;
}

.prose p {
  line-height: 1.8;
  margin-bottom: 1.25rem;
}

.prose ul,
.prose ol {
  margin: 1.5rem 0;
  padding-right: 1.5rem;
  padding-left: 0;
}

.prose li {
  margin: 0.5rem 0;
  line-height: 1.7;
}

.prose blockquote {
  border-right: 4px solid #e5e7eb;
  border-left: none;
  padding-right: 1rem;
  padding-left: 0;
  margin: 1.5rem 0;
  font-style: italic;
  color: #6b7280;
}

.prose code {
  background-color: #f3f4f6;
  padding: 0.125rem 0.25rem;
  border-radius: 0.25rem;
  font-size: 0.875em;
  direction: ltr;
  display: inline-block;
}

.prose pre {
  background-color: #1f2937;
  color: #f9fafb;
  padding: 1rem;
  border-radius: 0.5rem;
  overflow-x: auto;
  direction: ltr;
}

.prose pre code {
  background-color: transparent;
  color: inherit;
  padding: 0;
}

.prose table {
  margin: 1.5rem 0;
  border-collapse: collapse;
  width: 100%;
}

.prose th,
.prose td {
  padding: 0.75rem;
  text-align: start;
  border: 1px solid #e5e7eb;
}

.prose th {
  background-color: #f9fafb;
  font-weight: 600;
}
</style>