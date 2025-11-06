import { createRouter, createWebHistory } from 'vue-router'

// 路由组件
const Home = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>欢迎使用淮韵游踪平台</h2>
        </template>
        <p>基于Vue 3 + Element Plus构建的淮南文化数字传承平台</p >
        <el-button type="primary" @click="goToAbout">关于我们</el-button>
      </el-card>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>文化遗产</h3>
            </template>
            <p>探索淮南丰富的历史文化遗产</p >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>传统技艺</h3>
            </template>
            <p>了解传统工艺和制作技艺</p >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>文创产品</h3>
            </template>
            <p>发现独具特色的文创产品</p >
          </el-card>
        </el-col>
      </el-row>
    </div>
  `,
  methods: {
    goToAbout() {
      this.$router.push('/about')
    }
  }
}

const About = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>关于淮韵游踪</h2>
        </template>
        <p>淮韵游踪是一个致力于传承和推广淮南文化的数字平台。</p >
        <p>我们通过现代化的技术手段，让传统文化焕发新的生命力。</p >
        
        <el-divider></el-divider>
        
        <h3>平台特色</h3>
        <ul>
          <li>数字化展示文化遗产</li>
          <li>传统技艺教学传承</li>
          <li>文创产品开发推广</li>
          <li>文化社区交流互动</li>
        </ul>
      </el-card>
    </div>
  `
}

const Content = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>内容管理</h2>
        </template>
        <p>这里是内容管理页面，可以管理平台的各种内容。</p >
        <el-button type="primary">创建内容</el-button>
        <el-button>内容列表</el-button>
      </el-card>
    </div>
  `
}

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/content', component: Content }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router