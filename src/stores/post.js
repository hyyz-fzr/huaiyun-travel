import { defineStore } from 'pinia'
import { ref } from 'vue'
import { postApi } from '@/api/post'
import { ElMessage } from 'element-plus'

export const usePostStore = defineStore('post', () => {
  const posts = ref([])
  const currentPost = ref(null)
  const loading = ref(false)
  const pagination = ref({
    page: 1,
    pageSize: 10,
    total: 0
  })

  // 获取帖子列表
  const getPosts = async (params = {}) => {
    loading.value = true
    try {
      const response = await postApi.getPosts({
        ...params,
        page: pagination.value.page,
        pageSize: pagination.value.pageSize
      })
      posts.value = response.data.list
      pagination.value.total = response.data.total
      return response
    } catch (error) {
      ElMessage.error('获取帖子列表失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 获取帖子详情
  const getPostDetail = async (id) => {
    loading.value = true
    try {
      const response = await postApi.getPostDetail(id)
      currentPost.value = response.data
      return response
    } catch (error) {
      ElMessage.error('获取帖子详情失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 创建帖子
  const createPost = async (postData) => {
    loading.value = true
    try {
      const response = await postApi.createPost(postData)
      ElMessage.success('帖子发布成功')
      return response
    } catch (error) {
      ElMessage.error('帖子发布失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 更新帖子
  const updatePost = async (id, postData) => {
    loading.value = true
    try {
      const response = await postApi.updatePost(id, postData)
      ElMessage.success('帖子更新成功')
      return response
    } catch (error) {
      ElMessage.error('帖子更新失败')
      throw error
    } finally {
      loading.value = false
    }
  }

  // 删除帖子
  const deletePost = async (id) => {
    try {
      await postApi.deletePost(id)
      ElMessage.success('帖子删除成功')
      // 从列表中移除
      const index = posts.value.findIndex(item => item.id === id)
      if (index !== -1) {
        posts.value.splice(index, 1)
      }
    } catch (error) {
      ElMessage.error('帖子删除失败')
      throw error
    }
  }

  // 点赞帖子
  const likePost = async (id) => {
    try {
      await postApi.likePost(id)
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value.likes += 1
        currentPost.value.isLiked = true
      }
      // 更新列表中的帖子
      const post = posts.value.find(item => item.id === id)
      if (post) {
        post.likes += 1
        post.isLiked = true
      }
    } catch (error) {
      ElMessage.error('点赞失败')
      throw error
    }
  }

  // 取消点赞
  const unlikePost = async (id) => {
    try {
      await postApi.unlikePost(id)
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value.likes -= 1
        currentPost.value.isLiked = false
      }
      // 更新列表中的帖子
      const post = posts.value.find(item => item.id === id)
      if (post) {
        post.likes -= 1
        post.isLiked = false
      }
    } catch (error) {
      ElMessage.error('取消点赞失败')
      throw error
    }
  }

  // 收藏帖子
  const collectPost = async (id) => {
    try {
      await postApi.collectPost(id)
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value.collections += 1
        currentPost.value.isCollected = true
      }
    } catch (error) {
      ElMessage.error('收藏失败')
      throw error
    }
  }

  // 取消收藏
  const uncollectPost = async (id) => {
    try {
      await postApi.uncollectPost(id)
      if (currentPost.value && currentPost.value.id === id) {
        currentPost.value.collections -= 1
        currentPost.value.isCollected = false
      }
    } catch (error) {
      ElMessage.error('取消收藏失败')
      throw error
    }
  }

  // 添加评论
  const addComment = async (postId, commentData) => {
    try {
      const response = await postApi.addComment(postId, commentData)
      if (currentPost.value && currentPost.value.id === postId) {
        currentPost.value.comments.push(response.data)
        currentPost.value.commentCount += 1
      }
      ElMessage.success('评论成功')
      return response
    } catch (error) {
      ElMessage.error('评论失败')
      throw error
    }
  }

  // 删除评论
  const deleteComment = async (postId, commentId) => {
    try {
      await postApi.deleteComment(postId, commentId)
      if (currentPost.value && currentPost.value.id === postId) {
        const index = currentPost.value.comments.findIndex(c => c.id === commentId)
        if (index !== -1) {
          currentPost.value.comments.splice(index, 1)
          currentPost.value.commentCount -= 1
        }
      }
      ElMessage.success('评论删除成功')
    } catch (error) {
      ElMessage.error('评论删除失败')
      throw error
    }
  }

  return {
    posts,
    currentPost,
    loading,
    pagination,
    getPosts,
    getPostDetail,
    createPost,
    updatePost,
    deletePost,
    likePost,
    unlikePost,
    collectPost,
    uncollectPost,
    addComment,
    deleteComment
  }
})