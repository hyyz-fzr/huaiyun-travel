<template>
  <div class="post-detail">
    <!-- 帖子头部 -->
    <div class="post-header">
      <div class="author-info">
        <el-avatar :size="50" :src="post.authorAvatar">
          {{ post.author.charAt(0) }}
        </el-avatar>
        <div class="author-details">
          <div class="author-name">{{ post.author }}</div>
          <div class="post-meta">
            <span class="post-time">{{ formatTime(post.createdAt) }}</span>
            <el-tag type="info" size="small">{{ post.category }}</el-tag>
          </div>
        </div>
      </div>
      
      <div class="post-actions">
        <el-button 
          :type="isLiked ? 'primary' : 'default'" 
          :icon="isLiked ? VideoPlay : CircleCheck"
          @click="handleLike"
        >
          点赞 {{ post.likes + (isLiked ? 1 : 0) }}
        </el-button>
        <el-button>分享</el-button>
      </div>
    </div>

    <!-- 帖子内容 -->
    <div class="post-content">
      <h1 class="post-title">{{ post.title }}</h1>
      
      <div class="content-text">
        <p v-for="(paragraph, index) in contentParagraphs" :key="index">
          {{ paragraph }}
        </p >
      </div>

      <!-- 图片展示 -->
      <div v-if="post.images && post.images.length > 0" class="post-images">
        <el-image
          v-for="(image, index) in post.images"
          :key="index"
          :src="image"
          :alt="`图片${index + 1}`"
          :preview-src-list="post.images"
          :initial-index="index"
          class="content-image"
          fit="cover"
        />
      </div>

      <!-- 位置信息 -->
      <div v-if="post.location" class="location-info">
        <el-icon><Location /></el-icon>
        <span>{{ post.location }}</span>
      </div>

      <!-- 标签 -->
      <div class="post-tags">
        <el-tag
          v-for="tag in post.tags"
          :key="tag"
          type="info"
          class="tag-item"
        >
          #{{ tag }}
        </el-tag>
      </div>
    </div>

    <!-- 帖子统计 -->
    <div class="post-stats">
      <div class="stat-item">
        <el-icon><View /></el-icon>
        <span>{{ post.views }} 浏览</span>
      </div>
      <div class="stat-item">
        <el-icon><ChatDotRound /></el-icon>
        <span>{{ post.comments + comments.length }} 评论</span>
      </div>
      <div class="stat-item">
        <el-icon><CircleCheck /></el-icon>
        <span>{{ post.likes + (isLiked ? 1 : 0) }} 点赞</span>
      </div>
    </div>

    <!-- 评论区 -->
    <div class="comments-section">
      <h3>评论 ({{ comments.length }})</h3>
      
      <!-- 评论输入 -->
      <div class="comment-input">
        <el-input
          v-model="newComment"
          type="textarea"
          :rows="3"
          placeholder="写下你的评论..."
          resize="none"
        />
        <div class="comment-actions">
          <el-button type="primary" @click="submitComment" :disabled="!newComment.trim()">
            发布评论
          </el-button>
        </div>
      </div>

      <!-- 评论列表 -->
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <el-avatar :size="36" :src="comment.avatar">
              {{ comment.author.charAt(0) }}
            </el-avatar>
            <div class="comment-author">
              <div class="author-name">{{ comment.author }}</div>
              <div class="comment-time">{{ formatTime(comment.createdAt) }}</div>
            </div>
          </div>
          <div class="comment-content">
            {{ comment.content }}
          </div>
          <div class="comment-actions">
            <el-button text size="small" @click="likeComment(comment.id)">
              <el-icon><CircleCheck /></el-icon>
              点赞 ({{ comment.likes }})
            </el-button>
            <el-button text size="small" @click="replyToComment(comment)">
              回复
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-undef */
// 禁用no-undef检查，因为defineProps是Vue编译器宏

import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Location,
  View,
  ChatDotRound,
  CircleCheck,
  VideoPlay
} from '@element-plus/icons-vue'

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
})

// 响应式数据
const newComment = ref('')
const isLiked = ref(false)
const comments = ref([
  {
    id: 1,
    author: '文化爱好者',
    avatar: '',
    content: '写得真好！我也去过豆腐文化博物馆，确实很有意义。',
    likes: 3,
    createdAt: '2024-01-15T14:30:00'
  },
  {
    id: 2,
    author: '旅行达人',
    avatar: '',
    content: '八公山的秋色确实很美，感谢分享！',
    likes: 1,
    createdAt: '2024-01-15T16:45:00'
  }
])

// 计算属性
const contentParagraphs = computed(() => {
  return props.post.content.split('\n').filter(p => p.trim())
})

// 方法
const formatTime = (timeString) => {
  const time = new Date(timeString)
  const now = new Date()
  const diff = now - time
  
  const minute = 60 * 1000
  const hour = minute * 60
  const day = hour * 24
  
  if (diff < minute) {
    return '刚刚'
  } else if (diff < hour) {
    return `${Math.floor(diff / minute)}分钟前`
  } else if (diff < day) {
    return `${Math.floor(diff / hour)}小时前`
  } else if (diff < day * 7) {
    return `${Math.floor(diff / day)}天前`
  } else {
    return time.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }
}

const handleLike = () => {
  // 使用本地状态而不是修改props
  isLiked.value = !isLiked.value
  if (isLiked.value) {
    ElMessage.success('点赞成功')
  } else {
    ElMessage.info('已取消点赞')
  }
}

const submitComment = () => {
  if (!newComment.value.trim()) return
  
  const comment = {
    id: Date.now(),
    author: '当前用户', // 实际应该从用户状态获取
    avatar: '',
    content: newComment.value,
    likes: 0,
    createdAt: new Date().toISOString()
  }
  
  comments.value.unshift(comment)
  newComment.value = ''
  ElMessage.success('评论发布成功')
}

const likeComment = (commentId) => {
  const comment = comments.value.find(c => c.id === commentId)
  if (comment) {
    comment.likes++
    ElMessage.success('点赞成功')
  }
}

const replyToComment = (comment) => {
  newComment.value = `@${comment.author} `
  // 这里可以添加更复杂的回复逻辑
}
</script>

<style scoped>
/* 样式保持不变 */
.post-detail {
  max-height: 70vh;
  overflow-y: auto;
  padding: 0 10px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.author-info {
  display: flex;
  align-items: center;
  gap: 16px;
}

.author-details {
  line-height: 1.4;
}

.author-name {
  font-weight: 600;
  font-size: 16px;
  color: #333;
  margin-bottom: 4px;
}

.post-meta {
  display: flex;
  align-items: center;
  gap: 12px;
}

.post-time {
  color: #999;
  font-size: 14px;
}

.post-actions {
  display: flex;
  gap: 8px;
}

.post-content {
  margin-bottom: 24px;
}

.post-title {
  font-size: 1.8em;
  color: #333;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.content-text {
  line-height: 1.8;
  color: #333;
  margin-bottom: 20px;
}

.content-text p {
  margin-bottom: 16px;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin: 20px 0;
}

.content-image {
  width: 100%;
  height: 200px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.3s;
}

.content-image:hover {
  transform: scale(1.02);
}

.location-info {
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  margin: 16px 0;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 6px;
}

.post-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  margin: 20px 0;
}

.tag-item {
  cursor: pointer;
  transition: all 0.3s;
}

.tag-item:hover {
  background: #409eff;
  color: white;
}

.post-stats {
  display: flex;
  gap: 24px;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 24px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #666;
  font-size: 14px;
}

.comments-section {
  margin-top: 32px;
}

.comments-section h3 {
  margin-bottom: 16px;
  color: #333;
}

.comment-input {
  margin-bottom: 24px;
}

.comment-actions {
  display: flex;
  justify-content: flex-end;
  margin-top: 12px;
}

.comments-list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.comment-item {
  padding: 16px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  background: #fafafa;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.comment-author {
  line-height: 1.4;
}

.author-name {
  font-weight: 600;
  color: #333;
  font-size: 14px;
}

.comment-time {
  color: #999;
  font-size: 12px;
}

.comment-content {
  color: #333;
  line-height: 1.6;
  margin-bottom: 12px;
}

.comment-actions {
  display: flex;
  gap: 16px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .post-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .post-actions {
    align-self: flex-end;
  }
  
  .post-title {
    font-size: 1.5em;
  }
  
  .post-images {
    grid-template-columns: 1fr;
  }
}
</style>