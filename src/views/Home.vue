<template>
  <div class="home">
    <!-- 轮播图 -->
    <el-carousel height="400px" :interval="5000" arrow="always">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <div class="banner-item" :style="{ backgroundImage: `url(${item.image})` }">
          <div class="banner-content">
            <h2 class="banner-title">{{ item.title }}</h2>
            <p class="banner-desc">{{ item.description }}</p >
            <el-button type="primary" size="large" @click="handleBannerClick(item)">
              了解更多
            </el-button>
          </div>
        </div>
      </el-carousel-item>
    </el-carousel>

    <!-- 特色模块 -->
    <div class="feature-section">
      <div class="container">
        <h2 class="section-title">淮南文化特色</h2>
        <div class="feature-grid">
          <div 
            v-for="feature in features" 
            :key="feature.id"
            class="feature-card"
            @click="$router.push(feature.path)"
          >
            <div class="feature-icon">
              <el-icon :size="48" :color="feature.color">
                <component :is="feature.icon" />
              </el-icon>
            </div>
            <h3 class="feature-title">{{ feature.title }}</h3>
            <p class="feature-desc">{{ feature.description }}</p >
          </div>
        </div>
      </div>
    </div>

    <!-- 文化遗产推荐 -->
    <div class="recommend-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">推荐文化遗产</h2>
          <el-button link @click="$router.push('/heritage/list')">
            查看更多 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
        <div class="heritage-grid">
          <el-card 
            v-for="item in recommendedHeritage" 
            :key="item.id"
            class="heritage-card"
            :body-style="{ padding: '0' }"
            @click="$router.push(`/heritage/detail/${item.id}`)"
          >
            <div class="heritage-image">
              <img :src="item.image" :alt="item.name" />
              <div class="heritage-tag">{{ item.category }}</div>
            </div>
            <div class="heritage-content">
              <h3 class="heritage-name">{{ item.name }}</h3>
              <p class="heritage-desc">{{ item.description }}</p >
              <div class="heritage-meta">
                <span class="views">
                  <el-icon><View /></el-icon>
                  {{ item.views }}
                </span>
                <span class="likes">
                  <el-icon><Star /></el-icon>
                  {{ item.likes }}
                </span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 热门产品 -->
    <div class="product-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">热门文创产品</h2>
          <el-button link @click="$router.push('/products/list')">
            查看更多 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
        <div class="product-grid">
          <el-card 
            v-for="product in hotProducts" 
            :key="product.id"
            class="product-card"
            :body-style="{ padding: '0' }"
            @click="$router.push(`/products/detail/${product.id}`)"
          >
            <div class="product-image">
              <img :src="product.image" :alt="product.name" />
              <el-tag v-if="product.stock < 10" type="danger" class="stock-tag">
                仅剩{{ product.stock }}件
              </el-tag>
            </div>
            <div class="product-content">
              <h3 class="product-name">{{ product.name }}</h3>
              <p class="product-desc">{{ product.description }}</p >
              <div class="product-footer">
                <span class="product-price">¥{{ product.price }}</span>
                <el-button 
                  type="primary" 
                  size="small" 
                  @click.stop="handleAddToCart(product)"
                >
                  加入购物车
                </el-button>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 社区动态 -->
    <div class="community-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">社区动态</h2>
          <el-button link @click="$router.push('/posts/list')">
            查看更多 <el-icon><ArrowRight /></el-icon>
          </el-button>
        </div>
        <div class="post-list">
          <el-card 
            v-for="post in hotPosts" 
            :key="post.id"
            class="post-card"
          >
            <template #header>
              <div class="post-header">
                <div class="user-info">
                  <el-avatar :size="32" :src="post.author.avatar" />
                  <div class="user-details">
                    <span class="username">{{ post.author.username }}</span>
                    <span class="post-time">{{ post.createTime }}</span>
                  </div>
                </div>
                <el-tag :type="post.tagType">{{ post.tag }}</el-tag>
              </div>
            </template>
            <h3 class="post-title" @click="$router.push(`/posts/detail/${post.id}`)">
              {{ post.title }}
            </h3>
            <p class="post-content">{{ post.content }}</p >
            <div class="post-images" v-if="post.images && post.images.length">
              <img 
                v-for="(img, index) in post.images.slice(0, 3)" 
                :key="index"
                :src="img" 
                class="post-image"
                @click="previewImage(post.images, index)"
              />
            </div>
            <div class="post-actions">
              <span class="action-item">
                <el-icon><View /></el-icon>
                {{ post.views }}
              </span>
              <span class="action-item">
                <el-icon><ChatDotRound /></el-icon>
                {{ post.comments }}
              </span>
              <span class="action-item">
                <el-icon><Star /></el-icon>
                {{ post.likes }}
              </span>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="imagePreviewVisible" title="图片预览" width="80%">
      <el-carousel :initial-index="previewIndex" height="500px">
        <el-carousel-item v-for="(img, index) in previewImages" :key="index">
          <img :src="img" class="preview-image" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHeritageStore } from '@/stores/heritage'
import { useProductStore } from '@/stores/product'
import { usePostStore } from '@/stores/post'
import { useCartStore } from '@/stores/cart'
import { ElMessage } from 'element-plus'
import {
  View,
  Star,
  ChatDotRound,
  ArrowRight
} from '@element-plus/icons-vue'

const router = useRouter()
const heritageStore = useHeritageStore()
const productStore = useProductStore()
const postStore = usePostStore()
const cartStore = useCartStore()

const banners = ref([
  {
    id: 1,
    image: '/images/banners/huainan-banner1.jpg',
    title: '探索淮南千年文化',
    description: '豆腐文化发源地，八公山传说之乡',
    path: '/heritage/list'
  },
  {
    id: 2,
    image: '/images/banners/huainan-banner2.jpg',
    title: '特色文创产品',
    description: '把淮南文化带回家',
    path: '/products/list'
  },
  {
    id: 3,
    image: '/images/banners/huainan-banner3.jpg',
    title: '文化社区交流',
    description: '与同好分享文化见解',
    path: '/posts/list'
  }
])

const features = ref([
  {
    id: 1,
    icon: Histogram,
    title: '文化遗产',
    description: '探索淮南丰富的文化遗产和历史故事',
    path: '/heritage/list',
    color: '#409eff'
  },
  {
    id: 2,
    icon: ShoppingBag,
    title: '文创产品',
    description: '购买独具特色的淮南文创纪念品',
    path: '/products/list',
    color: '#67c23a'
  },
  {
    id: 3,
    icon: ChatDotRound,
    title: '文化社区',
    description: '与志同道合的朋友交流文化见解',
    path: '/posts/list',
    color: '#e6a23c'
  },
  {
    id: 4,
    icon: User,
    title: '个人空间',
    description: '管理您的收藏、订单和个性化内容',
    path: '/profile',
    color: '#f56c6c'
  }
])

const recommendedHeritage = ref([])
const hotProducts = ref([])
const hotPosts = ref([])
const imagePreviewVisible = ref(false)
const previewImages = ref([])
const previewIndex = ref(0)

onMounted(async () => {
  await loadHomeData()
})

const loadHomeData = async () => {
  try {
    // 加载推荐文化遗产
    const heritageData = await heritageStore.getRecommendedHeritage()
    recommendedHeritage.value = heritageData.slice(0, 4)
    
    // 加载热门产品
    await productStore.getProducts({ sort: 'hot', pageSize: 4 })
    hotProducts.value = productStore.products.slice(0, 4)
    
    // 加载热门帖子
    await postStore.getPosts({ sort: 'hot', pageSize: 3 })
    hotPosts.value = postStore.posts.slice(0, 3)
  } catch (error) {
    ElMessage.error('加载首页数据失败')
  }
}

const handleBannerClick = (banner) => {
  router.push(banner.path)
}

const handleAddToCart = (product) => {
  cartStore.addToCart(product)
}

const previewImage = (images, index) => {
  previewImages.value = images
  previewIndex.value = index
  imagePreviewVisible.value = true
}
</script>

<style scoped lang="scss">
.home {
  min-height: 100vh;
}

.banner-item {
  height: 400px;
  background-size: cover;
  background-position: center;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
  }
}

.banner-content {
  position: relative;
  z-index: 1;
  text-align: center;
  color: white;
  max-width: 600px;
  padding: 0 20px;
}

.banner-title {
  font-size: 2.5em;
  font-weight: bold;
  margin-bottom: 16px;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
}

.banner-desc {
  font-size: 1.2em;
  margin-bottom: 24px;
  opacity: 0.9;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.section-title {
  font-size: 2em;
  font-weight: bold;
  color: #303133;
  margin-bottom: 30px;
  text-align: center;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.feature-section {
  padding: 60px 0;
  background: white;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 30px;
}

.feature-card {
  text-align: center;
  padding: 40px 20px;
  border-radius: 12px;
  background: #f8f9fa;
  transition: all 0.3s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
    background: white;
  }
}

.feature-icon {
  margin-bottom: 20px;
}

.feature-title {
  font-size: 1.5em;
  font-weight: bold;
  margin-bottom: 12px;
  color: #303133;
}

.feature-desc {
  color: #606266;
  line-height: 1.6;
}

.recommend-section {
  padding: 60px 0;
  background: #f5f7fa;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}

.heritage-card {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.heritage-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .heritage-tag {
    position: absolute;
    top: 12px;
    right: 12px;
    background: rgba(255, 255, 255, 0.9);
    padding: 4px 8px;
    border-radius: 4px;
    font-size: 12px;
  }

  &:hover img {
    transform: scale(1.05);
  }
}

.heritage-content {
  padding: 16px;
}

.heritage-name {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
  color: #303133;
}

.heritage-desc {
  color: #606266;
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.heritage-meta {
  display: flex;
  gap: 16px;
  color: #909399;
  font-size: 0.8em;

  span {
    display: flex;
    align-items: center;
    gap: 4px;
  }
}

.product-section {
  padding: 60px 0;
  background: white;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 24px;
}

.product-card {
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-4px);
  }
}

.product-image {
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .stock-tag {
    position: absolute;
    top: 8px;
    right: 8px;
  }
}

.product-content {
  padding: 16px;
}

.product-name {
  font-size: 1.1em;
  font-weight: bold;
  margin-bottom: 8px;
  color: #303133;
}

.product-desc {
  color: #606266;
  font-size: 0.9em;
  line-height: 1.5;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.product-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.product-price {
  font-size: 1.2em;
  font-weight: bold;
  color: #f56c6c;
}

.community-section {
  padding: 60px 0;
  background: #f5f7fa;
}

.post-list {
  display: grid;
  gap: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.post-card {
  transition: transform 0.3s ease;

  &:hover {
    transform: translateX(4px);
  }
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-details {
  display: flex;
  flex-direction: column;
}

.username {
  font-weight: bold;
  color: #303133;
}

.post-time {
  font-size: 0.8em;
  color: #909399;
}

.post-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 12px;
  color: #303133;
  cursor: pointer;

  &:hover {
    color: #409eff;
  }
}

.post-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
  gap: 8px;
  margin-bottom: 16px;
}

.post-image {
  width: 100%;
  height: 100px;
  object-fit: cover;
  border-radius: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
}

.post-actions {
  display: flex;
  gap: 20px;
  color: #909399;
  font-size: 0.9em;
}

.action-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

.preview-image {
  width: 100%;
  height: 500px;
  object-fit: contain;
}

// 响应式设计
@media (max-width: 768px) {
  .banner-title {
    font-size: 2em;
  }

  .section-header {
    flex-direction: column;
    gap: 16px;
    text-align: center;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .heritage-grid,
  .product-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  }

  .post-images {
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>