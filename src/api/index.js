/**
 * @Author: 飞帅
 * @Date: 2022-03-29 15:33:29
 * @LastEditTime: 2022-04-14 16:33:51
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */
// import Vue from 'vue'
import axios from './post'
//判断失败与成功
// Object.keys(arr).length == 1 ? this.$message.error(arr.msg) : this.$message.success(arr.msg)
//获取数据展现给return
export function sjzs(res, dk) {
  // console.log(res)
  if (res.meta.status !== dk)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function roles() {
  const { data: res } = await axios({
    url: 'roles',
    method: 'GET',
  })
  return res
}
export async function removeid(a, b) {
  const { data: res } = await axios.delete(`roles/${a}/rights/${b}`)
  return res
}
//
export async function allocation() {
  const { data: res } = await axios.get(`rights/tree`)
  return sjzs(res, 200)
}
export async function acyiiis(id, dtas) {
  const { data: res } = await axios.post(`roles/${id}/rights`, { rids: dtas })
  return sjzs(res, 200)
}
export async function rolesls() {
  const { data: res } = await axios.get('roles')
  return sjzs(res, 200)
}
export async function roleslsuser(id, dtas) {
  const { data: res } = await axios.put(`users/${id}/role`, { rid: dtas })
  return sjzs(res, 200)
}
export async function catelist(dtas) {
  const { data: res } = await axios.get('categories', dtas)
  return sjzs(res, 200)
}
// categories
export async function categorieslist(dtas) {
  // console.log(dtas)
  const { data: res } = await axios.get('categories', dtas)
  return sjzs(res, 200)
}
export async function categoriesadd(dtas) {
  // console.log(dtas)

  const { data: res } = await axios.post('categories', dtas)
  // console.log(res)
  return sjzs(res, 201)
}
export async function categoriesacc(id, dtas) {
  const { data: res } = await axios.get(`categories/${id}/attributes`, dtas)
  return sjzs(res, 200)
}
export async function categoriesadds(id, dtas) {
  const { data: res } = await axios.post(`categories/${id}/attributes`, dtas)
  return sjzs(res, 201)
}
//添加角色用户
export async function adduser(dtas) {
  const { data: res } = await axios.post('roles', dtas)
  return sjzs(res, 201)
}
//获取角色用户id下的信息
export async function getuser(id) {
  const { data: res } = await axios.get(`roles/${id}`)
  return sjzs(res, 200)
}
//提交修改角色用户信息
export async function putuser(id, dtas) {
  // console.log(id, dtas)
  const { data: res } = await axios.put(`roles/${id}`, dtas)
  return sjzs(res, 200)
}
//删除提交修改角色用户信息
export async function deluser(id) {
  const { data: res } = await axios.delete(`roles/${id}`)
  return sjzs(res, 200)
}
//根据商品分类id获取商品分类信息
export async function getcate(id) {
  const { data: res } = await axios.get(`categories/${id}`)
  return sjzs(res, 200)
}
//修改商品分类信息
export async function putcate(id, dtas) {
  const { data: res } = await axios.put(`categories/${id}`, dtas)
  return sjzs(res, 200)
}
//删除商品分类信息
export async function delcates(id) {
  const { data: res } = await axios.delete(`categories/${id}`)
  return sjzs(res, 200)
}
//  修改商品分类信息  属性
export async function putcates(id, attrId, dtas) {
  const { data: res } = await axios.get(`categories/${id}/attributes/${attrId}`, dtas)
  return sjzs(res, 200)
}
//修改商品分类信息  属性
export async function putcatesadd(id, attrId, dtas) {
  const { data: res } = await axios.put(`categories/${id}/attributes/${attrId}`, dtas)
  return sjzs(res, 200)
}
//删除商品分类信息  属性
export async function delcatesadd(id, attrId) {
  const { data: res } = await axios.delete(`categories/${id}/attributes/${attrId}`)
  return sjzs(res, 200)
}
// 商品列表数据 分页
export async function getgoods(dtas) {
  const { data: res } = await axios.get('goods', dtas)
  return sjzs(res, 200)
}
//删除商品列表数据  分页
export async function delgoods(id) {
  console.log(id)
  const { data: res } = await axios.delete(`goods/${id}`)
  console.log(res)
  return sjzs(res, 200)
}
//商品列表数据
export async function categorislist() {
  const { data: res } = await axios.get('categories')
  return sjzs(res, 200)
}
//获取数据库中的商品分类信息
export async function getcatelist(id, datas) {
  const { data: res } = await axios.get(`categories/${id}/attributes`, datas)
  return sjzs(res, 200)
}
//添加商品分类信息
export async function goodsadd(dtas) {
  const { data: res } = await axios.post('goods', dtas)
  return sjzs(res, 201)
}
//根据商品分类id获取商品分类信息
export async function getgoodslist(id) {
  const { data: res } = await axios.get(`goods/${id}`)
  return sjzs(res, 200)
}
//编辑商品分类信息
export async function putgoods(id, dtas) {
  const { data: res } = await axios.put(`goods/${id}`, dtas)
  return sjzs(res, 200)
}
