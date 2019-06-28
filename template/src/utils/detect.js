const UA = window.navigator.userAgent

const isIos = /ipad|iphone|ipod|ios/i.test(UA)
const isAndroid = /android|adr/i.test(UA)
const isNewsapp = /(newsapp|newsapppro)\//i.test(UA)
const isNewsappLite = /newsapp-lite\//i.test(UA)

export { isIos, isAndroid, isNewsapp, isNewsappLite }
