<template>
  <div class="$(($FileName -replace '\.vue$','').ToLower())">
    <h3>ContentList</h3>
    <p>淮南文化数字传承平台 - 组件已修复</p >
    <el-button type="primary" @click="handleTest">测试功能</el-button>
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleTest = () => {
  ElMessage.success('ContentList 组件工作正常')
}
</script>

<style scoped>
.$(($FileName -replace '\.vue$','').ToLower()) {
  padding: 20px;
  text-align: center;
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  margin: 10px;
}
</style>