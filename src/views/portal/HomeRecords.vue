<template>
  <v-table-server :headers="headers" :ajax="ajax">
    <template v-slot:items="props">
      <td>
        <v-avatar size="36"><img :src="props.item.tradeUserPortraitUrl" :alt="props.item.name"></v-avatar>
      </td>
      <td>{{props.item.agencyNo}}</td>
      <td class="font-weight-medium" v-html="translateDesc(props.item)"></td>
    </template>
  </v-table-server> 
</template>

<script>
  export default {
    name: 'HomeOrderSell',
    data: () => ({
      headers: [
        {text: '微信头像', value: 'tradeUserPortraitUrl', sortable: false},
        {text: '单号', value: 'agencyNo', sortable: false},
        {text: '记录', value: 'optDesc', sortable: false},
      ],
      ajax: {
        url: '/trade/list/all'
      }
    }),
    methods: {
      translateDesc ({tradeDate, tradeType, tradeQuantity}) {
        let sellType = tradeType === 'SALE' ? '转赠' : '接收'
        return `
          <div>
            于<kbd class="warning">${tradeDate}</kbd> ${sellType} <kbd class="warning">${tradeQuantity}</kbd>个
          </div>
        `
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>