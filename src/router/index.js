//配置路由
import VueRouter from "vue-router";

const Router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: [
  {
    path: '/',
    component: () => import('@/views/MainView.vue'),
    children: [
      // 首页
      {
        path: '/FrontPage',
        component: () => import('@/components/FrontPage.vue'),
      },
      // 活动相关
      {
        path: '/ActivityPage',
        component: () => import('@/components/ActivityComponent/ActivityPage.vue'),
      },
      {
        path: '/CreatePage',
        component: () => import('@/components/ActivityComponent/CreatePage.vue'),
      },
      {
        path: '/ConcernPage',
        component: () => import('@/components/ActivityComponent/ConcernPage.vue'),
      },
      {
        path: '/AttendPage',
        component: () => import('@/components/ActivityComponent/AttendPage.vue'),
      },
      {
        path: '/ActivityInfo',
        component: () => import('@/components/ActivityComponent/ActivityInfo.vue'),
      },
      {
        path: '/CreateInfo',
        component: () => import('@/components/ActivityComponent/CreateInfo.vue'),
      },
      {
        path: '/CreateActivity',
        component: () => import('@/components/ActivityComponent/CreateActivity.vue'),
      },
      // 用户相关
      {
        path: '/UserPage',
        component: () => import('@/components/UserComponent/UserPage.vue'),
      },
      {
        path: '/UserSetting',
        component: () => import('@/components/UserComponent/UserSetting.vue'),
      },
      {
        path: '/UserVerify',
        component: () => import('@/components/UserComponent/UserVerify.vue'),
      },
    ]
  }],
})
export default Router