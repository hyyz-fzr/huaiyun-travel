import { Random } from 'mockjs'

// 文创产品数据
export const products = Array.from({ length: 36 }, (_, i) => ({
  id: i + 1,
  name: Random.ctitle(4, 8) + Random.pick(['豆腐', '八公山', '淮南', '文创']),
  category: Random.pick(['食品', '工艺品', '文具', '服饰', '家居']),
  description: Random.cparagraph(2, 4),
  content: Random.cparagraph(10, 20),
  images: Array.from({ length: Random.integer(1, 5) }, () => 
    `/images/products/product-${Random.integer(1, 15)}.jpg`
  ),
  price: Random.float(20, 500, 2, 2),
  originalPrice: Random.float(30, 600, 2, 2),
  stock: Random.integer(0, 100),
  sales: Random.integer(0, 500),
  tags: Array.from({ length: Random.integer(1, 3) }, () => 
    Random.pick(['热销', '新品', '限量', '手工制作'])
  ),
  status: 'published',
  createTime: Random.datetime('yyyy-MM-dd HH:mm:ss')
}))

export const productDetail = {
  id: 1,
  name: '淮南豆腐文化礼盒',
  category: '食品',
  description: '精选淮南优质黄豆，传统工艺制作，包含多种豆腐制品。',
  content: `
    <h2>产品介绍</h2>
    <p>淮南豆腐文化礼盒精选当地优质黄豆，采用传统石磨工艺制作，完美保留豆腐的原汁原味。</p >
    
    <h2>产品包含</h2>
    <ul>
      <li>传统卤水豆腐 500g</li>
      <li>豆腐干 200g</li>
      <li>豆腐乳 150g</li>
      <li>豆浆粉 300g</li>
      <li>精美包装礼盒</li>
    </ul>
    
    <h2>制作工艺</h2>
    <p>严格遵循传统豆腐制作七大工序，确保每一件产品都承载着淮南豆腐文化的精髓。</p >
    
    <h2>食用建议</h2>
    <p>适合煎、炒、炖、煮等多种烹饪方式，是家庭餐桌和礼品赠送的佳品。</p >
  `,
  images: [
    '/images/products/tofu-gift-1.jpg',
    '/images/products/tofu-gift-2.jpg',
    '/images/products/tofu-gift-3.jpg',
    '/images/products/tofu-gift-4.jpg'
  ],
  price: 168.00,
  originalPrice: 198.00,
  stock: 45,
  sales: 234,
  tags: ['热销', '新品', '礼盒装'],
  status: 'published',
  createTime: '2024-01-12 14:30:00',
  specifications: [
    { name: '净含量', value: '1150g' },
    { name: '保质期', value: '90天' },
    { name: '储存方式', value: '阴凉干燥处' },
    { name: '产地', value: '安徽淮南' }
  ],
  relatedProducts: [
    {
      id: 2,
      name: '八公山风景明信片',
      price: 25.00,
      image: '/images/products/postcard-1.jpg'
    },
    {
      id: 3,
      name: '豆腐制作工艺模型',
      price: 128.00,
      image: '/images/products/model-1.jpg'
    }
  ]
}

export const categories = [
  { id: 1, name: '食品', count: 12, icon: 'Food' },
  { id: 2, name: '工艺品', count: 8, icon: 'Present' },
  { id: 3, name: '文具', count: 6, icon: 'Reading' },
  { id: 4, name: '服饰', count: 5, icon: 'TShirt' },
  { id: 5, name: '家居', count: 5, icon: 'House' }
]

export const search = products

export default {
  products,
  productDetail,
  categories,
  search
}