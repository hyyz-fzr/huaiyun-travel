<template>
  <div class="order-list">
    <div class="page-header">
      <h1>我的订单</h1>
      <p>管理您的所有订单</p >
    </div>

    <div class="order-content">
      <el-card class="filter-card">
        <div class="filter-tabs">
          <el-radio-group v-model="activeStatus" @change="loadOrders">
            <el-radio-button label="">全部订单</el-radio-button>
            <el-radio-button label="pending">待付款</el-radio-button>
            <el-radio-button label="paid">待发货</el-radio-button>
            <el-radio-button label="shipped">待收货</el-radio-button>
            <el-radio-button label="completed">已完成</el-radio-button>
            <el-radio-button label="cancelled">已取消</el-radio-button>
          </el-radio-group>
        </div>
      </el-card>

      <div class="orders-container">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <el-card class="order-card">
            <div class="order-header">
              <div class="order-info">
                <span class="order-number">订单号：{{ order.orderNumber }}</span>
                <span class="order-time">下单时间：{{ formatTime(order.createTime) }}</span>
              </div>
              <div class="order-status">
                <el-tag :type="getStatusType(order.status)">
                  {{ getStatusText(order.status) }}
                </el-tag>
              </div>
            </div>

            <div class="order-products">
              <div v-for="item in order.items" :key="item.id" class="product-item">
                <div class="product-image">
                  <img :src="item.image" @error="handleImageError" />
                </div>
                <div class="product-info">
                  <h4 class="product-name">{{ item.name }}</h4>
                  <p class="product-sku" v-if="item.sku">{{ item.sku }}</p >
                </div>
                <div class="product-price">
                  <span class="price">￥{{ item.price }}</span>
                </div>
                <div class="product-quantity">
                  <span class="quantity">x{{ item.quantity }}</span>
                </div>
                <div class="product-total">
                  <span class="total">￥{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="order-summary">
              <div class="summary-info">
                <span>共 {{ order.itemCount }} 件商品</span>
                <span>合计：</span>
                <span class="total-amount">￥{{ order.totalAmount }}</span>
              </div>
            </div>

            <div class="order-actions">
              <el-button
                v-if="order.status === 'pending'"
                type="primary"
                size="small"
                @click="payOrder(order.id)"
              >
                立即支付
              </el-button>
              <el-button
                v-if="order.status === 'pending'"
                type="default"
                size="small"
                @click="cancelOrder(order.id)"
              >
                取消订单
              </el-button>
              <el-button
                v-if="order.status === 'shipped'"
                type="success"
                size="small"
                @click="confirmReceipt(order.id)"
              >
                确认收货
              </el-button>
              <el-button
                v-if="order.status === 'completed'"
                type="default"
                size="small"
                @click="applyRefund(order.id)"
              >
                申请退款
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="viewOrderDetail(order.id)"
              >
                查看详情
              </el-button>
            </div>
          </el-card>
        </div>

        <el-empty
          v-if="!loading && orders.length === 0"
          description="暂无订单"
          :image-size="200"
        >
          <el-button type="primary" @click="$router.push('/products')">
            去购物
          </el-button>
        </el-empty>
      </div>

      <div class="pagination">
        <el-pagination
          v-model:current-page="pagination.page"
          v-model:page-size="pagination.pageSize"
          :total="pagination.total"
          :page-sizes="[5, 10, 20, 50]"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="loadOrders"
          @current-change="loadOrders"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'

const router = useRouter()
const loading = ref(false)
const activeStatus = ref('')
const orders = ref([])

const pagination = ref({
  page: 1,
  pageSize: 10,
  total: 0
})

const mockOrders = [
  {
    id: 1,
    orderNumber: 'ORDER202401150001',
    createTime: '2024-01-15T10:30:00',
    status: 'completed',
    itemCount: 2,
    totalAmount: 114.00,
    items: [
      {
        id: 1,
        name: '淮南豆腐文化T恤',
        image: 'https://via.placeholder.com/80x80/4CAF50/white?text=T恤',
        price: 89.00,
        quantity: 1,
        sku: '白色 L码'
      },
      {
        id: 2,
        name: '八公山文化书签',
        image: 'https://via.placeholder.com/80x80/3F51B5/white?text=书签',
        price: 25.00,
        quantity: 1
      }
    ]
  },
  {
    id: 2,
    orderNumber: 'ORDER202401140001',
    createTime: '2024-01-14T16:20:00',
    status: 'shipped',
    itemCount: 1,
    totalAmount: 68.00,
    items: [
      {
        id: 3,
        name: '非遗剪纸套装',
        image: 'https://via.placeholder.com/80x80/F44336/white?text=剪纸',
        price: 68.00,
        quantity: 1
      }
    ]
  }
]

const loadOrders = async () => {
  try {
    loading.value = true
    await new Promise(resolve => setTimeout(resolve, 500))
    
    let filteredOrders = mockOrders
    if (activeStatus.value) {
      filteredOrders = mockOrders.filter(order => order.status === activeStatus.value)
    }
    
    orders.value = filteredOrders
    pagination.value.total = filteredOrders.length
  } catch (error) {
    ElMessage.error('加载订单失败')
    orders.value = []
  } finally {
    loading.value = false
  }
}

const getStatusType = (status) => {
  const typeMap = {
    'pending': 'warning',
    'paid': 'info',
    'shipped': 'primary',
    'completed': 'success',
    'cancelled': 'danger'
  }
  return typeMap[status] || 'info'
}

const getStatusText = (status) => {
  const textMap = {
    'pending': '待付款',
    'paid': '待发货',
    'shipped': '待收货',
    'completed': '已完成',
    'cancelled': '已取消'
  }
  return textMap[status] || status
}

const payOrder = async (orderId) => {
  try {
    await ElMessageBox.confirm('确定要支付这个订单吗？', '支付确认', {
      confirmButtonText: '确定支付',
      cancelButtonText: '取消',
      type: 'warning'
    })
    ElMessage.success('支付成功')
    loadOrders()
  } catch {
    // 用户取消支付
  }
}

const cancelOrder = async (orderId) => {
  try {
    await ElMessageBox.confirm('确定要取消这个订单吗？', '取消确认', {
      confirmButtonText: '确定取消',
      cancelButtonText: '取消',
      type: 'warning'
    })
    ElMessage.success('订单已取消')
    loadOrders()
  } catch {
    // 用户取消操作
  }
}

const confirmReceipt = async (orderId) => {
  try {
    await ElMessageBox.confirm('确认收到商品了吗？', '确认收货', {
      confirmButtonText: '确认收货',
      cancelButtonText: '取消',
      type: 'warning'
    })
    ElMessage.success('收货确认成功')
    loadOrders()
  } catch {
    // 用户取消操作
  }
}

const applyRefund = (orderId) => {
  ElMessage.info('退款申请功能开发中')
}

const viewOrderDetail = (orderId) => {
  ElMessage.info(`查看订单详情: ${orderId}`)
}

const formatTime = (timeString) => {
  if (!timeString) return ''
  return new Date(timeString).toLocaleString('zh-CN')
}

const handleImageError = (event) => {
  event.target.src = '/images/default-product.jpg'
}

onMounted(() => {
  loadOrders()
})
</script>

<style scoped>
.order-list {
  max-width: 1000px;
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

.filter-card {
  margin-bottom: 24px;
}

.filter-tabs {
  display: flex;
  justify-content: center;
}

.orders-container {
  gap: 20px;
  margin-bottom: 32px;
}

.order-card {
  border: 1px solid #f0f0f0;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 16px;
}

.order-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.order-number {
  font-weight: 600;
  color: #303133;
}

.order-time {
  font-size: 14px;
  color: #909399;
}

.order-products {
  gap: 16px;
  margin-bottom: 16px;
}

.product-item {
  display: grid;
  grid-template-columns: 80px 1fr 100px 80px 100px;
  gap: 16px;
  align-items: center;
  padding: 12px;
  background: #fafafa;
  border-radius: 6px;
}

.product-image {
  width: 80px;
  height: 80px;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 4px;
}

.product-info {
  min-width: 0;
}

.product-name {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 14px;
  line-height: 1.4;
}

.product-sku {
  margin: 0;
  font-size: 12px;
  color: #909399;
}

.product-price,
.product-quantity,
.product-total {
  text-align: center;
}

.price,
.quantity,
.total {
  color: #606266;
  font-size: 14px;
}

.total {
  color: #e6a23c;
  font-weight: bold;
}

.order-summary {
  display: flex;
  justify-content: flex-end;
  padding: 16px 0;
  border-top: 1px solid #f0f0f0;
}

.summary-info {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  color: #606266;
}

.total-amount {
  color: #e6a23c;
  font-weight: bold;
  font-size: 1.2em;
}

.order-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

.pagination {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .order-list {
    padding: 16px;
  }
  
  .product-item {
    grid-template-columns: 1fr;
    gap: 12px;
    text-align: center;
  }
  
  .order-header {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
  
  .order-actions {
    flex-wrap: wrap;
    justify-content: center;
  }
  
  .page-header h1 {
    font-size: 1.8em;
  }
  
  .filter-tabs {
    flex-wrap: wrap;
    gap: 8px;
  }
}
</style>

