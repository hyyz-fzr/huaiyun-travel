<template>
  <div class="not-found">
    <div class="error-content">
      <div class="error-image">
        <img src="/images/404-error.svg" alt="404 Error" />
      </div>
      <div class="error-info">
        <h1>404</h1>
        <h2>页面未找到</h2>
        <p>抱歉，您访问的页面不存在或已被移除</p >
        <div class="error-actions">
          <el-button type="primary" size="large" @click="$router.back()">
            <el-icon><ArrowLeft /></el-icon>
            返回上页
          </el-button>
          <el-button size="large" @click="$router.push('/')">
            <el-icon><HomeFilled /></el-icon>
            返回首页
          </el-button>
        </div>
        <div class="error-suggestions">
          <h3>您可以尝试：</h3>
          <ul>
            <li>检查网址是否正确</li>
            <li>返回首页浏览其他内容</li>
            <li>使用搜索功能查找您需要的信息</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ArrowLeft, HomeFilled } from '@element-plus/icons-vue'
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 20px;
}

.error-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  max-width: 1000px;
  width: 100%;
  background: white;
  border-radius: 20px;
  padding: 60px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  align-items: center;
}

.error-image {
  text-align: center;
}

.error-image img {
  max-width: 100%;
  height: auto;
}

.error-info h1 {
  margin: 0;
  font-size: 6em;
  font-weight: 700;
  color: #409eff;
  line-height: 1;
}

.error-info h2 {
  margin: 0 0 16px 0;
  font-size: 2em;
  color: #303133;
}

.error-info p {
  margin: 0 0 32px 0;
  font-size: 1.1em;
  color: #606266;
  line-height: 1.6;
}

.error-actions {
  display: flex;
  gap: 16px;
  margin-bottom: 40px;
}

.error-suggestions h3 {
  margin: 0 0 16px 0;
  color: #303133;
  font-size: 1.2em;
}

.error-suggestions ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.8;
}

.error-suggestions li {
  margin-bottom: 8px;
}

@media (max-width: 768px) {
  .error-content {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 20px;
    text-align: center;
  }
  
  .error-info h1 {
    font-size: 4em;
  }
  
  .error-info h2 {
    font-size: 1.5em;
  }
  
  .error-actions {
    flex-direction: column;
    align-items: center;
  }
  
  .error-actions .el-button {
    width: 200px;
  }
}
</style>
