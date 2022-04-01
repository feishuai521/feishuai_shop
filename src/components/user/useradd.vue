<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 16:24:41
 * @LastEditTime: 2022-03-31 19:15:50
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="useradd"></div>
</template>

<script>
// import { consumers } from 'stream'

export default {
  props: ['centerDialogVisible', 'userlist'],

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
          { required: true, message: '请输入手机号码', trigger: 'blur' },
          { validator: isMobileNumber, trigger: 'blur' },
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
    addues() {
      this.$refs.useraddref.validate(async valde => {
        if (!valde) return
        const { data: res } = await this.$http.post('users', this.useradd)
        if (res.meta.status !== 201) return this.$message.error(res.meta.msg)
        this.$message.success(res.meta.msg)
        this.userlist()
        this.centerDialogVisible = false
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
