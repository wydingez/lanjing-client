import Vue from 'vue'
import Router from 'vue-router'

import Delegate from '_v/Delegate'
import Home from '_v/Home'
import Login from '_v/Login'
import Order from '_v/Order'
import Personal from '_v/Personal'
import Register from '_v/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
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
      path: '/personal',
      name: 'Personal',
      component: Personal
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
    }
  ]
})
