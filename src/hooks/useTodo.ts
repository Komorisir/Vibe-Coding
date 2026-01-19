/**
 * Todo 业务逻辑 Hook
 */

import { ref } from 'vue'
import { useTodoStore } from '@/store/modules/todo'
import { Modal, message } from 'ant-design-vue'
import type { Priority } from '@/types/todo'

export function useTodo() {
  const todoStore = useTodoStore()
  const taskText = ref('')

  // 添加任务
  function handleAddTask() {
    if (!taskText.value.trim()) {
      return
    }

    todoStore.addTask(taskText.value, todoStore.selectedPriority)
    taskText.value = ''
  }

  // 优先级变化
  function handlePriorityChange(priority: Priority) {
    todoStore.setSelectedPriority(priority)
  }

  // 保存编辑的任务
  function handleSaveTask(id: number, text: string, priority: Priority) {
    if (!text.trim()) {
      message.warning('任务内容不能为空！')
      return
    }
    todoStore.updateTask(id, text, priority)
  }

  // 取消编辑
  function handleCancelEdit() {
    todoStore.cancelEdit()
  }

  // 清空已完成任务
  function handleClearCompleted() {
    if (todoStore.completedCount === 0) return

    Modal.confirm({
      title: '确认清空',
      content: `确定要清空 ${todoStore.completedCount} 个已完成的任务吗？`,
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        todoStore.clearCompleted()
        message.success('已清空已完成的任务')
      },
    })
  }

  // 全部清空
  function handleClearAll() {
    if (todoStore.tasks.length === 0) return

    Modal.confirm({
      title: '⚠️ 警告',
      content: `确定要清空所有 ${todoStore.tasks.length} 个任务吗？\n此操作无法撤销！`,
      okText: '确定',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        todoStore.clearAll()
        message.success('已清空所有任务')
      },
    })
  }

  return {
    todoStore,
    taskText,
    handleAddTask,
    handlePriorityChange,
    handleSaveTask,
    handleCancelEdit,
    handleClearCompleted,
    handleClearAll,
  }
}
