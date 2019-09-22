<template>
  <v-layout align-center justify-center pa-4 class="help-info">
    <v-flex xs12 sm8 md8>
      <div v-html="content" class="content">
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
  export default {
    name: 'help-info',
    data () {
      return {
        content: `<p style="text-align: center;"><span style="font-size: 24pt;"><strong>蓝晶（积分）赠送平台</strong><strong>规则</strong><strong>及说明（试运行）</strong></span></p> <p><strong>&nbsp;</strong></p> <p><strong>一、蓝晶（积分）赠送</strong><strong>基本原则：</strong></p> <ol> <li>本规则自发布之日起正式实施，并将不时予以修改或完善，修改或完善后的新规则自公布之日起即生效；</li> <li>如您不同意本规则及修改或完善后的规则内容，请立即停止使用平台服务；</li> <li>如您继续使用平台服务的，视为您完全理解并接受本规则及不时修改或完善后的规则内容，并自愿受其约束。</li> </ol> <p>&nbsp;</p> <p><strong>二、新用户首次登陆注意事项</strong></p> <ol> <li>新用户注册首先在页面左上方进入个人中心，并完善所有空缺的信息，将安全等级提升至高；其中包括：账户与安全、身份认证、账户信息；</li> <li>完善手机号码后就可以转赠和接收蓝晶（积分），完善登录密码可以用手机号和登录密码登录本平台；</li> <li>消息提醒建议选择全开；</li> <li>搜索关注ijguo_2019 [爱坚果社区]并将该公众号置顶。</li> </ol> <p><strong>注：</strong><strong>买入和退回坚果（JG）采用</strong><strong>非实时</strong><strong>人工审核</strong><strong>到账方式</strong><strong>，一般在30分钟内完成，会有系统（公众号）消息提示。</strong><strong>目前包括：支付宝</strong><strong>买入坚果（JG）</strong><strong>、</strong><strong>退回坚果（JG）</strong><strong>、随着各支付通道业务的变化，非实时到账方式的具体类型将相应进行调整。</strong></p> <p>&nbsp;</p> <p><strong>三、接收</strong><strong>方应遵循的原则：</strong></p> <p>发起&ldquo;我要接收&rdquo;订单或&ldquo;我要发布接收&rdquo;订单：</p> <ol> <li>使用接收方本人实名的支付宝账户在本平台买入足够数量的坚果（JG）；</li> <li>确认蓝晶社APP账户可接收的蓝晶（积分）数量余额应当大于当次接收蓝晶（积分）的数量；</li> <li>确认接收蓝晶（积分）后，需要在30分钟内完成坚果（JG）的支出；</li> <li>收到系统（公众号）提示转赠方已经如数转赠蓝晶（积分）后，接收方须在蓝晶社APP中及时核对，确认无误后在本平台相对应的订单中确认接收；</li> <li>发布的接收订单有被转赠方响应时，该订单不能被取消，当转赠方已经确认转赠时，订单也不能被取消；</li> <li>确保本平台当前设置的手机号码和蓝晶社手机号码是同一个号码。</li> </ol> <p>&nbsp;</p> <p><strong>四、转赠</strong><strong>方应遵循的原则：</strong></p> <p>发起&ldquo;我要转赠&rdquo;订单或&ldquo;我要发布转赠&rdquo;订单：</p> <ol> <li>确保蓝晶社APP中可转赠的蓝晶（积分）充足；</li> <li>收到系统（公众号）提示接收方完成支付后，转赠方须在本平台获取接收方信息，然后至蓝晶社APP执行转赠操作；</li> <li>发布的转赠订单有被接收方响应时，该订单不能被取消，当转赠方已经确认转赠时，订单也不能被取消。</li> </ol> <p>&nbsp;</p> <p><strong>五、平台故障举例及处理措施</strong></p> <ul> <li>举例1：发布订单后订单后，又取消订单。</li> <li>处理措施：当日达到3次，系统将限制发布订单功能；连续2日触发，系统将进一步限制发布订单方的账户部分功能。</li> </ul> <p>&nbsp;</p> <ul> <li>举例2：确认&ldquo;我要赠送&rdquo;/&ldquo;我要接收&rdquo;后，超时未完成&ldquo;转赠蓝晶&rdquo;/&ldquo;转出坚果（JG）&rdquo;而被系统自动取消订单。</li> <li>处理措施：当日达到3次，系统将限制发布订单功能；连续2日触发，系统将进一步限制发布订单方的账户部分功能。</li> </ul> <p>&nbsp;</p> <ul> <li>举例3：在蓝晶社APP未转赠的情况下，点击&ldquo;确认转赠&rdquo;。</li> <li>处理措施：在本平台经过核对确实未转且转赠方当日被投诉达到2次，系统将限制转赠方账户部分功能；此类投诉单笔金额超过5000坚果（JG）的，系统将直接限制转赠方账户48小时。</li> </ul> <p>&nbsp;</p> <ul> <li>举例4：未按照接收方信息页面显示的手机号码进行转赠蓝晶（积分）。</li> <li>处理措施：接收方有权要求取消订单，冻结的坚果（JG）归还给接收方，转赠方自行承担转错蓝晶（积分）的风险。</li> </ul> <p>&nbsp;</p> <ul> <li>举例5：用户在绑定支付宝账户与实名制是信息不匹配。</li> <li>处理措施：系统无法完成转赠，更改实名制绑定的支付宝再次发起买入和退回坚果（JG）。</li> </ul> <p>&nbsp;</p> <ul> <li>举例6：支付宝付款金额与买入坚果（JG）金额不符。</li> <li>处理措施：系统审核时判为审核不通过，重新提交，在平台提交买入坚果（JG）的数量必须和支付宝付款的金额一直。</li> </ul> <p>&nbsp;</p> <ul> <li>举例7：转赠方确认转赠，接收方未查到该次转赠信息或者迟迟不确认接收。</li> <li>处理措施：转赠方向平台提起申诉，举证转赠记录。并电联接收方。当日达到3次，系统将限制接收方发布订单功能；连续2日触发，系统将进一步限制接收方的账户部分功能。</li> </ul> <p>&nbsp;</p> <ul> <li>举例8：接收方确认转出坚果（JG），转赠方迟迟不确认转赠。</li> <li>处理措施：接收方可以取消订单，当日达到3次，系统将限制转赠发布订单功能；连续2日触发，系统将进一步限制转赠方的账户部分功能。</li> </ul>`
      }
    }
  }
</script>

<style lang="stylus">
.help-info {
  .content {
    margin: 10px;
  }
}
</style>