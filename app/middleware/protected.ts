export default defineNuxtRouteMiddleware(() => {
  console.log("protected middleware");
  const token = useCookie("token");
  if (!token.value) {
    return navigateTo("/auth/login");
  }
});
