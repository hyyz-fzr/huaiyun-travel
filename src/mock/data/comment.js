import { Random } from 'mockjs'

// 评论数据
export const comments = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  content: Random.cparagraph(2, 5),
  author: {
    id: Random.integer(1, 50),
    username: Random.name(),
    avatar: `/images/avatars/avatar-${Random.integer(1, 12)}.jpg`
  },
  target: {
    type: Random.pick(['post', 'heritage', 'product', 'content']),
    id: Random.integer(1, 50),
    title: Random.ctitle(6, 12)
  },
  likes: Random.integer(0, 50),
  status: Random.pick(['published', 'hidden', 'deleted']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  replies: Array.from({ length: Random.integer(0, 3) }, (_, j) => ({
    id: j + 1,
    content: Random.cparagraph(1, 3),
    author: {
      id: Random.integer(1, 50),
      username: Random.name(),
      avatar: `/images/avatars/avatar-${Random.integer(1, 12)}.jpg`
    },
    createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
  }))
}))

export default {
  comments
}