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
        placeholder="搜索文化遗产、文创产品、社区帖子..."
        class="search-input"
        @keyup.enter="handleSearch"
      >
        <template #append>
          <el-button :icon="Search" @click="handleSearch" />
        </template>
      </el-input>
    </div>

    <div class="header-right">
      <div class="nav-items">
        <el-button link @click="$router.push('/')">
          <el-icon><HomeFilled /></el-icon>
          首页
        </el-button>
        
        <el-dropdown v-if="userStore.isLoggedIn">
          <span class="user-info">
            <el-avatar :size="32" :src="userStore.userInfo?.avatar || ''" />
            <span class="username">{{ userStore.userInfo?.username }}</span>
            <el-icon><ArrowDown /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="$router.push('/profile')">
                <el-icon><User /></el-icon>
                个人中心
              </el-dropdown-item>
              <el-dropdown-item @click="$router.push('/my-posts')">
                <el-icon><Document /></el-icon>
                我的帖子
              </el-dropdown-item>
              <el-dropdown-item @click="$router.push('/favorites')">
                <el-icon><Star /></el-icon>
                我的收藏
              </el-dropdown-item>
              <el-dropdown-item divided @click="handleLogout">
                <el-icon><SwitchButton /></el-icon>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <div v-else class="auth-buttons">
          <el-button @click="$router.push('/login')">登录</el-button>
          <el-button type="primary" @click="$router.push('/register')">注册</el-button>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { 
  Search, 
  HomeFilled, 
  User, 
  Document, 
  Star, 
  SwitchButton,
  ArrowDown 
} from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const searchKeyword = ref('')

const handleSearch = () => {
  if (searchKeyword.value.trim()) {
    router.push({
      path: '/search',
      query: { keyword: searchKeyword.value.trim() }
    })
    searchKeyword.value = ''
  }
}

const handleLogout = () => {
  userStore.logout()
  router.push('/login')
}
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 60px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  z-index: 1000;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

  .header-left {
    flex: 0 0 auto;
  }

  .header-center {
    flex: 1;
    max-width: 400px;
    margin: 0 20px;
  }

  .header-right {
    flex: 0 0 auto;
  }
}

.logo {
  display: flex;
  align-items: center;
  cursor: pointer;

  img {
    width: 36px;
    height: 36px;
    margin-right: 10px;
  }

  .logo-text {
    font-size: 20px;
    font-weight: bold;
    color: white;
  }
}

.search-input {
  :deep(.el-input-group__append) {
    background-color: #409eff;
    border-color: #409eff;
    color: white;
  }
}

.nav-items {
  display: flex;
  align-items: center;
  gap: 15px;

  .el-button {
    color: white;
    border: none;

    &:hover {
      background-color: rgba(255, 255, 255, 0.1);
    }
  }
}

.user-info {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: background-color 0.3s;

  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .username {
    font-size: 14px;
    color: white;
  }
}

.auth-buttons {
  display: flex;
  gap: 10px;

  .el-button {
    &:first-child {
      color: white;
      border-color: white;

      &:hover {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .header {
    padding: 0 10px;

    .header-center {
      margin: 0 10px;
      max-width: 200px;
    }

    .logo-text {
      display: none;
    }

    .username {
      display: none;
    }
  }
}
</style>