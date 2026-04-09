# AI API 中转站 - 服务文档

> 高速、稳定的 AI API 中转服务文档站，基于 VitePress 构建。

## 在线访问

部署后访问 `http://your-domain` 即可查看文档。

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器（热更新）
npm run docs:dev

# 构建生产版本
npm run docs:build

# 本地预览构建结果
npm run docs:preview
```

## Docker 部署

### 快速启动

```bash
# 构建并启动
docker compose up -d

# 查看日志
docker compose logs -f
```

### 自定义端口

```bash
# 使用 8080 端口启动
PORT=8080 docker compose up -d
```

### 单独构建镜像

```bash
docker build -t api-relay-docs .
docker run -d -p 80:80 api-relay-docs
```

## 添加新文档

将 `.md` 文件放入 `docs/articles/` 目录，自动集成到网站侧边栏和搜索中。

支持通过 frontmatter 自定义标题和排序：

```markdown
---
title: 自定义标题
order: 1
---

文档内容...
```

## 目录结构

```
├── docs/
│   ├── .vitepress/
│   │   ├── config.mts          # 站点配置
│   │   ├── utils/sidebar.ts    # 自动侧边栏工具
│   │   └── theme/              # 主题样式
│   ├── guide/                  # 使用指南
│   ├── articles/               # 自定义文档（自动集成）
│   ├── faq.md                  # 常见问题
│   └── community.md            # 拼车社区
├── Dockerfile
├── docker-compose.yaml
└── package.json
```

## 技术栈

- [VitePress](https://vitepress.dev/) - 静态站点生成器
- [Nginx](https://nginx.org/) - 生产环境静态文件服务
- [Docker](https://www.docker.com/) - 容器化部署

## 许可证

MIT License
