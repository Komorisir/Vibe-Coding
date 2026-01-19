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
import { useTodoStore, type Task } from '@/store/modules/todo'

const props = defineProps<{
  task: Task
}>()

const todoStore = useTodoStore()

const priorityLabels = {
  high: '高',
  medium: '中',
  low: '低',
}

function handleToggle() {
  todoStore.toggleTask(props.task.id)
}

function handleEdit() {
  todoStore.startEdit(props.task.id)
  // 滚动到编辑面板
  setTimeout(() => {
    const editPanel = document.querySelector(`[data-edit-panel-id="${props.task.id}"]`)
    if (editPanel) {
      editPanel.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, 100)
}

function handleDelete() {
  todoStore.deleteTask(props.task.id)
}
</script>

<style scoped lang="less">
.task-item {
  display: flex;
  gap: 15px;
  align-items: center;
  padding: 15px;
  margin-bottom: 10px;
  list-style: none;
  background: #f8f9fa;
  border-left: 4px solid #ccc;
  border-radius: 12px;
  transition: all 0.3s ease;
  animation: slideIn 0.3s ease;

  &.priority-high {
    background: #fff5f5;
    border-left-color: #ff6b6b;
  }

  &.priority-medium {
    background: #fffef5;
    border-left-color: #ffd93d;
  }

  &.priority-low {
    background: #f5fff7;
    border-left-color: #6bcf7f;
  }

  &.completed {
    &.priority-high {
      background: #ffe5e5;
    }

    &.priority-medium {
      background: #fff9e5;
    }

    &.priority-low {
      background: #e5ffe5;
    }

    .task-text {
      color: #999;
      text-decoration: line-through;
    }
  }

  &:hover {
    background: #e9ecef;
    box-shadow: 0 2px 8px rgb(0 0 0 / 10%);
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
  flex: 1;
  font-size: 1rem;
  color: #333;
  word-break: break-all;
}

.priority-badge {
  flex-shrink: 0;
  padding: 4px 10px;
  font-size: 0.75rem;
  font-weight: 600;
  white-space: nowrap;
  border-radius: 12px;

  &.high {
    color: white;
    background: #ff6b6b;
  }

  &.medium {
    color: #333;
    background: #ffd93d;
  }

  &.low {
    color: white;
    background: #6bcf7f;
  }
}

.edit-btn,
.delete-btn {
  flex-shrink: 0;
}
</style>
