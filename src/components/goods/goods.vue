<!--
 * @Author: 飞帅
 * @Date: 2022-04-10 20:36:59
 * @LastEditTime: 2022-04-11 19:20:14
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容" class="input-with-select" clearable v-model="queryinfo.query"
            @clear="goodslist">
            <el-button slot="append" icon="el-icon-search" @click="goodslist"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="goodsdd">添加商品</el-button>
        </el-col>
      </el-row>
      <el-table :data="goodslists" border stripe>
        <el-table-column type="index" label="ID" align="center">
        </el-table-column>
        <el-table-column label="商品名称" prop="goods_name">
        </el-table-column>
        <el-table-column label="商品价格（元）" prop="goods_price" width="90px">
        </el-table-column>
        <el-table-column label="商品重量" prop="goods_weight" width="70px">
        </el-table-column>
        <el-table-column label="创建时间" prop="add_time" width="160px">
          <template slot-scope="scope">
            <!-- {{ scope.row.add_time }} -->
            {{ scope.row.add_time | dateFormat }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180px">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="goodsdd(scope.row)">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="goodsidlate(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
        :current-page="queryinfo.pagenum" :page-sizes="[10, 20, 50, 100]" :page-size="queryinfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper" :total="todal" background>
      </el-pagination>
    </el-card>  </div>
</template>

<script>
import { getgoods, delgoods } from '../../api'
export default {
  name: 'goods',
  data() {
    return {
      queryinfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      todal: 0,
      //存储数据goodslist
      goodslists: [],
    }
  },
  created() {
    this.goodslist()
  },
  methods: {
    async goodslist() {
      const res = await getgoods({ params: this.queryinfo })
      this.todal = res.data.total
      this.goodslists = res.data.goods
      Object.keys(res).length == 1 ? this.$message.error(res.msg) : ""
    },
    handleSizeChange(val) {
      this.queryinfo.pagesize = val
      this.goodslist()
    },
    handleCurrentChange(val) {
      this.queryinfo.pagenum = val
      this.goodslist()
    },
    goodsidlate(row) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });
      }).then(async () => {

        const res = await delgoods(row.goods_id)
        Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success(res.msg)
        this.goodslist()
      })

    },
    goodsdd() {
      this.$router.push({ path: '/goods/add' })
    }
  }
}
</script>

<style lang="less" scoped>
</style>
