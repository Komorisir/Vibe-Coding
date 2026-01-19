/**
 * CountdownCard 业务逻辑 Hook
 */

import { computed, watch } from 'vue'
import { useCountdownStore } from '@/store/modules/countdown'
import { Modal } from 'ant-design-vue'
import type { Countdown } from '@/types/countdown'

export function useCountdownCard(countdown: Countdown, emit: (event: 'delete', id: number) => void) {
  const countdownStore = useCountdownStore()

  const timeRemaining = computed(() => countdownStore.getTimeRemaining(countdown.targetTime))

  // 格式化数字（补零）
  function formatNumber(num: number): string {
    return num.toString().padStart(2, '0')
  }

  // 格式化目标时间
  function formatTargetTime(timestamp: number): string {
    const date = new Date(timestamp)
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日 ${formatNumber(date.getHours())}:${formatNumber(date.getMinutes())}`
  }

  // 删除倒计时
  function handleDelete() {
    Modal.confirm({
      title: '确认删除',
      content: `确定要删除倒计时 "${countdown.title}" 吗？`,
      okText: '删除',
      cancelText: '取消',
      okType: 'danger',
      onOk: () => {
        emit('delete', countdown.id)
      },
    })
  }

  // 监听倒计时结束（只在真正到期的那一刻弹出提醒）
  watch(
    () => timeRemaining.value.isExpired,
    (isExpired, wasExpired) => {
      // 只有在从未过期变为已过期，且未显示过提醒时才弹窗
      if (isExpired && !wasExpired && !countdown.hasShownAlert) {
        countdownStore.markAlertShown(countdown.id)
        Modal.success({
          title: '⏰ 倒计时到期提醒',
          content: `"${countdown.title}" 已到达目标时间！`,
          okText: '知道了',
        })
      }
    },
  )

  return {
    timeRemaining,
    formatNumber,
    formatTargetTime,
    handleDelete,
  }
}
