import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Task, Priority } from '@/types/todo'
import { STORAGE_KEY, DEFAULT_PRIORITY } from '@/constants/todo'

export const useTodoStore = defineStore('todo', () => {
  // State
  const tasks = ref<Task[]>(loadTasks())
  const editingTaskId = ref<number | null>(null)
  const selectedPriority = ref<Priority>(DEFAULT_PRIORITY)

  // Getters
  const pendingCount = computed(() => tasks.value.filter(task => !task.completed).length)

  const completedCount = computed(() => tasks.value.filter(task => task.completed).length)

  const hasCompletedTasks = computed(() => completedCount.value > 0)

  const hasTasks = computed(() => tasks.value.length > 0)

  // Actions
  function addTask(text: string, priority: Priority = DEFAULT_PRIORITY) {
    if (!text.trim()) return

    const newTask: Task = {
      id: Date.now(),
      text: text.trim(),
      completed: false,
      priority,
    }

    tasks.value.push(newTask)
    saveTasks()
    selectedPriority.value = DEFAULT_PRIORITY
  }

  function deleteTask(id: number) {
    tasks.value = tasks.value.filter(task => task.id !== id)
    saveTasks()
  }

  function toggleTask(id: number) {
    const task = tasks.value.find(t => t.id === id)
    if (task) {
      task.completed = !task.completed
      saveTasks()
    }
  }

  function updateTask(id: number, text: string, priority: Priority) {
    const task = tasks.value.find(t => t.id === id)
    if (task && text.trim()) {
      task.text = text.trim()
      task.priority = priority
      saveTasks()
      editingTaskId.value = null
    }
  }

  function startEdit(id: number) {
    editingTaskId.value = id
  }

  function cancelEdit() {
    editingTaskId.value = null
  }

  function clearCompleted() {
    tasks.value = tasks.value.filter(task => !task.completed)
    saveTasks()
  }

  function clearAll() {
    tasks.value = []
    saveTasks()
  }

  function setSelectedPriority(priority: Priority) {
    selectedPriority.value = priority
  }

  // LocalStorage
  function loadTasks(): Task[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('加载任务失败:', error)
      return []
    }
  }

  function saveTasks() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks.value))
    } catch (error) {
      console.error('保存任务失败:', error)
      alert('保存失败，请检查浏览器存储空间')
    }
  }

  return {
    // State
    tasks,
    editingTaskId,
    selectedPriority,
    // Getters
    pendingCount,
    completedCount,
    hasCompletedTasks,
    hasTasks,
    // Actions
    addTask,
    deleteTask,
    toggleTask,
    updateTask,
    startEdit,
    cancelEdit,
    clearCompleted,
    clearAll,
    setSelectedPriority,
  }
})
