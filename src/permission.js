import router from './router'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css' // progress bar style
import { getLogined } from '@/utils/auth'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['/login', '/register', '/']

router.beforeEach((to, from, next) => {
  // start progress bar
  NProgress.start()

  // determine whether the user has logged in
  const logined = getLogined()

  if (logined) {
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
    } else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) {
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