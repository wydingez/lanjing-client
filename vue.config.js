const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

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
    if (process.env.NODE_ENV === 'production') {
      if (process.env.npm_config_report === 'true') {
        // Add BundleAnalyzerPlugin
        config.plugins.push(new BundleAnalyzerPlugin())
      }
      config.plugins.push(
        new UglifyJsPlugin({
          uglifyOptions: {
            warnings: false,
            compress: {
              drop_debugger: true,
              drop_console: true
            }
          },
          sourceMap: false,
          parallel: true
        })
      )
    }
  }
}