<<<<<<< HEAD
﻿import api from './index'
=======
﻿/**
 * $(($FileName -replace '\.js$','')) - 淮南文化平台
 * 文件编码已修复 - UTF-8
 */
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2

export const $(($FileName -replace '\.js$',''))API = {
  // 获取数据
  async getList(params = {}) {
    return Promise.resolve({
      data: [],
      total: 0,
      success: true
    })
  },

  // 创建数据
  async create(data) {
    return Promise.resolve({
      success: true,
      id: Date.now(),
      message: '创建成功'
    })
  },

  // 更新数据
  async update(id, data) {
    return Promise.resolve({
      success: true,
      message: '更新成功'
    })
  },

  // 删除数据
  async delete(id) {
    return Promise.resolve({
      success: true,
      message: '删除成功'
    })
  }
}
<<<<<<< HEAD
=======

export const $(($FileName -replace '\.js$',''))Utils = {
  // 数据格式化
  formatData(data) {
    return data
  },

  // 验证数据
  validate(data) {
    return data !== null && data !== undefined
  },

  // 过滤数据
  filter(list, condition) {
    return list.filter(item => {
      for (let key in condition) {
        if (item[key] !== condition[key]) return false
      }
      return true
    })
  }
}

export default {
  ...$(($FileName -replace '\.js$',''))API,
  ...$(($FileName -replace '\.js$',''))Utils
}
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
