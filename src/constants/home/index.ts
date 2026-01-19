/**
 * 首页常量配置
 */

import type { AppItem, CategoryItem } from '@/types/home'

// 应用分类
export const CATEGORIES: CategoryItem[] = [
  { value: 'all', label: '全部', icon: '📱' },
  { value: 'tools', label: '实用工具', icon: '🛠️' },
  { value: 'image', label: '图片工具', icon: '🖼️' },
  { value: 'entertainment', label: '娱乐休闲', icon: '🎮' },
]

// 应用列表
export const APP_LIST: AppItem[] = [
  {
    id: 'todo',
    name: '待办事项',
    description: '记录每一天的精彩，管理你的任务',
    icon: '📝',
    category: 'tools',
    component: 'todo',
    tags: ['任务管理', '待办', '效率'],
  },
  {
    id: 'countdown',
    name: '倒计时',
    description: '记录重要时刻，珍惜每一秒',
    icon: '⏰',
    category: 'tools',
    component: 'countdown',
    tags: ['倒计时', '时间管理', '提醒'],
  },
]
