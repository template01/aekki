const env = require('./location.env');

module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'ekki-front',

    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      }, {
        rel: 'stylesheet',
        href: '/main.css'
      }, {
        rel: 'stylesheet',
        href: '/hamburgers.css'
      },
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css?family=Space+Mono'
      },
      // {
      //   rel: 'stylesheet',
      //   href: 'https://cdn.snipcart.com/themes/2.0/base/snipcart.min.css'
      // },
      {
        rel: 'stylesheet',
        href: 'http://localhost:3006/themes/base/snipcart.css'
      }
    ],
    script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'
      }
    ],

  },

  css: ['@/assets/main.scss'],

  /*
   ** Customize the progress bar color
   */
  loading: {
    color: 'black',
    duration: 5000,
    height: '100px'
  },
  // loading: false,
  // plugins: ['~/plugins/markdownparser'],
  env: {
      baseUrl: env.apiRoot,
    },

  router: {
    middleware: 'collapseMenu'
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** Run ESLint on save
     */
    // vendor: ['vue-simple-markdown'],
    extend(config, {
      isDev,
      isClient
    }) {

      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
