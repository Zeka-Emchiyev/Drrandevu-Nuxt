export default {
  ssr: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'Drrandevu',
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
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css?family=Montserrat&display=swap"'}

    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'bootstrap-icons/font/bootstrap-icons.css',
    'assets/styles.scss',
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    {
      src: '~/plugins/bootstrap.js',
      mode: 'client'
    },
    '~/plugins/axios',
    '~/plugins/pagination.js',

    { src: '~/plugins/vue-carousel.js', mode: 'client' }

  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    'vue-ssr-carousel/nuxt',
    '@nuxtjs/moment',
    '@nuxtjs/google-fonts',
    ],
  moment: {
    /* module options */
    defaultLocale: 'az',
    locales: ['az']
  },
  build: {

  },
  env: {
    API_URL: process.env.API_URL || 'https://admin.drrandevu.az'
  },
  publicRuntimeConfig: {
    apiUrl: process.env.API_URL || 'https://admin.drrandevu.az'
  },
  // Modules: https://go.nuxtjs.dev/config-modules
  // Build Configuration: https://go.nuxtjs.dev/config-build
  modules: [
    '@nuxtjs/axios',
    '@nuxt/http',
  ],

  axios: {
    API_URL: process.env.API_URL
    // extra config e.g
    // BaseURL: 'https://link-to-API'
  }
}

