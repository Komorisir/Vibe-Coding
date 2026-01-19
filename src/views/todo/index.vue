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
          v-for="priority in PRIORITY_OPTIONS"
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
import { TaskItem, EditPanel } from '@/components'
import { useTodo } from '@/hooks'
import { PRIORITY_OPTIONS } from '@/constants/todo'

const {
  todoStore,
  taskText,
  handleAddTask,
  handlePriorityChange,
  handleSaveTask,
  handleCancelEdit,
  handleClearCompleted,
  handleClearAll,
} = useTodo()
</script>

<style scoped lang="less">
@import '@/styles/todo.less';
</style>
