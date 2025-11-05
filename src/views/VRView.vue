<!-- src/views/VRView.vue - 完整文件内容 -->
<template>
  <div class="vr-container">
    <div class="vr-header">
      <h2>淮南文化VR全景</h2>
      <p>沉浸式体验淮南文化景点</p >
    </div>

    <el-card class="vr-content">
      <div class="vr-scene-selection">
        <h3>选择VR场景</h3>
        <el-row :gutter="20">
          <el-col :span="8" v-for="scene in vrScenes" :key="scene.id">
            <el-card 
              class="scene-card" 
              shadow="hover"
              @click="viewVRScene(scene)"
            >
              <div class="scene-image">
                <img :src="scene.thumbnail" :alt="scene.name" />
                <div class="scene-overlay">
                  <el-button type="primary" size="small">进入场景</el-button>
                </div>
              </div>
              <div class="scene-info">
                <h4>{{ scene.name }}</h4>
                <p>{{ scene.description }}</p >
                <div class="scene-tags">
                  <el-tag 
                    v-for="tag in scene.tags" 
                    :key="tag" 
                    size="small"
                    type="info"
                  >
                    {{ tag }}
                  </el-tag>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- VR场景展示区域 -->
      <div v-if="currentScene" class="vr-viewer">
        <div class="viewer-header">
          <h3>{{ currentScene.name }}</h3>
          <el-button @click="currentScene = null">
            <el-icon><Close /></el-icon>
            返回场景列表
          </el-button>
        </div>
        <div class="panorama-container">
          <div class="panorama-placeholder">
            <el-empty description="VR全景功能开发中">
              <p>这里将集成全景图查看器，展示{{ currentScene.name }}的360度全景</p >
            </el-empty>
          </div>
        </div>
        <div class="scene-description">
          <h4>场景介绍</h4>
          <p>{{ currentScene.fullDescription }}</p >
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Close } from '@element-plus/icons-vue'

// VR场景数据
const vrScenes = ref([
  {
    id: 1,
    name: '八公山全景',
    description: '俯瞰八公山壮丽景色，感受历史文化氛围',
    thumbnail: '/src/assets/images/vr-bagongshan.jpg',
    tags: ['自然风光', '历史文化', '全景'],
    fullDescription: '八公山是国家地质公园，以"风声鹤唳，草木皆兵"的典故闻名。这里不仅有美丽的自然风光，还蕴含着丰富的历史文化内涵。'
  },
  {
    id: 2,
    name: '茅仙古洞',
    description: '探秘道教圣地，体验古老洞穴文化',
    thumbnail: '/src/assets/images/vr-maoxian.jpg',
    tags: ['道教文化', '洞穴探险', '宗教圣地'],
    fullDescription: '茅仙古洞是淮南著名的道教圣地，相传为茅盈、茅固、茅衷三兄弟修炼成仙之处，洞内景观奇特，文化底蕴深厚。'
  },
  {
    id: 3,
    name: '焦岗湖湿地',
    description: '湿地生态体验，观鸟赏荷好去处',
    thumbnail: '/src/assets/images/vr-jiaoganghu.jpg',
    tags: ['湿地生态', '观鸟', '荷花'],
    fullDescription: '焦岗湖湿地公园是国家级湿地公园，拥有丰富的水生植物和鸟类资源，是生态旅游和自然教育的理想场所。'
  }
])

const currentScene = ref(null)

// 查看VR场景
const viewVRScene = (scene) => {
  currentScene.value = scene
}
</script>

<style scoped>
.vr-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.vr-header {
  margin-bottom: 30px;
}

.vr-header h2 {
  color: #303133;
  margin-bottom: 8px;
}

.vr-header p {
  color: #909399;
}

.vr-content {
  min-height: 500px;
}

.scene-selection {
  margin-bottom: 30px;
}

.scene-card {
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 20px;
}

.scene-card:hover {
  transform: translateY(-5px);
}

.scene-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  border-radius: 8px 8px 0 0;
}

.scene-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.scene-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.scene-card:hover .scene-overlay {
  opacity: 1;
}

.scene-info {
  padding: 15px;
}

.scene-info h4 {
  margin: 0 0 8px 0;
  color: #303133;
}

.scene-info p {
  color: #606266;
  font-size: 14px;
  margin-bottom: 12px;
}

.scene-tags {
  display: flex;
  gap: 4px;
  flex-wrap: wrap;
}

.vr-viewer {
  margin-top: 30px;
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.panorama-container {
  height: 400px;
  background: #f5f7fa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.panorama-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.scene-description h4 {
  color: #303133;
  margin-bottom: 12px;
}

.scene-description p {
  color: #606266;
  line-height: 1.6;
}
</style>