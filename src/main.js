// require("expose-loader?$!jquery")
import './styles/index.scss'

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
