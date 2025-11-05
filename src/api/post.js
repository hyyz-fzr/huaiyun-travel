import api from './index'

// 帖子相关API
export const postApi = {
  // 获取帖子列表
  getPosts(params) {
    return api.get('/posts', {params})
  },

  // 获取帖子详情
  getPostDetail(id) {
    return api.get(`/posts/${id}`)
  },

  // 创建帖子
  createPost(data) {
    return api.post('/posts', data)
  },

  // 更新帖子
  updatePost(id, data) {
    return api.put(`/posts/${id}`, data)
  },

  // 删除帖子
  deletePost(id) {
    return api.delete(`/posts/${id}`)
  },

  // 点赞帖子
  likePost(id) {
    return api.post(`/posts/${id}/like`)
  },

  // 取消点赞
  unlikePost(id) {
    return api.delete(`/posts/${id}/like`)
  },

  // 收藏帖子
  collectPost(id) {
    return api.post(`/posts/${id}/collect`)
  },

  // 取消收藏
  uncollectPost(id) {
    return api.delete(`/posts/${id}/collect`)
  },

  // 获取帖子评论
  getPostComments(id, params) {
    return api.get(`/posts/${id}/comments`, params)
  },

  // 添加评论
  addComment(id, data) {
    return api.post(`/posts/${id}/comments`, data)
  },

  // 删除评论
  deleteComment(postId, commentId) {
    return api.delete(`/posts/${postId}/comments/${commentId}`)
  }
}