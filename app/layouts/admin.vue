<template>
  <div>
    <nav
      class="flex items-center justify-between p-4 h-16 bg-neutral-100 border-b border-neutral-200"
    >
      <h1
        class="font-bold hover:text-pink-800 cursor-pointer"
        @click="$router.push('/middlewares/admin')"
      >
        Admin Layout
      </h1>
      <div>Hello, {{ name }}!</div>
      <div class="space-x-4">
        <NuxtLink
          class="text-pink-800 hover:underline"
          to="/middlewares/admin/settings"
        >
          Go to Settings
        </NuxtLink>
        <UiButton @click="onLogout">Log Out</UiButton>
      </div>
    </nav>
    <main class="px-4 py-8">
      <slot />
    </main>
  </div>
</template>

<script lang="ts" setup>
const name = computed(() => useCookie("user").value || "");

const router = useRouter();
const onLogout = async () => {
  useCookie("user").value = null;
  await router.push("/middlewares/login");
};
</script>
