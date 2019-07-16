const path = require('path')

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
  }
}