# 项目目录结构说明

## 📁 目录结构

```
src/
├── views/              # 页面组件（路由页面）
│   ├── home/
│   │   └── index.vue   # 首页
│   ├── todo/
│   │   └── index.vue   # 待办事项页面
│   └── countdown/
│       └── index.vue   # 倒计时页面
│
├── components/          # 通用组件（可复用）- 按模块分类
│   ├── index.ts        # 统一导出
│   ├── todo/           # 待办事项模块组件
│   │   ├── index.ts    # 模块导出
│   │   ├── TaskItem.vue # 任务项组件
│   │   └── EditPanel.vue # 编辑面板组件
│   ├── countdown/      # 倒计时模块组件
│   │   ├── index.ts    # 模块导出
│   │   ├── CountdownCard.vue # 卡片组件
│   │   └── CountdownForm.vue # 表单组件
│   └── home/           # 首页模块组件
│       ├── index.ts    # 模块导出
│       └── AppCard.vue  # 应用卡片组件
│
├── hooks/              # 业务逻辑 Hooks（逻辑层）
│   ├── index.ts        # 统一导出
│   ├── useTodo.ts      # 待办事项业务逻辑
│   ├── useTaskItem.ts  # 任务项逻辑
│   ├── useEditPanel.ts # 编辑面板逻辑
│   ├── useCountdown.ts # 倒计时业务逻辑
│   ├── useCountdownCard.ts    # 倒计时卡片逻辑
│   └── useCountdownForm.ts    # 倒计时表单逻辑
│
├── router/             # 路由配置
│   └── index.ts        # 路由规则和守卫
│
├── store/              # 状态管理（数据层）
│   ├── index.ts
│   └── modules/
│       ├── global.ts   # 全局 store
│       ├── todo.ts     # 待办事项 store
│       └── countdown.ts # 倒计时 store
│
├── types/              # TypeScript 类型定义
│   ├── index.ts        # 统一导出
│   ├── todo.ts         # 待办事项类型
│   ├── countdown.ts    # 倒计时类型
│   └── home.ts         # 首页类型
│
├── constants/          # 常量定义（配置层）
│   ├── todo/
│   │   └── index.ts    # 待办事项常量
│   ├── countdown/
│   │   └── index.ts    # 倒计时常量
│   ├── home/
│   │   └── index.ts    # 首页常量（应用列表、分类）
│   └── enum/
│       └── store.ts    # Store 枚举
│
├── styles/             # 样式文件
│   ├── todo.less       # 待办事项样式
│   ├── countdown.less  # 倒计时样式
│   └── home.less       # 首页样式
│
├── assets/             # 静态资源
├── App.vue             # 根组件
├── main.ts             # 入口文件
└── style.less          # 全局样式
```

## 🏗️ 架构设计原则

### 1. 分层架构

```
页面层 (views/)
    ↓
组件层 (components/)
    ↓
逻辑层 (hooks/)
    ↓
数据层 (store/)
    ↓
持久化层 (localStorage)
```

### 2. 模块化封装

每个模块包含：
- **types**: 类型定义
- **constants**: 常量配置
- **store**: 状态管理
- **hooks**: 业务逻辑
- **components**: UI 组件
- **styles**: 样式文件

### 3. 职责分离

#### Views（页面层）
- 路由对应的页面组件
- 每个页面是独立的功能模块入口
- 组合多个 components 和 hooks
- 处理页面级的业务逻辑

#### Components（组件层）
- 可复用的通用组件
- 按功能模块分类组织（todo/、countdown/、home/）
- 每个模块有独立的 index.ts 导出
- 只负责 UI 渲染
- 接收 props，触发 events
- 不包含复杂的业务逻辑

#### Hooks（业务逻辑层）
- 封装业务逻辑和交互行为
- 处理状态管理调用
- 处理用户交互（Modal、Message 等）
- 可复用的逻辑单元

#### Store（状态管理层）
- 集中管理应用状态
- 提供状态更新方法
- 处理数据持久化
- 不包含 UI 交互逻辑

#### Types（类型层）
- 统一的类型定义
- 提供类型安全
- 便于维护和重构

#### Constants（常量层）
- 配置信息集中管理
- 避免魔法值
- 便于统一修改

## 📝 模块说明

### Home 模块

**功能：** 应用首页，展示所有应用

**文件组成：**
- `types/home.ts` - 应用、分类类型定义
- `constants/home/` - 应用列表、分类配置
- `views/home/index.vue` - 首页页面
- `components/home/AppCard.vue` - 应用卡片组件
- `styles/home.less` - 样式文件

**特性：**
- 应用分类展示
- 搜索功能（支持名称、描述、标签搜索）
- 响应式网格布局
- 点击应用导航到对应功能

### Todo 模块

**功能：** 待办事项管理

**文件组成：**
- `types/todo.ts` - 任务类型、优先级类型定义
- `constants/todo/` - 优先级标签、图标、默认值
- `store/modules/todo.ts` - 任务状态管理
- `hooks/useTodo.ts` - 主页面业务逻辑
- `hooks/useTaskItem.ts` - 任务项业务逻辑
- `hooks/useEditPanel.ts` - 编辑面板业务逻辑
- `views/todo/index.vue` - 待办事项页面
- `components/todo/TaskItem.vue` - 任务项组件
- `components/todo/EditPanel.vue` - 编辑面板组件
- `styles/todo.less` - 样式文件

### Countdown 模块

**功能：** 倒计时管理

**文件组成：**
- `types/countdown.ts` - 倒计时类型、主题类型定义
- `constants/countdown/` - 主题配置、默认值
- `store/modules/countdown.ts` - 倒计时状态管理
- `hooks/useCountdown.ts` - 主页面业务逻辑
- `hooks/useCountdownCard.ts` - 卡片业务逻辑
- `hooks/useCountdownForm.ts` - 表单业务逻辑
- `views/countdown/index.vue` - 倒计时页面
- `components/countdown/CountdownCard.vue` - 卡片组件
- `components/countdown/CountdownForm.vue` - 表单组件
- `styles/countdown.less` - 样式文件

## 🎯 代码示例

### 组件使用 Hook

```vue
<script setup lang="ts">
// 使用统一导出，代码更简洁
import { TodoApp, CountdownApp } from '@/components'
import { useTodo, useCountdown } from '@/hooks'
import type { Task, Countdown } from '@/types'
</script>
```

### 3. 路由导航

```vue
<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

// 导航到应用
function handleAppClick(app) {
  router.push(`/${app.component}`)
}
</script>
```

### 4. 组件使用 Hook

```vue
<script setup lang="ts">
import { useTodo } from '@/hooks'

const {
  todoStore,
  taskText,
  handleAddTask,
  // ... 其他方法
} = useTodo()
</script>
```

### 5. Hook 封装业务逻辑

```typescript
export function useTodo() {
  const todoStore = useTodoStore()
  const taskText = ref('')

  function handleAddTask() {
    // 业务逻辑处理
    todoStore.addTask(taskText.value, todoStore.selectedPriority)
    taskText.value = ''
  }

  return {
    todoStore,
    taskText,
    handleAddTask,
  }
}
```

### 6. Store 管理状态

```typescript
export const useTodoStore = defineStore('todo', () => {
  const tasks = ref<Task[]>(loadTasks())
  
  function addTask(text: string, priority: Priority) {
    // 状态更新逻辑
  }

  return { tasks, addTask }
})
```

## ✨ 优势

1. **清晰的代码组织** - 按功能和职责分层
2. **高可维护性** - 每个文件职责单一
3. **高可复用性** - Hooks 可以在多个组件中复用
4. **类型安全** - 完整的 TypeScript 类型定义
5. **易于测试** - 逻辑层与 UI 层分离
6. **易于扩展** - 模块化设计，添加新功能不影响现有代码

## 🔧 最佳实践

1. 组件只关注 UI 渲染，不包含复杂逻辑
2. 业务逻辑统一放在 hooks 中
3. 常量和配置集中管理
4. 类型定义独立文件
5. Store 只管理状态，不处理 UI 交互
6. 使用 TypeScript 提供类型安全
