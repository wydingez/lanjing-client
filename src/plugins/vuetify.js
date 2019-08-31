import Vue from 'vue'
import Vuetify, { VLayout, VIcon } from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'

Vue.use(Vuetify, {
  iconfont: 'mdi',
  components: { VLayout, VIcon },
  directives: { Ripple }
})
