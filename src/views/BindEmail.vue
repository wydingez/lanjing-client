<template>
  <v-layout align-center justify-center pa-4>
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>邮箱激活提示</v-toolbar-title>
        </v-toolbar>
        <v-card-text>
          <blockquote class="blockquote text-xs-center">
            {{$route.params.state === 'success' ? '恭喜您，邮箱激活成功！' : '激活链接已经超时作废，请重新绑定邮箱！'}}
          </blockquote>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="doConfirm">确认</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'bind-email',

    methods: {
      doConfirm () {
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>