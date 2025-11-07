<template>
<<<<<<< HEAD
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
</style>
