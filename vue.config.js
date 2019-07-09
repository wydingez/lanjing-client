const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  transpileDependencies:[/node_modules[/\\\\]vuetify[/\\\\]/],
  chainWebpack: (config) => {
    config.resolve.alias
      .set('@', resolve('src/components'))
      .set('static', resolve('public/static'))
  }
}