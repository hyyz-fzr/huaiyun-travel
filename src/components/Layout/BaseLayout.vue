<template>
  <div class="base-layout">
    <Header />
    <main class="main-content">
      <router-view />
    </main>
    <footer class="app-footer">
      <div class="footer-content">
        <p>淮韵游踪 - 淮南文化数字传承平台 &copy; 2024</p >
        <p>传承楚韵，数字游踪</p >
      </div>
    </footer>
  </div>
</template>

<script setup>
import Header from './Header.vue'
</script>

<style scoped>
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
.main-content {
  flex: 1;
  padding: 0;
}
.app-footer {
  background: #f5f7fa;
  padding: 20px 0;
  text-align: center;
  color: #909399;
}
.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
