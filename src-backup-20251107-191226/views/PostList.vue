<template>
  <div class="post-list-page">
    <div class="page-header">
      <h1>文化社区</h1>
      <p>分享文化见闻，交流学习心得，记录精彩瞬间</p >
    </div>

    <!-- 发布按钮和筛选 -->
    <div class="post-actions">
      <el-button 
        type="primary" 
        :icon="Plus" 
        @click="showPostUpload = true"
        v-if="userStore.isLoggedIn"
      >
        发布帖子
      </el-button>
      
      <div class="filters">
        <el-select v-model="filterType" placeholder="内容类型" @change="loadPosts">
          <el-option label="全部" value="" />
          <el-option label="文化见闻" value="story" />
          <el-option label="旅行游记" value="travel" />
          <el-option label="学习分享" value="learning" />
          <el-option label="活动记录" value="activity" />
        </el-select>
        
        <el-select v-model="sortBy" placeholder="排序方式" @change="loadPosts">
          <el-option label="最新发布" value="newest" />
          <el-option label="最热内容" value="hot" />
          <el-option label="最多点赞" value="likes" />
          <el-option label="最多评论" value="comments" />
        </el-select>
      </div>
    </div>

    <!-- 帖子列表 -->
    <div class="posts-container">
      <div 
        v-for="post in postList" 
        :key="post.id"
        class="post-card"
        @click="$router.push(`/posts/${post.id}`)"
      >
        <div class="post-header">
          <div class="author-info">
            <el-avatar :size="40" :src="post.author.avatar" />
            <div class="author-details">
              <div class="author-name">{{ post.author.name }}</div>
              <div class="post-time">{{ formatTime(post.createTime) }}</div>
            </div>
          </div>
          <div class="post-type">
            <el-tag :type="getTypeTagType(post.type)" size="small">
              {{ getTypeText(post.type) }}
            </el-tag>
          </div>
        </div>
        <div class="post-content">
          <h3 class="post-title">{{ post.title }}</h3>
          <p class="post-summary">{{ post.summary }}</p >
          
          <div class="post-images" v-if="post.images && post.images.length > 0">
            <div 
              v-for="(image, index) in post.images.slice(0, 4)" 
              :key="index"
              class="post-image"
              :class="{ 'more-images': index === 3 && post.images.length > 4 }"
              @click.stop="previewImage(post.images, index)"
            >
              <img :src="image" :alt="`${post.title}图片${index + 1}`" />
              <div v-if="index === 3 && post.images.length > 4" class="image-count">
                +{{ post.images.length - 4 }}
              </div>
            </div>
          </div>
        </div>

        <div class="post-stats">
          <div class="stat-item">
            <el-icon><View /></el-icon>
            <span>{{ post.viewCount }}</span>
          </div>
          <div class="stat-item" @click.stop="toggleLike(post)">
            <el-icon :color="post.isLiked ? '#F56C6C' : '#909399'"><Star /></el-icon>
            <span :style="{ color: post.isLiked ? '#F56C6C' : '#909399' }">
              {{ post.likeCount }}
            </span>
          </div>
          <div class="stat-item">
            <el-icon><ChatDotRound /></el-icon>
            <span>{{ post.commentCount }}</span>
          </div>
          <div class="stat-item" @click.stop="toggleCollect(post)">
            <el-icon :color="post.isCollected ? '#E6A23C' : '#909399'"><Collection /></el-icon>
            <span :style="{ color: post.isCollected ? '#E6A23C' : '#909399' }">
              {{ post.collectCount }}
            </span>
          </div>
        </div>

        <div class="post-tags" v-if="post.tags && post.tags.length > 0">
          <el-tag
            v-for="tag in post.tags.slice(0, 3)"
            :key="tag"
            size="small"
            type="info"
            class="post-tag"
          >
            {{ tag }}
          </el-tag>
          <span v-if="post.tags.length > 3" class="more-tags">
            +{{ post.tags.length - 3 }}
          </span>
        </div>
      </div>
    </div>

    <!-- 空状态 -->
    <div v-if="postList.length === 0 && !loading" class="empty-state">
      <el-empty description="暂无帖子" />
    </div>

    <!-- 加载更多 -->
    <div class="load-more" v-if="hasMore && !loading">
      <el-button type="primary" text @click="loadMore" :loading="loadingMore">
        加载更多
      </el-button>
    </div>

    <!-- 分页 -->
    <div class="pagination-container" v-if="!hasMore && postList.length > 0">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        layout="total, prev, pager, next"
        @current-change="loadPosts"
      />
    </div>

    <!-- 发布帖子对话框 -->
    <el-dialog v-model="showPostUpload" title="发布帖子" width="800px">
      <post-upload @success="handlePostSuccess" @cancel="showPostUpload = false" />
    </el-dialog>

    <!-- 图片预览 -->
    <el-dialog v-model="previewVisible" title="图片预览" width="80%">
      <el-carousel :initial-index="previewIndex" indicator-position="outside">
        <el-carousel-item v-for="image in previewImages" :key="image">
          <img :src="image" style="width: 100%; max-height: 70vh; object-fit: contain;" />
        </el-carousel-item>
      </el-carousel>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { useUserStore } from '@/stores/user'
import { postApi } from '@/api/post'
import PostUpload from '@/components/common/PostUpload.vue'
import { Plus, View, Star, ChatDotRound, Collection } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const userStore = useUserStore()

const postList = ref([])
const loading = ref(false)
const loadingMore = ref(false)
const showPostUpload = ref(false)
const previewVisible = ref(false)
const previewImages = ref([])
const previewIndex = ref(0)

const filterType = ref('')
const sortBy = ref('newest')
const hasMore = ref(true)

const pagination = ref({
  current: 1,
  size: 10,
  total: 0
})

const typeMap = {
  'story': '文化见闻',
  'travel': '旅行游记', 
  'learning': '学习分享',
  'activity': '活动记录'
}

const typeTagMap = {
  'story': 'primary',
  'travel': 'success',
  'learning': 'warning',
  'activity': 'danger'
}

const getTypeText = (type) => typeMap[type] || '其他'
const getTypeTagType = (type) => typeTagMap[type] || 'info'

const formatTime = (time) => {
  const date = new Date(time)
  const now = new Date()
  const diff = now - date
  
  if (diff < 60000) return '刚刚'
  if (diff < 3600000) return `${Math.floor(diff / 60000)}分钟前`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}小时前`
  if (diff < 604800000) return `${Math.floor(diff / 86400000)}天前`
  
  return date.toLocaleDateString()
}

const loadPosts = async (reset = true) => {
  if (reset) {
    loading.value = true
    pagination.value.current = 1
  } else {
    loadingMore.value = true
  }
  
  try {
    const params = {
      page: pagination.value.current,
      size: pagination.value.size,
      type: filterType.value,
      sort: sortBy.value
    }
    
    const res = await postApi.getPosts(params)
    const newPosts = res.data.list.map(post => ({
      ...post,
      isLiked: post.isLiked || false,
      isCollected: post.isCollected || false
    }))
    
    if (reset) {
      postList.value = newPosts
    } else {
      postList.value.push(...newPosts)
    }
    
    pagination.value.total = res.data.total
    hasMore.value = postList.value.length < res.data.total
  } catch (error) {
    // 使用模拟数据
    const mockPosts = [
      {
        id: 1,
        title: '淮南豆腐制作技艺全解析',
        summary: '深入探讨传统豆腐制作工艺的每一个细节，从选豆到成品，带你了解这项非遗技艺的独特魅力...',
        type: 'learning',
        images: [
          '/src/assets/images/post-1-1.jpg',
          '/src/assets/images/post-1-2.jpg'
        ],
        author: {
          name: '文化学者',
          avatar: '/src/assets/images/avatar1.jpg'
        },
        createTime: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2小时前
        viewCount: 156,
        likeCount: 23,
        commentCount: 8,
        collectCount: 12,
        isLiked: false,
        isCollected: true,
        tags: ['豆腐文化', '非遗技艺', '传统工艺']
      },
      {
        id: 2,
        title: '八公山历史文化深度游',
        summary: '周末探访八公山，不仅欣赏了美丽的自然风光，更深入了解这里丰富的历史文化内涵...',
        type: 'travel',
        images: [
          '/src/assets/images/post-2-1.jpg',
          '/src/assets/images/post-2-2.jpg',
          '/src/assets/images/post-2-3.jpg',
          '/src/assets/images/post-2-4.jpg',
          '/src/assets/images/post-2-5.jpg'
        ],
        author: {
          name: '旅行达人',
          avatar: '/src/assets/images/avatar2.jpg'
        },
        createTime: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5小时前
        viewCount: 289,
        likeCount: 45,
        commentCount: 23,
        collectCount: 18,
        isLiked: true,
        isCollected: false,
        tags: ['八公山', '历史文化', '旅行攻略', '自然风光']
      },
      {
        id: 3,
        title: '传统剪纸艺术学习心得',
        summary: '学习淮南传统剪纸艺术一个月，分享一些学习心得和作品，感受非遗文化的魅力...',
        type: 'story',
        images: [
          '/src/assets/images/post-3-1.jpg'
        ],
        author: {
          name: '手工爱好者',
          avatar: '/src/assets/images/avatar3.jpg'
        },
        createTime: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1天前
        viewCount: 134,
        likeCount: 34,
        commentCount: 15,
        collectCount: 9,
        isLiked: false,
        isCollected: false,
        tags: ['剪纸艺术', '非遗', '手工', '传统文化']
      }
    ]
    
    if (reset) {
      postList.value = mockPosts
    } else {
      postList.value.push(...mockPosts)
    }
    pagination.value.total = mockPosts.length * 3
    hasMore.value = postList.value.length < pagination.value.total
  } finally {
    loading.value = false
    loadingMore.value = false
  }
}

const loadMore = () => {
  pagination.value.current++
  loadPosts(false)
}

const toggleLike = async (post) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    if (post.isLiked) {
      // 取消点赞逻辑
      post.likeCount--
    } else {
      await postApi.likePost(post.id)
      post.likeCount++
    }
    post.isLiked = !post.isLiked
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const toggleCollect = async (post) => {
  if (!userStore.isLoggedIn) {
    ElMessage.warning('请先登录')
    return
  }

  try {
    if (post.isCollected) {
      // 取消收藏逻辑
      post.collectCount--
    } else {
      await postApi.collectPost(post.id)
      post.collectCount++
    }
    post.isCollected = !post.isCollected
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const previewImage = (images, index) => {
  previewImages.value = images
  previewIndex.value = index
  previewVisible.value = true
}

const handlePostSuccess = () => {
  showPostUpload.value = false
  loadPosts(true) // 重新加载帖子列表
}

onMounted(() => {
  loadPosts()
})
</script>

<style scoped>
.post-list-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 40px;
}

.page-header h1 {
  font-size: 2.5rem;
  color: #303133;
  margin-bottom: 12px;
}

.page-header p {
  font-size: 1.1rem;
  color: #909399;
}

.post-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  flex-wrap: wrap;
  gap: 16px;
}

.filters {
  display: flex;
  gap: 12px;
}

.posts-container {
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 40px;
}

.post-card {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  cursor: pointer;
  transition: all 0.3s ease;
  border: 1px solid #f0f0f0;
}

.post-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 16px;
}

.author-info {
  display: flex;
  align-items: flex-start;
  gap: 12px;
}

.author-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.author-name {
  font-weight: bold;
  color: #303133;
  font-size: 0.9rem;
}

.post-time {
  color: #909399;
  font-size: 0.8rem;
}

.post-content {
  margin-bottom: 20px;
}

.post-title {
  font-size: 1.3rem;
  color: #303133;
  margin: 0 0 12px 0;
  line-height: 1.4;
}

.post-summary {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-images {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 8px;
  margin-top: 12px;
}

.post-image {
  position: relative;
  aspect-ratio: 1;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
}

.post-image.more-images::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.post-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.post-image:hover img {
  transform: scale(1.05);
}

.image-count {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.2rem;
  font-weight: bold;
  z-index: 2;
}

.post-stats {
  display: flex;
  gap: 24px;
  margin-bottom: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 6px;
  color: #909399;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s;
}

.stat-item:hover {
  color: #409EFF;
}

.post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  align-items: center;
}

.post-tag {
  cursor: pointer;
}

.more-tags {
  color: #909399;
  font-size: 0.8rem;
}

.empty-state {
  padding: 60px 0;
}

.load-more {
  text-align: center;
  margin: 40px 0;
}

.pagination-container {
  display: flex;
  justify-content: center;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .post-list-page {
    padding: 12px;
  }
  
  .post-actions {
    flex-direction: column;
    align-items: stretch;
  }
  
  .filters {
    justify-content: space-between;
  }
  
  .post-card {
    padding: 16px;
  }
  
  .post-images {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .post-stats {
    gap: 16px;
  }
}
</style>
