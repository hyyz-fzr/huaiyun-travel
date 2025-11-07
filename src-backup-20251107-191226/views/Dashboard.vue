<template>
  <div class="dashboard">
    <div class="dashboard-header">
      <h1 class="dashboard-title">数据看板</h1>
      <p class="dashboard-subtitle">淮南文化数字传承平台数据概览</p >
    </div>

    <!-- 指标卡片 -->
    <div class="metric-grid">
      <MetricCard
        title="总用户数"
        :value="stats.totalUsers"
        :icon="User"
        :trend="12.5"
        icon-color="#409eff"
      />
      <MetricCard
        title="文化遗产"
        :value="stats.totalHeritage"
        :icon="Histogram"
        :trend="8.3"
        icon-color="#67c23a"
      />
      <MetricCard
        title="文创产品"
        :value="stats.totalProducts"
        :icon="ShoppingBag"
        :trend="15.2"
        icon-color="#e6a23c"
      />
      <MetricCard
        title="社区帖子"
        :value="stats.totalPosts"
        :icon="ChatDotRound"
        :trend="23.7"
        icon-color="#f56c6c"
      />
    </div>

    <!-- 图表区域 -->
    <div class="chart-grid">
      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <h3>用户增长趋势</h3>
            <el-select 
              id="userChartRange"
              name="userChartRange"
              v-model="userChartRange" 
              size="small" 
              style="width: 120px"
            >
              <el-option label="近7天" value="7d" />
              <el-option label="近30天" value="30d" />
              <el-option label="近一年" value="1y" />
            </el-select>
          </div>
        </template>
        <ContentGrowthChart :range="userChartRange" />
      </el-card>

      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <h3>内容类型分布</h3>
          </div>
        </template>
        <ContentTypeChart />
      </el-card>

      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <h3>热门标签</h3>
          </div>
        </template>
        <HotTagsChart />
      </el-card>

      <el-card class="chart-card">
        <template #header>
          <div class="chart-header">
            <h3>用户活跃度</h3>
            <el-select 
              id="activityChartRange"
              name="activityChartRange"
              v-model="activityChartRange" 
              size="small" 
              style="width: 120px"
            >
              <el-option label="近7天" value="7d" />
              <el-option label="近30天" value="30d" />
            </el-select>
          </div>
        </template>
        <UserActivityChart :range="activityChartRange" />
      </el-card>
    </div>

    <!-- 最新动态 -->
    <div class="recent-activity">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="activity-card">
            <template #header>
              <div class="card-header">
                <el-icon><Clock /></el-icon>
                <span>最新内容</span>
              </div>
            </template>
            <LatestContents :contents="recentContents" />
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="12" :lg="8">
          <el-card class="activity-card">
            <template #header>
              <div class="card-header">
                <el-icon><ChatDotRound /></el-icon>
                <span>最新评论</span>
              </div>
            </template>
            <LatestComments :comments="recentComments" />
          </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :lg="8">
          <el-card class="activity-card">
            <template #header>
              <div class="card-header">
                <el-icon><TrendCharts /></el-icon>
                <span>系统状态</span>
              </div>
            </template>
            <div class="system-status">
              <div class="status-item">
                <span class="status-label">服务器状态</span>
                <el-tag type="success">正常运行</el-tag>
              </div>
              <div class="status-item">
                <span class="status-label">数据库连接</span>
                <el-tag type="success">正常</el-tag>
              </div>
              <div class="status-item">
                <span class="status-label">API响应时间</span>
                <el-tag type="warning">128ms</el-tag>
              </div>
              <div class="status-item">
                <span class="status-label">存储空间</span>
                <el-progress :percentage="65" :show-text="false" />
                <span class="status-value">65%</span>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import {
  User,
  Histogram,
  ShoppingBag,
  ChatDotRound,
  Clock,
  TrendCharts
} from '@element-plus/icons-vue'

// 组件导入
import MetricCard from '@/components/common/MetricCard.vue'
import ContentGrowthChart from '@/components/charts/ContentGrowthChart.vue'
import ContentTypeChart from '@/components/charts/ContentTypeChart.vue'
import HotTagsChart from '@/components/charts/HotTagsChart.vue'
import UserActivityChart from '@/components/charts/UserActivityChart.vue'
import LatestContents from '@/components/common/LatestContents.vue'
import LatestComments from '@/components/common/LatestComments.vue'

const userChartRange = ref('30d')
const activityChartRange = ref('7d')

const stats = reactive({
  totalUsers: 0,
  totalHeritage: 0,
  totalProducts: 0,
  totalPosts: 0
})

const recentContents = ref([])
const recentComments = ref([])

onMounted(async () => {
  await loadDashboardData()
})

const loadDashboardData = async () => {
  try {
    // 模拟加载数据
    stats.totalUsers = 1524
    stats.totalHeritage = 89
    stats.totalProducts = 156
    stats.totalPosts = 423

    // 加载最新内容
    recentContents.value = [
      {
        id: 1,
        title: '淮南豆腐文化的历史渊源',
        type: '文化遗产',
        author: '文化研究员',
        time: '2小时前',
        views: 156
      },
      {
        id: 2,
        title: '八公山传说新发现',
        type: '研究成果',
        author: '考古学家',
        time: '5小时前',
        views: 89
      },
      {
        id: 3,
        title: '传统豆腐制作工艺',
        type: '技艺传承',
        author: '非遗传承人',
        time: '1天前',
        views: 234
      }
    ]

    // 加载最新评论
    recentComments.value = [
      {
        id: 1,
        content: '这篇文章对淮南文化的介绍非常全面，学到了很多！',
        user: '文化爱好者',
        time: '30分钟前',
        post: '淮南文化概览'
      },
      {
        id: 2,
        content: '图片质量很高，希望能看到更多这样的内容。',
        user: '摄影达人',
        time: '1小时前',
        post: '八公山美景'
      },
      {
        id: 3,
        content: '作为一个淮南人，看到家乡文化被这样传承真的很感动。',
        user: '本地居民',
        time: '2小时前',
        post: '家乡记忆'
      }
    ]
  } catch (error) {
    ElMessage.error('加载数据看板失败')
  }
}
</script>

<style scoped lang="scss">
.dashboard {
  padding: 20px;
  min-height: calc(100vh - 60px);
  background: #f5f7fa;
}

.dashboard-header {
  margin-bottom: 30px;
  text-align: center;
}

.dashboard-title {
  font-size: 2.5em;
  font-weight: bold;
  color: #303133;
  margin-bottom: 8px;
}

.dashboard-subtitle {
  font-size: 1.1em;
  color: #606266;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
}

.chart-card {
  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
}

.chart-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.1em;
    font-weight: 600;
    color: #303133;
  }
}

.recent-activity {
  margin-bottom: 30px;
}

.activity-card {
  height: 100%;

  :deep(.el-card__header) {
    padding: 16px 20px;
    border-bottom: 1px solid #f0f0f0;
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #303133;
}

.system-status {
  .status-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 0;
    border-bottom: 1px solid #f0f0f0;

    &:last-child {
      border-bottom: none;
      flex-direction: column;
      align-items: stretch;
      gap: 8px;
    }
  }

  .status-label {
    color: #606266;
    font-size: 0.9em;
  }

  .status-value {
    color: #909399;
    font-size: 0.8em;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .dashboard {
    padding: 10px;
  }

  .chart-grid {
    grid-template-columns: 1fr;
  }

  .metric-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .metric-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-title {
    font-size: 2em;
  }
}
</style>