<template>
  <div class="content-management">
    <div class="management-header">
      <h1>内容管理</h1>
      <p>管理平台的所有内容，包括审核、编辑、发布等操作</p >
    </div>

    <!-- 统计卡片 -->
    <div class="stats-cards">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon total">
                <el-icon><Document /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.totalContents }}</div>
                <div class="stat-label">总内容数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon published">
                <el-icon><Check /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.published }}</div>
                <div class="stat-label">已发布</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon reviewing">
                <el-icon><Clock /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.reviewing }}</div>
                <div class="stat-label">待审核</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon draft">
                <el-icon><Edit /></el-icon>
              </div>
              <div class="stat-info">
                <div class="stat-value">{{ stats.draft }}</div>
                <div class="stat-label">草稿</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 搜索和筛选 -->
    <el-card class="filter-card">
      <div class="filter-content">
        <el-form :model="filterForm" inline>
          <el-form-item label="内容类型">
            <el-select v-model="filterForm.category" placeholder="全部类型" clearable>
              <el-option label="文化遗产" value="heritage" />
              <el-option label="旅游攻略" value="travel" />
              <el-option label="美食推荐" value="food" />
              <el-option label="历史故事" value="history" />
              <el-option label="民俗文化" value="folk" />
            </el-select>
          </el-form-item>

          <el-form-item label="状态">
            <el-select v-model="filterForm.status" placeholder="全部状态" clearable>
              <el-option label="已发布" value="published" />
              <el-option label="待审核" value="reviewing" />
              <el-option label="草稿" value="draft" />
              <el-option label="已拒绝" value="rejected" />
            </el-select>
          </el-form-item>

          <el-form-item label="关键词">
            <el-input
              v-model="filterForm.keyword"
              placeholder="搜索标题、内容"
              clearable
              @keyup.enter="handleSearch"
            >
              <template #append>
                <el-button :icon="Search" @click="handleSearch" />
              </template>
            </el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="handleReset">重置</el-button>
          </el-form-item>
        </el-form>

        <div class="filter-actions">
          <el-button type="primary" :icon="Plus" @click="handleCreate">
            新建内容
          </el-button>
          <el-button :icon="Refresh" @click="refreshData">刷新</el-button>
        </div>
      </div>
    </el-card>

    <!-- 内容列表 -->
    <el-card>
      <template #header>
        <div class="table-header">
          <h3>内容列表</h3>
          <div class="header-actions">
            <el-button-group>
              <el-button :type="viewMode === 'table' ? 'primary' : ''" @click="viewMode = 'table'">
                <el-icon><Grid /></el-icon>
                表格视图
              </el-button>
              <el-button :type="viewMode === 'card' ? 'primary' : ''" @click="viewMode = 'card'">
                <el-icon><Collection /></el-icon>
                卡片视图
              </el-button>
            </el-button-group>
          </div>
        </div>
      </template>

      <!-- 表格视图 -->
      <div v-if="viewMode === 'table'">
        <el-table
          :data="contents"
          v-loading="loading"
          style="width: 100%"
        >
          <el-table-column prop="id" label="ID" width="80" />
          <el-table-column label="封面" width="100">
            <template #default="{ row }">
              <el-image
                :src="row.coverImage"
                :preview-src-list="[row.coverImage]"
                fit="cover"
                style="width: 60px; height: 40px; border-radius: 4px;"
              >
                <template #error>
                  <div class="image-slot">
                    <el-icon><Picture /></el-icon>
                  </div>
                </template>
              </el-image>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题" min-width="200">
            <template #default="{ row }">
              <div class="title-cell">
                <span class="title-text">{{ row.title }}</span>
                <el-tag v-if="row.isTop" type="warning" size="small">置顶</el-tag>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="分类" width="120">
            <template #default="{ row }">
              <el-tag :type="getCategoryType(row.category)">
                {{ getCategoryName(row.category) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="author.username" label="作者" width="120" />
          <el-table-column prop="views" label="浏览" width="80" sortable />
          <el-table-column prop="likes" label="点赞" width="80" sortable />
          <el-table-column prop="status" label="状态" width="100">
            <template #default="{ row }">
              <el-tag :type="getStatusType(row.status)" size="small">
                {{ getStatusName(row.status) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="publishTime" label="发布时间" width="160" sortable />
          <el-table-column label="操作" width="200" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleView(row)">查看</el-button>
              <el-button link type="primary" @click="handleEdit(row)">编辑</el-button>
              <el-dropdown @command="(command) => handleCommand(command, row)">
                <el-button link type="primary">
                  更多<el-icon class="el-icon--right"><arrow-down /></el-icon>
                </el-button>
                <template #dropdown>
                  <el-dropdown-menu>
                    <el-dropdown-item command="review" v-if="row.status === 'reviewing'">
                      审核
                    </el-dropdown-item>
                    <el-dropdown-item command="publish" v-if="row.status === 'draft'">
                      发布
                    </el-dropdown-item>
                    <el-dropdown-item command="top" v-if="row.status === 'published'">
                      {{ row.isTop ? '取消置顶' : '置顶' }}
                    </el-dropdown-item>
                    <el-dropdown-item command="delete" divided>
                      删除
                    </el-dropdown-item>
                  </el-dropdown-menu>
                </template>
              </el-dropdown>
            </template>
          </el-table-column>
        </el-table>
      </div>

      <!-- 卡片视图 -->
      <div v-else class="card-view">
        <el-row :gutter="20">
          <el-col
            v-for="content in contents"
            :key="content.id"
            :xs="24"
            :sm="12"
            :lg="8"
            :xl="6"
          >
            <el-card class="content-card" :body-style="{ padding: '0' }">
              <div class="card-image">
                <img :src="content.coverImage" :alt="content.title" />
                <div class="card-status">
                  <el-tag :type="getStatusType(content.status)" size="small">
                    {{ getStatusName(content.status) }}
                  </el-tag>
                </div>
                <div class="card-actions">
                  <el-button-group>
                    <el-button size="small" @click="handleView(content)">查看</el-button>
                    <el-button size="small" @click="handleEdit(content)">编辑</el-button>
                    <el-dropdown @command="(command) => handleCommand(command, content)">
                      <el-button size="small">
                        更多<el-icon><arrow-down /></el-icon>
                      </el-button>
                      <template #dropdown>
                        <el-dropdown-menu>
                          <el-dropdown-item command="review" v-if="content.status === 'reviewing'">
                            审核
                          </el-dropdown-item>
                          <el-dropdown-item command="publish" v-if="content.status === 'draft'">
                            发布
                          </el-dropdown-item>
                          <el-dropdown-item command="top" v-if="content.status === 'published'">
                            {{ content.isTop ? '取消置顶' : '置顶' }}
                          </el-dropdown-item>
                          <el-dropdown-item command="delete" divided>
                            删除
                          </el-dropdown-item>
                        </el-dropdown-menu>
                      </template>
                    </el-dropdown>
                  </el-button-group>
                </div>
              </div>
              <div class="card-content">
                <h4 class="card-title">{{ content.title }}</h4>
                <p class="card-desc">{{ content.description }}</p >
                <div class="card-meta">
                  <div class="meta-item">
                    <el-icon><View /></el-icon>
                    <span>{{ content.views }}</span>
                  </div>
                  <div class="meta-item">
                    <el-icon><Star /></el-icon>
                    <span>{{ content.likes }}</span>
                  </div>
                  <div class="meta-item">
                    <el-tag :type="getCategoryType(content.category)" size="small">
                      {{ getCategoryName(content.category) }}
                    </el-tag>
                  </div>
                </div>
                <div class="card-footer">
                  <span class="author">{{ content.author.username }}</span>
                  <span class="time">{{ formatTime(content.publishTime) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>

      <!-- 分页 -->
      <div class="pagination-container">
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
    </el-card>

    <!-- 审核对话框 -->
    <el-dialog
      v-model="showReviewDialog"
      title="内容审核"
      width="500px"
    >
      <el-form :model="reviewForm" label-width="80px">
        <el-form-item label="审核状态">
          <el-radio-group v-model="reviewForm.status">
            <el-radio label="published">通过</el-radio>
            <el-radio label="rejected">拒绝</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="审核意见">
          <el-input
            v-model="reviewForm.comment"
            type="textarea"
            :rows="4"
            placeholder="请输入审核意见"
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showReviewDialog = false">取消</el-button>
        <el-button type="primary" @click="handleReviewSubmit">确定</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Document,
  Check,
  Clock,
  Edit,
  Search,
  Plus,
  Refresh,
  Grid,
  Collection,
  Picture,
  View,
  Star
} from '@element-plus/icons-vue'

const router = useRouter()

const viewMode = ref('table')
const loading = ref(false)
const showReviewDialog = ref(false)

const stats = reactive({
  totalContents: 0,
  published: 0,
  reviewing: 0,
  draft: 0
})

const filterForm = reactive({
  category: '',
  status: '',
  keyword: ''
})

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

const contents = ref([])
const currentContent = ref(null)
const reviewForm = reactive({
  status: 'published',
  comment: ''
})

onMounted(() => {
  loadContentData()
  loadStats()
})

const loadContentData = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    // 模拟数据
    contents.value = Array.from({ length: 15 }, (_, i) => ({
      id: i + 1,
      title: `淮南文化内容 ${i + 1}`,
      description: `这是关于淮南文化的第${i + 1}篇内容描述`,
      coverImage: `/images/contents/cover-${(i % 6) + 1}.jpg`,
      category: ['heritage', 'travel', 'food', 'history', 'folk'][i % 5],
      author: {
        username: `作者${(i % 3) + 1}`
      },
      views: Math.floor(Math.random() * 1000),
      likes: Math.floor(Math.random() * 100),
      status: ['published', 'reviewing', 'draft', 'rejected'][i % 4],
      isTop: i < 3,
      publishTime: new Date(Date.now() - i * 86400000).toISOString()
    }))

    pagination.total = 45
  } catch (error) {
    ElMessage.error('加载内容数据失败')
  } finally {
    loading.value = false
  }
}

const loadStats = async () => {
  try {
    // 模拟统计数据
    Object.assign(stats, {
      totalContents: 156,
      published: 134,
      reviewing: 8,
      draft: 12
    })
  } catch (error) {
    ElMessage.error('加载统计数据失败')
  }
}
const handleSearch = () => {
  pagination.page = 1
  loadContentData()
}

const handleReset = () => {
  Object.assign(filterForm, {
    category: '',
    status: '',
    keyword: ''
  })
  pagination.page = 1
  loadContentData()
}

const handleCreate = () => {
  router.push('/content/create')
}

const refreshData = () => {
  loadContentData()
  loadStats()
}

const handleView = (content) => {
  router.push(`/content/detail/${content.id}`)
}

const handleEdit = (content) => {
  router.push(`/content/edit/${content.id}`)
}

const handleCommand = (command, content) => {
  currentContent.value = content
  
  switch (command) {
    case 'review':
      showReviewDialog.value = true
      break
    case 'publish':
      handlePublish(content)
      break
    case 'top':
      handleToggleTop(content)
      break
    case 'delete':
      handleDelete(content)
      break
  }
}

const handleReviewSubmit = async () => {
  try {
    // 模拟审核提交
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('审核完成')
    showReviewDialog.value = false
    refreshData()
  } catch (error) {
    ElMessage.error('审核失败')
  }
}

const handlePublish = async (content) => {
  try {
    await ElMessageBox.confirm('确定要发布此内容吗？', '提示', {
      type: 'warning'
    })
    
    // 模拟发布
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('内容发布成功')
    refreshData()
  } catch (error) {
    // 用户取消
  }
}

const handleToggleTop = async (content) => {
  try {
    const action = content.isTop ? '取消置顶' : '置顶'
    await ElMessageBox.confirm(`确定要${action}此内容吗？`, '提示', {
      type: 'warning'
    })
    
    // 模拟置顶操作
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success(`${action}成功`)
    refreshData()
  } catch (error) {
    // 用户取消
  }
}

const handleDelete = async (content) => {
  try {
    await ElMessageBox.confirm('确定要删除此内容吗？', '警告', {
      type: 'warning',
      confirmButtonText: '确定',
      cancelButtonText: '取消'
    })
    
    // 模拟删除
    await new Promise(resolve => setTimeout(resolve, 1000))
    ElMessage.success('内容删除成功')
    refreshData()
  } catch (error) {
    // 用户取消
  }
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  loadContentData()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  loadContentData()
}

const getCategoryType = (category) => {
  const types = {
    heritage: '',
    travel: 'success',
    food: 'warning',
    history: 'info',
    folk: 'danger'
  }
  return types[category] || ''
}

const getCategoryName = (category) => {
  const names = {
    heritage: '文化遗产',
    travel: '旅游攻略',
    food: '美食推荐',
    history: '历史故事',
    folk: '民俗文化'
  }
  return names[category] || category
}

const getStatusType = (status) => {
  const types = {
    published: 'success',
    reviewing: 'warning',
    draft: 'info',
    rejected: 'danger'
  }
  return types[status] || ''
}

const getStatusName = (status) => {
  const names = {
    published: '已发布',
    reviewing: '待审核',
    draft: '草稿',
    rejected: '已拒绝'
  }
  return names[status] || status
}

const formatTime = (time) => {
  return new Date(time).toLocaleDateString()
}
</script>

<style scoped lang="scss">
.content-management {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.management-header {
  margin-bottom: 24px;
  
  h1 {
    font-size: 2em;
    font-weight: bold;
    color: #303133;
    margin-bottom: 8px;
  }
  
  p {
    color: #606266;
    font-size: 1em;
  }
}

.stats-cards {
  margin-bottom: 24px;
}

.stat-card {
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .el-icon {
    font-size: 28px;
    color: white;
  }
  
  &.total {
    background: linear-gradient(135deg, #409eff, #66b1ff);
  }
  
  &.published {
    background: linear-gradient(135deg, #67c23a, #85ce61);
  }
  
  &.reviewing {
    background: linear-gradient(135deg, #e6a23c, #ebb563);
  }
  
  &.draft {
    background: linear-gradient(135deg, #909399, #a6a9ad);
  }
}

.stat-info {
  .stat-value {
    font-size: 24px;
    font-weight: bold;
    color: #303133;
    margin-bottom: 4px;
  }
  
  .stat-label {
    font-size: 14px;
    color: #606266;
  }
}

.filter-card {
  margin-bottom: 20px;
  
  :deep(.el-card__body) {
    padding: 20px;
  }
}

.filter-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 16px;
}

.filter-actions {
  display: flex;
  gap: 12px;
}

.table-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  
  h3 {
    margin: 0;
    font-size: 16px;
    font-weight: 600;
    color: #303133;
  }
}

.title-cell {
  display: flex;
  align-items: center;
  gap: 8px;
  
  .title-text {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}

.image-slot {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 40px;
  background: #f5f7fa;
  color: #909399;
  border-radius: 4px;
}

.card-view {
  .content-card {
    margin-bottom: 20px;
    transition: transform 0.3s, box-shadow 0.3s;
    
    &:hover {
      transform: translateY(-4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
  }
  
  .card-image {
    position: relative;
    height: 160px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s;
    }
    
    &:hover img {
      transform: scale(1.05);
    }
    
    .card-status {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    
    .card-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      padding: 16px;
      opacity: 0;
      transition: opacity 0.3s;
      
      .el-button-group {
        width: 100%;
        display: flex;
        
        .el-button {
          flex: 1;
          color: white;
          border-color: rgba(255, 255, 255, 0.5);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
    
    &:hover .card-actions {
      opacity: 1;
    }
  }
  
  .card-content {
    padding: 16px;
    
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin-bottom: 8px;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-desc {
      font-size: 14px;
      color: #606266;
      line-height: 1.5;
      margin-bottom: 12px;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .card-meta {
      display: flex;
      align-items: center;
      gap: 16px;
      margin-bottom: 12px;
      
      .meta-item {
        display: flex;
        align-items: center;
        gap: 4px;
        font-size: 12px;
        color: #909399;
      }
    }
    
    .card-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 12px;
      color: #909399;
      
      .author {
        font-weight: 500;
      }
    }
  }
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

// 响应式设计
@media (max-width: 768px) {
  .content-management {
    padding: 10px;
  }
  
  .filter-content {
    flex-direction: column;
  }
  
  .filter-actions {
    width: 100%;
    justify-content: flex-end;
  }
  
  .table-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
