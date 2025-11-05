// Mock工具函数

// 模拟延迟
export const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms))

// 模拟成功响应
export const successResponse = (data, message = '操作成功') => ({
  code: 200,
  message,
  data,
  timestamp: new Date().getTime()
})

// 模拟错误响应
export const errorResponse = (message = '操作失败', code = 500) => ({
  code,
  message,
  data: null,
  timestamp: new Date().getTime()
})

// 分页处理
export const paginate = (data, page = 1, pageSize = 10) => {
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const list = data.slice(start, end)
  
  return {
    list,
    total: data.length,
    page,
    pageSize,
    totalPages: Math.ceil(data.length / pageSize)
  }
}

// 搜索处理
export const searchData = (data, keyword, fields = ['name', 'title', 'description']) => {
  if (!keyword) return data
  
  const lowerKeyword = keyword.toLowerCase()
  return data.filter(item => 
    fields.some(field => 
      item[field] && item[field].toLowerCase().includes(lowerKeyword)
    )
  )
}

// 创建Mock拦截器
export const createMock = (urlPattern, method = 'get', data) => {
  if (typeof window === 'undefined') return

  const Mock = require('mockjs')
  const methodUpper = method.toUpperCase()
  
  Mock.mock(new RegExp(urlPattern), methodUpper, (options) => {
    console.log(`📨 Mock请求: ${methodUpper} ${options.url}`)
    
    // 处理查询参数
    const params = new URLSearchParams(options.url.split('?')[1])
    const page = parseInt(params.get('page')) || 1
    const pageSize = parseInt(params.get('pageSize')) || 10
    const keyword = params.get('keyword')
    
    let responseData = data
    
    // 处理分页
    if (Array.isArray(data) && (params.has('page') || params.has('pageSize'))) {
      responseData = paginate(data, page, pageSize)
    }
    
    // 处理搜索
    if (keyword && Array.isArray(data)) {
      const searchedData = searchData(data, keyword)
      responseData = paginate(searchedData, page, pageSize)
    }
    
    return successResponse(responseData)
  })
}

// 创建Mock服务器（Node.js环境）
export const createServer = (mockData, port = 3001) => {
  const express = require('express')
  const cors = require('cors')
  
  const app = express()
  
  app.use(cors())
  app.use(express.json())
  
  Object.keys(mockData).forEach(route => {
    const [path, method = 'get'] = route.split('|')
    const handler = mockData[route]
    
    app[method.toLowerCase()](path, async (req, res) => {
      await delay(300 + Math.random() * 700)
      
      const { query, body } = req
      const page = parseInt(query.page) || 1
      const pageSize = parseInt(query.pageSize) || 10
      const keyword = query.keyword
      
      let responseData = handler
      
      // 处理分页和搜索
      if (Array.isArray(handler)) {
        let data = handler
        
        if (keyword) {
          data = searchData(data, keyword)
        }
        
        responseData = paginate(data, page, pageSize)
      }
      
      res.json(successResponse(responseData))
    })
  })
  
  return app.listen(port, () => {
    console.log(`🚀 Mock服务器运行在 http://localhost:${port}`)
  })
}