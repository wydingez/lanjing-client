<template>
  <v-app class="my-app">
    <v-toolbar app class="my-app-toolbar" color="primary" dark>
      <v-img src="static/logo.png" class="my-app-toolbar-logo" @click.native="linkHome"></v-img>
      <v-toolbar-title class="my-app-toolbar-title">lanjing</v-toolbar-title>
      <v-tabs
        v-model="tab"
        color="transparent"
        :height="64"
        align-with-title
      >
        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
      <v-toolbar-items>
        <v-btn flat v-for="btn in toolBarBtns" :key="btn.url" :to="btn.url" color="white">{{btn.name}}</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <v-footer
      height="auto"
      color="primary lighten-1"
    >
      <v-layout
        justify-center
        row
        wrap
      >
        <v-btn
          v-for="link in footerLinks"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
        <v-flex
          primary
          lighten-2
          py-3
          text-xs-center
          white--text
          xs12
        >
          &copy;2018 — <strong>Vuetify</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'portal',
  data () {
    return {
      tab: null,
      items: [
        '普通交易', '大宗交易', 'OTC Desk', '货币交易', '合约交易'
      ],
      toolBarBtns: [
        {
          name: '登陆',
          url: '/login'
        }, {
          name: '注册',
          url: '/register'
        }, {
          name: '委托',
          url: '/delegate'
        }, {
          name: '订单',
          url: '/order'
        }, {
          name: '个人中心',
          url: '/personal'
        }
      ],
      footerLinks: [
        'Home',
        'About Us',
        'Team',
        'Services',
        'Blog',
        'Contact Us'
      ]
    }
  },
  methods: {
    linkHome () {
      this.$router.push('/')
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
      cursor: pointer;
    }
    &-title {
      overflow: inherit;
    }
  }
}
</style>

