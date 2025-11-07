import { createMock } from './utils'
import userData from './data/user'
import postData from './data/post'
import productData from './data/product'
import heritageData from './data/heritage'
import contentData from './data/content'
import commentData from './data/comment'
import dashboardData from './data/dashboard'
import tagData from './data/tag'

// 模拟数据集合
const mockData = {
  // 用户相关
  '/auth/login': userData.login,
  '/auth/register': userData.register,
  '/user/profile': userData.profile,
  '/user/favorites': userData.favorites,
  '/user/posts': userData.myPosts,
  '/user/orders': userData.orders,
  '/user/bookings': userData.bookings,

  // 帖子相关
  '/posts': postData.posts,
  '/posts/\\d+': postData.postDetail,
  '/posts/\\d+/comments': postData.comments,
  '/posts/hot': postData.hotPosts,

  // 产品相关
  '/products': productData.products,
  '/products/\\d+': productData.productDetail,
  '/products/categories': productData.categories,
  '/products/search': productData.search,

  // 文化遗产相关
  '/heritage': heritageData.heritageList,
  '/heritage/\\d+': heritageData.heritageDetail,
  '/heritage/categories': heritageData.categories,
  '/heritage/search': heritageData.search,
  '/heritage/recommended': heritageData.recommended,

  // 内容管理
  '/contents': contentData.contents,
  '/contents/\\d+': contentData.contentDetail,
  '/contents/stats': contentData.stats,
  '/contents/hot': contentData.hotContents,

  // 评论管理
  '/comments': commentData.comments,

  // 数据看板
  '/dashboard/stats': dashboardData.stats,
  '/dashboard/charts': dashboardData.charts,

  // 标签管理
  '/tags': tagData.tags
}

// 创建Mock拦截器
export function setupMock() {
  Object.keys(mockData).forEach(key => {
    const method = key.includes('login') || key.includes('register') ? 'post' : 'get'
    createMock(key, method, mockData[key])
  })
}

export default mockData