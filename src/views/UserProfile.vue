<template>
<<<<<<< HEAD
  <div class="profile-container">
    <!-- 页面头部 -->
    <div class="profile-header">
      <el-page-header @back="$router.back()" content="个人中心" />
    </div>

    <el-row :gutter="20" class="profile-content">
      <!-- 左侧：用户信息卡片 -->
      <el-col :xs="24" :sm="8">
        <el-card class="user-card">
          <div class="user-avatar-section">
            <img src="/images/heritage/1" class="heritage-image" />
            <el-avatar :size="120" :src="userInfo.avatar" class="user-avatar">
              {{ userInfo.nickname?.charAt(0) || '用' }}
            </el-avatar>
            <h2 class="username">{{ userInfo.nickname || '用户' }}</h2>
            <p class="user-bio">淮南文化爱好者</p >
            <el-tag type="success" class="user-level">文化探索者</el-tag>
          </div>

          <div class="user-stats">
            <div class="stat-item">
              <div class="stat-number">{{ userStats.postCount }}</div>
              <div class="stat-label">发布的帖子</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userStats.collectionCount }}</div>
              <div class="stat-label">收藏内容</div>
            </div>
            <div class="stat-item">
              <div class="stat-number">{{ userStats.bookingCount }}</div>
              <div class="stat-label">活动预订</div>
            </div>
          </div>

          <el-button type="primary" class="edit-btn" @click="editProfile">
            <el-icon><Edit /></el-icon>
            编辑资料
          </el-button>
        </el-card>
      </el-col>

      <!-- 右侧：内容区域 -->
      <el-col :xs="24" :sm="16">
        <el-tabs v-model="activeTab" class="profile-tabs">
          <!-- 我的帖子 -->
          <el-tab-pane label="我的帖子" name="posts">
            <div class="tab-content">
              <el-card v-for="post in myPosts" :key="post.id" class="post-item">
                <div class="post-header">
                  <div class="post-info">
                    <h3 class="post-title">{{ post.title }}</h3>
                    <p class="post-excerpt">{{ post.content }}</p >
                    <div class="post-meta">
                      <span class="post-time">{{ post.createTime }}</span>
                      <span class="post-views">
                        <el-icon><View /></el-icon>
                        {{ post.viewCount }}
                      </span>
                      <span class="post-likes">
                        <el-icon><Star /></el-icon>
                        {{ post.likeCount }}
                      </span>
                    </div>
                  </div>
                  <!-- 🖼️ 帖子封面图片 - 这里放帖子相关图片 -->
                  <img v-if="post.coverImage" :src="post.coverImage" class="post-cover" />
                </div>
                <div class="post-actions">
                  <el-button size="small" @click="editPost(post.id)">
                    <el-icon><Edit /></el-icon>
                    编辑
                  </el-button>
                  <el-button size="small" type="danger" @click="deletePost(post.id)">
                    <el-icon><Delete /></el-icon>
                    删除
                  </el-button>
                </div>
              </el-card>
              
              <el-empty v-if="myPosts.length === 0" description="暂无发布的帖子">
                <el-button type="primary" @click="$router.push('/posts')">
                  去发布第一篇帖子
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 我的收藏 -->
          <el-tab-pane label="我的收藏" name="collections">
            <div class="tab-content">
              <el-row :gutter="16">
                <el-col :xs="12" :sm="8" v-for="item in collections" :key="item.id">
                  <el-card class="collection-item" shadow="hover">
                    <!-- 🖼️ 收藏内容图片 - 这里放收藏项的图片 -->
                    <img :src="item.image" class="collection-image" />
                    <div class="collection-info">
                      <h4>{{ item.title }}</h4>
                      <p class="collection-type">{{ item.type }}</p >
                      <el-button size="small" @click="viewCollection(item)">
                        查看详情
                      </el-button>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
              
              <el-empty v-if="collections.length === 0" description="暂无收藏内容">
                <el-button type="primary" @click="$router.push('/heritage')">
                  去探索文化遗产
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 我的预订 -->
          <el-tab-pane label="我的预订" name="bookings">
            <div class="tab-content">
              <el-card v-for="booking in bookings" :key="booking.id" class="booking-item">
                <div class="booking-header">
                  <!-- 🖼️ 活动封面图片 - 这里放活动图片 -->
                  <img :src="booking.eventImage" class="booking-image" />
                  <div class="booking-info">
                    <h3>{{ booking.eventName }}</h3>
                    <p class="booking-desc">{{ booking.eventDescription }}</p >
                    <div class="booking-details">
                      <div class="detail-item">
                        <el-icon><Calendar /></el-icon>
                        <span>{{ booking.eventDate }}</span>
                      </div>
                      <div class="detail-item">
                        <el-icon><Location /></el-icon>
                        <span>{{ booking.eventLocation }}</span>
                      </div>
                      <div class="detail-item">
                        <el-icon><User /></el-icon>
                        <span>预订人数: {{ booking.peopleCount }}人</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="booking-status">
                  <el-tag :type="booking.status === 'confirmed' ? 'success' : 'warning'">
                    {{ booking.status === 'confirmed' ? '已确认' : '待确认' }}
                  </el-tag>
                  <el-button size="small" @click="cancelBooking(booking.id)">
                    取消预订
                  </el-button>
                </div>
              </el-card>
              
              <el-empty v-if="bookings.length === 0" description="暂无活动预订">
                <el-button type="primary" @click="$router.push('/events')">
                  去查看活动
                </el-button>
              </el-empty>
            </div>
          </el-tab-pane>

          <!-- 账号设置 -->
          <el-tab-pane label="账号设置" name="settings">
            <div class="tab-content">
              <el-card class="settings-card">
                <h3>基本信息</h3>
                <el-form :model="userInfo" label-width="80px">
                  <el-form-item label="昵称">
                    <el-input v-model="userInfo.nickname" placeholder="请输入昵称" />
                  </el-form-item>
                  <el-form-item label="个人简介">
                    <el-input 
                      v-model="userInfo.bio" 
                      type="textarea" 
                      :rows="3" 
                      placeholder="请输入个人简介" 
                    />
                  </el-form-item>
                  <el-form-item label="头像">
                    <el-upload
                      class="avatar-uploader"
                      action="#"
                      :show-file-list="false"
                      :before-upload="beforeAvatarUpload"
                    >
                      <img v-if="userInfo.avatar" :src="userInfo.avatar" class="avatar" />
                      <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="saveProfile">保存修改</el-button>
                  </el-form-item>
                </el-form>
              </el-card>
            </div>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

    <!-- 编辑资料对话框 -->
    <el-dialog v-model="showEditDialog" title="编辑资料" width="500px">
      <el-form :model="editForm" label-width="80px">
        <el-form-item label="昵称">
          <el-input v-model="editForm.nickname" />
=======
  <div class="user-profile">
    <h1>用户资料</h1>
    <p>查看和编辑用户信息</p >
    <el-card>
      <el-form>
        <el-form-item label="用户名">
          <el-input></el-input>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">保存修改</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
// 用户资料逻辑
</script>

<style scoped>
.user-profile {
  padding: 20px;
  max-width: 600px;
  margin: 0 auto;
}
</style>
