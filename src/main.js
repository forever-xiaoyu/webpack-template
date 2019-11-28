require('./styles/index.scss')
var utils = require('@u/tools').default

window.onload = function () {
  // 渲染 header 头
  var headerRender = require('./templates/header.art')
  var headerData = {
    title: 'header'
  }
  var html = headerRender(headerData)
  var dom = document.createElement('div')
  dom.id = 'saas-container'
  dom.innerHTML += html

  // 渲染 footer 尾部
  var footerRender = require('./templates/footer.art')
  html = footerRender({})
  dom.innerHTML += html

  // 渲染 menu 菜单

  // 插入 DOM 结构
  document.body.appendChild(dom)
}
