<template>
  <v-container grid-list-xl text-xs-center class="personal-page">
    <v-layout row wrap>
      <v-flex xs12 sm5 md2 offset-xs0 offset-lg1 class="personal-page-left">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>个人信息</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-avatar
              size="130"
              color="grey lighten-4"
            >
              <img :src="imgSrc">
            </v-avatar>
          </v-card-text>
          <v-card-actions class="info-footer">
            <p><label>昵称：</label><span>{{username}}</span></p>
            <p><label>UUID：</label><span>{{uuid}}</span></p>
            <hr>
            <p class="secure-level"><label>安全等级：</label><span>{{secureLevel === 'low' ? '低' : secureLevel === 'medium' ? '中' : '高'}}</span></p>
          </v-card-actions>
        </v-card>
      </v-flex>

      <v-flex xs12 sm5 md8 offset-xs0 class="personal-page-right">
        <template v-if="$route.name === 'Personal'">
          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>账户与安全</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ul class="personal-info">
                <li>
                  <span class="personal-info-label">手机号：</span>
                  <span class="personal-info-value">{{phone}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning">获取微信手机号</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">安全邮箱：</span>
                  <span class="personal-info-value">{{email}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning">绑定</v-btn>
                    <v-btn flat color="warning">修改</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">资金密码：</span>
                  <span class="personal-info-value">
                    {{showPassWord ? password : new Array(password.length).fill('*').join('')}}
                    <v-btn flat icon color="warning" @click="showPassWord = !showPassWord">
                      <v-icon>{{showPassWord ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn>
                  </span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning">设置</v-btn>
                    <v-btn flat color="warning">修改</v-btn>
                  </div>
                </li>
              </ul>
            </v-card-text>
          </v-card>

          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>身份认证<span class="caption">（请如实填写您的⾝份信息，已经认证不可修改）</span></v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ul class="personal-info">
                <li>
                  <span class="personal-info-label">实名认证：</span>
                  <span class="personal-info-value">{{realName}}，{{idCard}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="$router.push('/personal/idcard-info')">去认证</v-btn>
                    <v-btn flat color="warning">已认证</v-btn>
                  </div>
                </li>
              </ul>
            </v-card-text>
          </v-card>

          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>账户信息</v-toolbar-title>
              <v-spacer></v-spacer>
              <v-toolbar-items>
                <v-btn flat>查看明细</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <ul class="personal-info">
                <li>
                  <span class="personal-info-label">现⾦余额：</span>
                  <span class="personal-info-value">￥ {{cash}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="doCashModal('cashIn')">充值</v-btn>
                    <v-btn flat color="warning" @click="doCashModal('cashOut')">提现</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">⽀付宝：</span>
                  <span class="personal-info-value">{{aliPay}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning">绑定</v-btn>
                    <v-btn flat color="warning">修改</v-btn>
                    <v-btn flat color="warning">设为默认</v-btn>
                  </div>
                </li>
              </ul>
            </v-card-text>
          </v-card>

          <v-card class="elevation-12">
            <v-toolbar dark color="primary">
              <v-toolbar-title>消息提醒</v-toolbar-title>
            </v-toolbar>
            <v-card-text>
              <ul class="personal-info">
                <li>
                  <span class="personal-info-label">接收账户变动提醒</span>
                  <div class="personal-info-switch">
                    <v-switch v-model="openAccountTip" :label="openAccountTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收最新挂单通知</span>
                  <div class="personal-info-switch">
                    <v-switch v-model="openBillTip" :label="openBillTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收交易信息通知</span>
                  <div class="personal-info-switch">
                    <v-switch v-model="openDealTip" :label="openDealTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
              </ul>
            </v-card-text>
          </v-card>
        </template>
        
        <v-scroll-x-transition hide-on-leave>
          <router-view></router-view>
        </v-scroll-x-transition>
      </v-flex>
    </v-layout>

    <!-- 提现/充值 -->
    <v-dialog v-model="cashInfo.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{cashInfo.text}}</v-card-title>

        <v-card-text>
          <v-form
            ref="cashForm"
            lazy-validation
          >
            <v-text-field
              v-model="cashInfo.cash"
              :label="cashInfo.text + '金额'"
              required
              :rules="rules.cashRule"
            ></v-text-field>
          </v-form>
          <blockquote class="blockquote" style="padding: 0" v-if="cashInfo.type === 'cashOut'">
            操作提示：
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每位⽤户<span class="red--text font-weight-bold">⼀天只能提现⼀次</span>
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;申请提现后，资⾦会在<span class="red--text font-weight-bold">半⼩时内</span>汇款⾄您绑定的⽀付宝或者银⾏账户内
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如超时未到账，请⽹站下⽅联系客服解决。
          </blockquote>
          
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="cashInfo.doOpt"
          >
            确认{{cashInfo.text}}
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="cashInfo.modal = false"
          >
            取消{{cashInfo.text}}
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  export default {
    name: 'Personal',
    data () {
      return {
        imgSrc: 'https://picsum.photos/500/300?image=10',
        username: 'weishi',
        uuid: '1000001',
        secureLevel: 'low',
        phone: '13813813813',
        email: '2342788232@qq.com',
        password: '123456',
        realName: '李军挺',
        idCard: '420832199302938293',
        cash: 1000,
        aliPay: '2342788232@qq.com',
        openAccountTip: false,
        openBillTip: false,
        openDealTip: false,
        showPassWord: false,
        cashInfo: {
          modal: false,
          text: '',
          type: '',
          cash: '',
          doOpt: (type) => {
            this.cashInfo.modal = false
          }
        },
        rules: {
          cashRule: []
        }
      }
    },
    methods: {
      doCashModal (type) {
        this.cashInfo.modal = true
        this.cashInfo.type = type
        this.cashInfo.text = type === 'cashIn' ? '充值' : '提现'
        this.cashInfo.cash = ''
      }
    }
  }
</script>

<style lang="stylus">
.personal-page {
  .v-toolbar__content {
    height: 48px !important;
  }
  &-left {
    .info-footer {
      display: block;
      text-align: left;
      p {
        position: relative;
        label {
          font-size: 16px;
          font-weight: bold;
        }
        span {
          position: absolute;
          top: 0;
          right: 0;
        }
        &.secure-level {
          margin: 5px 0;
          label {
            font-size: 16px;
            font-weight: bold;
          }
          span {
            font-size: 16px;
            font-weight: bold;
            color: red;
          }
        }
      }
    }
  }
  &-right {
    .elevation-12 {
      margin-bottom: 24px;
      .personal-info {
        li {
          position: relative;
          text-align: left;
          border-bottom: 1px solid #ddd;
        }
        &-label {
          display: inline-block
          height: 40px;
          line-height: 40px;
          min-width: 100px;
          text-align: right;
        }
        &-value {
          display: inline-block
          height: 40px;
          line-height: 40px;
        }
        &-opt {
          display: inline-block
          position: absolute;
          right: 0px;
          top: -4px;
          button {
            padding: 4px;
            min-width: 16px;
          }
        }
        &-switch {
          display: inline-block
          position: absolute;
          right: 0px;
          top: -8px;
        }
      }
    }
  }
}

.my-app-phone {
  .personal-info-value {
    font-size: 14px;
  }
  .personal-info-opt {
    display: block !important;
    position: relative !important;
    text-align: right;
  }
}
</style>