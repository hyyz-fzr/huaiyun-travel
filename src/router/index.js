import { createRouter, createWebHistory } from 'vue-router'

<<<<<<< HEAD
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
const ContentReview = () => import('@/views/ContentReview.vue')
const TagManagement = () => import('@/views/TagManagement.vue')
const CommentManagement = () => import('@/views/CommentManagement.vue')
const UserProfile = () => import('@/views/UserProfile.vue')
const Cart = () => import('@/views/Cart.vue')
const OrderList = () => import('@/views/OrderList.vue')
const Bookings = () => import('@/views/Bookings.vue')
const Security = () => import('@/views/Security.vue')
const CollectedPosts = () => import('@/views/CollectedPosts.vue')
const AITravelDiary = () => import('@/views/AITravelDiary.vue')
const VRView = () => import('@/views/VRView.vue')
const AboutView = () => import('@/views/AboutView.vue')
const UserManagement = () => import('@/views/UserManagement.vue')
const SystemSettings = () => import('@/views/SystemSettings.vue')
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
      // 文化遗产路由
      {
        path: '/heritage',
        redirect: '/heritage/list'
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
      // 文创产品路由
      {
        path: '/products',
        redirect: '/products/list'
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
      // 文化社区路由
      {
        path: '/posts',
        redirect: '/posts/list'
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
      // 文化活动路由
      {
        path: '/events',
        redirect: '/events/list'
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
      // 内容管理路由
      {
        path: '/content',
        redirect: '/content/management'
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
        path: '/content/review',
        name: 'ContentReview',
        component: ContentReview,
        meta: { requiresAuth: true, roles: ['admin', 'editor'] }
      },
      // 系统管理路由
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
      // 个人中心路由
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
        path: '/bookings',
        name: 'Bookings',
        component: Bookings,
        meta: { requiresAuth: true }
      },
      {
        path: '/security',
        name: 'Security',
        component: Security,
        meta: { requiresAuth: true }
      },
      {
        path: '/favorites',
        name: 'CollectedPosts',
        component: CollectedPosts,
        meta: { requiresAuth: true }
      },
      // 其他功能路由
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
      // 系统设置路由
      {
        path: '/settings',
        redirect: '/settings/users'
      },
      {
        path: '/settings/users',
        name: 'UserManagement',
        component: UserManagement,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      {
        path: '/settings/system',
        name: 'SystemSettings',
        component: SystemSettings,
        meta: { requiresAuth: true, roles: ['admin'] }
      },
      // 404路由
      {
        path: '/:pathMatch(.*)*',
        name: 'NotFound',
        component: NotFound
      }
    ]
=======
// 路由组件
const Home = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>欢迎使用淮韵游踪平台</h2>
        </template>
        <p>基于Vue 3 + Element Plus构建的淮南文化数字传承平台</p >
        <el-button type="primary" @click="goToAbout">关于我们</el-button>
      </el-card>
      
      <el-row :gutter="20" style="margin-top: 20px;">
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>文化遗产</h3>
            </template>
            <p>探索淮南丰富的历史文化遗产</p >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>传统技艺</h3>
            </template>
            <p>了解传统工艺和制作技艺</p >
          </el-card>
        </el-col>
        <el-col :span="8">
          <el-card>
            <template #header>
              <h3>文创产品</h3>
            </template>
            <p>发现独具特色的文创产品</p >
          </el-card>
        </el-col>
      </el-row>
    </div>
  `,
  methods: {
    goToAbout() {
      this.$router.push('/about')
    }
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  }
}

const About = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>关于淮韵游踪</h2>
        </template>
        <p>淮韵游踪是一个致力于传承和推广淮南文化的数字平台。</p >
        <p>我们通过现代化的技术手段，让传统文化焕发新的生命力。</p >
        
        <el-divider></el-divider>
        
        <h3>平台特色</h3>
        <ul>
          <li>数字化展示文化遗产</li>
          <li>传统技艺教学传承</li>
          <li>文创产品开发推广</li>
          <li>文化社区交流互动</li>
        </ul>
      </el-card>
    </div>
  `
}

const Content = {
  template: `
    <div style="padding: 20px;">
      <el-card>
        <template #header>
          <h2>内容管理</h2>
        </template>
        <p>这里是内容管理页面，可以管理平台的各种内容。</p >
        <el-button type="primary">创建内容</el-button>
        <el-button>内容列表</el-button>
      </el-card>
    </div>
  `
}

// 路由配置
const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/content', component: Content }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

<<<<<<< HEAD
// 路由守卫
router.beforeEach((to, from, next) => {
  const userStore = useUserStore()
  
  // 初始化用户状态
  userStore.initUser()
  
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

=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
export default router