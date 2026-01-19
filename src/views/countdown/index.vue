<template>
  <div class="countdown-container">
    <header>
      <h1>⏰ 倒计时管理</h1>
      <p class="subtitle">记录重要时刻，珍惜每一秒</p>
    </header>

    <a-button type="primary" size="large" class="add-countdown-btn" @click="showAddModal = true">
      ➕ 添加倒计时
    </a-button>

    <div class="countdowns-grid">
      <TransitionGroup name="countdown-list">
        <CountdownCard
          v-for="countdown in countdownStore.countdowns"
          :key="countdown.id"
          :countdown="countdown"
          @edit="handleEdit"
          @delete="handleDelete"
          @toggle-pause="handleTogglePause"
        />
      </TransitionGroup>

      <div v-if="countdownStore.countdowns.length === 0" class="empty-state">
        <div class="empty-state-icon">⏳</div>
        <div class="empty-state-text">还没有倒计时呢～<br />添加一个重要的日期吧！</div>
        <div class="empty-state-subtitle">点击上方按钮创建你的第一个倒计时</div>
      </div>
    </div>

    <!-- 添加/编辑倒计时模态框 -->
    <CountdownForm
      v-model:visible="showAddModal"
      :countdown="editingCountdown"
      @submit="handleSubmit"
      @cancel="handleCancel"
    />
  </div>
</template>

<script setup lang="ts">
import { CountdownCard, CountdownForm } from '@/components'
import { useCountdown } from '@/hooks'

const {
  countdownStore,
  showAddModal,
  editingCountdown,
  handleEdit,
  handleDelete,
  handleTogglePause,
  handleSubmit,
  handleCancel,
} = useCountdown()
</script>

<style scoped lang="less">
@import '@/styles/countdown.less';
</style>
