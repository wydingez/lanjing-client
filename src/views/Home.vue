<template>
  <div class="home">
    <v-layout class="home-carousel">
      <v-carousel :height="$root.smallScreen ? 200 : 300" delimiter-icon="stop" hide-controls>
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="item.src"
          :position="$root.smallScreen ? 'top left' : 'top center'">
        </v-carousel-item>
      </v-carousel>
    </v-layout>

    <v-card class="home-echarts">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="transparent darken-2">
              <v-card-title class="primary white--text">
                <div class="title">转赠数据</div>
              </v-card-title>
              <v-divider light></v-divider>
              <div class="home-echarts-container">
                <HomeCharts></HomeCharts>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card class="home-order">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="transparent darken-2">
              <v-card-title class="primary white--text">
                <div class="title">自助转赠/接收区</div>
              </v-card-title>
              <v-divider light></v-divider>
              <div class="home-order-container">
                <v-tabs
                  fixed-tabs
                  v-model="selectOrder"
                  color="transparent"
                  slider-color="primary"
                  light
                  class="home-order-container-tabs"
                >
                  <v-tab
                    v-for="item in orderInfo"
                    :key="item.key"
                    ripple
                  >
                    <v-icon>{{item.icon}}</v-icon>
                    {{item.label}}
                  </v-tab>
                  <v-tab-item
                    v-for="item in orderInfo"
                    :key="item.key"
                  >
                    <v-card flat v-if="item.key === 'buy'">
                      <HomeOrderBuy :amountLimit="amountLimit" :priceLimit="priceLimit" :tradeRateHtml="tradeRateHtml"/>
                    </v-card>
                    <v-card flat v-if="item.key === 'sell'">
                      <HomeOrderSell :amountLimit="amountLimit" :priceLimit="priceLimit" :tradeRateHtml="tradeRateHtml"/>
                    </v-card>
                  </v-tab-item>
                </v-tabs>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>

    <v-card class="home-records">
      <v-container
        fluid
        grid-list-lg
      >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card color="transparent darken-2">
              <v-card-title class="primary white--text">
                <div class="title">转赠记录</div>
              </v-card-title>
              <v-divider light></v-divider>
              <div class="home-records-container">
                <HomeRecords></HomeRecords>
              </div>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </div>
</template>

<script>
  import HomeCharts from './portal/HomeCharts'
  import HomeOrderBuy from './portal/HomeOrderBuy'
  import HomeOrderSell from './portal/HomeOrderSell'
  import HomeRecords from './portal/HomeRecords'
  import limitMixins from '@/mixin/limit'

  export default {
    name: 'Home',
    components: {HomeCharts, HomeOrderBuy, HomeOrderSell, HomeRecords},
    mixins: [limitMixins],
    watch: {
      '$store.state.logined': {
        handler (val) {
          if (val) {
            this.initLimit()
          }
        },
        immediate: true
      }
    },
    data () {
      return {
        selectOrder: null,
        orderInfo: [
          {key: 'buy', label: '我要接收', icon: 'add_shopping_cart'}, 
          {key: 'sell', label: '我要转赠', icon: 'input'}
        ],
        carouselItems: [
          {src: 'static/bg5.jpg'}
        ]
      }
    },
    created () {
      let code = this.$route.query.code
      if (code) {
        // 存在微信授权code，手动调用后台微信登录接口
        this.$store.dispatch('doWxLogin', code).then(() => {
          this.$vNotice.success({
            text: '登录成功'
          })
        })
        .catch(e => {
          this.loginLoading = false
          console.log(e)
        })
      }
    }
  }
</script>

<style lang="stylus">
card-custom-padding()
  box-shadow: none;
  .container {
    padding-bottom: 12px;
    padding-top: 12px;
    padding-left: 16px;
    padding-right: 16px;
  }

.home {
  &-echarts {
    card-custom-padding()
    &-container {
      height: 400px;
      width: 100%;
      &-content {
        height: 100%;
        width: 100%;
      }
    }
  }
  &-order {
    card-custom-padding()
    &-container-tabs {
      .v-tabs__wrapper {
        border-bottom: 1px solid #ddd;
      }
    }
  }
  &-records {
    card-custom-padding()
  }
}
</style>
