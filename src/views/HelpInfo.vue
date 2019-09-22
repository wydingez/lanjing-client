<template>
  <v-layout align-center justify-center pa-4 class="help-info">
    <v-flex xs12 sm8 md8>
      <div v-html="content" class="content">
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  import {getArticleInfo} from '@/api/article'
  export default {
    name: 'help-info',
    data () {
      return {
        content: ''
      }
    },
    watch: {
      '$route.params.key': {
        handler (val) {
          this.init(val)
        },
        immediate: true
      }
    },
    methods: {
      async init (key) {
        let res = await getArticleInfo(key)
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
}
</style>