# Our Story

[![GitHub Repo](https://img.shields.io/badge/GitHub-huey1in%2FOurStory-181717?logo=github)](https://github.com/huey1in/OurStory)
![Astro](https://img.shields.io/badge/Astro-7.x-ff5d01?logo=astro&logoColor=white)
![GitHub Pages](https://img.shields.io/badge/deploy-GitHub%20Pages-2ea44f?logo=githubpages&logoColor=white)
[![Deploy Astro site](https://github.com/huey1in/OurStory/actions/workflows/deploy.yml/badge.svg)](https://github.com/huey1in/OurStory/actions/workflows/deploy.yml)

一个用 Astro 构建的双页纪念站。。


## 功能

- 首页 `/`：首屏合照、手绘装饰、在一起天数、时间线、页脚。
- 照片墙 `/photos`：从 `src/content/timeline/*.md` 汇集照片。
- 图片预览：照片墙图片可点击放大，支持背景点击关闭和 `Esc` 关闭。
- 移动端导航：小屏幕使用汉堡菜单。
- 页面切换：使用 Astro `ClientRouter`，并在切换前预热目标页面图片。
- 视觉风格：纸张背景、拍立得照片、胶带、手绘圈选中状态、Laura Cursive 字体。

## 开发

```bash
npm install
npm run dev
```

常用命令：

```bash
npm run build
npm run preview
```

项目当前只依赖 Astro。

## 内容更新

时间线内容放在：

```text
src/content/timeline/
```

新增一条记录时，可以复制模板：

```text
src/content/timeline/_template.md.example
```

复制后改名为 `.md`，例如：

```text
src/content/timeline/02-some-day.md
```

每条时间线需要这些字段：

```yaml
---
order: 2
date: 2024.10.12
title: 我们的某一天
image: /assets/photos/example.jpg
alt: 这张照片的简短描述
side: right
tilt: tilt-right-soft
---

这里写这一天的故事。
```

字段说明：

- `order`：排序，数字越小越靠前。
- `date`：页面显示的日期文本。
- `title`：时间线标题，也会用于照片墙标题。
- `image`：照片路径，通常放在 `public/assets/photos/`。
- `alt`：图片说明。
- `side`：时间线左右位置，支持 `left`、`right`。
- `tilt`：拍立得倾斜样式，支持 `tilt-left`、`tilt-left-soft`、`tilt-right`、`tilt-right-soft`。

照片墙不需要单独维护，它会读取时间线中的 `image`、`date`、`title` 和 `alt`。

## 项目配置

站点级配置在：

```text
src/site.config.ts
```

当前包含：

- `copyright`：页脚版权信息。
- `heroMedia.image`：首页首屏照片。
- `heroMedia.caption`：首页首屏照片日期。
- `relationship.startDate`：在一起天数的开始日期。

Astro 站点地址配置在：

```text
astro.config.mjs
```

## 目录

```text
src/
  components/        页面组件
  content/timeline/  时间线 Markdown 内容
  layouts/           基础 HTML 布局
  pages/             路由页面
  styles/            全局样式
  site.config.ts     项目配置

public/
  assets/
    illustrations/   手绘插图
    photos/          照片
  fonts/             Laura Cursive 字体
```

## 部署

项目已经包含 GitHub Actions 工作流：

```text
.github/workflows/deploy.yml
```

它会在推送到 `main` 分支时自动构建并部署到 GitHub Pages，也可以在 GitHub Actions 页面手动触发。

### 首次部署

1. 创建或打开仓库：

```text
https://github.com/huey1in/OurStory
```

2. 确认 `astro.config.mjs` 里的站点地址是你想发布的地址：

```js
export default defineConfig({
  site: "https://xkj.jisuanyun.vip",
});
```

3. 推送代码到 `main` 分支：

```bash
git init
git remote add origin https://github.com/huey1in/OurStory.git
git add .
git commit -m "Initial site"
git branch -M main
git push -u origin main
```

4. 打开 GitHub 仓库设置：

```text
Settings -> Pages
```

5. 在 `Build and deployment` 中把 `Source` 设置为：

```text
GitHub Actions
```

6. 打开：

```text
Actions -> Deploy Astro site
```

等待 workflow 完成后，页面会发布到 GitHub Pages。

### 日常更新

以后新增时间线、替换照片或调整配置后，只需要提交并推送：

```bash
git add .
git commit -m "Update story content"
git push
```

GitHub Actions 会自动执行：

```bash
npm ci
npm run build
```

构建产物位于 `dist/`，随后会通过 GitHub Pages 发布。

### 其他托管平台

这个项目是 Astro 静态站，构建命令统一是：

```bash
npm run build
```

构建输出目录统一是：

```text
dist
```

#### Vercel

Vercel 可以自动识别 Astro 项目，静态 Astro 站通常不需要额外适配器。

1. 打开 Vercel Dashboard。
2. 选择 `Add New -> Project`。
3. 从 GitHub 导入：

```text
huey1in/OurStory
```

4. Framework Preset 选择或保持自动识别的：

```text
Astro
```

5. 确认构建配置：

```text
Build Command: npm run build
Output Directory: dist
Install Command: npm install
```

6. 点击 `Deploy`。

之后每次推送到 GitHub，Vercel 会自动重新部署。

CLI 部署也可以使用：

```bash
npm install -g vercel
vercel
```

#### Netlify

Netlify 同样可以直接部署静态 Astro 站。

1. 打开 Netlify Dashboard。
2. 选择 `Add new site -> Import an existing project`。
3. 连接 GitHub，并选择：

```text
huey1in/OurStory
```

4. 确认构建配置：

```text
Build command: npm run build
Publish directory: dist
```

5. 点击 `Deploy`。

如果想把 Netlify 配置固定到仓库，可以新增 `netlify.toml`：

```toml
[build]
  command = "npm run build"
  publish = "dist"
```

CLI 部署也可以使用：

```bash
npm install --global netlify-cli
netlify login
netlify init
```

#### Cloudflare Pages

Cloudflare Pages 也适合托管这个静态站。

1. 打开 Cloudflare Dashboard。
2. 进入：

```text
Workers & Pages -> Create application -> Pages
```

3. 选择 `Import an existing Git repository`。
4. 连接 GitHub，并选择：

```text
huey1in/OurStory
```

5. 设置构建配置：

```text
Production branch: main
Build command: npm run build
Build output directory: dist
Root directory: /
```

6. 点击 `Save and Deploy`。

之后每次推送到 `main` 分支，Cloudflare Pages 会自动重新构建并发布。

官方文档：

- [Astro on Vercel](https://docs.astro.build/en/guides/deploy/vercel/)
- [Astro on Netlify](https://docs.astro.build/en/guides/deploy/netlify/)
- [Astro on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-an-astro-site/)

### 自定义域名

如果使用自定义域名，需要做两件事：

1. 在 GitHub 仓库中进入：

```text
Settings -> Pages -> Custom domain
```

填入你的域名。

2. 在域名服务商处配置 DNS 解析到 GitHub Pages。

如果改了正式访问域名，也同步更新：

```text
astro.config.mjs
```

里的 `site` 字段。

### 部署排查

- 如果 Actions 没有自动运行，确认代码推送到了 `main` 分支。
- 如果 Pages 没有显示站点，确认 `Settings -> Pages -> Source` 是 `GitHub Actions`。
- 如果构建失败，先在本地运行 `npm run build` 查看错误。
- 如果图片没有显示，确认图片放在 `public/assets/photos/`，并且 Markdown 中使用 `/assets/photos/xxx.jpg` 这种路径。
