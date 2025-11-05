import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('product', () => {
  const products = ref([
    {
      id: 1,
      name: '淮南豆腐文化纪念杯',
      description: '以淮南豆腐文化为设计灵感，精美陶瓷杯，寓意健康与传承。',
      price: 68,
      originalPrice: 88,
      image: 'https://via.placeholder.com/300x300?text=豆腐文化杯',
      category: '生活用品',
      tags: ['陶瓷', '实用', '文化'],
      stock: 50,
      sales: 120,
      rating: 4.8,
      reviews: 36,
      isHot: true,
      isNew: true
    },
    {
      id: 2,
      name: '八公山风景明信片套装',
      description: '一套12张八公山风景明信片，记录淮南美丽风光。',
      price: 25,
      originalPrice: 30,
      image: 'https://via.placeholder.com/300x300?text=明信片套装',
      category: '文具',
      tags: ['纸质', '收藏', '风景'],
      stock: 100,
      sales: 89,
      rating: 4.5,
      reviews: 24,
      isHot: true,
      isNew: false
    },
    {
      id: 3,
      name: '非遗剪纸艺术框画',
      description: '淮南传统剪纸艺术框画，手工制作，具有很高的艺术价值。',
      price: 158,
      originalPrice: 198,
      image: 'https://via.placeholder.com/300x300?text=剪纸框画',
      category: '装饰品',
      tags: ['手工', '非遗', '艺术'],
      stock: 20,
      sales: 45,
      rating: 4.9,
      reviews: 18,
      isHot: false,
      isNew: true
    },
    {
      id: 4,
      name: '淮南历史文化T恤',
      description: '印有淮南文化元素的纯棉T恤，舒适透气，文化感十足。',
      price: 79,
      originalPrice: 99,
      image: 'https://via.placeholder.com/300x300?text=文化T恤',
      category: '服饰',
      tags: ['纯棉', '时尚', '文化'],
      stock: 80,
      sales: 156,
      rating: 4.6,
      reviews: 42,
      isHot: true,
      isNew: false
    }
  ])

  const categories = ref(['全部', '生活用品', '文具', '装饰品', '服饰', '模型', '书籍'])
  const currentCategory = ref('全部')
  const searchKeyword = ref('')
  const sortBy = ref('default')

  // 获取产品列表
  const getProducts = () => {
    let filteredProducts = products.value
    
    // 按分类筛选
    if (currentCategory.value !== '全部') {
      filteredProducts = filteredProducts.filter(product => 
        product.category === currentCategory.value
      )
    }
    
    // 按关键词搜索
    if (searchKeyword.value) {
      const keyword = searchKeyword.value.toLowerCase()
      filteredProducts = filteredProducts.filter(product =>
        product.name.toLowerCase().includes(keyword) ||
        product.description.toLowerCase().includes(keyword) ||
        product.tags.some(tag => tag.toLowerCase().includes(keyword))
      )
    }

    // 排序
    switch (sortBy.value) {
      case 'price-asc':
        filteredProducts = filteredProducts.sort((a, b) => a.price - b.price)
        break
      case 'price-desc':
        filteredProducts = filteredProducts.sort((a, b) => b.price - a.price)
        break
      case 'sales':
        filteredProducts = filteredProducts.sort((a, b) => b.sales - a.sales)
        break
      case 'rating':
        filteredProducts = filteredProducts.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 默认排序：新品、热销、常规
        filteredProducts = filteredProducts.sort((a, b) => {
          if (a.isNew && !b.isNew) return -1
          if (!a.isNew && b.isNew) return 1
          if (a.isHot && !b.isHot) return -1
          if (!a.isHot && b.isHot) return 1
          return b.sales - a.sales
        })
    }
    
    return filteredProducts
  }

  // 根据ID获取产品
  const getProductById = (id) => {
    return products.value.find(product => product.id === parseInt(id))
  }

  // 设置当前分类
  const setCategory = (category) => {
    currentCategory.value = category
  }

  // 设置搜索关键词
  const setSearchKeyword = (keyword) => {
    searchKeyword.value = keyword
  }

  // 设置排序方式
  const setSortBy = (sort) => {
    sortBy.value = sort
  }

  return {
    products,
    categories,
    currentCategory,
    searchKeyword,
    sortBy,
    getProducts,
    getProductById,
    setCategory,
    setSearchKeyword,
    setSortBy
  }
})