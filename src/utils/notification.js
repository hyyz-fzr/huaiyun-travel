// 通知相关工具函数
export const notificationAPI = {
  // 获取通知列表
  getNotificationList(params = {}) {
    return Promise.resolve({
      data: [
        {
          id: 1,
          title: '系统维护通知',
          content: '系统将于今晚24:00进行维护，预计耗时2小时',
          type: 'system',
          status: 'unread',
          createdAt: '2024-01-15 14:30:00',
          priority: 'high'
        },
        {
          id: 2,
          title: '新内容审核',
          content: '您提交的内容"八公山文化探秘"已通过审核',
          type: 'content',
          status: 'read',
          createdAt: '2024-01-15 10:15:00',
          priority: 'normal'
        },
        {
          id: 3,
          title: '活动提醒',
          content: '您报名的"豆腐制作体验课"将于明天下午开始',
          type: 'event',
          status: 'unread',
          createdAt: '2024-01-14 16:45:00',
          priority: 'normal'
        }
      ],
      total: 3
    })
  },

  // 标记通知为已读
  markAsRead(notificationId) {
    console.log('标记通知为已读:', notificationId)
    return Promise.resolve({ success: true })
  },

  // 标记所有通知为已读
  markAllAsRead() {
    console.log('标记所有通知为已读')
    return Promise.resolve({ success: true })
  },

  // 删除通知
  deleteNotification(notificationId) {
    console.log('删除通知:', notificationId)
    return Promise.resolve({ success: true })
  },

  // 获取未读通知数量
  getUnreadCount() {
    return Promise.resolve({ count: 2 })
  },

  // 发送通知
  sendNotification(notificationData) {
    console.log('发送通知:', notificationData)
    return Promise.resolve({ success: true, id: Date.now() })
  }
}

// 通知工具函数
export const notificationUtils = {
  // 获取通知类型显示
  getNotificationTypeDisplay(type) {
    const typeMap = {
      'system': { text: '系统通知', color: '#409EFF' },
      'content': { text: '内容通知', color: '#67C23A' },
      'event': { text: '活动通知', color: '#E6A23C' },
      'user': { text: '用户通知', color: '#F56C6C' }
    }
    return typeMap[type] || { text: '未知类型', color: '#909399' }
  },

  // 获取优先级显示
  getPriorityDisplay(priority) {
    const priorityMap = {
      'high': { text: '高优先级', color: '#F56C6C' },
      'normal': { text: '普通', color: '#E6A23C' },
      'low': { text: '低优先级', color: '#909399' }
    }
    return priorityMap[priority] || { text: '普通', color: '#E6A23C' }
  },

  // 格式化通知内容
  formatNotificationContent(notification) {
    const maxLength = 100
    if (notification.content.length <= maxLength) {
      return notification.content
    }
    return notification.content.substring(0, maxLength) + '...'
  },

  // 检查通知是否过期
  isNotificationExpired(notification, expiryDays = 30) {
    const created = new Date(notification.createdAt)
    const now = new Date()
    const diffTime = Math.abs(now - created)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays > expiryDays
  },

  // 过滤通知
  filterNotifications(notifications, filters = {}) {
    let filtered = [...notifications]

    // 按类型过滤
    if (filters.type) {
      filtered = filtered.filter(n => n.type === filters.type)
    }

    // 按状态过滤
    if (filters.status) {
      filtered = filtered.filter(n => n.status === filters.status)
    }

    // 按优先级过滤
    if (filters.priority) {
      filtered = filtered.filter(n => n.priority === filters.priority)
    }

    // 按时间范围过滤
    if (filters.startDate && filters.endDate) {
      const start = new Date(filters.startDate)
      const end = new Date(filters.endDate)
      filtered = filtered.filter(n => {
        const created = new Date(n.createdAt)
        return created >= start && created <= end
      })
    }

    return filtered
  },

  // 分组通知
  groupNotificationsByType(notifications) {
    const groups = {}
    notifications.forEach(notification => {
      if (!groups[notification.type]) {
        groups[notification.type] = []
      }
      groups[notification.type].push(notification)
    })
    return groups
  }
}

// 实时通知管理
export class NotificationManager {
  constructor() {
    this.listeners = new Set()
    this.notifications = []
    this.unreadCount = 0
  }

  // 添加监听器
  addListener(listener) {
    this.listeners.add(listener)
  }

  // 移除监听器
  removeListener(listener) {
    this.listeners.delete(listener)
  }

  // 通知所有监听器
  notifyListeners() {
    this.listeners.forEach(listener => {
      listener(this.notifications, this.unreadCount)
    })
  }

  // 添加新通知
  addNotification(notification) {
    this.notifications.unshift({
      ...notification,
      id: Date.now(),
      status: 'unread',
      createdAt: new Date().toISOString()
    })
    this.unreadCount++
    this.notifyListeners()
  }

  // 标记为已读
  markAsRead(notificationId) {
    const notification = this.notifications.find(n => n.id === notificationId)
    if (notification && notification.status === 'unread') {
      notification.status = 'read'
      this.unreadCount--
      this.notifyListeners()
    }
  }

  // 获取未读通知
  getUnreadNotifications() {
    return this.notifications.filter(n => n.status === 'unread')
  }

  // 清除所有通知
  clearAll() {
    this.notifications = []
    this.unreadCount = 0
    this.notifyListeners()
  }
}

// 创建全局通知管理器实例
export const globalNotificationManager = new NotificationManager()