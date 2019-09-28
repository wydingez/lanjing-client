import Vue from 'vue'
import Router from 'vue-router'
import goTo from 'vuetify/lib/components/Vuetify/goTo'

import Delegate from '_v/Delegate'
import Home from '_v/Home'
import Login from '_v/Login'
import Order from '_v/Order'
import Personal from '_v/Personal'
import Register from '_v/Register'
import FindPassword from '_v/FindPassword'
import BindEmail from '_v/BindEmail'
import Err_404 from '_v/Page_404'
import ActivateEmail from '_v/ActivateEmail'
import HelpInfo from '_v/HelpInfo'
import WebMap from '_v/WebMap'

import PersonalIdcard from '_v/portal/PersonalIdcard'
import PersonalAccountInfo from '_v/portal/PersonalAccountInfo'

Vue.use(Router)

export default new Router({
  mode: process.env.NODE_ENV === 'development' ? 'hash' : 'history',
  base: process.env.BASE_URL,
  scrollBehavior: (to, from, savedPosition) => {
    let scrollTo = 0

    if (to.hash) {
      scrollTo = to.hash
    } else if (savedPosition) {
      scrollTo = savedPosition.y
    }

    return goTo(scrollTo)
  },
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
    },
    {
      path: '/bind-email/:state',
      name: 'BindEmail',
      component: BindEmail
    },
    {
      path: '/find-password',
      name: 'FindPassword',
      component: FindPassword
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal,
      children: [
        {
          path: 'idcard-info',
          name: 'idcard-info',
          component: PersonalIdcard
        },
        {
          path: 'account-info',
          name: 'account-info',
          component: PersonalAccountInfo
        }
      ]
    },
    {
      path: '/delegate',
      name: 'Delegate',
      component: Delegate
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/active-email',
      name: 'ActivateEmail',
      component: ActivateEmail
    },
    {
      path: '/help-info/:key',
      name: 'HelpInfo',
      component: HelpInfo
    },
    {
      path: '/web-map',
      name: 'WebMap',
      component: WebMap
    },
    {
      path: '*',
      name: 'Err_404',
      component: Err_404
    }
  ]
})
