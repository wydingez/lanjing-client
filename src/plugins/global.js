import Vue from 'vue'
import VueClipboard from 'vue-clipboard2'

VueClipboard.config.autoSetContainer = true // add this line
Vue.use(VueClipboard)

const contexts = require.context('_c', true, /\.vue$/)
contexts.keys().forEach(comp => {
  let component = contexts(comp).default
  Vue.component(comp.replace(/(.\/|.vue)/g, ''), component)
})