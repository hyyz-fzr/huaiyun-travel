// 购物车相关工具函数
export const cartAPI = {
  // 获取购物车列表
  getCartList() {
    const cartData = localStorage.getItem('huaiyun_cart')
    return cartData ? JSON.parse(cartData) : []
  },

  // 添加商品到购物车
  addToCart(product, quantity = 1, options = {}) {
    const cartItems = this.getCartList()
    const existingItemIndex = cartItems.findIndex(item => 
      item.product.id === product.id && 
      JSON.stringify(item.options) === JSON.stringify(options)
    )

    if (existingItemIndex > -1) {
      // 更新数量
      cartItems[existingItemIndex].quantity += quantity
    } else {
      // 添加新商品
      cartItems.push({
        id: Date.now().toString(),
        product: product,
        quantity: quantity,
        options: options,
        addedAt: new Date().toISOString()
      })
    }

    this.saveCart(cartItems)
    return cartItems
  },

  // 更新购物车商品数量
  updateCartItemQuantity(itemId, quantity) {
    const cartItems = this.getCartList()
    const itemIndex = cartItems.findIndex(item => item.id === itemId)
    
    if (itemIndex > -1) {
      if (quantity <= 0) {
        cartItems.splice(itemIndex, 1)
      } else {
        cartItems[itemIndex].quantity = quantity
      }
      this.saveCart(cartItems)
    }
    
    return cartItems
  },

  // 从购物车移除商品
  removeFromCart(itemId) {
    const cartItems = this.getCartList()
    const filteredItems = cartItems.filter(item => item.id !== itemId)
    this.saveCart(filteredItems)
    return filteredItems
  },

  // 清空购物车
  clearCart() {
    this.saveCart([])
    return []
  },

  // 保存购物车数据
  saveCart(cartItems) {
    localStorage.setItem('huaiyun_cart', JSON.stringify(cartItems))
  },

  // 获取购物车商品总数
  getCartItemCount() {
    const cartItems = this.getCartList()
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  },

  // 获取购物车总金额
  getCartTotal() {
    const cartItems = this.getCartList()
    return cartItems.reduce((total, item) => {
      return total + (item.product.price * item.quantity)
    }, 0)
  }
}

// 购物车工具函数
export const cartUtils = {
  // 格式化购物车显示
  formatCartForDisplay(cartItems) {
    return cartItems.map(item => ({
      id: item.id,
      name: item.product.name,
      price: item.product.price,
      quantity: item.quantity,
      image: item.product.mainImage,
      options: item.options,
      subtotal: item.product.price * item.quantity
    }))
  },

  // 验证购物车商品库存
  validateCartStock(cartItems, productStock) {
    const errors = []
    cartItems.forEach(item => {
      const stock = productStock[item.product.id]
      if (stock && item.quantity > stock) {
        errors.push({
          product: item.product.name,
          requested: item.quantity,
          available: stock
        })
      }
    })
    return errors
  },

  // 生成购物车摘要
  generateCartSummary(cartItems) {
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
    const totalAmount = cartItems.reduce((sum, item) => 
      sum + (item.product.price * item.quantity), 0
    )
    
    return {
      totalItems,
      totalAmount,
      formattedAmount: `￥${totalAmount.toFixed(2)}`
    }
  }
}