import { createServer } from './utils'
import mockData from './index'

// 启动Mock服务器
export function startMockServer(port = 3001) {
  const server = createServer(mockData, port)
  
  console.log(`🎯 Mock服务器运行在 http://localhost:${port}`)
  console.log('📊 可用接口:')
  Object.keys(mockData).forEach(route => {
    console.log(`   ${route}`)
  })
  
  return server
}

// 开发环境自动启动
if (process.env.NODE_ENV === 'development') {
  startMockServer()
}