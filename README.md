# 淮韵游踪 - 云端全栈部署指南

🌐 **在线访问**: https://huaiyun-travel.netlify.app

## 🚀 快速部署

### 阶段1: 数据库准备 (Supabase)

1. **注册 Supabase**
   - 访问 https://supabase.com
   - 注册账号并创建新项目 `huaiyun-travel`
   - 选择免费计划

2. **获取数据库连接信息**
   - 进入项目设置 → Database → Connection string
   - 复制 PostgreSQL 连接字符串
   - 格式: `postgresql://postgres:[password]@db.[project-ref].supabase.co:5432/postgres`

### 阶段2: 后端部署 (Railway)

1. **部署到 Railway**
   ```bash
   # 方法1: GitHub导入
   - Fork 本项目到你的GitHub
   - 访问 https://railway.app
   - 点击 "New Project" → "Deploy from GitHub repo"
   - 选择你的仓库

   # 方法2: 直接部署
   - 在Railway点击 "New Project" → "Empty Project"
   - 上传项目代码或连接GitHub