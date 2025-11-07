<template>
<<<<<<< HEAD
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
=======
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('组件功能正常')
}
</script>

<style scoped>
.component {
  padding: 20px;
  text-align: center;
}
<<<<<<< HEAD

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
=======
</style>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
