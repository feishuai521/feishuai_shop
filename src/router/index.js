/**
 * @Author: 飞帅
 * @Date: 2022-03-27 19:16:56
 * @LastEditTime: 2022-03-28 11:22:00
 * @LastEditors: feishuai
 * @Description: blog.feishuai521.cn`
 * @The copyright belongs to Fei Shuai
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login',
  },
  {
    path: '/home',
    name: 'Home',
    // isflag: true,
    component: () => import('../components/home.vue'),
    redirect: '/webHone',
    children: [
      {
        path: '/webHone',
        name: 'webhome',
        component: () => import('../components/webHome.vue'),
      },
      {
        path: '/users',
        name: 'users',
        component: () => import('../components/user/user.vue'),
      },
    ],
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue'),
  },
  {
    path: '/login',
    name: 'login',
    // isflag: false,
    component: () => import('../components/Login.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
})
router.beforeEach((to, from, next) => {
  // console.log(to, from)
  if (to.path === '/login') return next()
  const tokenster = window.sessionStorage.getItem('token')
  if (!tokenster) return next('/login')
  next()
})
export default router
