<template>
  <div class="dashboard">
    <h1>数据看板</h1>
    <p>平台数据统计分析</p >
    
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card>
          <h3>用户总数</h3>
          <p class="number">1,234</p >
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <h3>内容数量</h3>
          <p class="number">567</p >
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <h3>访问量</h3>
          <p class="number">8,901</p >
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <h3>互动数</h3>
          <p class="number">2,345</p >
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
// 数据看板逻辑
</script>

<style scoped>
.dashboard {
  padding: 20px;
}
.number {
  font-size: 2rem;
  font-weight: bold;
  color: #409EFF;
}
</style>