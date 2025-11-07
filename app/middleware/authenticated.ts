export default defineNuxtRouteMiddleware(() => {
  console.log("authenticated middleware");
  const token = useCookie("token");
  if (token.value) {
    return navigateTo("/");
  }
});
