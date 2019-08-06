<template>
  <v-container grid-list-xl class="personal-page">
    <v-layout row wrap>
      <v-flex xs12 sm5 md3 offset-xs0 class="personal-page-left">
        <v-card class="elevation-12">
          <v-toolbar dark color="primary">
            <v-toolbar-title>个人信息</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <v-avatar
              size="130"
              color="grey lighten-4"
            >
              <img :src="form.imgSrc">
            </v-avatar>
          </v-card-text>
          <v-card-actions class="info-footer">
            <p><label>昵称：</label><span>{{form.username}}</span></p>
            <p><label>UUID：</label><span>{{form.uuid}}</span></p>
            <hr>
            <p class="secure-level"><label>安全等级：</label><span>{{form.secureLevel === 'low' ? '低' : form.secureLevel === 'middle' ? '中' : '高'}}</span></p>
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
                  <span class="personal-info-value">{{form.phone || '暂无'}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="setPhone('bind')" v-if="!form.phone">绑定</v-btn>
                    <v-btn flat color="warning" @click="setPhone('update')" v-else>修改</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">安全邮箱：</span>
                  <span class="personal-info-value">{{form.email || '暂无'}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="setEmail('bind')" v-if="!form.email">绑定</v-btn>
                    <v-btn flat color="warning" @click="setEmail('update')" v-else>修改</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">资金密码：</span>
                  <span class="personal-info-value">
                    {{form.showPassWord ? form.password : new Array(form.password.length).fill('*').join('')}}
                    <v-btn flat icon color="warning" @click="form.showPassWord = !form.showPassWord">
                      <v-icon>{{form.showPassWord ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn>
                  </span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="setPayCode('bind')" v-if="!form.password">设置</v-btn>
                    <v-btn flat color="warning" @click="setPayCode('update')" v-else>修改</v-btn>
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
                  <span class="personal-info-value">{{form.realVerify ? `${form.realName}，${form.idCard}` : '暂无'}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" to="/personal/idcard-info" v-if="!form.realVerify">去认证</v-btn>
                    <v-btn flat color="warning" to="/personal/idcard-info" v-if="form.realVerify">已认证</v-btn>
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
                <v-btn flat to="/personal/account-info">查看明细</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <v-card-text>
              <ul class="personal-info">
                <li>
                  <span class="personal-info-label">现⾦余额：</span>
                  <span class="personal-info-value">￥ {{form.cash}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="doCashModal('cashIn')">充值</v-btn>
                    <v-btn flat color="warning" @click="doCashModal('cashOut')">提现</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">⽀付宝：</span>
                  <span class="personal-info-value">{{form.aliPay || '暂无'}}</span>
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
                    <v-switch v-model="form.openAccountTip" :label="form.openAccountTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收最新挂单通知</span>
                  <div class="personal-info-switch">
                    <v-switch v-model="form.openBillTip" :label="form.openBillTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收交易信息通知</span>
                  <div class="personal-info-switch">
                    <v-switch v-model="form.openDealTip" :label="form.openDealTip ? 'ON' : 'OFF'"></v-switch>
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
              type="number"
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
            flat
            @click="cashInfo.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 手机绑定 -->
    <v-dialog v-model="bindPhone.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{computedTypeName(bindPhone.type)}}手机</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="bindPhone.phone"
              label="手机号"
              required
              :rules="rules.phoneRules"
            ></v-text-field>
          </v-form>
          <p class="text-center red--text">(手机号作⽤：⽤户找回您资⾦密码)</p>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bindPhone.doOpt"
          >
            确认
          </v-btn>
          <v-btn
            flat
            @click="bindPhone.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 邮箱绑定 -->
    <v-dialog v-model="bindEmail.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{computedTypeName(bindEmail.type)}}邮箱</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="bindEmail.email"
              label="邮箱"
              required
              :rules="rules.emailRules"
            ></v-text-field>
          </v-form>
          <p class="text-center red--text">(安全邮箱作⽤：⽤户找回您资⾦密码)</p>
          <blockquote class="blockquote">
            操作提示：
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;系统随后将发送⼀条认证邮件到您的邮箱，请⾄邮箱点击认证链接，完成安全邮箱认证。
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bindEmail.doOpt"
          >
            确认
          </v-btn>
          <v-btn
            flat
            @click="bindEmail.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 设置资金密码 -->
    <v-dialog v-model="capitalCode.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>设置资金密码</v-card-title>

        <v-card-text>
          <v-form>
            <v-text-field
              v-model="capitalCode.payCode"
              label="资金密码"
              type="password"
              required
              :rules="rules.payCodeRules"
            ></v-text-field>
            <v-text-field
              v-model="capitalCode.rePayCode"
              label="确认资金密码"
              type="password"
              required
              :rules="rules.rePayCodeRules"
            ></v-text-field>
          </v-form>
          <p class="text-center red--text">(资⾦密码作⽤：⽤于验证⾦额的⽀付。)</p>
          <blockquote class="blockquote">
            操作提示：
            <br>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;请输⼊⾄少含有<span class="red--text">⼀个⼤写和⼩写字母以及阿拉伯数字的6位及以上字符</span>组合。
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="capitalCode.doOpt"
          >
            确认设置
          </v-btn>
          <v-btn
            flat
            @click="capitalCode.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { queryInfo, doBindPhone, doBindEmail } from '@/api/user'
  import { doBindPayPassword, doCashIn, doCashOut } from '@/api/account'
  import { formatMoney, REGEX } from '@/utils/util'

  export default {
    name: 'Personal',
    data () {
      return {
        form: {
          imgSrc: '',
          username: '',
          uuid: '',
          secureLevel: '',
          phone: '',
          email: '',
          password: '',
          realName: '',
          idCard: '',
          cash: '',
          aliPay: '',
          openAccountTip: false,
          openBillTip: false,
          openDealTip: false,
          showPassWord: false,
          realVerify: false
        },
        cashInfo: {
          modal: false,
          text: '',
          type: '',
          cash: '',
          doOpt: () => {
            if (this.cashInfo.type === 'cashIn') {
              // 充值
              doCashIn(this.cashInfo.cash)
                .then(res => {
                  if (res.success) {
                    this.cashInfo.modal = false
                    this.cashInfo.cash = ''
                    this.$refs.cashForm.reset()
                    this.$vNotice.success({
                      text: '充值成功'
                    })
                    this.initUserInfo()
                  }
                })
            } else if (this.cashInfo.type === 'cashOut') {
              // 提现
              doCashOut(this.cashInfo.cash)
                .then(res => {
                  if (res.success) {
                    this.cashInfo.modal = false
                    this.cashInfo.cash = ''
                    this.$vNotice.success({
                      text: '提现成功'
                    })
                    this.initUserInfo()
                  }
                })
            }
            this.cashInfo.modal = false
          }
        },
        bindPhone: {
          modal: false,
          phone: '',
          type: '',
          doOpt: () => {
            doBindPhone(this.bindPhone.phone)
              .then(res => {
                if (res.success) {
                  this.bindPhone.modal = false
                  this.bindPhone.phone = ''
                  this.$vNotice.success({
                    text: '保存成功'
                  })
                  this.initUserInfo()
                }
              })
            
          }
        },
        bindEmail: {
          modal: false,
          email: '',
          type: '',
          doOpt: () => {
            doBindEmail(this.bindEmail.email)
              .then(res => {
                if (res.success) {
                  this.bindEmail.modal = false
                  this.bindEmail.email = ''
                  this.$vNotice.success({
                    text: '保存成功'
                  })
                  this.initUserInfo()
                }
              })
          }
        },
        capitalCode: {
          modal: false,
          payCode: '',
          rePayCode: '',
          doOpt: () => {
            doBindPayPassword(this.capitalCode.payCode)
              .then(res => {
                if (res.success) {
                  this.capitalCode.modal = false
                  this.capitalCode.payCode = ''
                  this.capitalCode.rePayCode = ''
                  this.$vNotice.success({
                    text: '保存成功'
                  })
                  this.initUserInfo()
                }
              })
          }
        },
        rules: {
          cashRule: [
            v => !!v && Number(v) > 0 || '请输入正确的金额'
          ],
          phoneRules: [
            v => !!v || '手机号不能为空',
            v => REGEX.phone.test(v) || '手机号格式不正确'
          ],
          emailRules: [
            v => !!v || '邮箱不能为空',
            v => REGEX.email.test(v) || '邮箱格式不正确'
          ],
          payCodeRules: [
            v => !!v || '资金密码不能为空',
            v => REGEX.password.test(v) || '资金密码格式不正确'
          ],
          rePayCodeRules: [
            v => !!v || '确认金密码不能为空',
            v => v === this.capitalCode.payCode || '两次密码不一致'
          ]
        }
      }
    },
    methods: {
      doCashModal (type) {
        this.cashInfo.modal = true
        this.cashInfo.type = type
        this.cashInfo.text = type === 'cashIn' ? '充值' : '提现'
        this.cashInfo.cash = ''
      },
      setEmail (type) {
        this.bindEmail.email = this.form.email
        this.bindEmail.type = type
        this.bindEmail.modal = true
      },
      setPhone (type) {
        this.bindPhone.phone = this.form.phone
        this.bindPhone.type = type
        this.bindPhone.modal = true
      },
      setPayCode () {
        this.capitalCode.modal = true
      },
      computedTypeName (type) {
        return type === 'bind' ? '绑定' : '修改'
      },
      initUserInfo () {
        queryInfo().then(res => {
          if (res.success) {
            let { acctInfoVO, basicInfoVO, notifySettingDO, securityInfoVO } = res.data
            notifySettingDO = notifySettingDO || {}
            this.form.username = basicInfoVO.userName
            this.form.uuid = basicInfoVO.userUuid
            this.form.secureLevel = basicInfoVO.securityLevel ? basicInfoVO.securityLevel.toLowerCase() : ''
            this.form.phone = securityInfoVO.phone
            this.form.email = securityInfoVO.email
            this.form.password = securityInfoVO.payPwd
            this.form.realName = securityInfoVO.realName
            this.form.realVerify = !!securityInfoVO.realVerify
            this.form.imgSrc = basicInfoVO.portraitPicUrl
            this.form.cash = formatMoney(acctInfoVO.usableAmount)
            this.form.openAccountTip = notifySettingDO.acceptAcctChangeNotify
            this.form.openBillTip = notifySettingDO.acceptTradeInfoNotify
            this.form.openDealTip =  notifySettingDO.acceptLatestAgencyNotify
          }
        })
      }
    },
    mounted () {
      this.initUserInfo()
    }
  }
</script>

<style lang="stylus">
.personal-page {
  .v-toolbar__content {
    height: 48px !important;
  }
  &-left {
    text-align: center;
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
          a,
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