/**
 * Vue Router 配置
 */

import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/home/index.vue'),
    meta: {
      title: '首页',
    },
  },
  {
    path: '/todo',
    name: 'Todo',
    component: () => import('@/views/todo/index.vue'),
    meta: {
      title: '待办事项',
    },
  },
  {
    path: '/countdown',
    name: 'Countdown',
    component: () => import('@/views/countdown/index.vue'),
    meta: {
      title: '倒计时',
    },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 路由守卫 - 更新页面标题
router.beforeEach((to, _from, next) => {
  const title = to.meta.title as string
  if (title) {
    document.title = `${title} - Vibe Coding`
  }
  next()
})

export default router
