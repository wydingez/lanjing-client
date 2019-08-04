import Vue from 'vue'
import Vuetify, { VLayout, VIcon } from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/src/stylus/app.styl'
import '@mdi/font/css/materialdesignicons.css'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: { VLayout, VIcon },
  directives: { Ripple }
})
