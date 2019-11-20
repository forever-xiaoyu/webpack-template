var utils = {
  toLoginPage: function (returnUrl) {
    var passport = 'https://plogin.m.jd.com/user/login.action?appid=877&returnurl='
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
