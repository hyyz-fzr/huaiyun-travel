<template>
  <div class="content-list">
    <!-- 搜索和筛选 -->
    <div class="list-filter">
      <el-form :model="filterForm" inline>
        <el-form-item label="关键词">
          <el-input
            id="searchKeyword"
            name="searchKeyword"
            v-model="filterForm.keyword"
            placeholder="搜索标题或内容"
            clearable
          />
        </el-form-item>
        <el-form-item label="分类">
          <el-select 
            id="filterCategory" 
            name="filterCategory"
            v-model="filterForm.categoryId" 
            clearable
          >
            <el-option
              v-for="category in categories"
              :key="category.id"
              :label="category.name"
              :value="category.id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="状态">
          <el-select 
            id="filterStatus" 
            name="filterStatus"
            v-model="filterForm.status" 
            clearable
          >
            <el-option label="草稿" value="draft" />
            <el-option label="待审核" value="pending" />
            <el-option label="已发布" value="published" />
            <el-option label="已拒绝" value="rejected" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleSearch">搜索</el-button>
          <el-button @click="handleReset">重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <!-- 操作工具栏 -->
    <div class="list-toolbar">
      <div class="toolbar-left">
        <el-button type="primary" @click="handleCreate">
          <el-icon><Plus /></el-icon>
          新增内容
        </el-button>
        <el-button :disabled="selectedRows.length === 0" @click="handleBatchDelete">
          批量删除
        </el-button>
      </div>
      <div class="toolbar-right">
        <el-button text @click="refreshData">
          <el-icon><Refresh /></el-icon>
        </el-button>
      </div>
    </div>

    <!-- 内容表格 -->
    <el-table
      v-loading="loading"
      :data="contentList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="50" />
      <el-table-column prop="id" label="ID" width="80" />
      <el-table-column prop="title" label="标题" min-width="200">
        <template #default="{ row }">
          <div class="title-cell">
            < img v-if="row.coverImage" :src="row.coverImage" class="title-cover" />
            <span class="title-text">{{ row.title }}</span>
          </div>
        </template>
      </el-table-column>
      <el-table-column prop="categoryName" label="分类" width="120" />
      <el-table-column prop="author" label="作者" width="120" />
      <el-table-column prop="status" label="状态" width="100">
        <template #default="{ row }">
          <el-tag :type="statusTypeMap[row.status]">
            {{ statusTextMap[row.status] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="viewCount" label="浏览" width="80" />
      <el-table-column prop="likeCount" label="点赞" width="80" />
      <el-table-column prop="createTime" label="创建时间" width="180" />
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="{ row }">
          <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
          <el-button link type="success" @click="handleReview(row)">审核</el-button>
          <el-button link type="danger" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="list-pagination">
      <el-pagination
        v-model:current-page="pagination.page"
        v-model:page-size="pagination.pageSize"
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
import { ref, reactive, onMounted, computed } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Plus, Refresh } from '@element-plus/icons-vue'
import { useContentStore } from '@/stores/content'

const props = defineProps({
  contentType: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['create', 'edit', 'review'])

const contentStore = useContentStore()

// 响应式数据
const filterForm = reactive({
  keyword: '',
  categoryId: null,
  status: ''
})

const selectedRows = ref([])

// 计算属性
const contentList = computed(() => contentStore.contentList)
const loading = computed(() => contentStore.loading)
const pagination = computed(() => contentStore.pagination)
const categories = computed(() => contentStore.categories)

const statusTextMap = {
  draft: '草稿',
  pending: '待审核',
  published: '已发布',
  rejected: '已拒绝'
}

const statusTypeMap = {
  draft: 'info',
  pending: 'warning',
  published: 'success',
  rejected: 'danger'
}

// 方法
const handleSearch = () => {
  contentStore.fetchContentList({
    ...filterForm,
    type: props.contentType
  })
}

const handleReset = () => {
  Object.keys(filterForm).forEach(key => {
    filterForm[key] = ''
  })
  handleSearch()
}

const handleCreate = () => {
  emit('create')
}

const handleEdit = (row) => {
  emit('edit', row)
}

const handleReview = (row) => {
  emit('review', row)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除"${row.title}"吗？`, '删除确认')
    await contentStore.deleteContent(row.id)
    ElMessage.success('删除成功')
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('删除失败')
    }
  }
}

const handleBatchDelete = async () => {
  try {
    await ElMessageBox.confirm(`确定删除选中的${selectedRows.value.length}项内容吗？`, '批量删除')
    const ids = selectedRows.value.map(row => row.id)
    await contentStore.batchDelete(ids)
    ElMessage.success('批量删除成功')
    selectedRows.value = []
  } catch (error) {
    if (error !== 'cancel') {
      ElMessage.error('批量删除失败')
    }
  }
}

const handleSelectionChange = (selection) => {
  selectedRows.value = selection
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  handleSearch()
}

const handleCurrentChange = (page) => {
  pagination.value.page = page
  handleSearch()
}

const refreshData = () => {
  handleSearch()
}

onMounted(() => {
  handleSearch()
  contentStore.fetchCategories()
})
</script>

<style scoped>
.content-list {
  background: #fff;
  border-radius: 8px;
  padding: 20px;
}

.list-filter {
  margin-bottom: 16px;
}

.list-toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
}

.toolbar-left {
  display: flex;
  gap: 8px;
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-cover {
  width: 40px;
  height: 40px;
  border-radius: 4px;
  object-fit: cover;
}

.title-text {
  font-weight: 500;
}

.list-pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
</style>