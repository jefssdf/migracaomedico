/* eslint-env node */

const { configure } = require('quasar/wrappers')

module.exports = configure(function (/* ctx */) {
  return {
    boot: [
      'axios'
    ],

    css: [
      'app.css'
    ],

    extras: [
      'roboto-font',
      'material-icons'
    ],

    build: {
      target: {
        browser: ['es2019', 'edge88', 'firefox78', 'chrome87', 'safari13.1'],
        node: 'node20',
        transpile: true,
        transpileDependencies: [
          /quasar-ui-qcalendar[\\/]src/]
      },

      vueRouterMode: 'history',

      vitePlugins: [
        ['vite-plugin-checker', {
          eslint: {
            lintCommand: 'eslint "./**/*.{js,mjs,cjs,vue}"'
          }
        }, { server: false }]
      ]
    },

    devServer: {
      port: 8080,
      open: true
    },

    framework: {
      config: {},

      plugins: [
        'Notify',
        'Loading'
      ]
    },

    animations: 'all',

    ssr: {
      pwa: false,

      prodPort: 3000,

      middlewares: [
        'render'
      ]
    },

    pwa: {
      workboxMode: 'generateSW',
      injectPwaMetaTags: true,
      swFilename: 'sw.js',
      manifestFilename: 'manifest.json',
      useCredentialsForManifestTag: false
    },

    capacitor: {
      hideSplashscreen: true
    },

    electron: {
      inspectPort: 5858,
      bundler: 'packager',

      packager: {
      },

      builder: {
        appId: 'quasar-c'
      }
    },

    bex: {
      contentScripts: [
        'my-content-script'
      ]
    }
  }
})
