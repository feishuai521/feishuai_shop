<!--
 * @Author: 飞帅
 * @Date: 2022-03-31 08:05:18
 * @LastEditTime: 2022-04-04 10:05:11
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品分类</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col><el-button type="primary" @click="showcatadd">添加分类</el-button> </el-col>
      </el-row>
      <Zk-Table
        :data="catelist"
        :columns="columns"
        :selection-type="false"
        :expand-type="false"
        show-index
        index-text="ID"
        border
        :show-row-hover="false"
        style="margin: 15px 0"
      >
        <template slot="isok" slot-scope="scope">
          <!-- {{ scope.row }} -->
          <i class="el-icon-success" v-if="scope.row.cat_deleted == true" style="color: #27ae60; font-size: 16px"></i>
          <i class="el-icon-error" v-else style="color: #e74c3c; font-size: 16px"></i>
        </template>
        <template slot="onther" slot-scope="scope">
          <!-- {{ scope.row }} -->
          <el-tag v-if="scope.row.cat_level === 0">一级</el-tag>
          <el-tag type="success" v-else-if="scope.row.cat_level === 1">二级</el-tag>
          <el-tag type="warning" v-else>三级</el-tag>
        </template>
        <template slot="opt" slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" size="mini" @click="shopcate(scope.row)">编辑</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="delcate(scope.row.cat_id)">删除</el-button>
        </template>
      </Zk-Table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="qerinfo.pagenum"
        :page-sizes="[3, 5, 10, 15]"
        :page-size="qerinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="todal"
      >
      </el-pagination>
    </el-card>
    <el-dialog title="添加分类" :visible.sync="catadd" width="50%" @close="addScaties">
      <el-form :model="addcatfrom" :rules="addcatfroms" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="addcatfrom.cat_name"></el-input>
        </el-form-item>
        <el-form-item label="父级分类">
          <el-cascader
            v-model="pashli"
            expand-trigger="hover"
            clearable
            :options="pashlist"
            :props="catdel"
            @change="ptahandleChange"
            change-on-select
          ></el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="catadd = false">取 消</el-button>
        <el-button type="primary" @click="addcat">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改分类" :visible.sync="xgcatddfasle" width="50%">
      <el-form ref="xgcatddRef" :model="xgcatddForm" label-width="100px" :rules="xgcatddForms">
        <el-form-item label="分类名称" prop="cat_name">
          <el-input v-model="xgcatddForm.cat_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="xgcatddfasle = false">取 消</el-button>
        <el-button type="primary" @click="xgcatddadd">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { catelist, categorieslist, categoriesadd, getcate, putcate, delcates } from '../../api'

export default {
  data() {
    return {
      qerinfo: {
        type: 3,
        pagenum: 1,
        pagesize: 5,
      },
      catelist: [],
      todal: 0,
      columns: [
        { label: '分类对象', prop: 'cat_name' },
        { label: '是否有效', type: 'template', template: 'isok' },
        { label: '排序', type: 'template', template: 'onther' },
        { label: '操作', type: 'template', template: 'opt' },
      ],
      catadd: false,
      addcatfrom: {
        cat_pid: 0,
        cat_name: '',
        cat_level: 0,
      },
      catdel: {
        value: 'cat_id',
        label: 'cat_name',
        children: 'children',
      },
      addcatfroms: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个', trigger: 'blur' },
        ],
      },
      pashlist: [],
      pashli: [],
      //查询id获取数据
      catidd: 0,
      xgcatddfasle: false,
      //修改分类内容
      xgcatddForm: {
        cat_name: '',
      },
      //校验分类内容
      xgcatddForms: {
        cat_name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个', trigger: 'blur' },
        ],
      },
    }
  },
  created() {
    this.catelis()
    console.log(this.pashli)
  },
  methods: {
    async catelis() {
      const res = await catelist({ params: this.qerinfo })
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      this.catelist = res.data.result
      this.todal = res.data.total
      // console.log(res)
    },
    handleSizeChange(a) {
      this.qerinfo.pagesize = a
      this.catelis()
    },
    handleCurrentChange(a) {
      this.qerinfo.pagenum = a
      this.catelis()
    },
    async showcatadd() {
      this.catadd = true
      const res = await categorieslist()
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      // console.log(res.data)
      this.pashlist = res.data
    },
    ptahandleChange() {
      if (this.pashli.length > 0) {
        this.addcatfrom.cat_pid = this.pashli[this.pashli.length - 1]
        this.addcatfrom.cat_level = this.pashli.length
        return
      } else {
        this.addcatfrom.cat_pid = 0
        this.addcatfrom.cat_level = 0
      }
    },
    addcat() {
      this.$refs.ruleForm.validate(async val => {
        if (!val) return
        const res = await categoriesadd(this.addcatfrom)
        Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
        this.catelis()
        this.catadd = false
      })
    },
    addScaties() {
      this.$refs.ruleForm.resetFields()
      this.pashli = []
      this.addcatfrom.cat_pid = 0
      this.addcatfrom.cat_level = 0
    },
    //查询id获取数据
    async shopcate(row) {
      this.catidd = row.cat_id
      const res = await getcate(this.catidd)
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ''
      this.xgcatddForm.cat_name = res.data.cat_name
      this.xgcatddfasle = true
    },
    //修改分类内容
    xgcatddadd() {
      this.$refs.xgcatddRef.validate(async val => {
        if (!val) return
        const res = await putcate(this.catidd, this.xgcatddForm)
        Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success('修改成功')
        this.catelis()
        this.xgcatddfasle = false
      })
    },
    //删除分类
    async delcate(row) {
      const res = await this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      }).catch(err => err)
      if (res !== 'confirm') return this.$message.error('取消删除')
      const ress = await delcates(row)
      Object.keys(ress).length == 1 ? this.$message.error(ress.msg) : this.$message.success('删除成功')
      this.catelis()
    },
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
