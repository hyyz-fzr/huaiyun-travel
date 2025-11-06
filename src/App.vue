<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUserStore } from '@/stores/user'

// 初始化用户状态
const userStore = useUserStore()

onMounted(() => {
  // 设置页面标题
  document.title = process.env.VUE_APP_TITLE || '淮韵游踪 - 淮南文化数字传承平台'
  
  // 初始化用户信息
  userStore.initUser()
  
  console.log('淮韵游踪应用已初始化')
})
</script>

<style>
/* 全局样式 */
#app {
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100vh;
  background-color: #f5f7fa;
}

/* 全局滚动条样式 */
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb {
  background: #c1c1c1;
  border-radius: 3px;
}

::-webkit-scrollbar-thumb:hover {
  background: #a8a8a8;
}
</style>