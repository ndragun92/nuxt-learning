<template>
  <div
    class="flex min-h-full items-center justify-center px-4 py-12 sm:px-6 lg:px-8"
  >
    <div class="w-full max-w-sm space-y-10">
      <div>
        <img
          src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=600"
          alt="Your Company"
          class="mx-auto h-10 w-auto"
        />
        <h2
          class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900"
        >
          Sign in to your account
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <div class="-mt-px">
            <input
              id="email-address"
              v-model.trim="form.email"
              type="email"
              name="email"
              required
              placeholder="Email address"
              autocomplete="email"
              aria-label="Email address"
              class="block w-full rounded-t-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
          <div class="-mt-px">
            <input
              id="password"
              v-model.trim="form.password"
              type="password"
              name="password"
              required
              placeholder="Password"
              autocomplete="current-password"
              aria-label="Password"
              class="block w-full rounded-b-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
        </div>

        <div>
          <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-indigo-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="text-center text-sm/6 text-gray-500">
        Not a member?
        <NuxtLink
          to="/auth/register"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Click here to sign up</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TUser } from "~/composables/useUser";

definePageMeta({
  layout: "auth",
  middleware: "authenticated",
});

const { setUser } = useUser();
const { handleError } = useErrorHandler();
const { $api } = useNuxtApp();
const router = useRouter();

const form = ref({
  email: "john@doe.com",
  password: "12345678",
});

const onSubmit = async () => {
  const [error, data] = await catchError(
    $api<{ token: string; user: TUser }>("/api/auth/login", {
      method: "POST",
      body: toRaw(form.value),
    }),
  );

  if (error) {
    handleError(error._message);
    return;
  }

  const { token, user } = data;
  useCookie("token", {
    maxAge: 60 * 60 * 24 * 30, // 30 days
    path: "/",
  }).value = token;
  setUser(user);
  await router.push("/");
};
</script>
