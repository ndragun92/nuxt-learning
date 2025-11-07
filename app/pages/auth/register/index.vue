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
          Create an account
        </h2>
      </div>
      <form class="space-y-6" @submit.prevent="onSubmit">
        <div>
          <div class="col-span-2 grid grid-cols-2">
            <input
              id="firstName"
              v-model.trim="form.firstName"
              type="text"
              name="firstName"
              required
              placeholder="First name"
              autocomplete="firstName"
              aria-label="First name"
              class="block w-full rounded-tl-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
            <input
              id="lastName"
              v-model.trim="form.lastName"
              type="text"
              name="lastName"
              required
              placeholder="Last name"
              autocomplete="lastName"
              aria-label="Last name"
              class="block -ml-px w-[calc(100%+1px)] rounded-tr-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
            />
          </div>
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
              class="block w-full bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:relative focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
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
            Register
          </button>
        </div>
      </form>

      <p class="text-center text-sm/6 text-gray-500">
        Already have an account?
        <NuxtLink
          to="/auth/login"
          class="font-semibold text-indigo-600 hover:text-indigo-500"
          >Click here to sign in</NuxtLink
        >
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TUser } from "~/composables/useUser";
import { useToastStore } from "~/store/toastStore";

definePageMeta({
  layout: "auth",
  middleware: "authenticated",
});

const { setUser } = useUser();
const { setToken } = useAuth();
const { handleError } = useErrorHandler();
const toastStore = useToastStore();
const router = useRouter();

const form = ref({
  firstName: "John",
  lastName: "Doe",
  email: "john@doe.com",
  password: "12345678",
});

const onSubmit = async () => {
  const [error, data] = await catchError(
    $fetch<{ token: string; user: TUser }>("/api/auth/register", {
      method: "POST",
      body: toRaw(form.value),
    }),
  );

  if (error) {
    handleError(error._message);
    return;
  }

  const { token, user } = data;
  setToken(token);
  setUser(user);
  toastStore.success({
    text: "Account created successfully",
  });
  await router.push("/");
};
</script>
