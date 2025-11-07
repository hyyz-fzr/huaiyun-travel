<<<<<<< HEAD
<template>
  <div class="event-upload">
    <el-page-header @back="$router.back()" class="page-header">
      <template #content>
        <span class="header-title">发布活动</span>
      </template>
    </el-page-header>

    <el-card class="upload-card">
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <!-- 活动标题 -->
        <el-form-item label="活动标题" prop="title">
          <el-input
            id="eventTitle"
            name="eventTitle"
            v-model="form.title"
            placeholder="请输入活动标题"
            maxlength="100"
            show-word-limit
          />
        </el-form-item>

        <!-- 活动副标题 -->
        <el-form-item label="活动副标题">
          <el-input
            id="eventSubtitle"
            name="eventSubtitle"
            v-model="form.subtitle"
            placeholder="请输入活动副标题"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <!-- 活动封面 -->
        <el-form-item label="活动封面">
          <el-upload
            class="cover-uploader"
            action="/api/upload/image"
            :show-file-list="false"
            :before-upload="beforeCoverUpload"
            :on-success="handleCoverSuccess"
            :on-error="handleUploadError"
          >
            < img v-if="form.coverImage" :src="form.coverImage" class="cover-image" />
            <el-icon v-else class="cover-uploader-icon"><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">建议尺寸 800x400px，支持 JPG、PNG 格式</div>
        </el-form-item>

        <!-- 活动时间 -->
        <el-form-item label="活动时间" prop="timeRange">
          <el-date-picker
            id="eventTimeRange"
            name="eventTimeRange"
            v-model="form.timeRange"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            style="width: 100%"
          />
        </el-form-item>

        <!-- 活动地点 -->
        <el-form-item label="活动地点" prop="location">
          <el-input
            id="eventLocation"
            name="eventLocation"
            v-model="form.location"
            placeholder="请输入活动地点"
          />
        </el-form-item>

        <!-- 参与人数 -->
        <el-form-item label="参与人数" prop="maxParticipants">
          <el-input-number
            id="maxParticipants"
            name="maxParticipants"
            v-model="form.maxParticipants"
            :min="1"
            :max="1000"
            placeholder="最大参与人数"
          />
        </el-form-item>

        <!-- 活动费用 -->
        <el-form-item label="活动费用">
          <el-radio-group 
            id="priceType"
            name="priceType"
            v-model="form.priceType"
          >
            <el-radio label="free">免费</el-radio>
            <el-radio label="paid">收费</el-radio>
          </el-radio-group>
          <el-input-number
            id="eventPrice"
            name="eventPrice"
            v-if="form.priceType === 'paid'"
            v-model="form.price"
            :min="0"
            :precision="2"
            placeholder="活动费用"
            style="margin-left: 16px;"
          >
            <template #prefix>¥</template>
          </el-input-number>
        </el-form-item>

        <!-- 活动描述 -->
        <el-form-item label="活动描述" prop="description">
          <el-input
            id="eventDescription"
            name="eventDescription"
            v-model="form.description"
            type="textarea"
            :rows="6"
            placeholder="请输入活动详细描述"
            maxlength="2000"
            show-word-limit
          />
        </el-form-item>

        <!-- 活动安排 -->
        <el-form-item label="活动安排">
          <div class="schedule-list">
            <div
              v-for="(schedule, index) in form.schedule"
              :key="index"
              class="schedule-item"
            >
              <el-input
                id="scheduleTime"
                name="scheduleTime"
                v-model="schedule.time"
                placeholder="时间"
                style="width: 150px; margin-right: 12px;"
              />
              <el-input
                id="scheduleContent"
                name="scheduleContent"
                v-model="schedule.content"
                placeholder="活动内容"
                style="flex: 1; margin-right: 12px;"
              />
              <el-button
                type="danger"
                text
                @click="removeSchedule(index)"
              >
                <el-icon><Delete /></el-icon>
              </el-button>
            </div>
            <el-button type="primary" text @click="addSchedule">
              <el-icon><Plus /></el-icon>
              添加安排
            </el-button>
          </div>
        </el-form-item>

        <!-- 活动图片 -->
        <el-form-item label="活动图片">
          <el-upload
            action="/api/upload/image"
            list-type="picture-card"
            :file-list="contentImages"
            :before-upload="beforeContentUpload"
            :on-success="handleContentSuccess"
            :on-error="handleUploadError"
            :on-remove="handleContentRemove"
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
          <div class="upload-tip">最多上传10张图片，每张不超过5MB</div>
        </el-form-item>

        <!-- 隐私设置 -->
        <el-form-item label="隐私设置">
          <el-switch
            id="isPublic"
            name="isPublic"
            v-model="form.isPublic"
            active-text="公开"
            inactive-text="私密"
          />
          <div class="setting-tip">私密活动仅自己可见</div>
        </el-form-item>

        <!-- 操作按钮 -->
        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="submitting">
            {{ submitting ? '提交中...' : '发布活动' }}
          </el-button>
          <el-button @click="$router.back()">取消</el-button>
          <el-button @click="saveDraft" :disabled="!form.title">
            保存草稿
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
=======
﻿<template>
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

<<<<<<< HEAD
const router = useRouter()
const formRef = ref()
const submitting = ref(false)

const form = ref({
  title: '',
  subtitle: '',
  coverImage: '',
  timeRange: [],
  location: '',
  maxParticipants: 50,
  priceType: 'free',
  price: 0,
  description: '',
  schedule: [],
  isPublic: true
})

const contentImages = ref([])

const rules = {
  title: [
    { required: true, message: '请输入活动标题', trigger: 'blur' }
  ],
  timeRange: [
    { required: true, message: '请选择活动时间', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请输入活动地点', trigger: 'blur' }
  ],
  maxParticipants: [
    { required: true, message: '请输入最大参与人数', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入活动描述', trigger: 'blur' }
  ]
}

const beforeCoverUpload = (file) => {
  const isJPGOrPNG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isJPGOrPNG) {
    ElMessage.error('封面图片只能是 JPG 或 PNG 格式!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('封面图片大小不能超过 5MB!')
    return false
  }
  return true
}

const beforeContentUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  if (contentImages.value.length >= 10) {
    ElMessage.error('最多只能上传10张图片!')
    return false
  }
  return true
}

const handleCoverSuccess = (response) => {
  form.value.coverImage = response.data.url
  ElMessage.success('封面图片上传成功')
}

const handleContentSuccess = (response, file) => {
  contentImages.value.push({
    name: file.name,
    url: response.data.url
  })
  ElMessage.success('图片上传成功')
}

const handleContentRemove = (file, fileList) => {
  contentImages.value = fileList
}

const handleUploadError = () => {
  ElMessage.error('图片上传失败')
}

const addSchedule = () => {
  form.value.schedule.push({ time: '', content: '' })
}

const removeSchedule = (index) => {
  form.value.schedule.splice(index, 1)
}

const submitForm = async () => {
  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    submitting.value = true
    
    // 处理时间范围
    const [startTime, endTime] = form.value.timeRange
    
    const eventData = {
      ...form.value,
      startTime,
      endTime,
      images: contentImages.value.map(img => img.url)
    }

    // 调用创建活动API
    // await createEvent(eventData)
    
    ElMessage.success('活动发布成功')
    router.push('/events')
  } catch (error) {
    ElMessage.error('发布失败，请稍后重试')
  } finally {
    submitting.value = false
  }
}

const saveDraft = () => {
  localStorage.setItem('event_draft', JSON.stringify(form.value))
  ElMessage.success('草稿保存成功')
=======
const handleClick = () => {
  ElMessage.success('组件功能正常')
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</script>

<style scoped>
.component {
  padding: 20px;
  text-align: center;
<<<<<<< HEAD
  line-height: 100px;
}

.upload-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 8px;
}

/* 活动安排 */
.schedule-list {
  gap: 12px;
}

.schedule-item {
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 设置提示 */
.setting-tip {
  font-size: 12px;
  color: #909399;
  margin-left: 12px;
}

@media (max-width: 768px) {
  .event-upload {
    padding: 16px;
  }
  
  .cover-uploader :deep(.el-upload) {
    width: 100%;
    height: 150px;
  }
  
  .cover-image {
    width: 100%;
    height: 150px;
  }
  
  .cover-uploader-icon {
    width: 100%;
    height: 150px;
    line-height: 150px;
  }
  
  .schedule-item {
    flex-direction: column;
    align-items: stretch;
  }
=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</style>