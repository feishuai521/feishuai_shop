<!--
 * @Author: 飞帅
 * @Date: 2022-04-18 08:09:20
 * @LastEditTime: 2022-04-18 08:17:25
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <!-- {{ breadcrumb }} -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item, index) in breadcrumb" :key="index">{{ item.name }}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  props: {
    // 设置面包屑
    breadcrumb: {
      type: Array,
    },
  },
}
</script>

<style lang="less" scoped></style>
