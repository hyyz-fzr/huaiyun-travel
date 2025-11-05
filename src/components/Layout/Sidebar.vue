<template>
  <aside class="sidebar">
    <div class="sidebar-content">
      <el-menu
        :default-active="activeMenu"
        class="sidebar-menu"
        router
        background-color="#304156"
        text-color="#bfcbd9"
        active-text-color="#409eff"
      >
        <sidebar-item
          v-for="menu in menuList"
          :key="menu.path"
          :item="menu"
        />
      </el-menu>
    </div>
  </aside>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import SidebarItem from './SidebarItem.vue'
import menuConfig from '@/config/menu'

const route = useRoute()

const activeMenu = computed(() => route.path)

const menuList = computed(() => menuConfig)
</script>

<style scoped lang="scss">
.sidebar {
  position: fixed;
  top: 60px;
  left: 0;
  bottom: 0;
  width: 200px;
  background-color: #304156;
  z-index: 999;
  overflow-y: auto;
}

.sidebar-content {
  height: 100%;
}

.sidebar-menu {
  border: none;
  height: 100%;

  :deep(.el-menu-item) {
    height: 50px;
    line-height: 50px;

    &.is-active {
      background-color: #263445 !important;
    }

    &:hover {
      background-color: #263445 !important;
    }
  }

  :deep(.el-sub-menu__title) {
    height: 50px;
    line-height: 50px;

    &:hover {
      background-color: #263445 !important;
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .sidebar {
    width: 64px;

    .menu-text {
      display: none;
    }
  }
}
</style>