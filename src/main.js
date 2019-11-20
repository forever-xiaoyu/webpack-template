// require("expose-loader?$!jquery")
import './styles/index.scss'

// 测试 ES6 语法是否通过 babel 转译
// const array = [1, 2, 3]
// const isES6 = () => console.log(...array)
//
// isES6()
//
// const arr = [new Promise(() => {}), new Promise(() => {})]
//
// arr.map(item => {
//   console.log(item)
// })

$(function () {
  const headerRender = require('./templates/header.art')
  const headerData = {
    title: 'header template'
  }
  let html = headerRender(headerData)
  $('#saas-container').html(html)

  const footerRender = require('./templates/footer.art')
  html = footerRender({})
  $('#saas-container').append(html)
})
