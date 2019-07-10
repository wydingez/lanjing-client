<template>
  <v-layout align-center justify-center pa-4 class="register-page">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>注册账号</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-tabs
            v-model="form.registerType"
            color="transparent"
            slider-color="primary"
            class="register-page-tabs"
          >
            <v-tab
              v-for="(type, index) in registerTypes"
              :key="index"
              ripple
            >
              {{type.label}}
            </v-tab>
          </v-tabs>
          <v-form>
            <v-text-field prepend-icon="person" name="login" label="账号" type="text"></v-text-field>
            <v-text-field prepend-icon="lock" name="password" label="密码" id="password" type="password"></v-text-field>
            <p class="text-lg-right">忘记密码？</p>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'Register',
    data () {
      return {
        form: {
          registerType: 0
        },
        registerTypes: [
          {
            label: '手机注册',
            type: 'phone'
          }, {
            label: '邮箱注册',
            type: 'email'
          }
        ]
      }
    }
  }
</script>

<style lang="stylus">
.register-page {
  &-tabs {
    .v-tabs__container {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
