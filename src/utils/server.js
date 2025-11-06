// 服务器工具函数
export const api = {
  baseURL: process.env.VUE_APP_API_URL || 'http://localhost:3001',
  
  // API端点
  endpoints: {
    login: '/api/auth/login',
    register: '/api/auth/register',
    userInfo: '/api/user/info',
    heritageList: '/api/heritage/list',
    productList: '/api/products/list',
    postList: '/api/posts/list'
  },
  
  // 构建完整URL
  buildURL(endpoint) {
    return this.baseURL + endpoint
  }
}

// 错误处理
export const errorHandler = {
  handleNetworkError(error) {
    console.error('网络错误:', error)
    return '网络连接失败，请检查网络设置'
  },
  
  handleServerError(error) {
    console.error('服务器错误:', error)
    return '服务器内部错误，请稍后重试'
  }
}