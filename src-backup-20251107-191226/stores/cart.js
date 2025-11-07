import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

// SSR兼容的localStorage处理
const getLocalStorage = (key, defaultValue) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      return localStorage.getItem(key) || defaultValue
    } catch (error) {
      console.warn('localStorage访问失败:', error)
      return defaultValue
    }
  }
  return defaultValue
}

const setLocalStorage = (key, value) => {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      localStorage.setItem(key, value)
    } catch (error) {
      console.warn('localStorage设置失败:', error)
    }
  }
}

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(JSON.parse(getLocalStorage('cartItems', '[]')))

  // 计算属性
  const totalCount = computed(() => 
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  // 保存到本地存储
  const saveToLocalStorage = () => {
    setLocalStorage('cartItems', JSON.stringify(cartItems.value))
  }

  // 添加商品到购物车
  const addToCart = (product) => {
    const existingItem = cartItems.value.find(item => item.id === product.id)
    
    if (existingItem) {
      existingItem.quantity += 1
    } else {
      cartItems.value.push({
        ...product,
        quantity: 1
      })
    }
    
    saveToLocalStorage()
    // SSR环境下避免ElMessage报错
    if (typeof window !== 'undefined') {
      ElMessage.success('商品已添加到购物车')
    }
  }

  // 更新商品数量
  const updateQuantity = (productId, quantity) => {
    const item = cartItems.value.find(item => item.id === productId)
    if (item) {
      if (quantity <= 0) {
        removeFromCart(productId)
      } else {
        item.quantity = quantity
        saveToLocalStorage()
      }
    }
  }

  // 从购物车移除商品
  const removeFromCart = (productId) => {
    const index = cartItems.value.findIndex(item => item.id === productId)
    if (index !== -1) {
      cartItems.value.splice(index, 1)
      saveToLocalStorage()
      if (typeof window !== 'undefined') {
        ElMessage.success('商品已从购物车移除')
      }
    }
  }

  // 清空购物车
  const clearCart = () => {
    cartItems.value = []
    saveToLocalStorage()
    if (typeof window !== 'undefined') {
      ElMessage.success('购物车已清空')
    }
  }

  // 获取购物车商品数量
  const getItemQuantity = (productId) => {
    const item = cartItems.value.find(item => item.id === productId)
    return item ? item.quantity : 0
  }

  return {
    cartItems,
    totalCount,
    totalPrice,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemQuantity
  }
})