<template>
  <v-container fluid grid-list-md>
    <!-- pc -->
    <v-data-iterator
      v-if="!$root.smallScreen"
      :items="items"
      content-tag="v-layout"
      row
      wrap
      hide-actions
    >
      <template v-slot:item="{item}">
        <v-flex
          xs12
          sm6
          md6
          lg6
        >
          <v-card>
            <v-card-title><h4>{{ item.name }}</h4></v-card-title>
            <v-divider></v-divider>
            <v-list dense>
              <v-list-tile>
                <v-list-tile-content class="subheading font-weight-bold" style="display: -webkit-box">数量<v-icon>sort</v-icon></v-list-tile-content>
                <v-list-tile-content class="align-end subheading font-weight-bold" style="display: -webkit-box"><v-icon>attach_money</v-icon>价格</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="item in item.list" :key="item.agencyNo">
                <v-list-tile-content>{{item.agencyAmount}}</v-list-tile-content>
                <v-list-tile-content class="align-end">￥ {{ item.agencyAmount * item.agencyUnitPrice }}</v-list-tile-content>
              </v-list-tile>
              <v-list-tile>
                <v-btn block color="warning" dark @click="item.btnClick(item.type)">{{ item.btnText }}</v-btn>
              </v-list-tile>
            </v-list>
          </v-card>
        </v-flex>
      </template>
    </v-data-iterator>

    <!-- phone -->
    <v-card class="home-order" v-else>
      <v-layout row wrap>
        <v-flex xs12>
          <v-card color="transparent darken-2">
            <v-card-title class="primary white--text">
              <div class="title">委托</div>
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
                  v-for="item in items"
                  :key="item.type"
                  ripple
                >
                  <v-icon>{{item.icon}}</v-icon>
                  {{item.name}}
                </v-tab>
                <v-tab-item
                  v-for="item in items"
                  :key="item.key"
                >
                  <v-card>
                    <v-list dense>
                      <v-list-tile>
                        <v-list-tile-content class="subheading font-weight-bold" style="display: -webkit-box">数量<v-icon>sort</v-icon></v-list-tile-content>
                        <v-list-tile-content class="align-end subheading font-weight-bold" style="display: -webkit-box"><v-icon>attach_money</v-icon>价格</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile v-for="item in item.list" :key="item.id">
                        <v-list-tile-content>{{item.agencyAmount}}</v-list-tile-content>
                        <v-list-tile-content class="align-end">￥ {{ item.agencyAmount * item.agencyUnitPrice }}</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile>
                        <v-btn block color="warning" dark @click="item.btnClick(item.type)">{{ item.btnText }}</v-btn>
                      </v-list-tile>
                    </v-list>
                  </v-card>
                </v-tab-item>
              </v-tabs>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>

    <v-dialog v-model="dialogInfo.dialog" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{dialogInfo.title}}</v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
          
            <v-text-field
              v-model="dialogInfo.amount"
              v-show="!dialogInfo.showConfPass"
              :label="dialogInfo.title + '的数量'"
              placeholder="80-2000"
              required
              :rules="rules.amountRule"
            ></v-text-field>

            <v-text-field
              v-model="dialogInfo.perPrice"
              v-show="!dialogInfo.showConfPass"
              :label="dialogInfo.title + '的单价'"
              placeholder="0.1-10000"
              required
              :rules="rules.perPriceRule"
            ></v-text-field>

            <v-text-field
              v-show="dialogInfo.type === 'buy' && dialogInfo.showConfPass"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :rules="rules.confPassRule"
              :type="passwordVisible ? 'text' : 'password'"
              label="请输入资金密码"
              v-model="dialogInfo.password"
              @click:append="passwordVisible = !passwordVisible"
            ></v-text-field>
          </v-form>
          
          <p v-html="dialogInfo.tip" v-show="!dialogInfo.showConfPass"></p>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialogInfo.onOk"
          >
            {{'确认委托' + dialogInfo.title}}
          </v-btn>
          <v-btn
            flat
            @click="dialogInfo.onCancel"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialogInfo.successModal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{dialogInfo.title}}成功</v-card-title>
        <v-card-text>委托{{dialogInfo.title}}成功，请点击确认至【订单】查看委托详情</v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="pink"
            flat
            @click="dialogInfo.successModal = false"
          >
            确认
          </v-btn>
          <v-btn
            color="grey"
            flat
            @click="dialogInfo.successModal = false"
          >
            关闭
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { doAgencyBuy, doAgencySale, getAgencyTop5 } from '@/api/agency'

  export default {
    name: 'Delegate',
    created () {
      this.initTop5()
    },
    data () {
      return {
        selectOrder: null,
        items: [
          {
            type: 'sell',
            name: '前五卖单',
            btnText: '我要委托卖',
            btnClick: (type) => {
              this.doOrder(type)
            },
            list: []
          },
          {
            type: 'buy',
            name: '前五买单',
            btnText: '我要委托买',
            btnClick: (type) => {
              this.doOrder(type)
            },
            list: []
          }
        ],
        dialogInfo: {
          dialog: false,
          title: '',
          type: '',
          amount: '',
          perPrice: '',
          password: '',
          tip: '',
          onOk: '',
          onCancel: () => {
            this.dialogInfo.dialog = false
          },
          successModal: false,
          showConfPass: false
        },
        rules: {
          amountRule: [
            value => !!value || '数量不能为空',
            value => !Number.isNaN(Number(value)) || '数量不正确',
            value => Number(value) >= 20 && Number(value) <= 2000 || '数量应该在80-2000之间'
          ],
          perPriceRule: [
            value => !!value || '数量不能为空',
            value => !Number.isNaN(Number(value)) || '数量不正确',
            value => Number(value) >= 0.1 && Number(value) <= 10000 || '数量应该在0.1-10000之间'
          ],
          confPassRule: []
        },
        passwordVisible: false
      }
    },
    methods: {
      doOrder (type) {
        this.$refs.form.reset()
        this.dialogInfo.dialog = true
        this.dialogInfo.type = type
        this.dialogInfo.amount = '' 
        this.dialogInfo.perPrice = ''
        this.dialogInfo.showConfPass = false
        if (type === 'sell') {
          this.dialogInfo.title = '卖出'
          this.dialogInfo.tip = `
            <blockquote class="blockquote" style="padding: 0">
              委托卖出提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;委托卖出前请确认您的蓝晶社账号中<span class="red--text font-weight-bold">蓝晶数量充足</span>，以保证能够正常完成交易。一旦发现卖方谎报数据，平台将记录个人诚信档案，在一段时间内禁止登陆平台。谢谢合作！
            </blockquote>
          `
          this.dialogInfo.onOk = this.doSell
        } else {
          this.dialogInfo.title = '买入',
          this.dialogInfo.tip = `
            <blockquote class="blockquote" style="padding: 0">
              委托买入提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;委托买入前请确认您的现金账户中<span class="red--text font-weight-bold">余额充足</span>，以保证能够正常完成交易。一旦确认委托买入，系统自动冻结相应数目的金额，直至交易完成或者委托买入被取消
            </blockquote>
          `
          this.dialogInfo.onOk = this.doBuy
        }
      },
      doSell () {
        // 卖出操作
        let flag = this.$refs.form.validate()
        if (flag) {
          doAgencySale({
            agencyAmount: this.dialogInfo.amount,
            agencyUnitPrice: this.dialogInfo.perPrice
          }).then(res => {
            if (res.success) {
              this.dialogInfo.dialog = false
              this.dialogInfo.successModal = true
            }
          })
        }
      },
      doBuy () {
        // 买入操作
        let flag = this.$refs.form.validate()
        if (this.dialogInfo.showConfPass) {
          // 输入了密码，校验密码
          if (flag) {
            doAgencyBuy({
              agencyAmount: this.dialogInfo.amount,
              agencyUnitPrice: this.dialogInfo.perPrice,
              payPwd: this.dialogInfo.password
            }).then(res => {
              if (res.success) {
                this.dialogInfo.dialog = false
                this.dialogInfo.successModal = true
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
            this.dialogInfo.showConfPass = true
          }
        }
      },
      initTop5 () {
        getAgencyTop5().then(res => {
          if (res.success) {
            this.items[0].list = res.data.top5AgengcySalelist
            this.items[1].list = res.data.top5AgengcyBuylist
          }
        })
      }
    }
  }
</script>

<style lang="stylus">

</style>
