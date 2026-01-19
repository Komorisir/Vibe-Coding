<template>
  <div class="app-card" @click="$emit('click')">
    <div class="app-icon">{{ app.icon }}</div>
    <div class="app-info">
      <h3 class="app-name">{{ app.name }}</h3>
      <p class="app-description">{{ app.description }}</p>
      <div v-if="app.tags && app.tags.length > 0" class="app-tags">
        <span v-for="tag in app.tags" :key="tag" class="tag">{{ tag }}</span>
      </div>
    </div>
    <div class="app-arrow">→</div>
  </div>
</template>

<script setup lang="ts">
import type { AppItem } from '@/types/home'

defineProps<{
  app: AppItem
}>()

defineEmits<{
  click: []
}>()
</script>

<style scoped lang="less">
.app-card {
  position: relative;
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 24px;
  overflow: hidden;
  cursor: pointer;
  background: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  box-shadow: var(--shadow-card);
  backdrop-filter: blur(10px);
  transition: var(--transition-base);

  // 微光扫描效果
  &::after {
    position: absolute;
    top: -50%;
    left: -50%;
    width: 200%;
    height: 200%;
    content: '';
    background: linear-gradient(45deg, transparent 30%, rgb(102 126 234 / 10%) 50%, transparent 70%);
    transform: translateX(-100%) translateY(-100%);
    transition: transform 0.6s ease;
  }

  &:hover {
    border-color: var(--border-glow);
    box-shadow: var(--shadow-card-hover);
    transform: translateY(-4px);

    &::after {
      transform: translateX(100%) translateY(100%);
    }

    .app-arrow {
      color: var(--accent-cyan);
      transform: translateX(5px);
    }
  }

  .app-icon {
    flex-shrink: 0;
    font-size: 3rem;
    line-height: 1;
  }

  .app-info {
    position: relative;
    z-index: 1;
    flex: 1;
    min-width: 0;

    .app-name {
      margin: 0 0 8px;
      font-size: 1.3rem;
      font-weight: 700;
      color: var(--text-primary);
    }

    .app-description {
      margin: 0 0 12px;
      font-size: 0.95rem;
      line-height: 1.5;
      color: var(--text-secondary);
    }

    .app-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag {
        padding: 4px 12px;
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--primary-color);
        background: rgb(102 126 234 / 10%);
        border: 1px solid rgb(102 126 234 / 20%);
        border-radius: var(--radius-md);
      }
    }
  }

  .app-arrow {
    position: relative;
    z-index: 1;
    flex-shrink: 0;
    font-size: 1.5rem;
    color: var(--primary-color);
    transition: var(--transition-base);
  }
}

@media (width <= 768px) {
  .app-card {
    padding: 16px;

    .app-icon {
      font-size: 2.5rem;
    }

    .app-info .app-name {
      font-size: 1.1rem;
    }
  }
}
</style>
