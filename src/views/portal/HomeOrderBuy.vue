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
              <v-btn color="warning" fab small dark v-on="on" @click="doBuy(props.item)">
                <v-icon>add_shopping_cart</v-icon>
              </v-btn>
            </template>
            <span>购买</span>
          </v-tooltip>
        </td>
      </template>
    </v-table-server>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>购买</v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
            <v-text-field
              v-show="!showConfPass"
              v-model="amount"
              label="数量"
              :placeholder="amountPlaceholder"
              required
              :rules="rules.amountRule"
            ></v-text-field>

            <v-text-field
              v-show="showConfPass"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :rules="rules.confPassRule"
              :type="passwordVisible ? 'text' : 'password'"
              label="请输入资金密码"
              v-model="password"
              @click:append="passwordVisible = !passwordVisible"
            ></v-text-field>
          </v-form>

          <template v-if="!showConfPass">
            <p>锁定的价格为：{{rowClickItem.agencyUnitPrice}}元/蓝晶</p>
            <p>锁定的有效剩余时间：598秒</p>

            <blockquote class="blockquote" style="padding: 0">
              购买提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;购买前确认您的<span class="red--text font-weight-bold">现金账户余额充足</span>，一旦确认购买，系统将自动锁定相应数目资金的进入中间安全账户。然后随即通知卖家转赠蓝晶至您蓝晶社账户
            </blockquote>
          </template>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="buyConfirm"
          >
            确认购买
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
        <v-card-title class="headline grey lighten-2" primary-title>购买成功</v-card-title>
        <v-card-text>购买成功，请点击确认至【订单】查看交易进度</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            @click="snackbar = false"
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
  import { doTradeBuy } from '@/api/trade'
  import { Base64 } from 'js-base64'
  import { getLogined } from '@/utils/auth'

  export default {
    name: 'HomeOrderBuy',
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
      password: '',
      dialog: false,
      snackbar: false,
      showConfPass: false,
      passwordVisible: false,
      rules: {
        amountRule: [
          value => !!value || '数量不能为空',
          value => !Number.isNaN(Number(value)) || '数量不正确',
          value => Number(value) >= 20 && Number(value) <= 2000 || '数量应该在80-2000之间'
        ],
        confPassRule: []
      },
      ajax: {
        url: '/agency/query/sale'
      },
      rowClickItem: {}
    }),
    methods: {
      doBuy (item) {
        if (!getLogined()) {
          // 没有登陆
          this.$vNotice.error({
            text: '您还没有登陆，请先登录！'
          })
          return false
        }
        this.rowClickItem = item
        this.amountPlaceholder = `1-${item.agencyAmount}`
        this.rules.amountRule[2] = value => Number(value) >=1 && Number(value) <= item.agencyAmount || `数量应该在${this.amountPlaceholder}之间`
        this.rules.confPassRule = []
        this.$refs.form.reset()
        this.showConfPass = false
        this.dialog = true
      },
      buyConfirm () {
        let flag = this.$refs.form.validate()
        if (this.showConfPass) {
          // 输入了密码，校验密码
          if (flag) {
            doTradeBuy({
              agencyNo: this.rowClickItem.agencyNo,
              payPwd: Base64.encode(this.password),
              tradeQuantity: this.amount
            }).then(res => {
              if (res.success) {
                this.dialog = false
                this.snackbar = true
              }
            })
            
          }
        } else {
          // 校验数量，成功了才跳到输入密码页面
          if (flag) {
            this.rules.confPassRule = [
              value => !!value || '密码不能为空'
            ]
            this.$refs.form.resetValidation()
            this.showConfPass = true
          }
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>