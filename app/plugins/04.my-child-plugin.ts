export default defineNuxtPlugin({
  name: "my-child-plugin",
  async setup(nuxtApp) {
    console.log("[plugin] my-child-plugin start", nuxtApp._id);
    await new Promise((resolve) => setTimeout(resolve, 500));
    console.log("[plugin] my-child-plugin end", nuxtApp._id);
  },
});
