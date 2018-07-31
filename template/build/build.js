/**
 * Created by GG on 18/04/02.
 */

const pkg = require('../package.json')
const prod = require('./webpack.prod.conf')

const chalk = require('chalk')
const webpack = require('webpack')
const workbox = require('workbox-build')

console.log(chalk.cyan('building...'))
webpack(prod, (err, stats) => {
  if (err) throw err
  console.log(stats.toString({
    colors: true,
    modules: false,
    children: false
  }))

  generateSW()
})

function generateSW () {
  let manifestTransforms = []
  if (process.argv.includes('--cdn')) {
    manifestTransforms.push((entries) => {
      return {
        manifest: entries.map((entry) => {
          if (entry.url !== 'index.html') {
            entry.url = `${pkg.cdn}/${pkg.name}/` + entry.url
          }
          return entry
        })
      }
    })
  }

  workbox.generateSW({
    swDest: 'dist/service-worker.js',
    importWorkboxFrom: 'disabled',
    importScripts: ['https://static.ws.126.net/utf8/libs/workbox/v3.1.0/workbox-sw.js'],
    cacheId: pkg.name,
    globDirectory: 'dist/',
    globPatterns: ['**/*'],
    manifestTransforms
  })
}
