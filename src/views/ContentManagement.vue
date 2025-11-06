<template>
  <div class="content-management">
    <div class="page-header">
      <h1>内容管理</h1>
      <p>管理平台所有内容资源</p >
    </div>

    <div class="toolbar">
      <el-button type="primary" @click="handleCreate">
        <i class="el-icon-plus"></i>
        新建内容
      </el-button>
      <el-button @click="handleRefresh">
        <i class="el-icon-refresh"></i>
        刷新
      </el-button>
    </div>

    <el-table :data="contentList" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="title" label="标题"></el-table-column>
      <el-table-column prop="type" label="类型" width="120">
        <template #default="scope">
          <el-tag :type="getTypeTag(scope.row.type)">{{ scope.row.type }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="author" label="作者" width="120"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'published' ? 'success' : 'warning'">
            {{ scope.row.status === 'published' ? '已发布' : '草稿' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination">
      <el-pagination
        :current-page="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const contentList = ref([
  {
    id: 1,
    title: '八公山历史文化探秘',
    type: '文化遗产',
    author: '管理员',
    status: 'published',
    createdAt: '2024-01-15 10:30:00'
  },
  {
    id: 2,
    title: '豆腐制作工艺传承',
    type: '传统技艺',
    author: '文化专家',
    status: 'draft',
    createdAt: '2024-01-14 14:20:00'
  }
])

const pagination = ref({
  current: 1,
  size: 10,
  total: 2
})

const getTypeTag = (type) => {
  const typeMap = {
    '文化遗产': 'primary',
    '传统技艺': 'success',
    '文创产品': 'warning',
    '活动资讯': 'info'
  }
  return typeMap[type] || 'info'
}

const handleCreate = () => {
  ElMessage.info('创建新内容')
}

const handleEdit = (row) => {
  ElMessage.info(`编辑内容: ${row.title}`)
}

const handleDelete = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除内容"${row.title}"吗？`, '提示', {
      type: 'warning'
    })
    ElMessage.success('删除成功')
  } catch {
    // 用户取消删除
  }
}

const handleRefresh = () => {
  ElMessage.success('数据已刷新')
}

const handleSizeChange = (size) => {
  pagination.value.size = size
  ElMessage.info(`每页显示 ${size} 条`)
}

const handleCurrentChange = (page) => {
  pagination.value.current = page
  ElMessage.info(`切换到第 ${page} 页`)
}

onMounted(() => {
  console.log('内容管理页面加载完成')
})
</script>

<style scoped>
.content-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.toolbar {
  margin-bottom: 20px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>