<template>
  <div class="heritage-upload">
    <div class="page-header">
      <h1>上传文化遗产</h1>
      <p>分享您了解的淮南文化遗产信息</p >
    </div>

    <el-card class="upload-form">
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="formRef"
        label-width="120px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="文化遗产名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入文化遗产名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保护级别" prop="level">
              <el-select v-model="form.level" placeholder="请选择保护级别">
                <el-option label="世界级" value="世界级" />
                <el-option label="国家级" value="国家级" />
                <el-option label="省级" value="省级" />
                <el-option label="市级" value="市级" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="所在地" prop="location">
          <el-input v-model="form.location" placeholder="请输入具体地址" />
        </el-form-item>

        <el-form-item label="简介" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入文化遗产的简要介绍"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="详细介绍" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="请输入文化遗产的详细介绍，包括历史背景、文化价值等"
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开放时间" prop="openTime">
              <el-input v-model="form.openTime" placeholder="如：08:00-17:30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门票信息" prop="ticketPrice">
              <el-input v-model="form.ticketPrice" placeholder="如：免费或具体价格" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="上传图片">
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            multiple
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">
            {{ loading ? '提交中...' : '提交' }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="$router.push('/heritage')">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import { useHeritageStore } from '@/stores/heritage'

const router = useRouter()
const heritageStore = useHeritageStore()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  name: '',
  level: '',
  location: '',
  description: '',
  content: '',
  openTime: '',
  ticketPrice: '',
  images: []
})

const fileList = ref([])

const rules = {
  name: [
    { required: true, message: '请输入文化遗产名称', trigger: 'blur' }
  ],
  level: [
    { required: true, message: '请选择保护级别', trigger: 'change' }
  ],
  location: [
    { required: true, message: '请输入所在地', trigger: 'blur' }
  ],
  description: [
    { required: true, message: '请输入简介', trigger: 'blur' }
  ]
}

const handleUploadSuccess = (response, file) => {
  form.images.push(response.data)
  ElMessage.success('图片上传成功')
}

const handleRemove = (file) => {
  const index = form.images.findIndex(url => url === file.url)
  if (index !== -1) {
    form.images.splice(index, 1)
  }
}

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isJPG) {
    ElMessage.error('上传图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('上传图片大小不能超过 5MB!')
    return false
  }
  return true
}

const submitForm = async () => {
  if (!formRef.value) return
  
  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true
    const success = await heritageStore.createHeritage(form)
    
    if (success) {
      ElMessage.success('文化遗产上传成功！')
      router.push('/heritage')
    }
  } catch (error) {
    console.error('提交失败:', error)
    ElMessage.error('提交失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
  fileList.value = []
  form.images = []
}
</script>

<style scoped>
.heritage-upload {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.page-header h1 {
  color: #333;
  margin-bottom: 10px;
}

.page-header p {
  color: #666;
}

.upload-form {
  padding: 30px;
}
</style>