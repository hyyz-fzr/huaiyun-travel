<template>
<<<<<<< HEAD
  <header class="header">
    <div class="header-left">
      <div class="logo">
        < img src="@/assets/logo.png" alt="淮韵游踪" />
        <span class="logo-text">淮韵游踪</span>
=======
  <header class="app-header">
    <div class="header-container">
      <div class="logo-section">
        <h1 class="logo">淮韵游踪</h1>
        <span class="slogan">淮南文化数字传承平台</span>
      </div>
      
      <div class="nav-section">
        <el-menu mode="horizontal" :default-active="activeIndex" router>
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/heritage/list">文化遗产</el-menu-item>
          <el-menu-item index="/products/list">文创产品</el-menu-item>
          <el-menu-item index="/posts/list">文化社区</el-menu-item>
        </el-menu>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
      </div>

<<<<<<< HEAD
    <div class="header-center">
      <el-input
        id="headerSearch"
        name="headerSearch"
        v-model="searchKeyword"
        placeholder="搜索文化遗产、文创产品、社区内容..."
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
=======
      <div class="user-section">
        <template v-if="!userStore.isLoggedIn">
          <el-button @click="$router.push('/login')" type="primary">登录</el-button>
          <el-button @click="$router.push('/register')">注册</el-button>
        </template>
        <template v-else>
          <el-dropdown>
            <span class="user-info">
              <el-avatar :size="32" :src="userStore.userInfo?.avatar" />
              <span>{{ userStore.userInfo?.username }}</span>
            </span>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item @click="$router.push('/profile')">个人中心</el-dropdown-item>
                <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
        </template>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const activeIndex = ref('/')

const handleLogout = () => {
  userStore.logout()
  router.push('/')
}
</script>

<style scoped>
.app-header {
  background: white;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}
.header-container {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
}
.logo-section {
  display: flex;
  align-items: center;
}
.logo {
  font-size: 1.5rem;
  font-weight: bold;
  color: #409EFF;
  margin: 0;
  margin-right: 10px;
}
.slogan {
  color: #909399;
  font-size: 0.9rem;
}
.nav-section {
  flex: 1;
  display: flex;
  justify-content: center;
}
.user-section {
  display: flex;
  align-items: center;
  gap: 10px;
}
.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 5px 10px;
  border-radius: 4px;
  transition: background-color 0.3s;
}
.user-info:hover {
  background-color: #f5f7fa;
}
</style>