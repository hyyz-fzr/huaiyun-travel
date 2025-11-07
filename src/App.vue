<template>
  <div id="app">
    <el-container>
      <el-header style="background: #409EFF; color: white; text-align: center; line-height: 60px;">
        <h1>淮韵游踪 - 淮南文化数字传承平台</h1>
      </el-header>
      
      <el-container>
        <el-aside width="200px" style="background: #545c64; color: white; min-height: calc(100vh - 60px);">
          <el-menu
            default-active="1"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b"
            router
          >
            <el-menu-item index="/">
              <i class="el-icon-house"></i>
              <span>首页</span>
            </el-menu-item>
            <el-menu-item index="/about">
              <i class="el-icon-info"></i>
              <span>关于我们</span>
            </el-menu-item>
            <el-menu-item index="/content">
              <i class="el-icon-document"></i>
              <span>内容管理</span>
            </el-menu-item>
          </el-menu>
        </el-aside>
        
        <el-main style="padding: 20px;">
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// 初始化用户状态
const userStore = useUserStore()

onMounted(() => {
  // 设置页面标题
  document.title = '淮韵游踪 - 淮南文化数字传承平台'
  
  // 初始化用户信息
  userStore.initUser()
  
  console.log('淮韵游踪应用已初始化')
})
=======
// 根组件逻辑
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#app {
  font-family: 'Helvetica Neue', Helvetica, 'PingFang SC', 'Hiragino Sans GB', 'Microsoft YaHei', Arial, sans-serif;
}

.el-header {
  padding: 0 !important;
}

.el-aside {
  border-right: 1px solid #e6e6e6;
}
</style>
