<template>
  <div class="product-list">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1>特色文创</h1>
          <p>发现淮南文化特色的精美商品</p >
        </div>
        <el-button type="primary" @click="$router.push('/product/upload')">
          <el-icon><Plus /></el-icon>
          上传商品
        </el-button>
      </div>
    </div>

    <div class="product-content">
      <div class="filter-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索商品..."
          prefix-icon="Search"
          style="width: 300px"
        />
        <el-select v-model="filterCategory" placeholder="分类筛选">
          <el-option label="全部" value="" />
          <el-option label="服饰" value="服饰" />
          <el-option label="文具" value="文具" />
          <el-option label="工艺品" value="工艺品" />
          <el-option label="食品" value="食品" />
        </el-select>
        <el-select v-model="sortBy" placeholder="排序方式">
          <el-option label="最新发布" value="newest" />
          <el-option label="价格从低到高" value="price_asc" />
          <el-option label="价格从高到低" value="price_desc" />
        </el-select>
      </div>

      <div v-if="productStore.loading" class="loading-state">
        <el-skeleton :rows="6" animated />
      </div>

      <div v-else class="products-grid">
        <el-card 
          v-for="product in filteredProducts" 
          :key="product.id"
          class="product-card"
        >
          <div class="product-image" @click="viewProductDetail(product.id)">
            <img 
              v-if="product.images && product.images.length > 0" 
              :src="product.images[0]" 
              :alt="product.name"
            />
          <div v-if="product.image">
             <img :src="product.image" :alt="product.name">
            </div>
            <div v-else class="no-image">
              <el-icon><Picture /></el-icon>
              <span>暂无图片</span>
            </div>
          </div>
          
          <div class="product-info">
            <h3 class="product-name" @click="viewProductDetail(product.id)">{{ product.name }}</h3>
            <p class="product-desc">{{ product.description }}</p >
            
            <div class="product-price">
              <span class="current-price">¥{{ product.price }}</span>
              <span v-if="product.originalPrice" class="original-price">
                ¥{{ product.originalPrice }}
              </span>
            </div>

            <div class="product-meta">
              <span class="stock">库存: {{ product.stock }}</span>
              <el-tag v-if="product.tags" size="small">{{ product.tags.split(',')[0] }}</el-tag>
            </div>

            <div class="product-actions">
              <el-button type="primary" size="small" @click="addToCart(product)">
                <el-icon><ShoppingCart /></el-icon>
                加入购物车
              </el-button>
              <el-button size="small" @click="viewProductDetail(product.id)">
                查看详情
              </el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="!productStore.loading && filteredProducts.length === 0" class="empty-state">
        <el-empty description="暂无商品数据">
          <el-button type="primary" @click="$router.push('/product/upload')">
            上传第一个商品
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '@/stores/product'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import { Plus, Search, Picture, ShoppingCart } from '@element-plus/icons-vue'

const router = useRouter()
const productStore = useProductStore()
const cartStore = useCartStore()

const searchKeyword = ref('')
const filterCategory = ref('')
const sortBy = ref('newest')

const filteredProducts = computed(() => {
  let filtered = productStore.productList

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(product => 
      product.name.toLowerCase().includes(keyword) || 
      product.description.toLowerCase().includes(keyword) ||
      (product.tags && product.tags.toLowerCase().includes(keyword))
    )
  }

  if (filterCategory.value) {
    filtered = filtered.filter(product => product.category === filterCategory.value)
  }

  // 排序
  if (sortBy.value === 'price_asc') {
    filtered = [...filtered].sort((a, b) => a.price - b.price)
  } else if (sortBy.value === 'price_desc') {
    filtered = [...filtered].sort((a, b) => b.price - a.price)
  } else {
    filtered = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  }

  return filtered
})

const viewProductDetail = (id) => {
  router.push(`/product/${id}`)
}

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  productStore.fetchProductList()
})
</script>

<style scoped>
.product-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content h1 {
  color: #333;
  margin-bottom: 8px;
}

.header-content p {
  color: #666;
  margin: 0;
}

.filter-bar {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.product-content {
  min-height: 500px;
}

.loading-state {
  padding: 40px;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
}

.product-card {
  transition: all 0.3s;
  overflow: hidden;
}

.product-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.product-image {
  height: 200px;
  overflow: hidden;
  background: #f5f7fa;
  cursor: pointer;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.product-card:hover .product-image img {
  transform: scale(1.05);
}

.no-image {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #909399;
}

.no-image .el-icon {
  font-size: 48px;
  margin-bottom: 8px;
}

.product-info {
  padding: 16px;
}

.product-name {
  margin: 0 0 8px 0;
  color: #303133;
  cursor: pointer;
  transition: color 0.3s;
}

.product-name:hover {
  color: #409eff;
}

.product-desc {
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-price {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 12px;
}

.current-price {
  font-size: 1.2em;
  color: #e6a23c;
  font-weight: bold;
}

.original-price {
  font-size: 0.9em;
  color: #909399;
  text-decoration: line-through;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.stock {
  color: #909399;
  font-size: 14px;
}

.product-actions {
  display: flex;
  gap: 8px;
}

.product-actions .el-button {
  flex: 1;
}

.empty-state {
  padding: 80px 20px;
  text-align: center;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 16px;
  }
  
  .filter-bar {
    flex-direction: column;
  }
  
  .products-grid {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }
  
  .product-actions {
    flex-direction: column;
  }
}
</style>