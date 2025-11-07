import { Random } from 'mockjs'

// 仪表盘数据
export const stats = {
  totalUsers: 1524,
  totalHeritage: 89,
  totalProducts: 156,
  totalPosts: 423,
  totalOrders: 678,
  totalRevenue: 125600.50,
  todayUsers: 23,
  todayOrders: 12,
  todayRevenue: 2560.00,
  growth: {
    users: 12.5,
    heritage: 8.3,
    products: 15.2,
    posts: 23.7,
    orders: 18.6,
    revenue: 25.3
  }
}

export const charts = {
  userGrowth: {
    dates: ['1月1日', '1月2日', '1月3日', '1月4日', '1月5日', '1月6日', '1月7日'],
    newUsers: [23, 45, 56, 34, 67, 89, 102],
    activeUsers: [156, 178, 165, 189, 176, 198, 234]
  },
  contentTypes: [
    { value: 35, name: '文化遗产' },
    { value: 28, name: '旅游攻略' },
    { value: 20, name: '美食推荐' },
    { value: 12, name: '历史故事' },
    { value: 5, name: '民俗文化' }
  ],
  hotTags: [
    { name: '淮南', value: 156 },
    { name: '豆腐', value: 134 },
    { name: '八公山', value: 98 },
    { name: '文化遗产', value: 87 },
    { name: '旅游', value: 76 },
    { name: '美食', value: 65 },
    { name: '传统工艺', value: 54 }
  ],
  userActivity: {
    hours: ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00'],
    activity: [23, 15, 8, 12, 45, 89, 123, 156, 134, 98, 67, 45]
  }
}

export default {
  stats,
  charts
}