<template>
  <div class="heritage-list">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1>文化遗产</h1>
          <p>探索淮南丰富的文化遗产资源</p >
        </div>
        <el-button 
          type="primary" 
          aria-label="上传文化遗产"
          @click="$router.push('/heritage/upload')"
        >
          <el-icon><Plus /></el-icon>
          上传文化遗产
        </el-button>
      </div>
    </div>

    <div class="heritage-content">
      <div class="filter-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索文化遗产名称、描述或地点..."
          :prefix-icon="Search"
          aria-label="文化遗产搜索"
          style="width: 300px"
          @input="handleSearch"
        />
        <el-select 
          v-model="filterLevel" 
          placeholder="请选择保护级别"
          aria-label="文化遗产保护级别筛选"
          @change="handleFilter"
        >
          <el-option label="全部" value="" />
          <el-option label="世界级" value="世界级" />
          <el-option label="国家级" value="国家级" />
          <el-option label="省级" value="省级" />
          <el-option label="市级" value="市级" />
        </el-select>
      </div>

      <div v-if="heritageStore.loading" class="loading-state">
        <el-skeleton :rows="6" animated />
      </div>

      <div v-else class="heritage-grid">
        <el-card 
          v-for="heritage in filteredHeritage" 
          :key="heritage.id"
          class="heritage-card"
          @click="viewHeritageDetail(heritage.id)"
        >
          <div class="heritage-image">
            <template v-if="heritage.images && heritage.images.length > 0">
              < img 
                :src="heritage.images[0]" 
                :alt="heritage.name"
              />
            </template>
            <div v-else class="no-image">
              <el-icon><Picture /></el-icon>
              <span>暂无图片</span>
            </div>
          </div>
          
          <div class="heritage-info">
            <div class="heritage-header">
              <h3>{{ heritage.name }}</h3>
              <el-tag :type="getLevelType(heritage.level)">
                {{ heritage.level }}
              </el-tag>
            </div>
            
            <p class="heritage-desc">{{ heritage.description }}</p >
            
            <div class="heritage-meta">
              <div class="meta-item">
                <el-icon><Location /></el-icon>
                <span>{{ heritage.location }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Clock /></el-icon>
                <span>{{ heritage.openTime || '未知' }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Ticket /></el-icon>
                <span>{{ heritage.ticketPrice || '免费' }}</span>
              </div>
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="!heritageStore.loading && filteredHeritage.length === 0" class="empty-state">
        <el-empty description="暂无文化遗产数据">
          <el-button 
            type="primary" 
            aria-label="上传第一个文化遗产"
            @click="$router.push('/heritage/upload')"
          >
            上传第一个文化遗产
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useHeritageStore } from '@/stores/heritage'
import { Plus, Search, Picture, Location, Clock, Ticket } from '@element-plus/icons-vue'

const router = useRouter()
const heritageStore = useHeritageStore()

const searchKeyword = ref('')
const filterLevel = ref('')

const filteredHeritage = computed(() => {
  let filtered = heritageStore.heritageList

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(item => 
      item.name.toLowerCase().includes(keyword) || 
      item.description.toLowerCase().includes(keyword) ||
      (item.location && item.location.toLowerCase().includes(keyword))
    )
  }

  if (filterLevel.value) {
    filtered = filtered.filter(item => item.level === filterLevel.value)
  }

  return filtered
})

const getLevelType = (level) => {
  const typeMap = {
    '世界级': 'danger',
    '国家级': 'warning',
    '省级': 'success',
    '市级': 'info'
  }
  return typeMap[level] || 'info'
}

const viewHeritageDetail = (id) => {
  router.push(`/heritage/${id}`)
}

const handleSearch = () => {
  // 搜索逻辑已通过计算属性实现
}

const handleFilter = () => {
  // 筛选逻辑已通过计算属性实现
}

onMounted(() => {
  heritageStore.getHeritageList()
})
</script>

<style scoped>
.heritage-list {
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

.heritage-content {
  min-height: 500px;
}

.loading-state {
  padding: 40px;
}

.heritage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.heritage-card {
  cursor: pointer;
  transition: all 0.3s;
  overflow: hidden;
}

.heritage-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.heritage-image {
  height: 200px;
  overflow: hidden;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
}

.heritage-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.heritage-card:hover .heritage-image img {
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

.heritage-info {
  padding: 20px;
}

.heritage-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.heritage-header h3 {
  margin: 0;
  color: #303133;
  flex: 1;
  margin-right: 12px;
}

.heritage-desc {
  color: #606266;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.heritage-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
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
  
  .heritage-grid {
    grid-template-columns: 1fr;
  }
}
</style>