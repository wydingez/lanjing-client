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
                  <span class="personal-info-label">登陆密码：</span>
                  <span class="personal-info-value">
                    {{form.loginPassword ? (form.showLoginPassWord ? form.loginPassword : new Array(form.loginPassword.length).fill('*').join('')) : '暂无'}}
                    <!-- <v-btn flat icon color="warning" @click="form.showLoginPassWord = !form.showLoginPassWord" v-if="form.loginPassword">
                      <v-icon>{{form.showLoginPassWord ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn> -->
                  </span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="setLoginPassword('bind')" v-if="!form.loginPassword">设置</v-btn>
                    <v-btn flat color="warning" @click="setLoginPassword('update')" v-else>修改</v-btn>
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
                  <span class="personal-info-label">JG安全密码：</span>
                  <span class="personal-info-value">
                    {{form.showPassWord ? form.password : new Array(form.password.length).fill('*').join('')}}
                    <!-- <v-btn flat icon color="warning" @click="form.showPassWord = !form.showPassWord">
                      <v-icon>{{form.showPassWord ? 'visibility' : 'visibility_off'}}</v-icon>
                    </v-btn> -->
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
                  <span class="personal-info-value">{{realVertifyDesc}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" to="/personal/idcard-info" v-if="['02', '99'].includes(form.realVerifyStatus)">去认证</v-btn>
                    <v-btn flat color="warning" v-if="form.realVerifyStatus === '00'">已认证</v-btn>
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
                  <span class="personal-info-label">坚果（JG）剩余：</span>
                  <span class="personal-info-value">JG {{form.cash}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" @click="doCashModal('cashIn')">买入坚果（JG）</v-btn>
                    <v-btn flat color="warning" @click="doCashModal('cashOut')">退回坚果（JG）</v-btn>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">⽀付宝：</span>
                  <span class="personal-info-value">{{form.aliPay || '暂无'}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" v-if="!form.aliPay" @click="setZfb('bind')">绑定</v-btn>
                    <v-btn flat color="warning" v-else @click="setZfb('bind')">修改</v-btn>
                    <!-- <v-btn flat color="warning">设为默认</v-btn> -->
                  </div>
                </li>
                <!-- <li>
                  <span class="personal-info-label">银行卡号：</span>
                  <span class="personal-info-value">{{form.bankCard || '暂无'}}</span>
                  <div class="personal-info-opt">
                    <v-btn flat color="warning" v-if="!form.bankCard" @click="setBankCard('bind')">绑定</v-btn>
                    <v-btn flat color="warning" v-else @click="setBankCard('bind')">修改</v-btn>
                  </div>
                </li> -->
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
                    <v-switch @change="changeNotify('acctChange', $event)" v-model="form.openAccountTip" :label="form.openAccountTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收最新挂单通知</span>
                  <div class="personal-info-switch">
                    <v-switch @change="changeNotify('agency', $event)" v-model="form.openBillTip" :label="form.openBillTip ? 'ON' : 'OFF'"></v-switch>
                  </div>
                </li>
                <li>
                  <span class="personal-info-label">接收交易信息通知</span>
                  <div class="personal-info-switch">
                    <v-switch @change="changeNotify('trade', $event)" v-model="form.openDealTip" :label="form.openDealTip ? 'ON' : 'OFF'"></v-switch>
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

    <!-- 退回坚果（JG）/买入坚果（JG） -->
    <v-dialog v-model="cashInfo.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>
          {{cashInfo.text}}
          <v-spacer></v-spacer>
          <v-btn flat color="warning" style="margin-top: 0px; margin-bottom: 0px;" @click="dealDetail.modal = true; dealDetail.info = cashInfo">{{cashInfo.text}}明细</v-btn>
        </v-card-title>

        <v-card-text>
          <v-form
            ref="cashForm"
            lazy-validation
          >
            <div v-if="cashInfo.type === 'cashIn'" class="cash-in-wrapper">
              <div>{{cashInfo.text + '数量'}}</div>
              <v-radio-group v-model="cashInfo.cashSelect">
                <v-radio
                  v-for="n in [1000, 2000, 5000]"
                  :key="n"
                  :label="n + 'JG'"
                  :value="n"
                ></v-radio>
              </v-radio-group>
              <v-text-field
                v-model="cashInfo.cash"
                label="其他"
                type="number">
              </v-text-field>
            </div>

            <template v-else>
               <v-text-field
                v-model="cashInfo.cash"
                :label="cashInfo.text + '数量'"
                required
                type="number"
                :rules="rules.cashRule"
              ></v-text-field>
            </template>

            锚定兑换比例：1坚果（JG）= 1元
          </v-form>
          <blockquote class="blockquote" >
            操作提示：
            <br>

            <template v-if="cashInfo.type === 'cashIn'">
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认买入坚果（JG）后，系统将会在<span class="red--text font-weight-bold">半个小时内到账</span>，并以公众号信息的形式提示您！
            </template>

            <template v-else>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;每位用户<span class="red--text font-weight-bold">一天</span>只能退回坚果（JG）<span class="red--text font-weight-bold">一次</span>，且退回坚果（JG）的数量必须是10的整数倍。
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认退回坚果（JG）后，退款会在当天<span class="red--text font-weight-bold">21时之前</span>退回到您的支付宝账户内，所以请务必确认支付宝账户信息和您实名制认证信息一致，否则会引起退款失败。
              <br>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;如退款结算开始的30分钟后仍未收到退款，请在网站下方联系客服解决。
            </template>
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
            提交{{cashInfo.text}}
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

    <!-- 买入坚果（JG） / 退回坚果（JG）明细 -->
    <v-dialog v-model="dealDetail.modal" width="800">
      <deal-detail :info="dealDetail.info" @close="dealDetail.modal = false" v-if="dealDetail.modal"></deal-detail>
    </v-dialog>

    <!-- 手机绑定 -->
    <v-dialog v-model="bindPhone.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{computedTypeName(bindPhone.type)}}手机</v-card-title>

        <v-card-text>
          <v-form ref="phoneForm" lazy-validation>
            <v-text-field
              v-model="bindPhone.phone"
              label="手机号"
              required
              :rules="rules.phoneRules"
            ></v-text-field>
          </v-form>
          <p class="red--text">
            重要提醒：
          </p>
          <blockquote>手机号将作为蓝晶转赠/接收的重要依据，请务必保证您所填的手机号是您注册蓝晶社账号的手机号，否则因手机号错误而造成蓝晶在转赠或者接收时出现问题，本网站概不负责！</blockquote>
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
          <v-form ref="emailForm" lazy-validation>
            <v-text-field
              v-model="bindEmail.email"
              label="邮箱"
              required
              :rules="rules.emailRules"
            ></v-text-field>
          </v-form>
          <p class="text-center red--text">(重要提醒：安全邮箱将作为您找回登录密码和JG安全密码的主要途径，请填写您常用的联系邮箱。)</p>
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

    <!-- 绑定支付宝 -->
    <v-dialog v-model="bindZFB.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{computedTypeName(bindZFB.type)}}支付宝</v-card-title>

        <v-card-text>
          <v-form ref="zfbForm" lazy-validation>
            <v-text-field
              v-model="bindZFB.zfb"
              label="支付宝账号"
              required
              :rules="rules.zfbRules"
            ></v-text-field>
          </v-form>
          <p class="text-center red--text">(支付宝账号：用于买入坚果（JG）/提线操作)</p>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bindZFB.doOpt"
          >
            确认
          </v-btn>
          <v-btn
            flat
            @click="bindZFB.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 绑定银行卡号 -->
    <v-dialog v-model="bindBankCard.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>{{computedTypeName(bindBankCard.type)}}银行卡号 </v-card-title>

        <v-card-text>
          <v-form ref="bankCardForm" lazy-validation>
            <v-text-field
              v-model="bindBankCard.bankCard"
              label="银行卡号"
              required
              :rules="rules.bankCardRule"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bindBankCard.doOpt"
          >
            确认
          </v-btn>
          <v-btn
            flat
            @click="bindBankCard.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 设置JG安全密码 -->
    <v-dialog v-model="capitalCode.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>设置JG安全密码</v-card-title>

        <v-card-text>
          <v-form ref="payCodeForm" lazy-validation>
            <v-text-field
              v-model="capitalCode.oldPayCode"
              label="原始JG安全密码"
              type="password"
              required
              :rules="rules.oldPayCodeRules"
            ></v-text-field>
            <v-text-field
              v-model="capitalCode.payCode"
              label="新JG安全密码"
              type="password"
              required
              :rules="rules.payCodeRules"
            ></v-text-field>
            <v-text-field
              v-model="capitalCode.rePayCode"
              label="确认JG安全密码"
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

    <!-- 设置登陆密码 -->
    <v-dialog v-model="bindLoginPassword.modal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>设置登陆密码</v-card-title>

        <v-card-text>
          <v-form ref="loginPasswordForm" lazy-validation>
            <v-text-field
              v-model="bindLoginPassword.oldPassword"
              label="原始登陆密码"
              type="password"
              required
              :rules="rules.oldPasswordRules"
            ></v-text-field>
            <v-text-field
              v-model="bindLoginPassword.password"
              label="新登陆密码"
              type="password"
              required
              :rules="rules.loginPassRules"
            ></v-text-field>
            <v-text-field
              v-model="bindLoginPassword.newPassword"
              label="确认登陆密码"
              type="password"
              required
              :rules="rules.loginNewPassRules"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="bindLoginPassword.doOpt"
          >
            确认设置
          </v-btn>
          <v-btn
            flat
            @click="bindLoginPassword.modal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 充值确认 -->
    <v-dialog v-model="cashInfo.confirmModal" width="500" persistent>
      <v-card>
        <v-card-title class="headline grey lighten-2" primary-title>支付确认</v-card-title>

        <v-card-text>
          <blockquote class="blockquote">
            您提交买入的坚果（JG）数量为：{{this.cashInfo.cashSelect || this.cashInfo.cash}}
            <br>
            你需要支付的金额为：{{this.cashInfo.cashSelect || this.cashInfo.cash}}元
            <br>
            <br>
            <p class="red--text text-center">请在五分钟内完成支付到下面的账号！</p>
            <br>
            <p>支付宝用户名：嘉兴市坚果网络科技有限公司</p>
            <p>
              支付宝账号：admin@utyue.com
              <v-btn
                color="pink"
                flat
                v-clipboard:copy="'admin@utyue.com'"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
                style="padding: 0 5px"
              >
                【点击复制】 
              </v-btn>
            </p>
            <p>支付宝二维码：</p>
            <div class="text-center">
              <img src="static/alipay.png" :height="300" :width="220"/>
              <p class="text-center red--text">（长按二维码另存图片到本地）</p>
            </div>
          </blockquote>
        </v-card-text>
        <v-divider></v-divider>

        <v-card-actions>
          <p class="red--text">（点击确认后请前往支付宝支付）</p>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="cashInfo.linkAliPay"
          >
            确认
          </v-btn>
          <v-btn
            flat
            @click="cashInfo.confirmModal = false"
          >
            取消
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
  import { queryInfo, doBindPhone, doBindEmail, doBindZfb, doBindBankCard, doResetLoginPassword } from '@/api/user'
  import { doBindPayPassword, doUpdatePayPassword, doCashIn, doCashOut } from '@/api/account'
  import { doChangeNotify } from '@/api/setting'
  import { formatMoney, REGEX } from '@/utils/util'
  import DealDetail from './portal/PersonalAccountInfo'
  import { Base64 } from 'js-base64'

  export default {
    name: 'Personal',
    components: {DealDetail},
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
          loginPassword: '',
          realName: '',
          idCard: '',
          cash: '',
          aliPay: '',
          bankCard: '',
          openAccountTip: false,
          openBillTip: false,
          openDealTip: false,
          showPassWord: false,
          showLoginPassWord: false,
          realVerifyStatus: ''
        },
        dealDetail: {
          modal: false,
          info: {}
        },
        cashInfo: {
          modal: false,
          confirmModal: false,
          text: '',
          type: '',
          cash: '',
          cashSelect: '',
          linkAliPay: () => {
            doCashIn(this.cashInfo.cashSelect || this.cashInfo.cash)
            .then(res => {
              if (res.success) {
                this.cashInfo.modal = false
                this.cashInfo.confirmModal = false
                this.cashInfo.cashSelect = ''
                this.cashInfo.cash = ''
                
                this.$vNotice.success({
                  text: '买入坚果（JG）成功'
                })
                this.initUserInfo()
              }
            })
          },
          doOpt: () => {
            if (this.doFormValidate('cash')) {
              if (this.cashInfo.type === 'cashIn') {
                // 买入坚果（JG）
                if (this.cashInfo.cashSelect || this.cashInfo.cash) {
                  this.cashInfo.confirmModal = true
                  this.cashInfo.modal = false
                } else {
                  this.$vNotice.error({
                    text: '请输入买入坚果数量'
                  })
                }
              } else if (this.cashInfo.type === 'cashOut') {
                // 退回坚果（JG）
                doCashOut(this.cashInfo.cash)
                .then(res => {
                  if (res.success) {
                    this.cashInfo.modal = false
                    this.cashInfo.cash = ''
                    this.$vNotice.success({
                      text: '退回坚果（JG）成功'
                    })
                    this.initUserInfo()
                    this.cashInfo.modal = false
                  }
                })
              }
            }
          }
        },
        bindPhone: {
          modal: false,
          phone: '',
          type: '',
          doOpt: () => {
            if (this.doFormValidate('phone')) {
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
          }
        },
        bindEmail: {
          modal: false,
          email: '',
          type: '',
          doOpt: () => {
            if (this.doFormValidate('email')) {
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
          }
        },
        bindZFB: {
          modal: false,
          zfb: '',
          type: '',
          doOpt: () => {
            if (this.doFormValidate('zfb')) {
              doBindZfb(this.bindZFB.zfb)
                .then(res => {
                  if (res.success) {
                    this.bindZFB.modal = false
                    this.bindZFB.zfb = ''
                    this.$vNotice.success({
                      text: '保存成功'
                    })
                    this.initUserInfo()
                  }
                })
            }
          }
        },
        bindBankCard: {
          modal: false,
          bankCard: '',
          type: '',
          doOpt: () => {
            if (this.doFormValidate('bankCard')) {
              doBindBankCard(this.bindBankCard.bankCard)
                .then(res => {
                  if (res.success) {
                    this.bindBankCard.modal = false
                    this.bindBankCard.bankCard = ''
                    this.$vNotice.success({
                      text: '保存成功'
                    })
                    this.initUserInfo()
                  }
                })
            }
          }
        },
        capitalCode: {
          modal: false,
          oldPayCode: '',
          payCode: '',
          rePayCode: '',
          doOpt: () => {
            if (this.doFormValidate('payCode')) {
              if (this.form.password) {
                // 存在，则修改
                doUpdatePayPassword({
                  password: Base64.encode(this.capitalCode.oldPayCode),
                  newPassword: Base64.encode(this.capitalCode.payCode)
                }).then(res => {
                  if (res.success) {
                    this.capitalCode.modal = false
                    this.capitalCode.oldPayCode = ''
                    this.capitalCode.payCode = ''
                    this.capitalCode.rePayCode = ''
                    this.$vNotice.success({
                      text: '保存成功'
                    })
                    this.initUserInfo()
                  }
                })
              } else {
                // 不存在，则绑定
                doBindPayPassword(Base64.encode(this.capitalCode.payCode))
                .then(res => {
                  if (res.success) {
                    this.capitalCode.modal = false
                    this.capitalCode.oldPayCode = ''
                    this.capitalCode.payCode = ''
                    this.capitalCode.rePayCode = ''
                    this.$vNotice.success({
                      text: '保存成功'
                    })
                    this.initUserInfo()
                  }
                })
              }
            }
          }
        },
        bindLoginPassword: {
          modal: false,
          oldPassword: '',
          password: '',
          newPassword: '',
          doOpt: () => {
            if (this.doFormValidate('loginPassword')) {
              doResetLoginPassword({
                password: Base64.encode(this.bindLoginPassword.password),
                newPassword: Base64.encode(this.bindLoginPassword.newPassword)
              }).then(res => {
                if (res.success) {
                  this.bindLoginPassword.modal = false
                  this.bindLoginPassword.oldPassword = ''
                  this.bindLoginPassword.password = ''
                  this.bindLoginPassword.newPassword = ''
                  this.$vNotice.success({
                    text: '保存成功'
                  })
                  this.initUserInfo()
                }
              })
            }
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
          oldPayCodeRules: [
            v => !!v || '原始JG安全密码不能为空'
          ],
          payCodeRules: [
            v => !!v || '新JG安全密码不能为空',
            v => REGEX.password.test(v) || 'JG安全密码格式不正确'
          ],
          rePayCodeRules: [
            v => !!v || '确认JG安全密码不能为空',
            v => v === this.capitalCode.payCode || '两次密码不一致'
          ],
          oldPasswordRules: [
            v => !!v || '原始登陆密码不能为空'
          ],
          loginPassRules: [
            v => !!v || '新登陆密码不能为空'
          ],
          loginNewPassRules: [
            v => !!v || '确认登陆密码不能为空',
            v => v === this.bindLoginPassword.password || '两次密码不一致'
          ],
          zfbRules: [
            v => !!v || '支付宝账号不能为空'
          ],
          bankCardRule: [
            v => !!v || '银行卡号不能为空'
          ]
        }
      }
    },
    computed: {
      realVertifyDesc () {
        switch (this.form.realVerifyStatus) {
          case '00':
            return '认证完成'
          case '01':
            return '认证中'
          case '02':
            return '认证失败'
          case '99':
            return '未认证'
          default:
            return '未认证'
        }
      }
    },
    methods: {
      setLoginPassword () {
        this.bindLoginPassword.modal = true
      },
      changeNotify (type, flag) {
        doChangeNotify(type, flag)
      },
      doFormValidate (name) {
        if (!this.$refs[name + 'Form'].validate()) {
          // 表单校验失败
          this.$vNotice.error({
            text: '表单校验失败'
          })
          return false
        }
        return true
      },
      doCashModal (type) {
        this.cashInfo.modal = true
        this.cashInfo.type = type
        this.cashInfo.text = type === 'cashIn' ? '买入坚果（JG）' : '退回坚果（JG）'
        this.$refs.cashForm.reset()
      },
      setEmail (type) {
        this.bindEmail.email = this.form.email
        this.bindEmail.type = type
        this.bindEmail.modal = true
      },
      setZfb (type) {
        this.bindZFB.email = this.form.aliPay
        this.bindZFB.type = type
        this.bindZFB.modal = true
      },
      setBankCard (type) {
        this.bindBankCard.bankCard = this.form.bankCard
        this.bindBankCard.type = type
        this.bindBankCard.modal = true
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
      findBindTypeValue (obj = [], key) {
        let find = obj.find(item => item.bindType === key)
        return find && find.bindAcct
      },
      initUserInfo () {
        queryInfo().then(res => {
          if (res.success) {
            let { acctBindInfoVO, acctInfoVO, basicInfoVO, notifySettingVO, securityInfoVO } = res.data
            notifySettingVO = notifySettingVO || {}
            this.form.username = basicInfoVO.loginName
            this.form.uuid = basicInfoVO.userUuid
            this.form.secureLevel = basicInfoVO.securityLevel ? basicInfoVO.securityLevel.toLowerCase() : ''
            this.form.phone = securityInfoVO.phone
            this.form.email = securityInfoVO.email
            this.form.password = securityInfoVO.payPwd
            this.form.realName = securityInfoVO.realName
            this.form.realVerifyStatus = securityInfoVO.realVerifyStatus
            this.form.imgSrc = basicInfoVO.portraitPicUrl
            this.form.cash = formatMoney(acctInfoVO.usableAmount)
            this.form.aliPay = this.findBindTypeValue(acctBindInfoVO, 'ZFB')
            this.form.bankCard = this.findBindTypeValue(acctBindInfoVO, 'BANKCARD')
            this.form.openAccountTip = notifySettingVO.acceptAcctChangeNotify
            this.form.openBillTip = notifySettingVO.acceptAgencyNotify
            this.form.openDealTip =  notifySettingVO.acceptTradeNotifyg
            this.form.loginPassword = basicInfoVO.pwd || '111111'
          }
        })
      },
      onCopy () {
        this.$vNotice.success({
          text: '复制成功'
        })
      },
      onError () {
        console.error('copy error!')
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

.cash-in-wrapper {
  .v-input--radio-group__input {
    flex-direction: row;
    .v-radio {
      margin-bottom: 8px;
    }
  }
  .v-text-field{
    padding-top: 0px;
  }
  .v-input__slot {
    margin-bottom: 0px !important;
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