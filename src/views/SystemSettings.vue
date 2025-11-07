<template>
  <div class="system-settings-page">
    <div class="page-header">
      <h1>系统设置</h1>
      <p>管理系统配置和参数</p >
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>系统配置</span>
          <el-button type="primary" @click="saveSettings" :loading="saving">
            <el-icon><Check /></el-icon>
            保存设置
          </el-button>
        </div>
      </template>

      <el-tabs v-model="activeTab" type="border-card">
        <!-- 基本设置 -->
        <el-tab-pane label="基本设置" name="basic">
          <el-form :model="settings.basic" label-width="120px">
            <el-form-item label="系统名称">
              <el-input v-model="settings.basic.systemName" placeholder="请输入系统名称" />
            </el-form-item>
            <el-form-item label="系统版本">
              <el-input v-model="settings.basic.version" placeholder="请输入系统版本" disabled />
            </el-form-item>
            <el-form-item label="版权信息">
              <el-input v-model="settings.basic.copyright" placeholder="请输入版权信息" />
            </el-form-item>
            <el-form-item label="Logo">
              <el-upload
                class="logo-upload"
                action="#"
                :show-file-list="false"
                :before-upload="beforeLogoUpload"
                :http-request="handleLogoUpload"
              >
                <div class="logo-uploader">
                  <el-icon v-if="!settings.basic.logo" class="logo-uploader-icon"><Plus /></el-icon>
                  < img v-else :src="settings.basic.logo" class="logo" />
                </div>
                <div class="upload-tip">点击上传系统Logo，建议尺寸 200x60px</div>
              </el-upload>
            </el-form-item>
            <el-form-item label="备案号">
              <el-input v-model="settings.basic.icp" placeholder="请输入备案号" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 站点设置 -->
        <el-tab-pane label="站点设置" name="site">
          <el-form :model="settings.site" label-width="120px">
            <el-form-item label="站点标题">
              <el-input v-model="settings.site.title" placeholder="请输入站点标题" />
            </el-form-item>
            <el-form-item label="站点关键词">
              <el-input 
                v-model="settings.site.keywords" 
                type="textarea" 
                :rows="3"
                placeholder="请输入站点关键词，多个关键词用逗号分隔"
              />
            </el-form-item>
            <el-form-item label="站点描述">
              <el-input 
                v-model="settings.site.description" 
                type="textarea" 
                :rows="4"
                placeholder="请输入站点描述"
              />
            </el-form-item>
            <el-form-item label="客服电话">
              <el-input v-model="settings.site.servicePhone" placeholder="请输入客服电话" />
            </el-form-item>
            <el-form-item label="客服邮箱">
              <el-input v-model="settings.site.serviceEmail" placeholder="请输入客服邮箱" />
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 安全设置 -->
        <el-tab-pane label="安全设置" name="security">
          <el-form :model="settings.security" label-width="160px">
            <el-form-item label="用户注册">
              <el-switch
                v-model="settings.security.allowRegister"
                active-text="允许注册"
                inactive-text="禁止注册"
              />
              <div class="form-tip">是否允许新用户注册</div>
            </el-form-item>
            <el-form-item label="密码强度要求">
              <el-select v-model="settings.security.passwordStrength" placeholder="请选择密码强度">
                <el-option label="低（6位以上）" value="low" />
                <el-option label="中（8位以上，包含字母数字）" value="medium" />
                <el-option label="高（10位以上，包含大小写字母、数字、特殊字符）" value="high" />
              </el-select>
            </el-form-item>
            <el-form-item label="登录失败锁定">
              <el-input-number 
                v-model="settings.security.maxLoginAttempts" 
                :min="0" 
                :max="10"
                controls-position="right"
              />
              <span class="input-unit">次后锁定账户</span>
              <div class="form-tip">0表示不启用登录失败锁定</div>
            </el-form-item>
            <el-form-item label="会话超时时间">
              <el-input-number 
                v-model="settings.security.sessionTimeout" 
                :min="10" 
                :max="480"
                controls-position="right"
              />
              <span class="input-unit">分钟</span>
            </el-form-item>
            <el-form-item label="启用验证码">
              <el-switch
                v-model="settings.security.enableCaptcha"
                active-text="启用"
                inactive-text="禁用"
              />
              <div class="form-tip">登录和注册时是否需要验证码</div>
            </el-form-item>
            <el-form-item label="操作日志保留">
              <el-input-number 
                v-model="settings.security.logRetentionDays" 
                :min="30" 
                :max="365"
                controls-position="right"
              />
              <span class="input-unit">天</span>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 邮件设置 -->
        <el-tab-pane label="邮件设置" name="email">
          <el-form :model="settings.email" label-width="120px">
            <el-form-item label="SMTP服务器">
              <el-input v-model="settings.email.smtpHost" placeholder="例如：smtp.163.com" />
            </el-form-item>
            <el-form-item label="SMTP端口">
              <el-input-number 
                v-model="settings.email.smtpPort" 
                :min="1" 
                :max="65535"
                controls-position="right"
              />
            </el-form-item>
            <el-form-item label="发件邮箱">
              <el-input v-model="settings.email.fromEmail" placeholder="请输入发件邮箱地址" />
            </el-form-item>
            <el-form-item label="发件人名称">
              <el-input v-model="settings.email.fromName" placeholder="请输入发件人名称" />
            </el-form-item>
            <el-form-item label="SMTP用户名">
              <el-input v-model="settings.email.smtpUsername" placeholder="请输入SMTP用户名" />
            </el-form-item>
            <el-form-item label="SMTP密码">
              <el-input 
                v-model="settings.email.smtpPassword" 
                type="password" 
                placeholder="请输入SMTP密码"
                show-password
              />
            </el-form-item>
            <el-form-item label="SSL加密">
              <el-switch v-model="settings.email.enableSSL" />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="testEmailConfig">测试邮件配置</el-button>
              <div class="form-tip">测试邮件配置是否正常</div>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 存储设置 -->
        <el-tab-pane label="存储设置" name="storage">
          <el-form :model="settings.storage" label-width="120px">
            <el-form-item label="存储类型">
              <el-radio-group v-model="settings.storage.type">
                <el-radio label="local">本地存储</el-radio>
                <el-radio label="qiniu">七牛云</el-radio>
                <el-radio label="aliyun">阿里云OSS</el-radio>
                <el-radio label="tencent">腾讯云COS</el-radio>
              </el-radio-group>
            </el-form-item>

            <template v-if="settings.storage.type === '"'"'local'"'"'">
              <el-form-item label="存储路径">
                <el-input v-model="settings.storage.local.path" placeholder="请输入存储路径" />
                <div class="form-tip">文件在服务器上的存储路径</div>
              </el-form-item>
              <el-form-item label="访问域名">
                <el-input v-model="settings.storage.local.domain" placeholder="请输入访问域名" />
                <div class="form-tip">通过该域名访问存储的文件</div>
              </el-form-item>
            </template>

            <template v-if="settings.storage.type === '"'"'qiniu'"'"'">
              <el-form-item label="AccessKey">
                <el-input v-model="settings.storage.qiniu.accessKey" placeholder="请输入AccessKey" />
              </el-form-item>
              <el-form-item label="SecretKey">
                <el-input 
                  v-model="settings.storage.qiniu.secretKey" 
                  type="password" 
                  placeholder="请输入SecretKey"
                  show-password
                />
              </el-form-item>
              <el-form-item label="存储空间">
                <el-input v-model="settings.storage.qiniu.bucket" placeholder="请输入存储空间名称" />
              </el-form-item>
              <el-form-item label="访问域名">
                <el-input v-model="settings.storage.qiniu.domain" placeholder="请输入访问域名" />
              </el-form-item>
            </template>

            <el-form-item label="文件大小限制">
              <el-input-number 
                v-model="settings.storage.maxFileSize" 
                :min="1" 
                :max="100"
                controls-position="right"
              />
              <span class="input-unit">MB</span>
              <div class="form-tip">单个文件上传大小限制</div>
            </el-form-item>
            <el-form-item label="允许的文件类型">
              <el-select v-model="settings.storage.allowedTypes" multiple placeholder="请选择允许的文件类型">
                <el-option label="图片" value="image" />
                <el-option label="文档" value="document" />
                <el-option label="视频" value="video" />
                <el-option label="音频" value="audio" />
                <el-option label="压缩包" value="archive" />
              </el-select>
            </el-form-item>
          </el-form>
        </el-tab-pane>

        <!-- 高级设置 -->
        <el-tab-pane label="高级设置" name="advanced">
          <el-form :model="settings.advanced" label-width="160px">
            <el-form-item label="调试模式">
              <el-switch v-model="settings.advanced.debugMode" />
              <div class="form-tip">开发环境下建议开启，生产环境建议关闭</div>
            </el-form-item>
            <el-form-item label="API速率限制">
              <el-input-number 
                v-model="settings.advanced.apiRateLimit" 
                :min="10" 
                :max="1000"
                controls-position="right"
              />
              <span class="input-unit">次/分钟</span>
            </el-form-item>
            <el-form-item label="缓存时间">
              <el-input-number 
                v-model="settings.advanced.cacheTimeout" 
                :min="0" 
                :max="1440"
                controls-position="right"
              />
              <span class="input-unit">分钟</span>
              <div class="form-tip">0表示不启用缓存</div>
            </el-form-item>
            <el-form-item label="数据备份">
              <el-switch v-model="settings.advanced.autoBackup" />
              <div class="form-tip">是否自动备份数据库</div>
            </el-form-item>
            <el-form-item label="备份频率" v-if="settings.advanced.autoBackup">
              <el-select v-model="settings.advanced.backupFrequency" placeholder="请选择备份频率">
                <el-option label="每天" value="daily" />
                <el-option label="每周" value="weekly" />
                <el-option label="每月" value="monthly" />
              </el-select>
            </el-form-item>
            <el-form-item label="维护模式">
              <el-switch v-model="settings.advanced.maintenanceMode" />
              <div class="form-tip">开启后网站将显示维护页面</div>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>

    <!-- 系统信息卡片 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :xs="24" :sm="8">
        <el-card>
          <template #header>
            <span>系统信息</span>
          </template>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="系统版本">v1.0.0</el-descriptions-item>
            <el-descriptions-item label="Vue版本">3.3.0</el-descriptions-item>
            <el-descriptions-item label="Element Plus">2.3.0</el-descriptions-item>
            <el-descriptions-item label="Node.js">v18.17.0</el-descriptions-item>
            <el-descriptions-item label="最后启动">2024-01-20 10:30:00</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card>
          <template #header>
            <span>服务器信息</span>
          </template>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="操作系统">Windows 10</el-descriptions-item>
            <el-descriptions-item label="CPU使用率">25%</el-descriptions-item>
            <el-descriptions-item label="内存使用率">68%</el-descriptions-item>
            <el-descriptions-item label="磁盘使用率">45%</el-descriptions-item>
            <el-descriptions-item label="运行时间">15天2小时</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="8">
        <el-card>
          <template #header>
            <span>数据统计</span>
          </template>
          <el-descriptions :column="1" border size="small">
            <el-descriptions-item label="用户总数">1,256</el-descriptions-item>
            <el-descriptions-item label="内容数量">5,678</el-descriptions-item>
            <el-descriptions-item label="今日访问">1,234</el-descriptions-item>
            <el-descriptions-item label="文件数量">8,901</el-descriptions-item>
            <el-descriptions-item label="数据库大小">125.6 MB</el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from '"'"'vue'"'"'
import { ElMessage, ElMessageBox } from '"'"'element-plus'"'"'
import { Check, Plus } from '"'"'@element-plus/icons-vue'"'"'

const activeTab = ref('"'"'basic'"'"')
const saving = ref(false)

// 系统设置数据
const settings = reactive({
  basic: {
    systemName: '"'"'淮韵游踪 - 淮南文化数字传承平台'"'"',
    version: '"'"'v1.0.0'"'"',
    copyright: '"'"'© 2024 淮韵游踪 版权所有'"'"',
    logo: '"'"''"'"',
    icp: '"'"'皖ICP备12345678号'"'"'
  },
  site: {
    title: '"'"'淮韵游踪 - 探索淮南文化之美'"'"',
    keywords: '"'"'淮南文化,八公山,淮河文化,非遗传承,文化数字化'"'"',
    description: '"'"'淮韵游踪是专注于淮南文化数字传承的平台，致力于保护和传播八公山历史文化、淮河文化等丰富的文化遗产。'"'"',
    servicePhone: '"'"'400-123-4567'"'"',
    serviceEmail: '"'"'service@huaiyun.com'"'"'
  },
  security: {
    allowRegister: true,
    passwordStrength: '"'"'medium'"'"',
    maxLoginAttempts: 5,
    sessionTimeout: 120,
    enableCaptcha: true,
    logRetentionDays: 90
  },
  email: {
    smtpHost: '"'"'smtp.163.com'"'"',
    smtpPort: 465,
    fromEmail: '"'"'noreply@huaiyun.com'"'"',
    fromName: '"'"'淮韵游踪'"'"',
    smtpUsername: '"'"'noreply@huaiyun.com'"'"',
    smtpPassword: '"'"''"'"',
    enableSSL: true
  },
  storage: {
    type: '"'"'local'"'"',
    maxFileSize: 10,
    allowedTypes: ['"'"'image'"'"', '"'"'document'"'"', '"'"'video'"'"'],
    local: {
      path: '"'"'/uploads'"'"',
      domain: '"'"'https://static.huaiyun.com'"'"'
    },
    qiniu: {
      accessKey: '"'"''"'"',
      secretKey: '"'"''"'"',
      bucket: '"'"'huaiyun'"'"',
      domain: '"'"'https://qiniu.huaiyun.com'"'"'
    }
  },
  advanced: {
    debugMode: true,
    apiRateLimit: 100,
    cacheTimeout: 30,
    autoBackup: true,
    backupFrequency: '"'"'daily'"'"',
    maintenanceMode: false
  }
})

// 方法
const saveSettings = async () => {
  saving.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1500))
    ElMessage.success('"'"'系统设置已保存'"'"')
  } catch (error) {
    ElMessage.error('"'"'保存失败'"'"')
  } finally {
    saving.value = false
  }
}

const testEmailConfig = async () => {
  try {
    await ElMessageBox.confirm('"'"'确定要测试邮件配置吗？'"'"', '"'"'测试邮件配置'"'"')
    // 模拟测试
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('"'"'邮件配置测试成功'"'"')
  } catch {
    // 用户取消
  }
}

const beforeLogoUpload = (file) => {
  const isJPG = file.type === '"'"'image/jpeg'"'"' || file.type === '"'"'image/png'"'"'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('"'"'Logo必须是 JPG 或 PNG 格式!'"'"')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('"'"'Logo大小不能超过 2MB!'"'"')
    return false
  }
  return true
}

const handleLogoUpload = (options) => {
  // 模拟上传过程
  const { file } = options
  const reader = new FileReader()
  reader.onload = (e) => {
    settings.basic.logo = e.target.result
    ElMessage.success('"'"'Logo上传成功'"'"')
  }
  reader.readAsDataURL(file)
}

onMounted(() => {
  console.log('"'"'系统设置页面已加载'"'"')
})
</script>

<style scoped>
.system-settings-page {
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

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
}

.input-unit {
  margin-left: 8px;
  color: #606266;
}

/* Logo上传样式 */
.logo-upload {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.logo-uploader {
  width: 200px;
  height: 60px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo-uploader:hover {
  border-color: #409eff;
}

.logo-uploader-icon {
  font-size: 28px;
  color: #8c939d;
}

.logo {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
}

/* 标签页样式 */
:deep(.el-tabs__content) {
  padding: 20px;
}

:deep(.el-form-item) {
  margin-bottom: 22px;
}

:deep(.el-descriptions__cell) {
  padding: 8px 12px;
}
</style>