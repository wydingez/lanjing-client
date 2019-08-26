import Vue from 'vue'
import {VDialog, VBtn, VCard, VCardTitle, VCardText, VCardActions, VSpacer} from 'vuetify/lib'

let dialogInstance

VDialog.newInstance = properties => {
  const Instance = new Vue({
    components: {VDialog, VBtn, VCard, VCardTitle, VCardText, VCardActions, VSpacer},
    data () {
      return {
        visible: false,
        okLoading: false
      }
    },
    render () {
      const { visible, doOk, doCancel, okLoading } = this
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
                onClick={doCancel}
              >
                取消
              </v-btn>

              <v-btn
                loading={okLoading}
                color="primary darken-1"
                flat="flat"
                onClick={doOk}
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
        this.okLoading = true
        return new Promise((resolve, reject) => {
          if (onOk && typeof onOk === 'function') {
            onOk(resolve)
            // onOk((flag) => {
            //   console.log(12, flag)
            //   if (flag !== false) {
            //     this.okLoading = false
            //     resolve()
            //   } else {
            //     this.okLoading = false
            //     reject(new Error('Modal not allowded close'))
            //   }
            // })
          } else {
            resolve()
            this.okLoading = false
          }
        }).then(() => {
          this.visible = false
        }).catch(() => {
          this.okLoading = false
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
