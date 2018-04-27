/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const exec = require('child_process').exec
const replace = require('gulp-replace')
const vinylftp = require('vinyl-ftp')
const easeftp = require('easeftp')
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
  const statistics = [
    '<script>var _ntes_ant_projectid="NTM-BXR8M5Z5-1";(function(w,d,s,n) {var f=d.getElementsByTagName(s)[0],k=d.createElement(s);k.async=true;k.src="//static.ws.126.net/utf8/3g/analytics/data1/"+n+".js";f.parentNode.insertBefore(k,f);})(window,document,"script",_ntes_ant_projectid);</script>',
    '<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.src="//hm.baidu.com/hm.js?7fa45cfaddbf8ba5591da1950285d665";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>'
  ].join('')

  const conn = vinylftp.create(ftppass.vinylftp)
  gulp.src(['dist/index.html', 'dist/service-worker.js'])
    .pipe(replace('<!--statistics-->', statistics))
    .pipe(conn.dest('qa/activity/' + pkg.name))

  return easeftp.verify(ftppass.easeftp).then(function () {
    return easeftp.upload({
      online: 'activity/' + pkg.name,
      files: path.resolve('dist'),
      exclude: ['index.html', 'service-worker.js']
    })
  }).catch(function (e) {
    console.log(e)
  })
})
