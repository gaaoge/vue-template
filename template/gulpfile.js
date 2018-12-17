/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const exec = require('child_process').exec
const easeftp = require('easeftp/upload')
const ftppass = JSON.parse(fs.readFileSync('.ftppass', 'utf-8'))

gulp.task('test', function () {
  return exec(`cp -rf dist ${pkg.name}`, function () {
    exec(`scp -r ${pkg.name} ${ftppass.test.username}@${ftppass.test.host}:/home/appops/app/activity`, function (e) {
      e && console.log(e)
      exec(`rm -rf ${pkg.name}`)
    })
  })
})

gulp.task('publish', function () {
  let files = findNewFiles()
  return upload(files)
})

gulp.task('publish-all', function () {
  let files = findAllFiles()
  return upload(files)
})

function upload (files) {
  return easeftp.addFile(files, {
    debug: true,
    ...ftppass.publish,
    path: 'activity/' + pkg.name + '/static'
  }).then(() => {
    easeftp.addFile(['index.html', 'service-worker.js'], {
      debug: true,
      ...ftppass.publish,
      path: 'html/activity/' + pkg.name,
      cwd: path.resolve('dist')
    })
  })
}

function findAllFiles () {
  let result = []

  function finder (tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach((val) => {
      let fPath = path.join(tempPath, val)
      let stats = fs.statSync(fPath)
      if (stats.isDirectory()) finder(fPath)
      if (stats.isFile() && !/\.DS_Store/.test(fPath)) result.push(fPath)
    })
  }

  finder('dist/static')
  return result
}

function findNewFiles () {
  let result = []

  const cachePath = 'node_modules/.cache/static-cache.json'
  let staticFiles = findAllFiles()
  let staticCache = []
  try {
    staticCache = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  } catch (e) {}

  result = staticFiles.filter(item => staticCache.indexOf(item) === -1)
  fs.writeFileSync(cachePath, JSON.stringify(staticFiles))

  return result
}