<template>
  <el-card class="metric-card" :body-style="{ padding: '20px' }">
    <div class="metric-content">
      <div class="metric-icon" :style="{ backgroundColor: iconColor }">
        <el-icon :size="24" color="white">
          <component :is="icon" />
        </el-icon>
      </div>
      <div class="metric-info">
        <div class="metric-value">{{ value }}</div>
        <div class="metric-title">{{ title }}</div>
        <div class="metric-trend" :class="trendClass">
          <el-icon :size="12">
            <component :is="trendIcon" />
          </el-icon>
          <span>{{ trendValue }}</span>
        </div>
      </div>
    </div>
  </el-card>
</template>

<script setup>
import { computed } from 'vue'
import { TrendCharts } from '@element-plus/icons-vue'  // ✅ 修复：移除不存在的 Trend

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  value: {
    type: [String, Number],
    required: true
  },
  icon: {
    type: Object,
    required: true
  },
  trend: {
    type: Number,
    default: 0
  },
  iconColor: {
    type: String,
    default: '#409eff'
  }
})

const trendClass = computed(() => {
  return props.trend >= 0 ? 'trend-up' : 'trend-down'
})

const trendIcon = computed(() => {
  return props.trend >= 0 ? TrendCharts : TrendCharts  // ✅ 修复：统一使用 TrendCharts
})

const trendValue = computed(() => {
  return props.trend >= 0 ? `+${props.trend}%` : `${props.trend}%`
})
</script>

<style scoped lang="scss">
.metric-card {
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
}

.metric-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.metric-icon {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.metric-info {
  flex: 1;
}

.metric-value {
  font-size: 24px;
  font-weight: bold;
  color: #303133;
  margin-bottom: 4px;
}

.metric-title {
  font-size: 14px;
  color: #606266;
  margin-bottom: 4px;
}

.metric-trend {
  display: flex;
  align-items: center;
  gap: 4px;
  font-size: 12px;

  &.trend-up {
    color: #67c23a;
  }

  &.trend-down {
    color: #f56c6c;
  }
}
</style>