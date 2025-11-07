export default defineNuxtPlugin((nuxtApp) => {
  console.log("[plugin] api start");
  const token = useCookie("token");

  const api = $fetch.create({
    onRequest({ options }) {
      if (token.value) {
        options.headers.set("Authorization", token.value);
      }
    },
    async onResponseError({ response }) {
      if (response.status === 401) {
        useCookie("token").value = "";
        await nuxtApp.runWithContext(() => navigateTo("/auth/login"));
      }
    },
  });

  return {
    provide: {
      api,
    },
  };
});
