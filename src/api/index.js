/**
 * @Author: 飞帅
 * @Date: 2022-03-29 15:33:29
 * @LastEditTime: 2022-03-29 15:52:54
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */
import axios from './post'
export async function roles() {
  const { data: res } = await axios({
    url: 'roles',
    method: 'GET',
  })
  return res
}
