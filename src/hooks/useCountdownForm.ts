/**
 * CountdownForm 业务逻辑 Hook
 */

import { ref, watch, computed } from 'vue'
import { useCountdownStore } from '@/store/modules/countdown'
import type { Countdown, CountdownFormData } from '@/types/countdown'
import type { Rule } from 'ant-design-vue/es/form'
import dayjs from 'dayjs'

export function useCountdownForm(
  props: {
    visible: boolean
    countdown?: Countdown | null
  },
  emit: {
    (event: 'submit'): void
    (event: 'cancel'): void
  },
) {
  const countdownStore = useCountdownStore()
  const formRef = ref()

  const isEdit = computed(() => !!props.countdown)

  const formData = ref<CountdownFormData>({
    title: '',
    targetTime: null,
    description: '',
    theme: 'blue',
  })

  // 表单验证规则
  const rules: Record<string, Rule[]> = {
    title: [{ required: true, message: '请输入标题', trigger: 'blur' }],
    targetTime: [
      { required: true, message: '请选择目标时间', trigger: 'change' },
      {
        validator: (_rule, value) => {
          if (!value) return Promise.reject('请选择目标时间')
          if (value.valueOf() <= Date.now()) {
            return Promise.reject('目标时间必须晚于当前时间')
          }
          return Promise.resolve()
        },
        trigger: 'change',
      },
    ],
  }

  // 监听弹窗显示状态，更新表单数据
  watch(
    () => props.visible,
    visible => {
      if (visible && props.countdown) {
        // 编辑模式，填充数据
        formData.value = {
          title: props.countdown.title,
          targetTime: dayjs(props.countdown.targetTime),
          description: props.countdown.description || '',
          theme: props.countdown.theme,
        }
      } else if (visible) {
        // 添加模式，重置表单
        formData.value = {
          title: '',
          targetTime: null,
          description: '',
          theme: 'blue',
        }
      }
    },
  )

  // 提交表单
  async function handleSubmit() {
    try {
      await formRef.value.validate()

      if (!formData.value.targetTime) return

      if (props.countdown) {
        // 更新
        countdownStore.updateCountdown(
          props.countdown.id,
          formData.value.title,
          formData.value.targetTime.valueOf(),
          formData.value.description,
          formData.value.theme,
        )
      } else {
        // 添加
        countdownStore.addCountdown(
          formData.value.title,
          formData.value.targetTime.valueOf(),
          formData.value.description,
          formData.value.theme,
        )
      }

      emit('submit')
    } catch (error) {
      console.error('表单验证失败:', error)
    }
  }

  // 取消表单
  function handleCancel() {
    formRef.value?.resetFields()
    emit('cancel')
  }

  return {
    formRef,
    formData,
    rules,
    isEdit,
    handleSubmit,
    handleCancel,
  }
}
