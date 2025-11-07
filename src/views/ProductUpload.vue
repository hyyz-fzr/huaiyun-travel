<template>
<<<<<<< HEAD
  <div class="product-upload">
    <div class="page-header">
      <h1>上传商品</h1>
      <p>分享具有淮南文化特色的文创产品</p >
    </div>

    <el-card class="upload-form">
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="formRef"
        label-width="120px"
        label-position="top"
      >
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入商品名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="商品分类" prop="category">
              <el-select v-model="form.category" placeholder="请选择分类">
                <el-option label="服饰" value="服饰" />
                <el-option label="文具" value="文具" />
                <el-option label="工艺品" value="工艺品" />
                <el-option label="食品" value="食品" />
                <el-option label="其他" value="其他" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商品描述" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入商品描述"
            maxlength="500"
            show-word-limit
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="8">
            <el-form-item label="价格" prop="price">
              <el-input v-model="form.price" type="number" placeholder="请输入价格">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="原价">
              <el-input v-model="form.originalPrice" type="number" placeholder="请输入原价">
                <template #append>元</template>
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="库存" prop="stock">
              <el-input v-model="form.stock" type="number" placeholder="请输入库存数量" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="商品标签">
          <el-input
            v-model="form.tags"
            placeholder="请输入标签，用逗号分隔"
          />
        </el-form-item>

        <el-form-item label="上传商品图片">
          <el-upload
            action="/api/upload"
            list-type="picture-card"
            :file-list="fileList"
            :on-success="handleUploadSuccess"
            :on-remove="handleRemove"
            :before-upload="beforeUpload"
            multiple
          >
            <el-icon><Plus /></el-icon>
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">
            {{ loading ? '提交中...' : '提交' }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="$router.push('/products')">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-card>
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
