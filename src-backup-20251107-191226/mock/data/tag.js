import { Random } from 'mockjs'

// 标签数据
export const tags = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: Random.pick([
    '淮南', '豆腐', '八公山', '文化遗产', '旅游', '美食', '传统工艺',
    '历史', '民俗', '非遗', '文化传承', '地方特色', '手工艺', '风景',
    '古迹', '传说', '节庆', '饮食文化', '工艺品', '文创', '特产',
    '摄影', '游记', '攻略', '体验'
  ]),
  type: Random.pick(['heritage', 'product', 'post', 'content']),
  count: Random.integer(10, 200),
  color: Random.pick(['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#909399']),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  status: 'active'
}))

export default {
  tags
}