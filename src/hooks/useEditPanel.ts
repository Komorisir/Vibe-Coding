/**
 * EditPanel 业务逻辑 Hook
 */

import { ref, onMounted, nextTick } from 'vue'
import type { Task, Priority } from '@/types/todo'
import { PRIORITY_ICONS } from '@/constants/todo'

export function useEditPanel(
  task: Task,
  emit: {
    (event: 'save', id: number, text: string, priority: Priority): void
    (event: 'cancel'): void
  },
) {
  const editInputRef = ref()
  const editText = ref(task.text)
  const selectedPriority = ref<Priority>(task.priority)

  const priorities = [
    { value: 'low' as Priority, icon: PRIORITY_ICONS.low },
    { value: 'medium' as Priority, icon: PRIORITY_ICONS.medium },
    { value: 'high' as Priority, icon: PRIORITY_ICONS.high },
  ]

  // 优先级变化
  function handlePriorityChange(priority: Priority) {
    selectedPriority.value = priority
  }

  // 保存
  function handleSave() {
    emit('save', task.id, editText.value, selectedPriority.value)
  }

  // 取消
  function handleCancel() {
    emit('cancel')
  }

  // 挂载后聚焦输入框
  onMounted(() => {
    nextTick(() => {
      if (editInputRef.value?.focus) {
        editInputRef.value.focus()
        editInputRef.value.select?.()
      } else if (editInputRef.value?.$el) {
        const input = editInputRef.value.$el.querySelector('input')
        if (input) {
          input.focus()
          input.select()
        }
      }
    })
  })

  return {
    editInputRef,
    editText,
    selectedPriority,
    priorities,
    handlePriorityChange,
    handleSave,
    handleCancel,
  }
}
