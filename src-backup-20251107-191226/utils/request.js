import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/router'

// 创建axios实例
const request = axios.create({
  baseURL: 'https://huaiyun-travel-production.up.railway.app/api',
  timeout: 15000 // 生产环境增加超时时间
})

// 请求拦截器
request.interceptors.request.use(
  config => {
    // 从localStorage获取token
    const token = localStorage.getItem('hyyz_token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    
    // 生产环境日志
    if (process.env.NODE_ENV === 'production') {
      console.log(`🌐 API请求: ${config.method?.toUpperCase()} ${config.url}`)
    }
    
    return config
  },
  error => {
    console.error('🚨 请求配置错误:', error)
    return Promise.reject(error)
  }
)

// 响应拦截器
request.interceptors.response.use(
  response => {
    const res = response.data
    
    // 如果返回的状态码不是200，则判断为错误
    if (res.code !== 200 && res.code !== 0) {
      ElMessage.error(res.message || '请求失败')
      return Promise.reject(new Error(res.message || 'Error'))
    }
    return res
  },
  error => {
    // 生产环境错误处理
    console.error('🚨 API请求失败:', error.response?.status, error.message)
    
    if (error.response?.status === 401) {
      ElMessage.error('登录已过期，请重新登录')
      localStorage.removeItem('hyyz_token')
      router.push('/login')
    } else if (error.response?.status === 500) {
      ElMessage.error('服务器内部错误，请稍后重试')
    } else if (error.code === 'ECONNABORTED') {
      ElMessage.error('请求超时，请检查网络连接')
    } else if (!navigator.onLine) {
      ElMessage.error('网络连接已断开，请检查网络设置')
    } else {
      ElMessage.error(error.message || '网络错误，请重试')
    }
    return Promise.reject(error)
  }
)

export default request