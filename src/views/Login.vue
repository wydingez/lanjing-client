<template>
  <v-layout align-center justify-center pa-4 class="login-page">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>欢迎登陆</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="loginType = ''" v-if="loginType === 'mobile'">
            <v-icon>arrow_back</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text>
          <ul class="login-type" v-if="!loginType">
            <li>
              <v-btn color="primary" large block dark @click="doWxLogin">
                <v-icon dark left>mdi-wechat</v-icon>新用户微信登录
              </v-btn>
            </li>
            <li>
              <v-btn color="primary" large block dark @click="doMobileLogin">
                <v-icon dark left>mdi-cellphone</v-icon>手机号登录
              </v-btn>
            </li>
          </ul>
          <v-form ref="form" v-model="valid" lazy-validation v-if="loginType === 'mobile'">
            <v-text-field prepend-icon="person" v-model="form.username" label="账号" type="text" :rules="rules.username" required></v-text-field>
            <v-text-field prepend-icon="lock" v-model="form.password" label="密码" type="password" :rules="rules.password" required></v-text-field>
            <p class="text-lg-right primary--text forget-pass">忘记密码？</p>
          </v-form>
        </v-card-text>
        <v-card-actions v-if="loginType === 'mobile'">
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="doLogin" :loading="loginLoading">登陆</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import {doWxAuth} from '@/api/login'
  export default {
    name: 'Login',
    data () {
      return {
        valid: true,
        loginLoading: false,
        loginType: null,
        form: {
          username: 'weishi',
          password: 'Jesse123456'
        },
        rules: {
          username: [
            v => !!v || '账号不能为空！'
          ],
          password: [
            v => !!v || '密码不能为空!'
          ]
        }
      }
    },
    methods: {
      doLogin () {
        if (this.$refs.form.validate()) {
          this.loginLoading = true
          this.$store.dispatch('doLogin', this.form)
            .then(() => {
              this.loginLoading = false
              this.$router.push('/')
            })
            .catch(e => {
              this.loginLoading = false
              console.log(e)
            })
        } else {
          this.$vNotice.error({
            text: '表单校验失败'
          })
        }
      },
      doWxLogin () {
        doWxAuth()
      },
      doMobileLogin () {
        this.loginType = 'mobile'
      }
    }
  }
</script>

<style lang="stylus">
.login-page {
  .forget-pass {
    cursor: pointer;
  }
  .login-type {
    li {
      text-align: center;
    }
  }
}
</style>
