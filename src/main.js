/**
 * @Author: 飞帅
 * @Date: 2022-03-27 19:16:56
 * @LastEditTime: 2022-04-18 10:27:26
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */
import ElementUI from 'element-ui'
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/style.css'
import ZkTable from 'vue-table-with-tree-grid'
import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

Vue.use(VueQuillEditor /* { default global options } */)
Vue.component('Zk-Table', ZkTable)
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
axios.defaults.baseURL = 'https://lianghj.top:8888/api/private/v1/'
Vue.prototype.$http = axios
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
//生成验证
Vue.use(ElementUI)
// ElementUI
Vue.config.productionTip = false
// import Vue from 'vue'
Vue.filter('dateFormat', function (originVal) {
  // console.log(originVal)
  const dt = new Date(originVal)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d} ${hh}:${mm}:${ss}`
})

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
