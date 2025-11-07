<template>
  <div class="user-agreement">
    <el-card class="agreement-card">
      <template #header>
        <div class="agreement-header">
          <h2>《淮韵游踪用户协议》</h2>
          <p class="update-time">最后更新日期：2024年1月</p >
        </div>
      </template>

      <div class="agreement-content">
        <!-- 协议导航 -->
        <div class="agreement-nav">
          <el-scrollbar>
            <div class="nav-items">
              <div 
                v-for="item in navItems" 
                :key="item.id"
                class="nav-item"
                :class="{ active: activeNav === item.id }"
                @click="scrollToSection(item.id)"
              >
                {{ item.title }}
              </div>
            </div>
          </el-scrollbar>
        </div>

        <!-- 协议内容 -->
        <div class="agreement-text" ref="agreementContent">
          <!-- 前言 -->
          <section id="preface" class="agreement-section">
            <h3>前言</h3>
            <p>欢迎您使用淮韵游踪 - 淮南文化数字传承平台（以下简称"本平台"）。在注册成为本平台用户前，请您仔细阅读本《用户协议》（以下简称"本协议"）。</p >
            <p>本协议阐述之条款和条件适用于您使用本平台提供的各种工具和服务（以下简称"服务"）。</p >
          </section>

          <!-- 协议接受 -->
          <section id="acceptance" class="agreement-section">
            <h3>一、协议的接受</h3>
            <p>1.1 您通过本平台注册页面点击"同意"按钮完成注册，或实际使用本平台服务，即表示您已充分阅读、理解并接受本协议的全部内容。</p >
            <p>1.2 如果您不同意本协议的任意内容，或者无法准确理解本协议任何条款的含义，请不要进行后续操作。</p >
            <p>1.3 本平台有权根据需要不时地制定、修改本协议，如本协议有任何变更，本平台将在网站上公布修改内容。修改后的协议一经公布即有效代替原来的协议。</p >
          </section>

          <!-- 用户注册 -->
          <section id="registration" class="agreement-section">
            <h3>二、用户注册</h3>
            <p>2.1 您确认，在您完成注册程序时，您应当是具备完全民事权利能力和完全民事行为能力的自然人、法人或其他组织。</p >
            <p>2.2 您同意按照本平台注册页面的要求提供准确、真实、完整的个人信息，包括但不限于您的姓名、身份证号、联系地址、联系电话等。</p >
            <p>2.3 您承诺不使用他人信息在平台注册，不得冒充他人或利用他人名义发布任何信息。</p >
            <p>2.4 如您违反上述规定，本平台有权采取拒绝注册、注销账号等措施，并保留追究相关责任的权利。</p >
          </section>

          <!-- 账号安全 -->
          <section id="account-security" class="agreement-section">
            <h3>三、账号安全</h3>
            <p>3.1 您有责任维护个人账号、密码的安全性与保密性，并对您在该账号下的所有行为承担完全责任。</p >
            <p>3.2 您同意在任何情况下不向他人透露账号或密码信息。因您保管不善可能导致账号被盗用，责任由您自行承担。</p >
            <p>3.3 如发现任何未经授权使用您账号的情况，请立即通知本平台。您理解本平台对您的任何请求采取行动均需要合理时间，且本平台应您请求而采取的行动可能无法避免或预防侵害后果的形成或扩大，除本平台存在法定过错外，本平台不承担责任。</p >
          </section>

          <!-- 用户行为规范 -->
          <section id="user-conduct" class="agreement-section">
            <h3>四、用户行为规范</h3>
            <p>4.1 您在使用本平台服务时，必须遵守中华人民共和国相关法律法规的规定，您应同意将不会利用本服务进行任何违法或不正当的活动，包括但不限于下列行为∶</p >
            <ul class="prohibited-list">
              <li>发布、传送、传播、储存危害国家安全统一、破坏社会稳定、违反公序良俗、侮辱、诽谤、淫秽、暴力以及任何违反国家法律法规的内容；</li>
              <li>发布、传送、传播、储存侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的内容；</li>
              <li>虚构事实、隐瞒真相以误导、欺骗他人；</li>
              <li>发布、传送、传播广告信息及垃圾信息；</li>
              <li>其他法律法规禁止的行为。</li>
            </ul>
            
            <p>4.2 您不得利用本平台服务从事以下活动：</p >
            <ul class="prohibited-list">
              <li>未经允许，进入计算机信息网络或者使用计算机信息网络资源的；</li>
              <li>未经允许，对计算机信息网络功能进行删除、修改或者增加的；</li>
              <li>未经允许，对进入计算机信息网络中存储、处理或者传输的数据和应用程序进行删除、修改或者增加的；</li>
              <li>故意制作、传播计算机病毒等破坏性程序的；</li>
              <li>其他危害计算机信息网络安全的行为。</li>
            </ul>
          </section>

          <!-- 内容发布规范 -->
          <section id="content-guidelines" class="agreement-section">
            <h3>五、内容发布规范</h3>
            <p>5.1 您在本平台发布的内容（包括但不限于帖子、评论、图片、视频等）应符合淮南文化传承的宗旨，弘扬中华优秀传统文化。</p >
            <p>5.2 您应对您发布的内容承担全部责任，确保内容：</p >
            <ul class="guidelines-list">
              <li>真实、准确，不传播虚假信息；</li>
              <li>尊重历史事实，不歪曲文化传统；</li>
              <li>积极向上，传播正能量；</li>
              <li>不侵犯他人合法权益；</li>
              <li>不涉及商业广告宣传。</li>
            </ul>
            
            <p>5.3 您理解并同意，本平台有权对您发布的内容进行审核，并根据情况采取删除、屏蔽等措施。</p >
            <p>5.4 您授予本平台在全球范围内永久性、不可撤销的、免费的、非独家的许可，使用、复制、修改、改编、出版、翻译、创作衍生作品、传播、表演和展示您发布的内容。</p >
          </section>

          <!-- 知识产权 -->
          <section id="intellectual-property" class="agreement-section">
            <h3>六、知识产权</h3>
            <p>6.1 本平台在本服务中提供的内容（包括但不限于网页、文字、图片、音频、视频、图表等）的知识产权归本平台所有。</p >
            <p>6.2 除另有特别声明外，本平台提供本服务时所依托软件的著作权、专利权及其他知识产权均归本平台所有。</p >
            <p>6.3 上述及其他任何本服务包含的内容的知识产权均受到法律保护，未经本平台书面许可，您不得以任何形式进行使用或创造相关衍生作品。</p >
            <p>6.4 您在使用本平台服务时上传、发布的内容，您应保证其为著作权人或已取得合法授权，并且该内容不会侵犯任何第三方的合法权益。</p >
          </section>

          <!-- 隐私保护 -->
          <section id="privacy" class="agreement-section">
            <h3>七、隐私保护</h3>
            <p>7.1 保护用户隐私是本平台的一项基本政策，本平台保证不对外公开或向第三方提供单个用户的注册资料及用户在使用网络服务时存储在本平台的非公开内容，但下列情况除外：</p >
            <ul class="privacy-list">
              <li>事先获得用户的明确授权；</li>
              <li>根据有关的法律法规要求；</li>
              <li>按照相关政府主管部门的要求；</li>
              <li>为维护社会公众的利益；</li>
              <li>为维护本平台的合法权益。</li>
            </ul>
            
            <p>7.2 本平台可能会与第三方合作向用户提供相关的网络服务，在此情况下，如该第三方同意承担与本平台同等的保护用户隐私的责任，则本平台有权将用户的注册资料等提供给该第三方。</p >
            <p>7.3 在不透露单个用户隐私资料的前提下，本平台有权对整个用户数据库进行分析并对用户数据库进行商业上的利用。</p >
          </section>

          <!-- 免责声明 -->
          <section id="disclaimer" class="agreement-section">
            <h3>八、免责声明</h3>
            <p>8.1 您理解并同意，本平台的服务是按照现有技术和条件所能达到的现状提供的。本平台会尽最大努力向您提供服务，确保服务的连贯性和安全性；但本平台不能随时预见和防范法律、技术以及其他风险，包括但不限于不可抗力、病毒、木马、黑客攻击、系统不稳定、第三方服务瑕疵、政府行为等原因可能导致的服务中断、数据丢失以及其他的损失和风险。</p >
            <p>8.2 对于因不可抗力或本平台不能控制的原因造成的服务中断或其它缺陷，本平台不承担任何责任，但将尽力减少因此而给您造成的损失和影响。</p >
            <p>8.3 您理解并同意，在使用本平台服务过程中，可能遇到不可抗力等因素（不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件），包括但不限于自然灾害、战争、动乱、政府行为等。</p >
          </section>

          <!-- 服务变更与终止 -->
          <section id="service-changes" class="agreement-section">
            <h3>九、服务变更、中断或终止</h3>
            <p>9.1 如因系统维护或升级的需要而需暂停网络服务，本平台将尽可能事先进行通告。</p >
            <p>9.2 如发生下列任何一种情形，本平台有权随时中断或终止向您提供本协议项下的网络服务而无需通知您：</p >
            <ul class="termination-list">
              <li>您提供的个人资料不真实；</li>
              <li>您违反本协议中规定的使用规则；</li>
              <li>您在使用收费服务时未按规定向本平台支付相应的服务费；</li>
              <li>其他违反法律法规或本平台规定的情形。</li>
            </ul>
          </section>

          <!-- 法律适用与管辖 -->
          <section id="governance" class="agreement-section">
            <h3>十、法律适用与管辖</h3>
            <p>10.1 本协议的订立、执行和解释及争议的解决均应适用中华人民共和国法律。</p >
            <p>10.2 如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向本平台所在地的人民法院提起诉讼。</p >
          </section>

          <!-- 其他规定 -->
          <section id="miscellaneous" class="agreement-section">
            <h3>十一、其他规定</h3>
            <p>11.1 本协议构成双方对本协议之约定事项及其他有关事宜的完整协议，除本协议规定的之外，未赋予本协议各方其他权利。</p >
            <p>11.2 如本协议中的任何条款无论因何种原因完全或部分无效或不具有执行力，本协议的其余条款仍应有效并且有约束力。</p >
            <p>11.3 本协议中的标题仅为方便而设，在解释本协议时应被忽略。</p >
          </section>

          <!-- 联系我们 -->
          <section id="contact" class="agreement-section">
            <h3>十二、联系我们</h3>
            <p>如果您对本协议有任何疑问、意见或建议，或者需要举报投诉，请通过以下方式与我们联系：</p >
            <div class="contact-info">
              <p>📧 邮箱：contact@huaiyun.com</p >
              <p>🌐 网站：https://huaiyun-travel.netlify.app</p >
              <p>📍 地址：安徽省淮南市文化传承中心</p >
            </div>
          </section>
        </div>
      </div>

      <template #footer>
        <div class="agreement-footer">
          <el-button 
            type="primary" 
            size="large" 
            @click="handleAgree"
            v-if="showAgreeButton"
          >
            我已阅读并同意以上协议
          </el-button>
          <el-button 
            @click="handleClose"
            v-if="showCloseButton"
          >
            关闭
          </el-button>
        </div>
      </template>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { ElMessage } from 'element-plus'

const props = defineProps({
  // 是否显示同意按钮
  showAgreeButton: {
    type: Boolean,
    default: true
  },
  // 是否显示关闭按钮
  showCloseButton: {
    type: Boolean,
    default: true
  },
  // 是否自动滚动到最新更新内容
  autoScroll: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['agree', 'close'])

const activeNav = ref('preface')
const agreementContent = ref(null)

// 导航项配置
const navItems = ref([
  { id: 'preface', title: '前言' },
  { id: 'acceptance', title: '协议接受' },
  { id: 'registration', title: '用户注册' },
  { id: 'account-security', title: '账号安全' },
  { id: 'user-conduct', title: '行为规范' },
  { id: 'content-guidelines', title: '内容规范' },
  { id: 'intellectual-property', title: '知识产权' },
  { id: 'privacy', title: '隐私保护' },
  { id: 'disclaimer', title: '免责声明' },
  { id: 'service-changes', title: '服务变更' },
  { id: 'governance', title: '法律适用' },
  { id: 'miscellaneous', title: '其他规定' },
  { id: 'contact', title: '联系我们' }
])

onMounted(() => {
  // 设置滚动监听
  if (agreementContent.value) {
    agreementContent.value.addEventListener('scroll', handleScroll)
  }

  // 如果需要自动滚动到最新内容
  if (props.autoScroll) {
    nextTick(() => {
      scrollToSection('miscellaneous')
    })
  }
})
// 处理滚动，更新激活的导航项
const handleScroll = () => {
  if (!agreementContent.value) return

  const sections = agreementContent.value.querySelectorAll('.agreement-section')
  const scrollTop = agreementContent.value.scrollTop
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100
    const sectionBottom = sectionTop + section.offsetHeight
    
    if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
      activeNav.value = section.id
    }
  })
}

// 滚动到指定章节
const scrollToSection = (sectionId) => {
  const section = document.getElementById(sectionId)
  if (section && agreementContent.value) {
    agreementContent.value.scrollTo({
      top: section.offsetTop - 80,
      behavior: 'smooth'
    })
    activeNav.value = sectionId
  }
}

// 处理同意协议
const handleAgree = () => {
  ElMessage.success('您已同意用户协议')
  emit('agree')
}

// 处理关闭
const handleClose = () => {
  emit('close')
}

// 暴露方法给父组件
defineExpose({
  scrollToSection
})
</script>

<style scoped lang="scss">
.user-agreement {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.agreement-card {
  min-height: 600px;
  
  :deep(.el-card__header) {
    padding: 24px;
    border-bottom: 1px solid #e6e8eb;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    
    .agreement-header {
      text-align: center;
      color: white;
      
      h2 {
        margin: 0 0 8px 0;
        font-size: 1.8em;
        font-weight: 600;
      }
      
      .update-time {
        margin: 0;
        opacity: 0.9;
        font-size: 0.9em;
      }
    }
  }
  
  :deep(.el-card__body) {
    padding: 0;
    display: flex;
    height: 600px;
  }
}

.agreement-content {
  display: flex;
  width: 100%;
  height: 100%;
}

.agreement-nav {
  width: 200px;
  border-right: 1px solid #e6e8eb;
  background: #f8f9fa;
  
  .nav-items {
    padding: 16px 0;
  }
  
  .nav-item {
    padding: 12px 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border-left: 3px solid transparent;
    font-size: 14px;
    color: #606266;
    
    &:hover {
      background: #eef0f3;
      color: #409eff;
    }
    
    &.active {
      background: #ecf5ff;
      color: #409eff;
      border-left-color: #409eff;
      font-weight: 500;
    }
  }
}

.agreement-text {
  flex: 1;
  padding: 24px;
  overflow-y: auto;
  height: 100%;
  line-height: 1.6;
}

.agreement-section {
  margin-bottom: 32px;
  
  h3 {
    color: #303133;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 2px solid #409eff;
    font-size: 1.3em;
    font-weight: 600;
  }
  
  p {
    margin-bottom: 12px;
    color: #606266;
    text-align: justify;
  }
}

.prohibited-list,
.guidelines-list,
.privacy-list,
.termination-list {
  margin: 12px 0;
  padding-left: 24px;
  
  li {
    margin-bottom: 8px;
    color: #606266;
    line-height: 1.5;
  }
}

.prohibited-list li {
  color: #f56c6c;
}

.guidelines-list li {
  color: #67c23a;
}

.contact-info {
  background: #f0f9ff;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #409eff;
  
  p {
    margin: 8px 0;
    color: #303133;
    font-weight: 500;
  }
}

.agreement-footer {
  text-align: center;
  padding: 16px;
  
  .el-button {
    min-width: 160px;
    margin: 0 8px;
  }
}

// 响应式设计
@media (max-width: 768px) {
  .user-agreement {
    padding: 10px;
  }
  
  .agreement-content {
    flex-direction: column;
    height: auto;
  }
  
  .agreement-nav {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #e6e8eb;
    
    .nav-items {
      display: flex;
      overflow-x: auto;
      padding: 12px 16px;
      
      .nav-item {
        white-space: nowrap;
        border-left: none;
        border-bottom: 2px solid transparent;
        padding: 8px 16px;
        
        &.active {
          border-left-color: transparent;
          border-bottom-color: #409eff;
        }
      }
    }
  }
  
  .agreement-text {
    padding: 16px;
  }
  
  .agreement-footer {
    .el-button {
      width: 100%;
      margin: 4px 0;
    }
  }
}

// 滚动条样式
:deep(.el-scrollbar__bar) {
  opacity: 0.6;
}

:deep(.el-scrollbar__thumb) {
  background-color: #c0c4cc;
  
  &:hover {
    background-color: #909399;
  }
}

// 打印样式
@media print {
  .agreement-nav,
  .agreement-footer {
    display: none;
  }
  
  .agreement-card {
    border: none;
    box-shadow: none;
  }
  
  .agreement-content {
    height: auto;
  }
}
</style>
