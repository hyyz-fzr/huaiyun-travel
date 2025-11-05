<template>
  <div class="base-layout">
    <Header />
    <div class="layout-container">
      <Sidebar v-if="showSidebar" />
      <main class="main-content" :class="{ 'with-sidebar': showSidebar }">
        <router-view />
      </main>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Header from './Header.vue'
import Sidebar from './Sidebar.vue'

const route = useRoute()

// 判断是否显示侧边栏
const showSidebar = computed(() => {
  const hideSidebarRoutes = ['/login', '/register', '/404']
  return !hideSidebarRoutes.includes(route.path)
})
</script>

<style scoped lang="scss">
.base-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.layout-container {
  display: flex;
  flex: 1;
  margin-top: 60px; /* Header高度 */
}

.main-content {
  flex: 1;
  padding: 20px;
  background-color: #f5f7fa;
  min-height: calc(100vh - 60px);
  overflow-y: auto;

  &.with-sidebar {
    margin-left: 200px;
    width: calc(100% - 200px);
  }
}

// 响应式设计
@media (max-width: 768px) {
  .layout-container {
    flex-direction: column;
  }

  .main-content.with-sidebar {
    margin-left: 0;
    width: 100%;
  }
}
</style>