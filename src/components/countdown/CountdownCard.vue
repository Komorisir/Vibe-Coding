<template>
  <div :class="['countdown-card', `theme-${countdown.theme}`, { expired: timeRemaining.isExpired }]">
    <div class="card-header">
      <h3 class="countdown-title">{{ countdown.title }}</h3>
      <div class="card-actions">
        <a-button v-if="!timeRemaining.isExpired" type="text" size="small" @click="emit('togglePause', countdown.id)">
          {{ countdown.isPaused ? '▶️' : '⏸️' }}
        </a-button>
        <a-button type="text" size="small" @click="emit('edit', countdown)">编辑</a-button>
        <a-button type="text" size="small" danger @click="handleDelete">删除</a-button>
      </div>
    </div>

    <p v-if="countdown.description" class="countdown-description">
      {{ countdown.description }}
    </p>

    <div v-if="!timeRemaining.isExpired && !countdown.isPaused" class="time-display">
      <div class="time-unit">
        <span class="time-value">{{ timeRemaining.days }}</span>
        <span class="time-label">天</span>
      </div>
      <span class="time-separator">:</span>
      <div class="time-unit">
        <span class="time-value">{{ formatNumber(timeRemaining.hours) }}</span>
        <span class="time-label">时</span>
      </div>
      <span class="time-separator">:</span>
      <div class="time-unit">
        <span class="time-value">{{ formatNumber(timeRemaining.minutes) }}</span>
        <span class="time-label">分</span>
      </div>
      <span class="time-separator">:</span>
      <div class="time-unit">
        <span class="time-value">{{ formatNumber(timeRemaining.seconds) }}</span>
        <span class="time-label">秒</span>
      </div>
    </div>

    <div v-else-if="countdown.isPaused" class="paused-display">
      <span class="paused-icon">⏸️</span>
      <span class="paused-text">已暂停</span>
    </div>

    <div v-else class="expired-display">
      <span class="expired-icon">🎉</span>
      <span class="expired-text">已结束</span>
    </div>

    <div class="target-time">目标时间：{{ formatTargetTime(countdown.targetTime) }}</div>
  </div>
</template>

<script setup lang="ts">
import type { Countdown } from '@/types'
import { useCountdownCard } from '@/hooks'

const props = defineProps<{
  countdown: Countdown
}>()

const emit = defineEmits<{
  edit: [countdown: Countdown]
  delete: [id: number]
  togglePause: [id: number]
}>()

const { timeRemaining, formatNumber, formatTargetTime, handleDelete } = useCountdownCard(props.countdown, emit)
</script>

<style scoped lang="less">
.countdown-card {
  padding: 24px;
  background: white;
  border: 2px solid transparent;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 8%);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    transform: translateY(-4px);
  }

  &.theme-blue {
    border-color: #4facfe;

    .time-value {
      color: #4facfe;
    }
  }

  &.theme-purple {
    border-color: #667eea;

    .time-value {
      color: #667eea;
    }
  }

  &.theme-green {
    border-color: #6bcf7f;

    .time-value {
      color: #6bcf7f;
    }
  }

  &.theme-orange {
    border-color: #ff9a4d;

    .time-value {
      color: #ff9a4d;
    }
  }

  &.theme-pink {
    border-color: #ff6b9d;

    .time-value {
      color: #ff6b9d;
    }
  }

  &.expired {
    border-color: #ddd;
    opacity: 0.8;

    .time-value {
      color: #999;
    }
  }
}

.card-header {
  display: flex;
  gap: 10px;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 12px;

  .countdown-title {
    flex: 1;
    margin: 0;
    font-size: 1.4rem;
    font-weight: 700;
    color: #333;
  }

  .card-actions {
    display: flex;
    flex-shrink: 0;
    gap: 4px;
  }
}

.countdown-description {
  margin-bottom: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: #666;
}

.time-display {
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  margin: 20px 0;

  .time-unit {
    display: flex;
    flex-direction: column;
    align-items: center;
    min-width: 70px;

    .time-value {
      margin-bottom: 4px;
      font-size: 2.5rem;
      font-weight: 700;
      line-height: 1;
    }

    .time-label {
      font-size: 0.8rem;
      color: #999;
    }
  }

  .time-separator {
    margin: 0 4px;
    font-size: 2rem;
    font-weight: 700;
    color: #ddd;
  }
}

.paused-display,
.expired-display {
  display: flex;
  gap: 12px;
  align-items: center;
  justify-content: center;
  padding: 30px 0;
  font-size: 1.2rem;
  font-weight: 600;

  .paused-icon,
  .expired-icon {
    font-size: 2rem;
  }

  .paused-text {
    color: #ff9a4d;
  }

  .expired-text {
    color: #999;
    animation: celebrate 1s ease-in-out;
  }
}

@keyframes celebrate {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.2);
  }
}

.target-time {
  padding-top: 12px;
  margin-top: 12px;
  font-size: 0.85rem;
  color: #999;
  text-align: center;
  border-top: 1px solid #f0f0f0;
}

@media (width <= 768px) {
  .countdown-card {
    padding: 16px;
  }

  .card-header {
    flex-direction: column;
    align-items: flex-start;

    .card-actions {
      justify-content: flex-end;
      width: 100%;
    }
  }

  .time-display .time-unit {
    min-width: 50px;

    .time-value {
      font-size: 1.8rem;
    }
  }

  .time-display .time-separator {
    font-size: 1.5rem;
  }
}
</style>
