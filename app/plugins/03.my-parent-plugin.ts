export default defineNuxtPlugin({
  name: "my-parent-plugin",
  dependsOn: ["my-child-plugin"],
  async setup(nuxtApp) {
    // this plugin will wait for the end of `my-child-plugin`'s execution before it runs
    console.log("[plugin] my-parent-plugin start", nuxtApp._id);
  },
});
