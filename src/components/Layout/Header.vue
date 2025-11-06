<template>
  <header class="header">
    <div class="header-left">
      <div class="logo">
        <img src="@/assets/logo.png" alt="淮韵游踪" />
        <span class="logo-text">淮韵游踪</span>
      </div>
    </div>

    <div class="header-center">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索文化遗产、文创产品、社区内容..."
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </div>

    <div class="header-right">
      <div class="user-actions">
        <el-button v-if="!isLoggedIn" type="primary" @click="$router.push('/login')">
          登录
        </el-button>
        <el-dropdown v-else>
          <span class="user-info">
            <el-avatar :size="32" :src="userStore.avatar" />
            <span class="username">{{ userStore.username }}</span>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">个人中心</el-dropdown-item>
              <el-dropdown-item @click="handleLogout">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { Search } from '@element-plus/icons-vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()
const searchKeyword = ref('')

const isLoggedIn = userStore.isLoggedIn

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    // 执行搜索逻辑
    console.log('搜索关键词:', searchKeyword.value)
  }
}

const handleLogout = async () => {
  try {
    await ElMessageBox.confirm('确定要退出登录吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    userStore.logout()
    ElMessage.success('已退出登录')
    router.push('/')
  } catch (error) {
    // 用户取消退出
  }
}
</script>

<style scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  height: 60px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
}

.logo img {
  height: 32px;
}

.logo-text {
  font-size: 18px;
  font-weight: bold;
  color: #8B4513;
}

.search-input {
  width: 400px;
}

.user-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.username {
  font-size: 14px;
}
</style>