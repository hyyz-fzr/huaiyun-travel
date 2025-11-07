<template>
  <div class="tag-form">
    <el-form
      :model="form"
      :rules="rules"
      ref="formRef"
      label-width="80px"
      label-position="right"
    >
      <el-form-item label="标签名称" prop="name">
        <el-input
          id="tagName"
          name="tagName"
          v-model="form.name"
          placeholder="请输入标签名称"
          maxlength="20"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="标签分类" prop="category">
        <el-select
          id="tagCategory"
          name="tagCategory"
          v-model="form.category"
          placeholder="请选择标签分类"
          style="width: 100%"
        >
          <el-option label="文化主题" value="culture" />
          <el-option label="地域标签" value="location" />
          <el-option label="活动类型" value="activity" />
          <el-option label="非遗分类" value="heritage" />
          <el-option label="自定义标签" value="custom" />
        </el-select>
      </el-form-item>

      <el-form-item label="标签描述" prop="description">
        <el-input
          id="tagDescription"
          name="tagDescription"
          v-model="form.description"
          type="textarea"
          :rows="3"
          placeholder="请输入标签描述"
          maxlength="100"
          show-word-limit
        />
      </el-form-item>

      <el-form-item label="标签颜色" prop="color">
        <el-color-picker
          id="tagColor"
          name="tagColor"
          v-model="form.color"
          :predefine="predefineColors"
          show-alpha
        />
        <span style="margin-left: 8px; color: #909399; font-size: 12px;">
          可选，默认使用分类颜色
        </span>
      </el-form-item>

      <el-form-item label="标签图标" prop="icon">
        <el-input
          id="tagIcon"
          name="tagIcon"
          v-model="form.icon"
          placeholder="请输入图标类名或URL"
          maxlength="50"
        >
          <template #append>
            <el-button @click="showIconSelector = true">
              选择图标
            </el-button>
          </template>
        </el-input>
        <div v-if="form.icon" class="icon-preview">
          <span>预览：</span>
          <i :class="form.icon" style="font-size: 20px; margin-left: 8px;"></i>
        </div>
      </el-form-item>

      <el-form-item label="立即启用" prop="status">
        <el-switch
          id="tagStatus"
          name="tagStatus"
          v-model="form.status"
          :active-value="'enabled'"
          :inactive-value="'disabled'"
        />
      </el-form-item>

      <el-form-item label="设为热门" prop="isHot">
        <el-switch 
          id="tagIsHot" 
          name="tagIsHot"
          v-model="form.isHot" 
        />
        <span style="margin-left: 8px; color: #909399; font-size: 12px;">
          热门标签会在首页突出显示
        </span>
      </el-form-item>

      <el-form-item>
        <el-space>
          <el-button type="primary" @click="handleSubmit" :loading="submitting">
            {{ isEdit ? '更新标签' : '创建标签' }}
          </el-button>
          <el-button @click="handleCancel">取消</el-button>
        </el-space>
      </el-form-item>
    </el-form>

    <!-- 图标选择器对话框 -->
    <el-dialog
      v-model="showIconSelector"
      title="选择图标"
      width="600px"
    >
      <IconSelector @select="handleIconSelect" />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, watch, defineProps, defineEmits } from 'vue'
import { ElMessage } from 'element-plus'
import IconSelector from '@/components/common/IconSelector.vue'

const props = defineProps({
  tagData: {
    type: Object,
    default: null
  },
  isEdit: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['submit', 'cancel'])

// 响应式数据
const formRef = ref()
const submitting = ref(false)
const showIconSelector = ref(false)

const form = reactive({
  name: '',
  category: 'culture',
  description: '',
  color: '',
  icon: '',
  status: 'enabled',
  isHot: false
})

// 预定义颜色
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  '#409EFF',
  '#67C23A',
  '#E6A23C',
  '#F56C6C',
  '#909399'
])

// 验证规则
const rules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 1, max: 20, message: '标签名称长度在 1 到 20 个字符', trigger: 'blur' }
  ],
  category: [
    { required: true, message: '请选择标签分类', trigger: 'change' }
  ],
  description: [
    { max: 100, message: '描述不能超过 100 个字符', trigger: 'blur' }
  ]
}

// 方法
const handleSubmit = async () => {
  if (!formRef.value) return

  try {
    const valid = await formRef.value.validate()
    if (!valid) return

    submitting.value = true
    
    // 准备提交数据
    const submitData = {
      ...form
    }
    
    emit('submit', submitData)
    
  } catch (error) {
    ElMessage.error('表单验证失败：' + error.message)
  } finally {
    submitting.value = false
  }
}

const handleCancel = () => {
  emit('cancel')
}

const handleIconSelect = (icon) => {
  form.icon = icon
  showIconSelector.value = false
}

const resetForm = () => {
  if (formRef.value) {
    formRef.value.resetFields()
  }
  Object.assign(form, {
    name: '',
    category: 'culture',
    description: '',
    color: '',
    icon: '',
    status: 'enabled',
    isHot: false
  })
}

// 监听props变化，初始化表单数据
watch(() => props.tagData, (newVal) => {
  if (newVal) {
    Object.assign(form, {
      name: newVal.name || '',
      category: newVal.category || 'culture',
      description: newVal.description || '',
      color: newVal.color || '',
      icon: newVal.icon || '',
      status: newVal.status || 'enabled',
      isHot: newVal.isHot || false
    })
  } else {
    resetForm()
  }
}, { immediate: true })

// 初始化
resetForm()
</script>

<style scoped>
.tag-form {
  padding: 0;
}

.icon-preview {
  margin-top: 8px;
  padding: 8px;
  background: #f5f7fa;
  border-radius: 4px;
  font-size: 14px;
  color: #606266;
}
</style>