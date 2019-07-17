<template>
  <div class="home">
    <v-layout class="home-carousel">
      <v-carousel :height="200" delimiter-icon="stop" hide-controls>
        <v-carousel-item
          v-for="(item,i) in carouselItems"
          :key="i"
          :src="item.src"
        ></v-carousel-item>
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
              <v-card-title>
                <div class="title">交易数据</div>
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
              <v-card-title>
                <div class="title">自选交易区</div>
              </v-card-title>
              <v-divider light></v-divider>
              <div class="home-order-container">
                <v-tabs
                  v-model="selectOrder"
                  color="primary"
                  dark
                >
                  <v-tab
                    v-for="item in orderInfo"
                    :key="item.key"
                    ripple
                  >
                    {{item.label}}
                  </v-tab>
                  <v-tab-item
                    v-for="item in orderInfo"
                    :key="item.key"
                  >
                    <v-card flat>
                      <VTable :headers="tableDef.orderHeader" :items="tableDef.orderBuyData" :url="tableDef.orderUrl">
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
                      </VTable>
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
              <v-card-title>
                <div class="title">交易记录</div>
              </v-card-title>
              <v-divider light></v-divider>
              <div class="home-records-container">
                <VTable :headers="tableDef.orderHeader" :items="tableDef.orderBuyData"></VTable>
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

  export default {
    name: 'Home',
    components: {HomeCharts},
    data () {
      return {
        selectOrder: null,
        orderInfo: [
          {key: 'buy', label: '我要买'}, 
          {key: 'sell', label: '我要卖'}
        ],
        carouselItems: [
          {src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg'},
          {src: 'https://cdn.vuetifyjs.com/images/carousel/sky.jpg'},
          {src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg'},
          {src: 'https://cdn.vuetifyjs.com/images/carousel/planet.jpg'}
        ],
        tableDef: {
          orderHeader: [
            {text: '委托方', value: 'name', sortable: false},
            {text: '微信图像', value: 'avatar', sortable: false},
            {text: '单价', value: 'per'},
            {text: '数量', value: 'amount'},
            {text: '操作', value: 'opt', sortable: false}
          ],
          recordHeader: [
            {text: '委托方', value: 'name', sortable: false},
            {text: '微信图像', value: 'avatar', sortable: false},
            {text: '交易记录', value: 'optDesc', sortable: false},
          ],
          orderBuyData: [
            {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
            {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
            {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
            {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
            {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
            {name: 'wyd6**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
            {name: 'wyd7**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
          ],
          orderSellData: [
            {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
            {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
            {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
            {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
            {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
          ],
          recordData: [
            {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
            {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
            {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
            {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
            {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
          ],
          orderUrl: 'http://www.baidu.com'
        }
      }
    },
    methods: {
      xxx () {
        console.log('xxx')
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
  }

.home {
  &-echarts {
    card-custom-padding()
    &-container {
      height: 500px;
      width: 100%;
      &-content {
        height: 100%;
        width: 100%;
      }
    }
  }
  &-order {
    card-custom-padding()
  }
  &-records {
    card-custom-padding()
  }
}
</style>
