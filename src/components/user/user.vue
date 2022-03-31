<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 11:20:46
 * @LastEditTime: 2022-03-31 10:19:44
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
          <template slot-scope="scope">
            <el-tooltip content="修改" placement="top">
              <el-button type="primary" icon="el-icon-edit" size="mini" @click="Accounts(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="删除" placement="top">
              <el-button type="danger" icon="el-icon-delete" size="mini" @click="dateAccoun(scope.row.id)"></el-button>
            </el-tooltip>
            <el-tooltip content="分配" placement="top" :enterable="false">
              <el-button type="warning" icon="el-icon-star-off" size="mini" @click="setrole(scope.row)"></el-button>
            </el-tooltip>
            <div>
              <el-dialog title="修改账号" :visible.sync="Account" @close="cosons">
                <el-form ref="userAcunn" :rules="userAcuns" :model="userAcun" label-width="80px">
                  <el-form-item label="用户名">
                    <el-input :disabled="true" v-model="userAcun.username"></el-input>
                  </el-form-item>
                  <el-form-item label="邮箱" prop="email">
                    <el-input v-model="userAcun.email"></el-input>
                  </el-form-item>
                  <el-form-item label="手机号" prop="mobile">
                    <el-input v-model="userAcun.mobile"></el-input>
                  </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                  <el-button type="primary" @click="Accountinno">确 定</el-button>
                </span>
              </el-dialog>
            </div>
            <el-dialog title="分配角色" :visible.sync="isAssign" width="50%">
              <div>
                <p>当前用户：{{ userrow.username }}</p>
                <p>当前角色：{{ userrow.role_name }}</p>
                <p>
                  分配角色：<el-select v-model="userid" placeholder="请选择">
                    <el-option v-for="item in rolesist" :key="item.id" :label="item.roleName" :value="item.id"> </el-option>
                  </el-select>
                </p>
              </div>
              <span slot="footer" class="dialog-footer">
                <el-button @click="isAssign = false">取 消</el-button>
                <el-button type="primary" @click="sesidinfo">确 定</el-button>
              </span>
            </el-dialog>
          </template>
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
    <useradd-Vue :centerDialogVisible="center" :userlist="userlist" />
  </div>
</template>

<script>
import { rolesls, roleslsuser } from '../../api'
// import AccountVue from './Account.vue'
// import { log } from 'console'
import useraddVue from './useradd.vue'
// rolesls
export default {
  name: 'users',
  components: { useraddVue },
  data() {
    var emlck = (rule, value, cb) => {
      const regemil =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (regemil.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    var isMobileNumber = (rule, value, callback) => {
      if (!value) {
        return new Error('请输入电话号码')
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
        const isPhone = reg.test(value)
        value = Number(value) //转换为数字
        if (typeof value === 'number' && !isNaN(value)) {
          //判断是否为数字
          value = value.toString() //转换成字符串
          if (value.length < 0 || value.length > 12 || !isPhone) {
            //判断是否为11位手机号
            callback(new Error('手机号码格式如:138xxxx8754'))
          } else {
            callback()
          }
        } else {
          callback(new Error('请输入电话号码'))
        }
      }
    }
    return {
      queryinfo: {
        query: '',
        pagenum: 1,
        pagesize: 2,
      },
      uselist: [],
      todo: 0,
      userid: '',
      center: false,
      Account: false,
      isAssign: false,
      userrow: {},
      rolesist: [],
      userAcun: {},
      userAcuns: {
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: emlck,
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isMobileNumber, trigger: 'blur' },
        ],
      },
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
      // console.log(res)
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val
      this.userlist()
      //   console.log(`每页 ${val} 条`)
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val
      this.userlist()
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
    async Accounts(id) {
      this.Account = !this.Account
      const { data: resid } = await this.$http.get(`users/${id}`)
      if (resid.meta.status !== 200) return this.$message.error(resid.meta.msg)
      this.$message.success(resid.meta.msg)
      console.log(resid.data)
      this.userAcun = resid.data
    },
    cosons() {
      this.$refs.userAcunn.resetFields()
    },
    Accountinno() {
      this.$refs.userAcunn.validate(async res => {
        if (!res) return
        const { data: re } = await this.$http.put(`users/${this.userAcun.id}`, { email: this.userAcun.email, mobile: this.userAcun.mobile })
        console.log(re)
        if (re.meta.status !== 200) return this.$message.error(re.meta.msg)

        this.userlist()
        this.Account = false
        this.$message.success(re.meta.msg)
      })
    },
    async dateAccoun(id) {
      console.log(id)
      const res = await this.$confirm('需要删除账号吗？', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消删除',
        type: 'warning',
      }).catch(err => err)
      if (res !== 'confirm') return this.$message.warning('取消删除成功')
      const { data: ress } = await this.$http.delete(`users/${id}`)
      // console.log(ress)
      if (ress.meta.status !== 200) return this.$message.error(ress.meta.msg)
      this.userlist()
      this.$message.success(ress.meta.msg)
    },
    async setrole(row) {
      this.isAssign = true
      this.userrow = row
      const res = await rolesls()
      this.rolesist = res.data
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success(res.msg)

      console.log(res)
    },
    async sesidinfo() {
      if (!this.userid) return this.$message.error('请选择分配角色')
      const res = await roleslsuser(this.userrow.id, this.userid)
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success(res.msg)
      this.userlist()
      this.isAssign = false
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
