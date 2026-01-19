<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()
const router = useRouter()

// 判断是否在首页
const isHome = computed(() => route.path === '/')

// 返回首页
function handleBackHome() {
  router.push('/')
}
</script>

<template>
  <div class="app-wrapper">
    <!-- 返回首页按钮 -->
    <div v-if="!isHome" class="back-button">
      <a-button type="link" @click="handleBackHome" class="back-btn">
        <span class="back-icon">←</span>
        <span>返回首页</span>
      </a-button>
    </div>

    <!-- 路由视图 -->
    <router-view v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style scoped lang="less">
.app-wrapper {
  width: 100%;
}

.back-button {
  display: flex;
  justify-content: center;
  padding: 20px;

  .back-btn {
    display: flex;
    gap: 8px;
    align-items: center;
    height: auto;
    padding: 8px 20px;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 12px;
    transition: all 0.3s ease;

    .back-icon {
      font-size: 1.2rem;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: #f0f3ff;

      .back-icon {
        transform: translateX(-3px);
      }
    }
  }
}

// 路由切换动画
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

@media (width <= 768px) {
  .back-button {
    padding: 15px;
  }
}
</style>
