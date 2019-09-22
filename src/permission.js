import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getLogined } from '@/utils/auth'

NProgress.configure() // NProgress Configuration

// 白名单地址，即不需要登录也能访问的地址
const whiteList = [
  'Login',
  'Register',
  'Home',
  'FindPassword',
  'ActivateEmail',
  'HelpInfo',
  'Err_404',
  'BindEmail'
]

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const logined = getLogined()

  if (logined) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next(`/login`)
    }
  }
})

router.afterEach(() => {
  // finish progress bar
  NProgress.done()
})