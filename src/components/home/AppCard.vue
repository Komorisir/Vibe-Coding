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
  display: flex;
  gap: 20px;
  align-items: center;
  padding: 24px;
  cursor: pointer;
  background: white;
  border: 2px solid transparent;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgb(0 0 0 / 8%);
  transition: all 0.3s ease;

  &:hover {
    border-color: #667eea;
    box-shadow: 0 8px 30px rgb(0 0 0 / 12%);
    transform: translateY(-4px);

    .app-arrow {
      transform: translateX(5px);
    }
  }

  .app-icon {
    flex-shrink: 0;
    font-size: 3rem;
    line-height: 1;
  }

  .app-info {
    flex: 1;
    min-width: 0;

    .app-name {
      margin: 0 0 8px;
      font-size: 1.3rem;
      font-weight: 700;
      color: #333;
    }

    .app-description {
      margin: 0 0 12px;
      font-size: 0.95rem;
      line-height: 1.5;
      color: #666;
    }

    .app-tags {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      .tag {
        padding: 4px 12px;
        font-size: 0.8rem;
        font-weight: 500;
        color: #667eea;
        background: #f0f3ff;
        border-radius: 12px;
      }
    }
  }

  .app-arrow {
    flex-shrink: 0;
    font-size: 1.5rem;
    color: #667eea;
    transition: transform 0.3s ease;
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
