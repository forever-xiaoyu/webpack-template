# webpack-template #
基于 webpack4 搭建的前端工程模板

## 所需环境 ##
- Node.js

## 安装依赖 ##
```bash
npm install
```

## 本地运行 ##
```bash
npm run dev
npm run serve
```

## 项目架构 ##
``` js
    .
    ├── build                     # webpack 配置
    │   ├── webpack.base.conf.js      # 基础配置
    │   ├── webpack.dev.conf.js       # 开发环境配置
    │   ├── webpack.prod.conf.js      # 生产环境配置
    ├── deploy                    # 构建目录
    ├── src
    │   ├── assets                # 静态资源
    │   │   ├── img
    │   ├── public                # 入口文件
    │   ├── styles                # 样式资源
    │   │   ├── index                 # 样式入口
    │   ├── templates             # 模块
    │   ├── utils                 # 工具库
    │   ├── views                 # 页面
    │   ├── main.js               # 配置入口
    ├── .babelrc                  # babel 编译配置
    ├── .browserslistrc           # 浏览器兼容配置
    ├── postcss.config.js         # css 编译配置
```

## 开发环境 ##
```bash
npm run build:yufa
```

## 生产环境 ##
```bash
npm run build
npm run build:prod
```
