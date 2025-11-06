import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import './styles/index.css'  // 暂时注释

// 创建应用实例
const app = createApp(App)

// 注册Element Plus图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// 使用插件
app.use(createPinia())
app.use(ElementPlus, {
  locale: zhCn,
})
app.use(router)

// 挂载应用
app.mount('#app')

console.log('淮韵游踪应用启动完成')