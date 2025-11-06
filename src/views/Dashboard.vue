<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1>数据看板</h1>
      <p>淮韵游踪平台数据统计分析</p >
    </div>

    <div class="stats-overview">
      <el-row :gutter="20">
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon user-icon">
                <i class="el-icon-user"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">1,234</div>
                <div class="stat-label">用户总数</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon content-icon">
                <i class="el-icon-document"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">567</div>
                <div class="stat-label">内容数量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon view-icon">
                <i class="el-icon-view"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">8,901</div>
                <div class="stat-label">访问量</div>
              </div>
            </div>
          </el-card>
        </el-col>
        <el-col :xs="12" :sm="6">
          <el-card class="stat-card">
            <div class="stat-content">
              <div class="stat-icon interaction-icon">
                <i class="el-icon-chat-dot-round"></i>
              </div>
              <div class="stat-info">
                <div class="stat-value">2,345</div>
                <div class="stat-label">互动数</div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>

    <div class="dashboard-content">
      <el-row :gutter="20">
        <el-col :xs="24" :lg="12">
          <el-card>
            <template #header>
              <h3>内容增长趋势</h3>
            </template>
            <div class="chart-placeholder">
              <p>内容增长图表区域</p >
            </div>
          </el-card>
        </el-col>
        <el-col :xs="24" :lg="12">
          <el-card>
            <template #header>
              <h3>用户活跃度</h3>
            </template>
            <div class="chart-placeholder">
              <p>用户活跃度图表区域</p >
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

// 数据看板逻辑
const loadDashboardData = () => {
  console.log('加载看板数据')
}

onMounted(() => {
  loadDashboardData()
})
</script>

<style scoped>
.dashboard {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.dashboard-header {
  text-align: center;
  margin-bottom: 40px;
}

.stat-card {
  margin-bottom: 20px;
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 15px;
  font-size: 1.5rem;
  color: white;
}

.user-icon { background-color: #409EFF; }
.content-icon { background-color: #67C23A; }
.view-icon { background-color: #E6A23C; }
.interaction-icon { background-color: #F56C6C; }

.stat-value {
  font-size: 1.8rem;
  font-weight: bold;
  color: #303133;
}

.stat-label {
  color: #909399;
  margin-top: 5px;
}

.chart-placeholder {
  height: 300px;
  background: #f5f7fa;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  color: #909399;
}
</style>