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
        <el-col :xs="12" :sm="8" :md="6" v-for="feature in features" :key="feature.id">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

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
    path: '/heritage/list',
    bgColor: '#409EFF'
  },
  {
    id: 2,
    icon: 'el-icon-goods',
    title: '文创产品',
    description: '购买精美的淮南文化创意产品',
    path: '/products/list',
    bgColor: '#67C23A'
  },
  {
    id: 3,
    icon: 'el-icon-chat-dot-round',
    title: '文化社区',
    description: '分享交流淮南文化见闻',
    path: '/posts/list',
    bgColor: '#E6A23C'
  },
  {
    id: 4,
    icon: 'el-icon-video-camera',
    title: 'VR体验',
    description: '沉浸式体验淮南文化场景',
    path: '/vr-view',
    bgColor: '#F56C6C'
  }
])

// 导航方法
const navigateTo = (path) => {
  router.push(path)
}
</script>

<style scoped>
.home-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

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

.stats-cards {
  margin-bottom: 40px;
}

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
</style>