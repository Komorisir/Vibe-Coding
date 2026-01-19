<template>
  <div :class="['countdown-card', `theme-${countdown.theme}`, { expired: timeRemaining.isExpired }]">
    <div class="card-header">
      <h3 class="countdown-title">{{ countdown.title }}</h3>
      <div class="card-actions">
        <a-button v-if="!timeRemaining.isExpired" type="text" size="small" @click="emit('togglePause', countdown.id)">
          {{ countdown.isPaused ? '▶️' : '⏸️' }}
        </a-button>
        <a-button type="primary" size="small" @click="emit('edit', countdown)">编辑</a-button>
        <a-button type="primary" size="small" danger @click="handleDelete">删除</a-button>
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
  position: relative;
  padding: 24px;
  overflow: hidden;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(10px);
  transition: var(--transition-base);

  // 微光边框效果
  &::before {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    height: 2px;
    content: '';
    background: linear-gradient(90deg, transparent, currentcolor, transparent);
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover {
    border-color: var(--border-glow);
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-4px);

    &::before {
      opacity: 1;
    }
  }

  &.theme-blue {
    color: var(--accent-cyan);

    .time-value {
      color: var(--accent-cyan);
      text-shadow: 0 0 15px rgb(0 212 255 / 50%);
    }
  }

  &.theme-purple {
    color: var(--accent-purple);

    .time-value {
      color: var(--accent-purple);
      text-shadow: 0 0 15px rgb(192 132 252 / 50%);
    }
  }

  &.theme-green {
    color: var(--accent-green);

    .time-value {
      color: var(--accent-green);
      text-shadow: 0 0 15px rgb(16 185 129 / 50%);
    }
  }

  &.theme-orange {
    color: var(--accent-orange);

    .time-value {
      color: var(--accent-orange);
      text-shadow: 0 0 15px rgb(251 146 60 / 50%);
    }
  }

  &.theme-pink {
    color: var(--accent-pink);

    .time-value {
      color: var(--accent-pink);
      text-shadow: 0 0 15px rgb(255 107 157 / 50%);
    }
  }

  &.expired {
    border-color: var(--border-color);
    // opacity: 0.5;

    .time-value {
      color: var(--text-tertiary);
      text-shadow: none;
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
    color: var(--text-primary);
  }

  .card-actions {
    display: flex;
    flex-shrink: 0;
    gap: 4px;
  }

  // .edit-btn {
  //   color: var(--text-primary);
  //   background: var(--bg-tertiary);
  //   border-color: var(--border-color);
  //   transition: var(--transition-base);
  // }

  // .delete-btn {
  //   color: var(--text-primary);
  //   background: var(--bg-tertiary);
  //   border-color: var(--border-color);
  //   transition: var(--transition-base);
  // }
}

.countdown-description {
  margin-bottom: 16px;
  font-size: 0.9rem;
  line-height: 1.5;
  color: var(--text-secondary);
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
    color: var(--text-tertiary);
    opacity: 0.5;
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
    filter: drop-shadow(0 0 10px currentcolor);
  }

  .paused-text {
    color: var(--accent-orange);
    text-shadow: 0 0 10px rgb(251 146 60 / 50%);
  }

  .expired-text {
    color: var(--text-secondary);
    animation: celebrate 1s ease-in-out;
  }
}

@keyframes celebrate {
  0%,
  100% {
    transform: scale(1);
  }

  50% {
    filter: drop-shadow(0 0 20px var(--accent-cyan));
    transform: scale(1.2);
  }
}

.target-time {
  padding-top: 12px;
  margin-top: 12px;
  font-size: 0.85rem;
  color: var(--text-tertiary);
  text-align: center;
  border-top: 1px solid var(--border-color);
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
