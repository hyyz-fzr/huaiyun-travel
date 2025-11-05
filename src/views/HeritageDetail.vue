<template>
  <div class="heritage-detail">
    <div v-if="heritageStore.loading" class="loading-state">
      <el-skeleton :rows="10" animated />
    </div>

    <div v-else-if="heritageStore.currentHeritage" class="detail-content">
      <div class="heritage-banner">
        <img 
          v-if="heritageStore.currentHeritage.images && heritageStore.currentHeritage.images.length > 0"
          :src="heritageStore.currentHeritage.images[0]" 
          :alt="heritageStore.currentHeritage.name" 
          class="banner-image"
        />
        <div v-else class="banner-placeholder">
          <el-icon><Picture /></el-icon>
          <p>暂无图片</p >
        </div>
        <div class="banner-overlay">
          <h1 class="heritage-title">{{ heritageStore.currentHeritage.name }}</h1>
          <p class="heritage-subtitle">{{ heritageStore.currentHeritage.englishName }}</p >
        </div>
      </div>

      <div class="detail-container">
        <div class="main-content">
          <el-card class="info-card">
            <template #header>
              <h3>基本信息</h3>
            </template>
            <div class="basic-info">
              <div class="info-item">
                <span class="label">遗产级别：</span>
                <el-tag :type="getLevelType(heritageStore.currentHeritage.level)">
                  {{ heritageStore.currentHeritage.level }}
                </el-tag>
              </div>
              <div class="info-item">
                <span class="label">所在地：</span>
                <span>{{ heritageStore.currentHeritage.location }}</span>
              </div>
              <div class="info-item">
                <span class="label">开放时间：</span>
                <span>{{ heritageStore.currentHeritage.openTime || '未知' }}</span>
              </div>
              <div class="info-item">
                <span class="label">门票信息：</span>
                <span>{{ heritageStore.currentHeritage.ticketPrice || '免费' }}</span>
              </div>
            </div>
          </el-card>

          <el-card class="description-card">
            <template #header>
              <h3>详细介绍</h3>
            </template>
            <div class="description-content">
              <p>{{ heritageStore.currentHeritage.content }}</p >
            </div>
          </el-card>

          <el-card class="gallery-card" v-if="heritageStore.currentHeritage.images && heritageStore.currentHeritage.images.length > 0">
            <template #header>
              <h3>图片展示</h3>
            </template>
            <div class="gallery-grid">
              <div 
                v-for="(image, index) in heritageStore.currentHeritage.images" 
                :key="index"
                class="gallery-item"
                @click="openGallery(index)"
              >
                <img :src="image" :alt="`${heritageStore.currentHeritage.name}图片${index + 1}`" />
              </div>
            </div>
          </el-card>
        </div>

        <div class="sidebar">
          <el-card class="action-card">
            <div class="action-buttons">
              <el-button type="primary" class="nav-btn" @click="handleNavigation">
                <el-icon><Position /></el-icon>
                开始导航
              </el-button>
              <el-button class="nav-btn" @click="handleShare">
                <el-icon><Share /></el-icon>
                分享
              </el-button>
              <el-button class="nav-btn" :class="{ 'favorited': isFavorited }" @click="toggleFavorite">
                <el-icon><Star /></el-icon>
                {{ isFavorited ? '已收藏' : '收藏' }}
              </el-button>
            </div>
          </el-card>

          <el-card class="location-card">
            <template #header>
              <h4>位置信息</h4>
            </template>
            <div class="location-info">
              <p>{{ heritageStore.currentHeritage.location }}</p >
              <div class="map-placeholder">
                <el-icon><MapLocation /></el-icon>
                <span>地图展示区域</span>
              </div>
            </div>
          </el-card>
        </div>
      </div>
    </div>

    <div v-else class="empty-state">
      <el-empty description="文化遗产不存在">
        <el-button type="primary" @click="$router.push('/heritage')">
          返回列表
        </el-button>
      </el-empty>
    </div>

    <el-dialog v-model="showGallery" title="图片查看" width="80%" top="5vh">
      <div class="gallery-viewer">
        <img :src="currentGalleryImage" class="viewer-image" />
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useHeritageStore } from '@/stores/heritage'
import { ElMessage } from 'element-plus'
import { 
  Picture, 
  Position, 
  Share, 
  Star, 
  MapLocation 
} from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()
const heritageStore = useHeritageStore()

const showGallery = ref(false)
const currentGalleryIndex = ref(0)
const isFavorited = ref(false)

const currentGalleryImage = computed(() => {
  if (heritageStore.currentHeritage && heritageStore.currentHeritage.images) {
    return heritageStore.currentHeritage.images[currentGalleryIndex.value]
  }
  return ''
})

const getLevelType = (level) => {
  const levelMap = {
    '世界级': 'danger',
    '国家级': 'warning',
    '省级': 'success',
    '市级': 'info'
  }
  return levelMap[level] || 'info'
}

const openGallery = (index) => {
  currentGalleryIndex.value = index
  showGallery.value = true
}

const handleNavigation = () => {
  ElMessage.info('跳转到导航应用')
}

const handleShare = () => {
  ElMessage.success('分享链接已复制到剪贴板')
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  ElMessage.success(isFavorited.value ? '已收藏' : '已取消收藏')
}

onMounted(() => {
  const heritageId = route.params.id
  if (heritageId) {
    heritageStore.fetchHeritageDetail(heritageId)
  }
})
</script>

<style scoped>
.heritage-detail {
  min-height: 100vh;
}

.loading-state {
  padding: 40px;
  max-width: 1200px;
  margin: 0 auto;
}

.detail-content {
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

.banner-placeholder {
  width: 100%;
  height: 100%;
  background: #f5f7fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #909399;
}

.banner-placeholder .el-icon {
  font-size: 64px;
  margin-bottom: 16px;
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

.detail-container {
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
  text-align: justify;
  white-space: pre-line;
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

.sidebar {
  space-y: 24px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.nav-btn {
  width: 100%;
}

.nav-btn.favorited {
  color: #e6a23c;
  border-color: #e6a23c;
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

.empty-state {
  padding: 80px 20px;
  text-align: center;
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
  .detail-container {
    grid-template-columns: 1fr;
  }
  
  .info-card .basic-info {
    grid-template-columns: 1fr;
  }
  
  .heritage-banner {
    height: 300px;
  }
  
  .heritage-title {
    font-size: 2em;
  }
}
</style>