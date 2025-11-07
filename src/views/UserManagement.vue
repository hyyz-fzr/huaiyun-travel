<template>
  <div class="user-management-page">
    <div class="page-header">
      <h1>用户管理</h1>
      <p>管理系统用户和权限</p >
    </div>

    <el-card>
      <template #header>
        <div class="card-header">
          <span>用户列表</span>
          <div class="header-actions">
            <el-button type="primary" @click="showAddUserDialog = true">
              <el-icon><Plus /></el-icon>
              新增用户
            </el-button>
            <el-button @click="refreshData">
              <el-icon><Refresh /></el-icon>
              刷新
            </el-button>
          </div>
        </div>
      </template>

      <!-- 搜索筛选 -->
      <div class="search-filters">
        <el-form :model="searchForm" inline>
          <el-form-item label="用户名">
            <el-input 
              v-model="searchForm.username" 
              placeholder="请输入用户名" 
              clearable
              style="width: 150px;"
            />
          </el-form-item>
          <el-form-item label="角色">
            <el-select v-model="searchForm.role" placeholder="请选择角色" clearable>
              <el-option label="管理员" value="admin" />
              <el-option label="编辑" value="editor" />
              <el-option label="用户" value="user" />
            </el-select>
          </el-form-item>
          <el-form-item label="状态">
            <el-select v-model="searchForm.status" placeholder="请选择状态" clearable>
              <el-option label="正常" value="active" />
              <el-option label="禁用" value="inactive" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleSearch">搜索</el-button>
            <el-button @click="resetSearch">重置</el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 用户表格 -->
      <el-table 
        :data="filteredUsers" 
        v-loading="loading" 
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column prop="id" label="ID" width="80" />
        <el-table-column prop="username" label="用户名" width="120" />
        <el-table-column prop="email" label="邮箱" min-width="180" />
        <el-table-column prop="phone" label="手机" width="130" />
        <el-table-column prop="role" label="角色" width="100">
          <template #default="{ row }">
            <el-tag :type="getRoleType(row.role)">{{ getRoleName(row.role) }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80">
          <template #default="{ row }">
            <el-tag :type="row.status === '"'"'active'"'"' ? '"'"'success'"'"' : '"'"'danger'"'"'">
              {{ row.status === '"'"'active'"'"' ? '"'"'正常'"'"' : '"'"'禁用'"'"' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" width="180" />
        <el-table-column prop="lastLogin" label="最后登录" width="180" />
        <el-table-column label="操作" width="200" fixed="right">
          <template #default="{ row }">
            <el-button size="small" @click="editUser(row)">编辑</el-button>
            <el-button 
              size="small" 
              :type="row.status === '"'"'active'"'"' ? '"'"'warning'"'"' : '"'"'success'"'"'"
              @click="toggleUserStatus(row)"
            >
              {{ row.status === '"'"'active'"'"' ? '"'"'禁用'"'"' : '"'"'启用'"'"' }}
            </el-button>
            <el-button 
              size="small" 
              type="danger" 
              @click="deleteUser(row)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <!-- 批量操作和分页 -->
      <div class="table-footer">
        <div class="batch-actions">
          <el-button 
            type="primary" 
            :disabled="selectedUsers.length === 0"
            @click="batchEnable"
          >
            批量启用
          </el-button>
          <el-button 
            type="warning" 
            :disabled="selectedUsers.length === 0"
            @click="batchDisable"
          >
            批量禁用
          </el-button>
          <el-button 
            type="danger" 
            :disabled="selectedUsers.length === 0"
            @click="batchDelete"
          >
            批量删除
          </el-button>
          <span class="selected-count">已选择 {{ selectedUsers.length }} 个用户</span>
        </div>
        <el-pagination
          v-model:current-page="currentPage"
          v-model:page-size="pageSize"
          :total="total"
          :page-sizes="[10, 20, 50, 100]"
          layout="total, sizes, prev, pager, next, jumper"
        />
      </div>
    </el-card>

    <!-- 新增/编辑用户对话框 -->
    <el-dialog 
      v-model="showUserDialog" 
      :title="isEditing ? '"'"'编辑用户'"'"' : '"'"'新增用户'"'"'" 
      width="500px"
    >
      <el-form 
        :model="userForm" 
        :rules="userRules" 
        ref="userFormRef" 
        label-width="80px"
      >
        <el-form-item label="用户名" prop="username">
          <el-input 
            v-model="userForm.username" 
            placeholder="请输入用户名"
            :disabled="isEditing"
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input 
            v-model="userForm.email" 
            placeholder="请输入邮箱地址"
          />
        </el-form-item>
        <el-form-item label="手机" prop="phone">
          <el-input 
            v-model="userForm.phone" 
            placeholder="请输入手机号码"
          />
        </el-form-item>
        <el-form-item label="角色" prop="role">
          <el-select v-model="userForm.role" placeholder="请选择角色">
            <el-option label="管理员" value="admin" />
            <el-option label="编辑" value="editor" />
            <el-option label="用户" value="user" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="userForm.status">
            <el-radio label="active">正常</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="密码" prop="password" v-if="!isEditing">
          <el-input 
            v-model="userForm.password" 
            type="password" 
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
        <el-form-item label="确认密码" prop="confirmPassword" v-if="!isEditing">
          <el-input 
            v-model="userForm.confirmPassword" 
            type="password" 
            placeholder="请再次输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <template #footer>
        <el-button @click="showUserDialog = false">取消</el-button>
        <el-button type="primary" @click="saveUser" :loading="savingUser">
          {{ isEditing ? '"'"'更新'"'"' : '"'"'创建'"'"' }}
        </el-button>
      </template>
    </el-dialog>

    <!-- 用户统计卡片 -->
    <el-row :gutter="20" style="margin-top: 20px;">
      <el-col :xs="24" :sm="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon user-icon">
              <el-icon><User /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ userStats.total }}</div>
              <div class="stat-label">总用户数</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon active-icon">
              <el-icon><CircleCheck /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ userStats.active }}</div>
              <div class="stat-label">活跃用户</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon admin-icon">
              <el-icon><Setting /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ userStats.admins }}</div>
              <div class="stat-label">管理员</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="6">
        <el-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon new-icon">
              <el-icon><TrendCharts /></el-icon>
            </div>
            <div class="stat-info">
              <div class="stat-value">{{ userStats.todayNew }}</div>
              <div class="stat-label">今日新增</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from '"'"'vue'"'"'
import { ElMessage, ElMessageBox } from '"'"'element-plus'"'"'
import { Plus, Refresh, User, CircleCheck, Setting, TrendCharts } from '"'"'@element-plus/icons-vue'"'"'

const loading = ref(false)
const showUserDialog = ref(false)
const savingUser = ref(false)
const isEditing = ref(false)
const currentPage = ref(1)
const pageSize = ref(10)
const total = ref(0)
const selectedUsers = ref([])

// 表单数据
const searchForm = ref({
  username: '"'"''"'"',
  role: '"'"''"'"',
  status: '"'"''"'"'
})

const userForm = ref({
  username: '"'"''"'"',
  email: '"'"''"'"',
  phone: '"'"''"'"',
  role: '"'"'user'"'"',
  status: '"'"'active'"'"',
  password: '"'"''"'"',
  confirmPassword: '"'"''"'"'
})

// 模拟数据
const usersData = ref([
  {
    id: 1,
    username: '"'"'admin'"'"',
    email: '"'"'admin@huaiyun.com'"'"',
    phone: '"'"'138****1234'"'"',
    role: '"'"'admin'"'"',
    status: '"'"'active'"'"',
    createTime: '"'"'2024-01-01 10:00:00'"'"',
    lastLogin: '"'"'2024-01-20 15:30:00'"'"'
  },
  {
    id: 2,
    username: '"'"'editor1'"'"',
    email: '"'"'editor@huaiyun.com'"'"',
    phone: '"'"'139****5678'"'"',
    role: '"'"'editor'"'"',
    status: '"'"'active'"'"',
    createTime: '"'"'2024-01-05 14:20:00'"'"',
    lastLogin: '"'"'2024-01-19 09:15:00'"'"'
  },
  {
    id: 3,
    username: '"'"'user001'"'"',
    email: '"'"'user001@example.com'"'"',
    phone: '"'"'136****9012'"'"',
    role: '"'"'user'"'"',
    status: '"'"'inactive'"'"',
    createTime: '"'"'2024-01-10 16:45:00'"'"',
    lastLogin: '"'"'2024-01-15 11:20:00'"'"'
  }
])

// 用户统计
const userStats = ref({
  total: 156,
  active: 142,
  admins: 3,
  todayNew: 5
})

// 计算属性
const filteredUsers = computed(() => {
  let filtered = usersData.value
  
  if (searchForm.value.username) {
    filtered = filtered.filter(user => 
      user.username.includes(searchForm.value.username)
    )
  }
  
  if (searchForm.value.role) {
    filtered = filtered.filter(user => user.role === searchForm.value.role)
  }
  
  if (searchForm.value.status) {
    filtered = filtered.filter(user => user.status === searchForm.value.status)
  }
  
  const start = (currentPage.value - 1) * pageSize.value
  const end = start + pageSize.value
  return filtered.slice(start, end)
})

// 方法
const getRoleType = (role) => {
  const roleMap = {
    admin: '"'"'danger'"'"',
    editor: '"'"'warning'"'"',
    user: '"'"''"'"'
  }
  return roleMap[role] || '"'"''"'"'
}

const getRoleName = (role) => {
  const nameMap = {
    admin: '"'"'管理员'"'"',
    editor: '"'"'编辑'"'"',
    user: '"'"'用户'"'"'
  }
  return nameMap[role] || role
}

const refreshData = () => {
  loading.value = true
  setTimeout(() => {
    total.value = usersData.value.length
    loading.value = false
    ElMessage.success('"'"'数据已刷新'"'"')
  }, 1000)
}

const handleSearch = () => {
  currentPage.value = 1
  refreshData()
}

const resetSearch = () => {
  searchForm.value = {
    username: '"'"''"'"',
    role: '"'"''"'"',
    status: '"'"''"'"'
  }
  currentPage.value = 1
  refreshData()
}

const handleSelectionChange = (selection) => {
  selectedUsers.value = selection
}

const editUser = (user) => {
  isEditing.value = true
  userForm.value = { ...user }
  showUserDialog.value = true
}

const toggleUserStatus = async (user) => {
  const newStatus = user.status === '"'"'active'"'"' ? '"'"'inactive'"'"' : '"'"'active'"'"'
  const action = newStatus === '"'"'active'"'"' ? '"'"'启用'"'"' : '"'"'禁用'"'"'
  
  try {
    await ElMessageBox.confirm(
      `确定要${action}用户"${user.username}"吗？`,
      `${action}用户`,
      { type: '"'"'warning'"'"' }
    )
    
    user.status = newStatus
    ElMessage.success(`用户已${action}`)
  } catch {
    // 用户取消
  }
}

const deleteUser = async (user) => {
  try {
    await ElMessageBox.confirm(
      `确定要删除用户"${user.username}"吗？此操作不可恢复！`,
      '"'"'删除用户'"'"',
      {
        confirmButtonText: '"'"'确定删除'"'"',
        cancelButtonText: '"'"'取消'"'"',
        type: '"'"'warning'"'"'
      }
    )
    
    const index = usersData.value.findIndex(u => u.id === user.id)
    if (index > -1) {
      usersData.value.splice(index, 1)
      ElMessage.success('"'"'用户已删除'"'"')
      refreshData()
    }
  } catch {
    // 用户取消
  }
}

const saveUser = async () => {
  savingUser.value = true
  try {    
    // 模拟API调用
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    if (isEditing.value) {
      // 更新用户
      const index = usersData.value.findIndex(u => u.id === userForm.value.id)
      if (index > -1) {
        usersData.value[index] = { ...userForm.value }
      }
      ElMessage.success('"'"'用户信息已更新'"'"')
    } else {
      // 新增用户
      const newUser = {
        ...userForm.value,
        id: Date.now(),
        createTime: new Date().toLocaleString('"'"'zh-CN'"'"'),
        lastLogin: '"'"''"'"'
      }
      usersData.value.unshift(newUser)
      ElMessage.success('"'"'用户创建成功'"'"')
    }
    
    showUserDialog.value = false
    resetForm()
    refreshData()
  } catch (error) {
    ElMessage.error(isEditing.value ? '"'"'更新失败'"'"' : '"'"'创建失败'"'"')
  } finally {
    savingUser.value = false
  }
}

const resetForm = () => {
  userForm.value = {
    username: '"'"''"'"',
    email: '"'"''"'"',
    phone: '"'"''"'"',
    role: '"'"'user'"'"',
    status: '"'"'active'"'"',
    password: '"'"''"'"',
    confirmPassword: '"'"''"'"'
  }
  isEditing.value = false
}

const batchEnable = async () => {
  if (selectedUsers.value.length === 0) return
  
  try {
    await ElMessageBox.confirm(
      `确定要启用 ${selectedUsers.value.length} 个用户吗？`,
      '"'"'批量启用'"'"'
    )
    
    selectedUsers.value.forEach(user => {
      user.status = '"'"'active'"'"'
    })
    selectedUsers.value = []
    ElMessage.success(`已启用 ${selectedUsers.value.length} 个用户`)
  } catch {
    // 用户取消
  }
}

const batchDisable = async () => {
  if (selectedUsers.value.length === 0) return
  
  try {
    await ElMessageBox.confirm(
      `确定要禁用 ${selectedUsers.value.length} 个用户吗？`,
      '"'"'批量禁用'"'"',
      { type: '"'"'warning'"'"' }
    )
    
    selectedUsers.value.forEach(user => {
      user.status = '"'"'inactive'"'"'
    })
    selectedUsers.value = []
    ElMessage.success(`已禁用 ${selectedUsers.value.length} 个用户`)
  } catch {
    // 用户取消
  }
}

const batchDelete = async () => {
  if (selectedUsers.value.length === 0) return
  
  try {
    await ElMessageBox.confirm(
      `确定要删除 ${selectedUsers.value.length} 个用户吗？此操作不可恢复！`,
      '"'"'批量删除'"'"',
      {
        confirmButtonText: '"'"'确定删除'"'"',
        cancelButtonText: '"'"'取消'"'"',
        type: '"'"'warning'"'"'
      }
    )
    
    const idsToDelete = selectedUsers.value.map(user => user.id)
    usersData.value = usersData.value.filter(user => !idsToDelete.includes(user.id))
    selectedUsers.value = []
    ElMessage.success(`已删除 ${selectedUsers.value.length} 个用户`)
    refreshData()
  } catch {
    // 用户取消
  }
}

// 表单验证规则
const userRules = {
  username: [
    { required: true, message: '"'"'请输入用户名'"'"', trigger: '"'"'blur'"'"' },
    { min: 3, max: 20, message: '"'"'用户名长度为3-20个字符'"'"', trigger: '"'"'blur'"'"' }
  ],
  email: [
    { required: true, message: '"'"'请输入邮箱地址'"'"', trigger: '"'"'blur'"'"' },
    { type: '"'"'email'"'"', message: '"'"'请输入正确的邮箱地址'"'"', trigger: '"'"'blur'"'"' }
  ],
  role: [
    { required: true, message: '"'"'请选择用户角色'"'"', trigger: '"'"'change'"'"' }
  ],
  password: [
    { required: true, message: '"'"'请输入密码'"'"', trigger: '"'"'blur'"'"' },
    { min: 6, message: '"'"'密码长度不能少于6位'"'"', trigger: '"'"'blur'"'"' }
  ],
  confirmPassword: [
    { required: true, message: '"'"'请确认密码'"'"', trigger: '"'"'blur'"'"' },
    {
      validator: (rule, value, callback) => {
        if (value !== userForm.value.password) {
          callback(new Error('"'"'两次输入密码不一致'"'"'))
        } else {
          callback()
        }
      },
      trigger: '"'"'blur'"'"'
    }
  ]
}

onMounted(() => {
  refreshData()
})
</script>

<style scoped>
.user-management-page {
  max-width: 1400px;
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

.header-actions {
  display: flex;
  gap: 12px;
}

.search-filters {
  margin-bottom: 20px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 4px;
}

.table-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.batch-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.selected-count {
  color: #909399;
  font-size: 14px;
  margin-left: 16px;
}

/* 统计卡片样式 */
.stat-card {
  margin-bottom: 0;
}

.stat-content {
  display: flex;
  align-items: center;
  gap: 16px;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: white;
}

.user-icon {
  background: #409eff;
}

.active-icon {
  background: #67c23a;
}

.admin-icon {
  background: #e6a23c;
}

.new-icon {
  background: #f56c6c;
}

.stat-info {
  flex: 1;
}

.stat-value {
  font-size: 28px;
  font-weight: bold;
  color: #303133;
  line-height: 1;
}

.stat-label {
  color: #909399;
  font-size: 14px;
  margin-top: 4px;
}

:deep(.el-form--inline .el-form-item) {
  margin-right: 16px;
  margin-bottom: 0;
}
</style>