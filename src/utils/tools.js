var utils = {
  ready: function (fn) {
    if (document.addEventListener) { // 非IE
      document.addEventListener("DOMContentLoaded", eventHandler, false)
    } else if (document.attachEvent) { // IE
      document.onreadystatechange = function() {
        if (document.readyState == 'complete') {
          document.onreadystatechange = null
          document.attachEvent("onreadystatechange", eventHandler)
        }
      }
    }

    function eventHandler () {
      if (document.addEventListener) {
        document.removeEventListener("DOMContentLoaded", eventHandler, false)
      } else if (document.attachEvent) {
        document.detachEvent("onreadystatechange", eventHandler)
      }
      fn()
    }
  },

  toLoginPage: function (returnUrl) {
    var passport = '//google.com/user/login.action?appid=google&returnurl='
    var redirectUrl = `${passport}${encodeURIComponent(returnUrl || window.location.href)}`
    window.location.href = redirectUrl
  },

  getCookie (key) {
    var arrStr = document.cookie.split('; ')
    for (let i = 0; i < arrStr.length; i++) {
      var temp = arrStr[i].split('=')
      if (temp[0] === key) return decodeURIComponent((temp[1] || '').trim())
    }
    return ''
  }
}

export default utils
