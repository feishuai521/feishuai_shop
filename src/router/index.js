/**
 * @Author: 飞帅
 * @Date: 2022-03-27 19:16:56
 * @LastEditTime: 2022-04-18 10:21:46
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
      {
        path: '/rights',
        name: 'Right',
        component: () => import('../components/rights/index.vue'),
      },
      {
        path: '/roles',
        name: 'roles',
        component: () => import('../components/rights/roles.vue'),
      },
      {
        path: '/categories',
        name: 'categories',
        component: () => import('../components/goods/categories.vue'),
      },
      {
        path: '/params',
        name: 'params',
        component: () => import('../components/goods/params.vue'),
      },
      {
        path: '/goods',
        name: 'goods',
        component: () => import('../components/goods/goods.vue'),
      },
      {
        path: '/goods/add',
        name: 'goodsadd',
        component: () => import('../components/goods/Add.vue'),
      },
      {
        path: '/goods/edit/:id',
        name: 'goodsedit',
        props: true,
        component: () => import('../components/goods/Add.vue'),
      },
      {
        path: '/orders',
        name: 'orders',
        component: () => import('../components/orders/index.vue'),
      },
      {
        path: '/reports',
        name: 'reports',
        // props: true,
        component: () => import('../components/reports/reports.vue'),
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
