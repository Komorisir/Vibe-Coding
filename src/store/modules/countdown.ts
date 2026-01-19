import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Countdown, TimeRemaining, Theme } from '@/types/countdown'
import { STORAGE_KEY, DEFAULT_THEME } from '@/constants/countdown'

export const useCountdownStore = defineStore('countdown', () => {
  // State
  const countdowns = ref<Countdown[]>(loadCountdowns())
  const currentTime = ref(Date.now())
  let timer: number | null = null

  // Getters
  const activeCountdowns = computed(() =>
    countdowns.value.filter(c => !c.isPaused && getTimeRemaining(c.targetTime).total > 0),
  )

  const expiredCountdowns = computed(() => countdowns.value.filter(c => getTimeRemaining(c.targetTime).total <= 0))

  // Actions
  function addCountdown(title: string, targetTime: number, description?: string, theme: Theme = DEFAULT_THEME) {
    if (!title.trim()) return
    if (targetTime <= Date.now()) return

    const newCountdown: Countdown = {
      id: Date.now(),
      title: title.trim(),
      description: description?.trim(),
      targetTime,
      theme,
      isPaused: false,
      createdAt: Date.now(),
      hasShownAlert: false,
    }

    countdowns.value.push(newCountdown)
    saveCountdowns()
  }

  function updateCountdown(id: number, title: string, targetTime: number, description?: string, theme?: Theme) {
    const countdown = countdowns.value.find(c => c.id === id)
    if (countdown && title.trim() && targetTime > Date.now()) {
      countdown.title = title.trim()
      countdown.description = description?.trim()
      countdown.targetTime = targetTime
      if (theme) countdown.theme = theme
      saveCountdowns()
    }
  }

  function deleteCountdown(id: number) {
    countdowns.value = countdowns.value.filter(c => c.id !== id)
    saveCountdowns()
  }

  function togglePause(id: number) {
    const countdown = countdowns.value.find(c => c.id === id)
    if (countdown) {
      countdown.isPaused = !countdown.isPaused
      saveCountdowns()
    }
  }

  function markAlertShown(id: number) {
    const countdown = countdowns.value.find(c => c.id === id)
    if (countdown) {
      countdown.hasShownAlert = true
      saveCountdowns()
    }
  }

  function getTimeRemaining(targetTime: number): TimeRemaining {
    const now = currentTime.value
    const total = targetTime - now

    if (total <= 0) {
      return {
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
        total: 0,
        isExpired: true,
      }
    }

    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return {
      days,
      hours,
      minutes,
      seconds,
      total,
      isExpired: false,
    }
  }

  function startTimer() {
    if (timer) return

    timer = window.setInterval(() => {
      currentTime.value = Date.now()
    }, 1000)
  }

  function stopTimer() {
    if (timer) {
      clearInterval(timer)
      timer = null
    }
  }

  // LocalStorage
  function loadCountdowns(): Countdown[] {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      return stored ? JSON.parse(stored) : []
    } catch (error) {
      console.error('加载倒计时失败:', error)
      return []
    }
  }

  function saveCountdowns() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(countdowns.value))
    } catch (error) {
      console.error('保存倒计时失败:', error)
      alert('保存失败，请检查浏览器存储空间')
    }
  }

  return {
    // State
    countdowns,
    currentTime,
    // Getters
    activeCountdowns,
    expiredCountdowns,
    // Actions
    addCountdown,
    updateCountdown,
    deleteCountdown,
    togglePause,
    markAlertShown,
    getTimeRemaining,
    startTimer,
    stopTimer,
  }
})
