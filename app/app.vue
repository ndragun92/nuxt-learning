<template>
  <NuxtLayout>
    <Html lang="en" :data-route-path="$route?.path">
      <Head>
        <Title>Nuxt Learning</Title>
        <Meta name="language" content="en" />
        <Meta property="og:title" content="Nuxt Learning" />
        <Meta name="twitter:title" content="Nuxt Learning" />
        <Meta name="description" content="Nuxt Learning" />
        <Meta property="og:description" content="Nuxt - Learn by doing" />
        <Meta name="twitter:description" content="Nuxt - Learn by doing" />
        <Meta property="og:image" content="/favicon.png" />
        <Meta name="twitter:image" content="/favicon.png" />
        <Meta property="og:site_name" content="/favicon.png" />
        <Meta name="twitter:site" content="/favicon.png" />
        <Meta name="url" :content="`${nuxtApp?.$app_origin}${$route?.path}`" />
        <Meta
          property="og:url"
          :content="`${nuxtApp?.$app_origin}${$route?.path}`"
        />
        <Link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <Link rel="apple-touch-icon" type="image/png" href="/favicon.png" />
        <Link rel="apple-touch-startup-image" href="/favicon.png" />
      </Head>
    </Html>
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </NuxtLayout>
</template>

<script lang="ts" setup>
const nuxtApp = useNuxtApp();
</script>

<style>
#__nuxt {
  height: 100dvh;
  display: flex;
  flex-direction: column;
}
</style>
