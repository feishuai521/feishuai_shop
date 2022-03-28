<!--
 * @Author: 飞帅
 * @Date: 2022-03-27 19:16:56
 * @LastEditTime: 2022-03-28 11:06:48
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
  created() {
    setTimeout(function () {
      this.loading = false
    }, 1000)
  },
}
</script>
<style lang="less"></style>
