<template>
  <div class="tag-management">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>标签管理</h1>
      <p>管理系统内容标签，支持分类筛选和热门标签管理</p >
    </div>

    <!-- 操作工具栏 -->
    <div class="action-toolbar">
      <el-row :gutter="20" justify="space-between" align="middle">
        <el-col :span="12">
          <el-space>
            <el-button type="primary" @click="handleCreateTag">
              <el-icon><Plus /></el-icon>
              新建标签
            </el-button>
            <el-button type="success" @click="handleBatchEnable" :disabled="selectedTags.length === 0">
              <el-icon><Check /></el-icon>
              批量启用
            </el-button>
            <el-button type="warning" @click="handleBatchDisable" :disabled="selectedTags.length === 0">
              <el-icon><Close /></el-icon>
              批量禁用
            </el-button>
            <el-button type="danger" @click="handleBatchDelete" :disabled="selectedTags.length === 0">
              <el-icon><Delete /></el-icon>
              批量删除
            </el-button>
          </el-space>
        </el-col>
        <el-col :span="12" class="text-right">
          <el-space>
            <el-input
              v-model="searchKeyword"
              placeholder="搜索标签名称..."
              clearable
              style="width: 200px;"
              @clear="handleSearch"
              @keyup.enter="handleSearch"
            >
              <template #prefix>
                <el-icon><Search /></el-icon>
              </template>
            </el-input>
            <el-button type="primary" @click="handleSearch">
              搜索
            </el-button>
            <el-button @click="handleReset">
              重置
            </el-button>
          </el-space>
        </el-col>
      </el-row>
    </div>

    <!-- 标签分类筛选 -->
    <div class="category-filter">
      <el-radio-group v-model="filterCategory" @change="handleCategoryChange">
        <el-radio-button label="">全部标签</el-radio-button>
        <el-radio-button label="culture">文化主题</el-radio-button>
        <el-radio-button label="location">地域标签</el-radio-button>
        <el-radio-button label="activity">活动类型</el-radio-button>
        <el-radio-button label="heritage">非遗分类</el-radio-button>
        <el-radio-button label="custom">自定义标签</el-radio-button>
      </el-radio-group>
    </div>

    <!-- 标签统计 -->
    <div class="tag-stats">
      <el-row :gutter="20">
        <el-col :span="6">
          <el-statistic title="总标签数" :value="tagStats.total" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="启用标签" :value="tagStats.enabled" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="热门标签" :value="tagStats.hot" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="今日新增" :value="tagStats.todayNew" />
        </el-col>
      </el-row>
    </div>

    <!-- 标签表格 -->
    <div class="table-section">
      <el-table
        :data="tagList"
        v-loading="loading"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        :default-sort="{ prop: 'usageCount', order: 'descending' }"
      >
        <el-table-column type="selection" width="55" />
        
        <el-table-column label="标签名称" min-width="150">
          <template #default="{ row }">
            <div class="tag-name-cell">
              <el-tag
                :type="getTagType(row.category)"
                :effect="row.isHot ? 'dark' : 'light'"
                :closable="false"
              >
                {{ row.name }}
              </el-tag>
              <el-icon v-if="row.isHot" color="#F56C6C" class="hot-icon">
                <Fire />
              </el-icon>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="category" label="分类" width="120">
          <template #default="{ row }">
            <el-tag :type="getCategoryTagType(row.category)" size="small">
              {{ getCategoryText(row.category) }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="usageCount" label="使用次数" width="100" sortable>
          <template #default="{ row }">
            <span :class="{ 'hot-count': row.usageCount > 100 }">
              {{ row.usageCount }}
            </span>
          </template>
        </el-table-column>

        <el-table-column prop="contentCount" label="关联内容" width="100" sortable>
          <template #default="{ row }">
            {{ row.contentCount }}
          </template>
        </el-table-column>

        <el-table-column label="状态" width="100">
          <template #default="{ row }">
            <el-tag :type="row.status === 'enabled' ? 'success' : 'danger'" size="small">
              {{ row.status === 'enabled' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>

        <el-table-column prop="creator" label="创建者" width="120">
          <template #default="{ row }">
            <div class="creator-info">
              <el-avatar
                :size="24"
                :src="row.creatorAvatar || '/images/avatars/default.jpg'"
              />
              <span style="margin-left: 8px;">{{ row.creatorName }}</span>
            </div>
          </template>
        </el-table-column>

        <el-table-column prop="createTime" label="创建时间" width="180" sortable>
          <template #default="{ row }">
            {{ formatDate(row.createTime) }}
          </template>
        </el-table-column>

        <el-table-column prop="updateTime" label="更新时间" width="180" sortable>
          <template #default="{ row }">
            {{ formatDate(row.updateTime) }}
          </template>
        </el-table-column>

        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button
              size="small"
              type="primary"
              link
              @click="handleEdit(row)"
            >
              编辑
            </el-button>
            
            <el-button
              v-if="row.status === 'enabled'"
              size="small"
              type="warning"
              link
              @click="handleDisable(row.id)"
            >
              禁用
            </el-button>
            
            <el-button
              v-if="row.status === 'disabled'"
              size="small"
              type="success"
              link
              @click="handleEnable(row.id)"
            >
              启用
            </el-button>

            <el-button
              v-if="!row.isHot && row.usageCount > 50"
              size="small"
              type="info"
              link
              @click="handleSetHot(row.id, true)"
            >
              设热门
            </el-button>

            <el-button
              v-if="row.isHot"
              size="small"
              type="info"
              link
              @click="handleSetHot(row.id, false)"
            >
              取消热门
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

    <!-- 创建/编辑标签对话框 -->
    <el-dialog
      v-model="tagDialogVisible"
      :title="isEditMode ? '编辑标签' : '新建标签'"
      width="500px"
      :before-close="handleDialogClose"
    >
      <TagForm
        :tag-data="currentTag"
        :is-edit="isEditMode"
        @submit="handleTagSubmit"
        @cancel="handleDialogClose"
      />
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Check, Close, Delete, Search, HotWater } from '@element-plus/icons-vue'
import TagForm from '@/components/common/TagForm.vue'
import { contentStore } from '@/stores/content'

// Store
const store = useContentStore()

// 响应式数据
const searchKeyword = ref('')
const filterCategory = ref('')
const loading = ref(false)
const tagDialogVisible = ref(false)
const isEditMode = ref(false)
const selectedTags = ref([])
const currentTag = ref(null)

const tagList = ref([])

const pagination = reactive({
  current: 1,
  size: 10,
  total: 0
})

// 标签统计
const tagStats = reactive({
  total: 0,
  enabled: 0,
  hot: 0,
  todayNew: 0
})

// 方法
const loadTagList = async () => {
  loading.value = true
  try {
    const params = {
      page: pagination.current,
      size: pagination.size,
      keyword: searchKeyword.value,
      category: filterCategory.value
    }
    
    await store.fetchTagList(params)
    tagList.value = store.tagList
    pagination.total = store.tagTotalCount
    // 更新统计信息
    updateTagStats()
  } catch (error) {
    ElMessage.error('加载标签列表失败：' + error.message)
  } finally {
    loading.value = false
  }
}

const updateTagStats = () => {
  const tags = store.tagList
  tagStats.total = store.tagTotalCount
  tagStats.enabled = tags.filter(tag => tag.status === 'enabled').length
  tagStats.hot = tags.filter(tag => tag.isHot).length
  tagStats.todayNew = tags.filter(tag => {
    const today = new Date().toDateString()
    const createDate = new Date(tag.createTime).toDateString()
    return createDate === today
  }).length
}

const handleSearch = () => {
  pagination.current = 1
  loadTagList()
}

const handleReset = () => {
  searchKeyword.value = ''
  filterCategory.value = ''
  pagination.current = 1
  loadTagList()
}

const handleCategoryChange = () => {
  pagination.current = 1
  loadTagList()
}

const handleSizeChange = (size) => {
  pagination.size = size
  pagination.current = 1
  loadTagList()
}

const handleCurrentChange = (current) => {
  pagination.current = current
  loadTagList()
}

const handleSelectionChange = (selection) => {
  selectedTags.value = selection
}

const handleCreateTag = () => {
  isEditMode.value = false
  currentTag.value = null
  tagDialogVisible.value = true
}

const handleEdit = (tag) => {
  isEditMode.value = true
  currentTag.value = { ...tag }
  tagDialogVisible.value = true
}

const handleEnable = async (id) => {
  try {
    await store.enableTag(id)
    ElMessage.success('标签已启用')
    loadTagList()
  } catch (error) {
    ElMessage.error('启用失败：' + error.message)
  }
}

const handleDisable = async (id) => {
  try {
    await ElMessageBox.confirm('确定要禁用该标签吗？禁用后相关内容将不再显示此标签', '禁用提示', {
      type: 'warning'
    })
    
    await store.disableTag(id)
    ElMessage.success('标签已禁用')
    loadTagList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('禁用失败：' + error.message)
    }
  }
}

const handleSetHot = async (id, isHot) => {
  try {
    await store.setTagHot(id, isHot)
    ElMessage.success(isHot ? '标签已设为热门' : '标签已取消热门')
    loadTagList()
  } catch (error) {
    ElMessage.error('操作失败：' + error.message)
  }
}

const handleDelete = async (id) => {
  try {
    await ElMessageBox.confirm('确定要删除该标签吗？此操作不可恢复！', '删除提示', {
      type: 'error',
      confirmButtonText: '确定删除',
      cancelButtonText: '取消'
    })
    
    await store.deleteTag(id)
    ElMessage.success('删除成功')
    loadTagList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败：' + error.message)
    }
  }
}

const handleTagSubmit = async (formData) => {
  try {
    if (isEditMode.value) {
      await store.updateTag(currentTag.value.id, formData)
      ElMessage.success('标签更新成功')
    } else {
      await store.createTag(formData)
      ElMessage.success('标签创建成功')
    }
    
    tagDialogVisible.value = false
    loadTagList()
  } catch (error) {
    ElMessage.error('操作失败：' + error.message)
  }
}

const handleDialogClose = () => {
  tagDialogVisible.value = false
  currentTag.value = null
}

// 批量操作
const handleBatchEnable = async () => {
  try {
    await ElMessageBox.confirm(`确定要启用 ${selectedTags.value.length} 个标签吗？`, '批量启用', {
      type: 'warning'
    })
    
    const ids = selectedTags.value.map(item => item.id)
    await store.batchEnableTags(ids)
    ElMessage.success(`已启用 ${ids.length} 个标签`)
    selectedTags.value = []
    loadTagList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量操作失败：' + error.message)
    }
  }
}

const handleBatchDisable = async () => {
  try {
    await ElMessageBox.confirm(`确定要禁用 ${selectedTags.value.length} 个标签吗？`, '批量禁用', {
      type: 'warning'
    })
    
    const ids = selectedTags.value.map(item => item.id)
    await store.batchDisableTags(ids)
    ElMessage.success(`已禁用 ${ids.length} 个标签`)
    selectedTags.value = []
    loadTagList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量操作失败：' + error.message)
    }
  }
}

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定要删除 ${selectedTags.value.length} 个标签吗？此操作不可恢复！`, '批量删除', {
      type: 'error',
      confirmButtonText: '确定删除',
      cancelButtonText: '取消'
    })
    
    const ids = selectedTags.value.map(item => item.id)
    await store.batchDeleteTags(ids)
    ElMessage.success(`已删除 ${ids.length} 个标签`)
    selectedTags.value = []
    loadTagList()
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量操作失败：' + error.message)
    }
  }
}

// 工具函数
const getTagType = (category) => {
  const typeMap = {
    culture: 'primary',
    location: 'success',
    activity: 'warning',
    heritage: 'danger',
    custom: 'info'
  }
  return typeMap[category] || 'info'
}

const getCategoryTagType = (category) => {
  const typeMap = {
    culture: 'primary',
    location: 'success',
    activity: 'warning',
    heritage: 'danger',
    custom: 'info'
  }
  return typeMap[category] || 'info'
}

const getCategoryText = (category) => {
  const categoryMap = {
    culture: '文化主题',
    location: '地域标签',
    activity: '活动类型',
    heritage: '非遗分类',
    custom: '自定义标签'
  }
  return categoryMap[category] || '未知分类'
}

const formatDate = (dateString) => {
  if (!dateString) return ''
  return new Date(dateString).toLocaleString('zh-CN')
}

// 生命周期
onMounted(() => {
  loadTagList()
})
</script>

<style scoped>
.tag-management {
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

.action-toolbar {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 6px;
}

.text-right {
  text-align: right;
}

.category-filter {
  margin-bottom: 20px;
  padding: 16px;
  background: #f0f9ff;
  border-radius: 6px;
  border: 1px solid #e1f5fe;
}

.tag-stats {
  margin-bottom: 20px;
  padding: 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 8px;
  color: white;
}

:deep(.tag-stats .el-statistic__content) {
  color: white;
  font-size: 28px;
}

:deep(.tag-stats .el-statistic__title) {
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  margin-bottom: 8px;
}

.table-section {
  margin-bottom: 20px;
}

.pagination-section {
  display: flex;
  justify-content: flex-end;
}

.tag-name-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.hot-icon {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.2);
  }
  100% {
    transform: scale(1);
  }
}

.hot-count {
  color: #f56c6c;
  font-weight: bold;
}

.creator-info {
  display: flex;
  align-items: center;
}
</style>
