const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const resolvePath = dir => path.join(__dirname, '..', dir)
const developmentConfig = require('./webpack.dev.conf')
const productionConfig = require('./webpack.prod.conf')

/**
 * 根据不同的环境，生成不同的配置
 * @param {String} env "development" or "production"
 */

const generateConfig = env => {
  // 将需要的 Loader 和 Plugin 单独声明
  let scriptLoader = [
    {
      loader: 'babel-loader'
    }
  ]

  let cssLoader = [
    'style-loader',
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'sass-loader' // 使用 sass-loader 将 scss 转为 css
  ]

  let cssExtractLoader = [
    {
      loader: MiniCssExtractPlugin.loader
    },
    'css-loader',
    'postcss-loader', // 使用 postcss 为 css 加上浏览器前缀
    'sass-loader', // 使用 sass-loader 将 scss 转为 css
  ]

  let fontLoader = [
    {
      loader: 'url-loader',
      options: {
        name: '[name]-[hash:5].min.[ext]',
        limit: 5000, // fonts file size <= 5KB, use 'base64'; else, output svg file
        publicPath: 'fonts/',
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
        outputPath: 'images/'
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
    env === 'production'
      ? cssExtractLoader // 生产环境下压缩 css 代码
      : cssLoader // 开发环境：页内样式嵌入

  let artLoader = [
    {
      loader: 'art-template-loader'
    }
  ]

  return {
    entry: { app: './src/main.js' },
    output: {
      publicPath: env === 'development' ? '/' : './',
      path: resolvePath('deploy'),
      filename: '[name]-[hash:5].bundle.js',
      chunkFilename: '[name]-[hash:5].chunk.js'
    },
    module: {
      rules: [
        { test: /\.js$/, exclude: /(node_modules)/, use: scriptLoader },
        { test: /\.(sa|sc|c)ss$/, use: styleLoader },
        { test: /\.(eot|woff2?|ttf|svg)$/, use: fontLoader },
        { test: /\.(png|jpg|jpeg|gif)$/, use: imageLoader },
        { test: /\.art$/, use: artLoader },
      ]
    },
    plugins: [
      // 开发环境和生产环境二者均需要的插件
      new HtmlWebpackPlugin({
        title: 'webpack HTML',
        filename: 'index.html',
        template: resolvePath('./src/public/index.html'),
        // chunks: ['app'],
        minify: {
          collapseWhitespace: true
        }
      }),
      new webpack.ProvidePlugin({ $: 'jquery' }),
      new CleanWebpackPlugin()
    ]
  }
}

module.exports = env => {
  let config =
    env === 'production'
      ? productionConfig
      : developmentConfig
  // 合并 公共配置 和 环境配置
  return merge(generateConfig(env), config)
}
