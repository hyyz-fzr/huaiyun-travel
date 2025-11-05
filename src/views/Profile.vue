<template>
  <div class="profile-page">
    <div class="profile-container">
      <!-- 侧边栏菜单 -->
      <div class="profile-sidebar">
        <div class="user-card">
          <div class="user-avatar">
            <el-avatar :size="80" :src="userInfo.avatar" />
            <el-upload
              action="/api/upload"
              :show-file-list="false"
              :before-upload="beforeAvatarUpload"
              :on-success="handleAvatarSuccess"
              class="avatar-upload"
            >
              <el-button type="primary" circle :icon="Camera" size="small" />
            </el-upload>
          </div>
          <div class="user-info">
            <h3 class="username">{{ userInfo.username }}</h3>
            <p class="user-bio">{{ userInfo.bio || '这个人很懒，什么都没有写～' }}</p >
            <div class="user-stats">
              <div class="stat-item">
                <span class="stat-number">{{ userStats.postCount }}</span>
                <span class="stat-label">帖子</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userStats.followers }}</span>
                <span class="stat-label">粉丝</span>
              </div>
              <div class="stat-item">
                <span class="stat-number">{{ userStats.following }}</span>
                <span class="stat-label">关注</span>
              </div>
            </div>
          </div>
        </div>

        <el-menu
          :default-active="activeMenu"
          class="profile-menu"
          @select="handleMenuSelect"
        >
          <el-menu-item index="overview">
            <el-icon><User /></el-icon>
            <span>个人概览</span>
          </el-menu-item>
          <el-menu-item index="posts">
            <el-icon><Document /></el-icon>
            <span>我的帖子</span>
          </el-menu-item>
          <el-menu-item index="favorites">
            <el-icon><Star /></el-icon>
            <span>我的收藏</span>
          </el-menu-item>
          <el-menu-item index="bookings">
            <el-icon><Calendar /></el-icon>
            <span>活动预订</span>
          </el-menu-item>
          <el-menu-item index="orders">
            <el-icon><ShoppingBag /></el-icon>
            <span>我的订单</span>
          </el-menu-item>
          <el-menu-item index="security">
            <el-icon><Lock /></el-icon>
            <span>安全设置</span>
          </el-menu-item>
        </el-menu>
      </div>

      <!-- 主内容区域 -->
      <div class="profile-content">
        <router-view />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { userApi } from '@/api/user'
import { Camera, User, Document, Star, Calendar, ShoppingBag, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo || {})
const activeMenu = computed(() => route.name?.replace('Profile', '').toLowerCase() || 'overview')

const userStats = ref({
  postCount: 24,
  followers: 128,
  following: 56
})

const handleMenuSelect = (index) => {
  router.push(`/profile/${index}`)
}

const beforeAvatarUpload = (file) => {
  const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPGOrPNG) {
    ElMessage.error('头像只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('头像大小不能超过 2MB!')
    return false
  }
  return true
}

const handleAvatarSuccess = async (response) => {
  try {
    await uploadAvatar(response.data.url)
    userStore.updateUserInfo({ avatar: response.data.url })
    ElMessage.success('头像更新成功')
  } catch (error) {
    ElMessage.error('头像更新失败')
  }
}

onMounted(() => {
  if (!userStore.isLoggedIn) {
    router.push('/login')
    return
  }
})
</script>

<style scoped>
.profile-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.profile-container {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 30px;
}

.profile-sidebar {
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  height: fit-content;
  position: sticky;
  top: 100px;
}

.user-card {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
}

.user-avatar {
  position: relative;
  display: inline-block;
  margin-bottom: 16px;
}

.avatar-upload {
  position: absolute;
  bottom: 0;
  right: 0;
}

.username {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 1.3rem;
}

.user-bio {
  color: #606266;
  font-size: 0.9rem;
  margin: 0 0 20px 0;
  line-height: 1.4;
}

.user-stats {
  display: flex;
  justify-content: space-around;
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-number {
  font-size: 1.2rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 0.8rem;
  color: #909399;
}

.profile-menu {
  border: none;
}

:deep(.profile-menu .el-menu-item) {
  height: 50px;
  margin: 4px 0;
  border-radius: 8px;
}

:deep(.profile-menu .el-menu-item.is-active) {
  background-color: #409EFF;
  color: #fff;
}

.profile-content {
  min-height: 600px;
}

@media (max-width: 768px) {
  .profile-container {
    grid-template-columns: 1fr;
  }
  
  .profile-sidebar {
    position: static;
  }
}
</style>