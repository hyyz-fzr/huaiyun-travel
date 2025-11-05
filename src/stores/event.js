import { defineStore } from 'pinia'
import { ref } from 'vue'
import { eventApi } from '@/api/event'
import { ElMessage } from 'element-plus'

export const useEventStore = defineStore('event', () => {
  const events = ref([])
  const currentEvent = ref(null)
  const myBookings = ref([])
  const categories = ref([])
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0
  })

  // 获取活动列表
  const getEvents = async (params = {}) => {
    loading.value = true
    try {
      const response = await eventApi.getEvents({
        ...params,
        page: pagination.value.page,
        pageSize: pagination.value.pageSize
      })
      events.value = response.data.list
      pagination.value.total = response.data.total
      return response
    } catch (error) {
      ElMessage.error('获取活动列表失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取活动详情
  const getEventDetail = async (id) => {
    loading.value = true
    try {
      const response = await eventApi.getEventDetail(id)
      currentEvent.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取活动详情失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 创建活动
  const createEvent = async (eventData) => {
    loading.value = true
    try {
      const response = await eventApi.createEvent(eventData)
      ElMessage.success('活动创建成功')
      return response
    } catch (error) {
      ElMessage.error('活动创建失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新活动
  const updateEvent = async (id, eventData) => {
    loading.value = true
    try {
      const response = await eventApi.updateEvent(id, eventData)
      ElMessage.success('活动更新成功')
      return response
    } catch (error) {
      ElMessage.error('活动更新失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除活动
  const deleteEvent = async (id) => {
    try {
      await eventApi.deleteEvent(id)
      ElMessage.success('活动删除成功')
      // 从列表中移除
      const index = events.value.findIndex(item => item.id === id)
      if (index !== -1) {
        events.value.splice(index, 1)
      }
    } catch (error) {
      ElMessage.error('活动删除失败')
      throw error
    }
  }

  // 预订活动
  const bookEvent = async (id, bookingData) => {
    try {
      const response = await eventApi.bookEvent(id, bookingData)
      ElMessage.success('活动预订成功')
      return response
    } catch (error) {
      ElMessage.error('活动预订失败')
      throw error
    }
  }

  // 取消预订
  const cancelBooking = async (id) => {
    try {
      await eventApi.cancelBooking(id)
      ElMessage.success('预订取消成功')
      // 从我的预订列表中移除
      const index = myBookings.value.findIndex(item => item.eventId === id)
      if (index !== -1) {
        myBookings.value.splice(index, 1)
      }
    } catch (error) {
      ElMessage.error('取消预订失败')
      throw error
    }
  }

  // 获取我的活动预订
  const getMyBookings = async (params = {}) => {
    try {
      const response = await eventApi.getMyBookings(params)
      myBookings.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取预订列表失败')
      throw error
    }
  }

  // 获取活动分类
  const getCategories = async () => {
    try {
      const response = await eventApi.getCategories()
      categories.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取分类失败')
      throw error
    }
  }

  return {
    events,
    currentEvent,
    myBookings,
    categories,
    loading,
    pagination,
    getEvents,
    getEventDetail,
    createEvent,
    updateEvent,
    deleteEvent,
    bookEvent,
    cancelBooking,
    getMyBookings,
    getCategories
  }
})