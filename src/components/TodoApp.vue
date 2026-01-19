<template>
  <div class="todo-container">
    <header>
      <h1>✨ 我的待办清单</h1>
      <p class="subtitle">记录每一天的精彩</p>
    </header>

    <div class="input-section">
      <a-input
        v-model:value="taskText"
        placeholder="今天要做什么？"
        class="task-input"
        size="large"
        @pressEnter="handleAddTask"
      />
      <a-button type="primary" class="add-btn" size="large" @click="handleAddTask"> ➕ 添加任务 </a-button>
    </div>

    <div class="priority-section">
      <div class="priority-radio-group" role="radiogroup" aria-label="优先级选择">
        <label
          v-for="priority in priorities"
          :key="priority.value"
          :class="[
            'priority-radio-label',
            `priority-${priority.value}`,
            { checked: todoStore.selectedPriority === priority.value },
          ]"
        >
          <input
            type="radio"
            name="priority"
            :value="priority.value"
            :checked="todoStore.selectedPriority === priority.value"
            @change="handlePriorityChange(priority.value)"
            class="priority-radio"
          />
          <span>{{ priority.label }}</span>
        </label>
      </div>
    </div>

    <div class="stats">
      <div class="stat-item">
        <span class="stat-label">未完成</span>
        <span class="stat-value">{{ todoStore.pendingCount }}</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">已完成</span>
        <span class="stat-value">{{ todoStore.completedCount }}</span>
      </div>
    </div>

    <div class="action-buttons">
      <a-button class="clear-btn" :disabled="!todoStore.hasCompletedTasks" @click="handleClearCompleted">
        🗑️ 清空已完成
      </a-button>
      <a-button class="clear-all-btn" :disabled="!todoStore.hasTasks" danger @click="handleClearAll">
        ⚠️ 全部清空
      </a-button>
    </div>

    <div class="tasks-container">
      <ul v-if="todoStore.tasks.length > 0" class="task-list">
        <li v-for="task in todoStore.tasks" :key="task.id">
          <TaskItem :task="task" />
          <EditPanel
            v-if="todoStore.editingTaskId === task.id"
            :task="task"
            @save="handleSaveTask"
            @cancel="handleCancelEdit"
          />
        </li>
      </ul>
      <div v-else class="empty-state">
        <div class="empty-state-icon">✨</div>
        <div class="empty-state-text">还没有任务呢～<br />添加第一个任务开始你的待办之旅吧！</div>
        <div class="empty-state-subtitle">点击上方输入框，输入你的任务内容</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTodoStore, type Priority } from '@/store/modules/todo'
import TaskItem from './TaskItem.vue'
import EditPanel from './EditPanel.vue'
import { message, Modal } from 'ant-design-vue'

const todoStore = useTodoStore()

const taskText = ref('')

const priorities = [
  { value: 'low' as Priority, label: '低优先级' },
  { value: 'medium' as Priority, label: '中优先级' },
  { value: 'high' as Priority, label: '高优先级' },
]

function handleAddTask() {
  if (!taskText.value.trim()) {
    return
  }

  todoStore.addTask(taskText.value, todoStore.selectedPriority)
  taskText.value = ''
}

function handlePriorityChange(priority: Priority) {
  todoStore.setSelectedPriority(priority)
}

function handleSaveTask(id: number, text: string, priority: Priority) {
  if (!text.trim()) {
    message.warning('任务内容不能为空！')
    return
  }
  todoStore.updateTask(id, text, priority)
}

function handleCancelEdit() {
  todoStore.cancelEdit()
}

function handleClearCompleted() {
  if (todoStore.completedCount === 0) return

  Modal.confirm({
    title: '确认清空',
    content: `确定要清空 ${todoStore.completedCount} 个已完成的任务吗？`,
    onOk: () => {
      todoStore.clearCompleted()
      message.success('已清空已完成的任务')
    },
  })
}

function handleClearAll() {
  if (todoStore.tasks.length === 0) return

  Modal.confirm({
    title: '⚠️ 警告',
    content: `确定要清空所有 ${todoStore.tasks.length} 个任务吗？\n此操作无法撤销！`,
    okType: 'danger',
    onOk: () => {
      todoStore.clearAll()
      message.success('已清空所有任务')
    },
  })
}
</script>

<style scoped lang="less">
@import '@/styles/todo.less';
</style>
