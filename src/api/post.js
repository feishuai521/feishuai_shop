/**
 * @Author: 飞帅
 * @Date: 2022-03-28 09:56:25
 * @LastEditTime: 2022-04-03 17:12:52
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */

import axios from 'axios'
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
// 添加请求拦截器
axios.interceptors.request.use(
  function (config) {
    // console.log(config)
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// 添加响应拦截器
axios.interceptors.response.use(
  function (response) {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response
  },
  function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default axios
