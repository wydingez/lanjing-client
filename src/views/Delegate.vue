<template>
  <v-container fluid grid-list-md class="delegate">
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
                <v-list-tile-content class="align-end subheading font-weight-bold" style="display: -webkit-box"><v-icon>attach_money</v-icon>{{item.typeDesc}}价</v-list-tile-content>
              </v-list-tile>
              <v-list-tile v-for="item in item.list" :key="item.agencyNo" class="list-content">
                <v-list-tile-content>{{item.agencyAmount}}</v-list-tile-content>
                <v-list-tile-content class="align-end">{{ item.agencyUnitPrice }} JG</v-list-tile-content>
              </v-list-tile>
              <div class="no-item" v-if="item.list.length === 0">
                暂无数据
              </div>
              <v-list-tile class="list-btn">
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
              <div class="title">发布</div>
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
                        <v-list-tile-content class="align-end subheading font-weight-bold" style="display: -webkit-box"><v-icon>attach_money</v-icon>{{item.typeDesc}}价</v-list-tile-content>
                      </v-list-tile>
                      <v-list-tile v-for="item in item.list" :key="item.id">
                        <v-list-tile-content>{{item.agencyAmount}}</v-list-tile-content>
                        <v-list-tile-content class="align-end">JG {{ item.agencyUnitPrice }}</v-list-tile-content>
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
        <v-card-title class="headline grey lighten-2" primary-title>发布{{dialogInfo.title}}</v-card-title>

        <v-card-text>
          <v-form
            ref="form"
            lazy-validation
          >
          
            <v-text-field
              v-model="dialogInfo.amount"
              v-show="!dialogInfo.showConfPass"
              :label="dialogInfo.title + '的数量'"
              :placeholder="amountLimitDesc"
              required
              :rules="rules.amountRule"
            ></v-text-field>

            <v-text-field
              v-model="dialogInfo.perPrice"
              v-show="!dialogInfo.showConfPass"
              :label="dialogInfo.title + '的单价'"
              :placeholder="priceLimitDesc"
              required
              :rules="rules.perPriceRule"
            ></v-text-field>

            <v-text-field
              v-show="dialogInfo.type === 'buy' && dialogInfo.showConfPass"
              :append-icon="passwordVisible ? 'visibility' : 'visibility_off'"
              :rules="rules.confPassRule"
              :type="passwordVisible ? 'text' : 'password'"
              label="请输入JG安全密码"
              v-model="dialogInfo.password"
              @click:append="passwordVisible = !passwordVisible"
            ></v-text-field>

            <div>{{dialogInfo.title}}总计： <span class="red--text font-weight-bold">{{totalPrice}}</span> JG</div>
            <div v-if="dialogInfo.type === 'sell'">当前转赠费率： <span v-html="tradeRateHtml"></span></div>
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
            {{'确认发布' + dialogInfo.title}}
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
        <v-card-text>发布{{dialogInfo.title}}成功，请点击确认至【订单】查看发布详情</v-card-text>
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
  import { Base64 } from 'js-base64'
  import limitMixins from '@/mixin/limit'

  export default {
    name: 'Delegate',
    mixins: [limitMixins],
    created () {
      this.initLimit()
      this.initTop5()
    },
    computed: {
      totalPrice () {
        let price = this.dialogInfo.amount * this.dialogInfo.perPrice
        return isNaN(price) ? '' : price.toFixed(2)
      },
      rules () {
        return {
          amountRule: [
            value => !!value || '数量不能为空',
            value => !Number.isNaN(Number(value)) || '数量不正确',
            value => Number(value) >= this.amountLimit[0] && Number(value) <= this.amountLimit[1] || `数量应该在${this.amountLimitDesc}之间`
          ],
          perPriceRule: [
            value => !!value || '单价不能为空',
            value => !Number.isNaN(Number(value)) || '单价不正确',
            value => Number(value) >= this.priceLimit[0] && Number(value) <= this.priceLimit[1] || `单价应该在${this.priceLimitDesc}之间`
          ],
          confPassRule: []
        }
      }
    },
    data () {
      return {
        selectOrder: null,
        items: [
          {
            type: 'sell',
            typeDesc: '转增',
            name: '前五转赠单',
            btnText: '我要发布转赠',
            btnClick: (type) => {
              this.doOrder(type)
            },
            list: []
          },
          {
            type: 'buy',
            typeDesc: '接收',
            name: '前五接收单',
            btnText: '我要发布接收',
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
          this.dialogInfo.title = '转赠'
          this.dialogInfo.tip = `
            <blockquote class="blockquote" >
              发布转赠提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布转赠前请确认您的蓝晶社账户中<span class="red--text font-weight-bold">蓝晶数量充足</span>，以保证能够正常完成转赠。
            </blockquote>
          `
          this.dialogInfo.onOk = this.doSell
        } else {
          this.dialogInfo.title = '接收',
          this.dialogInfo.tip = `
            <blockquote class="blockquote" >
              发布接收提醒：<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;发布接收前请确认您账户中的<span class="red--text font-weight-bold">坚果（JG）数量充足</span>，以保证能够正常完成发布接收。确认发布接收后，系统将冻结相应数目的坚果（JG），直至完成全部接收或者发布的接收被取消。
            </blockquote>
          `
          this.dialogInfo.onOk = this.doBuy
        }
      },
      doSell () {
        // 转赠操作
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
        // 接收操作
        let flag = this.$refs.form.validate()
        if (this.dialogInfo.showConfPass) {
          // 输入了密码，校验密码
          if (flag) {
            doAgencyBuy({
              agencyAmount: this.dialogInfo.amount,
              agencyUnitPrice: this.dialogInfo.perPrice,
              payPwd: Base64.encode(this.dialogInfo.password)
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
            this.items[0].list = res.data.top5AgencySalelist
            this.items[1].list = res.data.top5AgencyBuylist
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
.delegate {
  .v-list {
    position: relative;
    min-height: 300px;
    .no-item {
      text-align: center;
      position: absolute;
      width: 100%;
      bottom: 150px;
      font-size: 20px;
    }
    .list-btn {
      position: absolute;
      width: 100%;
      bottom: 16px;
    }
  }
}
</style>
