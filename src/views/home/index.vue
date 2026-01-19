<template>
  <div class="home-container">
    <header class="home-header">
      <h1 class="home-title">✨ Vibe Coding</h1>
      <p class="home-subtitle">精选实用工具集合</p>
    </header>

    <!-- 搜索框 -->
    <div class="search-section">
      <a-input v-model:value="searchText" placeholder="搜索应用..." size="large" class="search-input" allow-clear>
        <template #prefix>
          <span class="search-icon">🔍</span>
        </template>
      </a-input>
    </div>

    <!-- 分类菜单 -->
    <div class="category-menu">
      <a-button
        v-for="category in CATEGORIES"
        :key="category.value"
        :type="selectedCategory === category.value ? 'primary' : 'default'"
        :class="['category-btn', { active: selectedCategory === category.value }]"
        @click="handleCategoryChange(category.value)"
      >
        <span class="category-icon">{{ category.icon }}</span>
        <span class="category-label">{{ category.label }}</span>
      </a-button>
    </div>

    <!-- 应用列表 -->
    <div class="apps-grid">
      <TransitionGroup name="app-list">
        <AppCard v-for="app in filteredApps" :key="app.id" :app="app" @click="handleAppClick(app)" />
      </TransitionGroup>
    </div>

    <!-- 空状态 -->
    <div v-if="filteredApps.length === 0" class="empty-state">
      <div class="empty-icon">🔍</div>
      <div class="empty-text">没有找到相关应用</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter } from 'vue-router'
import { AppCard } from '@/components'
import { APP_LIST, CATEGORIES } from '@/constants/home'
import type { AppCategory, AppItem } from '@/types'

const router = useRouter()
const searchText = ref('')
const selectedCategory = ref<AppCategory>('all')

// 筛选应用
const filteredApps = computed(() => {
  let apps = APP_LIST

  // 按分类筛选
  if (selectedCategory.value !== 'all') {
    apps = apps.filter(app => app.category === selectedCategory.value)
  }

  // 按搜索文本筛选
  if (searchText.value.trim()) {
    const keyword = searchText.value.toLowerCase()
    apps = apps.filter(
      app =>
        app.name.toLowerCase().includes(keyword) ||
        app.description.toLowerCase().includes(keyword) ||
        app.tags?.some(tag => tag.toLowerCase().includes(keyword)),
    )
  }

  return apps
})

// 切换分类
function handleCategoryChange(category: AppCategory) {
  selectedCategory.value = category
}

// 点击应用，使用路由导航
function handleAppClick(app: AppItem) {
  router.push(`/${app.component}`)
}
</script>

<style scoped lang="less">
@import '@/styles/home.less';
</style>
