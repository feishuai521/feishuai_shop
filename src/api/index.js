/**
 * @Author: 飞帅
 * @Date: 2022-03-29 15:33:29
 * @LastEditTime: 2022-03-31 10:35:16
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */
// import Vue from 'vue'
import axios from './post'
//判断失败与成功
// Object.keys(arr).length == 1 ? this.$message.error(arr.msg) : this.$message.success(arr.msg)

// Vue.use(ElementUI)
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
  // console.log(falg)
  const { data: res } = await axios.get(`rights/tree`)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function acyiiis(id, dtas) {
  console.log(id, dtas)
  const { data: res } = await axios.post(`roles/${id}/rights`, { rids: dtas })
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function rolesls() {
  const { data: res } = await axios.get('roles')
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function roleslsuser(id, dtas) {
  console.log(id, dtas)
  const { data: res } = await axios.put(`users/${id}/role`, { rid: dtas })
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function catelist(dtas) {
  // console.log(dtas)
  const { data: res } = await axios.get('categories', dtas)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
// categories
export async function categorieslist(dtas) {
  // console.log(dtas)
  const { data: res } = await axios.get('categories', dtas)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
