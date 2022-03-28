<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 08:28:26
 * @LastEditTime: 2022-03-28 08:59:56
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div><el-button type="info" @click="tc">信息按钮</el-button></div>
</template>

<script>
export default {
  methods: {
    tc() {
      window.sessionStorage.clear()
      this.$router.push('./Login')
      this.$message.message('退出成功')
    },
  },
}
</script>

<style lang="less" scoped></style>
