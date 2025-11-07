<template>
  <el-dialog
    v-model="dialogVisible"
    title="发布文化见闻"
    width="600px"
    :before-close="handleClose"
  >
    <el-form :model="form" :rules="rules" ref="formRef" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input 
          id="postTitle"
          name="postTitle"
          v-model="form.title" 
          placeholder="请输入帖子标题" 
        />
      </el-form-item>
      
      <el-form-item label="内容" prop="content">
        <el-input
          id="postContent"
          name="postContent"
          v-model="form.content"
          type="textarea"
          :rows="4"
          placeholder="分享您的文化见闻、旅行故事..."
        />
      </el-form-item>
      
      <el-form-item label="封面图">
        <el-upload
          action="/api/upload"
          :before-upload="beforeUpload"
          :on-success="handleCoverSuccess"
          :show-file-list="false"
        >
          <el-button type="primary">上传封面</el-button>
          <template #tip>
            <div class="el-upload__tip">建议尺寸 800x400px，支持 JPG/PNG 格式</div>
          </template>
        </el-upload>
        <div v-if="form.coverImg" class="preview-image">
          < img :src="form.coverImg" alt="封面预览" />
        </div>
      </el-form-item>
      
      <el-form-item label="付费内容">
        <el-switch 
          id="isPaidSwitch"
          name="isPaid"
          v-model="form.isPaid" 
        />
        <el-input-number
          id="postPrice"
          name="postPrice"
          v-if="form.isPaid"
          v-model="form.price"
          :min="1"
          :max="999"
          style="margin-left: 10px"
          placeholder="价格"
        />
        <span v-if="form.isPaid" style="margin-left: 5px">元</span>
      </el-form-item>

      <el-form-item label="标签">
        <el-select
          id="postTags"
          name="postTags"
          v-model="form.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="选择或输入标签"
          style="width: 100%"
        >
          <el-option
            v-for="tag in presetTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <el-button @click="handleClose">取消</el-button>
      <el-button type="primary" :loading="loading" @click="handleSubmit">
        发布
      </el-button>
    </template>
  </el-dialog>
</template>

<script setup>
/* eslint-disable no-undef */
import { ref, reactive, watch } from 'vue'
import { ElMessage } from 'element-plus'
// 暂时注释掉request，因为目前使用模拟数据
// import request from '@/utils/request'

// 定义props和emits
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['update:modelValue', 'success'])

const dialogVisible = ref(false)
const loading = ref(false)
const formRef = ref()

// 预设标签
const presetTags = [
  '淮南文化',
  '非遗传承',
  '豆腐文化',
  '八公山',
  '剪纸艺术',
  '传统技艺',
  '旅游攻略',
  '文化体验'
]

const form = reactive({
  title: '',
  content: '',
  coverImg: '',
  isPaid: false,
  price: 0,
  tags: []
})

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 3, max: 50, message: '标题长度在 3 到 50 个字符', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' },
    { min: 10, message: '内容至少10个字符', trigger: 'blur' }
  ]
}

watch(() => props.modelValue, (val) => {
  dialogVisible.value = val
})

watch(dialogVisible, (val) => {
  emit('update:modelValue', val)
  if (!val) {
    resetForm()
  }
})

const resetForm = () => {
  Object.assign(form, {
    title: '',
    content: '',
    coverImg: '',
    isPaid: false,
    price: 0,
    tags: []
  })
  if (formRef.value) {
    formRef.value.clearValidate()
  }
}

const handleClose = () => {
  dialogVisible.value = false
}

const beforeUpload = (file) => {
  const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
  const isLt2M = file.size / 1024 / 1024 < 2

  if (!isJPG) {
    ElMessage.error('封面图片只能是 JPG/PNG 格式!')
    return false
  }
  if (!isLt2M) {
    ElMessage.error('封面图片大小不能超过 2MB!')
    return false
  }
  return true
}

const handleCoverSuccess = (response) => {
  if (response.code === 200) {
    form.coverImg = response.data
    ElMessage.success('封面图上传成功')
  }
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    loading.value = true

    // 模拟发布成功
    const mockResponse = {
      code: 200,
      message: '发布成功',
      data: { id: Date.now(), ...form }
    }
    const response = mockResponse

    if (response.code === 200) {
      ElMessage.success('文化见闻发布成功')
      emit('success')
      handleClose()
    }
  } catch (error) {
    ElMessage.error('发布失败，请重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.preview-image {
  margin-top: 10px;
}

.preview-image img {
  max-width: 200px;
  max-height: 100px;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>