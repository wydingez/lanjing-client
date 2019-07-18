<template>
  <div>
    <v-data-table :headers="headers" :items="items" hide-actions>
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
              <v-btn color="warning" fab small dark v-on="on" @click="dialog = true">
                <v-icon>input</v-icon>
              </v-btn>
            </template>
            <span>卖出</span>
          </v-tooltip>
        </td>
      </template>
    </v-data-table>
    <v-dialog v-model="dialog" width="500">
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
              placeholder="80-2000"
              required
            ></v-text-field>
          </v-form>
          <p>锁定的价格为：0.35元/蓝晶</p>
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
            @click="dialog = false; snackbar = true"
          >
            确认卖出
          </v-btn>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
            取消卖出
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    
    <v-snackbar v-model="snackbar" top :timeout="0">
      确认购买成功，先打开蓝晶社APP转赠蓝晶至：
      手机号：13813813813
      微信号：weishi
      (安全提醒：请在蓝晶社APP里转赠蓝晶时务必核对以上信息无误，方可转入。如遇信息不符时请至公众号【爱坚果社区】联系客服人员处理！)
      完成转入后，请到【订单】页面继续完成交易
      <v-btn
        color="pink"
        flat
        @click="snackbar = false"
      >
        关闭
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
  export default {
    name: 'HomeOrderSell',
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
      dialog: false,
      snackbar: false
    })
  }
</script>

<style lang="scss" scoped>

</style>