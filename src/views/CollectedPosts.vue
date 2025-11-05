<template>
  <div class="collected-posts">
    <div class="page-header">
      <h1>我的收藏</h1>
      <p>管理您收藏的文化内容、帖子和产品</p >
    </div>

    <!-- 收藏分类 -->
    <el-card class="category-card">
      <template #header>
        <h3>收藏分类</h3>
      </template>
      <div class="category-tabs">
        <el-radio-group v-model="activeCategory" @change="handleCategoryChange">
          <el-radio-button label="all">全部收藏</el-radio-button>
          <el-radio-button label="posts">社区帖子</el-radio-button>
          <el-radio-button label="heritage">文化遗产</el-radio-button>
          <el-radio-button label="products">文创产品</el-radio-button>
          <el-radio-button label="contents">文化内容</el-radio-button>
        </el-radio-group>
      </div>
    </el-card>

    <!-- 收藏列表 -->
    <div class="collection-content">
      <!-- 表格视图 -->
      <el-card v-if="viewMode === 'table'" class="collection-card">
        <template #header>
          <div class="table-header">
            <h3>收藏列表</h3>
            <div class="header-actions">
              <el-button-group>
                <el-button 
                  :type="viewMode === 'table' ? 'primary' : ''" 
                  @click="viewMode = 'table'"
                >
                  <el-icon><Grid /></el-icon>
                  列表视图
                </el-button>
                <el-button 
                  :type="viewMode === 'grid' ? 'primary' : ''" 
                  @click="viewMode = 'grid'"
                >
                  <el-icon><Collection /></el-icon>
                  网格视图
                </el-button>
              </el-button-group>
              <el-button :icon="Refresh" @click="refreshData">刷新</el-button>
            </div>
          </div>
        </template>

        <el-table
          :data="filteredCollections"
          v-loading="loading"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection" width="55" />
          <el-table-column label="收藏内容" min-width="300">
            <template #default="{ row }">
              <div class="collection-item">
                <div class="item-image">
                  <img :src="row.image" :alt="row.title" />
                </div>
                <div class="item-info">
                  <h4 class="item-title" @click="handleViewItem(row)">
                    {{ row.title }}
                  </h4>
                  <p class="item-desc">{{ row.description }}</p >
                  <div class="item-meta">
                    <el-tag :type="getTypeTagType(row.type)" size="small">
                      {{ getTypeName(row.type) }}
                    </el-tag>
                    <span class="meta-text">{{ row.author }}</span>
                    <span class="meta-text">{{ formatTime(row.collectTime) }}</span>
                  </div>
                </div>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="type" label="类型" width="100">
            <template #default="{ row }">
              <el-tag :type="getTypeTagType(row.type)">
                {{ getTypeName(row.type) }}
              </el-tag>
            </template>
          </el-table-column>
          <el-table-column prop="views" label="浏览" width="80" sortable />
          <el-table-column prop="likes" label="点赞" width="80" sortable />
          <el-table-column prop="collectTime" label="收藏时间" width="160" sortable />
          <el-table-column label="操作" width="120" fixed="right">
            <template #default="{ row }">
              <el-button link type="primary" @click="handleViewItem(row)">
                查看
              </el-button>
              <el-button link type="danger" @click="handleUncollect(row)">
                取消收藏
              </el-button>
            </template>
          </el-table-column>
        </el-table>

        <!-- 批量操作 -->
        <div v-if="selectedCollections.length > 0" class="batch-actions">
          <el-button type="danger" :icon="Delete" @click="handleBatchUncollect">
            批量取消收藏 ({{ selectedCollections.length }})
          </el-button>
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

      <!-- 网格视图 -->
      <div v-else class="grid-view">
        <div class="grid-header">
          <h3>收藏内容</h3>
          <div class="grid-actions">
            <el-button :icon="Refresh" @click="refreshData">刷新</el-button>
          </div>
        </div>

        <el-row :gutter="20">
          <el-col
            v-for="item in filteredCollections"
            :key="item.id"
            :xs="24"
            :sm="12"
            :lg="8"
            :xl="6"
          >
            <el-card class="collection-card-grid" :body-style="{ padding: '0' }">
              <div class="card-image">
                <img :src="item.image" :alt="item.title" />
                <div class="card-type">
                  <el-tag :type="getTypeTagType(item.type)" size="small">
                    {{ getTypeName(item.type) }}
                  </el-tag>
                </div>
                <div class="card-hover-actions">
                  <el-button-group>
                    <el-button size="small" @click="handleViewItem(item)">
                      <el-icon><View /></el-icon>
                      查看
                    </el-button>
                    <el-button size="small" type="danger" @click="handleUncollect(item)">
                      <el-icon><StarFilled /></el-icon>
                      取消收藏
                    </el-button>
                  </el-button-group>
                </div>
              </div>
              <div class="card-content">
                <h4 class="card-title" @click="handleViewItem(item)">
                  {{ item.title }}
                </h4>
                <p class="card-desc">{{ item.description }}</p >
                <div class="card-meta">
                  <div class="meta-item">
                    <el-icon><View /></el-icon>
                    <span>{{ item.views }}</span>
                  </div>
                  <div class="meta-item">
                    <el-icon><Star /></el-icon>
                    <span>{{ item.likes }}</span>
                  </div>
                  <div class="meta-item">
                    <el-icon><User /></el-icon>
                    <span>{{ item.author }}</span>
                  </div>
                </div>
                <div class="card-footer">
                  <span class="collect-time">{{ formatTime(item.collectTime) }}</span>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>

        <!-- 空状态 -->
        <div v-if="filteredCollections.length === 0" class="empty-state">
          <el-empty description="暂无收藏内容">
            <el-button type="primary" @click="$router.push('/posts/list')">
              去发现精彩内容
            </el-button>
          </el-empty>
        </div>

        <!-- 分页 -->
        <div class="pagination-container">
          <el-pagination
            v-model:current-page="pagination.page"
            v-model:page-size="pagination.pageSize"
            :total="pagination.total"
            :page-sizes="[12, 24, 48, 96]"
            layout="total, sizes, prev, pager, next, jumper"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </div>
    </div>

    <!-- 推荐内容 -->
    <el-card v-if="recommendations.length > 0" class="recommendation-card">
      <template #header>
        <h3>您可能也喜欢</h3>
      </template>
      <el-row :gutter="20">
        <el-col
          v-for="item in recommendations"
          :key="item.id"
          :xs="12"
          :sm="8"
          :lg="6"
        >
          <div class="recommend-item" @click="handleViewItem(item)">
            <div class="recommend-image">
              <img :src="item.image" :alt="item.title" />
            </div>
            <div class="recommend-info">
              <h5 class="recommend-title">{{ item.title }}</h5>
              <p class="recommend-meta">
                <el-tag :type="getTypeTagType(item.type)" size="small">
                  {{ getTypeName(item.type) }}
                </el-tag>
                <span>{{ item.views }} 浏览</span>
              </p >
            </div>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Grid,
  Collection,
  Refresh,
  Delete,
  View,
  Star,
  User,
  StarFilled
} from '@element-plus/icons-vue'

const router = useRouter()

const activeCategory = ref('all')
const viewMode = ref('table')
const loading = ref(false)
const selectedCollections = ref([])

const pagination = reactive({
  page: 1,
  pageSize: 10,
  total: 0
})

// 模拟收藏数据
const collections = ref([
  {
    id: 1,
    type: 'posts',
    title: '淮南豆腐文化的历史渊源与传承',
    description: '深入探讨淮南豆腐文化的起源、发展和现代传承，了解这一千年美食的文化内涵。',
    image: '/images/posts/post-1.jpg',
    author: '文化研究员',
    views: 1245,
    likes: 89,
    collectTime: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    type: 'heritage',
    title: '八公山豆腐制作技艺',
    description: '国家级非物质文化遗产，传统豆腐制作工艺的完整展示。',
    image: '/images/heritage/tofu-1.jpg',
    author: '非遗保护中心',
    views: 3567,
    likes: 234,
    collectTime: '2024-01-14 15:20:00'
  },
  {
    id: 3,
    type: 'products',
    title: '淮南豆腐文化礼盒',
    description: '精选淮南优质黄豆，传统工艺制作的精美礼盒套装。',
    image: '/images/products/tofu-gift-1.jpg',
    author: '文创商店',
    views: 892,
    likes: 45,
    collectTime: '2024-01-13 09:15:00'
  },
  {
    id: 4,
    type: 'contents',
    title: '淮南民俗文化节精彩回顾',
    description: '2023年淮南民俗文化节的精彩瞬间和活动总结。',
    image: '/images/contents/cover-1.jpg',
    author: '文化传媒',
    views: 1567,
    likes: 78,
    collectTime: '2024-01-12 14:45:00'
  },
  {
    id: 5,
    type: 'posts',
    title: '传统石磨豆腐与现代工艺对比',
    description: '比较传统石磨工艺和现代机械化生产的豆腐在口感和营养上的差异。',
    image: '/images/posts/post-2.jpg',
    author: '美食博主',
    views: 987,
    likes: 56,
    collectTime: '2024-01-11 11:20:00'
  },
  {
    id: 6,
    type: 'heritage',
    title: '八公山风景名胜',
    description: '八公山自然风光与人文景观的完美结合，豆腐文化的发源地。',
    image: '/images/heritage/bagong-1.jpg',
    author: '旅游达人',
    views: 2345,
    likes: 167,
    collectTime: '2024-01-10 16:30:00'
  }
])

// 推荐内容
const recommendations = ref([
  {
    id: 7,
    type: 'posts',
    title: '豆腐的养生价值研究',
    description: '科学研究表明豆腐对健康的多种益处。',
    image: '/images/posts/post-3.jpg',
    views: 765,
    likes: 34
  },
  {
    id: 8,
    type: 'heritage',
    title: '传统豆腐宴的制作工艺',
    description: '淮南特色豆腐宴的传统制作方法和菜品介绍。',
    image: '/images/heritage/tofu-2.jpg',
    views: 1234,
    likes: 89
  },
  {
    id: 9,
    type: 'products',
    title: '手工豆腐制作工具套装',
    description: '适合家庭使用的手工豆腐制作工具。',
    image: '/images/products/product-1.jpg',
    views: 543,
    likes: 23
  },
  {
    id: 10,
    type: 'contents',
    title: '淮南文化数字博物馆',
    description: '线上数字博物馆，展示淮南丰富的文化遗产。',
    image: '/images/contents/cover-2.jpg',
    views: 1876,
    likes: 112
  }
])

onMounted(() => {
  loadCollections()
})

// 计算属性：过滤收藏内容
const filteredCollections = computed(() => {
  let filtered = collections.value
  
  if (activeCategory.value !== 'all') {
    filtered = filtered.filter(item => item.type === activeCategory.value)
  }
  
  // 分页处理
  const start = (pagination.page - 1) * pagination.pageSize
  const end = start + pagination.pageSize
  return filtered.slice(start, end)
})

const loadCollections = async () => {
  loading.value = true
  try {
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    pagination.total = collections.value.length
  } catch (error) {
    ElMessage.error('加载收藏列表失败')
  } finally {
    loading.value = false
  }
}

const refreshData = () => {
  loadCollections()
}

const handleCategoryChange = () => {
  pagination.page = 1
  loadCollections()
}

const handleSelectionChange = (selection) => {
  selectedCollections.value = selection
}

const handleViewItem = (item) => {
  // 根据类型跳转到不同的详情页
  const routes = {
    posts: `/posts/detail/${item.id}`,
    heritage: `/heritage/detail/${item.id}`,
    products: `/products/detail/${item.id}`,
    contents: `/content/detail/${item.id}`
  }
  
  router.push(routes[item.type] || '/')
}

const handleUncollect = async (item) => {
  try {
    await ElMessageBox.confirm(
      `确定要取消收藏"${item.title}"吗？`,
      '取消收藏',
      {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }
    )
    // 模拟取消收藏
    const index = collections.value.findIndex(collection => collection.id === item.id)
    if (index !== -1) {
      collections.value.splice(index, 1)
      ElMessage.success('取消收藏成功')
      loadCollections() // 重新加载数据
    }
  } catch (error) {
    // 用户取消操作
  }
}

const handleBatchUncollect = async () => {
  if (selectedCollections.value.length === 0) {
    ElMessage.warning('请选择要取消收藏的内容')
    return
  }
  
  try {
    await ElMessageBox.confirm(
      `确定要取消收藏选中的 ${selectedCollections.value.length} 项内容吗？`,
      '批量取消收藏',
      {
        type: 'warning',
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      }
    )
    
    // 模拟批量取消收藏
    const selectedIds = selectedCollections.value.map(item => item.id)
    collections.value = collections.value.filter(item => !selectedIds.includes(item.id))
    
    selectedCollections.value = []
    ElMessage.success(`成功取消收藏 ${selectedIds.length} 项内容`)
    loadCollections() // 重新加载数据
  } catch (error) {
    // 用户取消操作
  }
}

const handleSizeChange = (size) => {
  pagination.pageSize = size
  pagination.page = 1
  loadCollections()
}

const handleCurrentChange = (page) => {
  pagination.page = page
  loadCollections()
}

const getTypeTagType = (type) => {
  const types = {
    posts: 'primary',
    heritage: 'success',
    products: 'warning',
    contents: 'info'
  }
  return types[type] || ''
}

const getTypeName = (type) => {
  const names = {
    posts: '社区帖子',
    heritage: '文化遗产',
    products: '文创产品',
    contents: '文化内容'
  }
  return names[type] || type
}

const formatTime = (time) => {
  return new Date(time).toLocaleDateString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped lang="scss">
.collected-posts {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
}

.page-header {
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

.category-card {
  margin-bottom: 20px;
  
  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }
}

.category-tabs {
  .el-radio-group {
    width: 100%;
    
    .el-radio-button {
      flex: 1;
      
      :deep(.el-radio-button__inner) {
        width: 100%;
      }
    }
  }
}

.collection-content {
  margin-bottom: 30px;
}

.collection-card {
  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
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

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.collection-item {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  
  .item-image {
    width: 80px;
    height: 60px;
    border-radius: 4px;
    overflow: hidden;
    flex-shrink: 0;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  
  .item-info {
    flex: 1;
    min-width: 0;
    
    .item-title {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 4px 0;
      cursor: pointer;
      transition: color 0.3s;
      
      &:hover {
        color: #409eff;
      }
    }
    
    .item-desc {
      font-size: 12px;
      color: #606266;
      line-height: 1.4;
      margin: 0 0 8px 0;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .item-meta {
      display: flex;
      align-items: center;
      gap: 12px;
      
      .meta-text {
        font-size: 12px;
        color: #909399;
      }
    }
  }
}

.batch-actions {
  margin-top: 16px;
  padding: 16px;
  background: #f5f7fa;
  border-radius: 4px;
  text-align: center;
}

.pagination-container {
  margin-top: 20px;
  text-align: right;
}

.grid-view {
  .grid-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    
    h3 {
      margin: 0;
      font-size: 18px;
      font-weight: 600;
      color: #303133;
    }
  }
}

.collection-card-grid {
  margin-bottom: 20px;
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
  
  .card-image {
    position: relative;
    height: 160px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
    
    .card-type {
      position: absolute;
      top: 8px;
      right: 8px;
    }
    
    .card-hover-actions {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
      padding: 16px;
      display: flex;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease;
      
      .el-button-group {
        .el-button {
          color: white;
          border-color: rgba(255, 255, 255, 0.5);
          
          &:hover {
            background: rgba(255, 255, 255, 0.1);
          }
        }
      }
    }
    
    &:hover {
      img {
        transform: scale(1.05);
      }
      
      .card-hover-actions {
        opacity: 1;
      }
    }
  }
  
  .card-content {
    padding: 16px;
    
    .card-title {
      font-size: 16px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 8px 0;
      line-height: 1.4;
      cursor: pointer;
      transition: color 0.3s;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
      
      &:hover {
        color: #409eff;
      }
    }
    
    .card-desc {
      font-size: 14px;
      color: #606266;
      line-height: 1.5;
      margin: 0 0 12px 0;
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
      
      .collect-time {
        font-weight: 500;
      }
    }
  }
}

.empty-state {
  text-align: center;
  padding: 40px 0;
}

.recommendation-card {
  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
    
    h3 {
      margin: 0;
      font-size: 16px;
      font-weight: 600;
      color: #303133;
    }
  }
}

.recommend-item {
  cursor: pointer;
  transition: all 0.3s ease;
  border-radius: 8px;
  overflow: hidden;
  background: white;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  .recommend-image {
    height: 120px;
    overflow: hidden;
    
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      transition: transform 0.3s ease;
    }
  }
  
  &:hover .recommend-image img {
    transform: scale(1.05);
  }
  
  .recommend-info {
    padding: 12px;
    
    .recommend-title {
      font-size: 14px;
      font-weight: 600;
      color: #303133;
      margin: 0 0 8px 0;
      line-height: 1.4;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    
    .recommend-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      font-size: 12px;
      color: #909399;
      margin: 0;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .collected-posts {
    padding: 10px;
  }
  
  .table-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .header-actions {
    width: 100%;
    justify-content: space-between;
  }
  
  .category-tabs .el-radio-group {
    flex-direction: column;
    
    .el-radio-button {
      margin-bottom: 8px;
    }
  }
  
  .collection-item {
    flex-direction: column;
    
    .item-image {
      width: 100%;
      height: 120px;
    }
  }
  
  .grid-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>