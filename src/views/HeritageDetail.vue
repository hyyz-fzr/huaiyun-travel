<template>
  <div class="heritage-detail">
    <div class="detail-header">
      <h1>{{ heritageData.name }}</h1>
      <p class="heritage-meta">
        <span class="type">{{ heritageData.type }}</span>
        <span class="location">{{ heritageData.location }}</span>
        <span class="status">{{ heritageData.status }}</span>
      </p >
    </div>

<<<<<<< HEAD
    <div v-else-if="heritageStore.currentHeritage" class="detail-content">
      <div class="heritage-banner">
        < img 
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
                <span class="label">遗产级别</span>
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
=======
    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <el-card class="detail-content">
          <template #header>
            <h3>详细介绍</h3>
          </template>
          <div class="content-text">
            <p>{{ heritageData.description }}</p >
            <p>八公山位于中国安徽省淮南市，是一座具有悠久历史和丰富文化内涵的名山。这里不仅是著名的"淝水之战"古战场，还是豆腐文化的发源地。</p >
            <p>八公山地区保存了大量的历史遗迹和文化传统，包括古战场遗址、寺庙建筑、传统民俗等，是研究中国古代军事史和文化史的重要场所。</p >
          </div>
        </el-card>

        <el-card class="images-section">
          <template #header>
            <h3>相关图片</h3>
          </template>
          <div class="images-grid">
            <div class="image-item" v-for="i in 4" :key="i">
              <div class="image-placeholder">
                <i class="el-icon-picture"></i>
                <span>图片 {{ i }}</span>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

<<<<<<< HEAD
          <el-card class="description-card">
            <template #header>
              <h3>详细描述</h3>
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
                < img :src="image" :alt="`${heritageStore.currentHeritage.name}图片${index + 1}`" />
              </div>
=======
      <el-col :xs="24" :lg="8">
        <el-card class="sidebar-info">
          <template #header>
            <h3>基本信息</h3>
          </template>
          <div class="info-list">
            <div class="info-item">
              <span class="label">文化遗产类型:</span>
              <span class="value">{{ heritageData.type }}</span>
            </div>
            <div class="info-item">
              <span class="label">所在地区:</span>
              <span class="value">{{ heritageData.location }}</span>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
            </div>
            <div class="info-item">
              <span class="label">保护级别:</span>
              <span class="value">国家级</span>
            </div>
            <div class="info-item">
              <span class="label">创建时间:</span>
              <span class="value">2024-01-01</span>
            </div>
            <div class="info-item">
              <span class="label">最后更新:</span>
              <span class="value">2024-01-15</span>
            </div>
          </div>
        </el-card>

<<<<<<< HEAD
    <div v-else class="empty-state">
      <el-empty description="文化遗产不存在">
        <el-button type="primary" @click="$router.push('/heritage')">
          返回列表
        </el-button>
      </el-empty>
    </div>

    <el-dialog v-model="showGallery" title="图片查看" width="80%" top="5vh">
      <div class="gallery-viewer">
        < img :src="currentGalleryImage" class="viewer-image" />
      </div>
    </el-dialog>
=======
        <el-card class="action-panel">
          <template #header>
            <h3>操作</h3>
          </template>
          <div class="action-buttons">
            <el-button type="primary" style="width: 100%; margin-bottom: 10px;">
              <i class="el-icon-edit"></i>
              编辑信息
            </el-button>
            <el-button style="width: 100%; margin-bottom: 10px;">
              <i class="el-icon-share"></i>
              分享
            </el-button>
            <el-button type="success" style="width: 100%;">
              <i class="el-icon-collection"></i>
              收藏
            </el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const heritageId = route.params.id

const heritageData = ref({
  id: heritageId,
  name: '八公山历史文化遗址',
  type: '历史遗迹',
  location: '安徽省淮南市',
  status: 'active',
  description: '八公山是中国历史上著名的古战场，也是豆腐文化的发源地。'
})

<<<<<<< HEAD
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
  ElMessage.info('跳转导航应用')
}

const handleShare = () => {
  ElMessage.success('分享链接已复制到剪贴板')
}

const toggleFavorite = () => {
  isFavorited.value = !isFavorited.value
  ElMessage.success(isFavorited.value ? '已收藏' : '已取消收藏')
}

=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
onMounted(() => {
  console.log('文化遗产详情页面加载，ID:', heritageId)
  // 这里应该调用API获取详情数据
})
</script>

<style scoped>
.heritage-detail {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.detail-header {
  text-align: center;
  margin-bottom: 30px;
}

.heritage-meta {
  color: #909399;
}

.heritage-meta span {
  margin: 0 10px;
  padding: 4px 8px;
  background: #f5f7fa;
  border-radius: 4px;
}

.detail-content {
  margin-bottom: 20px;
}

.content-text {
  line-height: 1.6;
}

.content-text p {
  margin-bottom: 15px;
}

.images-section {
  margin-bottom: 20px;
}

.images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 10px;
}

<<<<<<< HEAD
.main-content {
  gap: 24px;
=======
.image-item {
  aspect-ratio: 1;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #909399;
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}

.sidebar-info {
  margin-bottom: 20px;
}

.info-list {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.info-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.label {
  color: #909399;
  font-weight: 500;
}

.value {
  color: #303133;
}

<<<<<<< HEAD
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
  gap: 24px;
=======
.action-panel {
  margin-bottom: 20px;
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}

.action-buttons {
  display: flex;
  flex-direction: column;
<<<<<<< HEAD
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
  gap: 16px;
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
=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</style>