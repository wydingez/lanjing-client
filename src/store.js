import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

import { doLogin, doLogout, doWxLogin } from '@/api/login'
import { Base64 } from 'js-base64'
import { setLogined, setLoginInfoKey, getLogined, getLoginInfoKey, removeLogined, removeLoginInfoKey, getAvatarUrl } from '@/utils/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logined: getLogined() || false,
    loginUserInfo: getLoginInfoKey() || {},
    avatarUrl: getAvatarUrl() || 'static/john.jpg',

  },
  getters: {
    loginUserName (state) {
      let info = state.loginUserInfo
      if (info) {
        if (typeof info === 'string') {
          return JSON.parse(info).loginName
        } else {
          return info.loginName
        }
      } else {
        return ''
      }
    }
  },
  mutations: {
    SET_LOGIN_STATE: (state, logined) => {
      state.logined = logined
    },
    SET_LOGIN_USER_INFO: (state, info) => {
      state.loginUserInfo = info
    }
  },
  actions: {
    // 登录操作
    doLogin({ commit }, userInfo) {
      const {username, password} = userInfo
      return new Promise((resolve, reject) => {
        doLogin({username: username.trim(), password: Base64.encode(password)}).then(response => {
          let logined = true
          commit('SET_LOGIN_STATE', logined)
          commit('SET_LOGIN_USER_INFO', response.data)

          setLogined(logined)
          setLoginInfoKey(response.data)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    doWxLogin({ commit }, code) {
      // 微信公众号授权登陆
      return new Promise((resolve, reject) => {
        doWxLogin(code).then(response => {
          let logined = true
          commit('SET_LOGIN_STATE', logined)
          commit('SET_LOGIN_USER_INFO', response.data)

          setLogined(logined)
          setLoginInfoKey(response.data)

          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    doLogout({ commit }) {
      return new Promise((resolve) => {
        doLogout().then(res => {
          if (res.success) {
            let logined = false
            commit('SET_LOGIN_STATE', logined)
            commit('SET_LOGIN_USER_INFO', {})

            removeLogined()
            removeLoginInfoKey()
            
            router.push('/')
            resolve()
          }
        })
      })
    },
    doRemoveUserLogined ({ commit }) {
      let logined = false
      commit('SET_LOGIN_STATE', logined)
      commit('SET_LOGIN_USER_INFO', {})

      removeLogined()
      removeLoginInfoKey()
      
      router.push('/')
    }
  }
})
