<template>
  <div class="content-review">
    <el-form ref="formRef" :model="formData" label-width="80px">
      <el-form-item label="审核结果">
        <el-radio-group 
          id="reviewStatus" 
          name="reviewStatus"
          v-model="formData.status"
        >
          <el-radio label="published">通过</el-radio>
          <el-radio label="rejected">拒绝</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item v-if="formData.status === 'rejected'" label="拒绝原因">
        <el-input
          id="rejectReason"
          name="rejectReason"
          v-model="formData.rejectReason"
          type="textarea"
          :rows="3"
          placeholder="请输入拒绝原因"
          maxlength="500"
          show-word-limit
        />
      </el-form-item>
      
      <el-form-item label="审核备注">
        <el-input
          id="reviewNote"
          name="reviewNote"
          v-model="formData.reviewNote"
          type="textarea"
          :rows="2"
          placeholder="请输入审核备注（可选）"
          maxlength="200"
          show-word-limit
        />
      </el-form-item>
    </el-form>
    
    <div class="review-actions">
      <el-button @click="$emit('cancel')">取消</el-button>
      <el-button type="primary" @click="handleSubmit">提交审核</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { useContentStore } from '@/stores/content'

const props = defineProps({
  content: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['success', 'cancel'])

const contentStore = useContentStore()
const formRef = ref()

const formData = reactive({
  status: 'published',
  rejectReason: '',
  reviewNote: ''
})

const handleSubmit = async () => {
  try {
    await contentStore.reviewContent(props.content.id, formData)
    ElMessage.success('审核提交成功')
    emit('success')
  } catch (error) {
    ElMessage.error('审核提交失败')
  }
}
</script>

<style scoped>
.content-review {
  padding: 20px 0;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 20px;
}
</style>