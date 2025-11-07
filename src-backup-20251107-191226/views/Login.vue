<template>
  <div class="login-container">
    <div class="login-background">
      <div class="login-overlay"></div>
    </div>
    
    <div class="login-form-container">
      <el-card class="login-card">
        <template #header>
          <div class="login-header">
            <img src="@/assets/logo.png" alt="淮韵游踪" class="login-logo" />
            <h2 class="login-title">欢迎回来</h2>
            <p class="login-subtitle">登录您的账户继续探索淮南文化</p >
          </div>
        </template>

        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="loginRules"
          size="large"
          @keyup.enter="handleLogin"
        >
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              placeholder="请输入用户名或邮箱"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              placeholder="请输入密码"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item prop="remember" class="remember-item">
            <el-checkbox v-model="loginForm.remember">
              记住我
            </el-checkbox>
            <el-button link type="primary" class="forgot-password">
              忘记密码？
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="login-button"
              :loading="loading"
              @click="handleLogin"
            >
              {{ loading ? '登录中...' : '登录' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="login-footer">
          <p class="register-text">
            还没有账户？
            <el-button link type="primary" @click="$router.push('/register')">
              立即注册
            </el-button>
          </p >
          
          <el-divider>或使用以下方式登录</el-divider>
          
          <div class="social-login">
            <el-button class="social-button wechat">
              <el-icon><ChatDotRound /></el-icon>
              微信
            </el-button>
            <el-button class="social-button qq">
              <el-icon><ChatLineRound /></el-icon>
              QQ
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { ElMessage } from 'element-plus'
import { User, Lock, ChatDotRound, ChatLineRound } from '@element-plus/icons-vue'

const router = useRouter()
const userStore = useUserStore()

const loginFormRef = ref()
const loading = ref(false)

const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

const loginRules = {
  username: [
    { required: true, message: '请输入用户名或邮箱', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

onMounted(() => {
  // 检查本地存储的记住我信息
  const savedUsername = localStorage.getItem('savedUsername')
  if (savedUsername) {
    loginForm.username = savedUsername
    loginForm.remember = true
  }
})

const handleLogin = async () => {
  if (!loginFormRef.value) return

  try {
    await loginFormRef.value.validate()
    loading.value = true

    // 调用登录接口
    await userStore.login({
      username: loginForm.username,
      password: loginForm.password
    })

    // 处理记住我
    if (loginForm.remember) {
      localStorage.setItem('savedUsername', loginForm.username)
    } else {
      localStorage.removeItem('savedUsername')
    }

    // 登录成功，跳转到首页或原页面
    const redirect = router.currentRoute.value.query.redirect || '/'
    router.push(redirect)
    
  } catch (error) {
    console.error('登录失败:', error)
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

.login-background {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('@/assets/images/login-bg.jpg');
  background-size: cover;
  background-position: center;
}

.login-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
}

.login-form-container {
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 400px;
  padding: 20px;
}

.login-card {
  border-radius: 12px;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  border: none;

  :deep(.el-card__header) {
    padding: 40px 40px 20px;
    border-bottom: 1px solid #f0f0f0;
  }

  :deep(.el-card__body) {
    padding: 20px 40px 40px;
  }
}

.login-header {
  text-align: center;
}

.login-logo {
  width: 60px;
  height: 60px;
  margin-bottom: 16px;
}

.login-title {
  font-size: 1.8em;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.login-subtitle {
  color: #606266;
  font-size: 0.9em;
}

.remember-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0;

  :deep(.el-form-item__content) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}

.forgot-password {
  padding: 0;
  height: auto;
}

.login-button {
  width: 100%;
  height: 48px;
  font-size: 1.1em;
  border-radius: 8px;
}

.login-footer {
  text-align: center;
}

.register-text {
  color: #606266;
  margin-bottom: 20px;
}

.social-login {
  display: flex;
  gap: 12px;
  justify-content: center;
}

.social-button {
  flex: 1;
  border: 1px solid #dcdfe6;
  background: white;
  color: #606266;
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  &.wechat:hover {
    border-color: #07c160;
    color: #07c160;
  }

  &.qq:hover {
    border-color: #12b7f5;
    color: #12b7f5;
  }
}

// 响应式设计
@media (max-width: 480px) {
  .login-form-container {
    padding: 10px;
  }

  .login-card {
    :deep(.el-card__header) {
      padding: 30px 20px 15px;
    }

    :deep(.el-card__body) {
      padding: 15px 20px 30px;
    }
  }
}
</style>
