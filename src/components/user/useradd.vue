<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 16:24:41
 * @LastEditTime: 2022-03-28 17:27:25
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="useradd">
    <el-dialog title="添加用户" :visible.sync="centerDialogVisible" width="70%" @close="addDislogcl">
      <el-form label-width="80px" :model="useradd" :rules="useradds" ref="useraddref">
        <el-form-item label="用户名称" prop="username">
          <el-input v-model="useradd.username"></el-input>
        </el-form-item>
        <el-form-item label="用户密码" prop="password">
          <el-input v-model="useradd.password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="useradd.email"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="useradd.xmobile"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="centerDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import { consumers } from 'stream'

export default {
  props: {
    centerDialogVisible: {
      type: Boolean,
    },
  },
  data() {
    var emlck = (rule, value, cb) => {
      const regemil =
        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (regemil.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法邮箱'))
    }
    var modelck = (rule, value, cb) => {
      const regmode = /0?(13|14|15|17|18|19)[0-9]{9}/
      if (regmode.test(value)) {
        return cb()
      }
      cb(new Error('请输入合法手机号'))
    }
    return {
      useradd: {
        username: '',
        password: '',
        email: '',
        mobile: '',
      },
      useradds: {
        username: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入账号密码', trigger: 'blur' },
          { min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur' },
        ],
        email: [
          { required: true, message: '请输入邮箱', trigger: 'blur' },
          {
            validator: emlck,
            trigger: 'blur',
          },
        ],
        mobile: [
          { required: true, message: '请输入手机号', trigger: 'blur' },
          {
            validator: modelck,
            trigger: 'blur',
          },
        ],
      },
    }
  },
  methods: {
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(res => {
          res
          done()
        })
        .catch(res => {
          res
        })
    },
    addDislogcl() {
      this.$refs.useraddref.resetFields()
    },
  },
}
</script>

<style lang="less" scoped></style>
