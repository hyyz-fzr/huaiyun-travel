<template>
  <div class="register-page">
    <div class="register-container">
      <div class="register-card">
        <div class="register-header">
          <h2>加入淮韵游踪</h2>
          <p>开启您的文化探索之旅</p >
        </div>

        <el-form
          :model="registerForm"
          :rules="registerRules"
          ref="registerFormRef"
          class="register-form"
          @keyup.enter="handleRegister"
        >
          <el-form-item prop="username">
            <el-input
              v-model="registerForm.username"
              placeholder="请输入用户名（3-20个字符，支持中文、英文、数字和下划线）"
              aria-label="用户名"
              size="large"
              :prefix-icon="User"
            />
          </el-form-item>

          <el-form-item prop="email">
            <el-input
              v-model="registerForm.email"
              placeholder="请输入邮箱地址"
              aria-label="邮箱地址"
              size="large"
              :prefix-icon="Message"
            />
          </el-form-item>

          <el-form-item prop="phone">
            <el-input
              v-model="registerForm.phone"
              placeholder="请输入手机号码"
              aria-label="手机号码"
              size="large"
              :prefix-icon="Iphone"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="registerForm.password"
              type="password"
              placeholder="请输入密码（至少6位，包含大小写字母和数字）"
              aria-label="密码"
              size="large"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item prop="confirmPassword">
            <el-input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="请再次输入密码进行确认"
              aria-label="确认密码"
              size="large"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-form-item prop="agree">
            <el-checkbox v-model="registerForm.agree">
              我已阅读并同意
              <el-button 
                type="primary" 
                link 
                aria-label="查看用户协议"
                @click="showUserAgreement"
              >
                《用户协议》
              </el-button>
              和
              <el-button 
                type="primary" 
                link 
                aria-label="查看隐私政策"
                @click="showPrivacyPolicy"
              >
                《隐私政策》
              </el-button>
            </el-checkbox>
          </el-form-item>

          <el-form-item>
            <el-button
              type="primary"
              size="large"
              class="register-button"
              :loading="loading"
              aria-label="立即注册"
              @click="handleRegister"
            >
              {{ loading ? '注册中...' : '立即注册' }}
            </el-button>
          </el-form-item>
        </el-form>

        <div class="register-footer">
          <span>已有账号？</span>
          <el-button 
            type="primary" 
            link 
            aria-label="立即登录"
            @click="$router.push('/login')"
          >
            立即登录
          </el-button>
        </div>
      </div>

      <div class="register-banner">
        <div class="banner-content">
          <h3>为什么加入我们？</h3>
          <div class="benefits-list">
            <div class="benefit-item">
              <el-icon><Collection /></el-icon>
              <div class="benefit-content">
                <h4>探索文化遗产</h4>
                <p>深入了解淮南丰富的非物质文化遗产</p >
              </div>
            </div>
            <div class="benefit-item">
              <el-icon><ShoppingCart /></el-icon>
              <div class="benefit-content">
                <h4>购买文创产品</h4>
                <p>发现独具特色的淮南文化创意产品</p >
              </div>
            </div>
            <div class="benefit-item">
              <el-icon><ChatDotRound /></el-icon>
              <div class="benefit-content">
                <h4>加入文化社区</h4>
                <p>与文化爱好者交流分享学习心得</p >
              </div>
            </div>
            <div class="benefit-item">
              <el-icon><Calendar /></el-icon>
              <div class="benefit-content">
                <h4>参与文化活动</h4>
                <p>报名参加丰富多彩的文化体验活动</p >
              </div>
            </div>
          </div>
        </div>
        <!-- 这里可以放置一张淮南文化特色的背景图 -->
        <div class="banner-image"></div>
      </div>
    </div>

    <!-- 用户协议对话框 -->
    <el-dialog v-model="showAgreement" title="用户协议" width="70%">
      <user-agreement />
    </el-dialog>

    <!-- 隐私政策对话框 -->
    <el-dialog v-model="showPrivacy" title="隐私政策" width="70%">
      <privacy-policy />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import UserAgreement from '@/components/UserAgreement.vue'
import PrivacyPolicy from '@/components/PrivacyPolicy.vue'
import { User, Message, Iphone, Lock, Collection, ShoppingCart, ChatDotRound, Calendar } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const userStore = useUserStore()

const registerFormRef = ref()
const loading = ref(false)
const showAgreement = ref(false)
const showPrivacy = ref(false)

const registerForm = reactive({
  username: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  agree: false
})

// 修复验证函数 - 添加更好的错误处理
const validateUsername = (rule, value, callback) => {
  try {
    if (!value || value.trim() === '') {
      callback(new Error('请输入用户名'))
    } else if (value.length < 3 || value.length > 20) {
      callback(new Error('用户名长度在 3 到 20 个字符'))
    } else if (!/^[a-zA-Z0-9_\u4e00-\u9fa5]+$/.test(value)) {
      callback(new Error('用户名只能包含中文、英文、数字和下划线'))
    } else {
      callback()
    }
  } catch (error) {
    callback(new Error('用户名验证失败'))
  }
}

const validatePassword = (rule, value, callback) => {
  try {
    if (!value) {
      callback(new Error('请输入密码'))
    } else if (value.length < 6) {
      callback(new Error('密码长度不能少于 6 位'))
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(value)) {
      callback(new Error('密码必须包含大小写字母和数字'))
    } else {
      callback()
    }
  } catch (error) {
    callback(new Error('密码验证失败'))
  }
}

const validateConfirmPassword = (rule, value, callback) => {
  try {
    if (!value) {
      callback(new Error('请确认密码'))
    } else if (value !== registerForm.password) {
      callback(new Error('两次输入的密码不一致'))
    } else {
      callback()
    }
  } catch (error) {
    callback(new Error('密码确认验证失败'))
  }
}

// 修复验证规则 - 添加必填验证作为第一层防护
const registerRules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { validator: validateUsername, trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱地址', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { validator: validatePassword, trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' }
  ],
  agree: [
    { 
      validator: (rule, value, callback) => {
        try {
          if (!value) {
            callback(new Error('请同意用户协议和隐私政策'))
          } else {
            callback()
          }
        } catch (error) {
          callback(new Error('协议验证失败'))
        }
      },
      trigger: 'change'
    }
  ]
}

const handleRegister = async () => {
  if (!registerFormRef.value) return

  try {
    const valid = await registerFormRef.value.validate()
    if (!valid) return

    loading.value = true
    
    // 调用注册接口
    await userStore.register({
      username: registerForm.username,
      email: registerForm.email,
      phone: registerForm.phone,
      password: registerForm.password
    })
    
    ElMessage.success('注册成功！请登录')
    router.push('/login')
  } catch (error) {
    ElMessage.error(error.message || '注册失败，请重试')
  } finally {
    loading.value = false
  }
}

const showUserAgreement = () => {
  showAgreement.value = true
}

const showPrivacyPolicy = () => {
  showPrivacy.value = true
}
</script>

<style scoped>
.register-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.register-container {
  display: grid;
  grid-template-columns: 450px 500px;
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  max-height: 90vh;
  overflow-y: auto;
}

.register-card {
  padding: 50px 40px;
}

.register-header {
  text-align: center;
  margin-bottom: 40px;
}

.register-header h2 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 2rem;
  font-weight: bold;
}

.register-header p {
  margin: 0;
  color: #909399;
  font-size: 1rem;
}

.register-form {
  margin-bottom: 30px;
}

:deep(.register-form .el-input__wrapper) {
  border-radius: 12px;
}

:deep(.register-form .el-input__inner) {
  padding: 12px 16px;
}

:deep(.register-form .el-checkbox) {
  align-items: flex-start;
}

:deep(.register-form .el-checkbox__label) {
  white-space: normal;
  line-height: 1.4;
}

.register-button {
  width: 100%;
  border-radius: 12px;
  height: 48px;
  font-size: 1rem;
  font-weight: bold;
  margin-top: 10px;
}

.register-footer {
  text-align: center;
  color: #606266;
  font-size: 0.9rem;
}

.register-banner {
  position: relative;
  background: linear-gradient(135deg, #E6A23C 0%, #F56C6C 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  overflow: hidden;
}

.banner-content {
  position: relative;
  z-index: 2;
  padding: 40px;
}

.banner-content h3 {
  font-size: 1.8rem;
  margin: 0 0 30px 0;
  font-weight: bold;
  text-align: center;
}

.benefits-list {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.benefit-item {
  display: flex;
  align-items: flex-start;
  gap: 16px;
}

.benefit-item .el-icon {
  font-size: 1.5rem;
  margin-top: 4px;
  flex-shrink: 0;
}

.benefit-content h4 {
  margin: 0 0 8px 0;
  font-size: 1.1rem;
  font-weight: bold;
}

.benefit-content p {
  margin: 0;
  opacity: 0.9;
  line-height: 1.4;
  font-size: 0.9rem;
}

.banner-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, rgba(230, 162, 60, 0.8) 0%, rgba(245, 108, 108, 0.8) 100%);
  opacity: 0.3;
}

@media (max-width: 768px) {
  .register-container {
    grid-template-columns: 1fr;
    max-width: 450px;
  }
  
  .register-banner {
    display: none;
  }
  
  .register-card {
    padding: 40px 24px;
  }
}
</style>