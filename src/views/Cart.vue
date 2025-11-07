<<<<<<< HEAD
<template>
  <div class="cart-page">
    <div class="page-header">
      <h1>购物车</h1>
      <p>确认商品信息并完成购买</p >
    </div>

    <div class="cart-content">
      <el-row :gutter="24">
        <!-- 购物车列表 -->
        <el-col :xs="24" :lg="16">
          <el-card class="cart-list-card">
            <template #header>
              <div class="cart-header">
                <span>商品列表</span>
                <el-button type="text" @click="clearCart" :disabled="cartItems.length === 0">
                  清空购物车
                </el-button>
              </div>
            </template>

            <div class="cart-items">
              <div
                v-for="item in cartItems"
                :key="item.id"
                class="cart-item"
              >
                <div class="item-select">
                  <el-checkbox 
                    id="itemSelected"
                    name="itemSelected"
                    v-model="item.selected" 
                    @change="updateSelection" 
                  />
                </div>

                <div class="item-image">
                  < img :src="item.image" @error="handleImageError" />
                </div>

                <div class="item-info">
                  <h3 class="item-name">{{ item.name }}</h3>
                  <p class="item-desc">{{ item.description }}</p >
                  <div class="item-sku" v-if="item.sku">
                    <span class="sku-text">{{ item.sku }}</span>
                  </div>
                </div>

                <div class="item-price">
                  <span class="price">¥{{ item.price }}</span>
                </div>

                <div class="item-quantity">
                  <el-input-number
                    id="itemQuantity"
                    name="itemQuantity"
                    v-model="item.quantity"
                    :min="1"
                    :max="item.stock"
                    size="small"
                    @change="updateQuantity(item)"
                  />
                </div>

                <div class="item-total">
                  <span class="total-price">¥{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>

                <div class="item-actions">
                  <el-button type="text" size="small" @click="removeItem(item.id)">
                    <el-icon><Delete /></el-icon>
                  </el-button>
                </div>
              </div>
            </div>

            <!-- 空状态 -->
            <el-empty
              v-if="cartItems.length === 0"
              description="购物车为空"
              :image-size="200"
            >
              <el-button type="primary" @click="$router.push('/products')">
                去购物
              </el-button>
            </el-empty>
          </el-card>
        </el-col>

        <!-- 订单摘要 -->
        <el-col :xs="24" :lg="8">
          <div class="order-summary">
            <el-card class="summary-card">
              <template #header>
                <span>订单摘要</span>
              </template>

              <div class="summary-content">
                <div class="summary-row">
                  <span>商品总价</span>
                  <span>¥{{ totalPrice.toFixed(2) }}</span>
                </div>

                <div class="summary-row">
                  <span>运费</span>
                  <span v-if="shippingFee > 0">¥{{ shippingFee.toFixed(2) }}</span>
                  <span v-else class="free-shipping">免运费</span>
                </div>

                <div class="summary-row discount-row">
                  <span>优惠券</span>
                  <el-button type="text" @click="showCouponDialog = true">
                    {{ selectedCoupon ? selectedCoupon.name : '选择优惠券' }}
                  </el-button>
                </div>

                <div class="summary-row total-row">
                  <span>实付款</span>
                  <span class="final-price">¥{{ finalPrice.toFixed(2) }}</span>
                </div>

                <div class="selected-count">
                  已选 {{ selectedCount }} 件商品
                </div>

                <el-button
                  type="primary"
                  size="large"
                  :disabled="selectedCount === 0"
                  @click="createOrder"
                  class="checkout-btn"
                >
                  立即结算
                </el-button>

                <div class="security-tips">
                  <el-icon><Lock /></el-icon>
                  <span>安全支付保障</span>
                </div>
              </div>
            </el-card>

            <!-- 推荐商品 -->
            <el-card class="recommend-card">
              <template #header>
                <span>猜你喜欢</span>
              </template>
              <div class="recommend-list">
                <div
                  v-for="product in recommendedProducts"
                  :key="product.id"
                  class="recommend-item"
                  @click="$router.push(`/product/${product.id}`)"
                >
                  < img :src="product.image" />
                  <div class="recommend-info">
                    <h4>{{ product.name }}</h4>
                    <p class="recommend-price">¥{{ product.price }}</p >
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 优惠券对话框 -->
    <el-dialog v-model="showCouponDialog" title="选择优惠券" width="400px">
      <div class="coupon-list">
        <div
          v-for="coupon in availableCoupons"
          :key="coupon.id"
          :class="['coupon-item', { active: selectedCoupon?.id === coupon.id }]"
          @click="selectCoupon(coupon)"
        >
          <div class="coupon-content">
            <div class="coupon-value">
              <span class="value">¥{{ coupon.value }}</span>
              <span class="condition">满{{ coupon.minAmount }}元可用</span>
            </div>
            <div class="coupon-info">
              <div class="coupon-name">{{ coupon.name }}</div>
              <div class="coupon-date">有效期至 {{ coupon.expireDate }}</div>
            </div>
          </div>
        </div>
      </div>

      <el-empty v-if="availableCoupons.length === 0" description="暂无可用优惠券" />

      <template #footer>
        <el-button @click="showCouponDialog = false">取消</el-button>
        <el-button type="primary" @click="applyCoupon">应用</el-button>
      </template>
    </el-dialog>
=======
﻿<template>
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

<<<<<<< HEAD
const router = useRouter()
const cartStore = useCartStore()

const showCouponDialog = ref(false)
const selectedCoupon = ref(null)

// 计算属性
const cartItems = computed(() => cartStore.items)
const selectedCount = computed(() => cartStore.selectedCount)
const totalPrice = computed(() => cartStore.totalPrice)
const shippingFee = computed(() => totalPrice.value > 99 ? 0 : 10)
const finalPrice = computed(() => {
  let price = totalPrice.value + shippingFee.value
  if (selectedCoupon.value && totalPrice.value >= selectedCoupon.value.minAmount) {
    price -= selectedCoupon.value.value
  }
  return Math.max(0, price)
})

// 模拟数据
const availableCoupons = ref([
  {
    id: 1,
    name: '新用户优惠',
    value: 10,
    minAmount: 50,
    expireDate: '2024-12-31'
  },
  {
    id: 2,
    name: '满减券',
    value: 20,
    minAmount: 100,
    expireDate: '2024-12-31'
  }
])

const recommendedProducts = ref([
  {
    id: 1,
    name: '淮南文化书签',
    price: 25,
    image: 'https://via.placeholder.com/60x60/3F51B5/white?text=书签'
  },
  {
    id: 2,
    name: '八公山明信片',
    price: 15,
    image: 'https://via.placeholder.com/60x60/4CAF50/white?text=明信片'
  },
  {
    id: 3,
    name: '剪纸艺术包装',
    price: 68,
    image: 'https://via.placeholder.com/60x60/F44336/white?text=剪纸'
  }
])

// 方法
const updateSelection = () => {
  cartStore.updateSelection()
}

const updateQuantity = (item) => {
  cartStore.updateQuantity(item.id, item.quantity)
}

const removeItem = async (itemId) => {
  try {
    await ElMessageBox.confirm('确定删除该商品吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    cartStore.removeFromCart(itemId)
    ElMessage.success('商品已移除')
  } catch {
    // 用户取消
  }
}

const clearCart = async () => {
  try {
    await ElMessageBox.confirm('确定要清空购物车吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    cartStore.clearCart()
    ElMessage.success('购物车已清空')
  } catch {
    // 用户取消
  }
}

const selectCoupon = (coupon) => {
  selectedCoupon.value = coupon
}

const applyCoupon = () => {
  if (selectedCoupon.value) {
    ElMessage.success(`已应用优惠券：${selectedCoupon.value.name}`)
  }
  showCouponDialog.value = false
}

const createOrder = () => {
  const selectedItems = cartItems.value.filter(item => item.selected)
  if (selectedItems.length === 0) {
    ElMessage.warning('请选择要购买的商品')
    return
  }

  // 跳转到订单确认页面
  router.push({
    path: '/orders/confirm',
    query: {
      items: selectedItems.map(item => item.id).join(','),
      coupon: selectedCoupon.value?.id
    }
  })
}

const handleImageError = (event) => {
  event.target.src = '/images/default-product.jpg'
}

onMounted(() => {
  cartStore.loadCart()
})
=======
const handleClick = () => {
  ElMessage.success('组件功能正常')
}
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
</script>

<style scoped>
.component {
  padding: 20px;
  text-align: center;
<<<<<<< HEAD
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 2.2em;
}

.page-header p {
  color: #606266;
  font-size: 1.1em;
  margin: 0;
}

.cart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

/* 购物车商品列表 */
.cart-items {
  gap: 16px;
}

.cart-item {
  display: grid;
  grid-template-columns: 40px 80px 1fr 100px 120px 100px 40px;
  gap: 16px;
  align-items: center;
  padding: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item:last-child {
  border-bottom: none;
}

.item-image {
  width: 80px;
  height: 80px;
}

.item-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.item-info {
  min-width: 0;
}

.item-name {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 14px;
  line-height: 1.4;
}

.item-desc {
  color: #606266;
  font-size: 12px;
  margin: 0 0 8px 0;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.item-sku {
  font-size: 12px;
  color: #909399;
}

.item-price {
  text-align: center;
}

.price {
  color: #e6a23c;
  font-weight: bold;
  font-size: 1.1em;
}

.item-total {
  text-align: center;
}

.total-price {
  color: #e6a23c;
  font-weight: bold;
  font-size: 1.1em;
}

.item-actions {
  text-align: center;
}

/* 订单摘要 */
.order-summary {
  position: sticky;
  top: 20px;
}

.summary-content {
  gap: 16px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px 0;
}

.discount-row {
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.total-row {
  border-top: 1px solid #f0f0f0;
  padding-top: 16px;
  font-size: 1.1em;
  font-weight: 600;
}

.final-price {
  color: #e6a23c;
  font-size: 1.3em;
}

.free-shipping {
  color: #67c23a;
}

.selected-count {
  text-align: center;
  color: #909399;
  font-size: 14px;
  margin: 16px 0;
}

.checkout-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  margin-bottom: 16px;
}

.security-tips {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  color: #67c23a;
  font-size: 14px;
}

/* 推荐商品 */
.recommend-card {
  margin-top: 20px;
}

.recommend-list {
  gap: 12px;
}

.recommend-item {
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 8px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.recommend-item:hover {
  background: #f5f7fa;
}

.recommend-item img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 4px;
}

.recommend-info {
  flex: 1;
  min-width: 0;
}

.recommend-info h4 {
  margin: 0 0 4px 0;
  font-size: 13px;
  line-height: 1.4;
  color: #303133;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.recommend-price {
  margin: 0;
  color: #e6a23c;
  font-weight: bold;
  font-size: 14px;
}

/* 优惠券 */
.coupon-list {
  gap: 12px;
  max-height: 300px;
  overflow-y: auto;
}

.coupon-item {
  border: 1px solid #e6e6e6;
  border-radius: 6px;
  padding: 16px;
  cursor: pointer;
  transition: all 0.3s;
}

.coupon-item:hover {
  border-color: #409eff;
}

.coupon-item.active {
  border-color: #409eff;
  background: #f0f9ff;
}

.coupon-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.coupon-value {
  text-align: center;
  min-width: 80px;
}

.coupon-value .value {
  display: block;
  color: #e6a23c;
  font-size: 1.5em;
  font-weight: bold;
}

.coupon-value .condition {
  display: block;
  font-size: 12px;
  color: #909399;
}

.coupon-info {
  flex: 1;
}

.coupon-name {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.coupon-date {
  font-size: 12px;
  color: #909399;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .cart-page {
    padding: 16px;
  }
  
  .cart-item {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
    padding: 20px;
    border: 1px solid #f0f0f0;
    border-radius: 8px;
    margin-bottom: 16px;
  }
  
  .item-info {
    order: -1;
  }
  
  .item-name {
    font-size: 1.1em;
  }
  
  .page-header h1 {
    font-size: 1.8em;
  }
  
  .order-summary {
    position: static;
    margin-top: 20px;
  }
=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</style>