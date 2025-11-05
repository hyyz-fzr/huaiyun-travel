<template>
  <div class="content-dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>内容统计看板</h1>
      <p>全面监控平台内容数据，实时了解运营状况</p >
    </div>

    <!-- 时间筛选 -->
    <div class="time-filter">
      <el-radio-group v-model="timeRange" @change="handleTimeRangeChange">
        <el-radio-button label="today">今日</el-radio-button>
        <el-radio-button label="week">本周</el-radio-button>
        <el-radio-button label="month">本月</el-radio-button>
        <el-radio-button label="quarter">本季度</el-radio-button>
        <el-radio-button label="year">今年</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>

      <el-date-picker
        v-if="timeRange === 'custom'"
        v-model="customDateRange"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleCustomDateChange"
        style="margin-left: 16px;"
      />
    </div>

    <!-- 核心指标卡片 -->
    <div class="metrics-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <MetricCard
            title="总内容数"
            :value="metrics.totalContents"
            :trend="metrics.contentTrend"
            icon="Document"
            color="#409EFF"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="总用户数"
            :value="metrics.totalUsers"
            :trend="metrics.userTrend"
            icon="User"
            color="#67C23A"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="总评论数"
            :value="metrics.totalComments"
            :trend="metrics.commentTrend"
            icon="ChatDotRound"
            color="#E6A23C"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="总浏览量"
            :value="metrics.totalViews"
            :trend="metrics.viewTrend"
            icon="View"
            color="#F56C6C"
            :loading="loading"
          />
        </el-col>
      </el-row>
    </div>

    <!-- 第二行指标 -->
    <div class="metrics-cards">
      <el-row :gutter="20">
        <el-col :span="6">
          <MetricCard
            title="活跃用户"
            :value="metrics.activeUsers"
            :trend="metrics.activeUserTrend"
            icon="UserFilled"
            color="#909399"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="内容互动率"
            :value="metrics.interactionRate + '%'"
            :trend="metrics.interactionTrend"
            icon="TrendCharts"
            color="#FF6B6B"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="平均停留时长"
            :value="metrics.avgDuration + '分钟'"
            :trend="metrics.durationTrend"
            icon="Clock"
            color="#4ECDC4"
            :loading="loading"
          />
        </el-col>
        <el-col :span="6">
          <MetricCard
            title="内容完成率"
            :value="metrics.completionRate + '%'"
            :trend="metrics.completionTrend"
            icon="CircleCheck"
            color="#45B7D1"
            :loading="loading"
          />
        </el-col>
      </el-row>
    </div>

    <!-- 图表区域 -->
    <div class="charts-section">
      <el-row :gutter="20">
        <!-- 内容增长趋势 -->
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>内容增长趋势</span>
                <el-select v-model="growthChartType" size="small" style="width: 120px;">
                  <el-option label="按日" value="day" />
                  <el-option label="按周" value="week" />
                  <el-option label="按月" value="month" />
                </el-select>
              </div>
            </template>
            <ContentGrowthChart
              :data="chartData.growth"
              :type="growthChartType"
              :loading="loading"
            />
          </el-card>
        </el-col>

        <!-- 内容类型分布 -->
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>内容类型分布</span>
              </div>
            </template>
            <ContentTypeChart
              :data="chartData.typeDistribution"
              :loading="loading"
            />
          </el-card>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="margin-top: 20px;">
        <!-- 用户活跃时段 -->
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>用户活跃时段</span>
              </div>
            </template>
            <UserActivityChart
              :data="chartData.userActivity"
              :loading="loading"
            />
          </el-card>
        </el-col>

        <!-- 热门标签排行 -->
        <el-col :span="12">
          <el-card class="chart-card">
            <template #header>
              <div class="chart-header">
                <span>热门标签排行</span>
              </div>
            </template>
            <HotTagsChart
              :data="chartData.hotTags"
              :loading="loading"
            />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 实时动态 -->
    <div class="realtime-section">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-card class="realtime-card">
            <template #header>
              <div class="chart-header">
                <span>最新内容</span>
                <el-button type="primary" link @click="handleViewAllContents">
                  查看全部
                </el-button>
              </div>
            </template>
            <LatestContents :data="realtimeData.latestContents" :loading="loading" />
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="realtime-card">
            <template #header>
              <div class="chart-header">
                <span>最新评论</span>
                <el-button type="primary" link @click="handleViewAllComments">
                  查看全部
                </el-button>
              </div>
            </template>
            <LatestComments :data="realtimeData.latestComments" :loading="loading" />
          </el-card>
        </el-col>
      </el-row>
    </div>

    <!-- 数据导出 -->
    <div class="export-section">
      <el-button type="primary" @click="handleExportData">
        <el-icon><Download /></el-icon>
        导出数据报表
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Download } from '@element-plus/icons-vue'

// 组件导入
import MetricCard from '@/components/common/MetricCard.vue'
import ContentGrowthChart from '@/components/charts/ContentGrowthChart.vue'
import ContentTypeChart from '@/components/charts/ContentTypeChart.vue'
import UserActivityChart from '@/components/charts/UserActivityChart.vue'
import HotTagsChart from '@/components/charts/HotTagsChart.vue'
import LatestContents from '@/components/common/LatestContents.vue'
import LatestComments from '@/components/common/LatestComments.vue'

import { contentStore } from '@/stores/content'

const router = useRouter()
const store = contentStore()

// 响应式数据
const timeRange = ref('week')
const customDateRange = ref([])
const growthChartType = ref('day')
const loading = ref(false)

// 指标数据
const metrics = reactive({
  totalContents: 0,
  totalUsers: 0,
  totalComments: 0,
  totalViews: 0,
  activeUsers: 0,
  interactionRate: 0,
  avgDuration: 0,
  completionRate: 0,
  contentTrend: 0,
  userTrend: 0,
  commentTrend: 0,
  viewTrend: 0,
  activeUserTrend: 0,
  interactionTrend: 0,
  durationTrend: 0,
  completionTrend: 0
})

// 图表数据
const chartData = reactive({
  growth: [],
  typeDistribution: [],
  userActivity: [],
  hotTags: []
})

// 实时数据
const realtimeData = reactive({
  latestContents: [],
  latestComments: []
})

// 定时器
let refreshTimer = null

// 方法
const loadDashboardData = async () => {
  loading.value = true
  try {
    const params = {
      timeRange: timeRange.value,
      startDate: customDateRange.value[0]?.toISOString().split('T')[0],
      endDate: customDateRange.value[1]?.toISOString().split('T')[0]
    }

    await store.fetchDashboardData(params)
    
    // 更新指标数据
    Object.assign(metrics, store.dashboardMetrics)
    
    // 更新图表数据
    Object.assign(chartData, store.dashboardCharts)
    
    // 更新实时数据
    Object.assign(realtimeData, store.dashboardRealtime)
    
  } catch (error) {
    ElMessage.error('加载看板数据失败：' + error.message)
  } finally {
    loading.value = false
  }
}

const handleTimeRangeChange = () => {
  if (timeRange.value !== 'custom') {
    customDateRange.value = []
  }
  loadDashboardData()
}

const handleCustomDateChange = () => {
  if (customDateRange.value && customDateRange.value.length === 2) {
    loadDashboardData()
  }
}

const handleViewAllContents = () => {
  router.push('/content-management')
}

const handleViewAllComments = () => {
  router.push('/comment-management')
}

const handleExportData = async () => {
  try {
    loading.value = true
    await store.exportDashboardData({
      timeRange: timeRange.value,
      startDate: customDateRange.value[0]?.toISOString().split('T')[0],
      endDate: customDateRange.value[1]?.toISOString().split('T')[0]
    })
    ElMessage.success('数据导出成功')
  } catch (error) {
    ElMessage.error('导出失败：' + error.message)
  } finally {
    loading.value = false
  }
}

const startAutoRefresh = () => {
  // 每5分钟自动刷新一次
  refreshTimer = setInterval(() => {
    loadDashboardData()
  }, 5 * 60 * 1000)
}

const stopAutoRefresh = () => {
  if (refreshTimer) {
    clearInterval(refreshTimer)
    refreshTimer = null
  }
}

// 生命周期
onMounted(() => {
  loadDashboardData()
  startAutoRefresh()
})

onUnmounted(() => {
  stopAutoRefresh()
})
</script>

<style scoped>
.content-dashboard {
  padding: 20px;
  background: #f5f7fa;
  min-height: 100vh;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h1 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.page-header p {
  margin: 8px 0 0;
  color: #909399;
  font-size: 14px;
}

.time-filter {
  margin-bottom: 24px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.metrics-cards {
  margin-bottom: 20px;
}

.charts-section {
  margin-bottom: 20px;
}

.chart-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: 500;
  color: #303133;
}

.realtime-section {
  margin-bottom: 20px;
}

.realtime-card {
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}

.export-section {
  text-align: center;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>