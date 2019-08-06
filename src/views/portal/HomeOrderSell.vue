<template>
  <div>
    <v-table-server :headers="headers" :ajax="ajax">
      <template v-slot:items="props">
        <td>
          <v-avatar size="36"><img :src="props.item.agencyUserPortraitUrl" :alt="props.item.name"></v-avatar>
        </td>
        <td>{{props.item.agencyNo}}</td>
        <td>{{props.item.agencyUnitPrice}} ￥/蓝晶</td>
        <td>{{props.item.agencyAmount}}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="warning" fab small dark v-on="on" @click="openSellModal(props.item)">
                <v-icon>input</v-icon>
              </v-btn>
            </template>
            <span>卖出</span>
          </v-tooltip>
        </td>
      </template>
    </v-table-server>
    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>卖出</v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-model="amount"
              label="数量"
              :placeholder="amountPlaceholder"
              :rules="amountRule"
              required
            ></v-text-field>
          </v-form>
          <p>锁定的价格为：{{rowClickItem.agencyUnitPrice}}元/蓝晶</p>
          <p>锁定的有效剩余时间：598秒</p>

          <blockquote class="blockquote" style="padding: 0">
            卖出提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;卖出前确认您的<span class="red--text font-weight-bold">蓝晶数量充足</span>，一旦确认卖出，请在10分钟内转赠蓝晶至卖方家的蓝晶社账号。然后至<span class="red--text font-weight-bold">【订单】中确认转出</span>，否则交易自动撤销
          </blockquote>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="doSell"
          >
            确认卖出
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="snackbar" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>卖出成功</v-card-title>
        <v-card-text>
          <blockquote class="blockquote" style="padding: 0">确认购买成功，先打开蓝晶社APP转赠蓝晶至：</blockquote>
          <p>
            手机号：{{buyerInfo.phone}}
             <v-btn
              color="pink"
              flat
              v-clipboard:copy="buyerInfo.phone"
              v-clipboard:success="onCopy"
              v-clipboard:error="onError"
            >
              【点击复制】 
            </v-btn>
          </p>
          <p>微信号：{{buyerInfo.wx}}</p>
          <p class="red--text">(安全提醒：请在蓝晶社APP里转赠蓝晶时务必核对以上信息无误，方可转入。如遇信息不符时请至公众号【爱坚果社区】联系客服人员处理！)</p>
          <blockquote class="blockquote" style="padding: 0">
            完成转入后，请到<span class="red--text font-weight-bold">【订单】</span>页面继续完成交易
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            @click="linkToOrder"
          >
            确认
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="snackbar = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
  import { doTradeSale } from '@/api/trade'
  import { getLogined } from '@/utils/auth'

  export default {
    name: 'HomeOrderSell',
    data: () => ({
      headers: [
        {text: '微信头像', value: 'agencyUserPortraitUrl', sortable: false},
        {text: '委托单号', value: 'agencyNo', sortable: false},
        {text: '单价', value: 'agencyUnitPrice', sortable: false},
        {text: '数量', value: 'agencyAmount', sortable: false},
        {text: '操作', value: 'opt', sortable: false}
      ],
      amount: '',
      amountPlaceholder: '',
      dialog: false,
      snackbar: false,
      buyerInfo: {
        phone: '13813813813',
        wx: 'weishi'
      },
      amountRule: [
        value => !!value || '数量不能为空',
        value => !Number.isNaN(Number(value)) || '数量不正确',
        value => Number(value) >= 80 && Number(value) <= 2000 || '数量应该在80-2000之间'
      ],
      ajax: {
        url: '/agency/query/buy'
      },
      rowClickItem: {}
    }),
    methods: {
      linkToOrder () {
        this.snackbar = false
        this.$router.push('/order')
      },
      onCopy () {
        this.$vNotice.success({
          text: '复制成功'
        })
      },
      onError () {
        console.error('copy error!')
      },
      openSellModal (item) {
        this.rowClickItem = item
        this.amountPlaceholder = `1-${item.agencyAmount}`
        this.amountRule[2] = value => Number(value) >=1 && Number(value) <= item.agencyAmount || `数量应该在${this.amountPlaceholder}之间`
        this.dialog = true
      },
      doSell () {
        if (!getLogined()) {
          // 没有登陆
          this.$vNotice.error({
            text: '您还没有登陆，请先登录！'
          })
          return false
        }
        let flag = this.$refs.form.validate()
        if (flag) {
          doTradeSale({
            agencyNo: this.rowClickItem.agencyNo,
            tradeQuantity: this.amount
          }).then(res => {
            if (res.success) {
              this.dialog = false
              this.snackbar = true
            }
          })
          
        } else {
          this.$vNotice.error({
            text: '表单校验失败'
          })
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>