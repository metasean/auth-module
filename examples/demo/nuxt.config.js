const { resolve } = require('path')
require('dotenv').config()

module.exports = {
  mode: 'spa',
  rootDir: resolve(__dirname, '../..'),
  buildDir: resolve(__dirname, '.nuxt'),
  srcDir: __dirname,
  build: {
    extractCSS: true
  },
  serverMiddleware: ['../api/auth'],
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@@',
    ['@nuxtjs/dotenv', {}]
  ],
  axios: {
    proxy: true
  },
  proxy: {
    '/api': 'http://localhost:3000'
  },
  auth: {
    redirect: {
      callback: '/callback'
    },
    strategies: {
      local: {
        endpoints: {
          login: { propertyName: 'token.accessToken' }
        }
      },
      auth0: {
        domain: 'nuxt-auth.auth0.com',
        client_id: 'q8lDHfBLJ-Fsziu7bf351OcYQAIe3UJv'
      },
      facebook: {
        client_id: '1671464192946675',
        userinfo_endpoint: 'https://graph.facebook.com/v2.12/me?fields=about,name,picture{url},email,birthday',
        scope: ['public_profile', 'email', 'user_birthday']
      },
      google: {
        client_id:
          '956748748298-kr2t08kdbjq3ke18m3vkl6k843mra1cg.apps.googleusercontent.com'
      },
      github: {
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET
      },
      twitter: {
        client_id: 'FAJNuxjMTicff6ciDKLiZ4t0D'
      },
      okta: {
        domain: process.env.OKTA_DOMAIN,
        client_id: process.env.OKTA_CLIENT_ID,
        scope: process.env.OKTA_SCOPE, // optional
        redirect_uri: process.env.OKTA_REDIRECT_URI, // optional
        response_type: process.env.OKTA_RESPONSE_TYPE // ideally optional
      }
    }
  }
}
