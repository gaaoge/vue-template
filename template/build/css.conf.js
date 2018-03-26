/**
 * Created by GG on 18/03/19.
 */

const path = require('path')
const postcss = require('postcss')
const cssnext = require('postcss-cssnext')
const sprites = require('postcss-sprites')
const px2rem = require('postcss-plugin-px2rem')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')

const groupNames = []
const spritesOptions = {
  spritePath: 'resource/sprites/',
  spritesmith: {padding: 20},
  groupBy: function (image) {
    let groupName = groupNames.indexOf(image.styleFilePath)
    if(groupName === -1) {
      groupNames.push(image.styleFilePath)
      groupName = groupNames.length - 1
    }
    return Promise.resolve(groupName.toString())
  },
  hooks: {
    onUpdateRule: function (rule, token, image) {
      let backgroundSizeX = (image.spriteWidth / image.coords.width) * 100
      let backgroundSizeY = (image.spriteHeight / image.coords.height) * 100
      let backgroundPositionX = (image.coords.x / (image.spriteWidth - image.coords.width)) * 100
      let backgroundPositionY = (image.coords.y / (image.spriteHeight - image.coords.height)) * 100

      backgroundSizeX = isNaN(backgroundSizeX) ? 0 : backgroundSizeX
      backgroundSizeY = isNaN(backgroundSizeY) ? 0 : backgroundSizeY
      backgroundPositionX = isNaN(backgroundPositionX) ? 0 : backgroundPositionX
      backgroundPositionY = isNaN(backgroundPositionY) ? 0 : backgroundPositionY

      let background = postcss.decl({
        prop: 'background',
        value: `url(${image.spriteUrl}) ${backgroundPositionX}% ${backgroundPositionY}%  no-repeat`
      })

      let backgroundSize = postcss.decl({
        prop: 'background-size',
        value: backgroundSizeX + '% ' + backgroundSizeY + '%'
      })

      rule.insertAfter(token, background)
      rule.insertAfter(background, backgroundSize)
    }
  }
}

const px2remOptions = {
  propBlackList: ['border-width']
}

const cssLoader = ExtractTextWebpackPlugin.extract({
  fallback: 'style-loader',
  use: {
    loader: 'css-loader',
    options: {
      minimize: true
    }
  },
  publicPath: '../'
})

module.exports = {
  postcss: [
    cssnext(),
    sprites(spritesOptions),
    px2rem(px2remOptions)
  ],
  cssLoader
}
