<template>
  <div class="profile-container">
    <!-- 页面头部 -->
    <div class="profile-header">
      <el-page-header @back="$router.back()" content="个人中心" />
    </div>

    <el-row :gutter="20" class="profile-content">
      <!-- 左侧：用户信息卡片 -->
      <el-col :xs="24" :sm="8">
        <el-card class="user-card">
          <div class="user-avatar-section">
            <img src="/images/heritage/1" class="heritage-image" />
            <el-avatar :size="120" :src="userInfo.avatar" class="user-avatar">
              {{ userInfo.nickname?.charAt(0) || '用' }}
            </el-avatar>
            <h2 class="username">{{ userInfo.nickname || '用户' }}</h2>
            <p class="user-bio">淮南文化爱好者</p >
            <el-tag type="success" class="user-level">文化探索者</el-tag>
          </div>

          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-number">{{ userStats.postCount }}</div>
              <div class="stat-label">发布的帖子</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userStats.collectionCount }}</div>
              <div class="stat-label">收藏内容</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userStats.bookingCount }}</div>
              <div class="stat-label">活动预订</div>
            </div>
          </div>

          <el-button type="primary" class="edit-btn" @click="editProfile">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
        </el-card>
      </el-col>

      <!-- 右侧：内容区域 -->
      <el-col :xs="24" :sm="16">
        <el-tabs v-model="activeTab" class="profile-tabs">
          <!-- 我的帖子 -->
          <el-tab-pane label="我的帖子" name="posts">
            <div class="tab-content">
              <el-card v-for="post in myPosts" :key="post.id" class="post-item">
                <div class="post-header">
                  <div class="post-info">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <p class="post-excerpt">{{ post.content }}</p >
                    <div class="post-meta">
                      <span class="post-time">{{ post.createTime }}</span>
                      <span class="post-views">
                        <el-icon><View /></el-icon>
                        {{ post.viewCount }}
                      </span>
                      <span class="post-likes">
                        <el-icon><Star /></el-icon>
                        {{ post.likeCount }}
                      </span>
                    </div>
                  </div>
                  <!-- 🖼️ 帖子封面图片 - 这里放帖子相关图片 -->
                  <img v-if="post.coverImage" :src="post.coverImage" class="post-cover" />
                </div>
                <div class="post-actions">
                  <el-button size="small" @click="editPost(post.id)">
                    <el-icon><Edit /></el-icon>
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="deletePost(post.id)">
                    <el-icon><Delete /></el-icon>
                    删除
                  </el-button>
                </div>
              </el-card>
              
              <el-empty v-if="myPosts.length === 0" description="暂无发布的帖子">
                <el-button type="primary" @click="$router.push('/posts')">
                  去发布第一篇帖子
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 我的收藏 -->
          <el-tab-pane label="我的收藏" name="collections">
            <div class="tab-content">
              <el-row :gutter="16">
                <el-col :xs="12" :sm="8" v-for="item in collections" :key="item.id">
                  <el-card class="collection-item" shadow="hover">
                    <!-- 🖼️ 收藏内容图片 - 这里放收藏项的图片 -->
                    <img :src="item.image" class="collection-image" />
                    <div class="collection-info">
                      <h4>{{ item.title }}</h4>
                      <p class="collection-type">{{ item.type }}</p >
                      <el-button size="small" @click="viewCollection(item)">
                        查看详情
                      </el-button>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              
              <el-empty v-if="collections.length === 0" description="暂无收藏内容">
                <el-button type="primary" @click="$router.push('/heritage')">
                  去探索文化遗产
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 我的预订 -->
          <el-tab-pane label="我的预订" name="bookings">
            <div class="tab-content">
              <el-card v-for="booking in bookings" :key="booking.id" class="booking-item">
                <div class="booking-header">
                  <!-- 🖼️ 活动封面图片 - 这里放活动图片 -->
                  <img :src="booking.eventImage" class="booking-image" />
                  <div class="booking-info">
                    <h3>{{ booking.eventName }}</h3>
                    <p class="booking-desc">{{ booking.eventDescription }}</p >
                    <div class="booking-details">
                      <div class="detail-item">
                        <el-icon><Calendar /></el-icon>
                        <span>{{ booking.eventDate }}</span>
                      </div>
                      <div class="detail-item">
                        <el-icon><Location /></el-icon>
                        <span>{{ booking.eventLocation }}</span>
                      </div>
                      <div class="detail-item">
                        <el-icon><User /></el-icon>
                        <span>预订人数: {{ booking.peopleCount }}人</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="booking-status">
                  <el-tag :type="booking.status === 'confirmed' ? 'success' : 'warning'">
                    {{ booking.status === 'confirmed' ? '已确认' : '待确认' }}
                  </el-tag>
                  <el-button size="small" @click="cancelBooking(booking.id)">
                    取消预订
                  </el-button>
                </div>
              </el-card>
              
              <el-empty v-if="bookings.length === 0" description="暂无活动预订">
                <el-button type="primary" @click="$router.push('/events')">
                  去查看活动
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 账号设置 -->
          <el-tab-pane label="账号设置" name="settings">
            <div class="tab-content">
              <el-card class="settings-card">
                <h3>基本信息</h3>
                <el-form :model="userInfo" label-width="80px">
                  <el-form-item label="昵称">
                    <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input 
                      v-model="userInfo.bio" 
                      type="textarea" 
                      :rows="3" 
                      placeholder="请输入个人简介" 
                    />
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveProfile">保存修改</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 编辑资料对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑资料" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname" />
        </el-form-item>
        <el-form-item label="个人简介">
          <el-input v-model="editForm.bio" type="textarea" :rows="3" />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEditDialog = false">取消</el-button>
        <el-button type="primary" @click="saveEditProfile">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Edit,
  Delete,
  View,
  Star,
  Calendar,
  Location,
  User,
  Plus
} from '@element-plus/icons-vue'

const router = useRouter()
const route = useRoute()

// 响应式数据
const activeTab = ref('posts')
const showEditDialog = ref(false)

// 用户信息
const userInfo = ref({
  nickname: '淮南文化爱好者',
  bio: '热爱淮南传统文化，喜欢探索非遗技艺',
  avatar: 'https://via.placeholder.com/120/409EFF/white?text=用户'
})

const userStats = ref({
  postCount: 5,
  collectionCount: 12,
  bookingCount: 3
})

// 我的帖子数据
const myPosts = ref([
  {
    id: 1,
    title: '探访八公山古战场',
    content: '这次探访让我深刻感受到淮南深厚的历史文化底蕴...',
    coverImage: 'https://via.placeholder.com/100/4CAF50/white?text=八公山',
    createTime: '2024-01-15',
    viewCount: 156,
    likeCount: 23
  },
  {
    id: 2,
    title: '学习豆腐制作技艺',
    content: '传统豆腐制作工艺的现代化传承...',
    coverImage: 'https://via.placeholder.com/100/2196F3/white?text=豆腐',
    createTime: '2024-01-10',
    viewCount: 89,
    likeCount: 15
  }
])

// 收藏数据
const collections = ref([
  {
    id: 1,
    title: '淮南王宫遗址',
    type: '文化遗产',
    image: 'https://via.placeholder.com/150/FF9800/white?text=王宫'
  },
  {
    id: 2,
    title: '非遗剪纸艺术',
    type: '手工艺',
    image: 'https://via.placeholder.com/150/F44336/white?text=剪纸'
  },
  {
    id: 3,
    title: '豆腐文化展',
    type: '活动',
    image: 'https://via.placeholder.com/150/4CAF50/white?text=豆腐展'
  }
])

// 预订数据
const bookings = ref([
  {
    id: 1,
    eventName: '淮南剪纸工作坊',
    eventDescription: '学习传统剪纸技艺，体验非遗文化',
    eventImage: 'https://via.placeholder.com/80/FF9800/white?text=剪纸',
    eventDate: '2024-01-20 14:00',
    eventLocation: '淮南文化馆',
    peopleCount: 2,
    status: 'confirmed'
  },
  {
    id: 2,
    eventName: '豆腐制作体验',
    eventDescription: '亲手制作传统豆腐，了解制作工艺',
    eventImage: 'https://via.placeholder.com/80/4CAF50/white?text=豆腐',
    eventDate: '2024-01-25 10:00',
    eventLocation: '传统豆腐坊',
    peopleCount: 1,
    status: 'pending'
  }
])

const editForm = ref({ ...userInfo.value })

// 方法
const editProfile = () => {
  editForm.value = { ...userInfo.value }
  showEditDialog.value = true
}

const saveEditProfile = () => {
  userInfo.value = { ...editForm.value }
  showEditDialog.value = false
  ElMessage.success('资料更新成功')
}

const saveProfile = () => {
  ElMessage.success('设置保存成功')
}

const editPost = (postId) => {
  ElMessage.info(`编辑帖子 ${postId}`)
}

const deletePost = async (postId) => {
  try {
    await ElMessageBox.confirm('确定删除这篇帖子吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    myPosts.value = myPosts.value.filter(post => post.id !== postId)
    ElMessage.success('帖子删除成功')
  } catch {
    // 用户取消删除
  }
}

const viewCollection = (item) => {
  if (item.type === '文化遗产') {
    router.push(`/heritage/${item.id}`)
  } else {
    ElMessage.info(`查看${item.type}: ${item.title}`)
  }
}

const cancelBooking = async (bookingId) => {
  try {
    await ElMessageBox.confirm('确定取消这个预订吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    bookings.value = bookings.value.filter(booking => booking.id !== bookingId)
    ElMessage.success('预订取消成功')
  } catch {
    // 用户取消操作
  }
}

const beforeAvatarUpload = (file) => {
  // 这里处理头像上传逻辑
  ElMessage.info('头像上传功能开发中')
  return false
}

// 生命周期
onMounted(() => {
  // 根据路由参数设置激活的标签页
  if (route.query.tab) {
    activeTab.value = route.query.tab
  }
})
</script>

<style scoped>
.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-header {
  margin-bottom: 20px;
}

.profile-content {
  margin-top: 20px;
}

/* 用户卡片样式 */
.user-card {
  text-align: center;
}

.user-avatar-section {
  padding: 20px 0;
}

.user-avatar {
  margin-bottom: 16px;
  border: 4px solid #f0f2f5;
}

.username {
  margin: 16px 0 8px;
  color: #303133;
  font-size: 1.5em;
}

.user-bio {
  color: #606266;
  margin-bottom: 16px;
  font-size: 14px;
}

.user-level {
  margin-bottom: 20px;
}

.user-stats {
  display: flex;
  justify-content: space-around;
  margin: 24px 0;
  padding: 20px 0;
  border-top: 1px solid #e6e6e6;
  border-bottom: 1px solid #e6e6e6;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 1.5em;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.edit-btn {
  width: 100%;
}

/* 标签页样式 */
.profile-tabs {
  margin-top: 0;
}

.tab-content {
  padding: 16px 0;
}

/* 帖子项样式 */
.post-item {
  margin-bottom: 16px;
}

.post-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 12px;
}

.post-info {
  flex: 1;
  margin-right: 16px;
}

.post-title {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 1.1em;
}

.post-excerpt {
  color: #606266;
  margin-bottom: 8px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.post-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.post-cover {
  width: 100px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.post-actions {
  text-align: right;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}
/* 收藏项样式 */
.collection-item {
  margin-bottom: 16px;
}

.collection-image {
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 4px 4px 0 0;
}

.collection-info {
  padding: 12px;
}

.collection-info h4 {
  margin: 0 0 8px 0;
  font-size: 14px;
}

.collection-type {
  font-size: 12px;
  color: #909399;
  margin-bottom: 12px;
}

/* 预订项样式 */
.booking-item {
  margin-bottom: 16px;
}

.booking-header {
  display: flex;
  gap: 16px;
  margin-bottom: 12px;
}

.booking-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border-radius: 4px;
}

.booking-info {
  flex: 1;
}

.booking-info h3 {
  margin: 0 0 8px 0;
  color: #303133;
}

.booking-desc {
  color: #606266;
  margin-bottom: 12px;
  font-size: 14px;
}

.booking-details {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.detail-item {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 12px;
  color: #909399;
}

.booking-status {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid #f0f0f0;
  padding-top: 12px;
}

/* 设置卡片样式 */
.settings-card {
  margin-bottom: 16px;
}

.settings-card h3 {
  margin-bottom: 16px;
  color: #303133;
}

.avatar-uploader {
  :deep(.el-upload) {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
  }
  
  :deep(.el-upload:hover) {
    border-color: var(--el-color-primary);
  }
}

.avatar-uploader .avatar {
  width: 120px;
  height: 120px;
  display: block;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 120px;
  height: 120px;
  text-align: center;
  line-height: 120px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .profile-content {
    margin-top: 0;
  }
  
  .post-header {
    flex-direction: column;
  }
  
  .post-cover {
    width: 100%;
    height: 120px;
    margin-top: 12px;
  }
  
  .booking-header {
    flex-direction: column;
  }
  
  .booking-image {
    width: 100%;
    height: 120px;
  }
  
  .user-stats {
    padding: 16px 0;
  }
}
</style>