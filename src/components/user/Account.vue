<!--
 * @Author: 飞帅
 * @Date: 2022-03-29 09:10:52
 * @LastEditTime: 2022-03-29 09:27:09
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->

<script>
export default {
  props: {
    Account: {
      type: Boolean,
    },
  },
  watch: {
    Account(a) {
      console.log(a)
    },
  },
}
</script>

<style lang="less" scoped></style>
