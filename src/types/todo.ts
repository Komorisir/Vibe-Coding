/**
 * Todo 模块类型定义
 */

export type Priority = 'low' | 'medium' | 'high'

export interface Task {
  id: number
  text: string
  completed: boolean
  priority: Priority
}

export interface PriorityOption {
  value: Priority
  label: string
  icon?: string
}
