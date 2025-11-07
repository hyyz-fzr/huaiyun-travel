<template>
  <div class="order-confirm">
    <div class="container">
      <el-steps :active="currentStep" align-center class="order-steps">
        <el-step title="购物车" description="确认商品" />
        <el-step title="确认订单" description="填写信息" />
        <el-step title="支付订单" description="完成支付" />
        <el-step title="完成订单" description="等待收货" />
      </el-steps>

      <div class="order-content">
        <el-row :gutter="20">
          <!-- 订单商品 -->
          <el-col :xs="24" :lg="16">
            <el-card class="order-section">
              <template #header>
                <div class="section-header">
                  <h3>订单商品</h3>
                  <el-button link @click="$router.push('/cart')">修改订单</el-button>
                </div>
              </template>

              <div class="product-list">
                <div 
                  v-for="item in orderItems" 
                  :key="item.id"
                  class="product-item"
                >
                  <div class="product-image">
                    <img :src="item.image" :alt="item.name" />
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ item.name }}</h4>
                    <p class="product-desc">{{ item.description }}</p >
                    <div class="product-spec">规格：默认规格</div>
                  </div>
                  <div class="product-price">
                    <div class="price">¥{{ item.price }}</div>
                    <div class="quantity">x{{ item.quantity }}</div>
                  </div>
                  <div class="product-total">
                    ¥{{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <div class="order-summary">
                <div class="summary-item">
                  <span>商品总价：</span>
                  <span>¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-item">
                  <span>运费：</span>
                  <span v-if="orderInfo.shippingFee > 0">¥{{ orderInfo.shippingFee.toFixed(2) }}</span>
                  <span v-else class="free-shipping">免运费</span>
                </div>
                <div class="summary-item discount">
                  <span>优惠：</span>
                  <span>-¥{{ orderInfo.discountAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-item total">
                  <span>实付款：</span>
                  <span class="total-price">¥{{ orderInfo.actualAmount.toFixed(2) }}</span>
                </div>
              </div>
            </el-card>

            <!-- 收货地址 -->
            <el-card class="order-section">
              <template #header>
                <div class="section-header">
                  <h3>收货地址</h3>
                  <el-button link @click="showAddressDialog = true">
                    {{ addresses.length > 0 ? '选择其他地址' : '添加地址' }}
                  </el-button>
                </div>
              </template>

              <div v-if="selectedAddress" class="address-info">
                <div class="address-main">
                  <span class="recipient">{{ selectedAddress.recipient }}</span>
                  <span class="phone">{{ selectedAddress.phone }}</span>
                  <el-tag v-if="selectedAddress.isDefault" type="success" size="small">默认</el-tag>
                </div>
                <div class="address-detail">
                  {{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detail }}
                </div>
              </div>

              <div v-else class="no-address">
                <el-empty description="暂无收货地址">
                  <el-button type="primary" @click="showAddressDialog = true">
                    添加收货地址
                  </el-button>
                </el-empty>
              </div>
            </el-card>

            <!-- 配送方式 -->
            <el-card class="order-section">
              <template #header>
                <h3>配送方式</h3>
              </template>
              <el-radio-group v-model="orderInfo.shippingMethod">
                <el-radio label="express">快递配送</el-radio>
                <el-radio label="pickup">门店自提</el-radio>
              </el-radio-group>
            </el-card>

            <!-- 支付方式 -->
            <el-card class="order-section">
              <template #header>
                <h3>支付方式</h3>
              </template>
              <el-radio-group v-model="orderInfo.paymentMethod">
                <el-radio label="wechat">
                  <div class="payment-option">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>微信支付</span>
                  </div>
                </el-radio>
                <el-radio label="alipay">
                  <div class="payment-option">
                    <el-icon><Money /></el-icon>
                    <span>支付宝</span>
                  </div>
                </el-radio>
                <el-radio label="balance">
                  <div class="payment-option">
                    <el-icon><Wallet /></el-icon>
                    <span>余额支付</span>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-card>

            <!-- 买家留言 -->
            <el-card class="order-section">
              <template #header>
                <h3>买家留言</h3>
              </template>
              <el-input
                v-model="orderInfo.notes"
                type="textarea"
                :rows="3"
                placeholder="请输入留言（选填）"
                maxlength="200"
                show-word-limit
              />
            </el-card>
          </el-col>

          <!-- 订单信息侧边栏 -->
          <el-col :xs="24" :lg="8">
            <el-card class="order-sidebar">
              <template #header>
                <h3>订单信息</h3>
              </template>

              <div class="sidebar-content">
                <div class="info-item">
                  <span class="label">订单号：</span>
                  <span class="value">{{ orderInfo.orderNumber }}</span>
                </div>
                <div class="info-item">
                  <span class="label">创建时间：</span>
                  <span class="value">{{ orderInfo.createTime }}</span>
                </div>
                <div class="info-item">
                  <span class="label">商品数量：</span>
                  <span class="value">{{ orderInfo.totalQuantity }}件</span>
                </div>
                <div class="info-item">
                  <span class="label">商品总价：</span>
                  <span class="value">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">运费：</span>
                  <span class="value" v-if="orderInfo.shippingFee > 0">
                    ¥{{ orderInfo.shippingFee.toFixed(2) }}
                  </span>
                  <span class="value free" v-else>免运费</span>
                </div>
                <div class="info-item discount">
                  <span class="label">优惠：</span>
                  <span class="value">-¥{{ orderInfo.discountAmount.toFixed(2) }}</span>
                </div>
                <div class="info-item total">
                  <span class="label">实付款：</span>
                  <span class="value total-price">¥{{ orderInfo.actualAmount.toFixed(2) }}</span>
                </div>
              </div>

              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  size="large" 
                  class="submit-order"
                  :loading="loading"
                  @click="handleSubmitOrder"
                >
                  提交订单
                </el-button>
                <el-button @click="$router.back()">返回修改</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 地址选择对话框 -->
    <el-dialog
      v-model="showAddressDialog"
      title="选择收货地址"
      width="600px"
    >
      <div class="address-list">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="address-item"
          :class="{ active: selectedAddress?.id === address.id }"
          @click="selectAddress(address)"
        >
          <div class="address-header">
            <span class="recipient">{{ address.recipient }}</span>
            <span class="phone">{{ address.phone }}</span>
            <el-tag v-if="address.isDefault" type="success" size="small">默认</el-tag>
          </div>
          <div class="address-detail">
            {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
          </div>
          <div class="address-actions">
            <el-button link type="primary" @click.stop="editAddress(address)">编辑</el-button>
            <el-button link type="danger" @click.stop="deleteAddress(address.id)">删除</el-button>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" @click="showAddAddress = true">添加新地址</el-button>
        <el-button @click="showAddressDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 添加地址对话框 -->
    <el-dialog
      v-model="showAddAddress"
      :title="editingAddress ? '编辑地址' : '添加地址'"
      width="500px"
    >
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        :rules="addressRules"
        label-width="80px"
      >
        <el-form-item label="收货人" prop="recipient">
          <el-input v-model="addressForm.recipient" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="所在地区" prop="region">
          <el-cascader
            v-model="addressForm.region"
            :options="regionOptions"
            placeholder="请选择省市区"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input
            v-model="addressForm.detail"
            type="textarea"
            :rows="3"
            placeholder="请输入详细地址"
          />
        </el-form-item>
        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.isDefault" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showAddAddress = false">取消</el-button>
        <el-button type="primary" @click="saveAddress">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ChatDotRound, Money, Wallet } from '@element-plus/icons-vue'

const router = useRouter()

const currentStep = ref(1)
const loading = ref(false)
const showAddressDialog = ref(false)
const showAddAddress = ref(false)
const editingAddress = ref(null)
const addressFormRef = ref()

// 订单信息
const orderInfo = reactive({
  orderNumber: `ORD${Date.now()}`,
  createTime: new Date().toLocaleString(),
  totalAmount: 0,
  shippingFee: 0,
  discountAmount: 0,
  actualAmount: 0,
  totalQuantity: 0,
  shippingMethod: 'express',
  paymentMethod: 'wechat',
  notes: ''
})

// 订单商品
const orderItems = ref([
  {
    id: 1,
    name: '淮南豆腐文化礼盒',
    description: '精选淮南优质黄豆，传统工艺制作',
    image: '/images/products/tofu-gift-1.jpg',
    price: 168.00,
    quantity: 1
  },
  {
    id: 2,
    name: '八公山风景明信片',
    description: '精美八公山风景明信片套装',
    image: '/images/products/postcard-1.jpg',
    price: 25.00,
    quantity: 2
  }
])

// 地址数据
const addresses = ref([
  {
    id: 1,
    recipient: '张三',
    phone: '13800138000',
    province: '安徽省',
    city: '淮南市',
    district: '八公山区',
    detail: '八公山街道123号',
    isDefault: true
  },
  {
    id: 2,
    recipient: '李四',
    phone: '13900139000',
    province: '安徽省',
    city: '淮南市',
    district: '田家庵区',
    detail: '人民路456号',
    isDefault: false
  }
])

const selectedAddress = ref(null)

// 地址表单
const addressForm = reactive({
  recipient: '',
  phone: '',
  region: [],
  detail: '',
  isDefault: false
})

const addressRules = {
  recipient: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择所在地区', trigger: 'change' }
  ],
  detail: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
}

// 地区选项（简化版）
const regionOptions = [
  {
    value: 'anhui',
    label: '安徽省',
    children: [
      {
        value: 'huainan',
        label: '淮南市',
        children: [
          { value: 'bagong', label: '八公山区' },
          { value: 'tianjiaan', label: '田家庵区' },
          { value: 'datong', label: '大通区' },
          { value: 'xiejiaji', label: '谢家集区' },
          { value: 'panji', label: '潘集区' },
          { value: 'fengtai', label: '凤台县' },
          { value: 'shou', label: '寿县' }
        ]
      }
    ]
  }
]

onMounted(() => {
  calculateOrderAmount()
  // 默认选择默认地址
  const defaultAddress = addresses.value.find(addr => addr.isDefault)
  if (defaultAddress) {
    selectedAddress.value = defaultAddress
  }
})

// 计算订单金额
const calculateOrderAmount = () => {
  let totalAmount = 0
  let totalQuantity = 0

  orderItems.value.forEach(item => {
    totalAmount += item.price * item.quantity
    totalQuantity += item.quantity
  })

  // 计算运费（满100免运费）
  const shippingFee = totalAmount >= 100 ? 0 : 10
  // 计算优惠（示例：满150减10）
  const discountAmount = totalAmount >= 150 ? 10 : 0
  const actualAmount = totalAmount + shippingFee - discountAmount

  Object.assign(orderInfo, {
    totalAmount,
    shippingFee,
    discountAmount,
    actualAmount,
    totalQuantity
  })
}

// 选择地址
const selectAddress = (address) => {
  selectedAddress.value = address
  showAddressDialog.value = false
}

// 编辑地址
const editAddress = (address) => {
  editingAddress.value = address
  Object.assign(addressForm, {
    recipient: address.recipient,
    phone: address.phone,
    region: [address.province, address.city, address.district],
    detail: address.detail,
    isDefault: address.isDefault
  })
  showAddAddress.value = true
}

// 删除地址
const deleteAddress = (id) => {
  const index = addresses.value.findIndex(addr => addr.id === id)
  if (index !== -1) {
    addresses.value.splice(index, 1)
    ElMessage.success('地址删除成功')
  }
}
<template>
  <div class="order-confirm">
    <div class="container">
      <el-steps :active="currentStep" align-center class="order-steps">
        <el-step title="购物车" description="确认商品" />
        <el-step title="确认订单" description="填写信息" />
        <el-step title="支付订单" description="完成支付" />
        <el-step title="完成订单" description="等待收货" />
      </el-steps>

      <div class="order-content">
        <el-row :gutter="20">
          <!-- 订单商品 -->
          <el-col :xs="24" :lg="16">
            <el-card class="order-section">
              <template #header>
                <div class="section-header">
                  <h3>订单商品</h3>
                  <el-button link @click="$router.push('/cart')">修改订单</el-button>
                </div>
              </template>

              <div class="product-list">
                <div 
                  v-for="item in orderItems" 
                  :key="item.id"
                  class="product-item"
                >
                  <div class="product-image">
                    < img :src="item.image" :alt="item.name" />
                  </div>
                  <div class="product-info">
                    <h4 class="product-name">{{ item.name }}</h4>
                    <p class="product-desc">{{ item.description }}</p >
                    <div class="product-spec">规格：默认规格</div>
                  </div>
                  <div class="product-price">
                    <div class="price">¥{{ item.price }}</div>
                    <div class="quantity">x{{ item.quantity }}</div>
                  </div>
                  <div class="product-total">
                    ¥{{ (item.price * item.quantity).toFixed(2) }}
                  </div>
                </div>
              </div>

              <div class="order-summary">
                <div class="summary-item">
                  <span>商品总价：</span>
                  <span>¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-item">
                  <span>运费：</span>
                  <span v-if="orderInfo.shippingFee > 0">¥{{ orderInfo.shippingFee.toFixed(2) }}</span>
                  <span v-else class="free-shipping">免运费</span>
                </div>
                <div class="summary-item discount">
                  <span>优惠：</span>
                  <span>-¥{{ orderInfo.discountAmount.toFixed(2) }}</span>
                </div>
                <div class="summary-item total">
                  <span>实付款：</span>
                  <span class="total-price">¥{{ orderInfo.actualAmount.toFixed(2) }}</span>
                </div>
              </div>
            </el-card>

            <!-- 收货地址 -->
            <el-card class="order-section">
              <template #header>
                <div class="section-header">
                  <h3>收货地址</h3>
                  <el-button link @click="showAddressDialog = true">
                    {{ addresses.length > 0 ? '选择其他地址' : '添加地址' }}
                  </el-button>
                </div>
              </template>

              <div v-if="selectedAddress" class="address-info">
                <div class="address-main">
                  <span class="recipient">{{ selectedAddress.recipient }}</span>
                  <span class="phone">{{ selectedAddress.phone }}</span>
                  <el-tag v-if="selectedAddress.isDefault" type="success" size="small">默认</el-tag>
                </div>
                <div class="address-detail">
                  {{ selectedAddress.province }}{{ selectedAddress.city }}{{ selectedAddress.district }}{{ selectedAddress.detail }}
                </div>
              </div>

              <div v-else class="no-address">
                <el-empty description="暂无收货地址">
                  <el-button type="primary" @click="showAddressDialog = true">
                    添加收货地址
                  </el-button>
                </el-empty>
              </div>
            </el-card>

            <!-- 配送方式 -->
            <el-card class="order-section">
              <template #header>
                <h3>配送方式</h3>
              </template>
              <el-radio-group v-model="orderInfo.shippingMethod">
                <el-radio label="express">快递配送</el-radio>
                <el-radio label="pickup">门店自提</el-radio>
              </el-radio-group>
            </el-card>

            <!-- 支付方式 -->
            <el-card class="order-section">
              <template #header>
                <h3>支付方式</h3>
              </template>
              <el-radio-group v-model="orderInfo.paymentMethod">
                <el-radio label="wechat">
                  <div class="payment-option">
                    <el-icon><ChatDotRound /></el-icon>
                    <span>微信支付</span>
                  </div>
                </el-radio>
                <el-radio label="alipay">
                  <div class="payment-option">
                    <el-icon><Money /></el-icon>
                    <span>支付宝</span>
                  </div>
                </el-radio>
                <el-radio label="balance">
                  <div class="payment-option">
                    <el-icon><Wallet /></el-icon>
                    <span>余额支付</span>
                  </div>
                </el-radio>
              </el-radio-group>
            </el-card>

            <!-- 买家留言 -->
            <el-card class="order-section">
              <template #header>
                <h3>买家留言</h3>
              </template>
              <el-input
                v-model="orderInfo.notes"
                type="textarea"
                :rows="3"
                placeholder="请输入留言（选填）"
                maxlength="200"
                show-word-limit
              />
            </el-card>
          </el-col>

          <!-- 订单信息侧边栏 -->
          <el-col :xs="24" :lg="8">
            <el-card class="order-sidebar">
              <template #header>
                <h3>订单信息</h3>
              </template>

              <div class="sidebar-content">
                <div class="info-item">
                  <span class="label">订单号：</span>
                  <span class="value">{{ orderInfo.orderNumber }}</span>
                </div>
                <div class="info-item">
                  <span class="label">创建时间：</span>
                  <span class="value">{{ orderInfo.createTime }}</span>
                </div>
                <div class="info-item">
                  <span class="label">商品数量：</span>
                  <span class="value">{{ orderInfo.totalQuantity }}件</span>
                </div>
                <div class="info-item">
                  <span class="label">商品总价：</span>
                  <span class="value">¥{{ orderInfo.totalAmount.toFixed(2) }}</span>
                </div>
                <div class="info-item">
                  <span class="label">运费：</span>
                  <span class="value" v-if="orderInfo.shippingFee > 0">
                    ¥{{ orderInfo.shippingFee.toFixed(2) }}
                  </span>
                  <span class="value free" v-else>免运费</span>
                </div>
                <div class="info-item discount">
                  <span class="label">优惠：</span>
                  <span class="value">-¥{{ orderInfo.discountAmount.toFixed(2) }}</span>
                </div>
                <div class="info-item total">
                  <span class="label">实付款：</span>
                  <span class="value total-price">¥{{ orderInfo.actualAmount.toFixed(2) }}</span>
                </div>
              </div>

              <div class="action-buttons">
                <el-button 
                  type="primary" 
                  size="large" 
                  class="submit-order"
                  :loading="loading"
                  @click="handleSubmitOrder"
                >
                  提交订单
                </el-button>
                <el-button @click="$router.back()">返回修改</el-button>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>

    <!-- 地址选择对话框 -->
    <el-dialog
      v-model="showAddressDialog"
      title="选择收货地址"
      width="600px"
    >
      <div class="address-list">
        <div
          v-for="address in addresses"
          :key="address.id"
          class="address-item"
          :class="{ active: selectedAddress?.id === address.id }"
          @click="selectAddress(address)"
        >
          <div class="address-header">
            <span class="recipient">{{ address.recipient }}</span>
            <span class="phone">{{ address.phone }}</span>
            <el-tag v-if="address.isDefault" type="success" size="small">默认</el-tag>
          </div>
          <div class="address-detail">
            {{ address.province }}{{ address.city }}{{ address.district }}{{ address.detail }}
          </div>
          <div class="address-actions">
            <el-button link type="primary" @click.stop="editAddress(address)">编辑</el-button>
            <el-button link type="danger" @click.stop="deleteAddress(address.id)">删除</el-button>
          </div>
        </div>
      </div>

      <div class="dialog-footer">
        <el-button type="primary" @click="showAddAddress = true">添加新地址</el-button>
        <el-button @click="showAddressDialog = false">取消</el-button>
      </div>
    </el-dialog>

    <!-- 添加地址对话框 -->
    <el-dialog
      v-model="showAddAddress"
      :title="editingAddress ? '编辑地址' : '添加地址'"
      width="500px"
    >
      <el-form
        ref="addressFormRef"
        :model="addressForm"
        :rules="addressRules"
        label-width="80px"
      >
        <el-form-item label="收货人" prop="recipient">
          <el-input v-model="addressForm.recipient" placeholder="请输入收货人姓名" />
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model="addressForm.phone" placeholder="请输入手机号码" />
        </el-form-item>
        <el-form-item label="所在地区" prop="region">
          <el-cascader
            v-model="addressForm.region"
            :options="regionOptions"
            placeholder="请选择省市区"
            style="width: 100%"
          />
        </el-form-item>
        <el-form-item label="详细地址" prop="detail">
          <el-input
            v-model="addressForm.detail"
            type="textarea"
            :rows="3"
            placeholder="请输入详细地址"
          />
        </el-form-item>
        <el-form-item label="设为默认">
          <el-switch v-model="addressForm.isDefault" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button @click="showAddAddress = false">取消</el-button>
        <el-button type="primary" @click="saveAddress">保存</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { ChatDotRound, Money, Wallet } from '@element-plus/icons-vue'

const router = useRouter()

const currentStep = ref(1)
const loading = ref(false)
const showAddressDialog = ref(false)
const showAddAddress = ref(false)
const editingAddress = ref(null)
const addressFormRef = ref()

// 订单信息
const orderInfo = reactive({
  orderNumber: `ORD${Date.now()}`,
  createTime: new Date().toLocaleString(),
  totalAmount: 0,
  shippingFee: 0,
  discountAmount: 0,
  actualAmount: 0,
  totalQuantity: 0,
  shippingMethod: 'express',
  paymentMethod: 'wechat',
  notes: ''
})

// 订单商品
const orderItems = ref([
  {
    id: 1,
    name: '淮南豆腐文化礼盒',
    description: '精选淮南优质黄豆，传统工艺制作',
    image: '/images/products/tofu-gift-1.jpg',
    price: 168.00,
    quantity: 1
  },
  {
    id: 2,
    name: '八公山风景明信片',
    description: '精美八公山风景明信片套装',
    image: '/images/products/postcard-1.jpg',
    price: 25.00,
    quantity: 2
  }
])

// 地址数据
const addresses = ref([
  {
    id: 1,
    recipient: '张三',
    phone: '13800138000',
    province: '安徽省',
    city: '淮南市',
    district: '八公山区',
    detail: '八公山街道123号',
    isDefault: true
  },
  {
    id: 2,
    recipient: '李四',
    phone: '13900139000',
    province: '安徽省',
    city: '淮南市',
    district: '田家庵区',
    detail: '人民路456号',
    isDefault: false
  }
])

const selectedAddress = ref(null)

// 地址表单
const addressForm = reactive({
  recipient: '',
  phone: '',
  region: [],
  detail: '',
  isDefault: false
})

const addressRules = {
  recipient: [
    { required: true, message: '请输入收货人姓名', trigger: 'blur' }
  ],
  phone: [
    { required: true, message: '请输入手机号码', trigger: 'blur' },
    { pattern: /^1[3-9]\d{9}$/, message: '手机号码格式不正确', trigger: 'blur' }
  ],
  region: [
    { required: true, message: '请选择所在地区', trigger: 'change' }
  ],
  detail: [
    { required: true, message: '请输入详细地址', trigger: 'blur' }
  ]
}

// 地区选项（简化版）
const regionOptions = [
  {
    value: 'anhui',
    label: '安徽省',
    children: [
      {
        value: 'huainan',
        label: '淮南市',
        children: [
          { value: 'bagong', label: '八公山区' },
          { value: 'tianjiaan', label: '田家庵区' },
          { value: 'datong', label: '大通区' },
          { value: 'xiejiaji', label: '谢家集区' },
          { value: 'panji', label: '潘集区' },
          { value: 'fengtai', label: '凤台县' },
          { value: 'shou', label: '寿县' }
        ]
      }
    ]
  }
]

onMounted(() => {
  calculateOrderAmount()
  // 默认选择默认地址
  const defaultAddress = addresses.value.find(addr => addr.isDefault)
  if (defaultAddress) {
    selectedAddress.value = defaultAddress
  }
})

// 计算订单金额
const calculateOrderAmount = () => {
  let totalAmount = 0
  let totalQuantity = 0

  orderItems.value.forEach(item => {
    totalAmount += item.price * item.quantity
    totalQuantity += item.quantity
  })

  // 计算运费（满100免运费）
  const shippingFee = totalAmount >= 100 ? 0 : 10
  // 计算优惠（示例：满150减10）
  const discountAmount = totalAmount >= 150 ? 10 : 0
  const actualAmount = totalAmount + shippingFee - discountAmount

  Object.assign(orderInfo, {
    totalAmount,
    shippingFee,
    discountAmount,
    actualAmount,
    totalQuantity
  })
}

// 选择地址
const selectAddress = (address) => {
  selectedAddress.value = address
  showAddressDialog.value = false
}

// 编辑地址
const editAddress = (address) => {
  editingAddress.value = address
  Object.assign(addressForm, {
    recipient: address.recipient,
    phone: address.phone,
    region: [address.province, address.city, address.district],
    detail: address.detail,
    isDefault: address.isDefault
  })
  showAddAddress.value = true
}

// 删除地址
const deleteAddress = (id) => {
  const index = addresses.value.findIndex(addr => addr.id === id)
  if (index !== -1) {
    addresses.value.splice(index, 1)
    ElMessage.success('地址删除成功')
  }
}
