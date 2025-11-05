<template>
  <div class="latest-contents">
    <div v-if="loading" class="list-loading">
      <div v-for="n in 5" :key="n" class="skeleton-item">
        <el-skeleton :rows="1" animated />
      </div>
    </div>
    <div v-else-if="!data || data.length === 0" class="list-empty">
      <el-empty description="暂无内容" :image-size="80" />
    </div>
    <div v-else class="content-list">
      <div
        v-for="content in data"
        :key="content.id"
        class="content-item"
        @click="handleViewContent(content)"
      >
        <div class="content-main">
          <div class="content-title">
            {{ content.title }}
          </div>
          <div class="content-meta">
            <span class="author">{{ content.authorName }}</span>
            <span class="time">{{ formatTime(content.createTime) }}</span>
          </div>
        </div>
        <div class="content-stats">
          <div class="stat-item">
            <el-icon><View /></el-icon>
            <span>{{ content.viewCount || 0 }}</span>
          </div>
          <div class="stat-item">
            <el-icon><ChatDotRound /></el-icon>
            <span>{{ content.commentCount || 0 }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { View, ChatDotRound } from '@element-plus/icons-vue'

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
const handleViewContent = (content) => {
  router.push({
    name: 'ContentDetail',
    params: { id: content.id }
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
.latest-contents {
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

.content-list {
  max-height: 400px;
  overflow-y: auto;
}

.content-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
  cursor: pointer;
  transition: background-color 0.3s;
}

.content-item:hover {
  background-color: #f5f7fa;
  padding-left: 8px;
  padding-right: 8px;
  margin: 0 -8px;
  border-radius: 6px;
}

.content-item:last-child {
  border-bottom: none;
}

.content-main {
  flex: 1;
  min-width: 0;
}

.content-title {
  font-size: 14px;
  color: #303133;
  font-weight: 500;
  margin-bottom: 4px;
  line-height: 1.4;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.content-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  font-size: 12px;
  color: #909399;
}

.author {
  color: #409EFF;
}

.content-stats {
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;
  margin-left: 16px;
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
.content-list::-webkit-scrollbar {
  width: 6px;
}

.content-list::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.content-list::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.content-list::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>