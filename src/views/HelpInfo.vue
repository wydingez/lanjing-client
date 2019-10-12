<template>
  <v-container grid-list-xl class="help-info">
    <v-layout row wrap>
      <v-flex xs12 class="breadcrumbs">
        <v-breadcrumbs :items="breadList" divider=">">
          <template v-slot:item="props">
            <a href="javascript:void(0)" @click="$router.push(props.item.href)" :disabled="props.item.disabled" :class="[props.item.disabled && 'v-breadcrumbs__item v-breadcrumbs__item--disabled']">{{ props.item.text }}</a>
          </template>
        </v-breadcrumbs>
      </v-flex>
      <v-flex xs12 sm2 md3 offset-xs0 class="left">
        <v-card class="list elevation-12">
          <v-toolbar color="primary" dark>
            <v-toolbar-title class="text-xs-center">{{getCategoryName(key)}}</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-list subheader>
            <v-list-tile
              v-for="(item, index) in list"
              :key="index"
              avatar
              @click.native="chooseArticle(item)"
              :class="{active: activeItem === item}"
              class="title"
            >
              <v-list-tile-content>
                <v-list-tile-title v-html="item"></v-list-tile-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn fab dark small color="pink" v-if="activeItem === item">
                  <v-icon dark>check</v-icon>
                </v-btn>
              </v-list-tile-action>
            </v-list-tile>
          </v-list>
        </v-card>
      </v-flex>
      <v-flex xs12 sm7 md8 offset-xs0 class="right">
        <v-card class="list elevation-12">
          <v-toolbar color="primary" dark class="text-xs-center">
            <v-toolbar-title>
              {{articleInfo.title}}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-layout row wrap class="title-desc">
            <v-flex md2>
              <label>发布人：</label>
              <span>{{articleInfo.name}}</span>
            </v-flex>
            <v-flex md5>
              <label>发布时间：</label>
              <span>{{articleInfo.publishTime}}</span>
            </v-flex>
            <v-flex md5>
              <label>更新时间：</label>
              <span>{{articleInfo.updateTime}}</span>
            </v-flex>
          </v-layout>
          <div v-html="articleInfo.content" class="content">
          </div>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {getArticleInfo, getArticleContent} from '@/api/article'
  export default {
    name: 'help-info',
    data () {
      return {
        list: [],
        activeItem: '',
        key: '',
        articleInfo: {
          title: '',
          name: 'xxx',
          publishTime: '2019-10-12 12:00:17',
          updateTime: '2019-10-12 12:00:17',
          content: ''
        }
      }
    },
    watch: {
      '$route.params.key': {
        handler (val) {
          this.key = val
          this.init(val)
        },
        immediate: true
      }
    },
    computed: {
      breadList () {
        let title = this.getCategoryName(this.key)
        return [
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
            text: title,
            disabled: true,
            href: 'breadcrumbs_link_2'
          }
        ]
      }
    },
    methods: {
      async init (key) {
        let res = await getArticleInfo(key)
        if (res.success) {
          this.list = res.data
          if (this.list.length > 0) {
            // 默认加载第一篇文章
            this.getArticleContent(res.data[0])
          }
        }
      },
      getCategoryName (key) {
        return key === 'description' ? '条款说明' : '常见问题'
      },
      async getArticleContent (articleTitle) {
        this.articleInfo.title = articleTitle
        let res = await getArticleContent({
          categoryCode: this.key,
          articleTitle
        })
        if (res.success) {
          this.articleInfo.content = res.data.articleContent
          this.activeItem = res.data.articleTitle
        }
      },
      chooseArticle (item) {
        this.activeItem = item
        this.getArticleContent(item)
      }
    }
  }
</script>

<style lang="stylus">
.help-info {
  .breadcrumbs {
    padding: 0 !important;
    .v-breadcrumbs {
      padding-bottom: 0 !important;
    }
  }
  .left {
    .list {
      .v-list--subheader {
        padding-bottom: 0;
        .title {
          cursor: pointer;
          &:hover {
            background-color: #ddd;
          }
          &.active {
            background-color: #ddd;
          }
        }
      }
    }
  }
  .right {
    .title-desc {
      text-align: center;
      margin: 0 !important;
      border-bottom: 1px solid #eee;
      label {
        font-weight: bold;
      }
    }
    .content {
      padding: 10px;
      ul {
        list-style: disc;
      }
      ol {
        list-style: decimal;
      }
    }
  }
}
</style>