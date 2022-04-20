<!--
 * @Author: 飞帅
 * @Date: 2022-04-18 10:18:05
 * @LastEditTime: 2022-04-18 10:43:10
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div>
    <breadcrumb :breadcrumb="[{ name: '数据统计' }, { name: '数据列表' }]" />
    <el-card>
      <div id="main" style="width: 600px; height: 400px"></div>
    </el-card>
  </div>
</template>

<script>
import breadcrumb from '@/components/companie/breadcrumb.vue'
import * as echarts from 'echarts'
import { getorderlisttongji } from '../../api'
import _ from 'lodash'
export default {
  components: {
    breadcrumb,
  },
  data() {
    return {
      options: {},
    }
  },
  async mounted() {
    var myChart = echarts.init(document.getElementById('main'))
    const res = await getorderlisttongji()
    console.log(res)
    const rutes = _.merge(res.data, this.options)
    // 绘制图表

    myChart.setOption(rutes)
  },
}
</script>

<style lang="less" scoped></style>
