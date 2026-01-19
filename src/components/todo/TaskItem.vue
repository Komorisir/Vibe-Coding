<template>
  <li :class="['task-item', `priority-${task.priority}`, { completed: task.completed }]">
    <a-checkbox :checked="task.completed" @change="handleToggle" class="task-checkbox" />
    <span class="task-text">{{ task.text }}</span>
    <span :class="['priority-badge', task.priority]">
      {{ priorityLabels[task.priority] }}
    </span>
    <a-button class="edit-btn" @click="handleEdit">编辑</a-button>
    <a-button class="delete-btn" danger @click="handleDelete">删除</a-button>
  </li>
</template>

<script setup lang="ts">
import type { Task } from '@/types'
import { useTaskItem } from '@/hooks'

const props = defineProps<{
  task: Task
}>()

const { priorityLabels, handleToggle, handleEdit, handleDelete } = useTaskItem(props.task)
</script>

<style scoped lang="less">
.task-item {
  position: relative;
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  overflow: hidden;
  list-style: none;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-left: 3px solid var(--border-color);
  border-left-width: 3px;
  border-radius: var(--radius-md);
  transition: var(--transition-base);
  animation: slideIn 0.3s ease;

  // 微光扫描效果
  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(90deg, transparent, rgb(102 126 234 / 10%), transparent);
    transition: left 0.6s ease;
  }

  &:hover::after {
    left: 100%;
  }

  &.priority-high {
    border-left-color: var(--danger);

    &:hover {
      box-shadow: 0 4px 15px rgb(239 68 68 / 20%);
    }
  }

  &.priority-medium {
    border-left-color: var(--warning);

    &:hover {
      box-shadow: 0 4px 15px rgb(251 191 36 / 20%);
    }
  }

  &.priority-low {
    border-left-color: var(--accent-green);

    &:hover {
      box-shadow: 0 4px 15px rgb(16 185 129 / 20%);
    }
  }

  &.completed {
    opacity: 0.6;

    .task-text {
      color: var(--text-tertiary);
      text-decoration: line-through;
    }
  }

  &:hover {
    border-color: var(--border-glow);
    box-shadow: var(--shadow-glow);
    transform: translateY(-2px);
  }
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.task-checkbox {
  flex-shrink: 0;
}

.task-text {
  position: relative;
  z-index: 1;
  flex: 1;
  font-size: 1rem;
  color: var(--text-primary);
  word-break: break-all;
}

.priority-badge {
  position: relative;
  z-index: 1;
  flex-shrink: 0;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  border-radius: var(--radius-md);

  &.high {
    color: white;
    background: linear-gradient(135deg, var(--danger), #dc2626);
    box-shadow: 0 0 10px rgb(239 68 68 / 40%);
  }

  &.medium {
    color: #1a1a2e;
    background: linear-gradient(135deg, var(--warning), #f59e0b);
    box-shadow: 0 0 10px rgb(251 191 36 / 40%);
  }

  &.low {
    color: white;
    background: linear-gradient(135deg, var(--accent-green), #059669);
    box-shadow: 0 0 10px rgb(16 185 129 / 40%);
  }
}

.edit-btn,
.delete-btn {
  flex-shrink: 0;
}
</style>
