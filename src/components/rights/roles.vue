<!--
 * @Author: 飞帅
 * @Date: 2022-03-29 15:19:02
 * @LastEditTime: 2022-04-09 08:15:33
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
        <el-col><el-button type="primary" @click="addrole">添加角色</el-button> </el-col>
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
                :key="inds"
              >
                <el-col :span="4"
                  ><el-tag closable @close="removeid(scope.row, item.id)">{{ item.authName }}</el-tag>
                  <i class="el-icon-caret-right"></i>
                </el-col>
                <el-col :span="19">
                  <el-row :class="['tag-button', inds2 === 0 ? 'tag-top' : '', 'val']" v-for="(itemm, inds2) in item.children" :key="inds2">
                    <el-col :span="6"
                      ><el-tag closable type="success" @close="removeid(scope.row, itemm.id)">{{ itemm.authName }}</el-tag>
                      <i class="el-icon-caret-right"></i>
                    </el-col>
                    <el-col :span="16">
                      <el-tag
                        closable
                        type="warning"
                        :class="['tag-button', inds3 === 0 ? 'tag-top' : '']"
                        v-for="(item3, inds3) in itemm.children"
                        :key="inds3"
                        @close="removeid(scope.row, item3.id)"
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
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="getxiu(scope.row)">编辑</el-button>
            <el-button type="danger" size="mini" icon="el-icon-delete" @click="rolesromeve(scope.row.id)">删除</el-button>
            <el-button type="warning" size="mini" icon="el-icon-star-off" @click="showdiloag(scope.row)">分配权限</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <el-dialog title="权限分配" :visible.sync="allocati" width="50%" @close="allocatiact">
      <el-tree
        :data="allocationlist"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-checked-keys="dekey"
        ref="treeref"
        :props="treeProps"
      >
      </el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocati = false">取 消</el-button>
        <el-button type="primary" @click="acyiii">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="添加角色" :visible.sync="allocatiadd" width="50%" @close="allocatiacte">
      <el-form :model="addrolelist" :rules="addlisRuse" ref="addlisRuseRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addrolelist.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addrolelist.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocati = false">取 消</el-button>
        <el-button type="primary" @click="acyiiiadds">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog title="修改角色" :visible.sync="allocatixiug" width="50%">
      <el-form :model="addrolelistx" :rules="addlisRusex" ref="addlisRusesRef" label-width="100px" class="demo-ruleForm">
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addrolelistx.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addrolelistx.roleDesc"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="allocati = false">取 消</el-button>
        <el-button type="primary" @click="acyiiixiug">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { roles, removeid, allocation, acyiiis, adduser, getuser, putuser, deluser } from '../../api/index'
export default {
  data() {
    return {
      roles: [],
      allocati: false,
      allocationlist: [],
      treeProps: {
        label: 'authName',
        children: 'children',
      },
      dekey: [],
      raid: '',
      //添加角色
      allocatiadd: false,
      //角色列表数据
      addrolelist: {
        roleName: '',
        roleDesc: '',
      },
      //添加角色表单验证
      addlisRuse: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 3, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
      },
      //修改角色
      allocatixiug: false,
      //角色id
      roleid: '',
      //修改角色数据
      addrolelistx: {
        id: '',
        roleName: '',
        roleDesc: '',
      }, //修改角色表单验证
      addlisRusex: {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 3 到 8 个字符', trigger: 'blur' },
        ],
        roleDesc: [
          { required: true, message: '请输入角色描述', trigger: 'blur' },
          { min: 3, max: 20, message: '长度在 3 到 20 个字符', trigger: 'blur' },
        ],
      },
    }
  },

  computed: {
    //获取修改角色数据id
    getid() {
      return this.addrolelistx
    },
  },
  created() {
    this.roleslist()
    console.log(this.roleslist())
    // this.desfkey(this.roles, this.desfkey)
  },
  methods: {
    async roleslist() {
      const res = await roles()
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.roles = res.data
      console.log(res)
    },
    async removeid(id, idd) {
      console.log(id, idd)
      const res = await this.$confirm('需要删除账号吗？', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消删除',
        type: 'warning',
      }).catch(err => err)

      if (res !== 'confirm') return this.$message.warning('取消删除成功')
      //   console.log(id, idd)
      const ress = await removeid(id.id, idd)
      console.log(ress)
      if (ress.meta.status !== 200) return this.$message.error(ress.meta.msg)
      id.children = ress.data
      this.$message.success(ress.meta.msg)
    },
    async showdiloag(role) {
      this.raid = role
      const res = await allocation()
      this.allocationlist = await res.data
      await this.desfkey(role, this.dekey)
      this.allocati = !this.allocati
      // this.$message.success(res.msg)
    },
    desfkey(role, arr) {
      // console.log(role, arr)
      if (!role.children) {
        return arr.push(role.id)
      }
      // console.log(arr)
      role.children.forEach(element => this.desfkey(element, arr))
    },
    allocatiact() {
      this.dekey = []
    },
    async acyiii() {
      const key = [...this.$refs.treeref.getCheckedKeys(), ...this.$refs.treeref.getHalfCheckedKeys()]
      const idag = key.join(',')
      const arr = await acyiiis(this.raid.id, idag)
      // 判断是否返回失败验证
      Object.keys(arr).length == 1 ? this.$message.error(arr.msg) : this.$message.success(arr.msg)
      this.roleslist()
      this.allocati = !this.allocati
    },
    //关闭空添加角色
    allocatiacte() {
      this.$refs.addlisRuseRef.resetFields()
    },
    addrole() {
      this.allocatiadd = true
    },
    acyiiiadds() {
      this.$refs.addlisRuseRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整信息')

        const res = await adduser(this.addrolelist)
        Object.keys(res).length == 1 ? this.$message.error(res.msg) : this.$message.success(res.msg)
        this.allocatiadd = false
        this.roleslist()
      })
    },
    //获取修改角色数据
    async getxiu(rloe) {
      this.allocatixiug = true
      this.roleid = rloe.id
      const res = await getuser(rloe.id)
      this.addrolelistx = res.data
      // console.log(res)
    },
    //修改角色
    acyiiixiug() {
      this.$refs.addlisRusesRef.validate(async valid => {
        if (!valid) return this.$message.error('请填写完整信息')
        //查看修改角色数据
        // console.log(this.getid)
        const ress = await putuser(this.roleid, this.addrolelistx)
        Object.keys(ress).length == 1 ? this.$message.error(ress.msg) : this.$message.success(ress.msg)
        this.allocatixiug = false
        this.roleslist()
      })
    },
    //删除角色
    async rolesromeve(id) {
      console.log(id)
      const res = await this.$confirm('需要删除角色吗？', '提示', {
        confirmButtonText: '确认删除',
        cancelButtonText: '取消删除',
        type: 'warning',
      }).catch(err => err)
      console.log(res)
      if (res !== 'confirm') return this.$message.warning('取消删除成功')
      const ress = await deluser(id)
      Object.keys(ress).length == 1 ? this.$message.error(ress.msg) : this.$message.success(ress.msg)
      this.roleslist()
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
