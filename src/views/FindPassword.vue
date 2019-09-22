<template>
  <v-layout align-center justify-center pa-4 class="find-password">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>找回密码</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <div>想要找回的密码种类：</div>
            <v-radio-group v-model="form.type" :column="false" class="find-type" @change="changeType">
              <v-radio
                v-for="n in typeList"
                :key="n.value"
                :label="n.label"
                :value="n.value"
              ></v-radio>
            </v-radio-group>

            <template v-if="form.type">
              <div class="valid-code">
                <v-text-field
                  class="input-wrapper"
                  v-model="form.validCode"
                  label="安全校验码"
                  required
                  type="number"
                  :rules="rules.validCodeRule"
                ></v-text-field>
                <v-btn color="primary" @click="getValidCode" :disabled="count > 0" :loading="validCodeLoading">
                  {{count > 0 ? `${count}秒后重新获取` : '立即获取'}}
                </v-btn>
              </div>              

              <v-text-field
                v-model="form.newPassword"
                :label="newPassLabel"
                required
                :rules="rules.newPassRule"
                type="password"
              ></v-text-field>

              <v-text-field
                v-model="form.confirmPassword"
                :label="confirmPassLabel"
                required
                :rules="rules.confirmPassRule"
                type="password"
              ></v-text-field>

              <blockquote class="blockquote">
                操作提示：
                <br>
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输⼊⾄少含有<span class="red--text font-weight-bold">⼀个⼤写和⼩写字母以及阿拉伯数字的6位及以上字符</span>的密码组合。
              </blockquote>
            </template>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="doConfirm" :loading="confirmLoading">确认设置</v-btn>
          <v-btn @click="$router.push('/')">取消</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {getLoginPassValidCode, getPayPassValidCode, doResetPayPwdByEmail} from '@/api/account'
  import {doResetLoginPwdByEmail} from '@/api/user'
  import {REGEX} from '@/utils/util'
  import { Base64 } from 'js-base64'

  export default {
    name: 'FindPassword',

    data () {
      return {
        form: {
          type: '',
          validCode: '',
          newPassword: '',
          confirmPassword: ''
        },
        typeList: [
          {
            value: 'login',
            label: '登录密码'
          }, {
            value: 'security',
            label: 'JG安全密码'
          }
        ],
        count: 0,
        confirmLoading: false,
        validCodeLoading: false
      }
    },

    methods: {
      changeType () {
        this.$refs.form.resetValidation()
        this.validCode = ''
        this.newPassword = ''
        this.confirmPassword = ''
      },
      async getValidCode () {
        let res = null
        this.validCodeLoading = true
        try {
          if (this.form.type === 'login') {
            res = await getLoginPassValidCode()
          } else {
            res = await getPayPassValidCode()
          }
          if (res.success) {
            this.validCodeLoading = false
            this.$vNotice.success({
              text: '安全校验码发送成功，请登录邮箱注意查收'
            })

            this.count = 60
            this.interval = setInterval(() => {
              if (this.count === 0) {
                clearInterval(this.interval)
              }
              this.count--
            }, 1000)
          }
        } catch (e) {
          this.validCodeLoading = false
        }
      },
      async doConfirm () {
        let valid = this.$refs.form.validate()
        if (!this.form.type) {
          this.$vNotice.error({
            text: '找回密码种类不能为空'
          })
          return
        }
        if (!valid) {
          // 表单校验失败
          this.$vNotice.error({
            text: '表单校验失败'
          })
          return
        }
        this.confirmLoading = true
        let res = null
        let params = {
          code: Number(this.form.validCode),
          newPassword: Base64.encode(this.form.newPassword)
        }
        try {
          if (this.form.type === 'login') {
            res = await doResetLoginPwdByEmail(params)
          } else {
            res = await doResetPayPwdByEmail(params)
          }
          if (res.success) {
            this.$vNotice.success({
              text: '设置密码成功'
            })
            this.confirmLoading = false
            this.$router.push('/')
          }
        } catch (e) {
          this.confirmLoading = false
        }
      }
    },

    computed: {
      newPassLabel () {
        return this.form.type === 'login' ? '请输入新的登录密码' : '请输入新的JG安全密码'
      },
      confirmPassLabel () {
        return this.form.type === 'login' ? '请再次输入新的登录密码' : '请再次输入新的JG安全密码'
      },
      rules () {
        let type = this.form.type === 'login' ? '登录密码' : 'JG安全密码'
        return {
          validCodeRule: [
            v => !!v || '验证码不能为空'
          ],
          newPassRule: [
            v => !!v || `${type}不能为空`,
            v => REGEX.password.test(v) || `${type}格式不正确`
          ],
          confirmPassRule: [
            v => !!v || `确认${type}不能为空`,
            v => v === this.form.newPassword || '两次密码不一致'
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
.find-password {
  .find-type {
    margin-top: 4px;
    .v-input__control {
      width: 100%;
      .v-radio {
        width: 50%;
        justify-content: center;
      }
    }
  }
  .valid-code {
    .input-wrapper {
      width: calc(100% - 150px); 
      display: inline-block;
    }
    .v-btn {
      float:right;
    }
  }
}
</style>