<template>
  <div class="product-detail">
    <div class="product-container">
      <!-- 商品图片区域 -->
      <div class="product-gallery">
        <div class="main-image">
          < img :src="currentImage" :alt="product.name" />
        </div>
        <div class="image-thumbnails">
          <div 
            v-for="(image, index) in product.images" 
            :key="index"
            class="thumbnail"
            :class="{ active: currentImageIndex === index }"
            @click="changeImage(index)"
          >
            < img :src="image" :alt="`${product.name}图片${index + 1}`" />
          </div>
        </div>
      </div>

      <!-- 商品信息区域 -->
      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        <p class="product-subtitle">{{ product.subtitle }}</p >

        <!-- 价格区域 -->
        <div class="price-section">
          <div class="current-price">¥{{ product.price }}</div>
          <div class="original-price" v-if="product.originalPrice">
            ¥{{ product.originalPrice }}
          </div>
          <el-tag v-if="product.discount" type="danger" class="discount-tag">
            {{ product.discount }}折
          </el-tag>
        </div>

        <!-- 商品评分 -->
        <div class="rating-section">
          <el-rate v-model="product.rating" disabled show-score />
          <span class="review-count">({{ product.reviewCount }}条评价)</span>
        </div>

        <!-- 商品规格选择 -->
        <div class="spec-section">
          <div class="spec-item" v-for="spec in product.specs" :key="spec.name">
            <h4>{{ spec.name }}：</h4>
            <div class="spec-options">
              <el-radio-group v-model="selectedSpecs[spec.name]">
                <el-radio 
                  v-for="option in spec.options" 
                  :key="option"
                  :label="option"
                  :disabled="option.stock === 0"
                >
                  {{ option.name }}
                  <span v-if="option.stock === 0" class="out-of-stock">(缺货)</span>
                </el-radio>
              </el-radio-group>
            </div>
          </div>
        </div>

        <!-- 数量选择 -->
        <div class="quantity-section">
          <h4>数量：</h4>
          <el-input-number 
            v-model="quantity" 
            :min="1" 
            :max="maxQuantity"
            size="large"
          />
          <span class="stock-info">库存 {{ maxQuantity }} 件</span>
        </div>

        <!-- 操作按钮 -->
        <div class="action-buttons">
          <el-button 
            type="primary" 
            size="large" 
            class="buy-now-btn"
            @click="addToCart"
          >
            <el-icon><ShoppingCart /></el-icon>
            加入购物车
          </el-button>
          <el-button 
            type="danger" 
            size="large" 
            class="buy-now-btn"
            @click="buyNow"
          >
            <el-icon><Wallet /></el-icon>
            立即购买
          </el-button>
          <el-button 
            text 
            size="large"
            :class="{ 'favorited': isFavorited }"
            @click="toggleFavorite"
          >
            <el-icon><Star /></el-icon>
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
        </div>
      </div>
    </div>

    <!-- 商品详情标签页 -->
    <div class="product-tabs">
      <el-tabs v-model="activeTab">
        <!-- 商品详情 -->
        <el-tab-pane label="商品详情" name="detail">
          <div class="detail-content" v-html="product.detailHtml"></div>
        </el-tab-pane>

        <!-- 规格参数 -->
        <el-tab-pane label="规格参数" name="specs">
          <el-table :data="specTableData" style="width: 100%">
            <el-table-column prop="name" label="参数名称" width="200" />
            <el-table-column prop="value" label="参数值" />
          </el-table>
        </el-tab-pane>

        <!-- 用户评价 -->
        <el-tab-pane label="用户评价" name="reviews">
          <div class="reviews-section">
            <!-- 评价概览 -->
            <div class="review-overview">
              <div class="overview-score">
                <div class="score-number">{{ product.rating }}</div>
                <div class="score-text">综合评分</div>
                <el-rate v-model="product.rating" disabled />
              </div>
              <div class="review-stats">
                <div 
                  v-for="stat in reviewStats" 
                  :key="stat.rating"
                  class="stat-item"
                >
                  <span class="stat-label">{{ stat.label }}</span>
                  <el-progress 
                    :percentage="stat.percentage" 
                    :show-text="false"
                  />
                  <span class="stat-count">{{ stat.count }}人</span>
                </div>
              </div>
            </div>

            <!-- 评价列表 -->
            <div class="review-list">
              <div 
                v-for="review in product.reviews" 
                :key="review.id"
                class="review-item"
              >
                <div class="review-header">
                  <div class="user-info">
                    < img :src="review.avatar" :alt="review.userName" class="user-avatar" />
                    <span class="user-name">{{ review.userName }}</span>
                  </div>
                  <div class="review-meta">
                    <el-rate v-model="review.rating" disabled size="small" />
                    <span class="review-time">{{ review.time }}</span>
                  </div>
                </div>
                <p class="review-content">{{ review.content }}</p >
                <div class="review-images" v-if="review.images.length > 0">
                  < img 
                    v-for="(img, index) in review.images" 
                    :key="index"
                    :src="img" 
                    class="review-image"
                    @click="viewReviewImage(img)"
                  />
                </div>
              </div>
            </div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>

    <!-- 图片查看对话框 -->
    <el-dialog v-model="showImageDialog" title="查看图片" width="60%">
      < img :src="currentReviewImage" class="dialog-image" />
    </el-dialog>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, reactive, computed } from 'vue'
import { 
  ShoppingCart, 
  Wallet, 
  Star, 
  CircleCheck 
} from '@element-plus/icons-vue'

// 商品数据
const product = ref({
  id: 1,
  name: '淮南豆腐文化纪念T恤',
  subtitle: '纯棉材质 文化传承 舒适透气',
  price: 89,
  originalPrice: 129,
  discount: 6.9,
  rating: 4.5,
  reviewCount: 128,
  images: [
    '/src/assets/images/product1.jpg',
    '/src/assets/images/product2.jpg',
    '/src/assets/images/product3.jpg'
  ],
  specs: [
    {
      name: '颜色',
      options: [
        { name: '白色', stock: 50 },
        { name: '黑色', stock: 30 },
        { name: '蓝色', stock: 0 }
      ]
    },
    {
      name: '尺码',
      options: [
        { name: 'S', stock: 20 },
        { name: 'M', stock: 35 },
        { name: 'L', stock: 25 },
        { name: 'XL', stock: 15 }
      ]
    }
  ],
  stock: 95,
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
      
      < img src="/src/assets/images/product-detail1.jpg" alt="产品详情" />
      < img src="/src/assets/images/product-detail2.jpg" alt="产品详情" />
    </div>
  `,
  reviews: [
    {
      id: 1,
      userName: '文化爱好者',
      avatar: '/src/assets/images/avatar1.jpg',
      rating: 5,
      time: '2024-01-12',
      content: '质量很好，图案很有文化特色，穿着很舒服！',
      images: ['/src/assets/images/review1.jpg']
    }
  ]
})

// 响应式数据
const currentImageIndex = ref(0)
const quantity = ref(1)
const activeTab = ref('detail')
const isFavorited = ref(false)
const selectedSpecs = reactive({})
const showImageDialog = ref(false)
const currentReviewImage = ref('')

// 计算属性
const currentImage = computed(() => product.value.images[currentImageIndex.value])

const maxQuantity = computed(() => {
  // 这里应该根据选择的规格来计算最大数量
  return product.value.stock
})

const specTableData = computed(() => [
  { name: '产品名称', value: product.value.name },
  { name: '材质', value: '100%纯棉' },
  { name: '工艺', value: '数码直喷印花' },
  { name: '重量', value: '约200g' },
  { name: '产地', value: '安徽淮南' },
  { name: '洗涤说明', value: '建议手洗，不宜漂白' }
])

const reviewStats = computed(() => [
  { rating: 5, label: '非常好', percentage: 70, count: 89 },
  { rating: 4, label: '很好', percentage: 20, count: 26 },
  { rating: 3, label: '一般', percentage: 8, count: 10 },
  { rating: 2, label: '较差', percentage: 1, count: 1 },
  { rating: 1, label: '非常差', percentage: 1, count: 2 }
])

// 方法
const changeImage = (index) => {
  currentImageIndex.value = index
}

const addToCart = () => {
  // 验证规格选择
  const missingSpecs = product.value.specs.filter(spec => !selectedSpecs[spec.name])
  if (missingSpecs.length > 0) {
    ElMessage.warning(`请选择${missingSpecs.map(spec => spec.name).join('、')}`)
    return
  }

  // 调用加入购物车API
  ElMessage.success('已加入购物车')
}

const buyNow = () => {
  // 验证规格选择
  const missingSpecs = product.value.specs.filter(spec => !selectedSpecs[spec.name])
  if (missingSpecs.length > 0) {
    ElMessage.warning(`请选择${missingSpecs.map(spec => spec.name).join('、')}`)
    return
  }

  // 跳转到订单确认页面
  ElMessage.info('跳转到订单确认页面')
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  ElMessage.success(isFavorited.value ? '已收藏' : '已取消收藏')
}

const viewReviewImage = (image) => {
  currentReviewImage.value = image
  showImageDialog.value = true
}

// 初始化默认规格选择
product.value.specs.forEach(spec => {
  const availableOption = spec.options.find(option => option.stock > 0)
  if (availableOption) {
    selectedSpecs[spec.name] = availableOption.name
  }
})
</script>

<style scoped>
.product-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.product-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  margin-bottom: 40px;
}

.product-gallery {
  space-y: 16px;
}

.main-image {
  aspect-ratio: 1;
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
  gap: 8px;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  opacity: 0.6;
  transition: all 0.3s;
}

.thumbnail.active,
.thumbnail:hover {
  opacity: 1;
  border-color: #409eff;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  space-y: 24px;
}

.product-title {
  font-size: 1.8em;
  margin: 0;
  color: #303133;
}

.product-subtitle {
  color: #606266;
  margin: 0;
  font-size: 1.1em;
}

.price-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.current-price {
  font-size: 2em;
  color: #e6a23c;
  font-weight: bold;
}

.original-price {
  font-size: 1.2em;
  color: #909399;
  text-decoration: line-through;
}

.discount-tag {
  font-weight: bold;
}

.rating-section {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-count {
  color: #909399;
  font-size: 14px;
}

.spec-section {
  space-y: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.spec-item h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.spec-options {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.out-of-stock {
  color: #f56c6c;
  font-size: 12px;
}

.quantity-section {
  display: flex;
  align-items: center;
  gap: 16px;
}

.quantity-section h4 {
  margin: 0;
  color: #303133;
}

.stock-info {
  color: #909399;
  font-size: 14px;
}

.action-buttons {
  display: flex;
  gap: 16px;
  align-items: center;
}

.buy-now-btn {
  flex: 1;
}

.action-buttons .el-button:last-child {
  color: #606266;
}

.action-buttons .el-button:last-child.favorited {
  color: #e6a23c;
}

.service-promise {
  display: flex;
  justify-content: space-around;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.service-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
  font-size: 14px;
}

.service-item .el-icon {
  color: #67c23a;
}

/* 标签页样式 */
.product-tabs {
  margin-top: 40px;
}

.detail-content {
  padding: 20px;
  line-height: 1.8;
}

.detail-content img {
  max-width: 100%;
  margin: 16px 0;
  border-radius: 8px;
}

/* 评价区域样式 */
.reviews-section {
  space-y: 30px;
}

.review-overview {
  display: flex;
  gap: 40px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.overview-score {
  text-align: center;
  min-width: 120px;
}

.score-number {
  font-size: 3em;
  color: #e6a23c;
  font-weight: bold;
  line-height: 1;
}

.score-text {
  color: #606266;
  margin: 8px 0;
}

.review-stats {
  flex: 1;
  space-y: 12px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.stat-label {
  width: 60px;
  color: #606266;
}

.stat-count {
  width: 60px;
  text-align: right;
  color: #909399;
  font-size: 14px;
}

.review-list {
  space-y: 24px;
}

.review-item {
  padding: 20px;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-name {
  color: #303133;
  font-weight: 500;
}

.review-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.review-time {
  color: #909399;
  font-size: 14px;
}

.review-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 12px;
}

.review-images {
  display: flex;
  gap: 8px;
}

.review-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  cursor: pointer;
  transition: transform 0.3s;
}

.review-image:hover {
  transform: scale(1.05);
}

.dialog-image {
  width: 100%;
  border-radius: 8px;
}

@media (max-width: 768px) {
  .product-container {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .action-buttons {
    flex-direction: column;
  }
  
  .review-overview {
    flex-direction: column;
    gap: 20px;
  }
}
</style>