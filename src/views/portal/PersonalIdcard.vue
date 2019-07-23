<template>
  <v-card class="elevation-12">
    <v-toolbar dark color="primary">
      <v-toolbar-title>个人中心 / 实名认证</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn icon to="/personal">
        <v-icon>arrow_back</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card-text>
      <v-form
        ref="form"
        lazy-validation
      >
        <v-text-field
          v-model="form.name"
          :counter="10"
          :rules="rules.nameRules"
          label="姓名"
          required
        ></v-text-field>

        <v-text-field
          mask="###### - ######## - ###N"
          v-model="form.idCard"
          :rules="rules.idCardRules"
          label="身份证号"
          required
        ></v-text-field>

        <v-layout row wrap>
          <v-flex md6 xs12>
            <v-image-upload title="身份证正面"></v-image-upload>
          </v-flex>

          <v-flex md6 xs12>
            <v-image-upload title="身份证反面"></v-image-upload>
          </v-flex>
        </v-layout>

        <v-btn
          color="warning"
          @click="doSubmit"
        >
          提交认证
        </v-btn>

        <v-btn
          to="/personal"
        >
          取消认证
        </v-btn>
      </v-form>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    name: 'personal-idcard-info',
    data () {
      return {
        form: {
          name: '',
          idCard: '',
          idCardImgF: '',
          idCardImgB: ''
        },
        rules: {
          nameRules: [
            v => !!v || '姓名不能为空',
            v => (v && v.length <= 10) || '姓名应该小于10个字符'
          ],
          idCardRules: [
            v => !!v || '身份证号不能为空'
          ]
        }
      }
    },

    methods: {
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      doSubmit () {
        let valid = this.$refs.form.validate()
        if (valid) {
          // 提交操作
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>