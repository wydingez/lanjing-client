import Vue from 'vue'
import Vuetify, { VLayout, VIcon } from 'vuetify/lib'
import { Ripple } from 'vuetify/lib/directives'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  iconfont: 'md',
  components: { VLayout, VIcon },
  directives: { Ripple }
})
