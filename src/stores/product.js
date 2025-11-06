import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([])
  const currentProduct = ref(null)

  // 获取产品列表
  const fetchProducts = async () => {
    // 模拟获取产品数据
    products.value = [
      { id: 1, name: '淮南豆腐文化文创', price: 99, description: '精美的豆腐文化创意产品' },
      { id: 2, name: '八公山传说书籍', price: 68, description: '八公山历史文化书籍' }
    ]
  }

  return {
    products,
    currentProduct,
    fetchProducts
  }
})