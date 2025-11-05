import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores/user'

// 页面组件导入
const BaseLayout = () => import('@/components/Layout/BaseLayout.vue')
const Home = () => import('@/views/Home.vue')
const Login = () => import('@/views/Login.vue')
const Register = () => import('@/views/Register.vue')
const Dashboard = () => import('@/views/Dashboard.vue')
const Profile = () => import('@/views/Profile.vue')
const HeritageList = () => import('@/views/HeritageList.vue')
const HeritageDetail = () => import('@/views/HeritageDetail.vue')
const HeritageUpload = () => import('@/views/HeritageUpload.vue')
const ProductList = () => import('@/views/ProductList.vue')
const ProductDetail = () => import('@/views/ProductDetail.vue')
const ProductUpload = () => import('@/views/ProductUpload.vue')
const PostList = () => import('@/views/PostList.vue')
const PostDetail = () => import('@/views/PostDetail.vue')
const PostUpload = () => import('@/views/PostUpload.vue')
const EventList = () => import('@/views/EventList.vue')
const EventDetail = () => import('@/views/EventDetail.vue')
const EventUpload = () => import('@/views/EventUpload.vue')
const ContentManagement = () => import('@/views/ContentManagement.vue')
const ContentDetail = () => import('@/views/ContentDetail.vue')
const ContentDashboard = () => import('@/views/ContentDashboard.vue')
const TagManagement = () => import('@/views/TagManagement.vue')
const CommentManagement = () => import('@/views/CommentManagement.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const Cart = () => import('@/views/Cart.vue')
const OrderList = () => import('@/views/OrderList.vue')
const CollectedPosts = () => import('@/views/CollectedPosts.vue')
const AITravelDiary = () => import('@/views/AITravelDiary.vue')
const VRView = () => import('@/views/VRView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const NotFound = () => import('@/views/NotFound.vue')

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: { requiresGuest: true }
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: { requiresGuest: true }
  },
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'Home',
        component: Home
      },
      {
        path: '/dashboard',
        name: 'Dashboard',
        component: Dashboard,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: '/profile',
        name: 'Profile',
        component: Profile,
        meta: { requiresAuth: true }
      },
      {
        path: '/heritage/list',
        name: 'HeritageList',
        component: HeritageList
      },
      {
        path: '/heritage/detail/:id',
        name: 'HeritageDetail',
        component: HeritageDetail
      },
      {
        path: '/heritage/upload',
        name: 'HeritageUpload',
        component: HeritageUpload,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/products/list',
        name: 'ProductList',
        component: ProductList
      },
      {
        path: '/products/detail/:id',
        name: 'ProductDetail',
        component: ProductDetail
      },
      {
        path: '/products/upload',
        name: 'ProductUpload',
        component: ProductUpload,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/posts/list',
        name: 'PostList',
        component: PostList
      },
      {
        path: '/posts/detail/:id',
        name: 'PostDetail',
        component: PostDetail
      },
      {
        path: '/posts/upload',
        name: 'PostUpload',
        component: PostUpload,
        meta: { requiresAuth: true }
      },
      {
        path: '/events/list',
        name: 'EventList',
        component: EventList
      },
      {
        path: '/events/detail/:id',
        name: 'EventDetail',
        component: EventDetail
      },
      {
        path: '/events/upload',
        name: 'EventUpload',
        component: EventUpload,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/content/management',
        name: 'ContentManagement',
        component: ContentManagement,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/content/detail/:id',
        name: 'ContentDetail',
        component: ContentDetail
      },
      {
        path: '/content/dashboard',
        name: 'ContentDashboard',
        component: ContentDashboard,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/tags',
        name: 'TagManagement',
        component: TagManagement,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: '/comments',
        name: 'CommentManagement',
        component: CommentManagement,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      {
        path: '/user/:id',
        name: 'UserProfile',
        component: UserProfile
      },
      {
        path: '/cart',
        name: 'Cart',
        component: Cart,
        meta: { requiresAuth: true }
      },
      {
        path: '/orders',
        name: 'OrderList',
        component: OrderList,
        meta: { requiresAuth: true }
      },
      {
        path: '/favorites',
        name: 'CollectedPosts',
        component: CollectedPosts,
        meta: { requiresAuth: true }
      },
      {
        path: '/ai-travel',
        name: 'AITravelDiary',
        component: AITravelDiary,
        meta: { requiresAuth: true }
      },
      {
        path: '/vr-view',
        name: 'VRView',
        component: VRView
      },
      {
        path: '/about',
        name: 'AboutView',
        component: AboutView
      },
      {
        path: '/my-posts',
        name: 'MyPosts',
        component: PostList,
        meta: { requiresAuth: true }
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 检查是否需要认证
  if (to.meta.requiresAuth && !userStore.isLoggedIn) {
    next('/login')
    return
  }

  // 检查是否需要游客状态（已登录用户不能访问登录注册页）
  if (to.meta.requiresGuest && userStore.isLoggedIn) {
    next('/')
    return
  }

  // 检查角色权限
  if (to.meta.roles && userStore.isLoggedIn) {
    const userRole = userStore.userInfo?.role
    if (!userRole || !to.meta.roles.includes(userRole)) {
      next('/')
      return
    }
  }

  next()
})

export default router