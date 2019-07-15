<template>
  <v-data-table
    :headers="headers"
    :items="desserts">
    <template v-slot:items="props">
      <td>{{props.item.name}}</td>
      <td>
        <v-avatar size="36"><img :src="props.item.avatar" :alt="props.item.name"></v-avatar>
      </td>
      <td>{{props.item.per}} ￥/个</td>
      <td>{{props.item.amount}}</td>
      <td>
        <v-btn color="warning" fab small dark>
          <v-icon>add_shopping_cart</v-icon>
        </v-btn>
      </td>
    </template>
  </v-data-table>
</template>

<script>
  export default {
    name: 'VTable',
    data () {
      return {
        headers: [
          {text: '委托方', value: 'name', sortable: false},
          {text: '微信图像', value: 'avatar', sortable: false},
          {text: '单价', value: 'per'},
          {text: '数量', value: 'amount'},
          {text: '操作', value: 'opt', sortable: false}
        ],
        desserts: [
          {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
          {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
          {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
          {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
        ]
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>