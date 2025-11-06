import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { userApi } from '@/api/user'
import { ElMessage } from 'element-plus'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const userInfo = ref(JSON.parse(localStorage.getItem('userInfo') || 'null'))

  // 计算属性
  const isLoggedIn = computed(() => !!token.value)
  const userId = computed(() => userInfo.value?.id || '')
  const username = computed(() => userInfo.value?.username || '')
  const avatar = computed(() => userInfo.value?.avatar || '')
  const role = computed(() => userInfo.value?.role || 'user')

  // 登录
  const login = async (loginData) => {
    try {
      const response = await userApi.login(loginData)
      token.value = response.data.token
      userInfo.value = response.data.userInfo
      
      // 保存到本地存储
      localStorage.setItem('token', token.value)
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      
      ElMessage.success('登录成功')
      return response
    } catch (error) {
      ElMessage.error('登录失败')
      throw error
    }
  }

  // 注册
  const register = async (registerData) => {
    try {
      const response = await userApi.register(registerData)
      ElMessage.success('注册成功')
      return response
    } catch (error) {
      ElMessage.error('注册失败')
      throw error
    }
  }

  // 退出登录
  const logout = () => {
    token.value = ''
    userInfo.value = null
    localStorage.removeItem('token')
    localStorage.removeItem('userInfo')
    ElMessage.success('已退出登录')
  }

  // 更新用户信息
  const updateUserInfo = async (userData) => {
    try {
      const response = await userApi.updateProfile(userData)
      userInfo.value = { ...userInfo.value, ...response.data }
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      ElMessage.success('用户信息更新成功')
      return response
    } catch (error) {
      ElMessage.error('更新失败')
      throw error
    }
  }

  // 修改密码
  const changePassword = async (passwordData) => {
    try {
      await userApi.changePassword(passwordData)
      ElMessage.success('密码修改成功')
    } catch (error) {
      ElMessage.error('密码修改失败')
      throw error
    }
  }

  // 上传头像
  const uploadAvatar = async (file) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const response = await userApi.uploadAvatar(formData)
      userInfo.value.avatar = response.data.avatarUrl
      localStorage.setItem('userInfo', JSON.stringify(userInfo.value))
      ElMessage.success('头像上传成功')
      return response
    } catch (error) {
      ElMessage.error('头像上传失败')
      throw error
    }
  }

  return {
    token,
    userInfo,
    isLoggedIn,
    userId,
    username,
    avatar,
    role,
    login,
    register,
    logout,
    updateUserInfo,
    changePassword,
    uploadAvatar,
    initUser
  }
})