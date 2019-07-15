import Vue from 'vue'

const contexts = require.context('_c', true, /\.vue$/)
contexts.keys().forEach(comp => {
  let component = contexts(comp).default
  Vue.component(comp.replace(/(.\/|.vue)/g, ''), component)
})