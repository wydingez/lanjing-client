const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 9000
  },
  transpileDependencies:[
    /node_modules[/\\\\]vuetify[/\\\\]/,
    'vue-echarts',
    'resize-detector'
  ],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('_c', resolve('src/components'))
      .set('_v', resolve('src/views'))
      .set('static', resolve('public/static'))
      .set('_d', resolve('src/data'))
  },
  configureWebpack: config => {
    config.plugins = config.plugins || []
    if (process.env.NODE_ENV === 'production' && process.env.npm_config_report === 'true') {
      // Add BundleAnalyzerPlugin
      config.plugins.push(new BundleAnalyzerPlugin())
    }
  }
}