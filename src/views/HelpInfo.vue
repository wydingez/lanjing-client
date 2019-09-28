<template>
  <v-layout align-center justify-center pa-4 class="help-info">
    <v-flex xs12 sm2 md2>
      <v-card class="list">
        <v-toolbar color="primary" dark>
          <v-toolbar-title class="text-xs-center">{{getCategoryName(key)}}</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>

        <v-list subheader>
          <v-list-tile
            v-for="(item, index) in list"
            :key="index"
            avatar
            @click.native="activeItem = item"
            :class="{active: activeItem === item}"
            class="title"
          >
            <v-list-tile-content>
              <v-list-tile-title v-html="item"></v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
    <v-flex xs12 sm7 md7 offset-sm1 offset-md1>
      <div v-html="content" class="content">
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import {getArticleInfo, getArticleContent} from '@/api/article'
  export default {
    name: 'help-info',
    data () {
      return {
        content: '',
        list: [],
        activeItem: '',
        key: ''
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
        return this.key === 'description' ? '条款说明' : '常见问题'
      },
      async getArticleContent (articleTitle) {
        let res = await getArticleContent({
          categoryCode: this.key,
          articleTitle
        })
        if (res.success) {
          this.content = res.data.articleContent
        }
      }
    }
  }
</script>

<style lang="stylus">
.help-info {
  .content {
    margin: 10px;
  }
  ul {
    list-style: disc;
  }
  ol {
    list-style: decimal;
  }
  .list {
    .title {
      &:hover {
        background-color: #ddd;
      }
      &.active {
        background-color: #6890b1;
      }
      .v-list__tile__title {
        text-align: center;
      }
    }
  }
  
}
</style>