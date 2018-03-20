/**
 * Created by GG on 18/03/20.
 */

const pkg = require('../package.json')
const prod = require('./webpack.prod.conf')
const merge = require('webpack-merge')

module.exports = merge.smart(prod, {
  output: {
    publicPath: '//static.ws.126.net/163/activity/' + pkg.name + '/'
  }
})
