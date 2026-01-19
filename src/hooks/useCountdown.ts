/**
 * Countdown 业务逻辑 Hook
 */

import { ref, onMounted, onUnmounted } from 'vue'
import { useCountdownStore } from '@/store/modules/countdown'
import { Modal, message } from 'ant-design-vue'
import type { Countdown, Priority } from '@/types/countdown'

export function useCountdown() {
  const countdownStore = useCountdownStore()
  const showAddModal = ref(false)
  const editingCountdown = ref<Countdown | null>(null)

  // 编辑倒计时
  function handleEdit(countdown: Countdown) {
    editingCountdown.value = countdown
    showAddModal.value = true
  }

  // 删除倒计时
  function handleDelete(id: number) {
    countdownStore.deleteCountdown(id)
    message.success('删除成功')
  }

  // 暂停/继续倒计时
  function handleTogglePause(id: number) {
    countdownStore.togglePause(id)
  }

  // 提交表单
  function handleSubmit() {
    showAddModal.value = false
    editingCountdown.value = null
    message.success(editingCountdown.value ? '更新成功' : '创建成功')
  }

  // 取消表单
  function handleCancel() {
    showAddModal.value = false
    editingCountdown.value = null
  }

  // 生命周期：启动定时器
  onMounted(() => {
    countdownStore.startTimer()
  })

  // 生命周期：停止定时器
  onUnmounted(() => {
    countdownStore.stopTimer()
  })

  return {
    countdownStore,
    showAddModal,
    editingCountdown,
    handleEdit,
    handleDelete,
    handleTogglePause,
    handleSubmit,
    handleCancel,
  }
}
