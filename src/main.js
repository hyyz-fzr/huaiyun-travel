import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

// 样式导入
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import '@/styles/index.scss'

// 应用组件和配置
import App from './App.vue'
import router from './router'

// ==================== 安全的环境变量检查 ====================
let isDevelopment = false;

try {
  if (typeof process !== 'undefined' && process.env && process.env.NODE_ENV === 'development') {
    isDevelopment = true;
  }
  else if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.MODE === 'development') {
    isDevelopment = true;
  }
  else {
    isDevelopment = true;
  }
} catch (error) {
  console.warn('环境检测失败，使用开发模式:', error);
  isDevelopment = true;
}

console.log('🎯 淮韵游踪 - 环境状态:', isDevelopment ? '开发环境' : '生产环境');

// 创建应用实例
const app = createApp(App)
const pinia = createPinia()

// ==================== 注册Element Plus ====================
app.use(ElementPlus, {
  locale: zhCn,
  size: 'default'
})

// ==================== 注册所有图标 ====================
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

// ==================== 全局属性配置 ====================
app.config.globalProperties.$ELEMENT = {
  size: 'default'
}

// ==================== 全局错误处理 ====================
app.config.errorHandler = (err, instance, info) => {
  console.error('🎯 淮韵游踪 - Vue错误捕获:')
  console.error('错误对象:', err)
  console.error('错误信息:', info)
  return false
}

// ==================== 使用插件 ====================
console.log('🎯 淮韵游踪 - 开始注册插件...')
app.use(pinia)
console.log('✅ Pinia状态管理已注册')

app.use(router)
console.log('✅ Vue Router已注册')

// ==================== 简化全局指令 ====================
app.directive('permission', {
  mounted(el, binding) {
    console.log('🎯 权限指令执行:', binding.value)
  }
})

app.directive('loading', {
  mounted(el, binding) {
    if (binding.value) {
      el.classList.add('el-loading-parent--relative')
    }
  }
})

// ==================== 挂载应用 ====================
console.log('🎯 淮韵游踪 - 开始挂载应用...')
try {
  app.mount('#app')
  console.log('✅ 淮韵游踪应用已成功挂载')
  console.log('🏛️ 淮南文化数字传承平台已启动')
} catch (error) {
  console.error('❌ 应用挂载失败:', error)
  const appElement = document.getElementById('app')
  if (appElement) {
    appElement.innerHTML = `
      <div style="padding: 40px; text-align: center; font-family: Arial;">
        <h1 style="color: #8B4513;">🎯 淮韵游踪 - 淮南文化数字传承平台</h1>
        <p>系统正在初始化，请稍候...</p >
        <p>如遇技术问题，请联系开发团队</p >
      </div>
    `
  }
}

// ==================== 开发环境调试 ====================
if (isDevelopment) {
  console.log('🎯 淮韵游踪 - 开发环境调试工具已启用')
  console.log('🔧 构建工具: Vue CLI')
}