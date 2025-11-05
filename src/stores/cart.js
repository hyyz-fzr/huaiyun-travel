import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'

export const useCartStore = defineStore('cart', () => {
  const cartItems = ref(JSON.parse(localStorage.getItem('cartItems') || '[]'))

  // 计算属性
  const totalCount = computed(() => 
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  )
  
  const totalPrice = computed(() =>
    cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
  )

  // 保存到本地存储
  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems.value))
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
    ElMessage.success('商品已添加到购物车')
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
      ElMessage.success('商品已从购物车移除')
    }
  }

  // 清空购物车
  const clearCart = () => {
    cartItems.value = []
    saveToLocalStorage()
    ElMessage.success('购物车已清空')
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