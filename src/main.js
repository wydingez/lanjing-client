import Vue from 'vue'
import './plugins/vuetify'
import './plugins/global'
import App from './App.vue'
import router from './router'
import store from './store'
import './permission'
import vConsole from 'vconsole'

import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'
import './style/index.styl'

import throttle from 'lodash/throttle'
import debounce from 'lodash/debounce'

Vue.config.productionTip = false

if (process.env.NODE_ENV === 'development') {
  new vConsole()
}

new Vue({
  data: {
    screenWidth: 0,
    scrollTop: 0
  },
  router,
  store,
  render: h => h(App),
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.onresize = debounce(() => {
      // 使用防抖函数防止出发多次
			this.screenWidth = document.body.clientWidth
    }, 400)
    window.onscroll = throttle(() => {
      // 使用节流函数防止出发多次
      this.scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    }, 400)
  },
  computed: {
    smallScreen () {
      return this.$root.screenWidth < 450
    }
  }
}).$mount('#app')
