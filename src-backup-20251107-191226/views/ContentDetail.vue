<template>
  <div class="content-detail" v-loading="loading">
    <!-- 内容头部 -->
    <div class="content-header">
      <el-page-header @back="goBack" class="page-header">
        <template #content>
          <div class="header-content">
            <h1 class="content-title">{{ content.title }}</h1>
            <div class="content-meta">
              <el-tag :type="getTypeTagType(content.type)" size="small">
                {{ getTypeText(content.type) }}
              </el-tag>
              <el-tag :type="getStatusTagType(content.status)" size="small">
                {{ getStatusText(content.status) }}
              </el-tag>
              <span class="meta-item">
                <el-icon><User /></el-icon>
                {{ content.authorName }}
              </span>
              <span class="meta-item">
                <el-icon><Clock /></el-icon>
                {{ formatDate(content.createTime) }}
              </span>
              <span class="meta-item">
                <el-icon><View /></el-icon>
                {{ content.viewCount || 0 }} 浏览
              </span>
            </div>
          </div>
        </template>
      </el-page-header>
      
      <div class="header-actions">
        <el-button-group>
          <el-button
            v-if="content.status === 'pending'"
            type="success"
            @click="handleApprove"
          >
            <el-icon><Check /></el-icon>
            通过审核
          </el-button>
          <el-button
            v-if="content.status === 'published'"
            type="warning"
            @click="handleBan"
          >
            <el-icon><Close /></el-icon>
            下架内容
          </el-button>
          <el-button
            v-if="content.status === 'banned'"
            type="success"
            @click="handleRestore"
          >
            <el-icon><RefreshRight /></el-icon>
            恢复内容
          </el-button>
          <el-button type="danger" @click="handleDelete">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 内容主体 -->
    <div class="content-body">
      <el-row :gutter="24">
        <!-- 主要内容 -->
        <el-col :span="16">
          <el-card class="main-content">
            <!-- 封面图片 -->
            <div class="cover-image" v-if="content.coverImage">
              <el-image
                :src="content.coverImage"
                :preview-src-list="[content.coverImage]"
                fit="cover"
                class="cover-img"
              />
            </div>

            <!-- 内容正文 -->
            <div class="content-text" v-html="content.content"></div>

            <!-- 内容图片 -->
            <div class="content-images" v-if="content.images && content.images.length > 0">
              <h3>内容图片</h3>
              <div class="image-grid">
                <el-image
                  v-for="(img, index) in content.images"
                  :key="index"
                  :src="img"
                  :preview-src-list="content.images"
                  fit="cover"
                  class="content-image"
                />
              </div>
            </div>

            <!-- 标签 -->
            <div class="content-tags" v-if="content.tags && content.tags.length > 0">
              <h3>标签</h3>
              <div class="tags-container">
                <el-tag
                  v-for="tag in content.tags"
                  :key="tag"
                  type="info"
                  size="small"
                  class="tag-item"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </el-card>

          <!-- 评论区域 -->
          <el-card class="comments-section" v-if="content.comments">
            <template #header>
              <div class="comments-header">
                <span>评论 ({{ content.comments.length }})</span>
              </div>
            </template>
            
            <div class="comments-list">
              <div
                v-for="comment in content.comments"
                :key="comment.id"
                class="comment-item"
              >
                <div class="comment-header">
                  <el-avatar
                    :size="32"
                    :src="comment.authorAvatar || '/images/avatars/default.jpg'"
                  />
                  <div class="comment-user">
                    <div class="username">{{ comment.authorName }}</div>
                    <div class="comment-time">{{ formatTime(comment.createTime) }}</div>
                  </div>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
                <div class="comment-actions">
                  <el-button size="small" text>
                    <el-icon><Star /></el-icon>
                    {{ comment.likeCount || 0 }}
                  </el-button>
                  <el-button size="small" text>
                    <el-icon><ChatDotRound /></el-icon>
                    回复
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 侧边信息 -->
        <el-col :span="8">
          <!-- 作者信息 -->
          <el-card class="author-info">
            <template #header>
              <div class="card-header">
                <span>作者信息</span>
              </div>
            </template>
            
            <div class="author-details">
              <el-avatar
                :size="64"
                :src="content.authorAvatar || '/images/avatars/default.jpg'"
              />
              <div class="author-name">{{ content.authorName }}</div>
              <div class="author-level">
                <el-tag :type="getUserLevelTagType(content.authorLevel)" size="small">
                  {{ getUserLevelText(content.authorLevel) }}
                </el-tag>
              </div>
              <div class="author-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorContentCount || 0 }}</div>
                  <div class="stat-label">发布内容</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorFansCount || 0 }}</div>
                  <div class="stat-label">粉丝</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorLikeCount || 0 }}</div>
                  <div class="stat-label">获赞</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 内容统计 -->
          <el-card class="content-stats">
            <template #header>
              <div class="card-header">
                <span>内容统计</span>
              </div>
            </template>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon views">
                  <el-icon><View /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.viewCount || 0 }}</div>
                  <div class="stat-label">浏览量</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon likes">
                  <el-icon><Star /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.likeCount || 0 }}</div>
                  <div class="stat-label">点赞数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon comments">
                  <el-icon><ChatDotRound /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.commentCount || 0 }}</div>
                  <div class="stat-label">评论数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon shares">
                  <el-icon><Share /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.shareCount || 0 }}</div>
                  <div class="stat-label">分享数</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 操作记录 -->
          <el-card class="operation-log" v-if="content.operationLog && content.operationLog.length > 0">
            <template #header>
              <div class="card-header">
                <span>操作记录</span>
              </div>
            </template>
            
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in content.operationLog"
                :key="index"
                :timestamp="formatTime(log.operationTime)"
                :type="getOperationType(log.operationType)"
              >
                {{ log.operatorName }} {{ getOperationText(log.operationType) }}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  User,
  Clock,
  View,
  Check,
  Close,
  Delete,
  RefreshRight,
  Star,
  ChatDotRound,
  Share
} from '@element-plus/icons-vue'
import { contentStore } from '@/stores/content'

const route = useRoute()
const router = useRouter()
const store = contentStore()

// 响应式数据
const loading = ref(false)
const content = ref({})

// 方法
const loadContentDetail = async () => {
  loading.value = true
  try {
    const contentId = route.params.id
    await store.fetchContentDetail(contentId)
    content.value = store.currentContent || {}
  } catch (error) {
    ElMessage.error('加载内容详情失败：' + error.message)
  } finally {
    loading.value = false
  }
}

const goBack = () => {
  router.back()
}

const handleApprove = async () => {
  try {
    await ElMessageBox.confirm('确定要通过审核吗？', '审核提示', {
      type: 'warning'
    })
    
    await store.approveContent(content.value.id)
    ElMessage.success('审核通过')
    loadContentDetail()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('审核失败：' + error.message)
    }
  }
}

const handleBan = async () => {
  try {
    await ElMessageBox.confirm('确定要下架该内容吗？', '下架提示', {
      type: 'warning'
    })
    
    await store.banContent(content.value.id)
    ElMessage.success('内容已下架')
    loadContentDetail()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('下架失败：' + error.message)
    }
  }
}

const handleRestore = async () => {
  try {
    await store.restoreContent(content.value.id)
    ElMessage.success('内容已恢复')
    loadContentDetail()
  } catch (error) {
    ElMessage.error('恢复失败：' + error.message)
  }
}

const handleDelete = async () => {
  try {
    await ElMessageBox.confirm('确定要删除该内容吗？此操作不可恢复！', '删除提示', {
      type: 'error',
      confirmButtonText: '确定删除',
      cancelButtonText: '取消'
    })
    
    await store.deleteContent(content.value.id)
    ElMessage.success('删除成功')
    router.push('/content-management')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败：' + error.message)
    }
  }
}

// 工具函数
const getTypeTagType = (type) => {
  const typeMap = {
    story: 'primary',
    travel: 'success',
    learning: 'warning',
    activity: 'danger'
  }
  return typeMap[type] || 'info'
}

const getTypeText = (type) => {
  const typeMap = {
    story: '文化见闻',
    travel: '旅行游记',
    learning: '学习分享',
    activity: '活动记录'
  }
  return typeMap[type] || '未知类型'
}

const getStatusTagType = (status) => {
  const statusMap = {
    published: 'success',
    pending: 'warning',
    banned: 'danger'
  }
  return statusMap[status] || 'info'
}

const getStatusText = (status) => {
  const statusMap = {
    published: '已发布',
    pending: '待审核',
    banned: '已下架'
  }
  return statusMap[status] || '未知状态'
}

const getUserLevelTagType = (level) => {
  const levelMap = {
    expert: 'success',
    vip: 'warning',
    normal: 'info'
  }
  return levelMap[level] || 'info'
}

const getUserLevelText = (level) => {
  const levelMap = {
    expert: '文化专家',
    vip: 'VIP用户',
    normal: '普通用户'
  }
  return levelMap[level] || '普通用户'
}

const getOperationType = (operationType) => {
  const typeMap = {
    create: 'primary',
    approve: 'success',
    ban: 'warning',
    delete: 'danger',
    restore: 'info'
  }
  return typeMap[operationType] || 'primary'
}

const getOperationText = (operationType) => {
  const textMap = {
    create: '创建了内容',
    approve: '通过了审核',
    ban: '下架了内容',
    delete: '删除了内容',
    restore: '恢复了内容'
  }
  return textMap[operationType] || '执行了操作'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-CN')
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  
  const time = new Date(timeString)
  const now = new Date()
  const diff = now.getTime() - time.getTime()
  
  const minutes = Math.floor(diff / (1000 * 60))
  const hours = Math.floor(diff / (1000 * 60 * 60))
  const days = Math.floor(diff / (1000 * 60 * 60 * 24))
  
  if (minutes < 60) {
    return `${minutes}分钟前`
  } else if (hours < 24) {
    return `${hours}小时前`
  } else if (days < 7) {
    return `${days}天前`
  } else {
    return time.toLocaleDateString('zh-CN')
  }
}

// 生命周期
onMounted(() => {
  loadContentDetail()
})
</script>

<style scoped>
.content-detail {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.content-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 20px;
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.header-content {
  flex: 1;
}

.content-title {
  margin: 0 0 12px 0;
  font-size: 24px;
  color: #303133;
  line-height: 1.4;
}

.content-meta {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-wrap: wrap;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 4px;
  color: #909399;
  font-size: 14px;
}

.header-actions {
  flex-shrink: 0;
}

.content-body {
  margin-top: 0;
}

.main-content {
  margin-bottom: 20px;
}

.cover-image {
  margin-bottom: 24px;
}

.cover-img {
  width: 100%;
  max-height: 400px;
  border-radius: 8px;
}

.content-text {
  line-height: 1.8;
  color: #606266;
  font-size: 16px;
}

.content-images {
  margin-top: 32px;
}

.content-images h3 {
  margin-bottom: 16px;
  color: #303133;
  font-size: 18px;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 12px;
}

.content-image {
  width: 100%;
  height: 150px;
  border-radius: 6px;
  cursor: pointer;
  transition: transform 0.3s;
}

.content-image:hover {
  transform: scale(1.05);
}

.content-tags {
  margin-top: 24px;
}

.content-tags h3 {
  margin-bottom: 12px;
  color: #303133;
  font-size: 18px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  transform: translateY(-2px);
}

.comments-section {
  margin-top: 20px;
}

.comments-header {
  font-weight: 500;
  color: #303133;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.comment-user {
  margin-left: 12px;
}

.username {
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.comment-time {
  font-size: 12px;
  color: #909399;
}

.comment-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 8px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

.author-info {
  margin-bottom: 20px;
}

.card-header {
  font-weight: 500;
  color: #303133;
}

.author-details {
  text-align: center;
}

.author-name {
  margin: 12px 0 8px;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.author-level {
  margin-bottom: 16px;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.content-stats {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
}

.stat-icon.views {
  background: #e1f5fe;
  color: #0288d1;
}

.stat-icon.likes {
  background: #fce4ec;
  color: #d81b60;
}

.stat-icon.comments {
  background: #f3e5f5;
  color: #7b1fa2;
}

.stat-icon.shares {
  background: #e8f5e8;
  color: #388e3c;
}

.stat-info {
  flex: 1;
}

.operation-log {
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .content-body .el-col-16,
  .content-body .el-col-8 {
    width: 100%;
  }
  
  .content-meta {
    gap: 8px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
