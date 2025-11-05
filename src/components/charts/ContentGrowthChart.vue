<template>
  <div class="content-growth-chart">
    <div v-if="loading" class="chart-loading">
      <el-skeleton :rows="5" animated />
    </div>
    <div v-else-if="!data || data.length === 0" class="chart-empty">
      <el-empty description="暂无数据" />
    </div>
    <div v-else ref="chartRef" class="chart-container"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as echarts from 'echarts'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  type: {
    type: String,
    default: 'day'
  },
  loading: {
    type: Boolean,
    default: false
  }
})

const chartRef = ref()
let chartInstance = null

// 初始化图表
const initChart = () => {
  if (!chartRef.value) return
  
  chartInstance = echarts.init(chartRef.value)
  updateChart()
}

// 更新图表数据
const updateChart = () => {
  if (!chartInstance || !props.data || props.data.length === 0) return

  const option = {
    tooltip: {
      trigger: 'axis',
      axisPointer: {
        type: 'shadow'
      }
    },
    legend: {
      data: ['文化见闻', '旅行游记', '学习分享', '活动记录'],
      right: 10,
      top: 0
    },
    grid: {
      left: '3%',
      right: '4%',
      bottom: '3%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: props.data.map(item => item.date),
      axisLabel: {
        rotate: props.type === 'day' ? 45 : 0
      }
    },
    yAxis: {
      type: 'value',
      name: '内容数量'
    },
    series: [
      {
        name: '文化见闻',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.story || 0),
        itemStyle: {
          color: '#409EFF'
        }
      },
      {
        name: '旅行游记',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.travel || 0),
        itemStyle: {
          color: '#67C23A'
        }
      },
      {
        name: '学习分享',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.learning || 0),
        itemStyle: {
          color: '#E6A23C'
        }
      },
      {
        name: '活动记录',
        type: 'bar',
        stack: 'total',
        emphasis: {
          focus: 'series'
        },
        data: props.data.map(item => item.activity || 0),
        itemStyle: {
          color: '#F56C6C'
        }
      }
    ]
  }

  chartInstance.setOption(option)
}

// 响应式调整
const handleResize = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

// 监听数据变化
watch(() => props.data, () => {
  updateChart()
}, { deep: true })

watch(() => props.type, () => {
  updateChart()
})

// 生命周期
onMounted(() => {
  initChart()
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (chartInstance) {
    chartInstance.dispose()
    chartInstance = null
  }
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
.content-growth-chart {
  width: 100%;
  height: 300px;
}

.chart-container {
  width: 100%;
  height: 100%;
}

.chart-loading,
.chart-empty {
  width: 100%;
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>