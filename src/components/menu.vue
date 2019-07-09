<template>
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
</template>

<script>
  export default {
    data () {
      return {
        tab: null,
        items: [
          'web', 'shopping', 'videos', 'images', 'news'
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>