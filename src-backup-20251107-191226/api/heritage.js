import api from './index'

// 文化遗产API
export const heritageApi = {
  // 获取文化遗产列表
  getHeritageList(params) {
    return api.get('/heritage', params)
  },

  // 获取文化遗产详情
  getHeritageDetail(id) {
    return api.get(`/heritage/${id}`)
  },

  // 创建文化遗产
  createHeritage(data) {
    return api.post('/heritage', data)
  },

  // 更新文化遗产
  updateHeritage(id, data) {
    return api.put(`/heritage/${id}`, data)
  },

  // 删除文化遗产
  deleteHeritage(id) {
    return api.delete(`/heritage/${id}`)
  },

  // 获取文化遗产分类
  getCategories() {
    return api.get('/heritage/categories')
  },

  // 搜索文化遗产
  searchHeritage(params) {
    return api.get('/heritage/search', params)
  },

  // 获取推荐文化遗产
  getRecommended() {
    return api.get('/heritage/recommended')
  }
}
