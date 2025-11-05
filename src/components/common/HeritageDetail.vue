<template>
  <div class="heritage-detail">
    <!-- 顶部横幅 -->
    <div class="heritage-banner">
      <img :src="heritageData.bannerImage" :alt="heritageData.name" class="banner-image" />
      <div class="banner-overlay">
        <h1 class="heritage-title">{{ heritageData.name }}</h1>
        <p class="heritage-subtitle">{{ heritageData.englishName }}</p >
      </div>
    </div>

    <div class="detail-content">
      <!-- 主要内容区域 -->
      <div class="main-content">
        <!-- 基本信息 -->
        <el-card class="info-card">
          <template #header>
            <h3>基本信息</h3>
          </template>
          <div class="basic-info">
            <div class="info-item">
              <span class="label">遗产级别：</span>
              <el-tag :type="getLevelType(heritageData.level)">
                {{ heritageData.level }}
              </el-tag>
            </div>
            <div class="info-item">
              <span class="label">所在地：</span>
              <span>{{ heritageData.location }}</span>
            </div>
            <div class="info-item">
              <span class="label">年代：</span>
              <span>{{ heritageData.era }}</span>
            </div>
            <div class="info-item">
              <span class="label">保护单位：</span>
              <span>{{ heritageData.protectionUnit }}</span>
            </div>
          </div>
        </el-card>

        <!-- 详细介绍 -->
        <el-card class="description-card">
          <template #header>
            <h3>详细介绍</h3>
          </template>
          <div class="description-content">
            <p v-for="(paragraph, index) in heritageData.description" :key="index">
              {{ paragraph }}
            </p >
          </div>
        </el-card>

        <!-- 图片展示 -->
        <el-card class="gallery-card" v-if="heritageData.gallery.length > 0">
          <template #header>
            <h3>图片展示</h3>
          </template>
          <div class="gallery-grid">
            <div 
              v-for="(image, index) in heritageData.gallery" 
              :key="index"
              class="gallery-item"
              @click="openGallery(index)"
            >
              <img :src="image" :alt="`${heritageData.name}图片${index + 1}`" />
            </div>
          </div>
        </el-card>

        <!-- 相关活动 -->
        <el-card class="activities-card" v-if="heritageData.relatedActivities.length > 0">
          <template #header>
            <h3>相关活动</h3>
          </template>
          <div class="activities-list">
            <el-card 
              v-for="activity in heritageData.relatedActivities" 
              :key="activity.id"
              class="activity-item"
            >
              <div class="activity-content">
                <img :src="activity.image" :alt="activity.title" />
                <div class="activity-info">
                  <h4>{{ activity.title }}</h4>
                  <p>{{ activity.description }}</p >
                  <div class="activity-meta">
                    <span class="activity-time">
                      <el-icon><Clock /></el-icon>
                      {{ activity.time }}
                    </span>
                    <el-button type="primary" size="small">立即报名</el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-card>
      </div>

      <!-- 侧边栏 -->
      <div class="sidebar">
        <!-- 导航菜单 -->
        <el-card class="nav-card">
          <div class="nav-links">
            <a 
              v-for="link in navLinks" 
              :key="link.id"
              :href="`#${link.id}`"
              class="nav-link"
            >
              {{ link.title }}
            </a >
          </div>
        </el-card>

        <!-- 地理位置 -->
        <el-card class="location-card">
          <template #header>
            <h4>地理位置</h4>
          </template>
          <div class="location-info">
            <p>{{ heritageData.address }}</p >
            <div class="map-placeholder">
              <el-icon><MapLocation /></el-icon>
              <span>地图展示区域</span>
            </div>
            <el-button type="primary" class="navigation-btn">
              <el-icon><Position /></el-icon>
              开始导航
            </el-button>
          </div>
        </el-card>

        <!-- 参观信息 -->
        <el-card class="visit-info-card">
          <template #header>
            <h4>参观信息</h4>
          </template>
          <div class="visit-info">
            <div class="visit-item">
              <span class="label">开放时间：</span>
              <span>{{ heritageData.openTime }}</span>
            </div>
            <div class="visit-item">
              <span class="label">门票价格：</span>
              <span class="price">{{ heritageData.ticketPrice }}</span>
            </div>
            <div class="visit-item">
              <span class="label">建议游玩：</span>
              <span>{{ heritageData.suggestedDuration }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 图片查看器 -->
    <el-dialog v-model="showGallery" title="图片查看" width="80%">
      <div class="gallery-viewer">
        <img :src="currentGalleryImage" class="viewer-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, computed } from 'vue'
import { Clock, MapLocation, Position } from '@element-plus/icons-vue'

// 模拟文化遗产数据
const heritageData = ref({
  id: 1,
  name: '淮南王宫遗址',
  englishName: 'Huainan King Palace Site',
  bannerImage: '/src/assets/images/heritage-banner.jpg',
  level: '国家级',
  location: '安徽省淮南市八公山区',
  era: '汉代',
  protectionUnit: '淮南市文物局',
  address: '安徽省淮南市八公山区淮南王宫遗址公园',
  openTime: '08:00-17:30',
  ticketPrice: '免费',
  suggestedDuration: '2-3小时',
  description: [
    '淮南王宫遗址是汉代淮南国的重要政治中心，具有极高的历史价值和考古价值。',
    '遗址出土了大量汉代文物，包括陶器、青铜器、玉器等，反映了汉代淮南地区的文化特色和工艺水平。',
    '现遗址公园内保留了部分建筑基址和展示区，是了解汉代历史文化的重要场所。'
  ],
  gallery: [
    '/src/assets/images/heritage1.jpg',
    '/src/assets/images/heritage2.jpg',
    '/src/assets/images/heritage3.jpg'
  ],
  relatedActivities: [
    {
      id: 1,
      title: '汉代文化体验日',
      description: '亲身体验汉代服饰、礼仪和生活方式',
      image: '/src/assets/images/activity1.jpg',
      time: '每周六 14:00-16:00'
    }
  ]
})

// 导航链接
const navLinks = ref([
  { id: 'basic-info', title: '基本信息' },
  { id: 'description', title: '详细介绍' },
  { id: 'gallery', title: '图片展示' },
  { id: 'activities', title: '相关活动' }
])

// 图片查看器
const showGallery = ref(false)
const currentGalleryIndex = ref(0)

const currentGalleryImage = computed(() => 
  heritageData.value.gallery[currentGalleryIndex.value]
)

const openGallery = (index) => {
  currentGalleryIndex.value = index
  showGallery.value = true
}

const getLevelType = (level) => {
  const levelMap = {
    '世界级': 'danger',
    '国家级': 'warning',
    '省级': 'success',
    '市级': 'info'
  }
  return levelMap[level] || 'info'
}
</script>

<style scoped>
.heritage-detail {
  min-height: 100vh;
}

.heritage-banner {
  position: relative;
  height: 400px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.banner-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  padding: 40px;
}

.heritage-title {
  font-size: 2.5em;
  margin: 0 0 8px 0;
  font-weight: bold;
}

.heritage-subtitle {
  font-size: 1.2em;
  margin: 0;
  opacity: 0.9;
}

.detail-content {
  display: grid;
  grid-template-columns: 1fr 300px;
  gap: 24px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 24px;
}

.main-content {
  space-y: 24px;
}

.info-card .basic-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.info-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

.info-item .label {
  color: #606266;
  font-weight: 500;
}

.description-content p {
  line-height: 1.8;
  margin-bottom: 16px;
  text-align: justify;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
}

.gallery-item {
  aspect-ratio: 4/3;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  transition: transform 0.3s;
}

.gallery-item:hover {
  transform: scale(1.05);
}

.gallery-item img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.activities-list {
  space-y: 16px;
}

.activity-item .activity-content {
  display: flex;
  gap: 16px;
}

.activity-content img {
  width: 120px;
  height: 90px;
  border-radius: 8px;
  object-fit: cover;
  flex-shrink: 0;
}

.activity-info {
  flex: 1;
}

.activity-info h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.activity-info p {
  color: #606266;
  margin-bottom: 12px;
  font-size: 14px;
}

.activity-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.activity-time {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #909399;
  font-size: 14px;
}

/* 侧边栏样式 */
.sidebar {
  space-y: 24px;
}

.nav-links {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-link {
  padding: 12px 16px;
  color: #606266;
  text-decoration: none;
  border-radius: 6px;
  transition: all 0.3s;
}

.nav-link:hover {
  background: #f5f7fa;
  color: #409eff;
}

.location-info {
  space-y: 16px;
}

.map-placeholder {
  height: 200px;
  background: #f5f7fa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: #909399;
  gap: 8px;
}

.navigation-btn {
  width: 100%;
}

.visit-info {
  space-y: 12px;
}

.visit-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.visit-item .label {
  color: #606266;
}

.visit-item .price {
  color: #e6a23c;
  font-weight: bold;
}

.gallery-viewer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.viewer-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

@media (max-width: 768px) {
  .detail-content {
    grid-template-columns: 1fr;
  }
  
  .info-card .basic-info {
    grid-template-columns: 1fr;
  }
}
</style>