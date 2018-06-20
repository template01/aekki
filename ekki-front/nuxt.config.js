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
    ],
    script: [{
        src: 'https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.1.1/socket.io.js'
      },
      {
        src: 'https://cdnjs.cloudflare.com/ajax/libs/slideout/1.0.1/slideout.min.js'
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
