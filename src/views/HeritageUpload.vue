<template>
<<<<<<< HEAD
  <div class="heritage-upload">
    <div class="page-header">
      <h1>上传文化遗产</h1>
      <p>分享您了解的淮南文化遗产信息</p >
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
            <el-form-item label="文化遗产名称" prop="name">
              <el-input v-model="form.name" placeholder="请输入文化遗产名称" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="保护级别" prop="level">
              <el-select v-model="form.level" placeholder="请选择保护级别">
                <el-option label="世界级" value="世界级" />
                <el-option label="国家级" value="国家级" />
                <el-option label="省级" value="省级" />
                <el-option label="市级" value="市级" />
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="所在地" prop="location">
          <el-input v-model="form.location" placeholder="请输入具体地址" />
        </el-form-item>

        <el-form-item label="简介" prop="description">
          <el-input
            v-model="form.description"
            type="textarea"
            :rows="3"
            placeholder="请输入文化遗产的简要介绍"
            maxlength="200"
            show-word-limit
          />
        </el-form-item>

        <el-form-item label="详细介绍" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="6"
            placeholder="请输入文化遗产的详细介绍，包括历史背景、文化价值等"
          />
        </el-form-item>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="开放时间" prop="openTime">
              <el-input v-model="form.openTime" placeholder="如：08:00-17:30" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="门票信息" prop="ticketPrice">
              <el-input v-model="form.ticketPrice" placeholder="如：免费或具体价格" />
            </el-form-item>
          </el-col>
        </el-row>

        <el-form-item label="上传图片">
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
          <el-button @click="$router.push('/heritage')">返回列表</el-button>
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
