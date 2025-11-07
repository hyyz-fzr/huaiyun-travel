<template>
  <div class="event-detail">
    <el-page-header @back="$router.back()" class="page-header">
      <template #content>
        <span class="header-title">活动详情</span>
      </template>
    </el-page-header>

    <div v-loading="loading" class="detail-content">
      <el-row :gutter="30">
        <el-col :xs="24" :sm="16">
          <el-card class="event-info">
            <div class="event-cover">
              <img :src="event.coverImage" class="cover-image" @error="handleImageError" />
              <div v-if="event.status === 'UPCOMING'" class="event-badge upcoming">即将开始</div>
              <div v-else-if="event.status === 'ONGOING'" class="event-badge ongoing">进行中</div>
              <div v-else class="event-badge ended">已结束</div>
            </div>

            <div class="event-header">
              <h1 class="event-title">{{ event.title }}</h1>
              <p class="event-subtitle">{{ event.subtitle }}</p >
              
              <div class="event-meta">
                <div class="meta-item">
                  <el-icon><Calendar /></el-icon>
                  <span>{{ formatDateTime(event.startTime) }} - {{ formatTime(event.endTime) }}</span>
                </div>
                <div class="meta-item">
                  <el-icon><Location /></el-icon>
                  <span>{{ event.location }}</span>
                </div>
                <div class="meta-item">
                  <el-icon><User /></el-icon>
                  <span>已报名 {{ event.registeredCount || 0 }}/{{ event.maxParticipants }} 人</span>
                </div>
                <div class="meta-item">
                  <el-icon><PriceTag /></el-icon>
                  <span>{{ event.price > 0 ? `¥${event.price}` : '免费' }}</span>
                </div>
              </div>
            </div>

            <div class="event-description">
              <h3>活动介绍</h3>
              <div class="description-content" v-html="event.description"></div>
            </div>

            <div v-if="event.schedule" class="event-schedule">
              <h3>活动安排</h3>
              <el-timeline>
                <el-timeline-item
                  v-for="(item, index) in event.schedule"
                  :key="index"
                  :timestamp="item.time"
                  :type="item.type || 'primary'"
                >
                  {{ item.content }}
                </el-timeline-item>
              </el-timeline>
            </div>

            <div v-if="event.images && event.images.length > 0" class="event-gallery">
              <h3>活动图片</h3>
              <div class="gallery-grid">
                <el-image
                  v-for="(image, index) in event.images"
                  :key="index"
                  :src="image"
                  :preview-src-list="event.images"
                  fit="cover"
                  class="gallery-image"
                  @error="handleImageError"
                />
              </div>
            </div>
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="8">
          <el-card class="booking-section">
            <div class="booking-card" :class="event.status?.toLowerCase()">
              <div class="booking-header">
                <h3>活动预订</h3>
                <el-tag :type="getStatusType(event.status)">{{ getStatusText(event.status) }}</el-tag>
              </div>

              <div class="price-info">
                <span class="price">{{ event.price > 0 ? `¥${event.price}` : '免费' }}</span>
                <span class="price-note">/人</span>
              </div>

              <div class="booking-form">
                <el-form :model="bookingForm" :rules="bookingRules" ref="bookingFormRef">
                  <el-form-item label="报名人数" prop="participants">
                    <el-input-number
                      v-model="bookingForm.participants"
                      :min="1"
                      :max="getAvailableSpots()"
                      :disabled="!canBook"
                    />
                    <div class="available-spots">剩余 {{ getAvailableSpots() }} 个名额</div>
                  </el-form-item>

                  <el-form-item label="联系人" prop="contactName">
                    <el-input 
                      v-model="bookingForm.contactName" 
                      placeholder="请输入联系人姓名"
                      :disabled="!canBook"
                    />
                  </el-form-item>

                  <el-form-item label="联系电话" prop="contactPhone">
                    <el-input 
                      v-model="bookingForm.contactPhone" 
                      placeholder="请输入联系电话"
                      :disabled="!canBook"
                    />
                  </el-form-item>

                  <el-form-item label="备注" prop="notes">
                    <el-input
                      v-model="bookingForm.notes"
                      type="textarea"
                      :rows="3"
                      placeholder="请输入备注信息（选填）"
                      :disabled="!canBook"
                    />
                  </el-form-item>
                </el-form>
              </div>

              <div class="booking-actions">
                <el-button 
                  type="primary" 
                  size="large" 
                  :disabled="!canBook"
                  :loading="booking"
                  @click="handleBooking"
                  class="book-button"
                >
                  {{ getBookingButtonText() }}
                </el-button>
                
                <el-button 
                  v-if="event.status === 'UPCOMING'"
                  type="default"
                  size="large"
                  @click="addToCalendar"
                >
                  <el-icon><AlarmClock /></el-icon>
                  添加到日历
                </el-button>
              </div>

              <div class="booking-notes">
                <h4>预订说明：</h4>
                <ul>
                  <li>请确保填写正确的联系信息</li>
                  <li>活动开始前24小时可免费取消</li>
                  <li>如需帮助，请联系客服</li>
                </ul>
              </div>
            </div>
          </el-card>

          <el-card class="organizer-section">
            <h3>活动组织</h3>
            <div class="organizer-info">
              <el-avatar :size="60" :src="event.organizer?.avatar" />
              <div class="organizer-details">
                <div class="organizer-name">{{ event.organizer?.name }}</div>
                <div class="organizer-bio">{{ event.organizer?.bio }}</div>
                <el-button type="text" size="small">联系组织者</el-button>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Calendar,
  Location,
  User,
  PriceTag,
  AlarmClock
} from '@element-plus/icons-vue'

export default {
  name: 'EventDetail',
  setup() {
    const route = useRoute()
    const loading = ref(true)
    const booking = ref(false)
    const event = ref({})
    const bookingFormRef = ref()

    const bookingForm = ref({
      participants: 1,
      contactName: '',
      contactPhone: '',
      notes: ''
    })

    const bookingRules = {
      participants: [
        { required: true, message: '请选择报名人数', trigger: 'change' }
      ],
      contactName: [
        { required: true, message: '请输入联系人姓名', trigger: 'blur' }
      ],
      contactPhone: [
        { required: true, message: '请输入联系电话', trigger: 'blur' },
        { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
      ]
    }

    const canBook = computed(() => {
      return event.value.status === 'UPCOMING' || event.value.status === 'ONGOING'
    })

    const loadEventDetail = async () => {
      try {
        loading.value = true
        const eventId = route.params.id
        event.value = {
          id: eventId,
          title: '淮南剪纸艺术工作坊',
          subtitle: '学习传统剪纸技艺，体验非遗文化魅力',
          coverImage: 'https://via.placeholder.com/800x400/FF9800/white?text=剪纸工作坊',
          status: 'UPCOMING',
          startTime: '2024-01-20T14:00:00',
          endTime: '2024-01-20T17:00:00',
          location: '淮南文化馆 3楼活动室',
          maxParticipants: 30,
          registeredCount: 15,
          price: 0,
          description: '本次活动将带领大家深入了解淮南传统剪纸艺术，学习基本的剪纸技巧，并亲手制作属于自己的剪纸作品。',
          schedule: [
            { time: '14:00-14:30', content: '剪纸艺术介绍与历史渊源' },
            { time: '14:30-15:30', content: '基础剪纸技巧教学' },
            { time: '15:30-16:30', content: '动手实践：制作剪纸作品' },
            { time: '16:30-17:00', content: '作品展示与交流' }
          ],
          images: [
            'https://via.placeholder.com/400x300/FF9800/white?text=剪纸1',
            'https://via.placeholder.com/400x300/4CAF50/white?text=剪纸2',
            'https://via.placeholder.com/400x300/2196F3/white?text=剪纸3'
          ],
          organizer: {
            name: '淮南非遗保护中心',
            avatar: 'https://via.placeholder.com/60/409EFF/white?text=非遗',
            bio: '致力于淮南非物质文化遗产的保护与传承'
          }
        }
      } catch (error) {
        ElMessage.error('加载活动详情失败')
      } finally {
        loading.value = false
      }
    }

    const handleBooking = async () => {
      try {
        const valid = await bookingFormRef.value.validate()
        if (!valid) return

        booking.value = true
        await new Promise(resolve => setTimeout(resolve, 1000))
        ElMessage.success('预订成功！我们已发送确认信息到您的手机')
        bookingFormRef.value.resetFields()
      } catch (error) {
        if (error !== 'cancel') {
          ElMessage.error('预订失败，请稍后重试')
        }
      } finally {
        booking.value = false
      }
    }

    const addToCalendar = () => {
      ElMessage.info('日历功能开发中')
    }

    const getAvailableSpots = () => {
      return (event.value.maxParticipants || 0) - (event.value.registeredCount || 0)
    }

    const getStatusType = (status) => {
      const typeMap = {
        'UPCOMING': 'warning',
        'ONGOING': 'success',
        'ENDED': 'info'
      }
      return typeMap[status] || 'info'
    }

    const getStatusText = (status) => {
      const textMap = {
        'UPCOMING': '即将开始',
        'ONGOING': '进行中',
        'ENDED': '已结束'
      }
      return textMap[status] || status
    }

    const getBookingButtonText = () => {
      if (event.value.status === 'ENDED') return '活动已结束'
      if (getAvailableSpots() <= 0) return '名额已满'
      return booking.value ? '预订中...' : '立即预订'
    }

    const formatDateTime = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleString('zh-CN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const formatTime = (dateString) => {
      if (!dateString) return ''
      const date = new Date(dateString)
      return date.toLocaleTimeString('zh-CN', {
        hour: '2-digit',
        minute: '2-digit'
      })
    }

    const handleImageError = (event) => {
      event.target.src = '/images/default-event.jpg'
    }

    onMounted(() => {
      loadEventDetail()
    })

    return {
      event,
      loading,
      booking,
      bookingForm,
      bookingFormRef,
      canBook,
      handleBooking,
      addToCalendar,
      getAvailableSpots,
      getStatusType,
      getStatusText,
      getBookingButtonText,
      formatDateTime,
      formatTime,
      handleImageError
    }
  }
}
</script>

<style scoped>
.event-detail {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

.event-cover {
  position: relative;
  margin-bottom: 24px;
}

.cover-image {
  width: 100%;
  height: 300px;
  object-fit: cover;
  border-radius: 8px;
}

.event-badge {
  position: absolute;
  top: 16px;
  right: 16px;
  padding: 6px 12px;
  border-radius: 4px;
  color: white;
  font-size: 14px;
  font-weight: 500;
}

.event-badge.upcoming {
  background: #e6a23c;
}

.event-badge.ongoing {
  background: #67c23a;
}

.event-badge.ended {
  background: #909399;
}

.event-header {
  margin-bottom: 32px;
}

.event-title {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 2em;
  line-height: 1.4;
}

.event-subtitle {
  color: #606266;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.event-meta {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #606266;
}

.meta-item .el-icon {
  color: #409eff;
}

.event-description,
.event-schedule,
.event-gallery {
  margin-bottom: 32px;
}

.event-description h3,
.event-schedule h3,
.event-gallery h3 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 1.3em;
  border-left: 4px solid #409eff;
  padding-left: 12px;
}

.description-content {
  line-height: 1.8;
  color: #606266;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
}

.gallery-image {
  width: 100%;
  height: 150px;
  border-radius: 6px;
  cursor: pointer;
}

.booking-card {
  padding: 0;
}

.booking-card.upcoming {
  border-top: 4px solid #e6a23c;
}

.booking-card.ongoing {
  border-top: 4px solid #67c23a;
}

.booking-card.ended {
  border-top: 4px solid #909399;
}

.booking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.booking-header h3 {
  margin: 0;
  color: #303133;
}

.price-info {
  text-align: center;
  margin-bottom: 24px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
}

.price {
  font-size: 2.5em;
  font-weight: bold;
}

.price-note {
  font-size: 1em;
  opacity: 0.9;
}

.booking-form {
  margin-bottom: 24px;
}

.available-spots {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

.booking-actions {
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-bottom: 20px;
}

.book-button {
  height: 48px;
  font-size: 16px;
}

.booking-notes {
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.booking-notes h4 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
}

.booking-notes ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  font-size: 13px;
  line-height: 1.6;
}

.booking-notes li {
  margin-bottom: 4px;
}

.organizer-section {
  margin-top: 20px;
}

.organizer-section h3 {
  margin: 0 0 16px 0;
  color: #303133;
}

.organizer-info {
  display: flex;
  gap: 16px;
  align-items: flex-start;
}

.organizer-details {
  flex: 1;
}

.organizer-name {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.organizer-bio {
  color: #606266;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .event-detail {
    padding: 16px;
  }
  
  .event-title {
    font-size: 1.5em;
  }
  
  .cover-image {
    height: 200px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
  }
  
  .organizer-info {
    flex-direction: column;
    text-align: center;
  }
  
  .price {
    font-size: 2em;
  }
}
</style>
