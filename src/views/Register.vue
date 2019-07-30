<template>
  <v-layout align-center justify-center pa-4 class="register-page">
    <v-flex xs12 sm8 md4>
      <v-card class="elevation-12">
        <v-toolbar dark color="primary">
          <v-toolbar-title>注册账号</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-tabs
            v-model="form.registerType"
            color="transparent"
            slider-color="primary"
            class="register-page-tabs"
          >
            <v-tab
              v-for="(type, index) in registerTypes"
              :key="index"
              ripple
            >
              {{type.label}}
            </v-tab>
          </v-tabs>
          <v-form class="register-page-form">
            <v-container>
              <v-select :items="nationalityList" label="国籍" outline messages="国籍信息注册后不可修改，请务必如实选择。" v-model="form.nationality" @change="selectCountry"></v-select>
              <v-layout class="phone-emial-input">
                <template v-if="form.registerType === 0">
                  <v-flex xs5>
                    <v-select :items="phoneList" solo v-model="form.phonePrev"></v-select>
                  </v-flex>
                  <v-flex xs7>
                    <v-text-field label="手机号" solo v-model="form.phone"></v-text-field>
                  </v-flex>
                </template>
                <v-flex v-else xs12>
                  <v-text-field label="邮箱账号" solo v-model="form.email"></v-text-field>
                </v-flex>
              </v-layout>
              <v-text-field label="设置密码" type="password" outline v-model="form.password"></v-text-field>
              <v-text-field label="确认密码" type="password" outline v-model="form.rePassword"></v-text-field>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary">注册</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
  import country from '_d/country.json'
  import countryPhone from '_d/countryPhone.json'
  export default {
    name: 'Register',
    data () {
      return {
        form: {
          nationality: 37,
          phonePrev: '0086',
          phone: '',
          email: '',
          password: '',
          rePassword: '',
          registerType: 0
        },
        nationalityList: [],
        phoneList: [],
        registerTypes: [
          {
            label: '手机注册',
            type: 'phone'
          }, {
            label: '邮箱注册',
            type: 'email'
          }
        ]
      }
    },
    methods: {
      initList () {
        this.nationalityList = country.map((item) => {
          item.value = item.country_id
          item.text = item.name_cn
          return item
        })
        this.phoneList = countryPhone.map((item) => {
          item.value = item.area_code
          item.text = item.area_code
          return item
        })
      },
      selectCountry (value) {
        console.log(value)
      }
    },
    created () {
      this.initList()
    }
  }
</script>

<style lang="stylus">
.register-page {
  &-form {
    margin-top: 10px;
    .phone-emial-input {
      .v-input__slot {
        border: 2px solid rgba(0,0,0,0.54);
      }
    }
  }
  &-tabs {
    .v-tabs__container {
      border-bottom: 1px solid #ddd;
    }
  }
}
</style>
