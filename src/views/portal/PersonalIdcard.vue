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
          v-model="valid"
          lazy-validation
        >
          <v-text-field
            v-model="name"
            :counter="10"
            :rules="nameRules"
            label="姓名"
            required
          ></v-text-field>

          <v-text-field
            v-model="email"
            :rules="emailRules"
            label="身份证号"
            required
          ></v-text-field>

          <upload-btn title="身份证正面"></upload-btn>
          <upload-btn title="身份证反面"></upload-btn>

          <v-checkbox
            v-model="checkbox"
            :rules="[v => !!v || 'You must agree to continue!']"
            label="Do you agree?"
            required
          ></v-checkbox>

          <v-btn
            color="warning"
            @click="doValidateInfo"
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
  import UploadButton from 'vuetify-upload-button'
  export default {
    name: 'personal-idcard-info',
    components: {
      'upload-btn': UploadButton
    },
    data () {
      return {
        valid: true,
        name: '',
        nameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
        ],
        email: '',
        emailRules: [
          v => !!v || 'E-mail is required',
          v => /.+@.+/.test(v) || 'E-mail must be valid'
        ],
        select: null,
        items: [
          'Item 1',
          'Item 2',
          'Item 3',
          'Item 4'
        ],
        checkbox: false
      }
    },

    methods: {
      validate () {
        if (this.$refs.form.validate()) {
          this.snackbar = true
        }
      },
      reset () {
        this.$refs.form.reset()
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
      doValidateInfo () {
        //
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>