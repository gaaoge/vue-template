const UA = window.navigator.userAgent

const isIos = /ipad|iphone|ipod|ios/i.test(UA)
const isAndroid = /android|adr/i.test(UA)
const isNewsapp = /(newsapp|newsapppro)\//i.test(UA)
const isWeixin = /micromessenger/i.test(UA)
const isDebug = /debug/i.test(location.search)
const isTest = /test\.html$/.test(location.pathname)
const isOnline = /index\.html$/.test(location.pathname)

export { isIos, isAndroid, isNewsapp, isWeixin, isDebug, isTest, isOnline }
