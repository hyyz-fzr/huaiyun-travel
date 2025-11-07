<template>
  <div class="post-detail">
    <el-page-header @back="$router.back()" class="page-header">
      <template #content>
        <span class="header-title">文化见闻</span>
      </template>
    </el-page-header>

    <div v-loading="loading" class="detail-content">
      <el-card v-if="post" class="post-card">
        <!-- 帖子头部 -->
        <div class="post-header">
          <div class="author-info">
            <el-avatar :size="48" :src="post.authorAvatar" />
            <div class="author-details">
              <div class="author-name">{{ post.author }}</div>
              <div class="post-meta">
                <span class="post-time">{{ formatTime(post.createTime) }}</span>
                <span class="post-views">
                  <el-icon><View /></el-icon>
                  {{ post.viewCount || 0 }} 阅读
                </span>
              </div>
            </div>
          </div>
          <div class="post-actions">
            <el-button :type="isLiked ? 'danger' : 'default'" @click="toggleLike">
              <el-icon><Star /></el-icon>
              {{ post.likeCount || 0 }}
            </el-button>
            <el-button type="primary" @click="showCommentDialog = true">
              <el-icon><ChatDotRound /></el-icon>
              评论
            </el-button>
          </div>
        </div>

        <!-- 帖子内容 -->
        <div class="post-content">
          <h1 class="post-title">{{ post.title }}</h1>
          
          <!-- 封面图片 -->
          <div v-if="post.coverImage" class="cover-image">
            <img :src="post.coverImage" @error="handleImageError" />
          </div>

          <!-- 正文内容 -->
          <div class="content-body" v-html="post.content"></div>

          <!-- 图片集 -->
          <div v-if="post.images && post.images.length > 0" class="image-gallery">
            <el-image
              v-for="(image, index) in post.images"
              :key="index"
              :src="image"
              :preview-src-list="post.images"
              fit="cover"
              class="content-image"
              @error="handleImageError"
            />
          </div>

          <!-- 标签 -->
          <div v-if="post.tags && post.tags.length > 0" class="post-tags">
            <el-tag
              v-for="tag in post.tags"
              :key="tag"
              type="info"
              size="small"
              class="tag-item"
            >
              {{ tag }}
            </el-tag>
          </div>
        </div>

        <!-- 帖子底部 -->
        <div class="post-footer">
          <div class="action-stats">
            <span class="stat-item">
              <el-icon><Star /></el-icon>
              {{ post.likeCount || 0 }} 人点赞
            </span>
            <span class="stat-item">
              <el-icon><ChatDotRound /></el-icon>
              {{ post.commentCount || 0 }} 条评论
            </span>
          </div>
        </div>
      </el-card>

      <!-- 评论区域 -->
      <div class="comments-section">
        <h3 class="comments-title">评论 ({{ comments.length }})</h3>
        
        <!-- 评论列表 -->
        <div class="comments-list">
          <div v-for="comment in comments" :key="comment.id" class="comment-item">
            <div class="comment-header">
              <el-avatar :size="32" :src="comment.avatar" />
              <div class="comment-author">
                <span class="author-name">{{ comment.author }}</span>
                <span class="comment-time">{{ formatTime(comment.createTime) }}</span>
              </div>
            </div>
            <div class="comment-content">
              {{ comment.content }}
            </div>
            <div class="comment-actions">
              <el-button text size="small" @click="replyTo(comment)">
                <el-icon><ChatDotRound /></el-icon>
                回复
              </el-button>
            </div>
          </div>
        </div>

        <el-empty v-if="comments.length === 0" description="暂无评论，快来抢沙发吧～" />
      </div>
    </div>

    <!-- 评论对话框 -->
    <el-dialog v-model="showCommentDialog" title="发表评论" width="500px">
      <el-form :model="commentForm" label-width="60px">
        <el-form-item label="评论">
          <el-input
            v-model="commentForm.content"
            type="textarea"
            :rows="4"
            placeholder="请输入您的评论..."
            maxlength="500"
            show-word-limit
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showCommentDialog = false">取消</el-button>
        <el-button type="primary" @click="submitComment" :loading="commenting">
          发表评论
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { postApi} from '@/api/post'
import {
  View,
  Star,
  ChatDotRound
} from '@element-plus/icons-vue'

const route = useRoute()
const loading = ref(true)
const post = ref(null)
const isLiked = ref(false)
const comments = ref([])
const showCommentDialog = ref(false)
const commenting = ref(false)

const commentForm = ref({
  content: ''
})

const loadPostDetail = async () => {
  try {
    loading.value = true
    const postId = route.params.id
    const data = await postApi.getPostDetail(postId)
    post.value = data
    isLiked.value = data.isLiked || false
    loadComments(postId)
  } catch (error) {
    ElMessage.error('加载帖子详情失败')
  } finally {
    loading.value = false
  }
}

const loadComments = async (postId) => {
  try {
    const data = await postApi.getPostComments(postId)
    comments.value = data
  } catch (error) {
    console.error('加载评论失败:', error)
  }
}

const toggleLike = async () => {
  try {
    await postApi.likePost(post.value.id)
    isLiked.value = !isLiked.value
    if (isLiked.value) {
      post.value.likeCount = (post.value.likeCount || 0) + 1
      ElMessage.success('点赞成功')
    } else {
      post.value.likeCount = Math.max(0, (post.value.likeCount || 1) - 1)
      ElMessage.info('已取消点赞')
    }
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const submitComment = async () => {
  if (!commentForm.value.content.trim()) {
    ElMessage.warning('请输入评论内容')
    return
  }

  try {
    commenting.value = true
    await postApi.addComment(post.value.id, commentForm.value)
    ElMessage.success('评论发表成功')
    commentForm.value.content = ''
    showCommentDialog.value = false
    loadComments(post.value.id)
    post.value.commentCount = (post.value.commentCount || 0) + 1
  } catch (error) {
    ElMessage.error('评论发表失败')
  } finally {
    commenting.value = false
  }
}

const replyTo = (comment) => {
  commentForm.value.content = `@${comment.author} `
  showCommentDialog.value = true
}

const handleImageError = (event) => {
  event.target.src = '/images/default-post.jpg'
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  return new Date(timeString).toLocaleString('zh-CN')
}

onMounted(() => {
  loadPostDetail()
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  margin-bottom: 20px;
}

/* 帖子卡片 */
.post-card {
  margin-bottom: 24px;
}

/* 帖子头部 */
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
  align-items: flex-start;
  gap: 12px;
}

.author-details {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.post-actions {
  display: flex;
  gap: 8px;
}

/* 帖子内容 */
.post-content {
  line-height: 1.8;
}

.post-title {
  margin: 0 0 24px 0;
  color: #303133;
  font-size: 1.8em;
  line-height: 1.4;
}

.cover-image {
  margin-bottom: 24px;
}

.cover-image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.content-body {
  margin-bottom: 24px;
  color: #606266;
  font-size: 15px;
  text-align: justify;
}

/* 图片集 */
.image-gallery {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.content-image {
  width: 100%;
  height: 200px;
  border-radius: 6px;
  cursor: pointer;
}

/* 标签 */
.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 16px;
}

.tag-item {
  cursor: pointer;
}

.tag-item:hover {
  background-color: #409eff;
  color: white;
}

/* 帖子底部 */
.post-footer {
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.action-stats {
  display: flex;
  gap: 20px;
  color: #909399;
  font-size: 14px;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 4px;
}

/* 评论区域 */
.comments-section {
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.comments-title {
  margin: 0 0 20px 0;
  color: #303133;
  font-size: 1.3em;
}

/* 评论列表 */
.comments-list {
  gap: 16px;
}

.comment-item {
  padding: 16px 0;
  border-bottom: 1px solid #f5f5f5;
}

.comment-item:last-child {
  border-bottom: none;
}

.comment-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 12px;
}

.comment-author {
  display: flex;
  flex-direction: column;
}

.author-name {
  font-weight: 500;
  color: #303133;
  font-size: 14px;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .post-detail {
    padding: 16px;
  }
  
  .post-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .post-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .post-title {
    font-size: 1.5em;
  }
  
  .image-gallery {
    grid-template-columns: 1fr;
  }
  
  .content-image {
    height: 150px;
  }
}
</style>

