<template>
  <div class="comment-management">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>评论管理</h1>
      <p>管理用户对内容的评论和回复</p >
    </div>

    <!-- 筛选和搜索区域 -->
    <div class="filter-section">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input
            v-model="searchKeyword"
            placeholder="搜索评论内容..."
            clearable
            @clear="handleSearch"
            @keyup.enter="handleSearch"
          >
            <template #prefix>
              <el-icon><Search /></el-icon>
            </template>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="filterStatus"
            placeholder="评论状态"
            clearable
            @change="handleSearch"
          >
            <el-option label="正常" value="published" />
            <el-option label="待审核" value="pending" />
            <el-option label="已隐藏" value="hidden" />
            <el-option label="违规" value="banned" />
          </el-select>
        </el-col>
        <el-col :span="4">
          <el-select
            v-model="filterContentType"
            placeholder="内容类型"
            clearable
            @change="handleSearch"
          >
            <el-option label="文化见闻" value="story" />
            <el-option label="旅行游记" value="travel" />
            <el-option label="学习分享" value="learning" />
            <el-option label="活动记录" value="activity" />
            <el-option label="文化遗产" value="heritage" />
            <el-option label="文创产品" value="product" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-date-picker
            v-model="dateRange"
            type="daterange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="handleSearch"
          />
        </el-col>
        <el-col :span="4">
          <el-button type="primary" @click="handleSearch">
            <el-icon><Search /></el-icon>
            搜索
          </el-button>
          <el-button @click="handleReset">
            <el-icon><Refresh /></el-icon>
            重置
          </el-button>
        </el-col>
      </el-row>
    </div>

    <!-- 评论表格 -->
    <div class="table-section">
      <el-table
        :data="commentList"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column label="评论内容" min-width="300">
          <template #default="{ row }">
            <div class="comment-content">
              <div class="comment-text">{{ row.content }}</div>
              <div class="comment-meta">
                <span class="author">作者: {{ row.authorName }}</span>
                <span class="time">{{ formatDate(row.createTime) }}</span>
              </div>
            </div>
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="getStatusTagType(row.status)" size="small">
              {{ getStatusText(row.status) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              link
              @click="handleViewDetail(row)"
            >
              详情
            </el-button>
            
            <el-button
              v-if="row.status === 'pending'"
              size="small"
              type="success"
              link
              @click="handleApprove(row.id)"
            >
              通过
            </el-button>
            
            <el-button
              v-if="row.status === 'published'"
              size="small"
              type="warning"
              link
              @click="handleHide(row.id)"
            >
              隐藏
            </el-button>
            
            <el-button
              size="small"
              type="danger"
              link
              @click="handleDelete(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pagination-section">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.size"
        :total="pagination.total"
        :page-sizes="[10, 20, 50, 100]"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Search, Refresh } from '@element-plus/icons-vue'

// 响应式数据
const searchKeyword = ref('')
const filterStatus = ref('')
const filterContentType = ref('')
const dateRange = ref('')
const loading = ref(false)
const selectedComments = ref([])

const commentList = ref([])

const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 方法
const loadCommentList = async () => {
  loading.value = true
  try {
    // 模拟数据
    await new Promise(resolve => setTimeout(resolve, 1000))
    commentList.value = [
      {
        id: 1,
        content: '这个文化遗产真的很棒！',
        authorName: '用户1',
        createTime: new Date(),
        status: 'published'
      },
      {
        id: 2, 
        content: '期待更多这样的内容',
        authorName: '用户2',
        createTime: new Date(Date.now() - 86400000),
        status: 'pending'
      }
    ]
    pagination.total = commentList.value.length
  } catch (error) {
    ElMessage.error('加载评论列表失败')
  } finally {
    loading.value = false
  }
}

const handleSearch = () => {
  pagination.current = 1
  loadCommentList()
}

const handleReset = () => {
  searchKeyword.value = ''
  filterStatus.value = ''
  filterContentType.value = ''
  dateRange.value = ''
  pagination.current = 1
  loadCommentList()
}

const handleSizeChange = (size) => {
  pagination.size = size
  pagination.current = 1
  loadCommentList()
}

const handleCurrentChange = (current) => {
  pagination.current = current
  loadCommentList()
}

const handleSelectionChange = (selection) => {
  selectedComments.value = selection
}

const handleViewDetail = (comment) => {
  ElMessage.info(`查看评论详情: ${comment.id}`)
}

const handleApprove = async (id) => {
  try {
    ElMessage.success('评论已通过审核')
    loadCommentList()
  } catch (error) {
    ElMessage.error('操作失败')
  }
}

const handleHide = async (id) => {
  try {
    await ElMessageBox.confirm('确定要隐藏该评论吗？', '隐藏提示', { type: 'warning' })
    ElMessage.success('评论已隐藏')
    loadCommentList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('操作失败')
    }
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该评论吗？', '删除提示', { type: 'error' })
    ElMessage.success('删除成功')
    loadCommentList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

// 工具函数
const getStatusTagType = (status) => {
  const statusMap = { published: 'success', pending: 'warning', hidden: 'info', banned: 'danger' }
  return statusMap[status] || 'info'
}

const getStatusText = (status) => {
  const statusMap = { published: '正常', pending: '待审核', hidden: '已隐藏', banned: '违规' }
  return statusMap[status] || '未知状态'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-CN')
}

// 生命周期
onMounted(() => {
  loadCommentList()
})
</script>

<style scoped>
.comment-management {
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.page-header {
  margin-bottom: 24px;
  border-bottom: 1px solid #f0f0f0;
  padding-bottom: 16px;
}

.page-header h1 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.page-header p {
  margin: 8px 0 0;
  color: #909399;
  font-size: 14px;
}

.filter-section {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 6px;
}

.table-section {
  margin-bottom: 20px;
}

.pagination-section {
  display: flex;
  justify-content: flex-end;
}

.comment-content {
  line-height: 1.5;
}

.comment-text {
  margin-bottom: 8px;
  word-break: break-word;
}

.comment-meta {
  display: flex;
  gap: 16px;
  font-size: 12px;
  color: #909399;
}

.author {
  font-weight: 500;
}
</style>