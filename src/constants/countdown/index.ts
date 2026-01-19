/**
 * Countdown 模块常量
 */

import type { Theme, ThemeOption } from '@/types/countdown'

export const STORAGE_KEY = 'countdowns'

export const DEFAULT_THEME: Theme = 'blue'

export const THEME_OPTIONS: ThemeOption[] = [
  { value: 'blue', label: '蓝色', color: '#4facfe' },
  { value: 'purple', label: '紫色', color: '#667eea' },
  { value: 'green', label: '绿色', color: '#6bcf7f' },
  { value: 'orange', label: '橙色', color: '#ff9a4d' },
  { value: 'pink', label: '粉色', color: '#ff6b9d' },
]
