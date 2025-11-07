<template>
<<<<<<< HEAD
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
=======
  <div class="register-container">
    <div class="register-form">
      <div class="form-header">
        <h2>加入淮韵游踪</h2>
        <p>开启您的文化探索之旅</p >
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
      </div>

      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名" />
        </el-form-item>
        <el-form-item>
          <el-input placeholder="请输入邮箱" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%">注册</el-button>
        </el-form-item>
      </el-form>

      <div class="form-footer">
        <span>已有账号？</span>
        <el-button type="primary" link @click="$router.push('/login')">立即登录</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
<<<<<<< HEAD
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
=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
</script>

<style scoped>
.register-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.register-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
}
.form-header {
  text-align: center;
  margin-bottom: 30px;
}
.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #909399;
}
</style>