<!--
 * @Author: 飞帅
 * @Date: 2022-03-27 19:16:56
 * @LastEditTime: 2022-04-03 17:12:18
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div id="app">
    <router-view v-loading="loading" />
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    // 全局loading
    // loading(loading) {
    //   this.loading = loading
    // },
    // //生成验证码
    // getCode() {
    //   this.loading = true
    //   // this.$http.get('/api/captcha').then(res => {
    //   //   this.loading = false
    //   //   this.$refs.captcha.src = res.data.url
    //   // })‘
    //   this.$http.get('/api/captcha').then(res => {
    //     this.loading = false
    //     this.$refs.captcha.src = res.data.url
    //   })
    // },
  },
}
</script>
<style lang="less"></style>
