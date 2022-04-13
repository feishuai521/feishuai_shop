<!--
 * @Author: 飞帅
 * @Date: 2022-04-11 19:18:55
 * @LastEditTime: 2022-04-13 17:21:44
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>添加商品</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="添加商品信息" type="info" center show-icon> </el-alert>
      <el-steps :space="200" :active="activezt - 0" finish-status="success" align-center>
        <el-step title="基本信息"></el-step>
        <el-step title="商品参数"></el-step>
        <el-step title="商品属性"></el-step>
        <el-step title="商品图片"></el-step>
        <el-step title="商品内容"></el-step>
        <el-step title="完成"></el-step>
      </el-steps>
      <el-form :model="AddForm" :rules="Addrules" ref="AddFormRef" label-width="100px" label-position="top">
        <el-tabs :tab-position="`left`" v-model="activezt" :before-leave="beforeTabLevae" @tab-click="tabClicked">
          <el-tab-pane label="基本信息" name="0">
            <el-form-item label="商品名称" prop="goods_name">
              <el-input v-model="AddForm.goods_name"></el-input>
            </el-form-item>
            <el-form-item label="商品价格" prop="goods_price">
              <el-input v-model="AddForm.goods_price" type="Nunber"></el-input>
            </el-form-item>
            <el-form-item label="商品重量" prop="goods_weight">
              <el-input v-model="AddForm.goods_weight" type="Nunber"></el-input>
            </el-form-item>
            <el-form-item label="商品数量" prop="goods_number">
              <el-input v-model="AddForm.goods_number" type="Nunber"></el-input>
            </el-form-item>
            <el-form-item label="商品分类" prop="goods_cat">
              <el-cascader
                expand-trigger="hover"
                :options="catelist"
                :props="catePops"
                v-model="AddForm.goods_cat"
                @change="handleChange"
              ></el-cascader>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品参数" name="1">
            <el-form-item :label="item.attr_name" v-for="(item, index) in ManyDAta" :key="index">
              <el-checkbox-group v-model="item.attr_vals">
                <el-checkbox :label="items" v-for="(items, i) in item.attr_vals" :key="i" border size="small"> </el-checkbox>
              </el-checkbox-group>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品属性" name="2">
            <el-form-item :label="item.attr_name" v-for="item in OnlyDAta" :key="item.attr_id">
              <el-input v-model="item.attr_vals"></el-input>
            </el-form-item>
          </el-tab-pane>
          <el-tab-pane label="商品图片" name="3">
            <el-upload
              :action="urcupload"
              :on-preview="handlePreview"
              :on-remove="handleRemove"
              list-type="picture"
              :headers="headersObj"
              :on-success="hancndSuccess"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-tab-pane>
          <el-tab-pane label="商品内容" name="4">
            <quill-editor v-model="AddForm.goods_introduce" />
            <el-button type="primary" style="margin: 10px 0" @click="add">添加商品</el-button>
          </el-tab-pane>
        </el-tabs>
      </el-form>
    </el-card>
    <el-dialog title="图片预览" :visible.sync="picdialogVisible" width="50%">
      <img :src="previewImage" alt="" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script>
import { categorislist, getcatelist } from '../../api'

export default {
  data() {
    return {
      activezt: '0',
      AddForm: {
        goods_name: '',
        goods_price: 0,
        goods_weight: 0,
        goods_number: 0,
        goods_cat: [],
        pics: [],
        goods_introduce: '',
      },
      catelist: [],
      Addrules: {
        goods_name: [{ required: true, message: '请输入商品名称', trigger: 'blur' }],
        goods_price: [{ required: true, message: '请输入商品价格', trigger: 'blur' }],
        goods_weight: [{ required: true, message: '请输入商品重量', trigger: 'blur' }],
        goods_number: [{ required: true, message: '请输入商品数量', trigger: 'blur' }],
        goods_cat: [{ required: true, message: '请选择商品分类', trigger: 'blur' }],
      },
      catePops: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      ManyDAta: [],
      OnlyDAta: [],
      urcupload: 'https://lianghj.top:8888/api/private/v1/upload',
      headersObj: {
        Authorization: window.sessionStorage.getItem('token'),
      },
      previewImage: '',
      picdialogVisible: false,
    }
  },
  computed: {
    cateid() {
      return this.AddForm.goods_cat.length === 3 ? this.AddForm.goods_cat[this.AddForm.goods_cat.length - 1] : null
    },
  },
  created() {
    this.getcatelist()
  },
  methods: {
    // 获取分类
    async getcatelist() {
      const res = await categorislist()
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      this.catelist = res.data
    },
    handleChange() {
      if (this.AddForm.goods_cat.length !== 3) return (this.AddForm.goods_cat = [])
    },
    // 离开当前 Tabs 页
    beforeTabLevae(activeName, oldActiveName) {
      // console.log('即将离开标签页的名字: ', oldActiveName)
      // console.log('即将进入标签页的名字: ', activeName)
      // return false
      if ((oldActiveName === '0' && this.AddForm.goods_cat.length !== 3) || this.AddForm.goods_name === '') {
        this.$message.error('请先选择商品分类! 或 填写商品名称')
        return false
      }
    },
    async tabClicked() {
      // console.log('tabClicked')
      console.log(this.activezt)

      if (this.activezt === '1') {
        const res = await getcatelist(this.cateid, {
          params: { sel: 'many' },
        })
        if (Object.keys(res).length == 1) return this.$message.error(res.msg)
        res.data.forEach(
          item => (item.attr_vals = item.attr_vals.length === 0 ? [] : item.attr_vals.split(',') || item.attr_vals.split(' '))
        )
        this.ManyDAta = res.data
      } else if (this.activezt === '2') {
        const res = await getcatelist(this.cateid, {
          params: { sel: 'only' },
        })
        if (Object.keys(res).length == 1) return this.$message.error(res.msg)
        console.log(res)

        this.OnlyDAta = res.data
      }
    },
    handlePreview(res) {
      console.log(res)
      this.previewImage = res.response.data.url
      this.picdialogVisible = true
    },
    handleRemove(res) {
      const picres = res.response.data.tmp_path
      const i = this.AddForm.pics.findIndex(item => item.pic === picres)
      this.AddForm.pics.splice(i, 1)
    },
    hancndSuccess(res) {
      console.log(res)

      const picimg = { pic: res.data.tmp_path }
      this.AddForm.pics.push(picimg)
    },
    add() {
      this.$refs.AddFormRef.validate(val => {
        if (!val) return this.$message.error('请填写完整信息')
        this.AddForm.goods_cat = this.AddForm.goods_cat.join(',')
        console.log(this.AddForm)
      })
    },
  },
}
</script>

<style lang="less" scoped>
.el-steps {
  margin: 20px 0;
}
</style>
