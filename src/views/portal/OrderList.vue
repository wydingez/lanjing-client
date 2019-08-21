<template>
  <div>
    <v-table-server
      :headers="headers"
      :ajax="ajax"
      class="elevation-1"
      ref="vTS"
    >
      <template v-slot:items="props">
        <td>{{ getBuyTypeDesc(props.item.type) }}</td>
        <td>{{ props.item.orderNo }}</td>
        <td>{{ props.item.unitPrice }} 元/蓝晶</td>
        <td>{{ props.item.quantity }}</td>
        <td>{{ props.item.totalAmount }}</td>
        <td>{{ getStatusDesc(props.item.status) }}</td>
        <td class="order-table-btn">
          <v-btn color="warning" small outline @click="doOptModal(props.item, btn.key)" v-for="btn in btns" :key="btn.key" v-show="btn.visible(props.item.type, props.item.status)">{{btn.label}}</v-btn>
        </td>
      </template>
    </v-table-server>

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
            :loading="loading"
            @click="doOpt"
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
          <v-list two-line v-if="detailInfo.details.length">
            <template v-for="(item, index) in detailInfo.details">
              <v-list-tile
                :key="index"
                avatar
                ripple
              >
                <v-list-tile-avatar>
                  <v-icon>filter_{{index + 1}}</v-icon>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title><v-icon>account_circle</v-icon>{{ item.wx }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.time }}</v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <span class="warning--text">{{ item.type === 'SELL' ? '转赠' : '接收' }}&nbsp;<kbd>{{ item.amount }}</kbd>个</span>
                  </v-list-tile-action-text>
                </v-list-tile-action>
              </v-list-tile>
              <v-divider :key="'divider_' + index" v-if="index + 1 != detailInfo.details.length"></v-divider>
            </template>
          </v-list>
          <div v-else class="no-data">
            暂无数据
          </div>
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
  import { doDeliveryConfirm, doReceiveConfirm } from '@/api/trade'
  import { getAgencyDetail } from '@/api/agency'

  export default {
    name: 'order-list',
    props: {
      type: String
    },
    data () {
      return {
        totalDesserts: 0,
        desserts: [],
        loading: false,
        pagination: { rowsPerPage: 10 },
        confirmInfo: {
          clickRow: {},
          modal: false,
          title: '',
          tip: '',
          type: ''
        },
        detailInfo: {
          modal: false,
          details: []
        },
        btns: [
          {
            key: 'receive',
            label: '确认收货',
            visible: (type, status) => {
              return type === 'BUY' && status === 'TO_BE_TAKE'
            }
          },
          {
            key: 'delivery',
            label: '确认发货',
            visible: (type, status) => {
              return type === 'SALE' && status === 'TO_BE_DELIVER'
            }
          },
          {
            key: 'detail',
            label: '查看明细',
            visible: (type, status) => {
              return status === 'COMPLETED'
            }
          }
        ]
      }
    },
    computed: {
      stateType () {
        return this.type.split('-')[0]
      },
      orderType () {
        return this.type.split('-')[1]
      },
      ajax () {
        let prefixUrl = this.orderType === 'trade' ? '/trade/list/my/' : '/agency/query/my/'
        return {
          url: prefixUrl + this.stateType
        }
      },
      headers () {
        let orderType = this.orderType === 'trade' ? '订单' : '委托'
        return [
          { text: `${orderType}类型`, value: 'type' },
          { text: '订单号', value: 'orderNo' },
          { text: '单价', value: 'unitPrice', sortable: false },
          { text: '数量', value: 'quantity', sortable: false },
          { text: `${orderType}金额`, value: 'totalAmount', sortable: false },
          { text: '完成状态', value: 'status', sortable: false },
          { text: '操作', value: 'opt', sortable: false }
        ]
      }
    },
    methods: {
      generateInfo (item, index) {
        let {wx, time, type, amount} = item
        index = index + 1
        type = type === 'sell' ? '转赠' : '接收'
        return `${index}. <kbd>${wx}</kbd>于<kbd>${time}</kbd><kbd>${type}</kbd><kbd>${amount}</kbd>`
      },
      getStatusDesc (status) {
        let desc = ''
        let isTrade = this.type.split('-')[1] === 'trade'
        if (!isTrade) {
          switch (status) {
            case 'COMPLETED':
              desc = '已完成'
              break
            case 'PROGRESS':
              desc = '交易中'
              break
            case 'CANCEL':
              desc = '委托撤销'
              break
          }
        } else {
          switch (status) {
            case 'TO_BE_DELIVER':
              desc = '待发货'
              break
            case 'TO_BE_TAKE':
              desc = '待收货'
              break
            case 'CANCEL':
              desc = '已取消'
              break
            case 'TO_HANDLE':
              desc = '需要手动处理'
              break
            case 'COMPLETED':
              desc = '已完成'
              break
          }
        }
        return desc
      },
      getBuyTypeDesc (type) {
        let desc = ''
        switch (type) {
          case 'SALE':
            desc = '转赠'
            break
          case 'BUY':
            desc = '接收'
            break
        }
        return desc
      },
      doOptModal (item, type) {
        this.confirmInfo.clickRow = item
        this.confirmInfo.type = type
        if (type === 'receive') {
          this.confirmInfo.modal = true
          this.confirmInfo.title = '收货'
          this.confirmInfo.tip = '点击确认后，系统⾃动将资⾦转⼊转赠⽅账户'
        } else if (type === 'delivery') {
          this.confirmInfo.modal = true
          this.confirmInfo.title = '发货'
          this.confirmInfo.tip = '点击确认后，系统⾃动将货币转⼊转赠⽅账户'
        } else if (type === 'detail') {
          this.detailInfo.modal = true
          getAgencyDetail(item.orderNo).then(res => {
            if (res.success) {
              this.detailInfo.details = res.data.map(i => {
                // {wx: 'zhagnsan', time: '2019-07-21 17:34:00', type: 'sell', amount: 1000}
                return {
                  wx: i.tradeUser,
                  time: i.tradeDate,
                  type: i.tradeType,
                  amount: i.tradeQuantity
                }
              })
            }
          })
        }
      },
      doOpt () {
        let type = this.confirmInfo.type
        let orderNo = this.confirmInfo.clickRow.orderNo
        this.loading = true
        if (type === 'receive') {
          doReceiveConfirm(orderNo).then(res => {
            if (res.success) {
              this.confirmInfo.modal = false
              this.$vNotice.success({
                text: '收货成功'
              })
              this.$refs.vTS.refresh()
            }
          }).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else if (type === 'delivery') {
          doDeliveryConfirm(orderNo).then(res => {
            if (res.success) {
              this.confirmInfo.modal = false
              this.$vNotice.success({
                text: '发货成功'
              })
              this.$refs.vTS.refresh()
            }
          }).then(() => {
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        }
      }
    }
  }
</script>

<style lang="stylus">
.no-data {
  text-align: center;
}
</style>