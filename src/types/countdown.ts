/**
 * Countdown 模块类型定义
 */

export type Theme = 'blue' | 'purple' | 'green' | 'orange' | 'pink'

export interface Countdown {
  id: number
  title: string
  description?: string
  targetTime: number // 时间戳
  theme: Theme
  isPaused: boolean
  createdAt: number
  hasShownAlert?: boolean // 是否已显示过到期提醒
}

export interface TimeRemaining {
  days: number
  hours: number
  minutes: number
  seconds: number
  total: number // 总毫秒数
  isExpired: boolean
}

export interface ThemeOption {
  value: Theme
  label: string
  color: string
}

export interface CountdownFormData {
  title: string
  targetTime: any
  description: string
  theme: Theme
}
