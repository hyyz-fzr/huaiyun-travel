<template>
  <div class="favorite-list">
    <div class="page-header">
      <h2>我的收藏</h2>
      <p>您收藏的文化内容和商品</p >
    </div>

    <el-tabs v-model="activeTab">
      <!-- 收藏的帖子 -->
      <el-tab-pane label="帖子" name="posts">
        <div class="favorite-grid">
          <el-card 
            v-for="item in favoritePosts" 
            :key="item.id"
            class="favorite-item"
          >
            <template #header>
              <div class="item-header">
                <span class="item-title">{{ item.title }}</span>
                <el-button 
                  text 
                  @click="removeFavorite(item.id, 'post')"
                >
                  <el-icon><StarFilled /></el-icon>
                </el-button>
              </div>
            </template>
            <p class="item-desc">{{ item.description }}</p >
            <div class="item-meta">
              <span class="item-author">{{ item.author }}</span>
              <span class="item-date">{{ item.date }}</span>
            </div>
          </el-card>
        </div>
      </el-tab-pane>

      <!-- 收藏的商品 -->
      <el-tab-pane label="商品" name="products">
        <div class="favorite-grid">
          <el-card 
            v-for="item in favoriteProducts" 
            :key="item.id"
            class="favorite-item"
          >
            <div class="product-item">
              <img :src="item.image" :alt="item.name" class="product-image" />
              <div class="product-info">
                <h4>{{ item.name }}</h4>
                <p class="product-desc">{{ item.description }}</p >
                <div class="product-price">¥{{ item.price }}</div>
                <div class="product-actions">
                  <el-button type="primary" size="small">立即购买</el-button>
                  <el-button 
                    text 
                    size="small"
                    @click="removeFavorite(item.id, 'product')"
                  >
                    取消收藏
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { StarFilled } from '@element-plus/icons-vue'

const activeTab = ref('posts')

// 模拟收藏数据
const favoritePosts = ref([
  {
    id: 1,
    title: '淮南豆腐文化的历史渊源',
    description: '深入探讨淮南作为豆腐发源地的文化背景和历史传承...',
    author: '文化学者',
    date: '2024-01-10',
    type: 'post'
  },
  {
    id: 2,
    title: '八公山传说与历史考证',
    description: '八公山的历史故事和相关的考古发现...',
    author: '历史研究员',
    date: '2024-01-08',
    type: 'post'
  }
])

const favoriteProducts = ref([
  {
    id: 101,
    name: '淮南豆腐文化纪念T恤',
    description: '纯棉材质，印有特色文化图案',
    price: 89,
    image: '/src/assets/images/product1.jpg',
    type: 'product'
  }
])

const removeFavorite = (id, type) => {
  if (type === 'post') {
    favoritePosts.value = favoritePosts.value.filter(item => item.id !== id)
  } else {
    favoriteProducts.value = favoriteProducts.value.filter(item => item.id !== id)
  }
  ElMessage.success('已取消收藏')
}
</script>

<style scoped>
.favorite-list {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.favorite-grid {
  display: grid;
  gap: 16px;
}

.favorite-item {
  transition: all 0.3s;
}

.favorite-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.item-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.item-title {
  font-weight: bold;
  color: #303133;
}

.item-desc {
  color: #606266;
  margin-bottom: 12px;
  font-size: 14px;
}

.item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #909399;
}

.product-item {
  display: flex;
  gap: 16px;
}

.product-image {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.product-info {
  flex: 1;
}

.product-info h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.product-desc {
  color: #606266;
  font-size: 14px;
  margin-bottom: 8px;
}

.product-price {
  color: #e6a23c;
  font-weight: bold;
  font-size: 16px;
  margin-bottom: 12px;
}

.product-actions {
  display: flex;
  gap: 8px;
}
</style>