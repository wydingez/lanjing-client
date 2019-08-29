<template>
  <v-app class="my-app" :class="{'my-app-phone': smallScreen}">
    <!-- Header -->
    <v-toolbar app class="my-app-toolbar" color="primary" dark :height="48" tabs>
      <v-toolbar-side-icon v-if="smallScreen" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-img src="static/logo.png" class="my-app-toolbar-logo" @click.native="linkHome" v-if="!smallScreen"></v-img>
      <v-toolbar-title class="my-app-toolbar-title">{{projectTitle}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items v-if="!smallScreen">
        <v-btn flat v-for="btn in toolBarBtns.filter(item => item.visible)" :key="btn.url" :to="btn.url" color="white">{{btn.title}}</v-btn>

        <v-menu offset-y v-if="logined" class="personal-menu">
          <template v-slot:activator="{ on }">
            <v-btn
              color="whte"
              flat
              v-on="on"
            >
              <v-avatar>
                <img
                  src="static/john.jpg"
                  :alt="loginUserName"
                >
              </v-avatar>
              &nbsp;{{loginUserName}}
              <v-icon dark>mdi-menu-down</v-icon>
            </v-btn>
          </template>
          <v-list class="personal-menu-list">
            <v-list-tile @click="doLogout" class="personal-menu-list-item">
              <v-list-tile-title>登出<v-icon class="personal-menu-list-item-icon">mdi-logout</v-icon></v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
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
      height="auto"
      class="my-app-footer"
    >
      <v-layout row wrap>
        <v-flex xs12>
          <div class="text-xs-center pa-3">
            <span class="headline">蓝晶（积分）赠送平台</span>——<span class="body-2">坚果网络出品</span>
          </div>
        </v-flex>
        <v-flex sm3 xs12 pa-3 class="row2 row2-1">
          <v-layout row wrap class="row2-block">
            <v-flex xs12>
              帮助信息
            </v-flex>
            <v-flex xs6>
              网站地图
            </v-flex>
            <v-flex xs6>
              法律声明
            </v-flex>
            <v-flex xs6>
              常见问题
            </v-flex>
            <v-flex xs6>
              要提意见
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm6 xs8 pa-3 class="row2 row2-2">
          <v-layout row wrap class="row2-block">
            <v-flex xs12>
              联系方式
            </v-flex>
            <v-flex sm6 xs12>
              QQ群：12345678
            </v-flex>
            <v-flex sm6 xs12>
              邮箱：admin@utyue.com
            </v-flex>
            <v-flex sm6 xs12>
              客服电话：13813813814
            </v-flex>
            <v-flex sm6 xs12>
              工作时间：9:00-22:00
            </v-flex>
          </v-layout>
        </v-flex>
        <v-flex sm3 xs4 pa-3 class="row2 row2-3">
          <div class="row2-subscription">
            <span class="row2-subscription-title">微信公众号</span>
            <img src="static/subscription.bmp" :height="80" :width="80" class="row2-subscription-img"/>
          </div>
        </v-flex>
        <v-flex xs12>
          <div class="text-xs-center pa-3 body-1">
            Copyright 2019 All right reserved 版权所有：嘉兴市坚果网络科技有限公司 浙ICP备16034800号-4
          </div>
        </v-flex>
      </v-layout>
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
          v-for="item in toolBarBtns.filter(item => item.visible)"
          :key="item.title"
          :to="item.url"
          @click="item.action && item.action()"
        >
          <template v-if="item.icon">
            <v-list-tile-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title>{{ item.title }}</v-list-tile-title>
            </v-list-tile-content>
          </template>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>

    <!-- Back button -->
   <v-fab-transition>
    <v-btn
      v-show="$root.scrollTop > 100"
      color="red"
      dark
      fixed
      bottom
      right
      fab
      @click="scrollTop"
    >
      <v-icon>keyboard_arrow_up</v-icon>
    </v-btn>
  </v-fab-transition>
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
import { mapGetters } from 'vuex'

export default {
  name: 'portal',
  data () {
    return {
      tab: null,
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
      projectTitle: '蓝晶（积分）赠送平台',
      hidden: false
    }
  },
  computed: {
    ...mapState([
      'logined'
    ]),
    ...mapGetters([
      'loginUserName'
    ]),
    smallScreen () {
      return this.$root.smallScreen
    },
    toolBarBtns () {
      let { logined } = this
      return [
        {title: '首页', url: '/', icon: 'home', visible: true},
        {title: '登陆', url: '/login', icon: 'supervisor_account', visible: !logined}, 
        {title: '注册', url: '/register', icon: 'person_add', visible: false}, 
        {title: '发布', url: '/delegate', icon: 'card_travel', visible: logined}, 
        {title: '订单', url: '/order', icon: 'description', visible: logined}, 
        {title: '个人中心', url: '/personal', icon: 'account_circle', visible: logined},
        {title: '退出', action: this.doLogout, icon: 'mdi-logout', visible: logined && this.$root.smallScreen}
      ]
    }
  },
  methods: {
    linkHome () {
      this.$router.push('/')
    },
    scrollTop () {
      this.$vuetify.goTo(0, 0)
    },
    doLogout () {
      // 登出
      this.$vModal.confirm({
        title: '登出',
        content: '确认登出吗？',
        onOk: (next) => {
          this.$store.dispatch('doLogout').then(() => {
            next()
          })
        }
      })
    }
  }
}
</script>

<style lang="stylus">
$echarts-height = 300px

.my-app {
  .my-app-toolbar-logo {
    flex: inherit;
  }
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
    .row2 {
      text-align: center;
      &-block {
        border-right: 1px solid #eee;
        height: 100%;
      }
      &-subscription {
        &-title {
          writing-mode: tb-rl;
          padding: 0 10px;
        }
        &-img {
          display: inline-block;
        }
      }
    }
  }
  .personal-menu-list{
    &-item {
      &-icon {
        float: right;
      }
    }
  }
  .container.grid-list-lg .layout .flex {
    padding: 4px 2px;
  }
  &-phone {
    .my-app-toolbar-logo {
      flex: inherit;
    }
    .container.grid-list-lg .layout .flex {
      padding: 2px
    }
    .my-app-toolbar {
      .v-toolbar__title {
        width: 100%;
        text-align: center;
        margin-left: 0;
      }
    }
    .v-toolbar__title {
      font-size: 16px;
    }
    .home-echarts-container {
      height: $echarts-height;
      &-content {
        height: $echarts-height;
      }
    }
    .row2 {
      &.row2-1 {
        padding-top: 8px !important;
        padding-bottom: 8px !important;
        .row2-block {
          border: none;
        }
      }
      &.row2-2 {
        text-align: left;
      }
    }
    .row2-subscription-title {
      writing-mode: inherit;
      padding: 5px 0;
    }
    .row2-subscription-img {
      margin-top: 10px;
    }
  }
}
</style>

