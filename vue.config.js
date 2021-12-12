/* eslint-disable */
const Components = require('unplugin-vue-components/webpack');
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers');
const isDevelopment = process.env.VUE_APP_ENV === 'development'

module.exports = {
  publicPath: isDevelopment ? '/' : './',
  assetsDir: 'static',
  productionSourceMap: false,
  configureWebpack: {
    plugins: [
      Components({
        resolvers: [ElementPlusResolver()],
      }),
    ],
  },
};
