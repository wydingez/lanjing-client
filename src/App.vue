<template>
  <v-app class="my-app" :class="{'my-app-phone': smallScreen}">
    <!-- Header -->
    <v-toolbar app class="my-app-toolbar" color="primary" dark :height="48" tabs>
      <v-toolbar-side-icon v-if="smallScreen" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-img src="static/logo.png" class="my-app-toolbar-logo" @click.native="linkHome"></v-img>
      <v-toolbar-title class="my-app-toolbar-title">{{projectTitle}}</v-toolbar-title>
      <v-tabs
        v-if="!smallScreen"
        v-model="tab"
        color="transparent"
        align-with-title
      >
        <v-tab v-for="item in items" :key="item.title">
          {{ item.title }}
        </v-tab>
      </v-tabs>
      <v-toolbar-items v-if="!smallScreen">
        <v-btn flat v-for="btn in toolBarBtns" :key="btn.url" :to="btn.url" color="white">{{btn.title}}</v-btn>
      </v-toolbar-items>
      <v-spacer v-if="smallScreen"></v-spacer>
      <v-btn icon v-if="smallScreen" @click="linkHome">
        <v-icon>home</v-icon>
      </v-btn>
    </v-toolbar>

    <!-- Container -->
    <v-content>
      <router-view></router-view>
    </v-content>

    <!-- Footer -->
    <v-footer
      dark
      :height="48"
      class="my-app-footer"
    >
      <v-card
        class="flex my-app-footer-card"
        flat
        tile
      >
        <v-card-actions class="grey darken-3 justify-center">
          &copy;2019 — <strong>{{projectTitle}}</strong>
          <v-tooltip top v-for="item in footerInfos" :key="item.text">
            <template v-slot:activator="{ on }">
              <v-btn
                class="mx-3"
                dark
                icon
                v-on="on"
              >
                <v-icon size="24px">{{ item.icon }}</v-icon>
              </v-btn>
            </template>
            <span class="title">{{item.text}}</span>
          </v-tooltip>
          
        </v-card-actions>
      </v-card>
    </v-footer>

    <!-- Mobile menu -->
    <v-navigation-drawer
      v-model="drawer"
      fixed
      dark
      temporary
    >
      <v-list class="pa-1">
        <v-list-tile avatar tag="div">
          <v-list-tile-avatar>
            <img src="static/logo.png">
          </v-list-tile-avatar>

          <v-list-tile-content>
            <v-list-tile-title>{{projectTitle}}</v-list-tile-title>
          </v-list-tile-content>

          <v-list-tile-action>
            <v-btn icon @click.stop="drawer = false">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-list-tile-action>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in items"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>

      <v-list class="pt-0" dense>
        <v-divider light></v-divider>

        <v-list-tile
          v-for="item in toolBarBtns"
          :key="item.title"
        >
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
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
        {title: '普通交易', icon: 'bookmark'},
        {title: '大宗交易', icon: 'bookmarks'},
        {title: 'OTC Desk', icon: 'business'},
        {title: '货币交易', icon: 'attach_money'},
        {title: '合约交易', icon: 'tab'}
      ],
      toolBarBtns: [
        {title: '登陆', url: '/login', 'icon': 'supervisor_account'}, 
        {title: '注册', url: '/register', 'icon': 'person_add'}, 
        {title: '委托', url: '/delegate', 'icon': 'card_travel'}, 
        {title: '订单', url: '/order', 'icon': 'description'}, 
        {title: '个人中心', url: '/personal', 'icon': 'account_circle'}
      ],
      footerLinks: [
        '首页',
        '关于我们',
        '联系我们'
      ],
      footerInfos: [
        {
          icon: 'cloud',
          text: '京ICP证030173号'
        }, {
          icon: 'phone',
          text: '13886398273'
        }
      ],
      drawer: null,
      right: null,
      projectTitle: 'lanjing',
    }
  },
  computed: {
    smallScreen () {
      return this.$root.smallScreen
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
    &-card .v-card__actions{
      padding-top: 6px;
      padding-bottom: 6px;
    }
  }
  &-phone {
    .my-app-toolbar-logo {
      flex: inherit;
    }
  }
}
</style>

