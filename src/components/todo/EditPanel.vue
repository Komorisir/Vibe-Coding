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
  background: #f8f9fa;
  border: 2px solid #667eea;
  border-radius: 12px;
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
  background: #fff;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;

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
    transition: var(--transition);
  }

  &.priority-low {
    border-color: rgb(107 207 127 / 30%);

    &:hover:not(.checked) {
      background: rgb(107 207 127 / 15%);
      border-color: #6bcf7f;
      transform: scale(1.05);
    }

    &.checked {
      background: #6bcf7f;
      border-color: #6bcf7f;

      &:hover {
        background: #5ab86f;
        border-color: #5ab86f;
        transform: scale(1.05);
      }
    }
  }

  &.priority-medium {
    border-color: rgb(255 217 61 / 30%);

    &:hover:not(.checked) {
      background: rgb(255 217 61 / 15%);
      border-color: #ffd93d;
      transform: scale(1.05);
    }

    &.checked {
      background: #ffd93d;
      border-color: #ffd93d;

      &:hover {
        opacity: 0.9;
        transform: scale(1.05);
      }
    }
  }

  &.priority-high {
    border-color: rgb(255 107 107 / 30%);

    &:hover:not(.checked) {
      background: rgb(255 107 107 / 15%);
      border-color: #ff6b6b;
      transform: scale(1.05);
    }

    &.checked {
      background: #ff6b6b;
      border-color: #ff6b6b;

      &:hover {
        background: #ff5252;
        border-color: #ff5252;
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
