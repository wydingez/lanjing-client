<template>
  <v-table :headers="headers" :items="items" hide-actions>
    <template v-slot:items="props">
      <td>{{props.item.name}}</td>
      <td>
        <v-avatar size="36"><img :src="props.item.avatar" :alt="props.item.name"></v-avatar>
      </td>
      <td class="subheading font-weight-medium" v-html="translateDesc(props.item)"></td>
    </template>
  </v-table> 
</template>

<script>
  export default {
    name: 'HomeOrderSell',
    data: () => ({
      headers: [
        {text: '委托方', value: 'name', sortable: false},
        {text: '微信图像', value: 'avatar', sortable: false},
        {text: '交易记录', value: 'optDesc', sortable: false},
      ],
      items: [
        {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', time: '2019年6月27日', type: 'buy', amount: 2000},
        {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', time: '2019年6月27日', type: 'sell', amount: 2000},
        {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', time: '2019年6月27日', type: 'buy', amount: 2000},
        {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', time: '2019年6月27日', type: 'buy', amount: 2000},
        {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', time: '2019年6月27日', type: 'buy', amount: 2000}
      ]
    }),
    methods: {
      translateDesc ({time, type, amount}) {
        let sellType = type === 'buy' ? '购入' : '售出'
        return `
          <div>
            于<kbd class="warning">${time}</kbd> ${sellType} <kbd class="warning">${amount}</kbd>个
          </div>
        `
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>