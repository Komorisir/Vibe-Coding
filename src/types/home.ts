/**
 * 首页模块类型定义
 */

export type AppCategory = 'all' | 'tools' | 'image' | 'entertainment'

export interface AppItem {
  id: string
  name: string
  description: string
  icon: string
  category: AppCategory
  component: string // 组件名称
  tags?: string[]
}

export interface CategoryItem {
  value: AppCategory
  label: string
  icon: string
}
