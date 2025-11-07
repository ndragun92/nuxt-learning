import type { TUser } from "~/composables/useUser";

export default defineNuxtPlugin(async (nuxtApp) => {
  console.log("[plugin] my-init-plugin start");
  let host: string;
  // Get host in case of server side request
  if (import.meta.env.SSR) {
    host = nuxtApp?.ssrContext?.event?.node?.req?.headers?.host || "";
  } else {
    host = window.location.host;
  }
  const origin = new URL(`https://${host}`);
  // Extract origin and set data in-app context
  nuxtApp.provide("app_origin", origin.origin);
  nuxtApp.provide("app_hostname", origin.hostname);

  // Populate user data on initial load
  const token = useCookie("token");
  const { setUser } = useUser();
  const { $api } = useNuxtApp();
  if (token.value) {
    const [error, data] = await catchError(
      $api<{ user: TUser }>(`/api/users/me`),
    );
    if (!error && data) {
      setUser(data.user);
    }
  }
});
