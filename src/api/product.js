import api from './index'

// 产品相关API
export const productApi = {
  // 获取产品列表
  getProducts(params) {
    return api.get('/products', params)
  },

  // 获取产品详情
  getProductDetail(id) {
    return api.get(`/products/${id}`)
  },

  // 创建产品
  createProduct(data) {
    return api.post('/products', data)
  },

  // 更新产品
  updateProduct(id, data) {
    return api.put(`/products/${id}`, data)
  },

  // 删除产品
  deleteProduct(id) {
    return api.delete(`/products/${id}`)
  },

  // 获取产品分类
  getCategories() {
    return api.get('/products/categories')
  },

  // 搜索产品
  searchProducts(params) {
    return api.get('/products/search', params)
  }
}