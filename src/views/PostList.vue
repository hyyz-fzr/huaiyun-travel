<template>
<<<<<<< HEAD
  <div class="post-list-page">
=======
  <div class="post-list">
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
    <div class="page-header">
      <h1>文化社区</h1>
      <p>分享交流淮南文化见闻</p >
    </div>
    
    <div class="content-section">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" v-for="post in posts" :key="post.id">
          <el-card class="post-card">
            <template #header>
              <h3>{{ post.title }}</h3>
            </template>
            <p>{{ post.content }}</p >
            <div class="post-meta">
              <span>作者: {{ post.author }}</span>
              <span>时间: {{ post.time }}</span>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([
  {
    id: 1,
    title: '八公山历史文化探秘',
    content: '深入探索八公山的历史文化和传说故事...',
    author: '文化爱好者',
    time: '2024-01-15'
  },
  {
    id: 2,
    title: '豆腐制作工艺传承',
    content: '了解淮南豆腐的传统制作工艺和现代创新...',
    author: '美食达人',
    time: '2024-01-14'
  }
])

onMounted(() => {
  // 加载帖子数据
})
</script>

<style scoped>
.post-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  margin-bottom: 40px;
}
.post-card {
  margin-bottom: 20px;
}
.post-meta {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  font-size: 0.9rem;
  color: #909399;
}
</style>
