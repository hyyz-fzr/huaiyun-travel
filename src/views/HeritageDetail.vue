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
              </div>
            </div>
          </div>
        </el-card>
      </el-col>

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

.image-item {
  aspect-ratio: 1;
  background: #f5f7fa;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  color: #909399;
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

.action-panel {
  margin-bottom: 20px;
}

.action-buttons {
  display: flex;
  flex-direction: column;
}
</style>