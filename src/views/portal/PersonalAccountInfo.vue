<template>
  <v-card class="elevation-12 account-info">
    <v-toolbar dark color="primary">
      <v-toolbar-title>个人中心 / 账户信息</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/personal">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text class="account-info-list">
      <div class="account-info-list-title">
        明细查询
      </div>

      <div class="account-info-list-search">
        <v-layout row align-center justify-center>
          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="开始时间"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>

          <v-flex xs12 sm6 md4>
            <v-dialog
              ref="dialog"
              v-model="modal"
              :return-value.sync="date"
              persistent
              full-width
              width="290px"
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="date"
                  label="结束时间"
                  prepend-icon="event"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="date" scrollable>
                <v-spacer></v-spacer>
                <v-btn text color="primary" @click="modal = false">Cancel</v-btn>
                <v-btn text color="primary" @click="$refs.dialog.save(date)">OK</v-btn>
              </v-date-picker>
            </v-dialog>
          </v-flex>
        </v-layout>
        
      </div>

      <div class="account-info-list">
        <v-table-server :headers="headers" :ajax="ajax">
          <template v-slot:items="props">
            <td>{{props.item.streamNo}}</td>
            <td>{{props.item.streamType}}</td>
            <td>{{props.item.streamAmount}}</td>
            <td>{{props.item.status}}</td>
          </template>
        </v-table-server>
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'PersonalAccountInfo',
    data () {
      return {
        date: new Date().toISOString().substr(0, 10),
        modal: false,
        headers: [
          {text: '流水号', value: 'streamNo', sortable: false},
          {text: '类型', value: 'streamType'},
          {text: '金额', value: 'streamAmount', sortable: false},
          {text: '状态', value: 'status', sortable: false}
        ],
        ajax: {
          url: '/acct/fund/list'
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