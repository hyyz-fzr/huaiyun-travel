import axios from 'axios'
import aoi from './index'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores/user'


// 创建axios实例 - 自动使用环境变量中的API地址
const request = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL + '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    const userStore = useUserStore()
    if (userStore.token) {
      config.headers.Authorization = `Bearer ${userStore.token}`
    }
    
    // 添加请求日志（开发环境）
    if (process.env.NODE_ENV === 'development') {
      console.log(`🚀 API请求: ${config.method?.toUpperCase()} ${config.url}`, config.params || config.data)
    }
    
    return config
  },
  error => {
    console.error('❌ 请求配置错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const { data } = response
    
    if (process.env.NODE_ENV === 'development') {
      console.log(`✅ API响应: ${response.config.url}`, data)
    }
    
    if (data.code === 200) {
      return data
    } else {
      ElMessage.error(data.message || '请求失败')
      return Promise.reject(new Error(data.message || '请求失败'))
    }
  },
  error => {
    console.error('❌ API请求失败:', error)
    
    const { response } = error
    if (response) {
      switch (response.status) {
        case 401:
          ElMessage.error('未授权，请重新登录')
          useUserStore().logout()
          break
        case 403:
          ElMessage.error('拒绝访问')
          break
        case 404:
          ElMessage.error('请求资源不存在')
          break
        case 500:
          ElMessage.error('服务器内部错误')
          break
        case 502:
          ElMessage.error('后端服务不可用，请稍后重试')
          break
        case 503:
          ElMessage.error('服务维护中，请稍后访问')
          break
        default:
          ElMessage.error(response.data?.message || `网络错误 (${response.status})`)
      }
    } else {
      if (error.code === 'ECONNABORTED') {
        ElMessage.error('请求超时，请检查网络连接')
      } else if (error.message === 'Network Error') {
        ElMessage.error('网络连接失败，请检查网络设置')
      } else {
        ElMessage.error('网络连接失败')
      }
    }
    return Promise.reject(error)
  }
)

// 云端健康检查
export const checkCloudHealth = () => {
  return request.get('/health')
}

export const checkDatabaseHealth = () => {
  return request.get('/health/database')
}

export const getCloudInfo = () => {
  return request.get('/health/cloud')
}

// 通用API方法
export default {
  // GET请求
  get(url, params = {}) {
    return request.get(url, { params })
  },

  // POST请求
  post(url, data = {}) {
    return request.post(url, data)
  },

  // PUT请求
  put(url, data = {}) {
    return request.put(url, data)
  },

  // DELETE请求
  delete(url, params = {}) {
    return request.delete(url, { params })
  },

  // 文件上传
  upload(url, formData) {
    return request.post(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      },
      timeout: 30000
    })
  }
}