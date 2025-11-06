<template>
  <div class="content-growth-chart">
    <div class="chart-header">
      <h3>内容增长趋势</h3>
      <div class="chart-controls">
        <el-select v-model="timeRange" size="small" @change="handleTimeRangeChange">
          <el-option label="最近7天" value="7d"></el-option>
          <el-option label="最近30天" value="30d"></el-option>
          <el-option label="最近90天" value="90d"></el-option>
        </el-select>
        <el-button size="small" @click="handleRefresh">
          <i class="el-icon-refresh"></i>
        </el-button>
      </div>
    </div>

    <div class="chart-container">
      <div class="chart-placeholder">
        <div class="placeholder-content">
          <i class="el-icon-data-analysis"></i>
          <p>内容增长趋势图表</p >
          <div class="mock-chart">
            <div class="chart-bars">
              <div 
                v-for="(item, index) in mockData" 
                :key="index"
                class="chart-bar"
                :style="{ height: item.value * 2 + 'px' }"
                :title="`${item.date}: ${item.value}篇`"
              ></div>
            </div>
            <div class="chart-labels">
              <span v-for="(item, index) in mockData" :key="index">
                {{ item.date.split('-').slice(1).join('/') }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-stats">
      <div class="stat-item">
        <span class="stat-label">总内容数</span>
        <span class="stat-value">1,234</span>
        <span class="stat-trend up">+12%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">日均增长</span>
        <span class="stat-value">28</span>
        <span class="stat-trend up">+5%</span>
      </div>
      <div class="stat-item">
        <span class="stat-label">完成率</span>
        <span class="stat-value">85%</span>
        <span class="stat-trend up">+3%</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const timeRange = ref('30d')

const mockData = ref([
  { date: '2024-01-01', value: 23 },
  { date: '2024-01-02', value: 45 },
  { date: '2024-01-03', value: 56 },
  { date: '2024-01-04', value: 34 },
  { date: '2024-01-05', value: 67 },
  { date: '2024-01-06', value: 78 },
  { date: '2024-01-07', value: 89 }
])

const handleTimeRangeChange = (value) => {
  ElMessage.info(`时间范围切换为: ${value}`)
  // 这里应该根据时间范围重新获取数据
  loadChartData(value)
}

const handleRefresh = () => {
  ElMessage.success('图表数据已刷新')
  loadChartData(timeRange.value)
}

const loadChartData = (range) => {
  console.log('加载图表数据，范围:', range)
  // 模拟数据加载
  setTimeout(() => {
    // 这里应该是实际的API调用
    console.log('图表数据加载完成')
  }, 500)
}

onMounted(() => {
  loadChartData(timeRange.value)
})
</script>

<style scoped>
.content-growth-chart {
  background: white;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.chart-header h3 {
  margin: 0;
  color: #303133;
}

.chart-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.chart-container {
  margin-bottom: 20px;
}

.chart-placeholder {
  height: 300px;
  background: #f8f9fa;
  border-radius: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-content {
  text-align: center;
  color: #909399;
}

.placeholder-content i {
  font-size: 3rem;
  margin-bottom: 10px;
  display: block;
}

.mock-chart {
  margin-top: 20px;
}

.chart-bars {
  display: flex;
  align-items: flex-end;
  justify-content: space-around;
  height: 120px;
  padding: 0 20px;
}

.chart-bar {
  width: 20px;
  background: linear-gradient(to top, #409EFF, #79BBFF);
  border-radius: 2px 2px 0 0;
  transition: all 0.3s;
  cursor: pointer;
}

.chart-bar:hover {
  background: linear-gradient(to top, #337ecc, #409EFF);
  transform: scale(1.1);
}

.chart-labels {
  display: flex;
  justify-content: space-around;
  margin-top: 10px;
  font-size: 0.8rem;
  color: #606266;
}

.chart-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px;
}

.stat-item {
  text-align: center;
  padding: 15px;
  background: #f5f7fa;
  border-radius: 6px;
}

.stat-label {
  display: block;
  font-size: 0.9rem;
  color: #909399;
  margin-bottom: 5px;
}

.stat-value {
  display: block;
  font-size: 1.5rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 5px;
}

.stat-trend {
  font-size: 0.8rem;
  padding: 2px 6px;
  border-radius: 10px;
}

.stat-trend.up {
  background: #f0f9ff;
  color: #409EFF;
}

.stat-trend.down {
  background: #fef0f0;
  color: #F56C6C;
}
</style>