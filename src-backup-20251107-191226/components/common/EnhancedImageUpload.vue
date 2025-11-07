<template>
  <div class="enhanced-image-upload">
    <!-- 单图上传模式 -->
    <div v-if="mode === 'single'" class="single-upload">
      <el-upload
        :action="uploadUrl"
        :headers="headers"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :list-type="listType"
        :accept="accept"
        :class="{'drag-upload': drag}"
        :drag="drag"
      >
        <template v-if="listType === 'picture-card'">
          <div class="upload-area">
            <el-icon><Plus /></el-icon>
            <div class="upload-text">点击上传</div>
            <div class="upload-tip" v-if="tip">{{ tip }}</div>
          </div>
        </template>
        
        <template v-else>
          <el-button type="primary" :icon="Plus">
            {{ uploadButtonText }}
          </el-button>
        </template>

        <!-- 修复的tip插槽 - 放在el-upload的直接子级 -->
        <template #tip>
          <div class="el-upload__tip" v-if="tip && listType !== 'picture-card'">{{ tip }}</div>
        </template>
      </el-upload>

      <!-- 图片预览 -->
      <el-dialog v-model="previewVisible" title="图片预览" width="60%">
        <div class="image-preview">
          <img :src="previewImage" :alt="previewTitle" class="preview-img" />
          <div class="preview-info">
            <p><strong>文件名:</strong> {{ previewTitle }}</p >
            <p><strong>尺寸:</strong> {{ previewSize }}</p >
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 多图上传模式 -->
    <div v-else class="multiple-upload">
      <div class="upload-header">
        <span class="upload-title">{{ title }}</span>
        <span class="upload-count">已选择 {{ fileList.length }} / {{ maxCount }} 张</span>
      </div>

      <el-upload
        :action="uploadUrl"
        :headers="headers"
        :file-list="fileList"
        :before-upload="beforeUpload"
        :on-success="handleSuccess"
        :on-error="handleError"
        :on-remove="handleRemove"
        :on-preview="handlePreview"
        :on-exceed="handleExceed"
        :list-type="listType"
        :accept="accept"
        :multiple="true"
        :limit="maxCount"
      >
        <template v-if="listType === 'picture-card'">
          <div class="upload-area">
            <el-icon><Plus /></el-icon>
            <div class="upload-text">添加图片</div>
          </div>
        </template>
        
        <template v-else>
          <el-button type="primary" :icon="Plus">
            添加图片
          </el-button>
        </template>

        <template #tip>
          <div class="upload-tips">
            <p><strong>上传要求:</strong></p >
            <ul>
              <li>支持 {{ acceptTypes.join('、') }} 格式</li>
              <li>单张图片不超过 {{ maxSizeMB }}MB</li>
              <li>最多上传 {{ maxCount }} 张图片</li>
              <li v-if="recommendedSize">建议尺寸: {{ recommendedSize }}</li>
            </ul>
          </div>
        </template>
      </el-upload>

      <!-- 批量操作 -->
      <div v-if="fileList.length > 0" class="batch-actions">
        <el-button type="text" @click="clearAll" :icon="Delete">
          清空所有
        </el-button>
        <el-button type="text" @click="sortAlphabetically" :icon="Sort">
          按名称排序
        </el-button>
        <el-button type="text" @click="downloadAll" :icon="Download" v-if="enableDownload">
          下载全部
        </el-button>
      </div>

      <!-- 图片预览 -->
      <el-dialog v-model="previewVisible" title="图片预览" width="70%">
        <div class="image-preview">
          <div class="preview-nav">
            <el-button :icon="ArrowLeft" @click="prevImage" :disabled="previewIndex === 0">
              上一张
            </el-button>
            <span class="preview-counter">{{ previewIndex + 1 }} / {{ fileList.length }}</span>
            <el-button @click="nextImage" :disabled="previewIndex === fileList.length - 1">
              下一张
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
          
          <div class="preview-content">
            <img :src="previewImage" :alt="previewTitle" class="preview-img" />
          </div>
          
          <div class="preview-info">
            <p><strong>文件名:</strong> {{ previewTitle }}</p >
            <p><strong>上传时间:</strong> {{ previewTime }}</p >
            <p><strong>文件大小:</strong> {{ previewSize }}</p >
          </div>
        </div>
      </el-dialog>
    </div>

    <!-- 上传进度 -->
    <el-dialog v-model="progressVisible" title="上传进度" width="400px" :close-on-click-modal="false">
      <div class="upload-progress">
        <el-progress 
          :percentage="uploadProgress" 
          :status="uploadStatus"
          :stroke-width="8"
        />
        <p class="progress-text">{{ progressText }}</p >
        
        <div v-if="uploadErrors.length > 0" class="upload-errors">
          <h4>上传失败的文件:</h4>
          <ul>
            <li v-for="error in uploadErrors" :key="error.fileName">
              {{ error.fileName }}: {{ error.message }}
            </li>
          </ul>
        </div>
      </div>
      
      <template #footer>
        <el-button @click="cancelUpload" v-if="uploadStatus === 'success' || uploadStatus === 'exception'">
          关闭
        </el-button>
        <el-button @click="cancelUpload" v-else>
          取消上传
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<!-- script和style部分完全保持您原来的代码不变 -->

<script setup>
import { ref, computed, watch } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  Delete,
  Sort,
  Download,
  ArrowLeft,
  ArrowRight
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/user'

const props = defineProps({
  modelValue: {
    type: [String, Array],
    default: ''
  },
  mode: {
    type: String,
    default: 'single', // 'single' | 'multiple'
    validator: (value) => ['single', 'multiple'].includes(value)
  },
  listType: {
    type: String,
    default: 'picture-card',
    validator: (value) => ['text', 'picture', 'picture-card'].includes(value)
  },
  accept: {
    type: String,
    default: 'image/*'
  },
  maxCount: {
    type: Number,
    default: 10
  },
  maxSizeMB: {
    type: Number,
    default: 5
  },
  title: {
    type: String,
    default: '图片上传'
  },
  tip: {
    type: String,
    default: ''
  },
  recommendedSize: {
    type: String,
    default: ''
  },
  drag: {
    type: Boolean,
    default: false
  },
  enableDownload: {
    type: Boolean,
    default: false
  },
  category: {
    type: String,
    default: 'general' // 'avatar', 'heritage', 'product', 'event', 'general'
  }
})

const emit = defineEmits(['update:modelValue', 'change', 'success', 'error'])

const userStore = useUserStore()

const fileList = ref([])
const previewVisible = ref(false)
const previewImage = ref('')
const previewTitle = ref('')
const previewSize = ref('')
const previewTime = ref('')
const previewIndex = ref(0)
const progressVisible = ref(false)
const uploadProgress = ref(0)
const uploadStatus = ref('')
const progressText = ref('')
const uploadErrors = ref([])

const uploadUrl = computed(() => {
  const baseUrl = import.meta.env.VITE_API_BASE_URL || ''
  if (props.category === 'avatar') {
    return `${baseUrl}/api/upload/avatar`
  } else if (props.mode === 'multiple') {
    return `${baseUrl}/api/upload/images`
  } else {
    return `${baseUrl}/api/upload/image`
  }
})

const headers = computed(() => ({
  Authorization: `Bearer ${userStore.token}`
}))

const uploadButtonText = computed(() => {
  return props.mode === 'single' ? '上传图片' : '添加图片'
})

const acceptTypes = computed(() => {
  const types = {
    'image/*': ['JPG', 'JPEG', 'PNG', 'GIF', 'BMP', 'WEBP'],
    'image/jpeg,image/png': ['JPG', 'PNG'],
    'image/jpeg': ['JPG'],
    'image/png': ['PNG']
  }
  return types[props.accept] || types['image/*']
})

// 处理v-model
watch(() => props.modelValue, (newValue) => {
  if (props.mode === 'single') {
    if (newValue && typeof newValue === 'string') {
      fileList.value = [{ url: newValue, name: newValue.split('/').pop() }]
    } else {
      fileList.value = []
    }
  } else {
    if (Array.isArray(newValue)) {
      fileList.value = newValue.map(url => ({ url, name: url.split('/').pop() }))
    } else {
      fileList.value = []
    }
  }
}, { immediate: true })

// 上传前验证
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt = file.size / 1024 / 1024 < props.maxSizeMB

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }

  if (!isLt) {
    ElMessage.error(`图片大小不能超过 ${props.maxSizeMB}MB!`)
    return false
  }

  // 显示上传进度
  progressVisible.value = true
  uploadProgress.value = 0
  uploadStatus.value = ''
  progressText.value = '准备上传...'
  uploadErrors.value = []

  // 模拟上传进度
  const progressInterval = setInterval(() => {
    if (uploadProgress.value < 90) {
      uploadProgress.value += 10
      progressText.value = `上传中... ${uploadProgress.value}%`
    }
  }, 200)

  // 清理定时器
  setTimeout(() => clearInterval(progressInterval), 2000)

  return true
}

// 上传成功
const handleSuccess = (response, file) => {
  uploadProgress.value = 100
  uploadStatus.value = 'success'
  progressText.value = '上传成功!'

  const fileData = {
    uid: file.uid,
    name: file.name,
    url: response.data?.fileUrl || response.data?.url,
    size: file.size,
    time: new Date().toLocaleString()
  }

  if (props.mode === 'single') {
    fileList.value = [fileData]
    emit('update:modelValue', fileData.url)
  } else {
    fileList.value.push(fileData)
    updateMultipleModelValue()
  }

  emit('change', fileList.value)
  emit('success', { file: fileData, response })

  setTimeout(() => {
    progressVisible.value = false
  }, 1500)
}

// 上传失败
const handleError = (error, file) => {
  uploadProgress.value = 100
  uploadStatus.value = 'exception'
  progressText.value = '上传失败!'

  uploadErrors.value.push({
    fileName: file.name,
    message: error.message || '上传失败'
  })

  ElMessage.error(`文件 ${file.name} 上传失败`)
  emit('error', { file, error })
}

// 移除文件
const handleRemove = (file) => {
  const index = fileList.value.findIndex(f => f.uid === file.uid)
  if (index !== -1) {
    fileList.value.splice(index, 1)
    
    if (props.mode === 'single') {
      emit('update:modelValue', '')
    } else {
      updateMultipleModelValue()
    }
    
    emit('change', fileList.value)
  }
}

// 预览图片
const handlePreview = (file) => {
  previewImage.value = file.url
  previewTitle.value = file.name
  previewSize.value = formatFileSize(file.size)
  previewTime.value = file.time || new Date().toLocaleString()
  
  if (props.mode === 'multiple') {
    previewIndex.value = fileList.value.findIndex(f => f.uid === file.uid)
  }
  
  previewVisible.value = true
}

// 超出限制
const handleExceed = () => {
  ElMessage.warning(`最多只能上传 ${props.maxCount} 张图片`)
}

// 更新多图模式的v-model
const updateMultipleModelValue = () => {
  const urls = fileList.value.map(file => file.url)
  emit('update:modelValue', urls)
}

// 清空所有
const clearAll = async () => {
  try {
    await ElMessageBox.confirm('确定要清空所有图片吗？', '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning'
    })
    
    fileList.value = []
    updateMultipleModelValue()
    emit('change', [])
    ElMessage.success('已清空所有图片')
  } catch {
    // 用户取消操作
  }
}

// 按名称排序
const sortAlphabetically = () => {
  fileList.value.sort((a, b) => a.name.localeCompare(b.name))
  emit('change', fileList.value)
  ElMessage.success('已按名称排序')
}

// 下载全部
const downloadAll = () => {
  fileList.value.forEach(file => {
    const link = document.createElement('a')
    link.href = file.url
    link.download = file.name
    link.click()
  })
  ElMessage.success('开始下载所有图片')
}

// 上一张图片
const prevImage = () => {
  if (previewIndex.value > 0) {
    previewIndex.value--
    const file = fileList.value[previewIndex.value]
    previewImage.value = file.url
    previewTitle.value = file.name
    previewSize.value = formatFileSize(file.size)
    previewTime.value = file.time || new Date().toLocaleString()
  }
}

// 下一张图片
const nextImage = () => {
  if (previewIndex.value < fileList.value.length - 1) {
    previewIndex.value++
    const file = fileList.value[previewIndex.value]
    previewImage.value = file.url
    previewTitle.value = file.name
    previewSize.value = formatFileSize(file.size)
    previewTime.value = file.time || new Date().toLocaleString()
  }
}

// 取消上传
const cancelUpload = () => {
  progressVisible.value = false
  uploadProgress.value = 0
  uploadStatus.value = ''
  progressText.value = ''
  uploadErrors.value = []
}

// 格式化文件大小
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 B'
  const k = 1024
  const sizes = ['B', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}
</script>

<style scoped>
.enhanced-image-upload {
  width: 100%;
}

/* 上传区域样式 */
.upload-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #8c939d;
  transition: all 0.3s;
}

.upload-area .el-icon {
  font-size: 2em;
  margin-bottom: 8px;
}

.upload-text {
  font-size: 0.9em;
  margin-bottom: 4px;
}

.upload-tip {
  font-size: 0.8em;
  color: #c0c4cc;
}

/* 拖拽上传样式 */
.drag-upload :deep(.el-upload-dragger) {
  width: 100%;
  height: 180px;
  border: 2px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  transition: border-color 0.3s;
}

.drag-upload :deep(.el-upload-dragger:hover) {
  border-color: #409eff;
}

/* 多图上传头部 */
.upload-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 4px;
}

.upload-title {
  font-weight: 500;
  color: #303133;
}

.upload-count {
  font-size: 0.9em;
  color: #909399;
}

/* 上传提示 */
.upload-tips {
  background: #f8f9fa;
  padding: 12px 16px;
  border-radius: 6px;
  margin-top: 12px;
  border-left: 4px solid #409eff;
}

.upload-tips p {
  margin: 0 0 8px 0;
  color: #303133;
  font-weight: 500;
}

.upload-tips ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.5;
}

.upload-tips li {
  margin-bottom: 4px;
}

/* 批量操作 */
.batch-actions {
  display: flex;
  gap: 16px;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 图片预览 */
.image-preview {
  text-align: center;
}

.preview-img {
  max-width: 100%;
  max-height: 60vh;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.preview-info {
  margin-top: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  text-align: left;
}

.preview-info p {
  margin: 0 0 8px 0;
  color: #606266;
}

.preview-info p:last-child {
  margin-bottom: 0;
}

/* 多图预览导航 */
.preview-nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding: 0 20px;
}

.preview-counter {
  color: #606266;
  font-weight: 500;
}

/* 上传进度 */
.upload-progress {
  padding: 20px;
}

.progress-text {
  text-align: center;
  margin: 16px 0 0 0;
  color: #606266;
}

.upload-errors {
  margin-top: 20px;
  padding: 16px;
  background: #fef0f0;
  border: 1px solid #fbc4c4;
  border-radius: 6px;
}

.upload-errors h4 {
  margin: 0 0 12px 0;
  color: #f56c6c;
}

.upload-errors ul {
  margin: 0;
  padding-left: 20px;
  color: #f56c6c;
}

.upload-errors li {
  margin-bottom: 4px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .upload-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
  
  .batch-actions {
    flex-wrap: wrap;
    gap: 12px;
  }
  
  .preview-nav {
    flex-direction: column;
    gap: 12px;
  }
}
</style>