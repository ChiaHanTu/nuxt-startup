import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';
import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      title: 'nuxt-startup',
      viewport: 'width=device-width,initial-scale=1',
      // link: [{ rel: 'icon', href: '/img/logo-icon.png' }],
      meta: [
        { name: 'description', content: 'nuxt-startup' },
      ],
    },
  },
  modules: ['@pinia/nuxt', '@vueuse/nuxt'],
  vite: {
    plugins: [
      tailwindcss(),
      svgLoader({
        svgoConfig: {
          plugins: [
            'removeXMLNS',
            {
              name: 'removeAttrs',
              params: {
                attrs: 'fill',
              },
            },
          ],
        },
      }),
    ],
  },
  runtimeConfig: {
    public: {
      siteUrl: process.env.NUXT_SITE_URL,
      apiUrl: process.env.NUXT_API_URL,
    },
  },
  css: ['~/assets/scss/main.scss', '~/assets/main.css'],
  devtools: { enabled: true },
});
