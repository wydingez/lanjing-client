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
        <td>{{ props.item.unitPrice }} JG/蓝晶</td>
        <td>{{ props.item.quantity }}</td>
        <td>{{ props.item.totalAmount ? `${props.item.totalAmount}JG` : '' }} </td>
        <td>{{ getStatusDesc(props.item) }}</td>
        <td class="order-table-btn">
          <v-btn color="warning" small outline @click="doOptModal(props.item, btn.key)" v-for="btn in btns" :key="btn.key" v-show="btn.visible(props.item.type, props.item.status)">{{btn.label}}</v-btn>
        </td>
      </template>
    </v-table-server>

    <v-dialog v-model="detailInfo.modal" width="500" persistent>
      <v-card class="order-detail">
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
                  <v-img :src="item.avatarUrl"></v-img>
                </v-list-tile-avatar>
                <v-list-tile-content>
                  <v-list-tile-title>{{ item.wx }}</v-list-tile-title>
                  <v-list-tile-sub-title class="text--primary">{{ item.time }}-<kbd class="warning">{{item.statusDesc}}</kbd><br><span class="warning--text">{{ item.type === 'BUY' ? '转赠' : '接收' }}&nbsp;<kbd>{{ item.amount }}</kbd>个</span></v-list-tile-sub-title>
                </v-list-tile-content>

                <v-list-tile-action>
                  <v-list-tile-action-text>
                    <v-btn color="warning" small @click="confirmOrder(item)" v-if="showOpt(item)">{{item.type === 'BUY' ? '去转赠' : '去接收'}}</v-btn>
                    <v-btn color="warning" small @click="cancelOrder(item)" v-if="item.status === 'IN_CANCEL'">申请取消</v-btn>
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

    <!-- 确认转赠与 -->
    <v-dialog v-model="confirmReceive.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>确认接收</v-card-title>
        <v-card-text>
          <p>转赠人：<span>{{confirmReceive.receiver}}</span></p>
          <p>转赠数量：<span>{{confirmReceive.amount}}</span></p>
          <p>转入时间：<span>{{confirmReceive.date}}</span></p>
          <blockquote  class="blockquote">
            操作提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请务必前往蓝晶社APP确认转赠人和转赠数量是否和上述<span class="red--text font-weight-bold">信息一致</span>，点击确认后，系统会将您冻结的坚果（JG）转入转赠人账户。如信息有误，请至本网站下方联系客服！
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            :loading="confirmReceive.loading"
            @click="confirmReceive.confirm"
          >
            确认接收
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="confirmReceive.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 确认接收 -->
    <v-dialog v-model="confirmGive.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>确认转赠</v-card-title>
        <v-card-text>
          <blockquote class="blockquote" >打开蓝晶社APP转赠蓝晶至：</blockquote>
          <p>
            手机号：{{confirmGive.phone}}
             <v-btn
              color="pink"
              flat
              v-clipboard:copy="confirmGive.phone"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
              style="padding: 0 5px"
            >
              【点击复制】 
            </v-btn>
          </p>
          <p>蓝晶社账户昵称：{{confirmGive.wx}}</p>
          <p class="red--text">（安全提醒：在蓝晶社APP里转赠时，请务必核对以上信息无误，方可转赠。如遇信息不符时，请至网站下方联系客服人员处理！）</p>
          <blockquote class="blockquote" >
            请在<span class="red--text font-weight-bold">完成转赠后</span>，到【订单】页面继续完成该订单。
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            :loading="confirmGive.loading"
            @click="confirmGive.confirm"
          >
            确认转赠
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="confirmGive.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 申请取消 -->
    <v-dialog v-model="confirmCancel.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>申请取消</v-card-title>
        <v-card-text>
          <p>
            手机号：{{confirmCancel.phone}}
          </p>
          <p>蓝晶社账户昵称：{{confirmCancel.wx}}</p>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            @click="confirmCancel.confirm"
          >
            同意取消
          </v-btn>
          <v-btn
            color="pink"
            flat
            @click="confirmCancel.reject"
          >
            拒绝取消
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="confirmCancel.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 拒绝申请取消 -->
    <v-dialog v-model="rejectCancel.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>确认</v-card-title>
        <v-card-text>
          <v-form ref="form" v-model="rejectCancel.valid" lazy-validation>
            <v-textarea v-model="rejectCancel.auditDesc" label="拒绝理由" :rules="[v => !!v || '拒绝理由不能为空！']" required></v-textarea>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            :loading="rejectCancel.loading"
            @click="rejectCancel.confirm"
          >
            确认
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="rejectCancel.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { doDeliveryConfirm, doReceiveConfirm, doTradeCancel, doAgencyCancel, getTradeDetail, doTradeCancelApproval, doTradeCancelReject } from '@/api/trade'
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
          type: ''
        },
        detailInfo: {
          modal: false,
          details: []
        },
        confirmReceive: {
          modal: '',
          receiver: '',
          amount: '',
          date: '',
          loading: false,
          confirm: () => {
            this.doOpt()
          }
        },
        confirmGive: {
          modal: '',
          phone: '',
          wx: '',
          loading: false,
          confirm: () => {
            this.doOpt()
          }
        },
        confirmCancel: {
          modal: '',
          phone: '',
          wx: '',
          tradeNo: '',
          confirm: () => {
            this.doCancel('approve')
          },
          reject: () => {
            this.rejectCancel.auditDesc = ''
            this.rejectCancel.loading = false
            this.rejectCancel.modal = true
          }
        },
        rejectCancel: {
          modal: false,
          loading: false,
          auditDesc: '',
          confirm: () => {
            this.doCancel('reject')  
          }
        },
        btns: [
          {
            key: 'receive',
            label: '确认接收',
            visible: (type, status) => {
              return type === 'BUY' && status === 'TO_BE_TAKE'
            }
          },
          {
            key: 'delivery',
            label: '确认转赠',
            visible: (type, status) => {
              return type === 'SALE' && status === 'TO_BE_DELIVER'
            }
          },
          {
            key: 'detail',
            label: '查看明细',
            /* eslint-disable*/
            visible: (type, status) => {
              // 只有接收订单才能查看明细
              return this.orderType === 'agency'
            }
          },
          {
            key: 'trade-cancel',
            label: '取消订单',
            /* eslint-disable*/
            visible: (type, status) => {
              return this.orderType === 'trade' && ['TO_BE_DELIVER', 'TO_BE_TAKE'].includes(status)
            }
          },
          {
            key: 'agency-cancel',
            label: '取消发布',
            /* eslint-disable*/
            visible: (type, status) => {
              return this.orderType === 'agency' && status === 'PROGRESS'
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
        let orderType = this.orderType === 'trade' ? '订单' : '发布'
        return [
          { text: `${orderType}类型`, value: 'type' },
          { text: '订单号', value: 'orderNo' },
          { text: '单价', value: 'unitPrice', sortable: false },
          { text: '数量', value: 'quantity', sortable: false },
          { text: `${orderType}总额`, value: 'totalAmount', sortable: false },
          { text: '完成状态', value: 'status', sortable: false },
          { text: '操作', value: 'opt', sortable: false }
        ]
      }
    },
    methods: {
      getStatusDesc ({status, type}) {
        let desc = ''
        let isTrade = this.type.split('-')[1] === 'trade'
        if (!isTrade) {
          switch (status) {
            case 'COMPLETED':
              desc = '已完成'
              break
            case 'PROGRESS':
              if (type === 'SALE') {
                desc = '发布转赠中'
              } else {
                desc = '发布接收中'
              }
              break
            case 'CANCEL':
              desc = '接收撤销'
              break
          }
        } else {
          switch (status) {
            case 'TO_BE_DELIVER':
              desc = '待转赠'
              break
            case 'TO_BE_TAKE':
              desc = '待接收'
              break
            case 'CANCEL':
              desc = '已取消'
              break
            case 'IN_CANCEL':
              desc = '取消中'
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
          this.confirmOrder({
            tradeNo: item.orderNo,
            type: 'SALE'
          })
        } else if (type === 'delivery') {
          this.confirmOrder({
            tradeNo: item.orderNo,
            type: 'BUY'
          })
        } else if (type === 'detail') {
          this.detailInfo.modal = true
          this.clickOrderNo = item.orderNo
          this.getOrderDetails()
        } else if (type === 'trade-cancel') {
          this.$vModal.confirm({
            title: '操作',
            content: '确认取消发布吗？',
            onOk: (next) => {
              doTradeCancel(item.orderNo).then(res => {
                if (res.success) {
                  this.$vNotice.success({
                    text: '取消发布成功'
                  })
                  this.$refs.vTS.refresh()
                  next()
                }
              }).catch(() => {
                next(false)
              })
            }
          })
        } else if (type === 'agency-cancel') {
          this.$vModal.confirm({
            title: '操作',
            content: '确认取消发布吗？',
            onOk: (next) => {
              doAgencyCancel(item.orderNo).then(res => {
                if (res.success) {
                  this.$vNotice.success({
                    text: '取消发布成功'
                  })
                  this.$refs.vTS.refresh()
                  next()
                }
              }).catch(() => {
                next(false)
              })
            }
          })
        }
      },
      getOrderDetails () {
        getAgencyDetail(this.clickOrderNo).then(res => {
          if (res.success) {
            this.detailInfo.details = res.data.map(i => {
              // {wx: 'zhagnsan', time: '2019-07-21 17:34:00', type: 'sell', amount: 1000}
              let statusInfect = {
                'TO_BE_DELIVER': '待转赠',
                'TO_BE_TAKE': '待接收',
                'COMPLETED': '完成',
                'IN_CANCEL': '取消中'
              }
              return {
                wx: i.tradeUserName,
                time: i.tradeDate,
                type: i.tradeType,
                amount: i.tradeQuantity,
                avatarUrl: i.tradeUserPortraitUrl,
                tradeNo: i.tradeNo,
                status: i.tradeStatus,
                statusDesc: statusInfect[i.tradeStatus]
              }
            })
          }
        })
      },
      async doCancel (type) {
        let tradeNo = this.confirmCancel.tradeNo
        if (type === 'approve') {
          // 同意取消
          this.$vModal.confirm({
            title: '确认',
            content: '确认同意取消吗？',
            onOk: async (next) => {
              try {
                let res = await doTradeCancelApproval(tradeNo)
                if (res.success) {
                  this.$vNotice.success({
                    text: '同意取消成功'
                  })
                  next()
                } else {
                  next(false)
                }
              } catch (e) {
                next(false)
              }
            }
          })
        } else if (type === 'reject') {
          // 拒绝取消
          if (this.rejectCancel.valid) {
            this.rejectCancel.loading = true
            try {
              let res = await doTradeCancelReject({
                tradeNo: tradeNo,
                auditDesc: this.rejectCancel.auditDesc
              })
              if (res.success) {
                this.$vNotice.success({
                  text: '拒绝取消成功'
                })
                this.rejectCancel.loading = false
                this.rejectCancel.modal = false
              }
            } catch (e) {
              this.rejectCancel.loading = false
            }
          } else {
            this.$vNotice.success({
              text: '请填写拒绝理由'
            })
          }
        }
        this.$refs.vTS.refresh()
        if (this.detailInfo.modal) {
          this.getOrderDetails()
        }
      },
      doOpt () {
        let type = this.confirmInfo.type
        let orderNo = this.confirmInfo.clickRow.orderNo
        let desc = type === 'receive' ? '请确保蓝晶社APP已经接收到对应数量蓝晶！' : '请确保在蓝晶社APP上已经转赠出对应数量蓝晶！'
        this.$vModal.confirm({
          title: '确认',
          content: desc,
          onOk: (next) => {
            if (type === 'receive') {
              this.confirmReceive.loading = true
              doReceiveConfirm(orderNo).then(res => {
                if (res.success) {
                  this.confirmReceive.loading = false
                  this.confirmReceive.modal = false
                  this.$vNotice.success({
                    text: '接收成功'
                  })
                  this.$refs.vTS.refresh()
                  next()
                  if (this.detailInfo.modal) {
                    this.getOrderDetails()
                  }
                }
              }).then(() => {
                this.confirmReceive.loading = false
                next(false)
              }).catch(() => {
                this.confirmReceive.loading = false
                next(false)
              })
            } else if (type === 'delivery') {
              this.confirmGive.loading = true
              doDeliveryConfirm(orderNo).then(res => {
                if (res.success) {
                  this.confirmGive.loading = false
                  this.confirmGive.modal = false
                  this.$vNotice.success({
                    text: '转赠成功'
                  })
                  this.$refs.vTS.refresh()
                  if (this.detailInfo.modal) {
                    this.getOrderDetails()
                  }
                  next()
                }
              }).then(() => {
                this.confirmGive.loading = false
                next(false)
              }).catch(() => {
                this.confirmGive.loading = false
                next(false)
              })
            }
          }
        })
      },
      confirmOrder ({tradeNo, type}) {
        this.confirmInfo.clickRow.orderNo = tradeNo
        if (type === 'SALE') {
          this.confirmInfo.type = 'receive'
          this.confirmReceive.modal = true
          getTradeDetail(tradeNo).then(res => {
            if (res.success) {
              this.confirmReceive.receiver = res.data.deliverUsername
              this.confirmReceive.amount = res.data.tradeQuantity
              this.confirmReceive.date = res.data.tradeDate
            }
          })
        } else if (type === 'BUY') {
          this.confirmInfo.type = 'delivery'
          this.confirmGive.modal = true
          getTradeDetail(tradeNo).then(res => {
            if (res.success) {
              this.confirmGive.wx = res.data.takeUsername
              this.confirmGive.phone = res.data.takeUserPhone
            }
          })
        }
      },
      cancelOrder ({tradeNo}) {
        this.confirmCancel.tradeNo = tradeNo
        this.confirmCancel.modal = true
        getTradeDetail(tradeNo).then(res => {
          if (res.success) {
            this.confirmCancel.wx = res.data.takeUsername
            this.confirmCancel.phone = res.data.takeUserPhone
          }
        })
      },
      showOpt ({type, status}) {
        return (type === 'BUY' && status === 'TO_BE_DELIVER') || (type === 'SALE' && status === 'TO_BE_TAKE')
      },
      onCopy () {
        this.$vNotice.success({
          text: '复制成功'
        })
      },
      onError () {
        console.error('copy error!')
      }
    }
  }
</script>

<style lang="stylus">
.no-data {
  text-align: center;
}
.order-detail {
  hr {
    margin: 10px;
  }
  .v-list__tile__title {
    max-width: 250px;
    overflow: hidden;
  }
}
</style>