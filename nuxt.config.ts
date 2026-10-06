// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: { lang: 'ru' }
    }
  },

  css: ['~/assets/css/main.css'],

  vite: {
    server: {
      allowedHosts: ['samorodok-web.cloudpub.ru']
    }
  },


  modules: [
    '@nuxt/a11y',
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/tailwindcss'
  ]
})
