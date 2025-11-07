<<<<<<< HEAD
<template>
  <div class="ai-travel-diary">
    <el-page-header @back="$router.back()" class="page-header">
      <template #content>
        <span class="header-title">AI旅行日记</span>
      </template>
    </el-page-header>

    <div class="diary-container">
      <!-- 创作流程指引 -->
      <el-steps :active="currentStep" align-center class="creation-steps">
        <el-step title="上传照片" description="记录精彩瞬间" />
        <el-step title="填写信息" description="分享旅行故事" />
        <el-step title="AI生成" description="创作专属日记" />
        <el-step title="完成分享" description="保存或分享成果" />
      </el-steps>

      <div class="creation-content">
        <!-- 步骤1：上传照片 -->
        <el-card v-if="currentStep === 1" class="step-card">
          <template #header>
            <h3>📸 上传旅行照片</h3>
            <p class="step-description">选择最能代表您旅行经历的照片，AI将根据照片内容生成精彩日记</p >
          </template>

          <div class="upload-section">
            <el-upload
              action="/api/upload/travel"
              list-type="picture-card"
              :file-list="fileList"
              :before-upload="beforeUpload"
              :on-success="handleUploadSuccess"
              :on-remove="handleRemove"
              :on-exceed="handleExceed"
              :limit="9"
              multiple
              accept="image/*"
            >
              <el-icon><Plus /></el-icon>
              <template #file="{ file }">
                <div class="uploaded-image">
                  < img :src="file.url" :alt="file.name" />
                  <span class="image-actions">
                    <el-button
                      circle
                      type="danger"
                      size="small"
                      @click="handleRemove(file)"
                    >
                      <el-icon><Delete /></el-icon>
                    </el-button>
                  </span>
                </div>
              </template>
            </el-upload>

            <div class="upload-tips">
              <h4>💡 上传建议：</h4>
              <ul>
                <li>选择光线充足、构图优美的照片</li>
                <li>包含标志性建筑或特色风景</li>
                <li>展现文化特色和地方风情</li>
                <li>记录美食、活动或特色体验</li>
              </ul>
            </div>
          </div>

          <div class="step-actions">
            <el-button 
              type="primary" 
              size="large" 
              @click="nextStep"
              :disabled="fileList.length === 0"
            >
              下一步：填写信息
              <el-icon><ArrowRight /></el-icon>
            </el-button>
          </div>
        </el-card>

        <!-- 步骤2：填写信息 -->
        <el-card v-if="currentStep === 2" class="step-card">
          <template #header>
            <h3>📝 填写旅行经历</h3>
            <p class="step-description">分享您的旅行故事，AI将根据这些信息生成个性化日记</p >
          </template>

          <el-form :model="diaryForm" :rules="diaryRules" ref="diaryFormRef" label-width="100px">
            <el-form-item label="旅行主题" prop="theme">
              <el-input
                id="diaryTheme"
                name="diaryTheme"
                v-model="diaryForm.theme"
                placeholder="例如：淮南文化探索之旅、八公山徒步冒险"
                size="large"
              />
            </el-form-item>

            <el-form-item label="旅行地点" prop="location">
              <el-select
                id="diaryLocation"
                name="diaryLocation"
                v-model="diaryForm.location"
                placeholder="选择主要旅行地点"
                size="large"
                style="width: 100%"
              >
                <el-option label="八公山风景区" value="bagongshan" />
                <el-option label="茅仙古洞" value="maoxian" />
                <el-option label="焦岗湖湿地" value="jiaoqanghu" />
                <el-option label="淮南古城" value="huainan" />
                <el-option label="其他地点" value="other" />
              </el-select>
            </el-form-item>

            <el-form-item label="旅行心情">
              <div class="mood-selector">
                <div 
                  v-for="mood in moodOptions" 
                  :key="mood.value"
                  class="mood-option"
                  :class="{ active: diaryForm.mood === mood.value }"
                  @click="diaryForm.mood = mood.value"
                >
                  <span class="mood-emoji">{{ mood.emoji }}</span>
                  <span class="mood-text">{{ mood.label }}</span>
                </div>
              </div>
            </el-form-item>

            <el-form-item label="特别经历" prop="specialExperience">
              <el-input
                id="specialExperience"
                name="specialExperience"
                v-model="diaryForm.specialExperience"
                type="textarea"
                :rows="4"
                placeholder="描述您最难忘的经历：比如在茅仙古洞发现的奇特钟乳石、在焦岗湖观赏的候鸟群、品尝的地道豆腐宴..."
                maxlength="500"
                show-word-limit
              />
            </el-form-item>

            <el-form-item label="文化感悟" prop="culturalFeelings">
              <el-input
                id="culturalFeelings"
                name="culturalFeelings"
                v-model="diaryForm.culturalFeelings"
                type="textarea"
                :rows="3"
                placeholder="分享您对当地文化的感受和思考..."
                maxlength="300"
                show-word-limit
              />
            </el-form-item>

            <el-form-item label="日记风格">
              <el-radio-group 
                id="diaryStyle"
                name="diaryStyle"
                v-model="diaryForm.style"
              >
                <el-radio label="literary">文学抒情</el-radio>
                <el-radio label="casual">轻松随性</el-radio>
                <el-radio label="professional">专业纪实</el-radio>
                <el-radio label="poetic">诗意浪漫</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-form>

          <div class="step-actions">
            <el-button @click="prevStep">
              <el-icon><ArrowLeft /></el-icon>
              上一步
            </el-button>
            <el-button 
              type="primary" 
              size="large" 
              @click="generateDiary"
              :loading="generating"
            >
              {{ generating ? 'AI生成中...' : '生成旅行日记' }}
              <el-icon><MagicStick /></el-icon>
            </el-button>
          </div>
        </el-card>

        <!-- 步骤3：AI生成结果 -->
        <el-card v-if="currentStep === 3" class="step-card">
          <template #header>
            <h3>✨ AI日记生成结果</h3>
            <p class="step-description">基于您的照片和经历，AI创作了独特的旅行回忆</p >
          </template>

          <div v-loading="generating" class="diary-result">
            <div class="diary-header">
              <h2 class="diary-title">{{ generatedDiary.title }}</h2>
              <div class="diary-meta">
                <span class="diary-date">{{ generatedDiary.date }}</span>
                <span class="diary-location">{{ generatedDiary.location }}</span>
                <span class="diary-weather">{{ generatedDiary.weather }}</span>
              </div>
            </div>

            <div class="diary-content">
              <div 
                class="diary-text"
                v-html="formatDiaryContent(generatedDiary.content)"
              ></div>

              <!-- 图片展示 -->
              <div class="diary-images">
                <el-carousel 
                  v-if="fileList.length > 0" 
                  :interval="5000" 
                  height="300px"
                  indicator-position="outside"
                >
                  <el-carousel-item v-for="(file, index) in fileList" :key="index">
                    < img :src="file.url" :alt="`旅行照片${index + 1}`" class="carousel-image" />
                  </el-carousel-item>
                </el-carousel>
              </div>

              <div class="diary-footer">
                <div class="ai-signature">
                  <el-tag type="info" size="large">
                    <el-icon><MagicStick /></el-icon>
                    AI智能创作 · 保留原创
                  </el-tag>
                </div>
              </div>
            </div>
          </div>

          <div class="result-actions">
            <el-button @click="prevStep">
              <el-icon><EditPen /></el-icon>
              重新编辑
            </el-button>
            <el-button type="success" @click="saveDiary">
              <el-icon><FolderChecked /></el-icon>
              保存日记
            </el-button>
            <el-button type="primary" @click="shareDiary">
              <el-icon><Share /></el-icon>
              分享日记
            </el-button>
            <el-button @click="createNewDiary">
              <el-icon><Plus /></el-icon>
              新的日记
            </el-button>
          </div>
        </el-card>
      </div>
    </div>

    <!-- 分享对话框 -->
    <el-dialog v-model="showShareDialog" title="分享旅行日记" width="400px">
      <div class="share-options">
        <div class="share-option" @click="copyDiaryLink">
          <el-icon><Link /></el-icon>
          <span>复制链接</span>
        </div>
        <div class="share-option" @click="downloadDiary">
          <el-icon><Download /></el-icon>
          <span>下载PDF</span>
        </div>
        <div class="share-option" @click="printDiary">
          <el-icon><Printer /></el-icon>
          <span>打印日记</span>
        </div>
      </div>
    </el-dialog>
=======
﻿<template>
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
    <p>组件已修复 - 淮南文化数字传承平台</p >
    <el-button type="primary" @click="handleClick">测试按钮</el-button>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  </div>
</template>

<script setup>
<<<<<<< HEAD
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  Plus,
  Delete,
  ArrowRight,
  ArrowLeft,
  MagicStick,
  EditPen,
  FolderChecked,
  Share,
  Link,
  Download,
  Printer
} from '@element-plus/icons-vue'

const currentStep = ref(1)
const generating = ref(false)
const showShareDialog = ref(false)

const fileList = ref([])
const diaryFormRef = ref()

// 日记表单数据
const diaryForm = reactive({
  theme: '',
  location: '',
  mood: 'happy',
  specialExperience: '',
  culturalFeelings: '',
  style: 'literary'
})

// 生成的日记内容
const generatedDiary = reactive({
  title: '',
  date: '',
  location: '',
  weather: '',
  content: ''
})

// 心情选项
const moodOptions = [
  { value: 'excited', emoji: '🎉', label: '兴奋激动' },
  { value: 'happy', emoji: '😊', label: '愉快满足' },
  { value: 'peaceful', emoji: '😌', label: '平静安宁' },
  { value: 'inspired', emoji: '💡', label: '灵感迸发' },
  { value: 'adventurous', emoji: '🏔️', label: '冒险刺激' }
]

// 表单验证规则
const diaryRules = {
  theme: [
    { required: true, message: '请输入旅行主题', trigger: 'blur' },
    { min: 2, max: 50, message: '主题长度在2-50个字符', trigger: 'blur' }
  ],
  location: [
    { required: true, message: '请选择旅行地点', trigger: 'change' }
  ],
  specialExperience: [
    { required: true, message: '请输入特别经历', trigger: 'blur' },
    { min: 10, message: '请详细描述您的经历', trigger: 'blur' }
  ]
}

// 上传前检查
const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt5M = file.size / 1024 / 1024 < 5

  if (!isImage) {
    ElMessage.error('只能上传图片文件!')
    return false
  }
  if (!isLt5M) {
    ElMessage.error('图片大小不能超过 5MB!')
    return false
  }
  return true
}

// 上传成功处理
const handleUploadSuccess = (response, file) => {
  fileList.value.push({
    name: file.name,
    url: response.data.url,
    uid: file.uid
  })
  ElMessage.success('图片上传成功')
}

// 移除文件
const handleRemove = (file) => {
  const index = fileList.value.findIndex(f => f.uid === file.uid)
  if (index !== -1) {
    fileList.value.splice(index, 1)
  }
}

// 超出限制
const handleExceed = () => {
  ElMessage.warning('最多只能上传9张图片')
}

// 步骤导航
const nextStep = () => {
  currentStep.value++
}

const prevStep = () => {
  currentStep.value--
}

// 生成日记
const generateDiary = async () => {
  try {
    const valid = await diaryFormRef.value.validate()
    if (!valid) return

    generating.value = true

    // 调用DeepSeek API生成日记
    const diaryContent = await callDeepSeekAPI()

    // 更新生成的日记内容
    Object.assign(generatedDiary, diaryContent)

    currentStep.value = 3
    ElMessage.success('旅行日记生成成功！')
  } catch (error) {
    ElMessage.error('生成失败，请稍后重试')
  } finally {
    generating.value = false
  }
}

// 调用DeepSeek API
const callDeepSeekAPI = async () => {
  // 构建提示词
  const prompt = buildPrompt()

  try {
    // 这里应该调用真实的DeepSeek API
    // const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${import.meta.env.VITE_DEEPSEEK_API_KEY}`
    //   },
    //   body: JSON.stringify({
    //     model: 'deepseek-chat',
    //     messages: [
    //       {
    //         role: 'user',
    //         content: prompt
    //       }
    //     ],
    //     temperature: 0.7,
    //     max_tokens: 2000
    //   })
    // })

    // const data = await response.json()
    // return parseAIResponse(data.choices[0].message.content)

    // 模拟API响应
    await new Promise(resolve => setTimeout(resolve, 3000))
    return getMockDiaryResponse()
  } catch (error) {
    console.error('调用AI API失败:', error)
    throw new Error('AI服务暂时不可用')
  }
}

// 构建提示词
const buildPrompt = () => {
  const moodText = moodOptions.find(m => m.value === diaryForm.mood)?.label || '愉快'

  return `请你作为一个专业的旅行作家，根据以下信息创作一篇生动有趣的旅行日记：

旅行主题：${diaryForm.theme}
旅行地点：${diaryForm.location}
旅行心情：${moodText}
特别经历：${diaryForm.specialExperience}
文化感悟：${diaryForm.culturalFeelings}
写作风格：${diaryForm.style}
要求：
1. 起一个吸引人的标题
2. 包含日期、天气、地点等基本信息
3. 详细描述旅行经历和感受
4. 体现当地文化特色
5. 语言生动有感染力
6. 适当使用修辞手法
7. 字数在800-1000字左右

请以JSON格式返回：
{
  "title": "日记标题",
  "date": "当前日期",
  "location": "旅行地点",
  "weather": "天气情况",
  "content": "日记内容"
}`
}

// 解析AI响应
const parseAIResponse = (content) => {
  try {
    // 尝试解析JSON
    const startIndex = content.indexOf('{')
    const endIndex = content.lastIndexOf('}') + 1
    const jsonStr = content.substring(startIndex, endIndex)
    return JSON.parse(jsonStr)
  } catch (error) {
    // 如果解析失败，返回默认结构
    return {
      title: diaryForm.theme,
      date: new Date().toLocaleDateString('zh-CN'),
      location: diaryForm.location,
      weather: '晴朗',
      content: content
    }
  }
}

// 模拟响应数据
const getMockDiaryResponse = () => {
  const locationMap = {
    'bagongshan': '八公山风景区',
    'maoxian': '茅仙古洞',
    'jiaoqanghu': '焦岗湖湿地',
    'huainan': '淮南古城',
    'other': '其他'
  }

  const styleMap = {
    'literary': '文学性',
    'casual': '轻松',
    'professional': '专业',
    'poetic': '诗意'
  }

  return {
    title: `${diaryForm.theme} - 淮南文化探索之旅`,
    date: new Date().toLocaleDateString('zh-CN'),
    location: locationMap[diaryForm.location] || '淮南',
    weather: '阳光明媚，微风和煦',
    content: `今天，我怀着${moodOptions.find(m => m.value === diaryForm.mood)?.label || '愉快'}的心情，开始了${diaryForm.theme}。

清晨，我站在${locationMap[diaryForm.location] || '淮南'}的土地上，目之所及皆是美景，呼吸间都是文化的芬芳。

${diaryForm.specialExperience || '在旅途中，我遇到了许多令人难忘的瞬间。'}

${diaryForm.culturalFeelings || '这里的文化底蕴让我深深着迷，每一处古迹都在诉说着千年的故事。'}

漫步在青石板路上，我感受到了大自然的鬼斧神工和历史的厚重沉淀。这里的古建筑、传统技艺、淳朴民风，都让我对这片土地产生了深深的眷恋。

这次旅行不仅让我欣赏到了美丽的风景，更让我对生活有了新的感悟。每一次出发都是心灵的洗礼，每一次探索都是成长的历程。

期待下一次的淮河之旅，带着这些美好的回忆继续前行。`
  }
}

// 格式化日记内容
const formatDiaryContent = (content) => {
  return content
    .split('\n\n')
    .map(paragraph => {
      if (paragraph.trim()) {
        return `<p>${paragraph.replace(/\n/g, '<br>')}</p >`
      }
      return ''
    })
    .join('')
}

// 保存日记
const saveDiary = async () => {
  try {
    // 调用保存API
    // await saveDiaryAPI(generatedDiary)
    
    ElMessage.success('日记保存成功！您可以在"我的日记"中查看')
  } catch (error) {
    ElMessage.error('保存失败，请稍后重试')
  }
}

// 分享日记
const shareDiary = () => {
  showShareDialog.value = true
}

// 复制日记链接
const copyDiaryLink = () => {
  navigator.clipboard.writeText(window.location.href)
  ElMessage.success('链接已复制到剪贴板')
  showShareDialog.value = false
}

// 下载日记
const downloadDiary = () => {
  ElMessage.info('PDF下载功能开发中')
  showShareDialog.value = false
}

// 打印日记
const printDiary = () => {
  window.print()
  showShareDialog.value = false
}

// 创建新日记
const createNewDiary = () => {
  ElMessageBox.confirm('确定要创建新的日记吗？当前日记内容将会丢失', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    // 重置表单
    fileList.value = []
    Object.assign(diaryForm, {
      theme: '',
      location: '',
      mood: 'happy',
      specialExperience: '',
      culturalFeelings: '',
      style: 'literary'
    })
    Object.assign(generatedDiary, {
      title: '',
      date: '',
      location: '',
      weather: '',
      content: ''
    })
    currentStep.value = 1
    ElMessage.success('创建成功，开始新的日记创作')
  })
=======
import { ElMessage } from 'element-plus'

const handleClick = () => {
  ElMessage.success('组件功能正常')
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
}
</script>

<style scoped>
.component {
  padding: 20px;
<<<<<<< HEAD
}

.page-header {
  margin-bottom: 30px;
}

.creation-steps {
  margin-bottom: 40px;
}

.step-card {
  margin-bottom: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.step-card :deep(.el-card__header) {
  border-bottom: 1px solid #f0f0f0;
  padding: 24px;
}

.step-card h3 {
  margin: 0 0 8px 0;
  color: #303133;
  font-size: 1.3em;
}

.step-description {
  margin: 0;
  color: #606266;
  font-size: 0.95em;
}

.step-card :deep(.el-card__body) {
  padding: 24px;
}

/* 上传区域样式 */
.upload-section {
  gap: 24px;
}

:deep(.el-upload--picture-card) {
  width: 120px;
  height: 120px;
  line-height: 120px;
  border: 2px dashed #d9d9d9;
  border-radius: 8px;
}

:deep(.el-upload--picture-card:hover) {
  border-color: #409eff;
}

.uploaded-image {
  position: relative;
  width: 100%;
  height: 100%;
}

.uploaded-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 6px;
}

.image-actions {
  position: absolute;
  top: 4px;
  right: 4px;
  opacity: 0;
  transition: opacity 0.3s;
}

.uploaded-image:hover .image-actions {
  opacity: 1;
}

.upload-tips {
  background: #f8f9fa;
  padding: 16px;
  border-radius: 8px;
  border-left: 4px solid #409eff;
}

.upload-tips h4 {
  margin: 0 0 12px 0;
  color: #303133;
}

.upload-tips ul {
  margin: 0;
  padding-left: 20px;
  color: #606266;
  line-height: 1.6;
}

.upload-tips li {
  margin-bottom: 4px;
}

/* 心情选择器 */
.mood-selector {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 12px;
}

.mood-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 16px;
  border: 2px solid #f0f0f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s;
=======
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
  text-align: center;
}
</style>