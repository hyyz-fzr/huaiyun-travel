<template>
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