<template>
  <div class="heritage-list">
    <div class="page-header">
      <h1>文化遗产</h1>
      <p>探索淮南丰富的历史文化遗产</p >
    </div>
    
    <div class="content-section">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="8" :md="6" v-for="item in 8" :key="item">
          <el-card class="heritage-card">
            <template #header>
              <h3>文化遗产项目 {{ item }}</h3>
            </template>
            <p>探索淮南文化的珍贵遗产</p >
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
// 文化遗产列表逻辑
</script>

<style scoped>
.heritage-list {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}
.page-header {
  text-align: center;
  margin-bottom: 40px;
}
.heritage-card {
  margin-bottom: 20px;
}
</style>