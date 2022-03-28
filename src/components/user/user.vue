<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 11:20:46
 * @LastEditTime: 2022-03-28 16:46:46
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="user">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card class="box-card">
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" class="input-with-select" clearable v-model="queryinfo.query" @clear="userlist">
            <el-button slot="append" icon="el-icon-search" @click="userlist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="centers">添加用户</el-button>
        </el-col>
      </el-row>
      <br />
      <el-table :data="uselist" border stripe>
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="username" label="姓名"> </el-table-column>
        <el-table-column prop="email" label="邮箱"> </el-table-column>
        <el-table-column prop="mobile" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <!-- {{ scope.row }} -->
            <el-switch v-model="scope.row.mg_state" @change="userstate(scope.row)"> </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <el-tooltip content="修改" placement="top">
            <el-button type="primary" icon="el-icon-edit" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip content="删除" placement="top">
            <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
          </el-tooltip>
          <el-tooltip content="分配" placement="top" :enterable="false">
            <el-button type="warning" icon="el-icon-star-off" size="mini"></el-button>
          </el-tooltip>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="todo"
      >
      </el-pagination>
    </el-card>
    <useradd-Vue :centerDialogVisible="center" />
  </div>
</template>

<script>
import useraddVue from './useradd.vue'
export default {
  name: 'users',
  components: { useraddVue },
  data() {
    return {
      queryinfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      uselist: [],
      todo: 0,
      center: false,
    }
  },
  created() {
    this.userlist()
    // this.handleSizeChange()
  },
  methods: {
    async userlist() {
      const { data: res } = await this.$http.get('users', { params: this.queryinfo })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.uselist = res.data.users
      this.todo = res.data.total
      console.log(res)
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val
      this.userlist()
      //   console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`)
    },
    async userstate(val) {
      console.log(val)
      const { data: res } = await this.$http.put(`users/${val.id}/state/${val.mg_state}`)
      if (res.meta.status !== 200) {
        val.mg_state = !val.mg_state
        return this.$message.error('更新用户状态失败')
      }
      this.$message.success('更新成功')
    },
    centers() {
      this.center = !this.center
    },
  },
}
</script>

<style lang="less" scoped>
.user {
  .box-card {
    margin: 20px 0;
  }
  .el-table {
    font-size: 14px;
  }
  .el-pagination {
    margin: 10px 0;
  }
}
</style>
