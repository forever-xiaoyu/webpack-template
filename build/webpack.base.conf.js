const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const resolvePath = dir => path.join(__dirname, '..', dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const DropConsoleWebpackPlugin = require('drop-console-webpack-plugin')
const WebpackBar = require('webpackbar')
const developmentConfig = require('./webpack.dev.conf')
const productionConfig = require('./webpack.prod.conf')
const Config = require('./config')
const { getEntry, getHtmlPlugins } = require('./extra.conf')

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production" or "report"
 */
const generateConfig = (env, isProduction) => {
  // 将需要的 Loader 和 Plugin 单独声明
  // HtmlWebpackPlugin 会和 htmlLoader 冲突, 若在 html 中使用图片可使用 <%= require('') %> 来引入
  // let htmlLoader = [
  //   'html-withimg-loader'
  // ]

  let scriptLoader = [
    {
      loader: 'babel-loader'
    }
  ]

  let cssLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'resolve-url-loader',
    'sass-loader?sourceMap' // 使用 sass-loader 将 scss 转为 css
  ]

  let cssExtractLoader = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'resolve-url-loader', // sourceMap 必须为 true 才能正确解析图片相对路径
    'sass-loader?sourceMap', // 使用 sass-loader 将 scss 转为 css
  ]

  let fontLoader = [
    {
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].min.[ext]',
        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
        // publicPath: 'fonts/',
        outputPath: 'fonts/'
      }
    }
  ]

  let imageLoader = [
    {
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].min.[ext]',
        limit: 10000, // size <= 10KB
        // publicPath: '/',
        outputPath: 'img/'
      }
    },
    // 图片压缩
    // {
    //   loader: 'image-webpack-loader',
    //   options: {
    //     // 压缩 jpg/jpeg 图片
    //     mozjpeg: {
    //       progressive: true,
    //       quality: 50 // 压缩率
    //     },
    //     // 压缩 png 图片
    //     pngquant: {
    //       quality: '65-90',
    //       speed: 4
    //     }
    //   }
    // }
  ]

  let styleLoader =
    env === 'css'
      ? cssExtractLoader // 压缩 css 代码
      : cssLoader // 页内样式嵌入

  let artLoader = [
    {
      loader: 'art-template-loader'
    }
  ]

  // 开发环境和生产环境二者均需要的插件
  // plugins 中使用条件判断会产生错误，在外部进行判断然后 push 进去
  let plugins = [
    new HtmlWebpackPlugin({
      title: Config.INDEX_TITLE,
      filename: 'index.html',
      template: resolvePath('./src/public/index.html'),
      chunks: ['app'],
      minify: {
        collapseWhitespace: true
      }
    }),
    ...getHtmlPlugins(),
    // 清除打包目录
    new CleanWebpackPlugin(),
    new WebpackBar(),
    // 拷贝静态资源
    new CopyWebpackPlugin([
      {
        from: resolvePath('./src/public/src'),
        to: resolvePath('deploy/src'),
        ignore: ['.*']
      }
    ]),
    // 因为 DefinePlugin 直接执行文本替换，给定的值必须包含字符串本身内的实际引号
    new webpack.DefinePlugin({
      'process.env': {
        // 定义网关路径
        BASE_URL:
          isProduction
            ? Config.BASE_URL
            : Config.BASE_URL_DEV,
      }
    }),
    
    // 移除 console
    new DropConsoleWebpackPlugin({
      drop_console: isProduction ? true : false
    })
  ]

  // 模块打包可视化分析
  if (env === 'report') {
    plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: "static",
        analyzerHost: "127.0.0.1",
        analyzerPort: 8888,
        reportFilename: "report.html",
        defaultSizes: "parsed",
        openAnalyzer: false,
        generateStatsFile: false,
        statsFilename: "stats.json",
        statsOptions: null,
        logLevel: "info"
      })
    )
  }

  return {
    entry: {
      app: './src/main.js',
      ...getEntry()
    },
    output: {
      publicPath: isProduction ? './' : '/',
      path: resolvePath('deploy'),
      filename: '[name]-[hash:5].bundle.js',
      chunkFilename: '[name]-[hash:5].chunk.js'
    },
    resolve: {
      alias: {
        "@s": resolvePath('src/styles'), // 基础样式
        "@t": resolvePath('src/templates'), // 模块路径
        "@u": resolvePath('src/utils'), // 工具路径
      }
    },
    module: {
      rules: [
        // { test: /\.(htm|html)$/, use: htmlLoader },
        { test: /\.(sa|sc|c)ss$/, use: styleLoader },
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader },
        { test: /\.art$/, use: artLoader },
      ]
    },
    plugins
  }
}

module.exports = env => {
  const isProduction =
    (env === 'production' || env === 'report' || env === 'css')
      ? true
      : false
  let config =
    isProduction
      ? productionConfig
      : developmentConfig
  // 合并 公共配置 和 环境配置
  return merge(generateConfig(env, isProduction), config)
}
