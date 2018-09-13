const UA = window.navigator.userAgent

const isIos = (/ipad|iphone|ipod|ios/i).test(UA)
const isAndroid = (/android|adr/i).test(UA)
const isNewsapp = /(newsapp|newsapppro)\//i.test(UA)
const isNewsappLite = /newsapp-lite\//i.test(UA)
const isTopLine = /topline\//i.test(UA)
const isOther = !isNewsapp && !isNewsappLite && !isTopLine

export {
  isIos,
  isAndroid,
  isNewsapp,
  isNewsappLite,
  isTopLine,
  isOther
}
