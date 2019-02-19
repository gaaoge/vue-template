const presetEnv = require('postcss-preset-env')
const pxToViewport = require('postcss-px-to-viewport')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0
    }),
    pxToViewport({
      viewportWidth: 750,
      viewportUnit: 'vmin',
      fontViewportUnit: 'vmin'
    })
  ]
}
