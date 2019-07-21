<template>
  <div>
    <v-table
      :headers="headers"
      :items="desserts"
      :pagination.sync="pagination"
      :total-items="totalDesserts"
      :loading="loading"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td>{{ getBuyTypeDesc(props.item.buyType) }}</td>
        <td>{{ props.item.orderNo }}</td>
        <td>{{ props.item.perPrice }}</td>
        <td>{{ props.item.amount }}</td>
        <td>{{ props.item.delegatePrice }}</td>
        <td>{{ getStatusDesc(props.item.buyType) }}</td>
        <td class="order-table-btn">
          <v-btn color="warning" small outline @click="doOpt(props.item, 'sell')" v-if="![2, 3].includes(props.item.status) && props.item.buyType.split('-')[1] === 'sell'">确认发货</v-btn>
          <v-btn color="warning" small outline @click="doOpt(props.item, 'buy')" v-if="![2, 3].includes(props.item.status) && props.item.buyType.split('-')[1] === 'buy'">确认收货</v-btn>
          <v-btn color="warning" small outline @click="doOpt(props.item, 'detail')" v-if="[2, 3].includes(props.item.status)">查看明细</v-btn>
        </td>
      </template>
    </v-table>

    <v-dialog v-model="confirmInfo.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{confirmInfo.title}}</v-card-title>
        <v-card-text>{{confirmInfo.tip}}</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            @click="confirmInfo.modal = false"
          >
            确认
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="confirmInfo.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="detailInfo.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>明细详情</v-card-title>
        <v-card-text>
          <!-- <p v-for="(item, index) in detailInfo.details" :key="index" v-html="generateInfo(item, index)"></p> -->
          <v-list two-line>
            <template v-for="(item, index) in detailInfo.details">
              <v-list-tile
                :key="index"
                avatar
                ripple
              >
                <v-list-tile-avatar>
                  <v-icon>filter_{{index + 1}}</v-icon>
                  <!-- <span class="title">{{index + 1}}</span> -->
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title><v-icon>account_circle</v-icon>{{ item.wx }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.time }}</v-list-tile-sub-title>
                  <!-- <v-list-tile-sub-title>{{ item.amount }}</v-list-tile-sub-title> -->
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <span class="warning--text">{{ item.type === 'sell' ? '卖出' : '买入' }}&nbsp;<kbd>{{ item.amount }}</kbd>个</span>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="'divider_' + index" v-if="index + 1 != detailInfo.details.length"></v-divider>
            </template>
          </v-list>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="grey"
            flat
            @click="detailInfo.modal = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  export default {
    name: 'order-list',
    props: {
      type: String
    },
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: true,
        pagination: { rowsPerPage: 10 },
        headers: [
          { text: '委托类型', value: 'buyType' },
          { text: '订单号', value: 'orderNo' },
          { text: '单价', value: 'perPrice', sortable: false },
          { text: '数量', value: 'amount', sortable: false },
          { text: '委托金额', value: 'delegatePrice', sortable: false },
          { text: '完成状态', value: 'status', sortable: false },
          { text: '操作', value: 'opt', sortable: false }
        ],
        confirmInfo: {
          modal: false,
          title: '',
          tip: ''
        },
        detailInfo: {
          modal: false,
          details: [
            {wx: 'zhagnsan', time: '2019-07-21 17:34:00', type: 'sell', amount: 1000},
            {wx: 'lishi', time: '2019-07-22 17:00:00', type: 'sell', amount: 500},
            {wx: 'wangwu', time: '2019-07-22 17:34:00', type: 'sell', amount: 100},
            {wx: 'zhaoliu', time: '2019-07-21 17:34:00', type: 'sell', amount: 50}
          ]
        }
        
      }
    },
    watch: {
      pagination: {
        handler () {
          this.getDataFromApi()
            .then(data => {
              this.desserts = data.items
              this.totalDesserts = data.total
            })
        },
        deep: true
      }
    },
    mounted () {
      this.getDataFromApi()
        .then(data => {
          this.desserts = data.items
          this.totalDesserts = data.total
        })
    },
    methods: {
      generateInfo (item, index) {
        let {wx, time, type, amount} = item
        index = index + 1
        type = type === 'sell' ? '卖出' : '买入'
        return `${index}. <kbd>${wx}</kbd>于<kbd>${time}</kbd><kbd>${type}</kbd><kbd>${amount}</kbd>`
      },
      getDataFromApi () {
        this.loading = true
        return new Promise((resolve) => {
          const { sortBy, descending, page, rowsPerPage } = this.pagination

          let items = this.getDesserts().filter(item => {
            let status = this.type === 'delegated' ? 1 : this.type === 'completed' ? 2 : this.type === 'canceled' ? 3 : -1
            return status === -1 || item.status === status
          })
          const total = items.length

          if (this.pagination.sortBy) {
            items = items.sort((a, b) => {
              const sortA = a[sortBy]
              const sortB = b[sortBy]

              if (descending) {
                if (sortA < sortB) return 1
                if (sortA > sortB) return -1
                return 0
              } else {
                if (sortA < sortB) return -1
                if (sortA > sortB) return 1
                return 0
              }
            })
          }

          if (rowsPerPage > 0) {
            items = items.slice((page - 1) * rowsPerPage, page * rowsPerPage)
          }

          setTimeout(() => {
            this.loading = false
            resolve({
              items,
              total
            })
          }, 1000)
        })
      },
      getDesserts () {
        return [
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 1
          },
          {
            buyType: 'delegate-sell',
            orderNo: '1563680438479002',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 2
          },
          {
            buyType: 'active-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 3
          },
          {
            buyType: 'active-sell',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 1
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 1
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 2
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 2
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 2
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 3
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 1
          },
          {
            buyType: 'delegate-buy',
            orderNo: '1563680438479001',
            perPrice: 0.35,
            amount: 1000,
            delegatePrice: 350,
            status: 1
          }
        ]
      },
      getStatusDesc (buyType) {
        let desc = ''
        switch (buyType) {
          case 'delegate-buy':
            desc = '等待锁定 / 等待卖家发货/卖家已发货，请查收'
            break
          case 'delegate-sell':
            desc = '等待锁定 / 等待买家付款/买家已付款，请收获'
            break
          case 'active-buy':
            desc = '已付款等待卖家发货 / 卖家已发货，请查收'
            break
          case 'active-sell':
            desc = '卖家以付款，请收获'
            break
        }
        return desc
      },
      getBuyTypeDesc (buyType) {
        let desc = ''
        switch (buyType) {
          case 'delegate-buy':
            desc = '委托买入'
            break
          case 'delegate-sell':
            desc = '委托卖出'
            break
          case 'active-buy':
            desc = '主动购买'
            break
          case 'active-sell':
            desc = '主动卖出'
            break
        }
        return desc
      },
      doOpt (item, type) {
        if (type === 'buy') {
          this.confirmInfo.modal = true
          this.confirmInfo.title = '收获'
          this.confirmInfo.tip = '点击确认后，系统⾃动将资⾦转⼊卖⽅账户'
        } else if (type === 'sell') {
          this.confirmInfo.modal = true
          this.confirmInfo.title = '发货'
          this.confirmInfo.tip = '点击确认后，系统⾃动将货币转⼊卖⽅账户'
        } else if (type === 'detail') {
          //
          this.detailInfo.modal = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>