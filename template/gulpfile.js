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

gulp.task('pre', function () {
  return exec(`cp -rf dist ${pkg.name}`, function () {
    exec(`scp -r ${pkg.name} ${ftppass.pre.username}@${ftppass.pre.host}:/home/appops/htmlfile/activity`, function (e) {
      e && console.log(e)
      exec(`rm -rf ${pkg.name}`)
    })
  })
})

gulp.task('publish', function () {
  easeftp.addFile(['index.html', 'service-worker.js'], {
    debug: true,
    ...ftppass.publish,
    path: 'html/activity/' + pkg.name,
    cwd: path.resolve('dist')
  })

  return easeftp.addFile(['**/*'], {
    debug: true,
    ...ftppass.publish,
    path: 'activity/' + pkg.name + '/static',
    cwd: path.resolve('dist/static')
  })
})
