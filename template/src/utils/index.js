/**
 * Created by GG on 2018/1/9.
 */

// 获取url参数
function getSearch (name, url) {
  url = url || window.location.href

  let search = /\?[^#]*/.exec(url)
  search = (search && search[0]) || ''

  let data = {}
  search.replace(/([^?=&]+)(=([^&]*))?/g, ($0, $1, $2, $3) => {
    data[$1] = decodeURIComponent($3)
  })
  return name ? data[name] : data
}

// 设置url参数
function setSearch (name, value, url) {
  url = url || window.location.href

  let href = url.replace(/(\?|#).*/, '')

  let data = getSearch(null, url)
  data[name] = value
  let search = ''
  for (let i in data) {
    search += '&' + encodeURIComponent(i) + '=' + encodeURIComponent(data[i])
  }
  search = search.replace(/&/, '?')

  let hash = /#.*/.exec(url)
  hash = (hash && hash[0]) || ''

  return href + search + hash
}

// 格式化时间
function formatDate (dateInput, format) {
  let date = new Date(dateInput)

  let o = {
    'M+': date.getMonth() + 1, // month
    'd+': date.getDate(), // day
    'h+': date.getHours(), // hour
    'm+': date.getMinutes(), // minute
    's+': date.getSeconds(), // second
    'q+': Math.floor((date.getMonth() + 3) / 3), // quarter
    'S': date.getMilliseconds() // millisecond
  }

  if (/(y+)/.test(format)) {
    format = format.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
  }

  for (let k in o) {
    if (new RegExp('(' + k + ')').test(format)) {
      format = format.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length))
    }
  }
  return format
}

// 单页面高度适配
function getResizeStyle (targetHeight = 603) {
  if (window.innerWidth > window.innerHeight) return

  let deltaHeight = 603 - window.innerHeight * 375 / window.innerWidth
  let scale = Math.min((targetHeight - deltaHeight) / targetHeight, 1)
  let translateY = (scale - 1) / 2 * (100 / scale) + '%'
  return {
    transform: 'scale(' + scale + ') translateY(' + translateY + ')'
  }
}

export {
  getSearch,
  setSearch,
  formatDate,
  getResizeStyle
}
