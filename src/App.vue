<template>
  <v-app class="my-app">
    <v-toolbar app class="my-app-toolbar">
      <v-img src="static/logo.png" class="my-app-toolbar-logo"></v-img>
      <v-toolbar-title class="my-app-toolbar-title">lanjing</v-toolbar-title>
      <app-menu />
      <v-toolbar-items>
        <v-btn flat>委托</v-btn>
        <v-btn flat>订单</v-btn>
        <v-btn flat>个人中心</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import appMenu from '@/menu'

export default {
  name: 'App',
  components: {
    appMenu
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="stylus">
.my-app {
  &-toolbar {
    &-logo {
      width: 38px;
      height: 38px;
    }
    &-title {
      overflow: inherit
    }
  }
}
</style>

