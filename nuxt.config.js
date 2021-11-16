export default {
  /*
  ** Headers of the page
  */
  head: {
    title: 'vue-cli',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** Run ESLint on save
    */
    extend (config, { isDev, isClient }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  plugins: [
    {src:'~/plugins/utils.js'}
  ],
  components: true,

  //mode: 'spa',
  /*
  plugins: [
    {src:'~/plugins/utils.js'}
  ],
  components: true,
  */
  target: 'static',
  router: {
    base: '/vue-cli/'
  },
  /*
  generate: {
    dir: 'docs'
  }, 
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    'bootstrap-vue/nuxt',
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api1/': 'https://electronic-handicraft.work/shop',
    '/api/': {
        target: 'https://electronic-handicraft.work',
        pathRewrite: {
            '^/api/': '/'
        }
    }
  }
}