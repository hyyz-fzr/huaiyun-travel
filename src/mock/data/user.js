import { Random } from 'mockjs'

// 用户数据
export const users = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  username: Random.name(),
  email: Random.email(),
  avatar: `/images/avatars/avatar-${Random.integer(1, 12)}.jpg`,
  role: i === 0 ? 'admin' : i < 5 ? 'editor' : 'user',
  status: Random.pick(['active', 'inactive']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  lastLogin: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const login = {
  token: Random.string(32),
  userInfo: {
    id: 1,
    username: 'admin',
    email: 'admin@huaiyun.com',
    avatar: '/images/avatars/avatar-1.jpg',
    role: 'admin',
    profile: {
      realName: '管理员',
      phone: '13800138000',
      location: '安徽淮南',
      bio: '淮南文化传承者'
    }
  }
}

export const register = {
  message: '注册成功'
}

export const profile = {
  id: 1,
  username: 'admin',
  email: 'admin@huaiyun.com',
  avatar: '/images/avatars/avatar-1.jpg',
  role: 'admin',
  profile: {
    realName: '管理员',
    phone: '13800138000',
    location: '安徽淮南',
    bio: '淮南文化传承者',
    gender: 'male',
    birthday: '1990-01-01'
  },
  stats: {
    posts: 23,
    favorites: 45,
    followers: 123,
    following: 56
  }
}

export const favorites = Array.from({ length: 15 }, (_, i) => ({
  id: i + 1,
  type: Random.pick(['heritage', 'product', 'post']),
  title: Random.ctitle(10, 20),
  description: Random.cparagraph(2, 4),
  image: `/images/favorites/fav-${Random.integer(1, 8)}.jpg`,
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const myPosts = Array.from({ length: 12 }, (_, i) => ({
  id: i + 1,
  title: Random.ctitle(8, 15),
  content: Random.cparagraph(10, 20),
  images: Array.from({ length: Random.integer(0, 3) }, () => 
    `/images/posts/post-${Random.integer(1, 12)}.jpg`
  ),
  views: Random.integer(100, 1000),
  likes: Random.integer(10, 200),
  comments: Random.integer(5, 50),
  status: Random.pick(['published', 'draft', 'reviewing']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const orders = Array.from({ length: 8 }, (_, i) => ({
  id: `ORDER${Random.string('number', 8)}`,
  productName: Random.ctitle(6, 12),
  productImage: `/images/products/product-${Random.integer(1, 12)}.jpg`,
  price: Random.float(50, 500, 2, 2),
  quantity: Random.integer(1, 3),
  totalAmount: Random.float(100, 1500, 2, 2),
  status: Random.pick(['pending', 'paid', 'shipped', 'completed', 'cancelled']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const bookings = Array.from({ length: 6 }, (_, i) => ({
  id: i + 1,
  eventName: Random.ctitle(8, 15),
  eventImage: `/images/events/event-${Random.integer(1, 8)}.jpg`,
  date: Random.datetime('yyyy-MM-dd HH:mm'),
  location: Random.county(true),
  participants: Random.integer(1, 5),
  status: Random.pick(['confirmed', 'pending', 'cancelled']),
  bookTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export default {
  login,
  register,
  profile,
  favorites,
  myPosts,
  orders,
  bookings,
  users
}