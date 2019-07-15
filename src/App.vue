<template>
  <v-app class="my-app">
    <v-toolbar app class="my-app-toolbar" color="primary" dark :height="48" tabs>
      <v-img src="static/logo.png" class="my-app-toolbar-logo" @click.native="linkHome"></v-img>
      <v-toolbar-title class="my-app-toolbar-title">lanjing</v-toolbar-title>
      <v-tabs
        v-model="tab"
        color="transparent"
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
      class="my-app-footer"
      height="auto"
      color="primary lighten-1"
    >
      <v-layout
        row
        wrap
      >
        <v-flex
          v-for="item in footerInfos"
          :key="item.icon"
          primary
          lighten-1
          py-2
          px-2
          text-xs-left
          white--text
          xs12
          md2
        >
          <div class="content"><v-icon dark>{{item.icon}}</v-icon> - <strong>{{item.text}}</strong></div>
        </v-flex>
        <v-spacer></v-spacer>
        <v-btn
          v-for="link in footerLinks"
          :key="link"
          color="white"
          flat
          round
        >
          {{ link }}
        </v-btn>
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
        '首页',
        '关于我们',
        '联系我们'
      ],
      footerInfos: [
        {
          icon: 'copyright',
          text: '2019 lanjing'
        }, {
          icon: 'cloud',
          text: '京ICP证030173号'
        }, {
          icon: 'phone',
          text: '138*****6372'
        }
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
  &-footer {
    .content {
      line-height: 32px;
    }
  }
}
</style>

