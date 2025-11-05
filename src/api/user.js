import api from './index'

// 用户相关API
export const userApi = {
  // 用户登录
  login(data) {
    return api.post('/auth/login', data)
  },

  // 用户注册
  register(data) {
    return api.post('/auth/register', data)
  },

  // 获取用户信息
  getProfile() {
    return api.get('/user/profile')
  },

  // 更新用户信息
  updateProfile(data) {
    return api.put('/user/profile', data)
  },

  // 修改密码
  changePassword(data) {
    return api.put('/user/password', data)
  },

  // 上传头像
  uploadAvatar(formData) {
    return api.upload('/user/avatar', formData)
  },

  // 获取用户收藏
  getFavorites(params) {
    return api.get('/user/favorites', params)
  },

  // 获取用户帖子
  getMyPosts(params) {
    return api.get('/user/posts', params)
  },

  // 获取用户订单
  getMyOrders(params) {
    return api.get('/user/orders', params)
  },

  // 获取用户预订
  getMyBookings(params) {
    return api.get('/user/bookings', params)
  }
}