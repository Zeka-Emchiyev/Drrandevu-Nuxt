export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'drrandevu',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/bootstrap.js',
      mode: 'client'
    },
    '~/plugins/axios',
    '~/plugins/pagination.js',
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'vue-ssr-carousel/nuxt',
    '@nuxtjs/moment'
    ],
  moment: {
    /* module options */
    defaultLocale: 'az',
    locales: ['az']
  },
  build: {

  },
  env: {
    API_URL: process.env.API_URL
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  // Build Configuration: https://go.nuxtjs.dev/config-build
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // extra config e.g
    // BaseURL: 'https://link-to-API'
  }
}

