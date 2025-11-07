<template>
  <div class="product-detail">
    <div class="detail-content">
      <div class="product-images">
        <img
          :src="product.image"
          :alt="product.name"
          class="main-image"
        />
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <div class="product-rating">
          <!-- 修复：将 v-model 改为 :value，因为props是只读的 -->
          <el-rate
            :value="product.rating"
            disabled
            show-score
            text-color="#ff9900"
            score-template="{value} 分"
          />
          <span class="review-count">({{ product.reviews }}条评价)</span>
        </div>

        <div class="product-price-section">
          <div class="current-price">¥{{ product.price }}</div>
          <div v-if="product.originalPrice > product.price" class="original-price">
            原价: <span>¥{{ product.originalPrice }}</span>
          </div>
          <div v-if="product.originalPrice > product.price" class="discount">
            节省: ¥{{ (product.originalPrice - product.price).toFixed(2) }}
          </div>
        </div>

        <div class="product-meta">
          <div class="meta-item">
            <span class="label">销量:</span>
            <span class="value">{{ product.sales }}件</span>
          </div>
          <div class="meta-item">
            <span class="label">库存:</span>
            <span class="value">{{ product.stock }}件</span>
          </div>
          <div class="meta-item">
            <span class="label">分类:</span>
            <span class="value">{{ product.category }}</span>
          </div>
        </div>

        <div class="product-tags">
          <el-tag
            v-for="tag in product.tags"
            :key="tag"
            type="info"
            class="tag-item"
          >
            {{ tag }}
          </el-tag>
        </div>

        <div class="quantity-selector">
          <span class="label">数量:</span>
          <el-input-number
            id="productQuantity"
            name="productQuantity"
            v-model="quantity"
            :min="1"
            :max="product.stock"
            size="large"
          />
        </div>

        <div class="product-actions">
          <el-button 
            type="primary" 
            size="large" 
            :icon="ShoppingCart"
            @click="handleAddToCart"
            class="add-to-cart-btn"
          >
            加入购物车
          </el-button>
          <el-button 
            type="success" 
            size="large"
            @click="handleBuyNow"
          >
            立即购买
          </el-button>
        </div>

        <div class="product-description">
          <h3>产品描述</h3>
          <p>{{ product.description }}</p >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import { ShoppingCart } from '@element-plus/icons-vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['add-to-cart', 'close'])

const quantity = ref(1)

const handleAddToCart = () => {
  emit('add-to-cart', props.product, quantity.value)
  ElMessage.success('已添加到购物车')
}

const handleBuyNow = () => {
  // 这里可以跳转到立即购买流程
  ElMessage.success('立即购买功能开发中')
}
</script>

<style scoped>
.product-detail {
  padding: 20px 0;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.product-images {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.main-image {
  width: 100%;
  height: 400px;
  border-radius: 8px;
  overflow: hidden;
  object-fit: cover;
}

.product-info {
  padding: 0 20px;
}

.product-title {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 15px;
  line-height: 1.4;
}

.product-rating {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 20px;
}

.review-count {
  color: #999;
}

.product-price-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
}

.current-price {
  font-size: 2em;
  color: #e6a23c;
  font-weight: bold;
  margin-bottom: 8px;
}

.original-price {
  color: #999;
  text-decoration: line-through;
  margin-bottom: 5px;
}

.discount {
  color: #f56c6c;
  font-weight: bold;
}

.product-meta {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 15px;
  margin-bottom: 20px;
}

.meta-item {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #f0f0f0;
}

.meta-item .label {
  color: #666;
}

.meta-item .value {
  font-weight: 600;
}

.product-tags {
  display: flex;
  gap: 8px;
  margin-bottom: 25px;
  flex-wrap: wrap;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  background: #409eff;
  color: white;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 25px;
  padding: 15px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
}

.quantity-selector .label {
  font-weight: 600;
}

.product-actions {
  display: flex;
  gap: 15px;
  margin-bottom: 25px;
}

.add-to-cart-btn {
  flex: 1;
}

.product-description h3 {
  margin-bottom: 10px;
  color: #333;
}

.product-description p {
  color: #666;
  line-height: 1.6;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .product-info {
    padding: 0;
  }
  
  .product-actions {
    flex-direction: column;
  }
  
  .product-meta {
    grid-template-columns: 1fr;
  }
}
</style>