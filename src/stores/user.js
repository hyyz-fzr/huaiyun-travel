import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export const useUserStore = defineStore('user', () => {
  const userInfo = ref(null)
  const token = ref(localStorage.getItem('token'))
  const permissions = ref([])

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userName = computed(() => userInfo.value?.username || '')
  const userRole = computed(() => userInfo.value?.role || 'guest')

  // 初始化用户信息
  const initUser = () => {
    const savedToken = localStorage.getItem('token')
    if (savedToken) {
      token.value = savedToken
      // 这里应该调用API获取用户信息
      userInfo.value = {
        id: 1,
        username: '用户',
        email: 'user@example.com',
        role: 'user',
        avatar: ''
      }
    }
  }

  // 用户登录
  const login = async (loginData) => {
    try {
      // 模拟登录API调用
      const response = { 
        data: { 
          token: 'mock-jwt-token',
          user: {
            id: 1,
            username: loginData.username,
            email: 'user@example.com',
            role: 'user'
          }
        }
      }
      
      token.value = response.data.token
      userInfo.value = response.data.user
      localStorage.setItem('token', response.data.token)
      
      return { success: true }
    } catch (error) {
      return { success: false, message: '登录失败' }
    }
  }

  // 用户注册
  const register = async (registerData) => {
    try {
      // 模拟注册API调用
      console.log('注册数据:', registerData)
      return { success: true, message: '注册成功' }
    } catch (error) {
      return { success: false, message: '注册失败' }
    }
  }

  // 用户退出登录
  const logout = () => {
    userInfo.value = null
    token.value = null
    permissions.value = []
    localStorage.removeItem('token')
  }

  // 更新用户信息
  const updateUserInfo = (newInfo) => {
    userInfo.value = { ...userInfo.value, ...newInfo }
  }

  // 检查权限
  const hasPermission = (permission) => {
    return permissions.value.includes(permission)
  }

  return {
    userInfo,
    token,
    permissions,
    isLoggedIn,
    userName,
    userRole,
    initUser,
    login,
    register,
    logout,
    updateUserInfo,
    hasPermission
  }
})