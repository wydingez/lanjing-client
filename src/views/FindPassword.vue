<template>
  <v-layout align-center justify-center pa-4>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>找回密码</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <blockquote class="blockquote">
            {{success ? '恭喜您，邮箱激活成功！' : '激活链接已经超时作废，请重新绑定邮箱！'}}
          </blockquote>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">确认设置</v-btn>
          <v-btn >取消</v-btn>
        </v-card-actions>
      </v-card>
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