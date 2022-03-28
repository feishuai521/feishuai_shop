<!--
 * @Author: 飞帅
 * @Date: 2022-03-27 19:34:31
 * @LastEditTime: 2022-03-28 08:52:15
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="Login">
    <div class="Login_box">
      <div class="box_img">
        <img src="../assets/logo.png" alt="" />
      </div>
      <div class="box_from">
        <el-form ref="fromref" :model="from" :rules="fromrules">
          <el-form-item prop="username">
            <el-input v-model="from.username" placeholder="请输入账号">
              <i slot="prefix" class="el-input__icon el-icon-user"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="from.password" placeholder="请输入密码" show-password>
              <i slot="prefix" class="el-input__icon el-icon-key"></i>
            </el-input>
          </el-form-item>
        </el-form>
        <el-form>
          <el-form-item class="login_dl">
            <el-button type="primary" @click="logindl">登录</el-button>
            <el-button type="info" @click="restus">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      from: {
        username: '',
        password: '',
      },
      fromrules: {
        username: [
          { required: true, message: '请输入账号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10个字符', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6到 12个字符', trigger: 'blur' },
        ],
      },
    }
  },
  methods: {
    logindl() {
      this.$refs.fromref.validate(async res => {
        if (!res) return
        const { data: price } = await this.$http.post('/login', this.from)
        if (price.meta.status !== 200) return this.$message.error('登录错误')
        this.$message.success('登录成功')
        window.sessionStorage.setItem('token', price.data.token)
        this.$router.push({ name: 'Home' })
      })
    },
    restus() {
      //   console.log(this.$refs.fromref.resetFields())
      // console.log(this)
      this.$refs.fromref.resetFields()
    },
  },
}
</script>

<style lang="less" scoped>
.Login {
  height: 100%;
  background-color: #2a4c67;
  .Login_box {
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    .box_img {
      width: 130px;
      height: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0px 0px 10px #999;
      position: absolute;
      left: 50%;
      //   top: 50%;
      transform: translate(-50%, -50%);
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
        background-color: beige;
      }
    }
    .box_from {
      padding: 30px;
      padding-top: 90px;
    }
    .login_dl {
      display: flex;
      justify-content: flex-end;
    }
  }
}
</style>
