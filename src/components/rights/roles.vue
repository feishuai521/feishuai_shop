<!--
 * @Author: 飞帅
 * @Date: 2022-03-29 15:19:02
 * @LastEditTime: 2022-03-29 17:58:25
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * The copyright belongs to Fei Shuai
-->
<template>
  <div class="roles">
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/webHone' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <el-row>
        <el-col><el-button type="primary">添加角色</el-button> </el-col>
      </el-row>
      <el-table :data="roles" border style="width: 100%; margin: 10px 0">
        <el-table-column type="expand" width="80%">
          <template slot-scope="scope">
            <!-- <pre>{{ scope.row.children }}</pre> -->
            <div>
              <el-row
                :gutter="20"
                v-for="(item, inds) in scope.row.children"
                :span="5"
                :class="['tag-button', inds === 0 ? 'tag-top' : '', 'val']"
                :key="item.id"
              >
                <el-col :span="4"
                  ><el-tag closable @click="disschaid(item.id)">{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row
                    :class="['tag-button', inds2 === 0 ? 'tag-top' : '', 'val']"
                    v-for="(itemm, inds2) in item.children"
                    :key="itemm.id"
                  >
                    <el-col :span="6"
                      ><el-tag @click="disschaid(itemm.id)" closable type="success">{{ itemm.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-tag
                        @click="disschaid(item3.id)"
                        closable
                        type="warning"
                        :class="['tag-button', inds3 === 0 ? 'tag-top' : '']"
                        v-for="(item3, inds3) in itemm.children"
                        :key="item3"
                        >{{ item3.authName }}</el-tag
                      >
                    </el-col>
                  </el-row>
                </el-col>
              </el-row>
            </div>
          </template>
        </el-table-column>
        <el-table-column type="index" label="ID"></el-table-column>
        <el-table-column prop="roleName" label="角色名称" width="180"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="180"> </el-table-column>
        <el-table-column label="操作">
          <template>
            <el-button type="primary" size="mini" icon="el-icon-edit">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-star-off">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { roles } from '../../api/index'
export default {
  data() {
    return {
      roles: [],
    }
  },
  created() {
    this.roleslist()
  },
  methods: {
    async roleslist() {
      const res = await roles()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.roles = res.data
      console.log(res)
    },
    disschaid(id) {
      console.log(id)
    },
  },
}
</script>

<style lang="less" scoped>
.roles {
  .el-tag {
    margin: 10px 7px;
  }
}
.tag-button {
  border-bottom: 1px solid #eee;
  &:last-child {
    border-bottom: none;
  }
}
.tag-top {
  border-top: 1px solid #eee;
}
.val {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
