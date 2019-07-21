<template>
  <v-tabs fixed-tabs class="order-page" v-model="activeTab">
    <v-tab
      v-for="n in tabTypes"
      :key="n.key"
      :href="'#' + n.key"
    >
      {{n.label}}
    </v-tab>
    <v-tab-item v-for="n in tabTypes" :key="n.key" :value="n.key">
      <v-card flat>
        <v-card-text>
          <OrderList :type="n.key"></OrderList>
        </v-card-text>
      </v-card>
    </v-tab-item>
  </v-tabs>
</template>

<script>
  import OrderList from './portal/OrderList'
  export default {
    name: 'Order',
    components: {OrderList},
    data () {
      return {
        tabTypes: [
          {key: 'delegated', label: '委托中', desserts: [], totalDesserts: 0},
          {key: 'completed', label: '已完成', desserts: [], totalDesserts: 0},
          {key: 'canceled', label: '已取消', desserts: [], totalDesserts: 0},
          {key: 'all', label: '全部', desserts: [], totalDesserts: 0},
        ],
        activeTab: null
      }
    }
  }
</script>

<style lang="stylus">
.my-app-phone {
  .order-page {
    .v-tabs__bar {
      position: fixed;
      top: 48px;
      left: 0;
      width: 100%;
      z-index: 1;
      border-bottom: 1px solid #eee;
    }
    .v-window {
      margin-top: 48px;
    }
    .order-table-btn .v-btn__content {
      height: 28px;
    }
  }
}
</style>