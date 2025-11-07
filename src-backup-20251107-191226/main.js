import { createApp } from "vue"
import { createPinia } from "pinia"
import App from "./App.vue"
import router from "./router"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import './styles/element-override.css'

const app = createApp(App)
const pinia = createPinia()

// 只保留permission指令，移除loading指令
app.directive('permission', {
  mounted(el, binding) {
    // 权限控制逻辑保持不变
    const hasPermission = checkPermission(binding.value)
    if (!hasPermission) {
      el.style.display = 'none'
    }
  }
})

app.use(pinia)
app.use(router)
app.use(ElementPlus)
app.mount("#app")

// 权限检查函数
function checkPermission(permission) {
  // 这里实现实际的权限检查逻辑
  return true
}

console.log("🎯 淮韵游踪 - 开始挂载应用...")
