import Vue from 'vue'
import './plugins/vuetify'
import './plugins/global'
import App from './App.vue'
import router from './router'
import store from './store'
import './style/index.styl'

Vue.config.productionTip = false

new Vue({
  data: {
    screenWidth: 0
  },
  router,
  store,
  render: h => h(App),
  mounted () {
    this.screenWidth = document.body.clientWidth
    window.onresize = () => {
			this.screenWidth = document.body.clientWidth
		}
  },
  computed: {
    smallScreen () {
      return this.$root.screenWidth < 450
    }
  }
}).$mount('#app')
