import { defineStore } from 'pinia'
import { ref } from 'vue'
import { heritageApi } from '@/api/heritage'
import { ElMessage } from 'element-plus'

export const useHeritageStore = defineStore('heritage', () => {
  const heritageList = ref([])
  const currentHeritage = ref(null)
  const categories = ref([])
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 12,
    total: 0
  })

  // 获取文化遗产列表
  const getHeritageList = async (params = {}) => {
    loading.value = true
    try {
      const response = await heritageApi.getHeritageList({
        ...params,
        page: pagination.value.page,
        pageSize: pagination.value.pageSize
      })
      heritageList.value = response.data.list
      pagination.value.total = response.data.total
      return response
    } catch (error) {
      ElMessage.error('获取文化遗产列表失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取文化遗产详情
  const getHeritageDetail = async (id) => {
    loading.value = true
    try {
      const response = await heritageApi.getHeritageDetail(id)
      currentHeritage.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取文化遗产详情失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 创建文化遗产
  const createHeritage = async (heritageData) => {
    loading.value = true
    try {
      const response = await heritageApi.createHeritage(heritageData)
      ElMessage.success('文化遗产创建成功')
      return response
    } catch (error) {
      ElMessage.error('文化遗产创建失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新文化遗产
  const updateHeritage = async (id, heritageData) => {
    loading.value = true
    try {
      const response = await heritageApi.updateHeritage(id, heritageData)
      ElMessage.success('文化遗产更新成功')
      return response
    } catch (error) {
      ElMessage.error('文化遗产更新失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除文化遗产
  const deleteHeritage = async (id) => {
    try {
      await heritageApi.deleteHeritage(id)
      ElMessage.success('文化遗产删除成功')
      // 从列表中移除
      const index = heritageList.value.findIndex(item => item.id === id)
      if (index !== -1) {
        heritageList.value.splice(index, 1)
      }
    } catch (error) {
      ElMessage.error('文化遗产删除失败')
      throw error
    }
  }

  // 获取文化遗产分类
  const getCategories = async () => {
    try {
      const response = await heritageApi.getCategories()
      categories.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取分类失败')
      throw error
    }
  }

  // 搜索文化遗产
  const searchHeritage = async (keyword, params = {}) => {
    loading.value = true
    try {
      const response = await heritageApi.searchHeritage({
        keyword,
        ...params
      })
      heritageList.value = response.data.list
      pagination.value.total = response.data.total
      return response
    } catch (error) {
      ElMessage.error('搜索文化遗产失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取推荐文化遗产
  const getRecommendedHeritage = async () => {
    try {
      const response = await heritageApi.getRecommended()
      return response.data
    } catch (error) {
      ElMessage.error('获取推荐文化遗产失败')
      throw error
    }
  }

  return {
    heritageList,
    currentHeritage,
    categories,
    loading,
    pagination,
    getHeritageList,
    getHeritageDetail,
    createHeritage,
    updateHeritage,
    deleteHeritage,
    getCategories,
    searchHeritage,
    getRecommendedHeritage
  }
})