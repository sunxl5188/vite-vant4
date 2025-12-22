# Vue 3 + TypeScript + Vite

## 简介
本项目基于 Vite + Vue3 + Vant4 + TypeScript，集成了常用表单、主题切换、全局样式、API请求、国际化等功能，适合中后台和移动端快速开发。

## 下载
```bash
git clone https://your-repo-url/vite-vant4.git
cd vite-vant4
```

## 安装依赖
推荐使用 pnpm（也可用 npm/yarn）：
```bash
pnpm install
# 或
yarn install
# 或
npm install
```

## 本地开发
```bash
pnpm dev
# 或
yarn dev
# 或
npm run dev
```

## 打包构建
```bash
pnpm build
# 或
yarn build
# 或
npm run build
```

## 主要特性
- Vite 极速开发与热更新
- Vue3 组合式 API
- Vant4 移动端组件库
- TypeScript 类型安全
- 支持主题切换（明/暗色）
- 支持国际化 i18n
- 支持自动导入、按需加载
- 支持全局样式与 CSS 变量
- 支持表单、校验、API请求等常用业务

## 目录结构
```
src/
	assets/         静态资源
	components/     公共组件
	directive/      自定义指令
	i18n/           国际化
	router/         路由
	store/          状态管理
	utils/          工具函数
	view/           页面视图
```

## 其他
- 如需自定义主题，请修改 `src/assets/styles/base.scss`。
- 更多用法请参考各组件和页面源码。
