import Vue from 'vue'

// 自动注册全局组件, 组件名为文件名（例：app-toast）
const files = require.context('.', true, /^((?!pixi).)*.vue$/)
files.keys().forEach((key) => {
  if (key === './index.js' || !files(key).default) return

  Vue.component(key.replace(/(.*\/)*([^.]+).*/gi, '$2'), files(key).default)
})

// 注册异步全局组件
Vue.component('pixi-stage', () =>
  import(/* webpackChunkName: "pixi" */ './pixi/PixiStage.vue')
)
Vue.component('pixi-display', () =>
  import(/* webpackChunkName: "pixi" */ './pixi/PixiDisplay.vue')
)
Vue.component('pixi-dragonbones', () =>
  import(/* webpackChunkName: "pixi" */ './pixi/PixiDragonbones.vue')
)

// 注册第三方全局组件
