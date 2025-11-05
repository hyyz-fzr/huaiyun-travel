<template>
  <div class="icon-selector">
    <!-- 搜索区域 -->
    <div class="search-section">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索图标..."
        clearable
        @input="handleSearch"
      >
        <template #prefix>
          <el-icon><Search /></el-icon>
        </template>
      </el-input>
    </div>

    <!-- 图标分类 -->
    <div class="category-section">
      <el-radio-group v-model="currentCategory" @change="handleCategoryChange">
        <el-radio-button label="all">全部</el-radio-button>
        <el-radio-button
          v-for="category in categories"
          :key="category"
          :label="category"
        >
          {{ getCategoryName(category) }}
        </el-radio-button>
      </el-radio-group>
    </div>

    <!-- 图标列表 -->
    <div class="icons-section">
      <div class="icons-grid">
        <div
          v-for="icon in filteredIcons"
          :key="icon.name"
          class="icon-item"
          :class="{ active: selectedIcon === icon.name }"
          @click="handleSelectIcon(icon)"
        >
          <div class="icon-wrapper">
            <el-icon :size="24">
              <component :is="icon.name" />
            </el-icon>
          </div>
          <div class="icon-name">{{ icon.name }}</div>
        </div>
      </div>
    </div>

    <!-- 分页 -->
    <div class="pagination-section" v-if="pagination.total > pagination.pageSize">
      <el-pagination
        v-model:current-page="pagination.current"
        v-model:page-size="pagination.pageSize"
        :total="pagination.total"
        :page-sizes="[48, 96, 144]"
        layout="total, sizes, prev, pager, next"
        @size-change="handleSizeChange"
        @current-change="handlePageChange"
      />
    </div>

    <!-- 选中的图标预览 -->
    <div class="preview-section" v-if="selectedIcon">
      <div class="preview-title">当前选中</div>
      <div class="preview-content">
        <div class="preview-icon">
          <el-icon :size="32">
            <component :is="selectedIcon" />
          </el-icon>
        </div>
        <div class="preview-info">
          <div class="icon-name">{{ selectedIcon }}</div>
          <div class="icon-code">图标代码: {{ selectedIcon }}</div>
        </div>
      </div>
    </div>

    <!-- 操作按钮 -->
    <div class="action-section">
      <el-button type="primary" @click="handleConfirm" :disabled="!selectedIcon">
        确认选择
      </el-button>
      <el-button @click="handleCancel">取消</el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import { Search } from '@element-plus/icons-vue'

const emit = defineEmits(['select', 'cancel'])

// 响应式数据
const searchKeyword = ref('')
const currentCategory = ref('all')
const selectedIcon = ref('')

// 分页配置
const pagination = ref({
  current: 1,
  pageSize: 48,
  total: 0
})

// 图标分类
const categories = ref([
  'common',
  'arrow',
  'media',
  'document',
  'data',
  'edit',
  'location',
  'weather',
  'other'
])

// 图标数据
const allIcons = ref([])
const filteredIcons = ref([])

// 计算属性 - 分页后的图标
const pagedIcons = computed(() => {
  const start = (pagination.value.current - 1) * pagination.value.pageSize
  const end = start + pagination.value.pageSize
  return filteredIcons.value.slice(start, end)
})

// 方法
const initIcons = () => {
  const icons = []
  
  // 转换Element Plus图标
  for (const [name, component] of Object.entries(ElementPlusIconsVue)) {
    const icon = {
      name,
      component,
      category: getIconCategory(name)
    }
    icons.push(icon)
  }
  
  allIcons.value = icons
  filteredIcons.value = icons
  pagination.value.total = icons.length
}

const getIconCategory = (iconName) => {
  if (iconName.includes('Arrow')) return 'arrow'
  if (iconName.includes('Video') || iconName.includes('Audio') || iconName.includes('Picture')) return 'media'
  if (iconName.includes('Document') || iconName.includes('File') || iconName.includes('Folder')) return 'document'
  if (iconName.includes('Data') || iconName.includes('Chart') || iconName.includes('Trend')) return 'data'
  if (iconName.includes('Edit') || iconName.includes('Setting') || iconName.includes('Tools')) return 'edit'
  if (iconName.includes('Location') || iconName.includes('Map')) return 'location'
  if (iconName.includes('Sunny') || iconName.includes('Cloudy') || iconName.includes('Rainy')) return 'weather'
  if (['Search', 'Plus', 'Minus', 'Close', 'Check', 'Loading'].includes(iconName)) return 'common'
  return 'other'
}

const getCategoryName = (category) => {
  const nameMap = {
    all: '全部',
    common: '常用',
    arrow: '箭头',
    media: '媒体',
    document: '文档',
    data: '数据',
    edit: '编辑',
    location: '位置',
    weather: '天气',
    other: '其他'
  }
  return nameMap[category] || category
}

const handleSearch = () => {
  filterIcons()
}

const handleCategoryChange = () => {
  filterIcons()
}

const filterIcons = () => {
  let filtered = allIcons.value
  
  // 按分类过滤
  if (currentCategory.value !== 'all') {
    filtered = filtered.filter(icon => icon.category === currentCategory.value)
  }
  
  // 按关键词过滤
  if (searchKeyword.value) {
    const keyword = searchKeyword.value.toLowerCase()
    filtered = filtered.filter(icon => 
      icon.name.toLowerCase().includes(keyword)
    )
  }
  
  filteredIcons.value = filtered
  pagination.value.total = filtered.length
  pagination.value.current = 1 // 重置到第一页
}

const handleSelectIcon = (icon) => {
  selectedIcon.value = icon.name
}

const handleSizeChange = (size) => {
  pagination.value.pageSize = size
  pagination.value.current = 1
}

const handlePageChange = (page) => {
  pagination.value.current = page
}

const handleConfirm = () => {
  if (selectedIcon.value) {
    emit('select', selectedIcon.value)
  }
}

const handleCancel = () => {
  emit('cancel')
}

// 生命周期
onMounted(() => {
  initIcons()
})
</script>

<style scoped>
.icon-selector {
  padding: 0;
}

.search-section {
  margin-bottom: 16px;
}

.category-section {
  margin-bottom: 16px;
}

.icons-section {
  margin-bottom: 16px;
  max-height: 400px;
  overflow-y: auto;
}

.icons-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 12px;
}

.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px 8px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
  background: #fff;
}

.icon-item:hover {
  border-color: #409EFF;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.icon-item.active {
  border-color: #409EFF;
  background: #f0f9ff;
}

.icon-wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: 8px;
  color: #606266;
}

.icon-item.active .icon-wrapper {
  color: #409EFF;
}

.icon-name {
  font-size: 12px;
  color: #909399;
  text-align: center;
  word-break: break-all;
  line-height: 1.2;
}

.pagination-section {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.preview-section {
  margin-bottom: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e1f5fe;
}

.preview-title {
  font-weight: 500;
  color: #303133;
  margin-bottom: 12px;
}

.preview-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.preview-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  background: #fff;
  border: 2px solid #409EFF;
  border-radius: 8px;
  color: #409EFF;
}

.preview-info {
  flex: 1;
}

.preview-info .icon-name {
  font-size: 16px;
  font-weight: 500;
  color: #303133;
  margin-bottom: 4px;
}

.preview-info .icon-code {
  font-size: 14px;
  color: #909399;
  font-family: 'Courier New', monospace;
}

.action-section {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 滚动条样式 */
.icons-section::-webkit-scrollbar {
  width: 6px;
}

.icons-section::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

.icons-section::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

.icons-section::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .icons-grid {
    grid-template-columns: repeat(4, 1fr);
    gap: 8px;
  }
  
  .icon-wrapper {
    width: 40px;
    height: 40px;
  }
  
  .icon-name {
    font-size: 10px;
  }
}

@media (max-width: 480px) {
  .icons-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>