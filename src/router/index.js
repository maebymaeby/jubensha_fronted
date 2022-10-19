import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    component: () => import('@/views/Data.vue'),
    children: [
      // 首页
      {
        path: '/FrontPage',
        component: () => import('@/components/Data/FrontPage.vue'),
      },
      // 活动相关
      {
        path: '/CreateActivity',
        component: () => import('@/components/Data/Activity/CreateActivity.vue'),
      },
      {
        path: '/JoinActivity',
        component: () => import('@/components/Data/Activity/JoinActivity.vue'),
      },
      {
        path: '/BrowseActivity',
        component: () => import('@/components/Data/Activity/BrowseActivity.vue'),
      },
      {
        path: '/SearchActivity',
        component: () => import('@/components/Data/Activity/SearchActivity.vue'),
      },
      // 用户相关
      {
        path: '/UserRegister',
        component: () => import('@/components/Data/User/UserRegister.vue'),
      },
      {
        path: '/UserCredit',
        component: () => import('@/components/Data/User/UserCredit.vue'),
      },
      {
        path: '/UserInfo',
        component: () => import('@/components/Data/User/UserInfo.vue'),
      },
      //管理员相关
      {
        path: '/UserManagement',
        component: () => import('@/components/Data/Admin/UserManagement.vue'),
      },
      {
        path: '/UserGroup',
        component: () => import('@/components/Data/Admin/UserGroup.vue'),
      },
    ],
  }, ]
})

const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default router