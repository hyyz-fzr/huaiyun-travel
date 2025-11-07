<template>
  <div class="booking-list">
    <div class="page-header">
      <h2>我的活动预订</h2>
      <p>查看和管理您预订的文化活动</p >
    </div>

    <div class="booking-content">
      <el-tabs v-model="activeTab">
        <!-- 进行中的预订 -->
        <el-tab-pane label="进行中" name="ongoing">
          <div class="booking-cards">
            <el-card 
              v-for="booking in ongoingBookings" 
              :key="booking.id"
              class="booking-card"
            >
              <div class="booking-info">
                <div class="booking-image">
                  <img :src="booking.image" :alt="booking.title" />
                </div>
                <div class="booking-details">
                  <h3>{{ booking.title }}</h3>
                  <p class="booking-desc">{{ booking.description }}</p >
                  <div class="booking-meta">
                    <span class="booking-date">
                      <el-icon><Calendar /></el-icon>
                      {{ booking.date }}
                    </span>
                    <span class="booking-location">
                      <el-icon><Location /></el-icon>
                      {{ booking.location }}
                    </span>
                    <span class="booking-status" :class="booking.status">
                      {{ booking.statusText }}
                    </span>
                  </div>
                  <div class="booking-actions">
                    <el-button type="primary" size="small">查看详情</el-button>
                    <el-button size="small" @click="cancelBooking(booking.id)">
                      取消预订
                    </el-button>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>

        <!-- 已完成的预订 -->
        <el-tab-pane label="已完成" name="completed">
          <el-empty v-if="completedBookings.length === 0" description="暂无已完成预订" />
          <div v-else class="booking-cards">
            <!-- 类似进行中的卡片结构 -->
            <el-card 
              v-for="booking in completedBookings" 
              :key="booking.id"
              class="booking-card completed"
            >
              <div class="booking-info">
                <div class="booking-image">
                  <img :src="booking.image" :alt="booking.title" />
                </div>
                <div class="booking-details">
                  <h3>{{ booking.title }}</h3>
                  <p class="booking-desc">{{ booking.description }}</p >
                  <div class="booking-meta">
                    <span class="booking-date">
                      <el-icon><Calendar /></el-icon>
                      {{ booking.date }}
                    </span>
                    <el-tag type="success">已完成</el-tag>
                  </div>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, computed } from 'vue'
import { Calendar, Location } from '@element-plus/icons-vue'

// 模拟数据
const activeTab = ref('ongoing')

const bookingsData = ref([
  {
    id: 1,
    title: '淮南豆腐文化体验课',
    description: '学习传统豆腐制作工艺，体验淮南非遗文化',
    image: '/src/assets/images/activity1.jpg',
    date: '2024-01-15 14:00',
    location: '淮南市文化馆',
    status: 'confirmed',
    statusText: '已确认'
  },
  {
    id: 2,
    title: '八公山历史文化讲座',
    description: '深入了解八公山的历史文化和传说故事',
    image: '/src/assets/images/activity2.jpg',
    date: '2024-01-20 10:00',
    location: '八公山风景区',
    status: 'pending',
    statusText: '待确认'
  }
])

// 计算属性
const ongoingBookings = computed(() => 
  bookingsData.value.filter(booking => booking.status !== 'completed')
)

const completedBookings = computed(() => 
  bookingsData.value.filter(booking => booking.status === 'completed')
)

// 方法
const cancelBooking = (id) => {
  ElMessageBox.confirm('确定要取消这个预订吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    ElMessage.success('预订已取消')
    // 这里实际应该调用API取消预订
  })
}
</script>

<style scoped>
.booking-list {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.page-header h2 {
  color: #303133;
  margin-bottom: 8px;
}

.page-header p {
  color: #909399;
}

.booking-card {
  margin-bottom: 16px;
}

.booking-info {
  display: flex;
  gap: 16px;
}

.booking-image {
  width: 120px;
  height: 90px;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
}

.booking-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.booking-details {
  flex: 1;
}

.booking-details h3 {
  margin: 0 0 8px 0;
  color: #303133;
}

.booking-desc {
  color: #606266;
  margin-bottom: 12px;
  font-size: 14px;
}

.booking-meta {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 12px;
}

.booking-meta span {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #606266;
  font-size: 14px;
}

.booking-status {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
}

.booking-status.confirmed {
  background: #f0f9ff;
  color: #1890ff;
}

.booking-status.pending {
  background: #fff7e6;
  color: #fa8c16;
}

.booking-actions {
  display: flex;
  gap: 8px;
}

.completed .booking-details {
  opacity: 0.7;
}
</style>