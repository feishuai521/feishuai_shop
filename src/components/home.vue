<!--
 * @Author: 飞帅
 * @Date: 2022-03-28 08:28:26
 * @LastEditTime: 2022-03-28 11:17:46
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="home_el">
    <el-container>
      <el-header>
        <div>
          <div><img src="../assets/fs.png" alt="" width="120" />电商后台管理系统</div>
        </div>
        <el-button type="info" @click="Logout">退出</el-button>
      </el-header>
      <el-container>
        <el-aside :width="!isCollapse ? '200px' : '65px'">
          <div class="togg" @click="spread"><i :class="!isCollapse ? 'el-icon-s-fold' : 'el-icon-s-unfold'"></i></div>
          <el-menu
            class="el-menu-vertical-demo"
            background-color="#2c3e50"
            text-color="#fff"
            active-text-color="#ffd04b"
            :unique-opened="true"
            :collapse="isCollapse"
            :collapse-transition="false"
            :router="true"
          >
            <el-submenu :index="item.id + ''" v-for="item in list" :key="item.id">
              <template slot="title">
                <i :class="objinco[item.id]"></i>
                <span>{{ item.authName }}</span>
              </template>
              <el-menu-item :index="'/' + item.path + ''" v-for="ite in item.children" :key="ite.id">
                <template slot="title">
                  <i class="el-icon-menu"></i>
                  <span>{{ ite.authName }}</span>
                </template>
              </el-menu-item>
            </el-submenu>
          </el-menu>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
      list: [],
      objinco: {
        125: 'el-icon-user-solid',
        103: 'el-icon-s-help',
        101: 'el-icon-s-cooperation',
        102: 'el-icon-s-order',
        145: 'el-icon-s-marketing',
      },
    }
  },
  created() {
    this.getlist()
  },
  methods: {
    Logout() {
      window.sessionStorage.clear()
      this.$router.push('./Login')
      this.$message.message('退出成功')
    },
    async getlist() {
      const { data: res } = await this.$http.get('menus')
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.list = res.data
      console.log(this.list)
    },
    spread() {
      this.isCollapse = !this.isCollapse
    },
  },
}
</script>

<style lang="less" scoped>
.el-container,
.home_el {
  height: 100%;
  .el-header {
    background-color: #34495e;
    display: flex;
    justify-content: space-between;
    padding: 0 10px;
    align-items: center;
    div {
      color: #fff;
      font-size: 20px;
      img {
        vertical-align: middle;
        padding-right: 10px;
      }
    }
  }
  .el-aside {
    background-color: #2c3e50 !important;
    .el-menu {
      border-right: none;
    }
    .togg {
      background-color: #a29bfe;
      text-align: center;
      height: 30px;
      line-height: 30px;
      font-size: 20px;
    }
  }
  .el-main {
    background-color: #ecf0f1;
  }
}
</style>
