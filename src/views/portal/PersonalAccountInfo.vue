<template>
  <v-card class="elevation-12 account-info">
    <v-toolbar dark color="primary">
      <v-toolbar-title>{{(info && `${info.text}明细`) || '个人中心 / 账户信息'}}</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/personal" v-if="!info">
        <v-icon>arrow_back</v-icon>
      </v-btn>
      <v-btn icon v-if="info" @click="$emit('close')">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="account-info-list">
      <div class="account-info-list-title" v-if="!info">
        明细查询
      </div>

      <div class="account-info-list-search">
        <v-layout row align-center justify-center>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="sdialog"
              v-model="smodal"
              :return-value.sync="startDate"
              persistent
              full-width
              width="290px"
              @change="smodal = false"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="startDate"
                  label="开始时间"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="startDate" scrollable @change="$refs.sdialog.save(startDate)">
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="edialog"
              v-model="emodal"
              :return-value.sync="endDate"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="endDate"
                  label="结束时间"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="endDate" scrollable @change="$refs.edialog.save(endDate)">
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        
      </div>

      <div class="account-info-list">
        <v-table-server :headers="headers" :ajax="ajax">
          <template v-slot:items="props">
            <template v-if="info">
              <td>{{props.item.streamNo}}</td>
              <td>{{translateStatus(props.item.status)}}</td>
              <td>{{props.item.withdrawAmount || props.item.rechargeAmount}}</td>
            </template>
            <template v-else>
              <td>{{props.item.streamNo}}</td>
              <td>{{props.item.streamType}}</td>
              <td>{{props.item.streamAmount}}</td>
            </template>
          </template>
        </v-table-server>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'PersonalAccountInfo',
    props: {
      info: {
        type: Object,
        default: null
      }
    },
    data () {
      return {
        startDate: new Date().toISOString().substr(0, 10),
        endDate: new Date().toISOString().substr(0, 10),
        smodal: false,
        emodal: false
      }
    },
    methods: {
      translateStatus (status) {
        let desc = ''
        if (this.info.type === 'cashIn') {
          if (status === 'COMPLETED') {
            desc = '完成'
          }
        } else if (this.info.type === 'cashOut') {
          if (status === 'TO_BE_AUDIT') {
            desc = '待审核'
          } else if (status === 'APPROVAL') {
            desc = '完成'
          }
        }
        return desc
      }
    },
    computed: {
      ajax () {
        let url = this.info ? (this.info.type === 'cashIn' ? '/acct/recharge/list' : '/acct/withdraw/list') : '/acct/fund/list'
        return {
          url,
          rowsPerPage: 10,
          params: {
            startDate: this.startDate + ' 00:00:00',
            endDate: this.endDate + ' 00:00:00'
          }
        }
      },
      headers () {
        if (this.info) {
          return [
            {text: '流水号', value: 'streamNo', sortable: false},
            {text: '状态', value: 'status', sortable: false},
            {text: 'JG', value: 'streamAmount', sortable: false}
          ]
        } else {
           return [
            {text: '流水号', value: 'streamNo', sortable: false},
            {text: '类型', value: 'streamType', sortable: false},
            {text: 'JG', value: 'streamAmount', sortable: false}
          ]
        }
      }
    }
  }
</script>

<style lang="stylus">
.account-info {
  &-list {
    &-title {
      font-size: 20px;
      margin-bottom: 10px;
      text-align: center;
    }
  }
}
</style>