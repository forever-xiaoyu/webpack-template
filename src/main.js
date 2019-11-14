require("expose-loader?$!jquery")
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
  const render = require('./templates/header/header.art')
  const data = {
    title: 'title23 is template'
  }
  const html = render(data)
  $('#app').html(html)
  console.log('test')
})
