// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules:[
    '@nuxtjs/tailwindcss',
    'nuxt-headlessui',
    '@pinia/nuxt',
],
app: {
  head: {
    title: 'Social Task',
  },
},
  devtools: { enabled: true },
  css: ['~/assets/css/tailwind.css'],
  postcss: {
    plugins: {
      tailwindcss: {
        cssPath: '~/assets/css/tailwind.css',
        configPath: 'tailwind.config.js',
        exposeConfig: false,
        injectPosition: 0,
        viewer: true,
      },
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    // Keys within public, will be also exposed to the client-side
    public: {
      apiBase: process.env.API_BASE_URL
    }
  },
  pinia: {
    autoImports: [
      'defineStore', 
      'storeToRefs',
      ['defineStore', 'definePiniaStore'], 
    ],
  },
})