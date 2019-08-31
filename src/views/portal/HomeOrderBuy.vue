<template>
  <div>
    <v-table-server :headers="headers" :ajax="ajax">
      <template v-slot:items="props">
        <td>
          <v-avatar size="36"><img :src="props.item.agencyUserPortraitUrl" :alt="props.item.name"></v-avatar>
        </td>
        <td>{{props.item.agencyNo}}</td>
        <td>{{props.item.agencyUnitPrice}} JG/蓝晶</td>
        <td>{{props.item.remainTradableAmount}}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="warning" fab small dark v-on="on" @click="doBuy(props.item)">
                <v-icon>add_shopping_cart</v-icon>
              </v-btn>
            </template>
            <span>接收</span>
          </v-tooltip>
        </td>
      </template>
    </v-table-server>

    <v-dialog v-model="dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>接收</v-card-title>

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
              label="请输入JG安全密码"
              v-model="password"
              @click:append="passwordVisible = !passwordVisible"
            ></v-text-field>
          </v-form>

          <template v-if="!showConfPass">
            <p>锁定的价格为：{{rowClickItem.agencyUnitPrice}}JG/蓝晶</p>

            <blockquote class="blockquote" >
              接收提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;接收前确认您的您账户上的坚果（JG）数量足够，以及<span class="red--text font-weight-bold">蓝晶社账户可接收蓝晶的额度充足</span>，一旦确认接收，系统将冻结相应数目的坚果（JG）。然后立即通知转赠方转赠蓝晶至您蓝晶社账户
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
            {{!showConfPass ? '提交' : '确认'}}接收
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
        <v-card-title class="headline grey lighten-2" primary-title>接收成功</v-card-title>
        <v-card-text>接收成功，请点击确认至【订单】查看交易进度</v-card-text>
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
  import { doTradeBuy } from '@/api/trade'
  import { Base64 } from 'js-base64'
  import { getLogined } from '@/utils/auth'

  export default {
    name: 'HomeOrderBuy',
    props: {
      amountLimit: {
        type: Array,
        default: () => []
      },
      priceLimit: {
        type: Array,
        default: () => []
      }
    },
    data: () => ({
      headers: [
        {text: '微信头像', value: 'agencyUserPortraitUrl', sortable: false},
        {text: '接收单号', value: 'agencyNo', sortable: false},
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
      linkToOrder () {
        this.snackbar = false
        this.$router.push('/order')
      },
      doBuy (item) {
        if (!getLogined()) {
          // 没有登录
          this.$vNotice.error({
            text: '您还没有登录，请先登录！'
          })
          return false
        }
        this.rowClickItem = item
        let max = Math.min(this.amountLimit[1], item.remainTradableAmount)
        this.amountPlaceholder = `${this.amountLimit[0]}-${max}`
        this.rules.amountRule[2] = value => Number(value) >= this.amountLimit[0] && Number(value) <= max || `数量应该在${this.amountPlaceholder}之间`
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