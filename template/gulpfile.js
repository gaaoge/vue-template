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
      } else if (stats.isFile() && !/\.DS_Store/.test(fPath))
        result.push(fPath)
    })
  }

  finder(rootPath)
  return result
}

function uploadFiles (files, callback) {
  files = files.map(item => item.replace(/^dist\//, ''))

  return easeftp.addFile(files, {
    debug: true,
    ...ftppass,
    path: 'activity/' + pkg.name,
    cwd: path.resolve('dist')
  }).then(() => {
    callback && callback()
  })
}

function uploadResource (isAll) {
  let allFiles = findFiles('dist/resource')

  let cacheFiles = []
  let cachePath = 'node_modules/.cache/cache-files.json'
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }
  let newFiles = allFiles.filter(item => cacheFiles.indexOf(item) === -1)

  return uploadFiles(isAll ? allFiles : newFiles, () => {
    fs.writeFileSync(cachePath, JSON.stringify(allFiles))
  })
}

function updateHtml (isTest) {
  return easeftp.addFile(['index.html', 'service-worker.js'], {
    debug: true,
    ...ftppass,
    path: `${isTest ? 'test' : 'html'}/activity/${pkg.name}`,
    cwd: path.resolve('dist')
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