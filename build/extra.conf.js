const glob = require('glob')
const path = require('path')
const resolvePath = dir => path.join(__dirname, '..', dir)
const HtmlWebpackPlugin = require('html-webpack-plugin')
const htmlChunks = {
  error: ['app'],
}

function getHtmlPlugins () {
  var entryObj = getEntry()
  var htmlArray = []
  var plugins = []
  Object.keys(entryObj).forEach(function(element){
    htmlArray.push({
      _html: element,
      title: '',
      chunks: [element]
    })
  })

  // auto generate html template
  htmlArray.forEach(function(element){
    plugins.push(new HtmlWebpackPlugin(getHtmlConfig(element._html,element.chunks)));
  })

  return plugins
}

function getEntry () {
  let entry = {
  }
  // read all entries of pages
  glob.sync('./src/views/**/*.js').forEach(name => {
    var start = name.indexOf('src/') + 4
    var end = name.length - 3
    var eArr = []
    var n = name.slice(start,end)
    n= n.split('/')[1]
    eArr.push(name)
    entry[n] = eArr
  })
  return entry
}

function getHtmlConfig (name, chunks) {
  // get extra chunks
  let extraChunks = htmlChunks[name]
  return {
    title: 'title',
    template: resolvePath(`./src/views/${name}/${name}.html`),
    filename: `${name}.html`,
    inject: true,
    hash: false,
    chunks: extraChunks ? extraChunks.concat([name]) : [name],
    minify: {
      collapseWhitespace: true
    }
  }
}

module.exports = {
  getHtmlPlugins,
  getHtmlConfig,
  getEntry
}
