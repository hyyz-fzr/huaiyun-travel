import { Random } from 'mockjs'

// 文化遗产数据
export const heritageList = Array.from({ length: 24 }, (_, i) => ({
  id: i + 1,
  name: Random.ctitle(4, 8) + Random.pick(['文化', '遗址', '传说', '技艺']),
  category: Random.pick(['豆腐文化', '八公山传说', '历史遗址', '传统技艺', '民俗文化']),
  description: Random.cparagraph(3, 6),
  content: Random.cparagraph(20, 40),
  images: Array.from({ length: Random.integer(1, 5) }, () => 
    `/images/heritage/heritage-${Random.integer(1, 12)}.jpg`
  ),
  location: Random.county(true),
  level: Random.pick(['国家级', '省级', '市级']),
  views: Random.integer(500, 5000),
  likes: Random.integer(50, 500),
  status: 'published',
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss'),
  tags: Array.from({ length: Random.integer(2, 5) }, () => 
    Random.pick(['淮南', '传统文化', '非遗', '历史', '旅游'])
  )
}))

export const heritageDetail = {
  id: 1,
  name: '淮南豆腐制作技艺',
  category: '豆腐文化',
  description: '淮南豆腐制作技艺是国家级非物质文化遗产，有着2000多年的悠久历史。',
  content: `
    <h2>历史渊源</h2>
    <p>淮南是豆腐的发源地，据史料记载，豆腐为西汉淮南王刘安在八公山下炼丹时偶然发明。</p >
    
    <h2>工艺特点</h2>
    <p>传统豆腐制作工艺包括选豆、浸泡、磨浆、过滤、煮浆、点卤、成型等七大工序，每一道工序都有严格的要求。</p >
    
    <h2>文化价值</h2>
    <p>豆腐制作技艺不仅是一种食品加工技术，更是中华民族饮食文化的重要组成部分，体现了古代劳动人民的智慧。</p >
    
    <h2>传承保护</h2>
    <p>目前，淮南豆腐制作技艺已被列入国家级非物质文化遗产名录，得到了很好的保护和传承。</p >
  `,
  images: [
    '/images/heritage/tofu-1.jpg',
    '/images/heritage/tofu-2.jpg',
    '/images/heritage/tofu-3.jpg',
    '/images/heritage/tofu-4.jpg'
  ],
  location: '安徽省淮南市八公山区',
  level: '国家级',
  views: 12345,
  likes: 678,
  status: 'published',
  createTime: '2024-01-10 09:00:00',
  tags: ['豆腐', '非遗', '传统技艺', '淮南文化'],
  relatedHeritage: [
    {
      id: 2,
      name: '八公山豆腐传说',
      category: '豆腐文化',
      image: '/images/heritage/bagong-1.jpg'
    },
    {
      id: 3,
      name: '传统石磨工艺',
      category: '传统技艺',
      image: '/images/heritage/stone-mill.jpg'
    }
  ]
}

export const categories = [
  { id: 1, name: '豆腐文化', count: 8, description: '与豆腐相关的文化遗产' },
  { id: 2, name: '八公山传说', count: 6, description: '八公山相关的历史传说' },
  { id: 3, name: '历史遗址', count: 5, description: '重要的历史遗址遗迹' },
  { id: 4, name: '传统技艺', count: 7, description: '传统手工艺技艺' },
  { id: 5, name: '民俗文化', count: 4, description: '地方民俗文化活动' }
]

export const search = heritageList

export const recommended = heritageList.slice(0, 6).map(item => ({
  ...item,
  views: Random.integer(2000, 10000)
}))

export default {
  heritageList,
  heritageDetail,
  categories,
  search,
  recommended
}