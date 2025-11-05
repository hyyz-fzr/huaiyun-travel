<template>
  <div class="security-settings">
    <div class="page-header">
      <h2>安全设置</h2>
      <p>管理您的账户安全选项</p >
    </div>

    <div class="settings-content">
      <el-card class="setting-section">
        <template #header>
          <div class="section-header">
            <h3>密码修改</h3>
          </div>
        </template>
        
        <el-form 
          :model="passwordForm" 
          :rules="passwordRules" 
          ref="passwordFormRef"
          label-width="120px"
        >
          <el-form-item label="当前密码" prop="currentPassword">
            <el-input 
              v-model="passwordForm.currentPassword" 
              type="password"
              placeholder="请输入当前密码"
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
          
          <el-form-item label="确认新密码" prop="confirmPassword">
            <el-input 
              v-model="passwordForm.confirmPassword" 
              type="password"
              placeholder="请再次输入新密码"
              show-password
            />
          </el-form-item>
          
          <el-form-item>
            <el-button type="primary" @click="updatePassword">
              修改密码
            </el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="setting-section">
        <template #header>
          <div class="section-header">
            <h3>手机绑定</h3>
          </div>
        </template>
        
        <div class="phone-setting">
          <div class="phone-info">
            <span class="label">当前绑定手机：</span>
            <span class="phone-number">138****1234</span>
          </div>
          <el-button type="primary" text @click="showChangePhone = true">
            更换手机号
          </el-button>
        </div>
      </el-card>

      <el-card class="setting-section">
        <template #header>
          <div class="section-header">
            <h3>登录设备管理</h3>
          </div>
        </template>
        
        <div class="devices-list">
          <div v-for="device in loginDevices" :key="device.id" class="device-item">
            <div class="device-info">
              <div class="device-type">{{ device.type }}</div>
              <div class="device-details">
                <span class="device-location">{{ device.location }}</span>
                <span class="login-time">最后登录：{{ device.lastLogin }}</span>
              </div>
            </div>
            <div class="device-actions">
              <el-tag v-if="device.isCurrent" type="success">当前设备</el-tag>
              <el-button 
                v-else 
                link 
                type="danger" 
                size="small"
                @click="logoutDevice(device.id)"
              >
                退出登录
              </el-button>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <!-- 更换手机号对话框 -->
    <el-dialog v-model="showChangePhone" title="更换手机号" width="400px">
      <el-form :model="phoneForm" label-width="80px">
        <el-form-item label="新手机号">
          <el-input v-model="phoneForm.newPhone" placeholder="请输入新手机号" />
        </el-form-item>
        <el-form-item label="验证码">
          <div class="verify-code-input">
            <el-input v-model="phoneForm.verifyCode" placeholder="请输入验证码" />
            <el-button type="primary" class="send-code-btn">发送验证码</el-button>
          </div>
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showChangePhone = false">取消</el-button>
        <el-button type="primary" @click="updatePhone">确认更换</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref, reactive } from 'vue'

// 密码修改表单
const passwordFormRef = ref()
const passwordForm = reactive({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

const passwordRules = {
  currentPassword: [
    { required: true, message: '请输入当前密码', trigger: 'blur' }
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度至少6位', trigger: 'blur' }
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== passwordForm.newPassword) {
          callback(new Error('两次输入密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

// 手机号更换
const showChangePhone = ref(false)
const phoneForm = reactive({
  newPhone: '',
  verifyCode: ''
})

// 登录设备数据
const loginDevices = ref([
  {
    id: 1,
    type: 'Chrome浏览器 - Windows',
    location: '安徽淮南',
    lastLogin: '2024-01-15 14:30',
    isCurrent: true
  },
  {
    id: 2,
    type: 'Safari浏览器 - iPhone',
    location: '安徽合肥',
    lastLogin: '2024-01-14 09:20',
    isCurrent: false
  }
])

const updatePassword = () => {
  passwordFormRef.value.validate((valid) => {
    if (valid) {
      // 调用API修改密码
      ElMessage.success('密码修改成功')
      passwordFormRef.value.resetFields()
    }
  })
}

const updatePhone = () => {
  ElMessage.success('手机号更换成功')
  showChangePhone.value = false
}

const logoutDevice = (deviceId) => {
  ElMessageBox.confirm('确定要让该设备退出登录吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    loginDevices.value = loginDevices.value.filter(device => device.id !== deviceId)
    ElMessage.success('设备已退出登录')
  })
}
</script>

<style scoped>
.security-settings {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.settings-content {
  max-width: 800px;
}

.setting-section {
  margin-bottom: 24px;
}

.section-header h3 {
  margin: 0;
  color: #303133;
}

.phone-setting {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.phone-info {
  display: flex;
  align-items: center;
  gap: 8px;
}

.label {
  color: #606266;
}

.phone-number {
  font-weight: 500;
  color: #303133;
}

.devices-list {
  space-y: 16px;
}

.device-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.device-item:last-child {
  border-bottom: none;
}

.device-info {
  flex: 1;
}

.device-type {
  font-weight: 500;
  margin-bottom: 4px;
}

.device-details {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.verify-code-input {
  display: flex;
  gap: 8px;
}

.send-code-btn {
  flex-shrink: 0;
}
</style>