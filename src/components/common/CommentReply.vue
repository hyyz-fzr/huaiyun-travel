<template>
  <div class="comment-reply">
    <!-- 原评论信息 -->
    <div class="original-comment" v-if="comment">
      <div class="comment-header">
        <el-avatar
          :size="32"
          :src="comment.authorAvatar || '/images/avatars/default.jpg'"
        />
        <div class="comment-info">
          <div class="username">{{ comment.authorName }}</div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>
    </div>

    <!-- 回复表单 -->
    <div class="reply-form">
      <el-form
        :model="replyForm"
        :rules="replyRules"
        ref="replyFormRef"
        label-width="80px"
      >
        <el-form-item label="回复内容" prop="content">
          <el-input
            v-model="replyForm.content"
            type="textarea"
            :rows="5"
            placeholder="请输入回复内容..."
            maxlength="500"
            show-word-limit
            resize="none"
          />
        </el-form-item>

        <!-- 图片上传 -->
        <el-form-item label="回复图片">
          <el-upload
            action="/api/upload/comment"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            :limit="3"
            accept="image/*"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <!-- 回复设置 -->
        <el-form-item label="回复设置">
          <el-space>
            <el-checkbox v-model="replyForm.isPublic">公开回复</el-checkbox>
            <el-checkbox v-model="replyForm.notifyUser">通知用户</el-checkbox>
            <el-checkbox v-model="replyForm.asOfficial">官方回复</el-checkbox>
          </el-space>
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-space>
            <el-button
              type="primary"
              :loading="submitting"
              @click="handleSubmit"
            >
              {{ replyForm.asOfficial ? '官方回复' : '提交回复' }}
            </el-button>
            <el-button @click="handleCancel">取消</el-button>
            <el-button type="info" @click="handleSaveDraft" v-if="!replyForm.asOfficial">
              保存草稿
            </el-button>
          </el-space>
        </el-form-item>
      </el-form>
    </div>

    <!-- 快捷回复模板 -->
    <div class="quick-reply" v-if="replyForm.asOfficial">
      <h4>快捷回复模板</h4>
      <el-space wrap>
        <el-button
          v-for="template in quickTemplates"
          :key="template.text"
          size="small"
          @click="applyTemplate(template)"
        >
          {{ template.name }}
        </el-button>
      </el-space>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { contentStore } from '@/stores/content'

const props = defineProps({
  comment: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['success', 'cancel'])

// Store
const store = contentStore()

// 响应式数据
const replyFormRef = ref()
const submitting = ref(false)
const fileList = ref([])

const replyForm = reactive({
  content: '',
  images: [],
  isPublic: true,
  notifyUser: true,
  asOfficial: false
})

// 验证规则
const replyRules = {
  content: [
    { required: true, message: '请输入回复内容', trigger: 'blur' },
    { min: 2, message: '回复内容至少2个字符', trigger: 'blur' },
    { max: 500, message: '回复内容不能超过500个字符', trigger: 'blur' }
  ]
}

// 快捷回复模板
const quickTemplates = ref([
  {
    name: '感谢反馈',
    text: '感谢您的宝贵反馈，我们会认真考虑您的建议。'
  },
  {
    name: '问题已记录',
    text: '您反映的问题我们已经记录，会尽快处理。'
  },
  {
    name: '内容审核说明',
    text: '您的内容正在审核中，请耐心等待。审核通过后会立即显示。'
  },
  {
    name: '违规内容说明',
    text: '您的内容因违反社区规定而被处理，请查看社区规范了解详情。'
  },
  {
    name: '文化知识补充',
    text: '感谢分享！关于这个话题，补充一点文化知识：淮南作为豆腐的发源地，有着深厚的饮食文化底蕴。'
  }
])

// 方法
const handleSubmit = async () => {
  if (!replyFormRef.value) return

  try {
    const valid = await replyFormRef.value.validate()
    if (!valid) return

    submitting.value = true

    const replyData = {
      commentId: props.comment.id,
      content: replyForm.content,
      images: replyForm.images,
      isPublic: replyForm.isPublic,
      notifyUser: replyForm.notifyUser,
      asOfficial: replyForm.asOfficial
    }

    await store.replyToComment(replyData)
    
    ElMessage.success(replyForm.asOfficial ? '官方回复成功' : '回复成功')
    emit('success')
    
    // 重置表单
    resetForm()
    
  } catch (error) {
    ElMessage.error('回复失败：' + error.message)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  resetForm()
  emit('cancel')
}

const handleSaveDraft = () => {
  // 保存草稿到本地存储
  const draft = {
    content: replyForm.content,
    images: replyForm.images,
    timestamp: new Date().getTime()
  }
  localStorage.setItem(`comment_reply_draft_${props.comment.id}`, JSON.stringify(draft))
  ElMessage.success('草稿已保存')
}

const handleUploadSuccess = (response, file) => {
  if (response && response.code === 200) {
    const imageUrl = response.data
    replyForm.images.push(imageUrl)
    ElMessage.success('图片上传成功')
  } else {
    ElMessage.error('图片上传失败')
  }
}

const handleRemove = (file) => {
  const imageUrl = file.url || file.response?.data
  const index = replyForm.images.indexOf(imageUrl)
  if (index > -1) {
    replyForm.images.splice(index, 1)
  }
}

const beforeUpload = (file) => {
  const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPGOrPNG) {
    ElMessage.error('只能上传 JPG/PNG 格式的图片!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('图片大小不能超过 2MB!')
    return false
  }
  return true
}

const applyTemplate = (template) => {
  replyForm.content = template.text
}

const resetForm = () => {
  replyForm.content = ''
  replyForm.images = []
  replyForm.isPublic = true
  replyForm.notifyUser = true
  fileList.value = []
  
  if (replyFormRef.value) {
    replyFormRef.value.resetFields()
  }
}

// 加载草稿
const loadDraft = () => {
  if (!props.comment.id) return
  
  const draftStr = localStorage.getItem(`comment_reply_draft_${props.comment.id}`)
  if (draftStr) {
    try {
      const draft = JSON.parse(draftStr)
      replyForm.content = draft.content || ''
      replyForm.images = draft.images || []
      
      // 转换文件列表用于显示
      fileList.value = draft.images.map(url => ({
        name: url.split('/').pop(),
        url: url
      }))
    } catch (error) {
      console.error('加载草稿失败:', error)
    }
  }
}

// 初始化
loadDraft()
</script>

<style scoped>
.comment-reply {
  padding: 0;
}

.original-comment {
  margin-bottom: 24px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
  border-left: 4px solid #409eff;
}

.comment-header {
  display: flex;
  align-items: flex-start;
}

.comment-info {
  margin-left: 12px;
  flex: 1;
}

.username {
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.comment-content {
  color: #606266;
  line-height: 1.5;
}

.reply-form {
  margin-bottom: 20px;
}

.quick-reply {
  margin-top: 20px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 6px;
  border: 1px solid #e1f5fe;
}

.quick-reply h4 {
  margin: 0 0 12px 0;
  color: #303133;
  font-size: 14px;
}

:deep(.el-upload--picture-card) {
  width: 100px;
  height: 100px;
  line-height: 100px;
}

:deep(.el-upload-list--picture-card .el-upload-list__item) {
  width: 100px;
  height: 100px;
}
</style>