import svgLoader from "vite-svg-loader";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: "zh-Hant-TW",
      },
      title: "nuxt-startup",
      viewport: "width=device-width,initial-scale=1",
      link: [{ rel: "icon", href: "/favicon.ico", sizes: "any" }],
      meta: [
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "nuxt-startup" },
      ],
    },
  },
  modules: ["@unocss/nuxt", "@pinia/nuxt", "@vueuse/nuxt"],
  vite: {
    plugins: [svgLoader()],
  },
  devtools: { enabled: true },
});
