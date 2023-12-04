// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  telemetry: false,
  modules: ["@nuxtjs/tailwindcss", "@invictus.codes/nuxt-vuetify"],
  tailwindcss: {
    cssPath: '~/assets/css/main.css',
  }
})