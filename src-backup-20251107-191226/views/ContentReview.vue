<template>
  <div class="content-review-page">
    <div class="page-header">
      <h1>内容审核</h1>
      <p>审核用户提交的文化内容</p >
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>待审核内容</span>
          <div class="header-actions">
            <el-button-group>
              <el-button 
                id="tabAll"
                name="tabAll"
                :type="activeTab === 'all' ? 'primary' : ''"
                @click="activeTab = 'all'"
              >
                全部
              </el-button>
              <el-button 
                id="tabPending"
                name="tabPending"
                :type="activeTab === 'pending' ? 'primary' : ''"
                @click="activeTab = 'pending'"
              >
                待审核
              </el-button>
              <el-button 
                id="tabApproved"
                name="tabApproved"
                :type="activeTab === 'approved' ? 'primary' : ''"
                @click="activeTab = 'approved'"
              >
                已通过
              </el-button>
              <el-button 
                id="tabRejected"
                name="tabRejected"
                :type="activeTab === 'rejected' ? 'primary' : ''"
                @click="activeTab = 'rejected'"
              >
                已拒绝
              </el-button>
            </el-button-group>
            <el-button @click="refreshData">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="filteredContents" v-loading="loading" style="width: 100%">
        <el-table-column type="selection" width="55" />
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <div class="title-cell">
              <span class="title-text">{{ row.title }}</span>
              <el-tag v-if="row.isNew" size="small" type="danger">新</el-tag>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="author" label="作者" width="120" />
        <el-table-column prop="type" label="类型" width="100">
          <template #default="{ row }">
            <el-tag :type="getTypeTag(row.type)">{{ row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="category" label="分类" width="120">
          <template #default="{ row }">
            {{ getCategoryName(row.category) }}
          </template>
        </el-table-column>
        <el-table-column prop="submitTime" label="提交时间" width="180" />
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTag(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="reviewer" label="审核人" width="120" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="viewDetail(row)">查看</el-button>
            <el-button 
              size="small" 
              type="success" 
              :disabled="row.status !== '待审核'"
              @click="approveContent(row)"
            >
              通过
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              :disabled="row.status !== '待审核'"
              @click="rejectContent(row)"
            >
              拒绝
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="table-actions">
        <el-button 
          type="primary" 
          :disabled="selectedContents.length === 0"
          @click="batchApprove"
        >
          批量通过
        </el-button>
        <el-button 
          type="danger" 
          :disabled="selectedContents.length === 0"
          @click="batchReject"
        >
          批量拒绝
        </el-button>
        <el-pagination
          id="contentPagination"
          name="contentPagination"
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          class="pagination"
        />
      </div>
    </el-card>

    <!-- 内容详情对话框 -->
    <el-dialog v-model="detailVisible" title="内容详情" width="800px" top="5vh">
      <div v-if="currentContent" class="content-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="标题">{{ currentContent.title }}</el-descriptions-item>
          <el-descriptions-item label="作者">{{ currentContent.author }}</el-descriptions-item>
          <el-descriptions-item label="类型">
            <el-tag :type="getTypeTag(currentContent.type)">{{ currentContent.type }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="分类">{{ getCategoryName(currentContent.category) }}</el-descriptions-item>
          <el-descriptions-item label="提交时间">{{ currentContent.submitTime }}</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusTag(currentContent.status)">{{ currentContent.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="审核人">{{ currentContent.reviewer || '未审核' }}</el-descriptions-item>
          <el-descriptions-item label="内容摘要" :span="2">
            <div class="content-preview">
              {{ currentContent.content }}
            </div>
          </el-descriptions-item>
          <el-descriptions-item label="审核意见" :span="2" v-if="currentContent.reviewComment">
            {{ currentContent.reviewComment }}
          </el-descriptions-item>
        </el-descriptions>

        <div class="review-action" v-if="currentContent.status === '待审核'">
          <el-divider>审核操作</el-divider>
          <el-form :model="reviewForm" label-width="80px">
            <el-form-item label="审核意见">
              <el-input
                id="reviewComment"
                name="reviewComment"
                v-model="reviewForm.comment"
                type="textarea"
                :rows="3"
                placeholder="请输入审核意见（可选）"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="success" @click="approveCurrent">通过审核</el-button>
              <el-button type="danger" @click="rejectCurrent">拒绝审核</el-button>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Refresh } from '@element-plus/icons-vue'

const loading = ref(false)
const detailVisible = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const activeTab = ref('all')
const currentContent = ref(null)
const selectedContents = ref([])
const reviewForm = ref({
  comment: ''
})

// 模拟数据
const contentsData = ref([
  {
    id: 1,
    title: '八公山历史文化探秘',
    author: '文化爱好者',
    type: '文章',
    category: 'heritage',
    content: '八公山作为淮南的重要文化地标，拥有丰富的历史文化内涵...',
    submitTime: '2024-01-15 10:30:00',
    status: '待审核',
    reviewer: '',
    isNew: true
  },
  {
    id: 2,
    title: '淮南豆腐制作工艺传承',
    author: '传统工艺师',
    type: '视频',
    category: 'craft',
    content: '豆腐制作是淮南的传统工艺，有着悠久的历史...',
    submitTime: '2024-01-14 14:20:00',
    status: '已通过',
    reviewer: '管理员',
    reviewComment: '内容详实，符合要求'
  },
  {
    id: 3,
    title: '淮河文化摄影作品',
    author: '摄影爱好者',
    type: '图片',
    category: 'art',
    content: '一组关于淮河风光的摄影作品...',
    submitTime: '2024-01-13 16:45:00',
    status: '已拒绝',
    reviewer: '审核员',
    reviewComment: '图片质量不符合要求'
  }
])

const filteredContents = computed(() => {
  let filtered = contentsData.value
  
  if (activeTab.value === 'pending') {
    filtered = filtered.filter(item => item.status === '待审核')
  } else if (activeTab.value === 'approved') {
    filtered = filtered.filter(item => item.status === '已通过')
  } else if (activeTab.value === 'rejected') {
    filtered = filtered.filter(item => item.status === '已拒绝')
  }
  
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

const getTypeTag = (type) => {
  const typeMap = {
    '文章': '',
    '视频': 'success',
    '图片': 'warning'
  }
  return typeMap[type] || ''
}

const getStatusTag = (status) => {
  const statusMap = {
    '待审核': 'warning',
    '已通过': 'success',
    '已拒绝': 'danger'
  }
  return statusMap[status] || ''
}

const getCategoryName = (category) => {
  const categoryMap = {
    'heritage': '文化遗产',
    'craft': '传统工艺',
    'art': '文化艺术',
    'event': '活动资讯'
  }
  return categoryMap[category] || category
}

const refreshData = async () => {
  loading.value = true
  setTimeout(() => {
    total.value = contentsData.value.length
    loading.value = false
    ElMessage.success('数据已刷新')
  }, 1000)
}

const viewDetail = (content) => {
  currentContent.value = content
  reviewForm.value.comment = ''
  detailVisible.value = true
}

const approveContent = async (content) => {
  try {
    await ElMessageBox.confirm(`确定通过"${content.title}"吗？`, '通过审核')
    content.status = '已通过'
    content.reviewer = '当前用户'
    ElMessage.success('内容已通过审核')
  } catch {
    // 用户取消
  }
}

const rejectContent = async (content) => {
  try {
    await ElMessageBox.confirm(`确定拒绝"${content.title}"吗？`, '拒绝审核', {
      confirmButtonText: '确定拒绝',
      cancelButtonText: '再想想',
      type: 'warning'
    })
    content.status = '已拒绝'
    content.reviewer = '当前用户'
    ElMessage.success('内容已拒绝')
  } catch {
    // 用户取消
  }
}

const approveCurrent = async () => {
  if (!currentContent.value) return
  
  try {
    await ElMessageBox.confirm('确定通过此内容吗？', '通过审核')
    currentContent.value.status = '已通过'
    currentContent.value.reviewer = '当前用户'
    currentContent.value.reviewComment = reviewForm.value.comment
    detailVisible.value = false
    ElMessage.success('内容已通过审核')
  } catch {
    // 用户取消
  }
}

const rejectCurrent = async () => {
  if (!currentContent.value) return
  
  try {
    await ElMessageBox.confirm('确定拒绝此内容吗？', '拒绝审核', {
      confirmButtonText: '确定拒绝',
      cancelButtonText: '再想想',
      type: 'warning'
    })
    currentContent.value.status = '已拒绝'
    currentContent.value.reviewer = '当前用户'
    currentContent.value.reviewComment = reviewForm.value.comment
    detailVisible.value = false
    ElMessage.success('内容已拒绝')
  } catch {
    // 用户取消
  }
}

const batchApprove = async () => {
  if (selectedContents.value.length === 0) return
  
  try {
    await ElMessageBox.confirm(`确定批量通过 ${selectedContents.value.length} 条内容吗？`, '批量通过')
    selectedContents.value.forEach(content => {
      content.status = '已通过'
      content.reviewer = '当前用户'
    })
    selectedContents.value = []
    ElMessage.success(`已批量通过 ${selectedContents.value.length} 条内容`)
  } catch {
    // 用户取消
  }
}

const batchReject = async () => {
  if (selectedContents.value.length === 0) return
  
  try {
    await ElMessageBox.confirm(`确定批量拒绝 ${selectedContents.value.length} 条内容吗？`, '批量拒绝', {
      confirmButtonText: '确定拒绝',
      cancelButtonText: '再想想',
      type: 'warning'
    })
    selectedContents.value.forEach(content => {
      content.status = '已拒绝'
      content.reviewer = '当前用户'
    })
    selectedContents.value = []
    ElMessage.success(`已批量拒绝 ${selectedContents.value.length} 条内容`)
  } catch {
    // 用户取消
  }
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.content-review-page {
  max-width: 1400px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 2.2em;
}

.page-header p {
  color: #606266;
  font-size: 1.1em;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  flex: 1;
  min-width: 0;
}

.table-actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.pagination {
  margin: 0;
}

.content-detail {
  max-height: 60vh;
  overflow-y: auto;
}

.content-preview {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 4px;
  border-left: 4px solid #409eff;
  white-space: pre-wrap;
  line-height: 1.6;
}

.review-action {
  margin-top: 20px;
}

:deep(.el-descriptions__label) {
  font-weight: 600;
  width: 100px;
}
</style>