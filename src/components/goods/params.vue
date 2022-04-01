<!--
 * @Author: 飞帅
 * @Date: 2022-03-31 19:44:44
 * @LastEditTime: 2022-04-01 10:41:52
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类参数</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-alert title="注意：只允许为第三级分类设置相关参数" type="warning" show-icon :closable="false"> </el-alert>
      <el-row style="margin: 20px 0">
        <el-col>
          <span>选择商品分类：</span>

          <el-cascader expand-trigger="hover" :options="parmlist" :props="parval" v-model="selectedopt" @change="handleChange">
          </el-cascader>
        </el-col>
      </el-row>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="动态参数" name="many">
          <el-button type="primary" size="mini" :disabled="isbled" @click="dialogVisible = true">添加参数</el-button>
          <el-table :data="manytabledata" style="width: 100%; margin: 10px 0" border stripe>
            <el-table-column type="expand" label="#"> </el-table-column>
            <el-table-column type="index" label="ID"> </el-table-column>
            <el-table-column label="参数名称" prop="attr_name"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>
                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="静态属性" name="only">
          <el-button type="primary" size="mini" :disabled="isbled" @click="dialogVisible = true">添加属性</el-button>
          <el-table :data="omlytabdata" style="width: 100%; margin: 10px 0" border stripe>
            <el-table-column type="expand" label="#"> </el-table-column>
            <el-table-column type="index" label="ID"> </el-table-column>
            <el-table-column label="属性名称" prop="attr_name"> </el-table-column>
            <el-table-column label="操作">
              <template>
                <el-button type="primary" icon="el-icon-edit" size="mini">编辑</el-button>

                <el-button type="danger" icon="el-icon-delete" size="mini">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </el-card>
    <el-dialog :title="'添加' + titletext" :visible.sync="dialogVisible" width="50%" @close="addcsc">
      <el-form ref="addpars" :model="addpres" :rules="addprss" label-width="100px">
        <el-form-item :label="titletext + ':'" prop="attr_name">
          <el-input v-model="addpres.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addparsms">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { categorieslist, categoriesacc, categoriesadds } from '../../api'

export default {
  data() {
    return {
      parmlist: [],
      parval: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      selectedopt: [],
      activeName: 'many',
      manytabledata: [],
      omlytabdata: [],
      dialogVisible: false,
      addpres: {
        attr_name: '',
      },
      addprss: {
        attr_name: [
          { required: true, message: `请输入参数名称`, trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.catlist()
  },
  computed: {
    isbled() {
      if (this.selectedopt.length != 3) {
        return true
      }
      return false
    },
    cateid() {
      if (this.selectedopt.length === 3) {
        return this.selectedopt[2]
      }
      return null
    },
    titletext() {
      if (this.activeName === 'many') {
        return '动态参数'
      }
      return '静态属性'
    },
  },
  methods: {
    async catlist() {
      const res = await categorieslist()
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      //   console.log(res)
      this.parmlist = res.data
    },
    async handleChange() {
      this.parlists()
    },
    handleClick() {
      console.log(this.activeName)
      this.parlists()
    },
    async parlists() {
      if (this.selectedopt.length !== 3) {
        this.selectedopt = []
        return
      }
      const res = await categoriesacc(this.cateid, { params: { sel: this.activeName } })
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      console.log(res)
      if (this.activeName === 'many') {
        this.manytabledata = res.data
      } else {
        this.omlytabdata = res.data
      }
    },
    addcsc() {
      this.$refs.addpars.resetFields()
    },
    addparsms() {
      this.$refs.addpars.validate(async val => {
        if (!val) return
        const res = await categoriesadds(this.cateid, {
          attr_name: this.addpres.attr_name,
          attr_sel: this.activeName,
        })
        Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success(res.msg)
        this.dialogVisible = false
        this.parlists()
      })
    },
  },
}
</script>

<style lang="less" scoped></style>
