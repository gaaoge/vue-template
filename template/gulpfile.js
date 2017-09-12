/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json');
const gulp = require('gulp');
const exec = require('child_process').exec;
const ftp = require('vinyl-ftp');
const tinypng = require('gulp-tinypng-compress');
const replace = require('gulp-replace');
const filter = require('gulp-filter');

const path = {
    build: 'build/'
};

gulp.task('tinypng', function () {
    return gulp.src(path.build + 'resource/assets/**/*.{png,jpg,jpeg}')
        .pipe(tinypng({
            key: '6-qmxQevyQCCYb-gqGTMnF6LTE8Dzo3j',
            sigFile: 'assets_tinypng/.sigfile',
            log: true,
            summarise: true
        }))
        .pipe(gulp.dest('assets_tinypng'));
});

gulp.task('tinypng_copy', function () {
    return gulp.src('assets_tinypng/**/*')
        .pipe(gulp.dest(path.build + 'resource/assets'));
});

gulp.task('test', ['tinypng_copy'], function () {
    const username = pkg.author.name;
    const host = 'ftp-test';

    exec(`cp -rf ${path.build} ${pkg.name}`, function () {
        exec(`scp -r ${pkg.name} ${username}@${host}:/home/appops/app/activity`, function (e) {
            e && console.log(e);
            exec(`rm -rf ${pkg.name}`);
        });
    });
});

gulp.task('publish', ['tinypng_copy'], function () {
    const conn = ftp.create({
        host: '220.181.29.249',
        port: '16321',
        user: 'newsclient',
        password: 'newsclient@2017',
        parallel: 5
    });

    const target = filter(path.build + 'index.html', {restore: true});
    const statistics = '<script src="//analytics.163.com/ntes.js"></script>' +
        '<script>_ntes_nacc = "mapp";neteaseTracker();</script>' +
        '<script src="//img1.cache.netease.com/utf8/3g/util/analysis.min.js"></script>' +
        '<script>_ntes_sps_modelid="' + pkg.name + '";neteaseAnalysis({type:"special",modelid:_ntes_sps_modelid,spst:5});</script>' +
        '<script src="//img1.cache.netease.com/utf8/3g/util/antanalysis.min.js"></script>' +
        '<script>_ntes_ant_projectid="NTM-BXR8M5Z5-1";NTESAntAnalysis.sendData({projectid:_ntes_ant_projectid,val_nm:"pageview",val_act:"pageview",info:{modelid:_ntes_sps_modelid,title:document.title}});</script>' +
        '<script>var _hmt=_hmt||[];(function(){var b=document.createElement("script");b.src="//hm.baidu.com/hm.js?7fa45cfaddbf8ba5591da1950285d665";var a=document.getElementsByTagName("script")[0];a.parentNode.insertBefore(b,a)})();</script>';

    return gulp.src(path.build + '**/*')
        .pipe(target)
        .pipe(replace('<!--statistics-->', statistics))
        .pipe(replace(/\n.*<\!--.*-->/g, ''))
        .pipe(target.restore)
        .pipe(conn.dest('activity/' + pkg.name));
});