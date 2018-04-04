/**
 * Created by GG on 18/04/02.
 */

const pkg = require('../package.json')
const prod = require('./webpack.prod.conf')

const chalk = require('chalk')
const webpack = require('webpack')
const merge = require('webpack-merge')
const optimize = require('./optimize')

let config = prod
if (process.argv.includes('--cdn')) {
  config = merge.smart(prod, {
    output: {
      publicPath: '//static.ws.126.net/163/activity/' + pkg.name + '/'
    }
  })
}

console.log(chalk.cyan('building...'))
webpack(config, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false
  }))

  console.log(chalk.cyan('optimizing...'))
  optimize()
})