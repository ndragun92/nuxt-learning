<template>
  <section class="container mx-auto mt-8 space-y-6">
    <header class="text-center">
      <h1 class="text-4xl font-bold text-pink-800 mb-3">Nuxt 3+ Examples</h1>
      <p class="text-neutral-700 max-w-2xl mx-auto">
        This project is a collection of hands-on examples demonstrating Nuxt 3+
        features. Browse the sections below to explore pages located under
        <code>/app/pages</code>. The list is generated from each page's meta
        information, so it stays up to date.
      </p>
    </header>

    <section
      class="w-full bg-neutral-50 rounded shadow shadow-neutral-100 p-6 border-2 border-pink-800"
    >
      <h2 class="text-2xl font-semibold text-pink-800 mb-4">
        Explore the Examples
      </h2>
      <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <NuxtLink
          v-for="route in orderedExampleRoutes"
          :key="route.path"
          :to="route.path"
          class="block rounded border border-pink-800/30 hover:border-pink-800 p-4 bg-white hover:shadow transition"
        >
          <div class="text-pink-800 font-semibold">
            {{ route.meta?.displayName || prettify(route.path) }}
          </div>
          <div class="text-neutral-600 text-sm truncate">{{ route.path }}</div>
        </NuxtLink>
      </div>
    </section>
  </section>
</template>

<script lang="ts" setup>
const router = useRouter();

const exampleRoutes = computed(() => {
  return router
    .getRoutes()
    .filter((r) => {
      // exclude the homepage and internal/vue routes
      if (!r.path || r.path === "/") return false;
      if (r.path.startsWith("/api") || r.path.startsWith("/_")) return false;
      // keep top-level example pages (index pages) and folders with index
      // Prefer those that provide displayName in meta
      return true;
    })
    .map((r) => ({
      path: r.path,
      meta: r.meta as { displayName?: string; order?: number } | undefined,
    }));
});

const orderedExampleRoutes = computed(() => {
  const items = [...exampleRoutes.value]; // clone to avoid mutating source
  items.sort((a, b) => {
    const ao = a.meta?.order ?? Number.POSITIVE_INFINITY;
    const bo = b.meta?.order ?? Number.POSITIVE_INFINITY;
    if (ao !== bo) return ao - bo;
    const an = a.meta?.displayName ?? a.path;
    const bn = b.meta?.displayName ?? b.path;
    return an.localeCompare(bn);
  });
  return items;
});

const prettify = (path: string) => {
  const name = path.replace(/^\//, "").replace(/-/g, " ");
  return name.split("/")[0]?.replace(/\b\w/g, (c) => c.toUpperCase());
};

definePageMeta({
  displayName: "Homepage",
  order: 0,
});
</script>
