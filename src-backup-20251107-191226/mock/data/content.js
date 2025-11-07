import { Random } from 'mockjs'

// 内容数据
export const contents = Array.from({ length: 48 }, (_, i) => ({
  id: i + 1,
  title: Random.ctitle(8, 20),
  category: Random.pick(['文化遗产', '旅游攻略', '美食推荐', '历史故事', '民俗文化']),
  description: Random.cparagraph(2, 4),
  content: Random.cparagraph(20, 40),
  coverImage: `/images/contents/cover-${Random.integer(1, 12)}.jpg`,
  author: {
    id: Random.integer(1, 50),
    username: Random.name(),
    avatar: `/images/avatars/avatar-${Random.integer(1, 12)}.jpg`
  },
  tags: Array.from({ length: Random.integer(2, 5) }, () => 
    Random.pick(['淮南', '文化', '旅游', '美食', '历史', '传统'])
  ),
  views: Random.integer(100, 5000),
  likes: Random.integer(10, 500),
  comments: Random.integer(5, 200),
  status: Random.pick(['published', 'draft', 'reviewing', 'rejected']),
  publishTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  updateTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const contentDetail = {
  id: 1,
  title: '淮南八公山：豆腐文化的发源地',
  category: '文化遗产',
  description: '探索八公山与豆腐文化的不解之缘，了解这一千年美食的起源和发展。',
  content: `
    <h1>淮南八公山：豆腐文化的发源地</h1>
    
    <h2>地理位置</h2>
    <p>八公山位于安徽省淮南市，是国家4A级旅游景区，也是豆腐文化的发源地。</p >
    
    <h2>历史传说</h2>
    <p>据《本草纲目》记载，豆腐为西汉淮南王刘安在八公山下炼丹时偶然发明。当时刘安寻求长生不老药，在炼制丹药的过程中，以黄豆汁培育丹苗，豆汁与石膏相遇形成了豆腐。</p >
    
    <h2>文化意义</h2>
    <p>豆腐的发明不仅丰富了中华民族的饮食文化，也对世界饮食文化产生了深远影响。八公山因此被誉为"豆腐故乡"。</p >
    
    <h2>现代发展</h2>
    <p>如今，八公山已成为重要的文化旅游胜地，每年吸引大量游客前来探寻豆腐文化的源头。</p >
    
    <h2>旅游建议</h2>
    <ul>
      <li>最佳游览时间：春秋季节</li>
      <li>必游景点：豆腐文化园、刘安墓、炼丹遗址</li>
      <li>特色美食：八公山豆腐宴</li>
    </ul>
  `,
  coverImage: '/images/contents/bagong-mountain.jpg',
  author: {
    id: 1,
    username: '文化研究员',
    avatar: '/images/avatars/avatar-1.jpg',
    bio: '专注于淮南文化研究'
  },
  tags: ['八公山', '豆腐文化', '历史', '旅游'],
  views: 3456,
  likes: 234,
  comments: 89,
  status: 'published',
  publishTime: '2024-01-08 10:00:00',
  createTime: '2024-01-08 09:30:00',
  updateTime: '2024-01-08 10:00:00'
}

export const stats = {
  totalContents: 156,
  published: 134,
  draft: 12,
  reviewing: 8,
  rejected: 2,
  todayViews: 1234,
  totalViews: 45678,
  todayLikes: 89,
  totalLikes: 5678,
  growth: {
    contents: 12.5,
    views: 23.7,
    likes: 15.3
  }
}

export const hotContents = contents.slice(0, 10).map(content => ({
  ...content,
  views: Random.integer(2000, 10000),
  likes: Random.integer(200, 1000)
}))

export default {
  contents,
  contentDetail,
  stats,
  hotContents
}