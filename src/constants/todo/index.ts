/**
 * Todo 模块常量
 */

import type { Priority, PriorityOption } from '@/types/todo'

export const DEFAULT_PRIORITY: Priority = 'medium'

export const STORAGE_KEY = 'tasks'

export const PRIORITY_LABELS: Record<Priority, string> = {
  high: '高',
  medium: '中',
  low: '低',
}

export const PRIORITY_OPTIONS: PriorityOption[] = [
  { value: 'low', label: '低优先级' },
  { value: 'medium', label: '中优先级' },
  { value: 'high', label: '高优先级' },
]

export const PRIORITY_ICONS = {
  low: '🟢',
  medium: '🟡',
  high: '🔴',
}
