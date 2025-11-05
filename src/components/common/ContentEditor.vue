<template>
  <div class="content-editor">
    <el-form ref="formRef" :model="formData" :rules="rules" label-width="80px">
      <el-form-item label="标题" prop="title">
        <el-input
          v-model="formData.title"
          placeholder="请输入内容标题"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="分类" prop="category">
        <el-select v-model="formData.category" placeholder="请选择分类">
          <el-option
            v-for="category in categories"
            :key="category.value"
            :label="category.label"
            :value="category.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="标签" prop="tags">
        <el-select
          v-model="formData.tags"
          multiple
          filterable
          allow-create
          default-first-option
          placeholder="请选择或输入标签"
        >
          <el-option
            v-for="tag in availableTags"
            :key="tag"
            :label="tag"
            :value="tag"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="封面" prop="coverImage">
        <el-upload
          class="cover-upload"
          action="#"
          :show-file-list="false"
          :before-upload="beforeCoverUpload"
          :http-request="handleCoverUpload"
        >
          < img v-if="formData.coverImage" :src="formData.coverImage" class="cover-image" />
          <el-icon v-else class="cover-upload-icon"><Plus /></el-icon>
        </el-upload>
      </el-form-item>

      <el-form-item label="内容" prop="content">
        <div class="editor-container">
          <div class="editor-toolbar">
            <el-button-group>
              <el-button :icon="Bold" @click="formatText('bold')" />
              <el-button :icon="Italic" @click="formatText('italic')" />
              <el-button :icon="Underline" @click="formatText('underline')" />
            </el-button-group>
            <el-button-group>
              <el-button :icon="List" @click="formatText('insertUnorderedList')" />
              <el-button :icon="OrderedList" @click="formatText('insertOrderedList')" />
            </el-button-group>
            <el-button-group>
              <el-button :icon="Picture" @click="insertImage" />
              <el-button :icon="Link" @click="insertLink" />
            </el-button-group>
          </div>
          <div
            ref="editorRef"
            class="editor-content"
            contenteditable="true"
            @input="handleContentInput"
            @paste="handlePaste"
          ></div>
        </div>
      </el-form-item>

      <el-form-item label="摘要" prop="summary">
        <el-input
          v-model="formData.summary"
          type="textarea"
          :rows="3"
          placeholder="请输入内容摘要"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="loading">
          发布内容
        </el-button>
        <el-button @click="handleSaveDraft">保存草稿</el-button>
        <el-button @click="handleReset">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import { ref, reactive, nextTick, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Plus,
  Bold,
  Italic,
  Underline,
  List,
  OrderedList,
  Picture,
  Link
} from '@element-plus/icons-vue'

const props = defineProps({
  editData: {
    type: Object,
    default: null
  }
})

const emit = defineEmits(['submit', 'save-draft'])

const formRef = ref()
const editorRef = ref()
const loading = ref(false)

const formData = reactive({
  title: '',
  category: '',
  tags: [],
  coverImage: '',
  content: '',
  summary: ''
})

const categories = [
  { label: '文化遗产', value: 'heritage' },
  { label: '豆腐文化', value: 'tofu' },
  { label: '八公山传说', value: 'bagong' },
  { label: '地方特色', value: 'local' },
  { label: '旅游攻略', value: 'travel' }
]

const availableTags = [
  '淮南', '豆腐', '八公山', '文化遗产', '旅游',
  '美食', '传统工艺', '民俗文化', '历史故事'
]

const rules = {
  title: [
    { required: true, message: '请输入标题', trigger: 'blur' },
    { min: 5, max: 100, message: '标题长度在 5 到 100 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择分类', trigger: 'change' }
  ],
  content: [
    { required: true, message: '请输入内容', trigger: 'blur' }
  ]
}

// 初始化编辑器内容
onMounted(() => {
  if (props.editData) {
    Object.assign(formData, props.editData)
    nextTick(() => {
      if (editorRef.value) {
        editorRef.value.innerHTML = props.editData.content
      }
    })
  }
})

const handleContentInput = (event) => {
  formData.content = event.target.innerHTML
}

const handlePaste = (event) => {
  event.preventDefault()
  const text = event.clipboardData.getData('text/plain')
  document.execCommand('insertText', false, text)
}

const formatText = (command, value = null) => {
  document.execCommand(command, false, value)
  editorRef.value.focus()
}

const insertImage = () => {
  const url = prompt('请输入图片URL:')
  if (url) {
    document.execCommand('insertImage', false, url)
  }
}

const insertLink = () => {
  const url = prompt('请输入链接URL:')
  if (url) {
    document.execCommand('createLink', false, url)
  }
}

const beforeCoverUpload = (file) => {
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

const handleCoverUpload = (options) => {
  // 模拟上传过程
  const file = options.file
  const reader = new FileReader()
  reader.onload = (e) => {
    formData.coverImage = e.target.result
    ElMessage.success('封面图片上传成功')
  }
  reader.readAsDataURL(file)
}

const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    await formRef.value.validate()
    
    if (!formData.content.trim()) {
      ElMessage.error('请输入内容')
      return
    }

    loading.value = true
    emit('submit', { ...formData })
  } catch (error) {
    ElMessage.error('表单验证失败，请检查输入')
  } finally {
    loading.value = false
  }
}

const handleSaveDraft = () => {
  emit('save-draft', { ...formData })
  ElMessage.success('草稿保存成功')
}

const handleReset = () => {
  formRef.value?.resetFields()
  if (editorRef.value) {
    editorRef.value.innerHTML = ''
  }
  Object.assign(formData, {
    title: '',
    category: '',
    tags: [],
    coverImage: '',
    content: '',
    summary: ''
  })
}
</script>

<style scoped lang="scss">
.content-editor {
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.cover-upload {
  width: 200px;
  height: 120px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;

  &:hover {
    border-color: #409eff;
  }

  .cover-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cover-upload-icon {
    font-size: 28px;
    color: #8c939d;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
}

.editor-container {
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  overflow: hidden;
}

.editor-toolbar {
  padding: 8px;
  background: #f5f7fa;
  border-bottom: 1px solid #dcdfe6;
  display: flex;
  gap: 10px;

  .el-button-group {
    display: flex;
  }
}

.editor-content {
  min-height: 300px;
  padding: 12px;
  outline: none;
  line-height: 1.6;

  &:focus {
    border-color: #409eff;
  }

  &:empty:before {
    content: '请输入内容...';
    color: #c0c4cc;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .content-editor {
    padding: 10px;
  }

  .editor-toolbar {
    flex-wrap: wrap;
    gap: 5px;
  }
}
</style>