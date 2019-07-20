<template>
  <div>
    <v-table :headers="headers" :items="items" hide-actions>
      <template v-slot:items="props">
        <td>{{props.item.name}}</td>
        <td>
          <v-avatar size="36"><img :src="props.item.avatar" :alt="props.item.name"></v-avatar>
        </td>
        <td>{{props.item.per}} ￥/个</td>
        <td>{{props.item.amount}}</td>
        <td>
          <v-tooltip top>
            <template v-slot:activator="{ on }">
              <v-btn color="warning" fab small dark v-on="on" @click="doBuy">
                <v-icon>add_shopping_cart</v-icon>
              </v-btn>
            </template>
            <span>购买</span>
          </v-tooltip>
        </td>
      </template>
    </v-table>

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
              placeholder="80-2000"
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
            <p>锁定的价格为：0.35元/蓝晶</p>
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
  export default {
    name: 'HomeOrderBuy',
    data: () => ({
      headers: [
        {text: '委托方', value: 'name', sortable: false},
        {text: '微信图像', value: 'avatar', sortable: false},
        {text: '单价', value: 'per'},
        {text: '数量', value: 'amount'},
        {text: '操作', value: 'opt', sortable: false}
      ],
      items: [
        {name: 'wyd1**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 2000, amount: 100},
        {name: 'wyd2**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 3000, amount: 100},
        {name: 'wyd3**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 100, amount: 100},
        {name: 'wyd4**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100},
        {name: 'wyd5**', avatar: 'https://avatars0.githubusercontent.com/u/9064066?v=4&s=460', per: 500, amount: 100}
      ],
      amount: '',
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
      }
    }),
    methods: {
      doBuy () {
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
            this.dialog = false
            this.snackbar = true
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