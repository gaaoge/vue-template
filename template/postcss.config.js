const presetEnv = require('postcss-preset-env')
const autoSize = require('postcss-autosize')
const pxToViewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0
    }),
    autoSize(),
    pxToViewport({
      viewportWidth: 750,
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin',
      mediaQuery: true
    })
  ]
}
