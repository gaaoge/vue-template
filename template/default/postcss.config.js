const presetEnv = require('postcss-preset-env')
const autoSize = require('postcss-autosize')
const px2Rem = require('postcss-plugin-px2rem')

module.exports = {
  plugins: [
    presetEnv({
      stage: 0,
    }),
    autoSize(),
    px2Rem(),
  ],
}
