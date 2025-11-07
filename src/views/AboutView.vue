<template>
<<<<<<< HEAD
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
=======
  <div class="component">
    <h3>AboutView</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('组件功能正常')
}
</script>

<style scoped>
.component {
  padding: 20px;
  text-align: center;
}
</style>