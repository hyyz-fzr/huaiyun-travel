<template>
<<<<<<< HEAD
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
=======
  <div class="product-detail">
    <el-row :gutter="30">
      <el-col :xs="24" :md="12">
        <div class="product-images">
          <div class="main-image">
            < img :src="productData.mainImage" :alt="productData.name" />
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
          </div>
          <div class="image-thumbnails">
            <div 
              v-for="(image, index) in productData.images" 
              :key="index"
              class="thumbnail"
              :class="{ active: currentImageIndex === index }"
              @click="currentImageIndex = index"
            >
              < img :src="image" :alt="`${productData.name} ${index + 1}`" />
            </div>
          </div>
        </div>
      </el-col>

      <el-col :xs="24" :md="12">
        <div class="product-info">
          <h1 class="product-name">{{ productData.name }}</h1>
          <p class="product-category">{{ productData.category }}</p >
          
          <div class="product-price">
            <span class="current-price">￥{{ productData.price }}</span>
            <span class="original-price" v-if="productData.originalPrice">
              ￥{{ productData.originalPrice }}
            </span>
            <el-tag type="danger" v-if="productData.discount" class="discount-tag">
              {{ productData.discount }}折
            </el-tag>
          </div>

          <div class="product-meta">
            <div class="meta-item">
              <span class="label">库存:</span>
              <span class="value">{{ productData.stock }}件</span>
            </div>
            <div class="meta-item">
              <span class="label">销量:</span>
              <span class="value">{{ productData.sales }}件</span>
            </div>
            <div class="meta-item">
              <span class="label">评分:</span>
              <span class="value">
                <el-rate v-model="productData.rating" disabled show-score />
              </span>
            </div>
          </div>

          <div class="product-options" v-if="productData.options">
            <div class="option" v-for="option in productData.options" :key="option.name">
              <h4>{{ option.name }}:</h4>
              <div class="option-values">
                <el-radio-group v-model="selectedOptions[option.name]">
                  <el-radio 
                    v-for="value in option.values" 
                    :key="value" 
                    :label="value"
                  >
                    {{ value }}
                  </el-radio>
                </el-radio-group>
              </div>
            </div>
          </div>

          <div class="quantity-selector">
            <span class="label">数量:</span>
            <el-input-number 
              v-model="quantity" 
              :min="1" 
              :max="productData.stock"
              size="large"
            />
          </div>

          <div class="action-buttons">
            <el-button type="primary" size="large" @click="handleAddToCart">
              <i class="el-icon-shopping-cart-2"></i>
              加入购物车
            </el-button>
            <el-button type="danger" size="large" @click="handleBuyNow">
              <i class="el-icon-sell"></i>
              立即购买
            </el-button>
            <el-button size="large" @click="handleAddToFavorites">
              <i class="el-icon-star-off"></i>
              收藏
            </el-button>
          </div>
        </div>
      </el-col>
    </el-row>

    <el-tabs v-model="activeTab" class="product-tabs">
      <el-tab-pane label="商品详情" name="details">
        <div class="tab-content" v-html="productData.details"></div>
      </el-tab-pane>
      <el-tab-pane label="规格参数" name="specs">
        <div class="specs-table">
          <el-table :data="productData.specifications" border>
            <el-table-column prop="name" label="参数名称" width="200"></el-table-column>
            <el-table-column prop="value" label="参数值"></el-table-column>
          </el-table>
        </div>
      </el-tab-pane>
      <el-tab-pane label="用户评价" name="reviews">
        <div class="reviews-section">
          <div class="reviews-summary">
            <div class="rating-overview">
              <div class="average-rating">
                <span class="score">{{ productData.rating }}</span>
                <span class="text">综合评分</span>
              </div>
              <div class="rating-distribution">
                <div class="distribution-item" v-for="i in 5" :key="i">
                  <span class="stars">{{ 6 - i }}星</span>
                  <el-progress 
                    :percentage="(6 - i) * 20" 
                    :show-text="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'

const route = useRoute()
const productId = route.params.id

const currentImageIndex = ref(0)
const quantity = ref(1)
const activeTab = ref('details')
const selectedOptions = reactive({})

const productData = ref({
  id: productId,
  name: '淮南豆腐文化文创礼盒',
  category: '文创产品',
  price: 198,
  originalPrice: 258,
  discount: '7.7',
  stock: 50,
  sales: 123,
  rating: 4.5,
  mainImage: '/images/products/doufu-gift-box.jpg',
  images: [
    '/images/products/doufu-gift-box-1.jpg',
    '/images/products/doufu-gift-box-2.jpg',
    '/images/products/doufu-gift-box-3.jpg'
  ],
  options: [
    {
      name: '规格',
      values: ['标准版', '豪华版', '尊享版']
    },
    {
      name: '包装',
      values: ['普通包装', '礼品包装']
    }
  ],
  details: `
    <h3>产品介绍</h3>
    <p>淮南豆腐文化文创礼盒，融合传统豆腐文化与现代设计理念，打造独具特色的文化创意产品。</p >
    
    <h3>产品特色</h3>
    <ul>
      <li>精选优质材料，工艺精湛</li>
      <li>融合淮南豆腐文化元素</li>
      <li>适合收藏、送礼、展示</li>
      <li>限量发售，具有收藏价值</li>
    </ul>
    
    <h3>包含内容</h3>
    <p>礼盒包含豆腐文化书籍、传统豆腐制作工具模型、文化明信片套装等。</p >
  `,
  specifications: [
    { name: '产品名称', value: '淮南豆腐文化文创礼盒' },
    { name: '产品材质', value: '纸质、木质、金属' },
    { name: '产品尺寸', value: '30×20×10cm' },
    { name: '产品重量', value: '1.5kg' },
    { name: '包装方式', value: '礼盒包装' }
  ]
})

onMounted(() => {
  console.log('产品详情页面加载，ID:', productId)
  // 初始化选项默认值
  if (productData.value.options) {
    productData.value.options.forEach(option => {
      selectedOptions[option.name] = option.values[0]
    })
  }
})

const handleAddToCart = () => {
  ElMessage.success('已加入购物车')
  console.log('加入购物车:', {
    product: productData.value.name,
    quantity: quantity.value,
    options: selectedOptions
  })
}

const handleBuyNow = () => {
  ElMessage.info('立即购买')
}

const handleAddToFavorites = () => {
  ElMessage.success('已添加到收藏')
}
</script>

<style scoped>
.product-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.product-images {
  margin-bottom: 30px;
}

.main-image {
  width: 100%;
  height: 400px;
  background: #f5f7fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
}

.main-image img {
  max-width: 100%;
  max-height: 100%;
}

.image-thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border: 2px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  flex-shrink: 0;
}

.thumbnail.active {
  border-color: #409EFF;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
}

.product-name {
  font-size: 1.8rem;
  margin-bottom: 10px;
  color: #303133;
}

.product-category {
  color: #909399;
  margin-bottom: 20px;
}

.product-price {
  margin-bottom: 20px;
}

.current-price {
  font-size: 2rem;
  color: #F56C6C;
  font-weight: bold;
  margin-right: 10px;
}

.original-price {
  font-size: 1.2rem;
  color: #909399;
  text-decoration: line-through;
  margin-right: 10px;
}

.discount-tag {
  vertical-align: super;
}

.product-meta {
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.meta-item .label {
  color: #909399;
  width: 60px;
}

.meta-item .value {
  color: #303133;
}

.product-options {
  margin-bottom: 20px;
}

.option {
  margin-bottom: 15px;
}

.option h4 {
  margin-bottom: 8px;
  color: #606266;
}

.quantity-selector {
  display: flex;
  align-items: center;
  margin-bottom: 30px;
}

.quantity-selector .label {
  margin-right: 15px;
  color: #606266;
}

.action-buttons {
  display: flex;
  gap: 15px;
}

.action-buttons .el-button {
  flex: 1;
}

.product-tabs {
  margin-top: 40px;
}

.tab-content {
  line-height: 1.6;
}

.tab-content h3 {
  color: #303133;
  margin: 20px 0 10px 0;
}

.tab-content ul {
  padding-left: 20px;
}

.tab-content li {
  margin-bottom: 5px;
}

.specs-table {
  margin-top: 20px;
}

.reviews-summary {
  padding: 20px;
  background: #f5f7fa;
  border-radius: 8px;
}

.rating-overview {
  display: flex;
  align-items: center;
  gap: 40px;
}

.average-rating {
  text-align: center;
}

.average-rating .score {
  font-size: 3rem;
  font-weight: bold;
  color: #F56C6C;
  display: block;
}

.average-rating .text {
  color: #909399;
}

.rating-distribution {
  flex: 1;
}

.distribution-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.distribution-item .stars {
  width: 50px;
  color: #606266;
}

.distribution-item .el-progress {
  flex: 1;
  margin: 0 15px;
}
</style>
