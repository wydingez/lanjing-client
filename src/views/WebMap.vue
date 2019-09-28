<template>
  <v-layout align-center justify-center pa-4 class="web-map text-center">
    <v-flex xs12 sm8 md8>
      <Vue2OrgTree :data="mapTree" horizontal :expandAll="false" labelClassName="bg-blue"/>
    </v-flex>
  </v-layout>
</template>

<script>
  import Vue2OrgTree from 'vue2-org-tree'
  export default {
    name: 'web-map',
    components: {
      Vue2OrgTree
    },
    data () {
      return {
        mapTree: {
          label: '蓝晶（积分）转赠平台',
          children: [
            {
              label: '首页',
              children: [
                {
                  label: '转赠数据',
                  expand: true
                },
                {
                  label: '自助转赠/接收区'
                },
                {
                  label: '转赠记录'
                }
              ]
            },
            {
              label: '发布',
              children: [
                {
                  label: '我要发布接收'
                },
                {
                  label: '我要发布转赠'
                }
              ]
            },
            {
              label: '订单',
              children: [
                {
                  label: '即时订单'
                },
                {
                  label: '发布订单'
                }
              ]
            },
            {
              label: '个人中心',
              children: [
                {
                  label: '个人信息'
                },
                {
                  label: '账户与安全'
                },
                {
                  label: '身份认证'
                },
                {
                  label: '账户信息'
                },
                {
                  label: '消息提醒'
                }
              ]
            }
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
.web-map {
  .org-tree-container {
    background-color: transparent;
  }
  .bg-blue {
    background-color: #1976d2;
    color: white;
  }
}
</style>