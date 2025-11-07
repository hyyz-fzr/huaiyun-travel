<template>
  <div class="user-agreement">
    <div class="agreement-header">
      <h2>用户协议</h2>
      <p>最后更新日期：2024年1月</p >
    </div>

    <div class="agreement-content">
      <el-scrollbar height="400px">
        <div class="agreement-text">
          <!-- 协议内容 -->
          <section class="agreement-section">
            <h3>一、总则</h3>
            <p>1.1 欢迎您使用"淮韵游踪"平台服务。本协议是您与淮南文化数字传承平台之间就相关服务事宜订立的协议。</p >
            <p>1.2 请您仔细阅读本协议，特别是免除或限制责任的条款、法律适用和争议解决条款。如您不同意本协议，您应立即停止使用本平台。</p >
          </section>

          <section class="agreement-section">
            <h3>二、服务内容</h3>
            <p>2.1 本平台为您提供以下服务：</p >
            <ul>
              <li>淮南文化内容的浏览、发布和分享</li>
              <li>文化遗产信息的查询和学习</li>
              <li>文创产品的展示和购买</li>
              <li>用户间的交流互动</li>
              <li>VR云游览体验</li>
            </ul>
            <p>2.2 我们保留随时变更、中断或终止部分或全部服务的权利。</p >
          </section>

          <section class="agreement-section">
            <h3>三、用户账户</h3>
            <p>3.1 您需要注册账户才能使用部分服务。您应提供真实、准确、完整的注册信息。</p >
            <p>3.2 您对账户安全负全部责任，不得将账户借给他人使用。</p >
            <p>3.3 如发现任何未经授权的使用，请立即通知我们。</p >
          </section>

          <section class="agreement-section">
            <h3>四、用户行为规范</h3>
            <p>4.1 您在使用本平台时，不得：</p >
            <ul>
              <li>发布违法、淫秽、暴力、仇恨等内容</li>
              <li>侵犯他人知识产权</li>
              <li>传播病毒、恶意代码</li>
              <li>干扰平台正常运行</li>
              <li>收集其他用户信息</li>
              <li>发布虚假信息</li>
            </ul>
            <p>4.2 我们有权对违规内容进行处理，包括但不限于删除内容、限制功能、封禁账户。</p >
          </section>

          <section class="agreement-section">
            <h3>五、知识产权</h3>
            <p>5.1 平台内容（包括但不限于文字、图片、音频、视频）的知识产权归我们或相关权利人所有。</p >
            <p>5.2 您发布的内容，您应确保拥有相关权利或已获得授权。</p >
            <p>5.3 未经许可，不得将平台内容用于商业用途。</p >
          </section>

          <section class="agreement-section">
            <h3>六、免责声明</h3>
            <p>6.1 平台按"现状"提供，不保证服务的及时性、安全性、准确性。</p >
            <p>6.2 因不可抗力导致的服务中断，我们不承担责任。</p >
            <p>6.3 您使用平台服务所产生的一切风险由您自行承担。</p >
          </section>

          <section class="agreement-section">
            <h3>七、协议修改</h3>
            <p>7.1 我们有权随时修改本协议，修改后的协议将在平台上公布。</p >
            <p>7.2 如您继续使用服务，视为接受修改后的协议。</p >
          </section>

          <section class="agreement-section">
            <h3>八、法律适用</h3>
            <p>8.1 本协议的订立、执行和解释适用中华人民共和国法律。</p >
            <p>8.2 如发生争议，应友好协商解决；协商不成的，提交有管辖权的人民法院诉讼解决。</p >
          </section>

          <section class="agreement-section">
            <h3>九、联系我们</h3>
            <p>如您对本协议有任何疑问，请联系我们：</p >
            <p>邮箱：contact@huaiyunyouzong.com</p >
            <p>电话：0554-1234567</p >
          </section>
        </div>
      </el-scrollbar>
    </div>

    <div class="agreement-footer">
      <el-button type="primary" @click="$emit('close')">我已阅读并同意</el-button>
    </div>
  </div>
</template>

<script setup>
defineEmits(['close'])
</script>

<style scoped>
.user-agreement {
  padding: 0;
}

.agreement-header {
  text-align: center;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 1px solid #f0f0f0;
}

.agreement-header h2 {
  margin: 0;
  color: #303133;
  font-size: 24px;
}

.agreement-header p {
  margin: 8px 0 0;
  color: #909399;
  font-size: 14px;
}

.agreement-content {
  margin-bottom: 24px;
}

.agreement-text {
  padding: 0 20px;
}

.agreement-section {
  margin-bottom: 24px;
}

.agreement-section h3 {
  margin: 0 0 12px;
  color: #303133;
  font-size: 18px;
  font-weight: 600;
}

.agreement-section p {
  margin: 8px 0;
  color: #606266;
  line-height: 1.6;
  text-align: justify;
}

.agreement-section ul {
  margin: 8px 0;
  padding-left: 20px;
  color: #606266;
}

.agreement-section li {
  margin: 4px 0;
  line-height: 1.6;
}

.agreement-footer {
  text-align: center;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;
}

/* 滚动条样式 */
:deep(.el-scrollbar__bar.is-vertical) {
  right: 2px;
}

:deep(.el-scrollbar__thumb) {
  background-color: rgba(144, 147, 153, 0.3);
}

:deep(.el-scrollbar__thumb:hover) {
  background-color: rgba(144, 147, 153, 0.5);
}
</style>