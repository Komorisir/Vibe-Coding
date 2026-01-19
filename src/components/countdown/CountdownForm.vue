<template>
  <a-modal
    :open="visible"
    :title="isEdit ? '编辑倒计时' : '添加倒计时'"
    @cancel="handleCancel"
    :footer="null"
    width="500px"
  >
    <a-form ref="formRef" :model="formData" :rules="rules" layout="vertical" @finish="handleSubmit">
      <a-form-item label="标题" name="title">
        <a-input v-model:value="formData.title" placeholder="请输入倒计时标题" size="large" />
      </a-form-item>

      <a-form-item label="目标时间" name="targetTime">
        <a-date-picker
          v-model:value="formData.targetTime"
          show-time
          format="YYYY-MM-DD HH:mm:ss"
          placeholder="请选择目标时间"
          size="large"
          style="width: 100%"
        />
      </a-form-item>

      <a-form-item label="描述（可选）" name="description">
        <a-textarea
          v-model:value="formData.description"
          placeholder="添加一些描述信息..."
          :rows="3"
          :maxlength="200"
          show-count
        />
      </a-form-item>

      <a-form-item label="主题样式" name="theme">
        <div class="theme-selector">
          <label
            v-for="theme in THEME_OPTIONS"
            :key="theme.value"
            :class="['theme-option', `theme-${theme.value}`, { active: formData.theme === theme.value }]"
            @click="formData.theme = theme.value"
          >
            <span class="theme-color" :style="{ background: theme.color }"></span>
            <span class="theme-name">{{ theme.label }}</span>
          </label>
        </div>
      </a-form-item>

      <a-form-item>
        <div class="form-actions">
          <a-button @click="handleCancel">取消</a-button>
          <a-button type="primary" html-type="submit">
            {{ isEdit ? '更新' : '创建' }}
          </a-button>
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script setup lang="ts">
import type { Countdown } from '@/types'
import { useCountdownForm } from '@/hooks'
import { THEME_OPTIONS } from '@/constants/countdown'

const props = defineProps<{
  visible: boolean
  countdown?: Countdown | null
}>()

const emit = defineEmits<{
  'update:visible': [value: boolean]
  submit: []
  cancel: []
}>()

const { formRef, formData, rules, isEdit, handleSubmit, handleCancel } = useCountdownForm(props, emit)
</script>

<style scoped lang="less">
.theme-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.theme-option {
  display: flex;
  gap: 8px;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  user-select: none;
  background: white;
  border: 2px solid #e0e0e0;
  border-radius: 12px;
  transition: all 0.3s ease;

  &:hover {
    background: #f8f9ff;
    border-color: #667eea;
  }

  &.active {
    background: #f0f3ff;
    border-color: #667eea;
  }

  .theme-color {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    box-shadow: 0 2px 8px rgb(0 0 0 / 15%);
  }

  .theme-name {
    font-size: 0.9rem;
    color: #333;
  }
}

.form-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 8px;
}
</style>
