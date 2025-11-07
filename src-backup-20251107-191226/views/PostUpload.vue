<template>
  <div class="post-upload">
    <div class="page-header">
      <h1>发布帖子</h1>
      <p>分享您的文化见闻和心得体会</p >
    </div>

    <el-card class="upload-form">
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="formRef"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入帖子标题" />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="文化见闻" value="sight" />
            <el-option label="旅行游记" value="travel" />
            <el-option label="学习分享" value="study" />
            <el-option label="活动记录" value="event" />
          </el-select>
        </el-form-item>

        <el-form-item label="帖子内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入帖子内容..."
            maxlength="5000"
            show-word-limit
          />
        </el-form-item>

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

        <el-form-item label="付费设置">
          <el-switch
            v-model="form.isPaid"
            active-text="付费内容"
            inactive-text="免费内容"
          />
          <el-input
            v-if="form.isPaid"
            v-model="form.price"
            type="number"
            placeholder="请输入价格"
            style="width: 200px; margin-left: 16px;"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">
            {{ loading ? '发布中...' : '发布帖子' }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="$router.push('/posts')">返回列表</el-button>
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
import { usePostStore } from '@/stores/post'

const router = useRouter()
const postStore = usePostStore()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  title: '',
  category: '',
  content: '',
  images: [],
  isPaid: false,
  price: 0
})

const fileList = ref([])

const rules = {
  title: [
    { required: true, message: '请输入帖子标题', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入帖子内容', trigger: 'blur' }
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
    const postData = {
      ...form,
      authorId: 1, // 模拟用户ID
      viewCount: 0,
      likeCount: 0,
      commentCount: 0
    }

    const success = await postStore.createPost(postData)
    
    if (success) {
      ElMessage.success('帖子发布成功！')
      router.push('/posts')
    }
  } catch (error) {
    console.error('发布失败:', error)
    ElMessage.error('发布失败，请稍后重试')
  } finally {
    loading.value = false
  }
}

const resetForm = () => {
  formRef.value?.resetFields()
  fileList.value = []
  form.images = []
  form.isPaid = false
  form.price = 0
}
</script>

<style scoped>
.post-upload {
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
