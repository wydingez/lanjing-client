<template>
  <v-layout align-center justify-center pa-4>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>邮箱激活提示</v-toolbar-title>
        </v-toolbar>
      </v-card>
      <v-card-text>
        <blockquote class="blockquote">
          {{success ? '恭喜您，邮箱激活成功！' : '激活链接已经超时作废，请重新绑定邮箱！'}}
        </blockquote>
      </v-card-text>
      <v-card-actions v-if="loginType === 'mobile'">
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="doLogin" :loading="loginLoading">登录</v-btn>
      </v-card-actions>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'FindPassword',

    props: {
      state: {
        type: String,
        default: 'success',
        validator: (val) => {
          return ['success', 'error'].includes(val);
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>