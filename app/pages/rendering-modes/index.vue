<template>
  <section class="container mx-auto space-y-4">
    <UiInfo>
      <template #title>Info</template>
      <template #description>
        This page demonstrates how to configure different rendering modes for
        different routes. Nuxt is offering following type of rendering modes:
        <ul class="list-disc list-inside">
          <li>
            SPA (Single Page Application): Renders everything on the client
            side. No SSR or static generation; the app behaves like a
            traditional Vue SPA.)
          </li>
          <li>
            SSR (Server-Side Rendering): Pages are rendered on the server for
            each request, providing fast initial load and SEO benefits.
          </li>
          <li>
            Static: Pages are generated at build time and served as static HTML.
            Fast and efficient, but content is only updated on rebuild.
          </li>
          <li>
            Prerender: Similar to static, but can be applied to specific routes.
            Pages are generated ahead of time and served statically.
          </li>
          <li>
            SWR (Stale-While-Revalidate): Serves cached content while
            revalidating in the background. Users get fast responses, and
            content updates after cache expiry.
          </li>
          <li>
            ISR (Incremental Static Regeneration): Allows static pages to be
            updated after deployment at runtime, combining static and dynamic
            benefits.
          </li>
        </ul>
      </template>
    </UiInfo>
    <UiDivider>nuxt.config.ts</UiDivider>
    <UiCard>
      <pre class="text-pink-800">
      <code>
      export default defineNuxtConfig({
        nitro: {
          routeRules: {
            '/blog/**': { swr: true }, // stale-while-revalidate enabled
            '/blog/**': { swr: 600 }, // stale-while-revalidate enabled with 600 seconds cache time
            '/blog/**': { isr: true }, // incremental-static-regeneration enabled
            '/blog/**': { isr: 600 }, // incremental-static-regeneration enabled with 600 seconds cache time
            '/blog/**': { static: true }, // static rendering enabled
            '/blog/**': { prerender: true }, // prerendering enabled
            '/blog/**': { cache: { /* cache options*/ } }, // cache options
            '/assets/**': { headers: { 'cache-control': 's-maxage=0' } }, // cache options
            '/api/v1/**': { cors: true, headers: { 'access-control-allow-methods': 'GET' } }, // cors enabled
            '/old-page': { redirect: '/new-page' }, // uses status code 307 (Temporary Redirect)
            '/old-page2': { redirect: { to:'/new-page2', statusCode: 301 } }, // uses status code 301 (Moved Permanently)
            '/old-page/**': { redirect: '/new-page/**' }, // uses status code 307 (Temporary Redirect)
            '/proxy/example': { proxy: 'https://example.com' }, // proxy to example.com
            '/proxy/**': { proxy: '/api/**' }, // proxy to /api/**
          }
        }
      })
      </code>
     </pre>
    </UiCard>
    <UiDivider>pages/about/index.vue</UiDivider>
    <UiCard>
      <pre class="text-pink-800">
        <code>
          defineRouteRules({
            prerender: true,
          });
        </code>
      </pre>
    </UiCard>
    <UiDivider>Example of pre-rendered page and spa</UiDivider>
    <div class="space-x-4">
      <NuxtLink class="text-pink-800 hover:underline" to="/rendering-modes/spa"
        >SPA Example</NuxtLink
      >
      <NuxtLink
        class="text-pink-800 hover:underline"
        to="/rendering-modes/prerender"
        >Prerender Example</NuxtLink
      >
    </div>
  </section>
</template>

<script lang="ts" setup>
definePageMeta({
  displayName: "Rendering Modes",
  order: 30,
});
</script>
