<template>
  <div class="login-container">
    <div class="login-form">
      <div class="form-header">
        <h2>登录淮韵游踪</h2>
        <p>探索淮南文化，传承千年智慧</p >
      </div>

      <el-form>
        <el-form-item>
          <el-input placeholder="请输入用户名或邮箱" />
        </el-form-item>
        <el-form-item>
          <el-input type="password" placeholder="请输入密码" show-password />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>

      <div class="form-footer">
        <span>还没有账号？</span>
        <el-button type="primary" link @click="$router.push('/register')">立即注册</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-form {
  background: white;
  padding: 40px;
  border-radius: 8px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  width: 400px;
}
.form-header {
  text-align: center;
  margin-bottom: 30px;
}
.form-footer {
  text-align: center;
  margin-top: 20px;
  color: #909399;
}
</style>