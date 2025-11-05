<template>
  <div class="hello-world">
    <h1>{{ msg }}</h1>
    <p>欢迎使用淮韵游踪 - 淮南文化数字传承平台</p >
    <div class="features">
      <el-card 
        v-for="feature in features" 
        :key="feature.title"
        class="feature-card"
      >
        <template #header>
          <div class="card-header">
            <el-icon :size="24" :color="feature.color">
              <component :is="feature.icon" />
            </el-icon>
            <span>{{ feature.title }}</span>
          </div>
        </template>
        <p>{{ feature.description }}</p >
      </el-card>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  Histogram,
  ShoppingBag,
  ChatDotRound,
  User
} from '@element-plus/icons-vue'

defineProps({
  msg: {
    type: String,
    default: '欢迎来到淮韵游踪'
  }
})

const features = ref([
  {
    title: '文化遗产',
    description: '探索淮南丰富的文化遗产，包括豆腐文化、八公山传说等',
    icon: Histogram,
    color: '#409eff'
  },
  {
    title: '文创电商',
    description: '购买独具特色的淮南文创产品，把文化带回家',
    icon: ShoppingBag,
    color: '#67c23a'
  },
  {
    title: '文化社区',
    description: '与志同道合的朋友交流分享，共同传承淮南文化',
    icon: ChatDotRound,
    color: '#e6a23c'
  },
  {
    title: '个人中心',
    description: '管理您的收藏、订单和个性化内容',
    icon: User,
    color: '#f56c6c'
  }
])
</script>

<style scoped lang="scss">
.hello-world {
  text-align: center;
  padding: 20px;

  h1 {
    color: #304156;
    margin-bottom: 10px;
    font-size: 2.5em;
  }

  p {
    color: #606266;
    font-size: 1.2em;
    margin-bottom: 30px;
  }
}

.features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

.feature-card {
  transition: transform 0.3s, box-shadow 0.3s;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: bold;
  color: #304156;
}
</style>