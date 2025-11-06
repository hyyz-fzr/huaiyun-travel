// 请求工具函数
export const request = {
  get(url, params) {
    console.log('GET请求:', url, params)
    return Promise.resolve({ data: {} })
  },
  
  post(url, data) {
    console.log('POST请求:', url, data)
    return Promise.resolve({ data: {} })
  },
  
  put(url, data) {
    console.log('PUT请求:', url, data)
    return Promise.resolve({ data: {} })
  },
  
  delete(url) {
    console.log('DELETE请求:', url)
    return Promise.resolve({ data: {} })
  }
}

// 本地存储工具
export const storage = {
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value))
  },
  
  get(key) {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : null
  },
  
  remove(key) {
    localStorage.removeItem(key)
  }
}