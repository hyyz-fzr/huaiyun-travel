<template>
  <div class="product-detail-page" v-loading="loading">
    <div class="product-container">
      <!-- 商品图片区域 -->
      <div class="product-gallery">
        <div class="main-image">
          <img :src="currentImage" :alt="product.name" />
        </div>
        <div class="image-thumbnails">
          <div
            v-for="(image, index) in product.images"
            :key="index"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="changeImage(index)"
          >
            <img :src="image" :alt="`${product.name}图片${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- 商品信息区域 -->
      <div class="product-info">
        <div class="product-header">
          <h1 class="product-title">{{ product.name }}</h1>
          <p class="product-subtitle">{{ product.subtitle }}</p >
        </div>

        <div class="product-meta">
          <div class="rating-section">
            <el-rate v-model="product.rating" disabled show-score text-color="#ff9900" />
            <span class="review-count">({{ product.reviewCount }}条评价)</span>
            <span class="sales">销量: {{ product.sales }}</span>
          </div>

          <div class="price-section">
            <div class="current-price">¥{{ product.price }}</div>
            <div v-if="product.originalPrice" class="original-price">
              ¥{{ product.originalPrice }}
            </div>
            <div v-if="product.discount" class="discount">
              {{ product.discount }}折
            </div>
          </div>

          <div class="stock-section">
            <span>库存: </span>
            <span class="stock-count" :class="{ low: product.stock < 10 }">
              {{ product.stock }}件
            </span>
          </div>
        </div>

        <!-- 规格选择 -->
        <div class="specs-section" v-if="product.specs && product.specs.length > 0">
          <div
            v-for="spec in product.specs"
            :key="spec.name"
            class="spec-item"
          >
            <div class="spec-name">{{ spec.name }}:</div>
            <div class="spec-options">
              <el-radio-group v-model="selectedSpecs[spec.name]">
                <el-radio
                  v-for="option in spec.options"
                  :key="option.name"
                  :label="option.name"
                  :disabled="option.stock === 0"
                >
                  {{ option.name }}
                  <span v-if="option.stock === 0" class="sold-out">(缺货)</span>
                  <span v-else class="stock-info">(库存{{ option.stock }})</span>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <!-- 购买数量 -->
        <div class="quantity-section">
          <span>数量: </span>
          <el-input-number
            v-model="quantity"
            :min="1"
            :max="maxQuantity"
            controls-position="right"
          />
          <span class="stock-tip">最多购买{{ maxQuantity }}件</span>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button
            type="primary"
            size="large"
            :icon="ShoppingCart"
            @click="addToCart"
            :loading="addingToCart"
          >
            加入购物车
          </el-button>
          <el-button
            type="danger"
            size="large"
            :icon="Wallet"
            @click="buyNow"
            :loading="buying"
          >
            立即购买
          </el-button>
          <el-button
            :type="isFavorited ? 'danger' : 'default'"
            size="large"
            :icon="Star"
            @click="toggleFavorite"
          >
            {{ isFavorited ? '已收藏' : '收藏' }}
          </el-button>
        </div>

        <!-- 服务承诺 -->
        <div class="service-promise">
          <div class="service-item">
            <el-icon><CircleCheck /></el-icon>
            <span>正品保证</span>
          </div>
          <div class="service-item">
            <el-icon><CircleCheck /></el-icon>
            <span>七天无理由退货</span>
          </div>
          <div class="service-item">
            <el-icon><CircleCheck /></el-icon>
            <span>快速发货</span>
          </div>
          <div class="service-item">
            <el-icon><CircleCheck /></el-icon>
            <span>售后保障</span>
          </div>
        </div>
      </div>
    </div>

    <!-- 商品详情标签页 -->
    <div class="product-tabs">
      <el-tabs v-model="activeTab">
        <el-tab-pane label="商品详情" name="detail">
          <div class="detail-content" v-html="product.detailHtml"></div>
        </el-tab-pane>
        <el-tab-pane :label="`商品评价(${product.reviewCount})`" name="reviews">
          <div class="reviews-content">
            <div v-for="review in product.reviews" :key="review.id" class="review-item">
              <div class="review-header">
                <div class="user-info">
                  <el-avatar :size="40" :src="review.avatar" />
                  <div class="user-details">
                    <div class="username">{{ review.userName }}</div>
                    <el-rate v-model="review.rating" disabled size="small" />
                  </div>
                </div>
                <div class="review-time">{{ review.time }}</div>
              </div>
              <div class="review-content">{{ review.content }}</div>
              <div v-if="review.images && review.images.length > 0" class="review-images">
                <img
                  v-for="(img, index) in review.images"
                  :key="index"
                  :src="img"
                  @click="previewImage(img)"
                />
              </div>
            </div>
          </div>
        </el-tab-pane>
        <el-tab-pane label="购买须知" name="notice">
          <div class="notice-content">
            <h3>配送说明</h3>
            <p>全国包邮（偏远地区除外），一般48小时内发货</p >
            
            <h3>退换货政策</h3>
            <p>支持7天无理由退换货，商品需保持完好</p >
            
            <h3>售后服务</h3>
            <p>提供完善的售后服务，如有问题请联系客服</p >
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="60%">
      <img :src="previewImageUrl" style="width: 100%" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useCartStore } from '@/stores/cart'
import { productApi } from '@/api/product'
import { userApi } from '@/api/user'
import { ShoppingCart, Wallet, Star, CircleCheck } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const cartStore = useCartStore()

const product = ref({})
const loading = ref(false)
const addingToCart = ref(false)
const buying = ref(false)
const activeTab = ref('detail')
const currentImageIndex = ref(0)
const quantity = ref(1)
const selectedSpecs = reactive({})
const isFavorited = ref(false)
const previewVisible = ref(false)
const previewImageUrl = ref('')

const currentImage = computed(() => 
  product.value.images?.[currentImageIndex.value] || '/src/assets/images/product-default.jpg'
)

const maxQuantity = computed(() => {
  const baseStock = product.value.stock || 0
  // 如果有规格选择，根据规格库存计算
  if (Object.keys(selectedSpecs).length > 0) {
    // 这里可以根据选择的规格计算实际库存
    return baseStock
  }
  return baseStock
})

const changeImage = (index) => {
  currentImageIndex.value = index
}

const previewImage = (url) => {
  previewImageUrl.value = url
  previewVisible.value = true
}

const loadProductDetail = async () => {
  loading.value = true
  try {
    const productId = route.params.id
    const res = await productApi.getProductDetail(productId)
    product.value = res.data
    isFavorited.value = res.data.isFavorited || false
    
    // 初始化规格选择
    if (product.value.specs && product.value.specs.length > 0) {
      product.value.specs.forEach(spec => {
        const availableOption = spec.options.find(opt => opt.stock > 0)
        if (availableOption) {
          selectedSpecs[spec.name] = availableOption.name
        }
      })
    }
  } catch (error) {
    // 使用模拟数据
    product.value = {
      id: 1,
      name: '淮南豆腐文化纪念T恤',
      subtitle: '纯棉材质 文化传承 舒适透气',
      price: 89,
      originalPrice: 129,
      discount: 6.9,
      rating: 4.5,
      reviewCount: 128,
      sales: 356,
      stock: 45,
      images: [
        '/src/assets/images/product-1.jpg',
        '/src/assets/images/product-1-2.jpg',
        '/src/assets/images/product-1-3.jpg'
      ],
      specs: [
        {
          name: '颜色',
          options: [
            { name: '白色', stock: 20 },
            { name: '黑色', stock: 15 },
            { name: '蓝色', stock: 10 }
          ]
        },
        {
          name: '尺码',
          options: [
            { name: 'S', stock: 8 },
            { name: 'M', stock: 12 },
            { name: 'L', stock: 15 },
            { name: 'XL', stock: 10 }
          ]
        }
      ],
      detailHtml: `
        <div class="product-detail-html">
          <h3>产品特色</h3>
          <p>采用100%纯棉材质，舒适透气，印有淮南豆腐文化特色图案，展现地方文化魅力。</p >
          <h3>设计理念</h3>
          <p>融合淮南豆腐制作工艺元素，传承非遗文化，让传统文化走进日常生活。</p >
          <h3>产品参数</h3>
          <ul>
            <li>材质：100%纯棉</li>
            <li>工艺：数码直喷印花</li>
            <li>重量：约200g</li>
            <li>产地：安徽淮南</li>
          </ul>
          < img src="/src/assets/images/product-detail-1.jpg" alt="产品详情" />
          < img src="/src/assets/images/product-detail-2.jpg" alt="产品详情" />
        </div>
      `,
      reviews: [
        {
          id: 1,
          userName: '文化爱好者',
          avatar: '/src/assets/images/avatar1.jpg',
          rating: 5,
          time: '2024-01-12',
          content: '质量很好，图案很有文化特色，穿着很舒适，朋友都说很好看！',
          images: ['/src/assets/images/review-1.jpg']
        },
        {
          id: 2,
          userName: '淮南本地人',
          avatar: '/src/assets/images/avatar2.jpg',
          rating: 4,
          time: '2024-01-10',
          content: '作为淮南人，看到家乡文化被这样创意地呈现出来，真的很感动。质量也不错。'
        }
      ]
    }
    isFavorited.value = false
  } finally {
    loading.value = false
  }
}

const addToCart = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  addingToCart.value = true
  try {
    const cartItem = {
      productId: product.value.id,
      quantity: quantity.value,
      specs: selectedSpecs
    }
    
    cartStore.addToCart(product.value, quantity.value)
    ElMessage.success('已添加到购物车')
  } catch (error) {
    ElMessage.error('添加失败')
  } finally {
    addingToCart.value = false
  }
}

const buyNow = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  buying.value = true
  try {
    await addToCart()
    router.push('/cart')
  } catch (error) {
    ElMessage.error('购买失败')
  } finally {
    buying.value = false
  }
}

const toggleFavorite = async () => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    if (isFavorited.value) {
      await userApi.removeFavorite({id:product.value.id, type:'product'})
      isFavorited.value = false
      ElMessage.success('已取消收藏')
    } else {
      await userApiaddToFavorite({ id: product.value.id, type: 'product' })
      isFavorited.value = true
      ElMessage.success('收藏成功')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

onMounted(() => {
  loadProductDetail()
})
</script>

<style scoped>
.product-detail-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  margin-bottom: 60px;
}

.product-gallery {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.main-image {
  width: 100%;
  height: 500px;
  border-radius: 12px;
  overflow: hidden;
  background: #f5f7fa;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-thumbnails {
  display: flex;
  gap: 12px;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: #409EFF;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  padding: 20px 0;
}

.product-header {
  margin-bottom: 24px;
}

.product-title {
  font-size: 1.8rem;
  color: #303133;
  margin: 0 0 8px 0;
  line-height: 1.4;
}

.product-subtitle {
  color: #606266;
  font-size: 1rem;
  margin: 0;
}

.product-meta {
  margin-bottom: 30px;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  font-size: 0.9rem;
  color: #606266;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.current-price {
  font-size: 2rem;
  font-weight: bold;
  color: #F56C6C;
}

.original-price {
  font-size: 1.2rem;
  color: #909399;
  text-decoration: line-through;
}

.discount {
  background: #F56C6C;
  color: white;
  padding: 2px 8px;
  border-radius: 4px;
  font-size: 0.9rem;
}

.stock-section {
  font-size: 0.9rem;
  color: #606266;
}

.stock-count.low {
  color: #F56C6C;
  font-weight: bold;
}

.specs-section {
  margin-bottom: 24px;
}

.spec-item {
  margin-bottom: 20px;
}

.spec-name {
  font-weight: bold;
  margin-bottom: 8px;
  color: #303133;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

:deep(.el-radio) {
  margin-right: 0;
}

.sold-out {
  color: #F56C6C;
  font-size: 0.8rem;
}

.stock-info {
  color: #67C23A;
  font-size: 0.8rem;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 30px;
  font-size: 0.9rem;
  color: #606266;
}

.stock-tip {
  color: #909399;
  font-size: 0.8rem;
}

.action-buttons {
  display: flex;
  gap: 16px;
  margin-bottom: 30px;
}

:deep(.action-buttons .el-button) {
  flex: 1;
}

.service-promise {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 0.9rem;
  color: #606266;
}

.service-item .el-icon {
  color: #67C23A;
}

.product-tabs {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
}

.detail-content {
  line-height: 1.6;
}

.detail-content h3 {
  color: #303133;
  margin: 20px 0 12px 0;
}

.detail-content p {
  color: #606266;
  margin-bottom: 12px;
}

.detail-content ul {
  color: #606266;
  margin-bottom: 20px;
}

.detail-content img {
  max-width: 100%;
  border-radius: 8px;
  margin: 12px 0;
}

.review-item {
  padding: 20px 0;
  border-bottom: 1px solid #f0f0f0;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.username {
  font-weight: bold;
  color: #303133;
}

.review-time {
  color: #909399;
  font-size: 0.9rem;
}

.review-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 12px;
}

.review-images {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.review-images img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 6px;
  cursor: pointer;
}

.notice-content h3 {
  color: #303133;
  margin: 16px 0 8px 0;
}

.notice-content p {
  color: #606266;
  line-height: 1.6;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 30px;
  }
  
  .main-image {
    height: 300px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .service-promise {
    grid-template-columns: 1fr;
  }
}
</style>
