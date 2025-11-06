<template>
  <div class="home-container">
    <!-- 页面头部 -->
    <div class="home-header">
      <h1 class="welcome-title">欢迎来到淮韵游踪</h1>
      <p class="welcome-subtitle">探索淮南文化，传承千年智慧</p >
    </div>

    <!-- 数据统计卡片 -->
    <div class="stats-cards">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6" v-for="card in statsCards" :key="card.id">
          <el-card shadow="hover" class="stat-card">
            <div class="card-content">
              <div class="card-icon" :style="{ color: card.color }">
                <i :class="card.icon"></i>
              </div>
              <div class="card-info">
                <div class="card-value">{{ card.value }}</div>
                <div class="card-label">{{ card.label }}</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 功能导航 -->
    <div class="feature-nav">
      <h2 class="section-title">文化探索</h2>
      <el-row :gutter="20">
        <el-col 
          :xs="12" 
          :sm="8" 
          :md="6" 
          v-for="feature in features" 
          :key="feature.id"
        >
          <div class="feature-card" @click="navigateTo(feature.path)">
            <div class="feature-icon" :style="{ backgroundColor: feature.bgColor }">
              <i :class="feature.icon"></i>
            </div>
            <div class="feature-info">
              <h3>{{ feature.title }}</h3>
              <p>{{ feature.description }}</p >
            </div>
          </div>
        </el-col>
      </el-row>
    </div>

    <!-- 最新内容 -->
    <div class="latest-content">
      <h2 class="section-title">最新动态</h2>
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :md="8" v-for="item in latestItems" :key="item.id">
          <el-card class="content-card" shadow="hover">
            <div class="content-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="content-info">
              <h3>{{ item.title }}</h3>
              <p class="content-desc">{{ item.description }}</p >
              <div class="content-meta">
                <span class="meta-item">
                  <i class="el-icon-time"></i>
                  {{ item.time }}
                </span>
                <span class="meta-item">
                  <i class="el-icon-view"></i>
                  {{ item.views }}
                </span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const router = useRouter()

// 统计卡片数据
const statsCards = ref([
  {
    id: 1,
    icon: 'el-icon-collection',
    label: '文化遗产',
    value: '128',
    color: '#409EFF'
  },
  {
    id: 2,
    icon: 'el-icon-goods',
    label: '文创产品',
    value: '56',
    color: '#67C23A'
  },
  {
    id: 3,
    icon: 'el-icon-document',
    label: '文化帖子',
    value: '342',
    color: '#E6A23C'
  },
  {
    id: 4,
    icon: 'el-icon-user',
    label: '活跃用户',
    value: '1,234',
    color: '#F56C6C'
  }
])

// 功能导航数据
const features = ref([
  {
    id: 1,
    icon: 'el-icon-collection',
    title: '文化遗产',
    description: '探索淮南丰富的历史文化遗产',
    path: '/heritage',
    bgColor: '#409EFF'
  },
  {
    id: 2,
    icon: 'el-icon-goods',
    title: '文创产品',
    description: '购买精美的淮南文化创意产品',
    path: '/products',
    bgColor: '#67C23A'
  },
  {
    id: 3,
    icon: 'el-icon-chat-dot-round',
    title: '文化社区',
    description: '分享交流淮南文化见闻',
    path: '/community',
    bgColor: '#E6A23C'
  },
  {
    id: 4,
    icon: 'el-icon-video-camera',
    title: 'VR体验',
    description: '沉浸式体验淮南文化场景',
    path: '/vr-experience',
    bgColor: '#F56C6C'
  },
  {
    id: 5,
    icon: 'el-icon-notebook-2',
    title: '学习资料',
    description: '学习淮南文化知识',
    path: '/learning',
    bgColor: '#909399'
  },
  {
    id: 6,
    icon: 'el-icon-map-location',
    title: '文化地图',
    description: '发现身边的淮南文化地点',
    path: '/culture-map',
    bgColor: '#8E44AD'
  }
])

// 最新内容数据
const latestItems = ref([
  {
    id: 1,
    title: '八公山历史文化探秘',
    description: '深入探索八公山的历史文化和传说故事...',
    image: '/images/heritage/bagongshan.jpg',
    time: '2小时前',
    views: '156'
  },
  {
    id: 2,
    title: '豆腐制作工艺传承',
    description: '了解淮南豆腐的传统制作工艺和现代创新...',
    image: '/images/heritage/doufu.jpg',
    time: '5小时前',
    views: '234'
  },
  {
    id: 3,
    title: '传统剪纸艺术展',
    description: '欣赏精美的淮南传统剪纸艺术作品...',
    image: '/images/heritage/papercut.jpg',
    time: '1天前',
    views: '189'
  }
])

// 导航方法
const navigateTo = (path) => {
  router.push(path)
}

// 页面加载完成
onMounted(() => {
  console.log('🏠 首页加载完成')
})
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

/* 头部样式 */
.home-header {
  text-align: center;
  margin-bottom: 40px;
  padding: 40px 0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 12px;
  color: white;
}

.welcome-title {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 10px;
}

.welcome-subtitle {
  font-size: 1.2rem;
  opacity: 0.9;
}

/* 统计卡片样式 */
.stats-cards {
  margin-bottom: 40px;
}

.stat-card {
  border-radius: 8px;
  border: none;
}

.card-content {
  display: flex;
  align-items: center;
  padding: 10px;
}

.card-icon {
  font-size: 2rem;
  margin-right: 15px;
}

.card-info {
  flex: 1;
}

.card-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #303133;
}

.card-label {
  font-size: 0.9rem;
  color: #909399;
  margin-top: 5px;
}

/* 功能导航样式 */
.feature-nav {
  margin-bottom: 40px;
}

.section-title {
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #303133;
  border-left: 4px solid #409EFF;
  padding-left: 12px;
}

.feature-card {
  background: white;
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #e4e7ed;
}

.feature-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
}

.feature-icon {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 15px;
  color: white;
  font-size: 1.5rem;
}

.feature-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #303133;
}

.feature-info p {
  font-size: 0.9rem;
  color: #606266;
  line-height: 1.4;
}

/* 最新内容样式 */
.content-card {
  border-radius: 8px;
  border: none;
  margin-bottom: 20px;
  transition: all 0.3s ease;
}

.content-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
}

.content-image {
  width: 100%;
  height: 160px;
  overflow: hidden;
  border-radius: 6px 6px 0 0;
}

.content-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.content-info {
  padding: 15px;
}

.content-info h3 {
  font-size: 1.1rem;
  font-weight: 600;
  margin-bottom: 8px;
  color: #303133;
}

.content-desc {
  font-size: 0.9rem;
  color: #606266;
  line-height: 1.4;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.content-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.8rem;
  color: #909399;
}

.meta-item {
  display: flex;
  align-items: center;
}

.meta-item i {
  margin-right: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .home-container {
    padding: 10px;
  }
  
  .welcome-title {
    font-size: 2rem;
  }
  
  .home-header {
    padding: 30px 0;
    margin-bottom: 20px;
  }
  
  .feature-card {
    padding: 15px;
  }
}
</style>