<template>
  <v-container grid-list-xl class="web-map text-center">
    <v-layout row wrap>
      <v-flex xs12 class="breadcrumbs">
        <v-breadcrumbs :items="breadList" divider=">">
          <template v-slot:item="props">
            <a href="javascript:void(0)" @click="$router.push(props.item.href)" :disabled="props.item.disabled" :class="[props.item.disabled && 'v-breadcrumbs__item v-breadcrumbs__item--disabled']">{{ props.item.text }}</a>
          </template>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs12>
        <Vue2OrgTree
          :data="mapTree"
          horizontal
          collapsable
          labelClassName="bg-blue"
          :renderContent="renderContent"
          @on-expand="onExpand"
          @on-node-click="onNodeClick"
        />
      </v-flex>
    </v-layout>
  </v-container>
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
                  expand: true,
                  href: '/'
                },
                {
                  label: '自助转赠/接收区',
                  href: '/'
                },
                {
                  label: '转赠记录',
                  href: '/'
                }
              ]
            },
            {
              label: '发布',
              children: [
                {
                  label: '我要发布接收',
                  href: '/delegate'
                },
                {
                  label: '我要发布转赠',
                  href: '/delegate'
                }
              ]
            },
            {
              label: '订单',
              children: [
                {
                  label: '即时订单',
                  href: '/order'
                },
                {
                  label: '发布订单',
                  href: '/order'
                }
              ]
            },
            {
              label: '个人中心',
              children: [
                {
                  label: '个人信息',
                  href: '/personal'
                },
                {
                  label: '账户与安全',
                  href: '/personal'
                },
                {
                  label: '身份认证',
                  href: '/personal'
                },
                {
                  label: '账户信息',
                  href: '/personal'
                },
                {
                  label: '消息提醒',
                  href: '/personal'
                }
              ]
            }
          ]
        },
        breadList: [
          {
            text: '首页',
            disabled: false,
            href: '/'
          },
          {
            text: '帮助信息',
            disabled: true,
            href: 'breadcrumbs_link_1'
          },
          {
            text: '网站地图',
            disabled: true,
            href: 'breadcrumbs_link_2'
          }
        ]
      }
    },
    created () {
      this.expandChange()
    },
    methods: {
      renderContent (h, data) {
        if (data.href) {
          return h('span', {
            attrs: {
              class: 'node'
            }
          }, [
            h('a', data.label)
          ])
        } else {
          return h('span', data.label)
        }
      },
      onExpand (e, data) {
        if ('expand' in data) {
          data.expand = !data.expand

          if (!data.expand && data.children) {
            this.collapse(data.children)
          }
        } else {
          this.$set(data, 'expand', true)
        }
      },
      onNodeClick (e, data) {
        if (data.href) {
          this.$router.push(data.href)
        }
      },
      collapse (list) {
        list.forEach(child => {
          if (child.expand) {
            child.expand = false
          }

          child.children && this.collapse(child.children)
        })
      },
      expandChange () {
        this.toggleExpand(this.mapTree, true)
      },
      toggleExpand (data, val) {
        if (Array.isArray(data)) {
          data.forEach(item => {
            this.$set(item, 'expand', val)
            if (item.children) {
              this.toggleExpand(item.children, val)
            }
          })
        } else {
          this.$set(data, 'expand', val)
          if (data.children) {
            this.toggleExpand(data.children, val)
          }
        }
      }
    }
  }
</script>

<style lang="stylus">
.web-map {
  .org-tree-container {
    background-color: transparent;
    .node a {
      color: white;
      text-decoration: underline;
    }
  }
  .bg-blue {
    background-color: #1976d2;
    color: white;
  }
}
</style>