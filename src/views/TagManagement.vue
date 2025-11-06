<template>
  <div class="tag-management">
    <div class="page-header">
      <h1>标签管理</h1>
      <p>管理内容标签和分类</p >
    </div>

    <div class="management-toolbar">
      <el-button type="primary" @click="handleCreateTag">
        <i class="el-icon-plus"></i>
        新建标签
      </el-button>
      
      <el-input
        v-model="searchKeyword"
        placeholder="搜索标签..."
        style="width: 300px"
        clearable
      >
        <template #append>
          <el-button @click="handleSearch">
            <i class="el-icon-search"></i>
          </el-button>
        </template>
      </el-input>

      <el-select v-model="filterStatus" placeholder="全部状态" clearable>
        <el-option label="启用" value="active"></el-option>
        <el-option label="禁用" value="inactive"></el-option>
      </el-select>
    </div>

    <el-table :data="filteredTags" style="width: 100%">
      <el-table-column prop="id" label="ID" width="80"></el-table-column>
      <el-table-column prop="name" label="标签名称" width="150">
        <template #default="scope">
          <el-tag :type="getTagType(scope.row.type)" effect="light">
            {{ scope.row.name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="type" label="标签类型" width="120"></el-table-column>
      <el-table-column prop="description" label="描述"></el-table-column>
      <el-table-column prop="usageCount" label="使用次数" width="100" sortable>
        <template #default="scope">
          <span class="usage-count">{{ scope.row.usageCount }}</span>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态" width="100">
        <template #default="scope">
          <el-switch
            v-model="scope.row.status"
            :active-value="'active'"
            :inactive-value="'inactive'"
            @change="handleStatusChange(scope.row)"
          />
        </template>
      </el-table-column>
      <el-table-column prop="createdAt" label="创建时间" width="180"></el-table-column>
      <el-table-column label="操作" width="200" fixed="right">
        <template #default="scope">
          <el-button size="small" @click="handleEdit(scope.row)">编辑</el-button>
          <el-button size="small" type="danger" @click="handleDelete(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="pagination-container">
      <el-pagination
        :current-page="pagination.current"
        :page-size="pagination.size"
        :total="pagination.total"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!-- 新建/编辑标签对话框 -->
    <el-dialog 
      :title="dialogTitle" 
      v-model="dialogVisible"
      width="500px"
    >
      <el-form :model="tagForm" :rules="formRules" ref="tagFormRef" label-width="80px">
        <el-form-item label="标签名称" prop="name">
          <el-input v-model="tagForm.name" placeholder="请输入标签名称" />
        </el-form-item>
        
        <el-form-item label="标签类型" prop="type">
          <el-select v-model="tagForm.type" placeholder="请选择标签类型">
            <el-option label="内容标签" value="content"></el-option>
            <el-option label="分类标签" value="category"></el-option>
            <el-option label="专题标签" value="topic"></el-option>
            <el-option label="地域标签" value="region"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="标签描述" prop="description">
          <el-input 
            v-model="tagForm.description" 
            type="textarea" 
            :rows="3"
            placeholder="请输入标签描述"
          />
        </el-form-item>
        
        <el-form-item label="标签颜色" prop="color">
          <el-color-picker v-model="tagForm.color" />
        </el-form-item>
        
        <el-form-item label="状态" prop="status">
          <el-radio-group v-model="tagForm.status">
            <el-radio label="active">启用</el-radio>
            <el-radio label="inactive">禁用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      
      <template #footer>
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleDialogConfirm">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'

const searchKeyword = ref('')
const filterStatus = ref('')
const dialogVisible = ref(false)
const dialogTitle = ref('新建标签')
const tagFormRef = ref()

const tags = ref([
  {
    id: 1,
    name: '八公山',
    type: '地域标签',
    description: '与八公山相关的文化内容',
    usageCount: 156,
    status: 'active',
    color: '#409EFF',
    createdAt: '2024-01-01 10:00:00'
  },
  {
    id: 2,
    name: '豆腐文化',
    type: '内容标签',
    description: '淮南豆腐制作工艺和文化',
    usageCount: 89,
    status: 'active',
    color: '#67C23A',
    createdAt: '2024-01-02 14:30:00'
  },
  {
    id: 3,
    name: '传统剪纸',
    type: '内容标签',
    description: '传统剪纸艺术相关内容',
    usageCount: 67,
    status: 'inactive',
    color: '#E6A23C',
    createdAt: '2024-01-03 09:15:00'
  }
])

const pagination = reactive({
  current: 1,
  size: 10,
  total: 3
})

const tagForm = reactive({
  id: null,
  name: '',
  type: '',
  description: '',
  color: '#409EFF',
  status: 'active'
})

const formRules = {
  name: [
    { required: true, message: '请输入标签名称', trigger: 'blur' },
    { min: 2, max: 20, message: '标签名称长度在 2 到 20 个字符', trigger: 'blur' }
  ],
  type: [
    { required: true, message: '请选择标签类型', trigger: 'change' }
  ]
}

const filteredTags = computed(() => {
  return tags.value.filter(tag => {
    const matchesSearch = !searchKeyword.value || 
      tag.name.includes(searchKeyword.value) || 
      tag.description.includes(searchKeyword.value)
    const matchesStatus = !filterStatus.value || tag.status === filterStatus.value
    
    return matchesSearch && matchesStatus
  })
})

const getTagType = (type) => {
  const typeMap = {
    '内容标签': 'primary',
    '分类标签': 'success',
    '专题标签': 'warning',
    '地域标签': 'info'
  }
  return typeMap[type] || 'info'
}

const handleCreateTag = () => {
  dialogTitle.value = '新建标签'
  Object.assign(tagForm, {
    id: null,
    name: '',
    type: '',
    description: '',
    color: '#409EFF',
    status: 'active'
  })
  dialogVisible.value = true
}

const handleEdit = (tag) => {
  dialogTitle.value = '编辑标签'
  Object.assign(tagForm, { ...tag })
  dialogVisible.value = true
}

const handleDelete = async (tag) => {
  try {
    await ElMessageBox.confirm(`确定删除标签"${tag.name}"吗？`, '提示', {
      type: 'warning'
    })
    
    const index = tags.value.findIndex(t => t.id === tag.id)
    if (index > -1) {
      tags.value.splice(index, 1)
      ElMessage.success('标签删除成功')
    }
  } catch {
    // 用户取消删除
  }
}

const handleStatusChange = (tag) => {
  const action = tag.status === 'active' ? '启用' : '禁用'
  ElMessage.success(`标签"${tag.name}"已${action}`)
}

const handleSearch = () => {
  ElMessage.info(`搜索标签: ${searchKeyword.value}`)
}

const handleSizeChange = (size) => {
  pagination.size = size
}

const handleCurrentChange = (page) => {
  pagination.current = page
}

const handleDialogConfirm = async () => {
  try {
    await tagFormRef.value.validate()
    
    if (tagForm.id) {
      // 编辑现有标签
      const index = tags.value.findIndex(t => t.id === tagForm.id)
      if (index > -1) {
        tags.value[index] = { ...tagForm }
        ElMessage.success('标签更新成功')
      }
    } else {
      // 新建标签
      const newTag = {
        ...tagForm,
        id: Date.now(),
        usageCount: 0,
        createdAt: new Date().toLocaleString('zh-CN')
      }
      tags.value.push(newTag)
      ElMessage.success('标签创建成功')
    }
    
    dialogVisible.value = false
  } catch (error) {
    ElMessage.error('请完善表单信息')
  }
}

onMounted(() => {
  console.log('标签管理页面加载完成')
})
</script>

<style scoped>
.tag-management {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 30px;
}

.management-toolbar {
  display: flex;
  gap: 15px;
  margin-bottom: 20px;
  align-items: center;
}

.usage-count {
  font-weight: bold;
  color: #409EFF;
}

.pagination-container {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}
</style>