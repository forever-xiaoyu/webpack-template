/**
 * eg:
  ajax({
    url: "", // 请求地址
    type: 'GET', // 请求方式
    data: { name:'yuce', age :'23' }, // 请求参数
    dataType: "json", // 返回值类型的设定
    async: false, // 是否异步
    success: function (response, xml) {
      console.log(response) // 此处执行请求成功后的代码
    },
    fail: function (status) {
      console.log('状态码为' + status) // 此处为执行成功后的代码
    }
  })
 */


function json (options) {
  /**
   * 传入方式默认为对象
   * */
  options = options || {}
  /**
   * 默认为GET请求
   * */
  options.type = (options.type || "GET").toUpperCase()
  /**
   * 返回值类型默认为json
   * */
  options.dataType = options.dataType || 'json'
  /**
   * 默认为异步请求
   * */
  options.async = options.async || true
  /**
   * 对需要传入的参数的处理
   * */
  var params = getParams(options.data)
  var xhr
  /**
   * 创建一个 ajax请求
   * W3C标准和IE标准
   */
  if (window.XMLHttpRequest) {
    /**
     * W3C标准
     * */
    xhr = new XMLHttpRequest()
  } else {
    /**
     * IE标准
     * @type {ActiveXObject}
     */
    xhr = new ActiveXObject('Microsoft.XMLHTTP')
  }
  xhr.onreadystatechange = function () {
    if (xhr.readyState == 4) {
      var status = xhr.status
      if (status >= 200 && status < 300 ) {
        options.success && options.success(xhr.responseText, xhr.responseXML)
      } else {
        options.fail && options.fail(status)
      }
    }
  }
  if (options.type == 'GET') {
    xhr.open("GET",options.url + '?' + params ,options.async)
    xhr.send(null)
  } else if (options.type == 'POST') {
    /**
     *打开请求
     * */
    xhr.open('POST', options.url, options.async)
    /**
     * POST请求设置请求头
     * */
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
    /**
     * 发送请求参数
     */
    xhr.send(params)
  }
}

function jsonp (params) {
  params = params || {}
  params.data = params.data || {}
  jsonp(params)

  // jsonp请求
  function jsonp(params) {
    //创建script标签并加入到页面中
    var callbackName = params.jsonp
    var head = document.getElementsByTagName('head')[0]
    // 设置传递给后台的回调参数名
    params.data['callback'] = callbackName
    var data = formatParams(params.data)
    var script = document.createElement('script')
    head.appendChild(script)

    //创建jsonp回调函数
    window[callbackName] = function(json) {
      head.removeChild(script)
      clearTimeout(script.timer)
      window[callbackName] = null
      params.success && params.success(json)
    }

    //发送请求
    script.src = params.url + '?' + data

    //为了得知此次请求是否成功，设置超时处理
    if(params.time) {
      script.timer = setTimeout(function() {
        window[callbackName] = null
        head.removeChild(script)
        params.error && params.error({
          message: '超时'
        })
      }, time)
    }
  }

  // 格式化参数
  function formatParams(data) {
    var arr = []
    for(var name in data) {
      arr.push(encodeURIComponent(name) + '=' + encodeURIComponent(data[name]))
    }

    // 添加一个随机数，防止缓存
    arr.push('_t=' + new Date().getTime())
    return arr.join('&')
  }
}

module.exports = {
  json,
  jsonp
}
