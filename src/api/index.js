<<<<<<< HEAD
﻿// API配置
import axios from 'axios'
import { ElMessage } from 'element-plus'

// 创建axios实例 - 修复基础URL
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
api.interceptors.request.use(
  (config) => {
    // 可以在这里添加token等
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
api.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    const message = error.response?.data?.message || error.message || '请求失败'
    ElMessage.error(message)
    return Promise.reject(error)
  }
)

export default api
=======
﻿/**
 * $(($FileName -replace '\.js$','')) - 淮南文化平台
 * 文件编码已修复 - UTF-8
 */

export const $(($FileName -replace '\.js$',''))API = {
  // 获取数据
  async getList(params = {}) {
    return Promise.resolve({
      data: [],
      total: 0,
      success: true
    })
  },

  // 创建数据
  async create(data) {
    return Promise.resolve({
      success: true,
      id: Date.now(),
      message: '创建成功'
    })
  },

  // 更新数据
  async update(id, data) {
    return Promise.resolve({
      success: true,
      message: '更新成功'
    })
  },

  // 删除数据
  async delete(id) {
    return Promise.resolve({
      success: true,
      message: '删除成功'
    })
  }
}

export const $(($FileName -replace '\.js$',''))Utils = {
  // 数据格式化
  formatData(data) {
    return data
  },

  // 验证数据
  validate(data) {
    return data !== null && data !== undefined
  },

  // 过滤数据
  filter(list, condition) {
    return list.filter(item => {
      for (let key in condition) {
        if (item[key] !== condition[key]) return false
      }
      return true
    })
  }
}

export default {
  ...$(($FileName -replace '\.js$',''))API,
  ...$(($FileName -replace '\.js$',''))Utils
}
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
