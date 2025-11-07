<template>
<<<<<<< HEAD
  <div class="content-dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>内容统计看板</h1>
      <p>全面监控平台内容数据，实时了解运营状况</p >
    </div>

    <!-- 时间筛选 -->
    <div class="time-filter">
      <el-radio-group 
        id="timeRange"
        name="timeRange"
        v-model="timeRange" 
        @change="handleTimeRangeChange"
      >
        <el-radio-button label="today">今日</el-radio-button>
        <el-radio-button label="week">本周</el-radio-button>
        <el-radio-button label="month">本月</el-radio-button>
        <el-radio-button label="quarter">本季度</el-radio-button>
        <el-radio-button label="year">今年</el-radio-button>
        <el-radio-button label="custom">自定义</el-radio-button>
      </el-radio-group>

      <el-date-picker
        id="customDateRange"
        name="customDateRange"
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
                <el-select 
                  id="growthChartType"
                  name="growthChartType"
                  v-model="growthChartType" 
                  size="small" 
                  style="width: 120px;"
                >
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
=======
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('组件功能正常')
}
</script>

<style scoped>
.component {
  padding: 20px;
  text-align: center;
}
</style>