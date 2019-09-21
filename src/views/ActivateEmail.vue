<template>
  <div>

  </div>
</template>

<script>
  import {doActivateEmail} from '@/api/account'
  export default {
    name: 'activate-email',
    async created () {
      let params = this.$route.query
      try {
        let res = await doActivateEmail(params)
        if (res.success) {
          this.$vNotice.success({
            text: '激活成功'
          })
          this.$router.push('/bind-email/success')
        }
      } catch(e) {
        this.$vNotice.error({
          text: '激活失败'
        })
        this.$router.push('/bind-email/error')
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>