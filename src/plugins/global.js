import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'
import notice from '_c/notice'

// 粘贴组件
VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

// 注册全局vue组件
const contexts = require.context('_c', true, /\.vue$/)
contexts.keys().forEach(comp => {
  let component = contexts(comp).default
  Vue.component(comp.replace(/(.\/|.vue)/g, ''), component)
})

Vue.prototype.$vNotice = notice