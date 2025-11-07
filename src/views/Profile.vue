<template>
<<<<<<< HEAD
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
=======
  <div class="profile-container">
    <div class="profile-header">
      <h1>个人中心</h1>
      <p>管理您的账户信息和偏好设置</p >
    </div>
    
    <div class="profile-content">
      <el-card>
        <template #header>
          <h3>基本信息</h3>
        </template>
        <p>用户名: {{ userInfo?.username }}</p >
        <p>邮箱: {{ userInfo?.email }}</p >
        <p>角色: {{ userInfo?.role }}</p >
      </el-card>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
    </div>
  </div>
</template>

<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()
const userInfo = userStore.userInfo
</script>

<style scoped>
.profile-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.profile-header {
  text-align: center;
  margin-bottom: 40px;
}
</style>
