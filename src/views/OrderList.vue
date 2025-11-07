<<<<<<< HEAD
<template>
  <div class="order-list">
    <div class="page-header">
      <h1>ÎÒµÄ¶©µ¥</h1>
      <p>¹ÜÀíÄúµÄËùÓĞ¶©µ¥</p >
    </div>

    <div class="order-content">
      <el-card class="filter-card">
        <div class="filter-tabs">
          <el-radio-group v-model="activeStatus" @change="loadOrders">
            <el-radio-button label="">È«²¿¶©µ¥</el-radio-button>
            <el-radio-button label="pending">´ı¸¶¿î</el-radio-button>
            <el-radio-button label="paid">´ı·¢»õ</el-radio-button>
            <el-radio-button label="shipped">´ıÊÕ»õ</el-radio-button>
            <el-radio-button label="completed">ÒÑÍê³É</el-radio-button>
            <el-radio-button label="cancelled">ÒÑÈ¡Ïû</el-radio-button>
          </el-radio-group>
        </div>
      </el-card>

      <div class="orders-container">
        <div v-for="order in orders" :key="order.id" class="order-item">
          <el-card class="order-card">
            <div class="order-header">
              <div class="order-info">
                <span class="order-number">¶©µ¥ºÅ£º{{ order.orderNumber }}</span>
                <span class="order-time">ÏÂµ¥Ê±¼ä£º{{ formatTime(order.createTime) }}</span>
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
                  <span class="price">£¤{{ item.price }}</span>
                </div>
                <div class="product-quantity">
                  <span class="quantity">x{{ item.quantity }}</span>
                </div>
                <div class="product-total">
                  <span class="total">£¤{{ (item.price * item.quantity).toFixed(2) }}</span>
                </div>
              </div>
            </div>

            <div class="order-summary">
              <div class="summary-info">
                <span>¹² {{ order.itemCount }} ¼şÉÌÆ·</span>
                <span>ºÏ¼Æ£º</span>
                <span class="total-amount">£¤{{ order.totalAmount }}</span>
              </div>
            </div>

            <div class="order-actions">
              <el-button
                v-if="order.status === 'pending'"
                type="primary"
                size="small"
                @click="payOrder(order.id)"
              >
                Á¢¼´Ö§¸¶
              </el-button>
              <el-button
                v-if="order.status === 'pending'"
                type="default"
                size="small"
                @click="cancelOrder(order.id)"
              >
                È¡Ïû¶©µ¥
              </el-button>
              <el-button
                v-if="order.status === 'shipped'"
                type="success"
                size="small"
                @click="confirmReceipt(order.id)"
              >
                È·ÈÏÊÕ»õ
              </el-button>
              <el-button
                v-if="order.status === 'completed'"
                type="default"
                size="small"
                @click="applyRefund(order.id)"
              >
                ÉêÇëÍË¿î
              </el-button>
              <el-button
                type="text"
                size="small"
                @click="viewOrderDetail(order.id)"
              >
                ²é¿´ÏêÇé
              </el-button>
            </div>
          </el-card>
        </div>

        <el-empty
          v-if="!loading && orders.length === 0"
          description="ÔİÎŞ¶©µ¥"
          :image-size="200"
        >
          <el-button type="primary" @click="$router.push('/products')">
            È¥¹ºÎï
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
=======
ï»¿<template>
  <div class="$(($FileName -replace '\.vue$','').ToLower())">
    <h3>$(($FileName -replace '\.vue$',''))</h3>
    <p>æ·®å—æ–‡åŒ–æ•°å­—ä¼ æ‰¿å¹³å° - ç»„ä»¶å·²ä¿®å¤</p >
    <el-button type="primary" @click="handleTest">æµ‹è¯•åŠŸèƒ½</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

<<<<<<< HEAD
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
        name: '»´ÄÏ¶¹¸¯ÎÄ»¯TĞô',
        image: 'https://via.placeholder.com/80x80/4CAF50/white?text=TĞô',
        price: 89.00,
        quantity: 1,
        sku: '°×É« LÂë'
      },
      {
        id: 2,
        name: '°Ë¹«É½ÎÄ»¯ÊéÇ©',
        image: 'https://via.placeholder.com/80x80/3F51B5/white?text=ÊéÇ©',
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
        name: '·ÇÒÅ¼ôÖ½Ì××°',
        image: 'https://via.placeholder.com/80x80/F44336/white?text=¼ôÖ½',
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
    ElMessage.error('¼ÓÔØ¶©µ¥Ê§°Ü')
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
    'pending': '´ı¸¶¿î',
    'paid': '´ı·¢»õ',
    'shipped': '´ıÊÕ»õ',
    'completed': 'ÒÑÍê³É',
    'cancelled': 'ÒÑÈ¡Ïû'
  }
  return textMap[status] || status
}

const payOrder = async (orderId) => {
  try {
    await ElMessageBox.confirm('È·¶¨ÒªÖ§¸¶Õâ¸ö¶©µ¥Âğ£¿', 'Ö§¸¶È·ÈÏ', {
      confirmButtonText: 'È·¶¨Ö§¸¶',
      cancelButtonText: 'È¡Ïû',
      type: 'warning'
    })
    ElMessage.success('Ö§¸¶³É¹¦')
    loadOrders()
  } catch {
    // ÓÃ»§È¡ÏûÖ§¸¶
  }
}

const cancelOrder = async (orderId) => {
  try {
    await ElMessageBox.confirm('È·¶¨ÒªÈ¡ÏûÕâ¸ö¶©µ¥Âğ£¿', 'È¡ÏûÈ·ÈÏ', {
      confirmButtonText: 'È·¶¨È¡Ïû',
      cancelButtonText: 'È¡Ïû',
      type: 'warning'
    })
    ElMessage.success('¶©µ¥ÒÑÈ¡Ïû')
    loadOrders()
  } catch {
    // ÓÃ»§È¡Ïû²Ù×÷
  }
}

const confirmReceipt = async (orderId) => {
  try {
    await ElMessageBox.confirm('È·ÈÏÊÕµ½ÉÌÆ·ÁËÂğ£¿', 'È·ÈÏÊÕ»õ', {
      confirmButtonText: 'È·ÈÏÊÕ»õ',
      cancelButtonText: 'È¡Ïû',
      type: 'warning'
    })
    ElMessage.success('ÊÕ»õÈ·ÈÏ³É¹¦')
    loadOrders()
  } catch {
    // ÓÃ»§È¡Ïû²Ù×÷
  }
}

const applyRefund = (orderId) => {
  ElMessage.info('ÍË¿îÉêÇë¹¦ÄÜ¿ª·¢ÖĞ')
}

const viewOrderDetail = (orderId) => {
  ElMessage.info(`²é¿´¶©µ¥ÏêÇé: ${orderId}`)
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
=======
const handleTest = () => {
  ElMessage.success('$(($FileName -replace '\.vue$','')) ç»„ä»¶å·¥ä½œæ­£å¸¸')
}
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
</script>

<style scoped>
.$(($FileName -replace '\.vue$','').ToLower()) {
  padding: 20px;
  text-align: center;
<<<<<<< HEAD
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
=======
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin: 10px;
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</style>

