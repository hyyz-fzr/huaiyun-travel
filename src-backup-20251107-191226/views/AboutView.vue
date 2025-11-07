<template>
  <div class="about-container">
    <!-- 页面头部 -->
    <div class="page-header">
      <h1>关于淮韵游踪</h1>
      <p>传承淮南文化，创新数字体验</p >
    </div>
    <!-- 项目介绍 -->
    <section class="intro-section">
      <el-row :gutter="40" align="middle">
        <el-col :xs="24" :md="12">
          <div class="intro-content">
            <h2>项目愿景</h2>
            <p>
              "淮韵游踪"是一个致力于传承和推广淮南文化的数字平台。我们通过现代技术手段，
              让更多人了解和体验淮南丰富的文化遗产，包括非遗技艺、历史遗迹、传统节庆等。
            </p >
            <p>
              我们的目标是打造一个集文化展示、互动体验、社区交流于一体的综合性平台，
              让传统文化在数字时代焕发新的生机。
            </p >
            <div class="vision-stats">
              <div class="stat-item">
                <div class="stat-number">128+</div>
                <div class="stat-label">文化遗产项目</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">50+</div>
                <div class="stat-label">非遗传承人</div>
              </div>
              <div class="stat-item">
                <div class="stat-number">1000+</div>
                <div class="stat-label">文化爱好者</div>
              </div>
            </div>
          </div>
        </el-col>
        <el-col :xs="24" :md="12">
          <div class="intro-image">
            < img src="https://via.placeholder.com/600x400?text=淮南文化" alt="淮南文化" />
           </div>
        </el-col>
      </el-row>
    </section>

    <!-- 核心功能 -->
    <section class="features-section">
      <div class="section-header">
        <h2>核心功能</h2>
        <p>全方位展示和体验淮南文化的特色功能</p >
      </div>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="8" v-for="feature in features" :key="feature.id">
          <el-card class="feature-card" shadow="hover">
            <div class="feature-icon" :style="{ background: feature.color }">
              <el-icon><component :is="feature.icon" /></el-icon>
            </div>
            <h3>{{ feature.title }}</h3>
            <p>{{ feature.description }}</p >
            <ul class="feature-list">
              <li v-for="item in feature.items" :key="item">{{ item }}</li>
            </ul>
          </el-card>
        </el-col>
      </el-row>
    </section>

    <!-- 技术特色 -->
    <section class="tech-section">
      <div class="section-header">
        <h2>技术特色</h2>
        <p>运用前沿技术提升文化体验</p >
      </div>
      <el-row :gutter="30">
        <el-col :xs="24" :sm="12" :md="6" v-for="tech in technologies" :key="tech.id">
          <div class="tech-item">
            <div class="tech-icon">
              <el-icon><component :is="tech.icon" /></el-icon>
            </div>
            <h4>{{ tech.name }}</h4>
            <p>{{ tech.description }}</p >
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 开发团队 -->
    <section class="team-section">
      <div class="section-header">
        <h2>开发团队</h2>
        <p>热爱文化的技术团队</p >
      </div>
      <el-row :gutter="30" justify="center">
        <el-col :xs="12" :sm="8" :md="6" v-for="member in teamMembers" :key="member.id">
          <div class="team-member">
            <el-avatar :size="100" :src="member.avatar" class="member-avatar">
              {{ member.name.charAt(0) }}
            </el-avatar>
            <h4>{{ member.name }}</h4>
            <p class="member-role">{{ member.role }}</p >
            <p class="member-desc">{{ member.description }}</p >
            <div class="member-skills">
              <el-tag
                v-for="skill in member.skills"
                :key="skill"
                size="small"
                type="info"
              >
                {{ skill }}
              </el-tag>
            </div>
          </div>
        </el-col>
      </el-row>
    </section>

    <!-- 联系我们 -->
    <section class="contact-section">
      <el-card class="contact-card">
        <el-row :gutter="40">
          <el-col :xs="24" :md="12">
            <div class="contact-info">
              <h3>联系我们</h3>
              <p>如果您对淮南文化感兴趣，或者有任何建议和合作意向，欢迎与我们联系。</p >
              
              <div class="contact-details">
                <div class="contact-item">
                  <el-icon><Message /></el-icon>
                  <span>邮箱: contact@huaiyun.com</span>
                </div>
                <div class="contact-item">
                  <el-icon><Phone /></el-icon>
                  <span>电话: 0554-1234567</span>
                </div>
                <div class="contact-item">
                  <el-icon><Location /></el-icon>
                  <span>地址: 安徽省淮南市文化创意园区</span>
                </div>
                <div class="contact-item">
                  <el-icon><Clock /></el-icon>
                  <span>工作时间: 周一至周五 9:00-18:00</span>
                </div>
              </div>

              <div class="social-links">
                <el-button type="primary" :icon="ChatDotRound" circle />
                <el-button type="success" :icon="VideoPlay" circle />
                <el-button type="warning" :icon="Star" circle />
                <el-button type="danger" :icon="Share" circle />
              </div>
            </div>
          </el-col>
          <el-col :xs="24" :md="12">
            <div class="contact-form">
              <h3>留言反馈</h3>
              <el-form :model="feedbackForm" :rules="feedbackRules" ref="feedbackFormRef">
                <el-form-item label="姓名" prop="name">
                  <el-input 
                    id="feedbackName"
                    name="feedbackName"
                    v-model="feedbackForm.name" 
                    placeholder="请输入您的姓名" 
                  />
                </el-form-item>
                <el-form-item label="邮箱" prop="email">
                  <el-input 
                    id="feedbackEmail"
                    name="feedbackEmail"
                    v-model="feedbackForm.email" 
                    placeholder="请输入您的邮箱" 
                  />
                </el-form-item>
                <el-form-item label="主题" prop="subject">
                  <el-input 
                    id="feedbackSubject"
                    name="feedbackSubject"
                    v-model="feedbackForm.subject" 
                    placeholder="请输入反馈主题" 
                  />
                </el-form-item>
                <el-form-item label="内容" prop="content">
                  <el-input
                    id="feedbackContent"
                    name="feedbackContent"
                    v-model="feedbackForm.content"
                    type="textarea"
                    :rows="4"
                    placeholder="请输入您的反馈内容"
                  />
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitFeedback" :loading="sending">
                    发送反馈
                  </el-button>
                  <el-button @click="resetForm">重置</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
        </el-row>
      </el-card>
    </section>
    <!-- 页脚 -->
    <footer class="page-footer">
      <div class="footer-content">
        <div class="footer-logo">
          <h3>淮韵游踪</h3>
          <p>楚韵数字游，一眼千年秋</p >
        </div>
        <div class="footer-links">
          <div class="link-group">
            <h4>产品</h4>
            <a href=" ">文化社区</a >
            <a href="#">非遗活动</a >
            <a href="#">文创商城</a >
            <a href="#">VR游览</a >
          </div>
          <div class="link-group">
            <h4>支持</h4>
            <a href="#">帮助中心</a >
            <a href="#">用户指南</a >
            <a href="#">联系我们</a >
            <a href="#">反馈建议</a >
          </div>
          <div class="link-group">
            <h4>法律</h4>
            <a href="#">隐私政策</a >
            <a href="#">服务条款</a >
            <a href="#">版权声明</a >
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 淮韵游踪 版权所有 | 传承文化，创新体验</p >
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { ElMessage } from 'element-plus'
import {
  Collection,
  Camera,
  ShoppingCart,
  User,
  MagicStick,
  VideoCamera,
  Monitor,
  Phone,
  Message,
  Cellphone,
  Location,
  Clock,
  ChatDotRound,
  VideoPlay,
  Star,
  Share
} from '@element-plus/icons-vue'

// 响应式数据
const feedbackFormRef = ref()
const sending = ref(false)

const feedbackForm = reactive({
  name: '',
  email: '',
  subject: '',
  content: ''
})

const feedbackRules = {
  name: [
    { required: true, message: '请输入姓名', trigger: 'blur' }
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur' }
  ],
  subject: [
    { required: true, message: '请输入主题', trigger: 'blur' }
  ],
  content: [
    { required: true, message: '请输入反馈内容', trigger: 'blur' }
  ]
}

// 功能特色数据
const features = ref([
  {
    id: 1,
    title: '文化遗产展示',
    description: '全方位展示淮南丰富的文化遗产',
    icon: 'Collection',
    color: '#409eff',
    items: [
      '非遗技艺详细介绍',
      '历史遗迹VR展示',
      '传承人故事分享',
      '文化地图导航'
    ]
  },
  {
    id: 2,
    title: '文化体验活动',
    description: '参与丰富多彩的文化体验活动',
    icon: 'Camera',
    color: '#67c23a',
    items: [
      '非遗工作坊预约',
      '文化节庆活动',
      '手工制作体验',
      '文化讲座学习'
    ]
  },
  {
    id: 3,
    title: '文创产品商城',
    description: '购买独具特色的淮南文创产品',
    icon: 'ShoppingCart',
    color: '#e6a23c',
    items: [
      '手工艺品',
      '文化纪念品',
      '特色食品',
      '文创衍生品'
    ]
  },
  {
    id: 4,
    title: '社区交流',
    description: '与文化爱好者交流分享',
    icon: 'User',
    color: '#f56c6c',
    items: [
      '文化见闻分享',
      '经验交流讨论',
      '作品展示',
      '活动组织'
    ]
  },
  {
    id: 5,
    title: 'AI旅行助手',
    description: '智能规划文化旅行路线',
    icon: 'MagicStick',
    color: '#909399',
    items: [
      '智能路线规划',
      '文化知识问答',
      '旅行日记生成',
      '照片智能整理'
    ]
  },
  {
    id: 6,
    title: 'VR云游览',
    description: '沉浸式体验淮南景点',
    icon: 'VideoCamera',
    color: '#8e44ad',
    items: [
      '360度全景展示',
      '虚拟导览讲解',
      '历史场景重现',
      '互动体验功能'
    ]
  }
])

// 技术特色数据
const technologies = ref([
  {
    id: 1,
    name: 'Vue 3',
    description: '现代化前端框架，提供流畅的用户体验',
    icon: 'Monitor'
  },
  {
    id: 2,
    name: 'Spring Boot',
    description: '企业级后端框架，确保系统稳定运行',
    icon: 'Monitor'
  },
  {
    id: 3,
    name: 'VR技术',
    description: '虚拟现实技术，提供沉浸式文化体验',
    icon: 'VideoCamera'
  },
  {
    id: 4,
    name: '移动适配',
    description: '响应式设计，完美适配各种设备',
    icon: 'Cellphone'
  }
])

// 团队成员数据
const teamMembers = ref([
  {
    id: 1,
    name: '张文化',
    avatar: '',
    role: '项目负责人',
    description: '热爱传统文化，致力于文化数字化传承',
    skills: ['项目管理', '文化研究', '产品设计']
  },
  {
    id: 2,
    name: '李技术',
    avatar: '',
    role: '技术总监',
    description: '全栈开发专家，专注于技术创新',
    skills: ['Vue.js', 'Spring Boot', '数据库设计']
  },
  {
    id: 3,
    name: '王设计',
    avatar: '',
    role: 'UI/UX设计师',
    description: '注重用户体验，追求设计美感',
    skills: ['UI设计', '用户体验', '平面设计']
  },
  {
    id: 4,
    name: '陈内容',
    avatar: '',
    role: '内容策划',
    description: '熟悉淮南文化，擅长内容创作',
    skills: ['内容策划', '文案撰写', '文化研究']
  }
])

// 方法
const submitFeedback = async () => {
  if (!feedbackFormRef.value) return

  try {
    const valid = await feedbackFormRef.value.validate()
    if (!valid) return

    sending.value = true
    
    // 模拟发送反馈
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    ElMessage.success('反馈发送成功！感谢您的建议。')
    resetForm()
  } catch (error) {
    ElMessage.error('发送失败，请重试')
  } finally {
    sending.value = false
  }
}

const resetForm = () => {
  feedbackFormRef.value?.resetFields()
}
</script>

<style scoped>
.about-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.page-header {
  text-align: center;
  margin-bottom: 50px;
}

.page-header h1 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2.5em;
}

.page-header p {
  color: #666;
  font-size: 1.2em;
}

/* 介绍部分 */
.intro-section {
  margin-bottom: 60px;
  padding: 40px 0;
}

.intro-content h2 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.8em;
}

.intro-content p {
  color: #666;
  line-height: 1.8;
  margin-bottom: 20px;
  font-size: 1.1em;
}

.vision-stats {
  display: flex;
  gap: 30px;
  margin-top: 30px;
}

.stat-item {
  text-align: center;
}

.stat-number {
  font-size: 2em;
  font-weight: bold;
  color: #409eff;
  margin-bottom: 5px;
}

.stat-label {
  color: #666;
  font-size: 0.9em;
}

.intro-image {
  text-align: center;
}

.intro-image img {
  max-width: 100%;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

/* 功能特色部分 */
.features-section {
  margin-bottom: 60px;
  padding: 40px 0;
  background: #f8f9fa;
  border-radius: 12px;
}

.section-header {
  text-align: center;
  margin-bottom: 40px;
}

.section-header h2 {
  color: #333;
  margin-bottom: 10px;
  font-size: 2em;
}

.section-header p {
  color: #666;
  font-size: 1.1em;
}

.feature-card {
  margin-bottom: 30px;
  text-align: center;
  transition: transform 0.3s;
  height: 100%;
}

.feature-card:hover {
  transform: translateY(-5px);
}

.feature-icon {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  color: white;
  font-size: 30px;
}

.feature-card h3 {
  color: #333;
  margin-bottom: 15px;
  font-size: 1.3em;
}

.feature-card p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.feature-list {
  text-align: left;
  color: #666;
  padding-left: 20px;
}

.feature-list li {
  margin-bottom: 8px;
  line-height: 1.5;
}

/* 技术特色部分 */
.tech-section {
  margin-bottom: 60px;
  padding: 40px 0;
}

.tech-item {
  text-align: center;
  padding: 30px 20px;
  border: 1px solid #f0f0f0;
  border-radius: 8px;
  transition: all 0.3s;
}

.tech-item:hover {
  border-color: #409eff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.tech-icon {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 20px;
  font-size: 24px;
}

.tech-item h4 {
  color: #333;
  margin-bottom: 10px;
  font-size: 1.2em;
}

.tech-item p {
  color: #666;
  line-height: 1.6;
}

/* 团队部分 */
.team-section {
  margin-bottom: 60px;
  padding: 40px 0;
  background: #f8f9fa;
  border-radius: 12px;
}

.team-member {
  text-align: center;
  padding: 30px 20px;
  margin-bottom: 30px;
}

.member-avatar {
  margin-bottom: 20px;
  border: 3px solid #409eff;
}

.team-member h4 {
  color: #333;
  margin-bottom: 5px;
  font-size: 1.2em;
}

.member-role {
  color: #409eff;
  font-weight: 500;
  margin-bottom: 10px;
}

.member-desc {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
  font-size: 0.9em;
}

.member-skills {
  display: flex;
  gap: 5px;
  justify-content: center;
  flex-wrap: wrap;
}

/* 联系部分 */
.contact-section {
  margin-bottom: 40px;
}

.contact-card {
  padding: 40px;
}

.contact-info h3,
.contact-form h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.5em;
}

.contact-info p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 30px;
}

.contact-details {
  margin-bottom: 30px;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 15px;
  color: #666;
}

.contact-item .el-icon {
  color: #409eff;
}

.social-links {
  display: flex;
  gap: 10px;
}

/* 页脚 */
.page-footer {
  background: #2c3e50;
  color: white;
  padding: 40px 0 20px;
  margin-top: 60px;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  flex-wrap: wrap;
  gap: 40px;
}

.footer-logo h3 {
  margin: 0 0 10px 0;
  font-size: 1.5em;
}

.footer-logo p {
  color: #bdc3c7;
  margin: 0;
}

.footer-links {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.link-group h4 {
  margin: 0 0 15px 0;
  color: #ecf0f1;
}

.link-group a {
  display: block;
  color: #bdc3c7;
  text-decoration: none;
  margin-bottom: 8px;
  transition: color 0.3s;
}

.link-group a:hover {
  color: #3498db;
}

.footer-bottom {
  text-align: center;
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #34495e;
}

.footer-bottom p {
  margin: 0;
  color: #bdc3c7;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .about-container {
    padding: 15px;
  }
  
  .vision-stats {
    flex-direction: column;
    gap: 20px;
  }
  
  .footer-content {
    flex-direction: column;
    text-align: center;
  }
  
  .footer-links {
    justify-content: center;
  }
  
  .contact-card {
    padding: 20px;
  }
}
</style>