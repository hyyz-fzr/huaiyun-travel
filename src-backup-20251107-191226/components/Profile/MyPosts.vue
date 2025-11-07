<template>
  <div class="my-posts">
    <div class="page-header">
      <div class="header-content">
        <div>
          <h2>我的帖子</h2>
          <p>管理您发布的帖子和内容</p >
        </div>
        <el-button type="primary" @click="$router.push('/post-upload')">
          <el-icon><Plus /></el-icon>
          发布新帖子
        </el-button>
      </div>
    </div>

    <div class="posts-content">
      <el-table :data="myPosts" style="width: 100%">
        <el-table-column prop="title" label="标题" min-width="200">
          <template #default="{ row }">
            <div class="post-title-cell">
              <span class="title-text">{{ row.title }}</span>
              <el-tag v-if="row.isPaid" size="small" type="warning">付费</el-tag>
            </div>
          </template>
        </el-table-column>
        
        <el-table-column prop="status" label="状态" width="100">
          <template #default="{ row }">
            <el-tag 
              :type="row.status === 'published' ? 'success' : 'info'"
              size="small"
            >
              {{ row.status === 'published' ? '已发布' : '草稿' }}
            </el-tag>
          </template>
        </el-table-column>
        
        <el-table-column prop="createTime" label="发布时间" width="180" />
        
        <el-table-column prop="viewCount" label="浏览" width="80" />
        
        <el-table-column prop="likeCount" label="点赞" width="80" />
        
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button link type="primary" size="small" @click="editPost(row.id)">
              编辑
            </el-button>
            <el-button link type="primary" size="small" @click="viewPost(row.id)">
              查看
            </el-button>
            <el-button 
              link 
              type="danger" 
              size="small"
              @click="deletePost(row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 空状态 -->
      <el-empty 
        v-if="myPosts.length === 0" 
        description="您还没有发布过帖子"
        :image-size="200"
      >
        <el-button type="primary" @click="$router.push('/post-upload')">
          发布第一个帖子
        </el-button>
      </el-empty>
    </div>
  </div>
</template>

<script setup>
/* eslint-disable no-unused-vars */
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Plus } from '@element-plus/icons-vue'

const router = useRouter()

// 模拟我的帖子数据
const myPosts = ref([
  {
    id: 1,
    title: '淮南豆腐制作技艺全解析',
    status: 'published',
    createTime: '2024-01-12 14:30',
    viewCount: 156,
    likeCount: 23,
    isPaid: false
  },
  {
    id: 2,
    title: '八公山历史文化深度游攻略',
    status: 'published',
    createTime: '2024-01-08 09:15',
    viewCount: 289,
    likeCount: 45,
    isPaid: true
  },
  {
    id: 3,
    title: '淮南非遗文化保护现状',
    status: 'draft',
    createTime: '2024-01-05 16:20',
    viewCount: 0,
    likeCount: 0,
    isPaid: false
  }
])

const editPost = (postId) => {
  ElMessage.info(`编辑帖子 ${postId}`)
  // 实际应该跳转到编辑页面
}

const viewPost = (postId) => {
  router.push(`/post/${postId}`)
}

const deletePost = (postId) => {
  ElMessageBox.confirm('确定要删除这个帖子吗？此操作不可恢复。', '删除确认', {
    confirmButtonText: '确定删除',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    myPosts.value = myPosts.value.filter(post => post.id !== postId)
    ElMessage.success('帖子已删除')
  })
}
</script>

<style scoped>
.my-posts {
  padding: 20px;
}

.page-header {
  margin-bottom: 30px;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.header-content h2 {
  color: #303133;
  margin-bottom: 8px;
}

.header-content p {
  color: #909399;
  margin: 0;
}

.post-title-cell {
  display: flex;
  align-items: center;
  gap: 8px;
}

.title-text {
  font-weight: 500;
}

.posts-content {
  min-height: 400px;
}
</style>