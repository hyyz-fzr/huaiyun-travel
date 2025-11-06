// $(($Name -replace '\.js$','')) - 已修复
// 淮南文化数字传承平台工具文件

export const api = {
  async getData() {
    return Promise.resolve({ data: [], success: true })
  },
  
  async createData(data) {
    return Promise.resolve({ success: true, id: Date.now() })
  }
}

export const utils = {
  formatData(data) {
    return data
  },
  
  validateInput(input) {
    return input && input.trim().length > 0
  }
}

export default { api, utils }