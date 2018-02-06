/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json')
const gulp = require('gulp')
const exec = require('child_process').exec
const ftp = require('vinyl-ftp')
const tinypng = require('gulp-tinypng-compress')
const replace = require('gulp-replace')
const filter = require('gulp-filter')

const path = {
  dist: 'dist/'
}

gulp.task('tinypng', function () {
  return gulp.src(path.dist + 'resource/assets/**/*.{png,jpg,jpeg}')
    .pipe(tinypng({
      key: '6-qmxQevyQCCYb-gqGTMnF6LTE8Dzo3j',
      sigFile: 'assets_tinypng/.sigfile',
      log: true,
      summarise: true
    }))
    .pipe(gulp.dest('assets_tinypng'))
})

gulp.task('tinypng_copy', function () {
  return gulp.src('assets_tinypng/**/*')
    .pipe(gulp.dest(path.dist + 'resource/assets'))
})

gulp.task('test', ['tinypng_copy'], function () {
  const username = pkg.author.name
  const host = 'ftp-test'

  exec(`cp -rf ${path.dist} ${pkg.name}`, function () {
    exec(`scp -r ${pkg.name} ${username}@${host}:/home/appops/app/activity`, function (e) {
      e && console.log(e)
      exec(`rm -rf ${pkg.name}`)
    })
  })
})

gulp.task('pre', ['tinypng_copy'], function () {
  const username = pkg.author.name
  const host = 'ftp-pre'

  exec(`cp -rf ${path.dist} ${pkg.name}`, function () {
    exec(`scp -r ${pkg.name} ${username}@${host}:/home/appops/htmlfile/activity`, function (e) {
      e && console.log(e)
      exec(`rm -rf ${pkg.name}`)
    })
  })
})

gulp.task('publish', ['tinypng_copy'], function () {
  const conn = ftp.create({
    host: '220.181.29.249',
    port: '16321',
    user: 'newsclient',
    password: 'newsclient@2017',
    parallel: 5
  })

  const target = filter(path.dist + 'index.html', {restore: true})
  const statistics = [
    '<script src="//analytics.163.com/ntes.js"></script>',
    '<script>var _ntes_nacc="mapp";neteaseTracker();</script>',
    '<script src="//static.ws.126.net/utf8/3g/util/analysis.min.js"></script>',
    '<script>var _ntes_sps_modelid="' + pkg.name + '";neteaseAnalysis({type:"special",modelid:_ntes_sps_modelid,spst:5});</script>',
    '<script>var _ntes_ant_projectid="NTM-BXR8M5Z5-1";(function(w,d,s,n) {var f=d.getElementsByTagName(s)[0],k=d.createElement(s);k.async=true;k.src="//static.ws.126.net/utf8/3g/analytics/data1/"+n+".js";f.parentNode.insertBefore(k,f);})(window,document,"script",_ntes_ant_projectid);</script>',
    '<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.src="//hm.baidu.com/hm.js?7fa45cfaddbf8ba5591da1950285d665";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>'
  ].join('')

  return gulp.src(path.dist + '**/*')
    .pipe(target)
    .pipe(replace('<!--statistics-->', statistics))
    .pipe(target.restore)
    .pipe(conn.dest('qa/activity/' + pkg.name))
})
