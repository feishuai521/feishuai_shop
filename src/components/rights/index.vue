<!--
 * @Author: 飞帅
 * @Date: 2022-03-29 14:34:30
 * @LastEditTime: 2022-03-29 15:12:54
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="rights">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-table :data="riglist" border style="width: 100%">
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="authName" label="权限名称" width="180"> </el-table-column>
        <el-table-column prop="path" label="路径" width="180"> </el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag type="success" v-if="scope.row.level == '0'">一级</el-tag>
            <el-tag type="info" v-else-if="scope.row.level == '2'">二级</el-tag>
            <el-tag v-else>三级</el-tag>
          </template>
        </el-table-column>
      </el-table></el-card
    >
  </div>
</template>

<script>
export default {
  data() {
    return {
      riglist: [],
    }
  },
  created() {
    this.getrightlist()
  },
  methods: {
    async getrightlist() {
      const { data: res } = await this.$http.get('rights/list')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.riglist = res.data
    },
  },
}
</script>

<style lang="less" scoped>
.rights {
  .el-card {
    margin: 20px 0;
  }
}
</style>
