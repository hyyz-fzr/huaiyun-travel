<template>
  <div class="latest-comments">
    <div v-if="loading" class="list-loading">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <el-skeleton :rows="2" animated />
      </div>
    </div>
    <div v-else-if="!data || data.length === 0" class="list-empty">
      <el-empty description="暂无评论" :image-size="80" />
    </div>
    <div v-else class="comment-list">
      <div
        v-for="comment in data"
        :key="comment.id"
        class="comment-item"
        @click="handleViewComment(comment)"
      >
        <div class="comment-header">
          <el-avatar
            :size="32"
            :src="comment.authorAvatar || '/images/avatars/default.jpg'"
          />
          <div class="user-info">
            <div class="username">{{ comment.authorName }}</div>
            <div class="comment-time">{{ formatTime(comment.createTime) }}</div>
          </div>
        </div>
        <div class="comment-content">
          {{ comment.content }}
        </div>
        <div class="comment-footer">
          <span class="content-title">回复: {{ comment.contentTitle }}</span>
          <div class="comment-stats">
            <div class="stat-item">
              <el-icon><Star /></el-icon>
              <span>{{ comment.likeCount || 0 }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { Star } from '@element-plus/icons-vue'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const router = useRouter()

// 方法
const handleViewComment = (comment) => {
  // 跳转到评论管理页面或内容详情页
  router.push({
    name: 'CommentManagement'
  })
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
</script>

<style scoped>
.latest-comments {
  width: 100%;
}

.list-loading {
  padding: 10px 0;
}

.skeleton-item {
  margin-bottom: 16px;
}

.list-empty {
  padding: 40px 0;
}

.comment-list {
  max-height: 400px;
  overflow-y: auto;
}

.comment-item {
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.comment-item:hover {
  background-color: #f5f7fa;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0 -8px;
  border-radius: 6px;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 8px;
}

.user-info {
  margin-left: 12px;
}

.username {
  font-size: 14px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.comment-time {
  font-size: 12px;
  color: #909399;
}

.comment-content {
  font-size: 14px;
  color: #606266;
  line-height: 1.5;
  margin-bottom: 8px;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.comment-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.content-title {
  font-size: 12px;
  color: #409EFF;
  max-width: 70%;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.comment-stats {
  display: flex;
  align-items: center;
  gap: 8px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;
  color: #909399;
}

.stat-item .el-icon {
  font-size: 14px;
}

/* 滚动条样式 */
.comment-list::-webkit-scrollbar {
  width: 6px;
}

.comment-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.comment-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.comment-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>