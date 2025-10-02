export default defineNuxtRouteMiddleware(() => {
  console.log("protected middleware");
  const user = useCookie("user");
  if (!user.value) {
    return navigateTo("/middlewares/login");
  }
});
