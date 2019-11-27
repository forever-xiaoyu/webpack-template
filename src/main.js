require('./styles/index.scss')

window.onload = function () {
  // 渲染 header 头
  var headerRender = require('./templates/header.art')
  var headerData = {
    title: 'header'
  }
  var html = headerRender(headerData)
  document.getElementById('saas-container').innerHTML += html

  // 渲染 footer 尾部
  var footerRender = require('./templates/footer.art')
  html = footerRender({})
  document.getElementById('saas-container').innerHTML += html
}
