const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const resolvePath = dir => path.join(__dirname, '..', dir)
const isProduction = process.env.NODE_ENV === 'production'

module.exports = {
  entry: {
    // 需要打包的文件入口
    app: './src/main.js'
  },

  output: {
    // js 引用的路径或者 CDN 地址
    publicPath: '/',
    // 打包文件的输出目录
    path: resolvePath('deploy'),
    // 打包后生产的 js 文件
    filename: '[name].bundle.js',
    // 代码拆分后的文件名
    chunkFilename: '[name].js'
  },

  plugins: [
    new HtmlWebpackPlugin({
      // 打包输出HTML
      title: 'SAAS',
      // 压缩 HTML 文件
      minify: {
        // 移除 HTML 中的注释
        removeComments: true,
        // 删除空白符与换行符
        collapseWhitespace: true,
        // 压缩内联 css
        minifyCSS: true
      },
      // 生成后的文件名
      filename: 'index.html',
      // 根据此模版生成 HTML 文件
      template: './src/public/index.html',
      chunks: ['app']
    }),

    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),

    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      // 用于优化\最小化 CSS 的 CSS处理器，默认为 cssnano
      cssProcessor: require('cssnano'),
      // 传递给 cssProcessor 的选项，默认为{}
      cssProcessorOptions: { safe: true, discardComments: { removeAll: true } },
      // 布尔值，指示插件是否可以将消息打印到控制台，默认为 true
      canPrint: true
    }),

    // 默认情况下，此插件将删除 webpack output.path目录中的所有文件
    // 以及每次成功重建后所有未使用的 webpack 资产
    new CleanWebpackPlugin(),

    // 热部署模块
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ],

  module: {
    rules: [
      // {
      //   loader: 'expose-loader',
      //   options: 'jQuery'
      // },
      // {
      //   loader: 'expose-loader',
      //   options: '$'
      // }
      {
        // 使用正则来匹配 js 文件
        test: /\.js$/,
        // 排除依赖包文件夹
        exclude: /node_modules/,
        use: {
          // 使用 babel-loader
          loader: 'babel-loader'
        }
      },
      {
        // 针对相应后缀的文件设置 loader
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.art$/,
        loader: 'art-template-loader'
      },
      {
        test: /.(jpg|png)$/,
        use: {
          loader: 'url-loader'
        }
      }
    ]
  },

  mode: 'development', // 开发模式
  devtool: 'source-map', // 开启调试
  devServer: {
    contentBase: resolvePath('deploy'),
    port: 8080, // 本地服务器端口号
    hot: true, // 热重载
    overlay: true, // 如果代码出错，会在浏览器页面弹出“浮动层”。类似于 vue-cli 等脚手架
    proxy: {
      // 跨域代理转发
      '/comments': {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',
        headers: {
          Cookie: ''
        }
      }
    },
    historyApiFallback: {
      // HTML5 history模式
      rewrites: [{ from: /.*/, to: '/index.html' }]
    }
  }
}
