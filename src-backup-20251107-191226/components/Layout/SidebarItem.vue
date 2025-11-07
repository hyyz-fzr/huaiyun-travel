<template>
  <div>
    <el-menu-item
      v-if="!item.children || item.children.length === 0"
      :index="item.path"
    >
      <el-icon v-if="item.icon">
        <component :is="item.icon" />
      </el-icon>
      <span class="menu-text">{{ item.title }}</span>
    </el-menu-item>

    <el-sub-menu v-else :index="item.path">
      <template #title>
        <el-icon v-if="item.icon">
          <component :is="item.icon" />
        </el-icon>
        <span class="menu-text">{{ item.title }}</span>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :item="child"
      />
    </el-sub-menu>
  </div>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true
  }
})
</script>

<style scoped lang="scss">
.menu-text {
  margin-left: 8px;
}

// 响应式设计
@media (max-width: 768px) {
  .menu-text {
    display: none;
  }
}
</style>