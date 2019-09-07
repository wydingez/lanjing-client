<template>
  <div class="order-page">
    <v-tabs fixed-tabs v-model="activeType" class="order-page-type" slider-color="orange">
      <v-tab
        v-for="n in orderTypes"
        :key="n.key"
      >
        {{n.label}}
      </v-tab>
    </v-tabs>
    <v-tabs fixed-tabs v-model="activeTab" class="order-page-status">
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
            <OrderList :type="n.key + '-' + orderTypes[activeType].key"></OrderList>
          </v-card-text>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </div>
</template>

<script>
  import OrderList from './portal/OrderList'
  export default {
    name: 'Order',
    components: {OrderList},
    data () {
      return {
        tabTypes: [
          {key: 'progress', label: '进行中', desserts: [], totalDesserts: 0},
          {key: 'completed', label: '已完成', desserts: [], totalDesserts: 0},
          {key: 'cancel', label: '已取消', desserts: [], totalDesserts: 0},
          {key: 'all', label: '全部', desserts: [], totalDesserts: 0},
        ],
        orderTypes: [
          {key: 'trade', label: '即时订单'},
          {key: 'agency', label: '发布订单'}
        ],
        activeTab: 0,
        activeType: 0
      }
    }
  }
</script>

<style lang="stylus">
tab-custom(n) 
  .v-tabs__bar {
    position: fixed;
    top: n;
    left: 0;
    width: 100%;
    z-index: 1;
    border-bottom: 1px solid #eee;
  }
  .v-window {
    margin-top: n;
  }
  
.order-page {
  .v-window__container--is-active {
    height: auto !important;
  }
}

.my-app-phone {
  .order-page {
    &-type {
      tab-custom(48px)
    }
    &-status {
      tab-custom(97px)
      .order-table-btn .v-btn__content {
        height: 28px;
      }
    }
  }
}
</style>