<template>
  <li class="task-edit-panel" :data-edit-panel-id="task.id">
    <div class="edit-panel-content">
      <a-input
        ref="editInputRef"
        v-model:value="editText"
        placeholder="编辑任务内容..."
        class="task-edit-input"
        @pressEnter="handleSave"
      />
      <div class="edit-actions">
        <div class="priority-radio-group-inline">
          <label
            v-for="priority in priorities"
            :key="priority.value"
            :class="[
              'priority-radio-label-inline',
              `priority-${priority.value}`,
              { checked: selectedPriority === priority.value },
            ]"
          >
            <input
              type="radio"
              :name="`priority-${task.id}`"
              :value="priority.value"
              :checked="selectedPriority === priority.value"
              @change="handlePriorityChange(priority.value)"
              class="priority-radio"
            />
            <span class="priority-icon">{{ priority.icon }}</span>
          </label>
        </div>
        <div class="edit-button-group">
          <a-button type="primary" class="save-btn" @click="handleSave">保存</a-button>
          <a-button class="cancel-btn" @click="handleCancel">取消</a-button>
        </div>
      </div>
    </div>
  </li>
</template>

<script setup lang="ts">
import type { Task, Priority } from '@/types'
import { useEditPanel } from '@/hooks'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  save: [id: number, text: string, priority: Priority]
  cancel: []
}>()

const { editInputRef, editText, selectedPriority, priorities, handlePriorityChange, handleSave, handleCancel } =
  useEditPanel(props.task, emit)
</script>

<style scoped lang="less">
.task-edit-panel {
  margin-bottom: 10px;
  list-style: none;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    max-height: 0;
    opacity: 0;
    transform: translateY(-10px);
  }

  to {
    max-height: 300px;
    opacity: 1;
    transform: translateY(0);
  }
}

.edit-panel-content {
  padding: 15px;
  background: var(--bg-secondary);
  border: 1px solid var(--border-glow);
  border-radius: var(--radius-md);
  box-shadow: 0 0 20px rgb(102 126 234 / 20%);
}

.task-edit-input {
  width: 100%;
  margin-bottom: 15px;
}

.edit-actions {
  display: flex;
  gap: 15px;
  align-items: center;
  justify-content: space-between;
}

.priority-radio-group-inline {
  display: flex;
  gap: 6px;
  align-items: center;
}

.priority-radio-label-inline {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  cursor: pointer;
  user-select: none;
  background: var(--bg-secondary);
  border: 2px solid var(--border-color);
  border-radius: var(--radius-sm);
  box-shadow: var(--shadow-card);
  transition: var(--transition-base);

  .priority-radio {
    position: absolute;
    width: 0;
    height: 0;
    margin: 0;
    pointer-events: none;
    opacity: 0;
  }

  .priority-icon {
    font-size: 1.2rem;
    line-height: 1;
    filter: drop-shadow(0 0 5px currentcolor);
    transition: var(--transition-base);
  }

  &.priority-low {
    &:hover:not(.checked) {
      background: rgb(16 185 129 / 15%);
      border-color: var(--accent-green);
      box-shadow: 0 0 15px rgb(16 185 129 / 30%);
      transform: scale(1.05);
    }

    &.checked {
      background: var(--accent-green);
      border-color: var(--accent-green);
      box-shadow: 0 0 15px rgb(16 185 129 / 50%);

      &:hover {
        box-shadow: 0 0 20px rgb(16 185 129 / 60%);
        transform: scale(1.05);
      }
    }
  }

  &.priority-medium {
    &:hover:not(.checked) {
      background: rgb(251 191 36 / 15%);
      border-color: var(--warning);
      box-shadow: 0 0 15px rgb(251 191 36 / 30%);
      transform: scale(1.05);
    }

    &.checked {
      background: var(--warning);
      border-color: var(--warning);
      box-shadow: 0 0 15px rgb(251 191 36 / 50%);

      &:hover {
        box-shadow: 0 0 20px rgb(251 191 36 / 60%);
        transform: scale(1.05);
      }
    }
  }

  &.priority-high {
    &:hover:not(.checked) {
      background: rgb(239 68 68 / 15%);
      border-color: var(--danger);
      box-shadow: 0 0 15px rgb(239 68 68 / 30%);
      transform: scale(1.05);
    }

    &.checked {
      background: var(--danger);
      border-color: var(--danger);
      box-shadow: 0 0 15px rgb(239 68 68 / 50%);

      &:hover {
        box-shadow: 0 0 20px rgb(239 68 68 / 60%);
        transform: scale(1.05);
      }
    }
  }
}

.edit-button-group {
  display: flex;
  gap: 10px;
}

@media (width <= 768px) {
  .edit-panel-content {
    padding: 12px;
  }

  .edit-actions {
    flex-direction: column;
    gap: 12px;
    align-items: stretch;
  }

  .edit-button-group {
    display: flex;
    gap: 10px;
    width: 100%;

    .save-btn,
    .cancel-btn {
      flex: 1;
    }
  }
}
</style>
