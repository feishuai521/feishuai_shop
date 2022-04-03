/**
 * @Author: 飞帅
 * @Date: 2022-03-29 15:33:29
 * @LastEditTime: 2022-04-03 20:38:49
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
export async function categoriesadd(dtas) {
  // console.log(dtas)

  const { data: res } = await axios.post('categories', dtas)
  // console.log(res)
  if (res.meta.status !== 201)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function categoriesacc(id, dtas) {
  console.log(dtas)

  const { data: res } = await axios.get(`categories/${id}/attributes`, dtas)
  // console.log(res)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
export async function categoriesadds(id, dtas) {
  const { data: res } = await axios.post(`categories/${id}/attributes`, dtas)
  if (res.meta.status !== 201)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
//添加角色用户
export async function adduser(dtas) {
  const { data: res } = await axios.post('roles', dtas)
  if (res.meta.status !== 201)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
//获取角色用户id下的信息
export async function getuser(id) {
  const { data: res } = await axios.get(`roles/${id}`)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
//提交修改角色用户信息
export async function putuser(id, dtas) {
  console.log(id, dtas)
  const { data: res } = await axios.put(`roles/${id}`, dtas)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
//删除提交修改角色用户信息
export async function deluser(id) {
  const { data: res } = await axios.delete(`roles/${id}`)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
//根据商品分类id获取商品分类信息
export async function getcate(id) {
  const { data: res } = await axios.get(`categories/${id}`)
  if (res.meta.status !== 200)
    return {
      msg: res.meta.msg,
    }
  return {
    msg: res.meta.msg,
    data: res.data,
  }
}
