<template>
  <div class="event-list">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h1>文化活动</h1>
          <p>参与丰富多彩的淮南文化活动</p >
        </div>
        <el-button type="primary" @click="$router.push('/event/upload')">
          <el-icon><Plus /></el-icon>
          发布活动
        </el-button>
      </div>
    </div>

    <div class="event-content">
      <div class="filter-bar">
        <el-input
          v-model="searchKeyword"
          placeholder="搜索活动..."
          prefix-icon="Search"
          style="width: 300px"
        />
        <el-select v-model="filterType" placeholder="活动类型">
          <el-option label="全部" value="" />
          <el-option label="文化讲座" value="lecture" />
          <el-option label="手工体验" value="workshop" />
          <el-option label="展览展示" value="exhibition" />
          <el-option label="演出表演" value="performance" />
        </el-select>
      </div>

      <div v-if="eventStore.loading" class="loading-state">
        <el-skeleton :rows="6" animated />
      </div>

      <div v-else class="events-grid">
        <el-card 
          v-for="event in filteredEvents" 
          :key="event.id"
          class="event-card"
        >
          <div class="event-image" @click="viewEventDetail(event.id)">
            <img 
              v-if="event.images && event.images.length > 0" 
              :src="event.images[0]" 
              :alt="event.title"
            />
            <div v-if="event.image">
              <img :src="event.image" :alt="event.title">
            </div>  
            <div v-else class="no-image">
              <el-icon><Picture /></el-icon>
              <span>暂无图片</span>
            </div>
            <div class="event-status">
              <el-tag v-if="getEventStatus(event) === 'upcoming'" type="success">即将开始</el-tag>
              <el-tag v-else-if="getEventStatus(event) === 'ongoing'" type="warning">进行中</el-tag>
              <el-tag v-else type="info">已结束</el-tag>
            </div>
          </div>
          
          <div class="event-info">
            <h3 class="event-title" @click="viewEventDetail(event.id)">{{ event.title }}</h3>
            <p class="event-desc">{{ event.description }}</p >
            
            <div class="event-meta">
              <div class="meta-item">
                <el-icon><Clock /></el-icon>
                <span>{{ formatTime(event.eventTime) }}</span>
              </div>
              <div class="meta-item">
                <el-icon><Location /></el-icon>
                <span>{{ event.location }}</span>
              </div>
              <div class="meta-item">
                <el-icon><User /></el-icon>
                <span>{{ event.bookedCount }}/{{ event.quota }} 人报名</span>
              </div>
            </div>

            <div class="event-price">
              <span v-if="event.price > 0" class="price">¥{{ event.price }}</span>
              <span v-else class="free">免费</span>
            </div>

            <div class="event-actions">
              <el-button 
                type="primary" 
                size="small" 
                @click="bookEvent(event)"
                :disabled="getEventStatus(event) === 'ended' || event.bookedCount >= event.quota"
              >
                {{ getEventStatus(event) === 'ended' ? '已结束' : 
                   event.bookedCount >= event.quota ? '名额已满' : '立即报名' }}
              </el-button>
              <el-button size="small" @click="viewEventDetail(event.id)">
                查看详情
              </el-button>
            </div>
          </div>
        </el-card>
      </div>

      <div v-if="!eventStore.loading && filteredEvents.length === 0" class="empty-state">
        <el-empty description="暂无活动数据">
          <el-button type="primary" @click="$router.push('/event/upload')">
            发布第一个活动
          </el-button>
        </el-empty>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useEventStore } from '@/stores/event'
import { ElMessage } from 'element-plus'
import { Plus, Search, Picture, Clock, Location, User } from '@element-plus/icons-vue'

const router = useRouter()
const eventStore = useEventStore()

const searchKeyword = ref('')
const filterType = ref('')

const filteredEvents = computed(() => {
  let filtered = eventStore.eventList

  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(event => 
      event.title.toLowerCase().includes(keyword) || 
      event.description.toLowerCase().includes(keyword) ||
      event.location.toLowerCase().includes(keyword)
    )
  }

  return filtered
})

const getEventStatus = (event) => {
  const now = new Date()
  const eventTime = new Date(event.eventTime)
  
  if (eventTime > now) return 'upcoming'
  if (eventTime <= now && eventTime.getTime() + 2 * 60 * 60 * 1000 > now.getTime()) return 'ongoing'
  return 'ended'
}

const formatTime = (time) => {
  return new Date(time).toLocaleString('zh-CN')
}

const viewEventDetail = (id) => {
  router.push(`/event/${id}`)
}

const bookEvent = (event) => {
  if (event.bookedCount >= event.quota) {
    ElMessage.warning('活动名额已满')
    return
  }
  
  ElMessage.success('报名成功！')
  event.bookedCount++
}

onMounted(() => {
  eventStore.fetchEventList()
})
</script>

<style scoped>
.event-list {
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

.event-content {
  min-height: 500px;
}

.loading-state {
  padding: 40px;
}

.events-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: 20px;
}

.event-card {
  transition: all 0.3s;
  overflow: hidden;
}

.event-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
}

.event-image {
  position: relative;
  height: 200px;
  overflow: hidden;
  background: #f5f7fa;
  cursor: pointer;
}

.event-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.event-card:hover .event-image img {
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

.event-status {
  position: absolute;
  top: 12px;
  right: 12px;
}

.event-info {
  padding: 20px;
}

.event-title {
  margin: 0 0 8px 0;
  color: #303133;
  cursor: pointer;
  transition: color 0.3s;
}

.event-title:hover {
  color: #409eff;
}

.event-desc {
  color: #606266;
  line-height: 1.5;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #909399;
  font-size: 14px;
}

.event-price {
  margin-bottom: 16px;
}

.price {
  font-size: 1.2em;
  color: #e6a23c;
  font-weight: bold;
}

.free {
  color: #67c23a;
  font-weight: 500;
}

.event-actions {
  display: flex;
  gap: 8px;
}

.event-actions .el-button {
  flex: 1;
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
  
  .events-grid {
    grid-template-columns: 1fr;
  }
}
</style>
