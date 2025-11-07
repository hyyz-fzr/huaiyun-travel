<template>
  <div class="security-page">
    <div class="page-header">
      <h1>安全设置</h1>
      <p>管理您的账户安全设置</p >
    </div>

    <el-row :gutter="24">
      <!-- 左侧：安全选项 -->
      <el-col :xs="24" :lg="16">
        <el-card class="security-card">
          <template #header>
            <span>安全选项</span>
          </template>

          <el-form :model="securityForm" label-width="120px">
            <!-- 密码修改 -->
            <el-form-item label="修改密码">
              <el-button type="primary" @click="showPasswordDialog = true">
                修改登录密码
              </el-button>
              <div class="form-tip">定期修改密码有助于保护账户安全</div>
            </el-form-item>

            <!-- 手机验证 -->
            <el-form-item label="手机验证">
              <div class="verify-item">
                <span class="verify-info">已绑定手机：{{ userInfo.phone || '"'"'未绑定'"'"' }}</span>
                <el-button 
                  type="text" 
                  @click="showPhoneDialog = true"
                >
                  {{ userInfo.phone ? '"'"'更换'"'"' : '"'"'绑定'"'"' }}
                </el-button>
              </div>
            </el-form-item>

            <!-- 邮箱验证 -->
            <el-form-item label="邮箱验证">
              <div class="verify-item">
                <span class="verify-info">已绑定邮箱：{{ userInfo.email || '"'"'未绑定'"'"' }}</span>
                <el-button 
                  type="text" 
                  @click="showEmailDialog = true"
                >
                  {{ userInfo.email ? '"'"'更换'"'"' : '"'"'绑定'"'"' }}
                </el-button>
              </div>
            </el-form-item>

            <!-- 登录设备管理 -->
            <el-form-item label="登录设备">
              <el-button type="text" @click="showDeviceDialog = true">
                管理登录设备
              </el-button>
              <div class="form-tip">查看和管理已登录的设备</div>
            </el-form-item>

            <!-- 安全通知 -->
            <el-form-item label="安全通知">
              <el-switch
                v-model="securityForm.securityNotifications"
                active-text="开启"
                inactive-text="关闭"
              />
              <div class="form-tip">重要操作时接收安全通知</div>
            </el-form-item>

            <!-- 登录保护 -->
            <el-form-item label="登录保护">
              <el-switch
                v-model="securityForm.loginProtection"
                active-text="开启"
                inactive-text="关闭"
              />
              <div class="form-tip">开启后需要验证身份才能登录</div>
            </el-form-item>

            <!-- 操作确认 -->
            <el-form-item label="操作确认">
              <el-switch
                v-model="securityForm.operationConfirm"
                active-text="开启"
                inactive-text="关闭"
              />
              <div class="form-tip">重要操作需要二次确认</div>
            </el-form-item>
          </el-form>
        </el-card>

        <!-- 安全日志 -->
        <el-card class="log-card" style="margin-top: 20px;">
          <template #header>
            <span>安全日志</span>
            <el-button type="text" @click="refreshLogs">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </template>

          <el-timeline>
            <el-timeline-item
              v-for="log in securityLogs"
              :key="log.id"
              :timestamp="log.time"
              :type="getLogType(log.type)"
              :hollow="log.type === '"'"'warning'"'"'"
            >
              <div class="log-item">
                <span class="log-action">{{ log.action }}</span>
                <el-tag v-if="log.ip" size="small" type="info">{{ log.ip }}</el-tag>
                <el-tag v-if="log.location" size="small">{{ log.location }}</el-tag>
              </div>
              <div class="log-detail" v-if="log.detail">{{ log.detail }}</div>
            </el-timeline-item>
          </el-timeline>

          <div class="log-empty" v-if="securityLogs.length === 0">
            <el-empty description="暂无安全日志" />
          </div>
        </el-card>
      </el-col>

      <!-- 右侧：安全状态 -->
      <el-col :xs="24" :lg="8">
        <el-card class="status-card">
          <template #header>
            <span>安全状态</span>
          </template>

          <div class="security-status">
            <div class="status-item">
              <div class="status-icon" :class="getStatusClass('"'"'password'"'"')">
                <el-icon><Lock /></el-icon>
              </div>
              <div class="status-info">
                <div class="status-title">密码强度</div>
                <div class="status-value">{{ passwordStrength }}</div>
                <el-progress 
                  :percentage="passwordScore" 
                  :status="passwordScore > 80 ? '"'"'success'"'"' : passwordScore > 60 ? '"'"''"'"' : '"'"'exception'"'"'"
                  style="width: 100px;"
                />
              </div>
            </div>

            <div class="status-item">
              <div class="status-icon" :class="getStatusClass('"'"'phone'"'"')">
                <el-icon><Iphone /></el-icon>
              </div>
              <div class="status-info">
                <div class="status-title">手机验证</div>
                <div class="status-value">{{ userInfo.phone ? '"'"'已绑定'"'"' : '"'"'未绑定'"'"' }}</div>
                <el-tag :type="userInfo.phone ? '"'"'success'"'"' : '"'"'warning'"'"'" size="small">
                  {{ userInfo.phone ? '"'"'安全'"'"' : '"'"'建议绑定'"'"' }}
                </el-tag>
              </div>
            </div>

            <div class="status-item">
              <div class="status-icon" :class="getStatusClass('"'"'email'"'"')">
                <el-icon><Message /></el-icon>
              </div>
              <div class="status-info">
                <div class="status-title">邮箱验证</div>
                <div class="status-value">{{ userInfo.email ? '"'"'已绑定'"'"' : '"'"'未绑定'"'"' }}</div>
                <el-tag :type="userInfo.email ? '"'"'success'"'"' : '"'"'info'"'"'" size="small">
                  {{ userInfo.email ? '"'"'安全'"'"' : '"'"'可选'"'"' }}
                </el-tag>
              </div>
            </div>

            <div class="status-item">
              <div class="status-icon" :class="getStatusClass('"'"'device'"'"')">
                <el-icon><Monitor /></el-icon>
              </div>
              <div class="status-info">
                <div class="status-title">登录设备</div>
                <div class="status-value">{{ deviceCount }} 台设备</div>
                <el-tag type="info" size="small">正常</el-tag>
              </div>
            </div>
          </div>

          <el-divider />

          <div class="security-score">
            <div class="score-title">安全评分</div>
            <div class="score-value">{{ totalScore }}/100</div>
            <el-progress 
              :percentage="totalScore" 
              :stroke-width="12"
              :color="totalScore > 80 ? '#67c23a' : totalScore > 60 ? '#e6a23c' : '#f56c6c'"
            />
            <div class="score-tip">
              {{ getScoreTip(totalScore) }}
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <!-- 修改密码对话框 -->
    <el-dialog v-model="showPasswordDialog" title="修改密码" width="400px">
      <el-form :model="passwordForm" :rules="passwordRules" ref="passwordFormRef" label-width="80px">
        <el-form-item label="原密码" prop="oldPassword">
          <el-input 
            v-model="passwordForm.oldPassword" 
            type="password" 
            placeholder="请输入原密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input 
            v-model="passwordForm.newPassword" 
            type="password" 
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword">
          <el-input 
            v-model="passwordForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPasswordDialog = false">取消</el-button>
        <el-button type="primary" @click="changePassword" :loading="changingPassword">确认修改</el-button>
      </template>
    </el-dialog>

    <!-- 绑定手机对话框 -->
    <el-dialog v-model="showPhoneDialog" :title="userInfo.phone ? '"'"'更换手机'"'"' : '"'"'绑定手机'"'"'" width="400px">
      <el-form :model="phoneForm" label-width="80px">
        <el-form-item label="手机号码">
          <el-input v-model="phoneForm.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="verify-code-input">
            <el-input v-model="phoneForm.code" placeholder="请输入验证码" />
            <el-button type="primary" :disabled="codeCountdown > 0" @click="sendPhoneCode">
              {{ codeCountdown > 0 ? `${codeCountdown}秒后重试` : '"'"'获取验证码'"'"' }}
            </el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showPhoneDialog = false">取消</el-button>
        <el-button type="primary" @click="bindPhone">确认</el-button>
      </template>
    </el-dialog>

    <!-- 绑定邮箱对话框 -->
    <el-dialog v-model="showEmailDialog" :title="userInfo.email ? '"'"'更换邮箱'"'"' : '"'"'绑定邮箱'"'"'" width="400px">
      <el-form :model="emailForm" label-width="80px">
        <el-form-item label="邮箱地址">
          <el-input v-model="emailForm.email" placeholder="请输入邮箱地址" />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="verify-code-input">
            <el-input v-model="emailForm.code" placeholder="请输入验证码" />
            <el-button type="primary" @click="sendEmailCode">获取验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showEmailDialog = false">取消</el-button>
        <el-button type="primary" @click="bindEmail">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from '"'"'vue'"'"'
import { ElMessage, ElMessageBox } from '"'"'element-plus'"'"'
import { Refresh, Lock, Iphone, Message, Monitor } from '"'"'@element-plus/icons-vue'"'"'

const showPasswordDialog = ref(false)
const showPhoneDialog = ref(false)
const showEmailDialog = ref(false)
const showDeviceDialog = ref(false)
const changingPassword = ref(false)
const codeCountdown = ref(0)

// 表单数据
const securityForm = ref({
  securityNotifications: true,
  loginProtection: false,
  operationConfirm: true
})

const passwordForm = ref({
  oldPassword: '"'"''"'"',
  newPassword: '"'"''"'"',
  confirmPassword: '"'"''"'"'
})

const phoneForm = ref({
  phone: '"'"''"'"',
  code: '"'"''"'"'
})

const emailForm = ref({
  email: '"'"''"'"',
  code: '"'"''"'"'
})

// 用户信息
const userInfo = ref({
  phone: '"'"'138****1234'"'"',
  email: '"'"'user@example.com'"'"'
})

// 安全日志
const securityLogs = ref([
  {
    id: 1,
    action: '"'"'登录成功'"'"',
    time: '"'"'2024-01-20 10:30:00'"'"',
    type: '"'"'success'"'"',
    ip: '"'"'192.168.1.100'"'"',
    location: '"'"'安徽淮南'"'"',
    detail: '"'"'通过密码登录'"'"'
  },
  {
    id: 2,
    action: '"'"'修改密码'"'"',
    time: '"'"'2024-01-19 15:20:00'"'"',
    type: '"'"'info'"'"',
    ip: '"'"'192.168.1.100'"'"',
    location: '"'"'安徽淮南'"'"'
  },
  {
    id: 3,
    action: '"'"'异常登录尝试'"'"',
    time: '"'"'2024-01-18 22:15:00'"'"',
    type: '"'"'warning'"'"',
    ip: '"'"'103.25.68.150'"'"',
    location: '"'"'北京'"'"',
    detail: '"'"'密码错误次数过多'"'"'
  }
])

// 计算属性
const passwordStrength = computed(() => {
  const score = passwordScore.value
  if (score >= 80) return '"'"'强'"'"'
  if (score >= 60) return '"'"'中'"'"'
  return '"'"'弱'"'"'
})

const passwordScore = computed(() => {
  // 模拟密码强度计算
  return 75
})

const deviceCount = computed(() => {
  return 2
})

const totalScore = computed(() => {
  let score = 0
  score += passwordScore.value * 0.4
  score += userInfo.value.phone ? 30 : 0
  score += userInfo.value.email ? 20 : 0
  score += securityForm.value.loginProtection ? 10 : 0
  return Math.min(100, Math.round(score))
})

// 方法
const getStatusClass = (type) => {
  const classMap = {
    password: passwordScore.value > 60 ? '"'"'status-safe'"'"' : '"'"'status-warning'"'"',
    phone: userInfo.value.phone ? '"'"'status-safe'"'"' : '"'"'status-warning'"'"',
    email: userInfo.value.email ? '"'"'status-safe'"'"' : '"'"'status-info'"'"',
    device: '"'"'status-safe'"'"'
  }
  return classMap[type] || '"'"'status-info'"'"'
}

const getLogType = (type) => {
  const typeMap = {
    success: '"'"'success'"'"',
    warning: '"'"'warning'"'"',
    info: '"'"'info'"'"',
    danger: '"'"'danger'"'"'
  }
  return typeMap[type] || '"'"''"'"'
}

const getScoreTip = (score) => {
  if (score >= 80) return '"'"'您的账户安全性很高，继续保持！'"'"'
  if (score >= 60) return '"'"'账户安全性一般，建议完善安全设置'"'"'
  return '"'"'账户安全性较低，请立即完善安全设置'"'"'
}

const refreshLogs = () => {
  ElMessage.success('"'"'安全日志已刷新'"'"')
}

const changePassword = async () => {
  changingPassword.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('"'"'密码修改成功'"'"')
    showPasswordDialog.value = false
    passwordForm.value = {
      oldPassword: '"'"''"'"',
      newPassword: '"'"''"'"',
      confirmPassword: '"'"''"'"'
    }
    
    // 记录安全日志
    securityLogs.value.unshift({
      id: Date.now(),
      action: '"'"'修改密码'"'"',
      time: new Date().toLocaleString('"'"'zh-CN'"'"'),
      type: '"'"'info'"'"',
      ip: '"'"'192.168.1.100'"'"',
      location: '"'"'安徽淮南'"'"'
    })
  } catch (error) {
    ElMessage.error('"'"'密码修改失败'"'"')
  } finally {
    changingPassword.value = false
  }
}

const sendPhoneCode = () => {
  codeCountdown.value = 60
  const timer = setInterval(() => {
    codeCountdown.value--
    if (codeCountdown.value <= 0) {
      clearInterval(timer)
    }
  }, 1000)
  ElMessage.success('"'"'验证码已发送'"'"')
}

const bindPhone = () => {
  ElMessage.success('"'"'手机绑定成功'"'"')
  showPhoneDialog.value = false
  userInfo.value.phone = phoneForm.value.phone
}

const sendEmailCode = () => {
  ElMessage.success('"'"'验证码已发送到邮箱'"'"')
}

const bindEmail = () => {
  ElMessage.success('"'"'邮箱绑定成功'"'"')
  showEmailDialog.value = false
  userInfo.value.email = emailForm.value.email
}

// 密码验证规则
const passwordRules = {
  oldPassword: [
    { required: true, message: '"'"'请输入原密码'"'"', trigger: '"'"'blur'"'"' }
  ],
  newPassword: [
    { required: true, message: '"'"'请输入新密码'"'"', trigger: '"'"'blur'"'"' },
    { min: 6, message: '"'"'密码长度不能少于6位'"'"', trigger: '"'"'blur'"'"' }
  ],
  confirmPassword: [
    { required: true, message: '"'"'请确认新密码'"'"', trigger: '"'"'blur'"'"' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.value.newPassword) {
          callback(new Error('"'"'两次输入密码不一致'"'"'))
        } else {
          callback()
        }
      },
      trigger: '"'"'blur'"'"'
    }
  ]
}

onMounted(() => {
  console.log('"'"'安全设置页面已加载'"'"')
})
</script>

<style scoped>
.security-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 2.2em;
}

.page-header p {
  color: #606266;
  font-size: 1.1em;
  margin: 0;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.verify-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}

.verify-info {
  color: #606266;
}

.verify-code-input {
  display: flex;
  gap: 8px;
}

.verify-code-input .el-input {
  flex: 1;
}

/* 安全状态样式 */
.security-status {
  space-y: 20px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px;
  border-radius: 8px;
  background: #f8f9fa;
}

.status-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: white;
}

.status-safe {
  background: #67c23a;
}

.status-warning {
  background: #e6a23c;
}

.status-info {
  background: #909399;
}

.status-danger {
  background: #f56c6c;
}

.status-info {
  flex: 1;
}

.status-title {
  font-weight: 600;
  color: #303133;
  margin-bottom: 4px;
}

.status-value {
  color: #606266;
  font-size: 14px;
  margin-bottom: 8px;
}

/* 安全评分 */
.security-score {
  text-align: center;
}

.score-title {
  font-size: 16px;
  color: #606266;
  margin-bottom: 8px;
}

.score-value {
  font-size: 32px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 16px;
}

.score-tip {
  margin-top: 12px;
  color: #909399;
  font-size: 14px;
}

/* 安全日志 */
.log-item {
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 4px;
}

.log-action {
  font-weight: 500;
  color: #303133;
}

.log-detail {
  color: #909399;
  font-size: 12px;
  margin-top: 2px;
}

.log-empty {
  padding: 40px 0;
}

:deep(.el-timeline-item__node) {
  width: 12px;
  height: 12px;
}
</style>