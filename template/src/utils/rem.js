/**
 * rem适配工具类
 * Created by GG on 2018/1/9.
 */

const designWidth = 750 // 设计稿宽度
const designHeight = 1206 // 设计稿高度
const designRem = 100 // 目标rem对应px的比例
const defaultRem = getRem() // 浏览器默认rem对应px的比例

function getRem () {
  let div = document.createElement('div')
  div.style.width = '1rem'
  let tempContainer = document.body || document.getElementsByTagName('head')[0]
  tempContainer.appendChild(div)
  let rem = parseFloat(window.getComputedStyle(div, null).getPropertyValue('width'))
  tempContainer.removeChild(div)
  return rem
}

function updateRem () {
  let clientWidth
  if (window.innerWidth < window.innerHeight) {
    clientWidth = window.innerWidth
  } else if (window.orientation === 0 || window.orientation === 180) {
    clientWidth = window.innerWidth
  } else {
    clientWidth = designWidth / designHeight * window.innerHeight
  }
  document.documentElement.style.fontSize = clientWidth / designWidth * designRem / defaultRem * 100 + '%'
}

function initRem () {
  let tid
  window.addEventListener('resize', function () {
    clearTimeout(tid)
    tid = setTimeout(updateRem, 100)
  }, false)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      clearTimeout(tid)
      tid = setTimeout(updateRem, 100)
    }
  }, false)
  updateRem()
}

export {
  getRem,
  updateRem,
  initRem
}
