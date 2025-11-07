<template>
  <div class="content-type-chart">
    <div class="chart-header">
      <h3>内容类型分布</h3>
      <el-button size="small" @click="handleExport">
        <i class="el-icon-download"></i>
        导出数据
      </el-button>
    </div>

    <div class="chart-content">
      <div class="chart-visualization">
        <div class="pie-chart-placeholder">
          <div class="pie-segment" 
               v-for="(item, index) in typeData" 
               :key="item.type"
               :style="getSegmentStyle(index)"
               :title="`${item.type}: ${item.count}篇 (${item.percentage}%)`">
          </div>
        </div>
      </div>

      <div class="chart-legend">
        <div class="legend-item" v-for="(item, index) in typeData" :key="item.type">
          <div class="legend-color" :style="{ backgroundColor: getColor(index) }"></div>
          <div class="legend-info">
            <span class="legend-type">{{ item.type }}</span>
            <span class="legend-count">{{ item.count }}篇 ({{ item.percentage }}%)</span>
          </div>
        </div>
      </div>
    </div>

    <div class="chart-summary">
      <el-row :gutter="20">
        <el-col :span="8">
          <div class="summary-item">
            <div class="summary-icon" style="background: #409EFF;">
              <i class="el-icon-collection"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">{{ getTypeCount('文化遗产') }}</div>
              <div class="summary-label">文化遗产</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="summary-item">
            <div class="summary-icon" style="background: #67C23A;">
              <i class="el-icon-magic-stick"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">{{ getTypeCount('传统技艺') }}</div>
              <div class="summary-label">传统技艺</div>
            </div>
          </div>
        </el-col>
        <el-col :span="8">
          <div class="summary-item">
            <div class="summary-icon" style="background: #E6A23C;">
              <i class="el-icon-goods"></i>
            </div>
            <div class="summary-content">
              <div class="summary-value">{{ getTypeCount('文创产品') }}</div>
              <div class="summary-label">文创产品</div>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const typeData = ref([
  { type: '文化遗产', count: 456, percentage: 45 },
  { type: '传统技艺', count: 234, percentage: 23 },
  { type: '文创产品', count: 189, percentage: 19 },
  { type: '活动资讯', count: 123, percentage: 13 }
])

const colors = ['#409EFF', '#67C23A', '#E6A23C', '#F56C6C', '#909399']

const getColor = (index) => {
  return colors[index % colors.length]
}

const getSegmentStyle = (index) => {
  const total = 100
  let start = 0
  for (let i = 0; i < index; i++) {
    start += typeData.value[i].percentage
  }
  
  return {
    background: `conic-gradient(
      ${getColor(index)} 0% ${typeData.value[index].percentage}%,
      transparent ${typeData.value[index].percentage}% 100%
    )`,
    transform: `rotate(${start * 3.6}deg)`
  }
}

const getTypeCount = (type) => {
  const item = typeData.value.find(item => item.type === type)
  return item ? item.count : 0
}

const handleExport = () => {
  ElMessage.success('数据导出成功')
  // 这里应该是实际的数据导出逻辑
  console.log('导出类型分布数据:', typeData.value)
}

onMounted(() => {
  console.log('内容类型分布图表加载完成')
})
</script>

<style scoped>
.content-type-chart {
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

.chart-content {
  display: flex;
  align-items: center;
  gap: 40px;
  margin-bottom: 30px;
}

.chart-visualization {
  flex: 1;
  display: flex;
  justify-content: center;
}

.pie-chart-placeholder {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background: #f5f7fa;
  position: relative;
  overflow: hidden;
}

.pie-segment {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 50%;
  clip-path: polygon(50% 50%, 50% 0%, 100% 0%, 100% 100%, 50% 100%);
}

.chart-legend {
  flex: 1;
}

.legend-item {
  display: flex;
  align-items: center;
  margin-bottom: 12px;
  padding: 8px;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.legend-item:hover {
  background-color: #f5f7fa;
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: 3px;
  margin-right: 10px;
}

.legend-info {
  display: flex;
  flex-direction: column;
}

.legend-type {
  font-weight: 500;
  color: #303133;
  margin-bottom: 2px;
}

.legend-count {
  font-size: 0.85rem;
  color: #909399;
}

.chart-summary {
  border-top: 1px solid #e4e7ed;
  padding-top: 20px;
}

.summary-item {
  display: flex;
  align-items: center;
  gap: 15px;
}

.summary-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
}

.summary-value {
  font-size: 1.5rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.summary-label {
  color: #909399;
  font-size: 0.9rem;
}
</style>
