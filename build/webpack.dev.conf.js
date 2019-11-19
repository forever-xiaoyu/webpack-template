const webpack = require('webpack')
const path = require('path')
const resolvePath = dir => path.join(__dirname, '..', dir)

module.exports = {
  mode: 'development',
  devtool: 'source-map', // 调试源码
  devServer: {
    contentBase: resolvePath('deploy'),
    host: '127.0.0.1',
    port: 8000,
    hot: true,
    overlay: true,
    // proxy: {
    //   '/comments': {
    //     target: 'https://m.weibo.cn',
    //     changeOrigin: true,
    //     logLevel: 'debug',
    //     headers: {
    //       Cookie: ''
    //     }
    //   }
    // },
    historyApiFallback: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
}
