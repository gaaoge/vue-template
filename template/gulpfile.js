/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const easeftp = require('easeftp/upload')
const ftppass = JSON.parse(fs.readFileSync('.ftppass', 'utf-8'))

function findFiles (rootPath) {
  let result = []

  function finder (tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach((val) => {
      let fPath = path.posix.join(tempPath, val)
      let stats = fs.statSync(fPath)

      if (stats.isDirectory()) {
        finder(fPath)
      } else if (stats.isFile() && !/\.DS_Store/.test(fPath)) {
        result.push(fPath)
      }
    })
  }

  finder(rootPath)
  return result
}

function uploadFiles (config) {
  return easeftp.addFile(config.files, {
    debug: true,
    ...ftppass,
    path: config.path,
    cwd: path.resolve('dist')
  }).then(() => {
    config.callback && config.callback()
  })
}

function uploadResource (isAll) {
  let allFiles = findFiles('dist/resource')
  allFiles = allFiles.map(item => item.replace(/^dist\//, ''))

  let cacheFiles = []
  let cachePath = 'node_modules/.cache/cache-files.json'
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }
  let newFiles = allFiles.filter(item => cacheFiles.indexOf(item) === -1)

  return uploadFiles({
    files: isAll ? allFiles : newFiles,
    path: 'activity/' + pkg.name,
    callback: () => {
      fs.writeFileSync(cachePath, JSON.stringify(allFiles))
    }
  })
}

function updateHtml (isTest) {
  return uploadFiles({
    files: ['index.html', 'service-worker.js'],
    path: `${isTest ? 'test' : 'html'}/activity/${pkg.name}`
  })
}

exports.test = gulp.series(function resource () {
  return uploadResource(false)
}, function html () {
  return updateHtml(true)
})

exports.publish = gulp.series(function resource () {
  return uploadResource(false)
}, function html () {
  return updateHtml(false)
})

exports.refresh = gulp.series(function resource () {
  return uploadResource(true)
})
