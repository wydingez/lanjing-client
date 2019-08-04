import Vue from 'vue'
import {VDialog, VBtn, VCard, VCardTitle, VCardText, VCardActions, VSpacer} from 'vuetify/lib'

let dialogInstance

VDialog.newInstance = properties => {
  const _props = properties || {}

  const Instance = new Vue({
    components: {VDialog, VBtn, VCard, VCardTitle, VCardText, VCardActions, VSpacer},
    data () {
      return {
        visible: false
      }
    },
    render (h) {
      const { visible, doOk, doCancel } = this
      const { title, content } = properties
      return (
        <v-dialog
          value={visible}
          max-width="400"
        >
          <v-card>
            <v-card-title class="headline"> {title}</v-card-title>

            <v-card-text>
              {content}
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn
                flat="flat"
                vOn:click={doCancel}
              >
                取消
              </v-btn>

              <v-btn
                color="primary darken-1"
                flat="flat"
                vOn:click={doOk}
              >
                确认
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      )
    },
    methods: {
      doOk () {
        let { onOk } = properties
        return new Promise((resolve, reject) => {
          if (onOk && typeof onOk === 'function') {
            onOk((flag) => {
              if (flag !== false) {
                resolve()
              } else {
                reject(new Error('Modal not allowded close'))
              }
            })
          } else {
            resolve()
          }
        }).then(() => {
          this.visible = false
        })
      },
      doCancel () {
        let { onCancel } = properties
        if (onCancel && typeof onCancel === 'function') {
          onCancel()
        }
        this.visible = false
      }
    }
  })

  const component = Instance.$mount()
  document.body.append(component.$el)
  
  return Instance
}

function getModalInstance (props) {
  dialogInstance = VDialog.newInstance(props)
  return dialogInstance
}

function modal (options) {
  let instance = getModalInstance(options)
  instance.visible = true
  return instance
}

export default {
  confirm (options = {}) {
    return modal(options)
  }
}
