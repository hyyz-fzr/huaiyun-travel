<template>
<<<<<<< HEAD
  <div class="post-upload">
    <div class="page-header">
      <h1>发布帖子</h1>
      <p>分享您的文化见闻和心得体会</p >
    </div>

    <el-card class="upload-form">
      <el-form 
        :model="form" 
        :rules="rules" 
        ref="formRef"
        label-width="120px"
        label-position="top"
      >
        <el-form-item label="帖子标题" prop="title">
          <el-input v-model="form.title" placeholder="请输入帖子标题" />
        </el-form-item>

        <el-form-item label="分类" prop="category">
          <el-select v-model="form.category" placeholder="请选择分类">
            <el-option label="文化见闻" value="sight" />
            <el-option label="旅行游记" value="travel" />
            <el-option label="学习分享" value="study" />
            <el-option label="活动记录" value="event" />
          </el-select>
        </el-form-item>

        <el-form-item label="帖子内容" prop="content">
          <el-input
            v-model="form.content"
            type="textarea"
            :rows="8"
            placeholder="请输入帖子内容..."
            maxlength="5000"
            show-word-limit
          />
        </el-form-item>

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

        <el-form-item label="付费设置">
          <el-switch
            v-model="form.isPaid"
            active-text="付费内容"
            inactive-text="免费内容"
          />
          <el-input
            v-if="form.isPaid"
            v-model="form.price"
            type="number"
            placeholder="请输入价格"
            style="width: 200px; margin-left: 16px;"
          >
            <template #append>元</template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm" :loading="loading">
            {{ loading ? '发布中...' : '发布帖子' }}
          </el-button>
          <el-button @click="resetForm">重置</el-button>
          <el-button @click="$router.push('/posts')">返回列表</el-button>
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
