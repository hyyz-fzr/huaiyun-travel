<template>
  <div class="product-upload">
    <div class="page-header">
      <h1>上传商品</h1>
      <p>分享具有淮南文化特色的文创产品</p >
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
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入商品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择分类">
                <el-option label="服饰" value="服饰" />
                <el-option label="文具" value="文具" />
                <el-option label="工艺品" value="工艺品" />
                <el-option label="食品" value="食品" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商品描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入商品描述"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="价格" prop="price">
              <el-input v-model="form.price" type="number" placeholder="请输入价格">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原价">
              <el-input v-model="form.originalPrice" type="number" placeholder="请输入原价">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存" prop="stock">
              <el-input v-model="form.stock" type="number" placeholder="请输入库存数量" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商品标签">
          <el-input
            v-model="form.tags"
            placeholder="请输入标签，用逗号分隔"
          />
        </el-form-item>

        <el-form-item label="上传商品图片">
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
          <el-button @click="$router.push('/products')">返回列表</el-button>
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
import { useProductStore } from '@/stores/product'

const router = useRouter()
const productStore = useProductStore()
const formRef = ref()
const loading = ref(false)

const form = reactive({
  name: '',
  category: '',
  description: '',
  price: '',
  originalPrice: '',
  stock: '',
  tags: '',
  images: []
})

const fileList = ref([])

const rules = {
  name: [
    { required: true, message: '请输入商品名称', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择商品分类', trigger: 'change' }
  ],
  price: [
    { required: true, message: '请输入价格', trigger: 'blur' },
    { type: 'number', message: '价格必须为数字值', trigger: 'blur', transform: value => Number(value) }
  ],
  stock: [
    { required: true, message: '请输入库存数量', trigger: 'blur' },
    { type: 'number', message: '库存必须为数字值', trigger: 'blur', transform: value => Number(value) }
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
    const productData = {
      ...form,
      price: Number(form.price),
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      stock: Number(form.stock)
    }

    const success = await productStore.createProduct(productData)
    
    if (success) {
      ElMessage.success('商品上传成功！')
      router.push('/products')
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
  form.originalPrice = ''
  form.tags = ''
}
</script>

<style scoped>
.product-upload {
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