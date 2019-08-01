const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const CompressionWebpackPlugin = require("compression-webpack-plugin");

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  devServer: {
    port: 9000,
    open: true,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://ceshi.utyue.com:8080/bucrystal/cloud',
        changeOrigin: true, // needed for virtual hosted sites
        ws: true, // proxy websockets
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    }
  },
  // 生产环境打包目录放在子目录下，github打包时自动回加上这一层目录
  publicPath: process.env.NODE_ENV === 'production' ? '/lanjing-client' : '',
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
    let plugins = []
    if (process.env.NODE_ENV === 'production') {
      plugins = [
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
        }),
        new CompressionWebpackPlugin({
          filename: "[path].gz[query]",
          algorithm: "gzip",
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8
        })
      ]
      if (process.env.npm_config_report === 'true') {
        // Add BundleAnalyzerPlugin
        plugins.push(new BundleAnalyzerPlugin())
      }
    }
    config.plugins = [...config.plugins, ...plugins]
  }
}