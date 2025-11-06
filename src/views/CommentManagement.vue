<template>
  <div class="comment-management">
    <div class="page-header">
      <h1>评论管理</h1>
      <p>管理用户评论和回复</p >
    </div>

    <div class="toolbar">
      <el-input
        v-model="searchKeyword"
        placeholder="搜索评论内容"
        style="width: 300px"
        clearable
      >
        <template #append>
          <el-button @click="handleSearch">
            <i class="el-icon-search"></i>
          </el-button>
        </template>
      </el-input>
    </div>

    <el-table :data="filteredComments" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="content" label="评论内容" min-width="200"></el-table-column>
      <el-table-column prop="author" label="评论者" width="120"></el-table-column>
      <el-table-column prop="target" label="评论对象" width="150"></el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-tag :type="scope.row.status === 'approved' ? 'success' : 'warning'">
            {{ scope.row.status === 'approved' ? '已审核' : '待审核' }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="评论时间" width="180"></el-table-column>
      <el-table-column label="操作" width="200">
        <template #default="scope">
          <el-button size="small" @click="handleApprove(scope.row)">审核通过</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const comments = ref([
  {
    id: 1,
    content: '这篇文章很有深度，让我对八公山文化有了新的认识！',
    author: '文化爱好者',
    target: '八公山历史文化探秘',
    status: 'approved',
    createdAt: '2024-01-15 14:30:00'
  },
  {
    id: 2,
    content: '豆腐制作工艺的传承很重要，希望更多人了解。',
    author: '美食达人',
    target: '豆腐制作工艺传承',
    status: 'pending',
    createdAt: '2024-01-15 10:20:00'
  }
])

const searchKeyword = ref('')

const filteredComments = computed(() => {
  if (!searchKeyword.value) return comments.value
  return comments.value.filter(comment => 
    comment.content.includes(searchKeyword.value) ||
    comment.author.includes(searchKeyword.value) ||
    comment.target.includes(searchKeyword.value)
  )
})

const handleSearch = () => {
  ElMessage.info(`搜索关键词: ${searchKeyword.value}`)
}

const handleApprove = (comment) => {
  comment.status = 'approved'
  ElMessage.success('评论已审核通过')
}

const handleDelete = async (comment) => {
  try {
    await ElMessageBox.confirm(`确定删除这条评论吗？`, '提示', {
      type: 'warning'
    })
    const index = comments.value.findIndex(c => c.id === comment.id)
    if (index > -1) {
      comments.value.splice(index, 1)
      ElMessage.success('评论删除成功')
    }
  } catch {
    // 用户取消删除
  }
}

onMounted(() => {
  console.log('评论管理页面加载完成')
})
</script>

<style scoped>
.comment-management {
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
</style>