import Vue from 'vue'
import {VSnackbar, VBtn} from 'vuetify/lib'

let snackbarInstance
let TIME_OUT = 3000

VSnackbar.newInstance = properties => {
  const _props = properties || {}

  const Instance = new Vue({
    data () {
      return {
        visible: false
      }
    },
    render (h) {
      return h(VSnackbar, {
        props: Object.assign({}, _props, {
          top: true,
          right: true,
          value: this.visible
        })
      }, [
        _props.text,
        h(VBtn, {
          props: {
            dark: true,
            flat: true
          },
          on: {
            click: () => {
              Instance.visible = false
            }
          }
        }, 'CLOSE')
      ])
    }
  })
  const component = Instance.$mount()
  document.body.appendChild(component.$el)
  return Instance
}

function getSnackbarInstance (props) {
  snackbarInstance = (snackbarInstance && snackbarInstance.$children[0].isActive) ? snackbarInstance : VSnackbar.newInstance(props)
  return snackbarInstance
}

function notice (type, options) {
  let instance = getSnackbarInstance(Object.assign({}, options, {
    color: type,
    timeout: TIME_OUT
  }))
  instance.visible = true
  return instance
}

export default {
  info (options) {
    return notice('info', options)
  },
  success (options) {
    return notice('success', options)
  },
  error (options) {
    return notice('error', options)
  },
  warning (options) {
    return notice('warning', options)
  }
}