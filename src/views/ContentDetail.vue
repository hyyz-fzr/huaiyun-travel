<template>
<<<<<<< HEAD
  <div class="content-detail" v-loading="loading">
    <!-- 内容头部 -->
    <div class="content-header">
      <el-page-header @back="goBack" class="page-header">
        <template #content>
          <div class="header-content">
            <h1 class="content-title">{{ content.title }}</h1>
            <div class="content-meta">
              <el-tag :type="getTypeTagType(content.type)" size="small">
                {{ getTypeText(content.type) }}
              </el-tag>
              <el-tag :type="getStatusTagType(content.status)" size="small">
                {{ getStatusText(content.status) }}
              </el-tag>
              <span class="meta-item">
                <el-icon><User /></el-icon>
                {{ content.authorName }}
              </span>
              <span class="meta-item">
                <el-icon><Clock /></el-icon>
                {{ formatDate(content.createTime) }}
              </span>
              <span class="meta-item">
                <el-icon><View /></el-icon>
                {{ content.viewCount || 0 }} 浏览
              </span>
            </div>
          </div>
        </template>
      </el-page-header>
      
      <div class="header-actions">
        <el-button-group>
          <el-button
            v-if="content.status === 'pending'"
            type="success"
            @click="handleApprove"
          >
            <el-icon><Check /></el-icon>
            通过审核
          </el-button>
          <el-button
            v-if="content.status === 'published'"
            type="warning"
            @click="handleBan"
          >
            <el-icon><Close /></el-icon>
            下架内容
          </el-button>
          <el-button
            v-if="content.status === 'banned'"
            type="success"
            @click="handleRestore"
          >
            <el-icon><RefreshRight /></el-icon>
            恢复内容
          </el-button>
          <el-button type="danger" @click="handleDelete">
            <el-icon><Delete /></el-icon>
            删除
          </el-button>
        </el-button-group>
      </div>
    </div>

    <!-- 内容主体 -->
    <div class="content-body">
      <el-row :gutter="24">
        <!-- 主要内容 -->
        <el-col :span="16">
          <el-card class="main-content">
            <!-- 封面图片 -->
            <div class="cover-image" v-if="content.coverImage">
              <el-image
                :src="content.coverImage"
                :preview-src-list="[content.coverImage]"
                fit="cover"
                class="cover-img"
              />
            </div>

            <!-- 内容正文 -->
            <div class="content-text" v-html="content.content"></div>

            <!-- 内容图片 -->
            <div class="content-images" v-if="content.images && content.images.length > 0">
              <h3>内容图片</h3>
              <div class="image-grid">
                <el-image
                  v-for="(img, index) in content.images"
                  :key="index"
                  :src="img"
                  :preview-src-list="content.images"
                  fit="cover"
                  class="content-image"
                />
              </div>
            </div>

            <!-- 标签 -->
            <div class="content-tags" v-if="content.tags && content.tags.length > 0">
              <h3>标签</h3>
              <div class="tags-container">
                <el-tag
                  v-for="tag in content.tags"
                  :key="tag"
                  type="info"
                  size="small"
                  class="tag-item"
                >
                  {{ tag }}
                </el-tag>
              </div>
            </div>
          </el-card>

          <!-- 评论区域 -->
          <el-card class="comments-section" v-if="content.comments">
            <template #header>
              <div class="comments-header">
                <span>评论 ({{ content.comments.length }})</span>
              </div>
            </template>
            
            <div class="comments-list">
              <div
                v-for="comment in content.comments"
                :key="comment.id"
                class="comment-item"
              >
                <div class="comment-header">
                  <el-avatar
                    :size="32"
                    :src="comment.authorAvatar || '/images/avatars/default.jpg'"
                  />
                  <div class="comment-user">
                    <div class="username">{{ comment.authorName }}</div>
                    <div class="comment-time">{{ formatTime(comment.createTime) }}</div>
                  </div>
                </div>
                <div class="comment-content">
                  {{ comment.content }}
                </div>
                <div class="comment-actions">
                  <el-button size="small" text>
                    <el-icon><Star /></el-icon>
                    {{ comment.likeCount || 0 }}
                  </el-button>
                  <el-button size="small" text>
                    <el-icon><ChatDotRound /></el-icon>
                    回复
                  </el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>

        <!-- 侧边信息 -->
        <el-col :span="8">
          <!-- 作者信息 -->
          <el-card class="author-info">
            <template #header>
              <div class="card-header">
                <span>作者信息</span>
              </div>
            </template>
            
            <div class="author-details">
              <el-avatar
                :size="64"
                :src="content.authorAvatar || '/images/avatars/default.jpg'"
              />
              <div class="author-name">{{ content.authorName }}</div>
              <div class="author-level">
                <el-tag :type="getUserLevelTagType(content.authorLevel)" size="small">
                  {{ getUserLevelText(content.authorLevel) }}
                </el-tag>
              </div>
              <div class="author-stats">
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorContentCount || 0 }}</div>
                  <div class="stat-label">发布内容</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorFansCount || 0 }}</div>
                  <div class="stat-label">粉丝</div>
                </div>
                <div class="stat-item">
                  <div class="stat-value">{{ content.authorLikeCount || 0 }}</div>
                  <div class="stat-label">获赞</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 内容统计 -->
          <el-card class="content-stats">
            <template #header>
              <div class="card-header">
                <span>内容统计</span>
              </div>
            </template>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-icon views">
                  <el-icon><View /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.viewCount || 0 }}</div>
                  <div class="stat-label">浏览量</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon likes">
                  <el-icon><Star /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.likeCount || 0 }}</div>
                  <div class="stat-label">点赞数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon comments">
                  <el-icon><ChatDotRound /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.commentCount || 0 }}</div>
                  <div class="stat-label">评论数</div>
                </div>
              </div>
              <div class="stat-card">
                <div class="stat-icon shares">
                  <el-icon><Share /></el-icon>
                </div>
                <div class="stat-info">
                  <div class="stat-value">{{ content.shareCount || 0 }}</div>
                  <div class="stat-label">分享数</div>
                </div>
              </div>
            </div>
          </el-card>

          <!-- 操作记录 -->
          <el-card class="operation-log" v-if="content.operationLog && content.operationLog.length > 0">
            <template #header>
              <div class="card-header">
                <span>操作记录</span>
              </div>
            </template>
            
            <el-timeline>
              <el-timeline-item
                v-for="(log, index) in content.operationLog"
                :key="index"
                :timestamp="formatTime(log.operationTime)"
                :type="getOperationType(log.operationType)"
              >
                {{ log.operatorName }} {{ getOperationText(log.operationType) }}
              </el-timeline-item>
            </el-timeline>
          </el-card>
        </el-col>
      </el-row>
    </div>
=======
  <div class="component">
    <h3>$(($Name -replace '\.vue$',''))</h3>
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
<<<<<<< HEAD

.author-name {
  margin: 12px 0 8px;
  font-size: 18px;
  font-weight: 500;
  color: #303133;
}

.author-level {
  margin-bottom: 16px;
}

.author-stats {
  display: flex;
  justify-content: space-around;
  margin-top: 16px;
}

.stat-item {
  text-align: center;
}

.stat-value {
  font-size: 18px;
  font-weight: bold;
  color: #409EFF;
  margin-bottom: 4px;
}

.stat-label {
  font-size: 12px;
  color: #909399;
}

.content-stats {
  margin-bottom: 20px;
}

.stats-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}

.stat-card {
  display: flex;
  align-items: center;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
  transition: all 0.3s;
}

.stat-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.stat-icon {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  font-size: 20px;
}

.stat-icon.views {
  background: #e1f5fe;
  color: #0288d1;
}

.stat-icon.likes {
  background: #fce4ec;
  color: #d81b60;
}

.stat-icon.comments {
  background: #f3e5f5;
  color: #7b1fa2;
}

.stat-icon.shares {
  background: #e8f5e8;
  color: #388e3c;
}

.stat-info {
  flex: 1;
}

.operation-log {
  margin-bottom: 20px;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .content-header {
    flex-direction: column;
    gap: 16px;
  }
  
  .header-actions {
    width: 100%;
  }
  
  .content-body .el-col-16,
  .content-body .el-col-8 {
    width: 100%;
  }
  
  .content-meta {
    gap: 8px;
  }
  
  .stats-grid {
    grid-template-columns: 1fr;
  }
}
</style>
=======
</style>
>>>>>>> 3ec69d9ec8f60413a7ca669a07e7561dc69f7af2
