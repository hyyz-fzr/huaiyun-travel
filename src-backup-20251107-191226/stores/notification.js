import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useNotificationStore = defineStore('notification', () => {
  const notifications = ref([])
  const unreadCount = ref(0)

  // 添加通知
  const addNotification = (notification) => {
    notifications.value.unshift({
      id: Date.now(),
      ...notification,
      read: false,
      timestamp: new Date()
    })
    unreadCount.value += 1
  }

  // 标记为已读
  const markAsRead = (id) => {
    const notification = notifications.value.find(n => n.id === id)
    if (notification && !notification.read) {
      notification.read = true
      unreadCount.value -= 1
    }
  }

  // 标记所有为已读
  const markAllAsRead = () => {
    notifications.value.forEach(notification => {
      if (!notification.read) {
        notification.read = true
      }
    })
    unreadCount.value = 0
  }

  // 删除通知
  const removeNotification = (id) => {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      const notification = notifications.value[index]
      if (!notification.read) {
        unreadCount.value -= 1
      }
      notifications.value.splice(index, 1)
    }
  }

  // 清空所有通知
  const clearAll = () => {
    notifications.value = []
    unreadCount.value = 0
  }

  return {
    notifications,
    unreadCount,
    addNotification,
    markAsRead,
    markAllAsRead,
    removeNotification,
    clearAll
  }
})