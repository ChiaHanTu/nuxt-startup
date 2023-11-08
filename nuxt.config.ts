import { resolve } from 'path';
import svgLoader from 'vite-svg-loader';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      htmlAttrs: {
        lang: 'zh-Hant-TW',
      },
      title: 'nuxt-startup',
      viewport: 'width=device-width,initial-scale=1',
      link: [{ rel: 'icon', href: '/img/logo-icon.png' }],
      meta: [
        { name: 'description', content: 'nuxt-startup' },
      ],
    },
  },
  modules: ['@unocss/nuxt', '@pinia/nuxt', '@vueuse/nuxt'],
  vite: {
    plugins: [
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
  css: [
    // reset css
    '@unocss/reset/tailwind.css',
    // 全域共用的自定義 css
    resolve(__dirname, './assets/scss/main.scss'),
  ],
  devtools: { enabled: true },
});
