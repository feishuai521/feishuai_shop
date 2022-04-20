<!--
 * @Author: 飞帅
 * @Date: 2022-04-17 20:10:47
 * @LastEditTime: 2022-04-18 10:15:09
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <breadcrumb :breadcrumb="[{ name: '订单管理' }, { name: '订单列表' }]" />
    <el-card
      ><el-row :gutter="20">
        <el-col :span="8">
          <el-input placeholder="请输入内容" class="input-with-select" clearable @clear="goodslist">
            <el-button slot="append" icon="el-icon-search" @click="goodslist"></el-button>
          </el-input>
        </el-col>
      </el-row>
      <el-table :data="Orderslist" border stripe>
        <el-table-column type="index" label="ID" width="60px" align="center"></el-table-column>
        <el-table-column prop="order_number" label="订单编号" align="center"></el-table-column>
        <el-table-column prop="order_price" label="订单价格" align="center"></el-table-column>
        <el-table-column prop="pay_status" label="是否付款" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.pay_status == 1" type="success">已付款</el-tag>
            <el-tag v-else type="danger">未付款</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="is_send" label="是否发货" align="center"></el-table-column>
        <el-table-column prop="create_time" label="下单时间" align="center">
          <template slot-scope="scope">
            {{ scope.row.create_time | dateFormat }}
            <!-- {{ scope.row.create_time | dateFormat }} -->
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="primary" icon="el-icon-edit" size="mini" @click="oderedie"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" @click="goodsidlate(scope.row)"></el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryInfo.pagenum"
        :page-sizes="[5, 10, 15]"
        :page-size="queryInfo.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        background
      >
      </el-pagination>
    </el-card>
    <el-dialog title="修改地址" :visible.sync="eiderdialogVisible" width="50%" @close="eideroderClose">
      <el-form ref="addressFromRef" :model="addressFrom" :rules="addressFromrules" label-width="120px">
        <el-form-item label="省市区/县" prop="address">
          <el-cascader :options="citdata" v-model="addressFrom.address"> </el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressFrom.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="eiderdialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="eiderdialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="物流进度" :visible.sync="prooialogVisible" width="50%">
      <el-timeline>
        <el-timeline-item v-for="(activity, index) in wuliuList" :key="index" :timestamp="activity.time">
          {{ activity.context }}
        </el-timeline-item>
      </el-timeline>
    </el-dialog>
  </div>
</template>

<script>
import breadcrumb from '../companie/breadcrumb.vue'
import { getorderlist, getorderlistwuliu } from '../../api/'
import citdata from './citdata'
export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
      Orderslist: [],
      total: 0,
      //修改
      eiderdialogVisible: false,
      addressFrom: {
        address: [],
        address2: '',
      },
      //校验  是否为空
      addressFromrules: {
        address: [{ required: true, message: '请选择省市区/县', trigger: 'blur' }],
        address2: [{ required: true, message: '请输入详细地址', trigger: 'blur' }],
      },
      citdata,
      //物流
      prooialogVisible: false,
      //物流列表
      wuliuList: [],
    }
  },
  created() {
    this.goodslist()
  },
  methods: {
    async goodslist() {
      const res = await getorderlist({ params: this.queryInfo })
      if (Object.keys(res).length == 1) return this.$message.error(res.msg)
      this.$message.success('查询成功')
      console.log(res)

      this.Orderslist = res.data.goods
      this.total = res.data.total
    },
    handleSizeChange(val) {
      this.queryInfo.pagesize = val
      this.goodslist()
    },
    handleCurrentChange(val) {
      this.queryInfo.pagenum = val
      this.goodslist()
    },
    oderedie() {
      this.eiderdialogVisible = true
    },
    eideroderClose() {
      //清空  数据
      this.$refs.addressFromRef.resetFields()
    },
    //物流
    async goodsidlate() {
      const res = await getorderlistwuliu('1106975712662')
      this.wuliuList = res.data
      this.prooialogVisible = true
    },
  },
}
</script>

<style lang="less" scoped>
.el-cascader {
  width: 100%;
}
</style>
