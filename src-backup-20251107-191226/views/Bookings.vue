<template>
  <div class="bookings-page">
    <div class="page-header">
      <h1>我的预订</h1>
      <p>管理您的文化活动预订</p >
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>预订列表</span>
          <div>
            <el-button type="primary" @click="handleCreateBooking">
              <el-icon><Plus /></el-icon>
              新建预订
            </el-button>
            <el-button @click="refreshData">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>

      <el-table :data="bookings" v-loading="loading" style="width: 100%">
        <el-table-column prop="eventName" label="活动名称" min-width="200" />
        <el-table-column prop="eventDate" label="活动时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.eventDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="bookingDate" label="预订时间" width="180">
          <template #default="{ row }">
            {{ formatDate(row.bookingDate) }}
          </template>
        </el-table-column>
        <el-table-column prop="participants" label="参与人数" width="100" />
        <el-table-column prop="status" label="状态" width="120">
          <template #default="{ row }">
            <el-tag :type="getStatusType(row.status)">{{ row.status }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="totalAmount" label="金额" width="120">
          <template #default="{ row }">¥{{ row.totalAmount }}</template>
        </el-table-column>
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="viewDetails(row)">详情</el-button>
            <el-button 
              size="small" 
              type="danger" 
              :disabled="row.status !== '"'"'待确认'"'"'"
              @click="cancelBooking(row)"
            >
              取消
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 预订详情对话框 -->
    <el-dialog v-model="detailVisible" title="预订详情" width="600px">
      <div v-if="currentBooking" class="booking-detail">
        <el-descriptions :column="2" border>
          <el-descriptions-item label="活动名称">{{ currentBooking.eventName }}</el-descriptions-item>
          <el-descriptions-item label="活动时间">{{ formatDate(currentBooking.eventDate) }}</el-descriptions-item>
          <el-descriptions-item label="预订时间">{{ formatDate(currentBooking.bookingDate) }}</el-descriptions-item>
          <el-descriptions-item label="参与人数">{{ currentBooking.participants }}人</el-descriptions-item>
          <el-descriptions-item label="状态">
            <el-tag :type="getStatusType(currentBooking.status)">{{ currentBooking.status }}</el-tag>
          </el-descriptions-item>
          <el-descriptions-item label="总金额">¥{{ currentBooking.totalAmount }}</el-descriptions-item>
          <el-descriptions-item label="联系电话">{{ currentBooking.phone }}</el-descriptions-item>
          <el-descriptions-item label="备注信息" :span="2">{{ currentBooking.remarks || '"'"'无'"'"' }}</el-descriptions-item>
        </el-descriptions>
      </div>
      <template #footer>
        <el-button @click="detailVisible = false">关闭</el-button>
        <el-button 
          type="primary" 
          v-if="currentBooking?.status === '"'"'待确认'"'"'"
          @click="confirmBooking(currentBooking)"
        >
          确认预订
        </el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from '"'"'vue'"'"'
import { ElMessage, ElMessageBox } from '"'"'element-plus'"'"'
import { Plus, Refresh } from '"'"'@element-plus/icons-vue'"'"'

const loading = ref(false)
const detailVisible = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const currentBooking = ref(null)

// 模拟数据
const bookingsData = ref([
  {
    id: 1,
    eventName: '"'"'八公山文化讲座'"'"',
    eventDate: '"'"'2024-02-15 14:00:00'"'"',
    bookingDate: '"'"'2024-01-20 10:30:00'"'"',
    participants: 2,
    status: '"'"'已确认'"'"',
    totalAmount: 100,
    phone: '"'"'138****1234'"'"',
    remarks: '"'"'希望安排前排座位'"'"'
  },
  {
    id: 2,
    eventName: '"'"'淮南豆腐制作体验'"'"',
    eventDate: '"'"'2024-02-20 09:00:00'"'"',
    bookingDate: '"'"'2024-01-22 15:20:00'"'"',
    participants: 1,
    status: '"'"'待确认'"'"',
    totalAmount: 50,
    phone: '"'"'139****5678'"'"',
    remarks: '"'"''"'"'
  }
])

const bookings = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return bookingsData.value.slice(start, end)
})

const getStatusType = (status) => {
  const statusMap = {
    '"'"'待确认'"'"': '"'"'warning'"'"',
    '"'"'已确认'"'"': '"'"'success'"'"',
    '"'"'已取消'"'"': '"'"'info'"'"',
    '"'"'已完成'"'"': '"'"''"'"'
  }
  return statusMap[status] || '"'"''"'"'
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString('"'"'zh-CN'"'"')
}

const refreshData = async () => {
  loading.value = true
  // 模拟API调用
  setTimeout(() => {
    total.value = bookingsData.value.length
    loading.value = false
    ElMessage.success('"'"'数据已刷新'"'"')
  }, 1000)
}

const viewDetails = (booking) => {
  currentBooking.value = booking
  detailVisible.value = true
}

const handleCreateBooking = () => {
  ElMessage.info('"'"'跳转到活动列表进行预订'"'"')
  // 实际项目中跳转到活动列表
  // $router.push('"'"'/events/list'"'"')
}

const cancelBooking = async (booking) => {
  try {
    await ElMessageBox.confirm(
      `确定要取消"${booking.eventName}"的预订吗？`,
      '"'"'取消预订'"'"',
      {
        confirmButtonText: '"'"'确定取消'"'"',
        cancelButtonText: '"'"'再想想'"'"',
        type: '"'"'warning'"'"'
      }
    )
    
    // 更新状态
    booking.status = '"'"'已取消'"'"'
    ElMessage.success('"'"'预订已取消'"'"')
  } catch {
    // 用户取消操作
  }
}

const confirmBooking = async (booking) => {
  try {
    await ElMessageBox.confirm('"'"'确定要确认此预订吗？'"'"', '"'"'确认预订'"'"')
    booking.status = '"'"'已确认'"'"'
    detailVisible.value = false
    ElMessage.success('"'"'预订已确认'"'"')
  } catch {
    // 用户取消操作
  }
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.bookings-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 2.2em;
}

.page-header p {
  color: #606266;
  font-size: 1.1em;
  margin: 0;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.pagination-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}

.booking-detail {
  padding: 10px 0;
}

:deep(.el-descriptions__label) {
  font-weight: 600;
}
</style>