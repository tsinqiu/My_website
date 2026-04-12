# 个人博客电子名片站

这是一个基于 Next.js 的个人网页模板，定位为“博客 + 电子名片”。

## 功能
- 自我介绍 Hero 区
- 微信公众号 / 小红书 / 哔哩哔哩 外链入口
- 3-6 条博客占位卡片
- 清新明亮像素活泼风格

## 快速开始
```bash
npm install
npm run dev
```

打开 [http://localhost:3000](http://localhost:3000)

## 内容替换
统一在 `src/content/site.config.ts` 中修改：
- 个人信息：`profileConfig`
- 社媒链接：`socialLinks`
- 博客占位：`postPlaceholders`

## 生产构建
```bash
npm run lint
npm run build
npm start
```

## 部署到 Vercel
1. 登录 Vercel 并导入该仓库
2. 使用默认 Next.js 配置完成部署
3. 先使用 `*.vercel.app` 域名访问
4. 后续在 Vercel 项目中绑定你购买的自定义域名

## 后续扩展建议
- 接入 MDX 或 Notion 作为真实博客源
- 增加公众号二维码和联系方式模块
- 添加文章详情页与标签筛选
