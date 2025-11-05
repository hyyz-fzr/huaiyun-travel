import {
  HomeFilled,
  Histogram,
  ShoppingBag,
  ChatDotRound,
  User,
  Setting,
  DataBoard,
  CollectionTag,
  Document,
  Calendar,
  Picture
} from '@element-plus/icons-vue'

// 菜单配置
export default [
  {
    title: '首页',
    path: '/',
    icon: HomeFilled
  },
  {
    title: '数据看板',
    path: '/dashboard',
    icon: DataBoard,
    roles: ['admin']
  },
  {
    title: '文化遗产',
    path: '/heritage',
    icon: Histogram,
    children: [
      {
        title: '文化列表',
        path: '/heritage/list'
      },
      {
        title: '上传文化',
        path: '/heritage/upload',
        roles: ['admin', 'editor']
      }
    ]
  },
  {
    title: '文创产品',
    path: '/products',
    icon: ShoppingBag,
    children: [
      {
        title: '产品列表',
        path: '/products/list'
      },
      {
        title: '产品上传',
        path: '/products/upload',
        roles: ['admin', 'editor']
      }
    ]
  },
  {
    title: '文化社区',
    path: '/posts',
    icon: ChatDotRound,
    children: [
      {
        title: '帖子列表',
        path: '/posts/list'
      },
      {
        title: '发布帖子',
        path: '/posts/upload'
      },
      {
        title: '我的帖子',
        path: '/my-posts'
      }
    ]
  },
  {
    title: '文化活动',
    path: '/events',
    icon: Calendar,
    children: [
      {
        title: '活动列表',
        path: '/events/list'
      },
      {
        title: '活动发布',
        path: '/events/upload',
        roles: ['admin', 'editor']
      }
    ]
  },
  {
    title: '内容管理',
    path: '/content',
    icon: Document,
    roles: ['admin', 'editor'],
    children: [
      {
        title: '内容列表',
        path: '/content/management'
      },
      {
        title: '内容审核',
        path: '/content/review'
      },
      {
        title: '内容仪表盘',
        path: '/content/dashboard'
      }
    ]
  },
  {
    title: '标签管理',
    path: '/tags',
    icon: CollectionTag,
    roles: ['admin']
  },
  {
    title: '评论管理',
    path: '/comments',
    icon: ChatDotRound,
    roles: ['admin', 'editor']
  },
  {
    title: '个人中心',
    path: '/profile',
    icon: User,
    children: [
      {
        title: '个人资料',
        path: '/profile'
      },
      {
        title: '我的收藏',
        path: '/favorites'
      },
      {
        title: '我的订单',
        path: '/orders'
      },
      {
        title: '我的预订',
        path: '/bookings'
      },
      {
        title: '安全设置',
        path: '/security'
      }
    ]
  },
  {
    title: '系统设置',
    path: '/settings',
    icon: Setting,
    roles: ['admin'],
    children: [
      {
        title: '用户管理',
        path: '/settings/users'
      },
      {
        title: '系统配置',
        path: '/settings/system'
      }
    ]
  }
]