/**
 * TaskItem 业务逻辑 Hook
 */

import { useTodoStore } from '@/store/modules/todo'
import { PRIORITY_LABELS } from '@/constants/todo'
import type { Task } from '@/types/todo'

export function useTaskItem(task: Task) {
  const todoStore = useTodoStore()

  // 切换完成状态
  function handleToggle() {
    todoStore.toggleTask(task.id)
  }

  // 编辑任务
  function handleEdit() {
    todoStore.startEdit(task.id)
    // 滚动到编辑面板
    setTimeout(() => {
      const editPanel = document.querySelector(`[data-edit-panel-id="${task.id}"]`)
      if (editPanel) {
        editPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
      }
    }, 100)
  }

  // 删除任务
  function handleDelete() {
    todoStore.deleteTask(task.id)
  }

  return {
    priorityLabels: PRIORITY_LABELS,
    handleToggle,
    handleEdit,
    handleDelete,
  }
}
