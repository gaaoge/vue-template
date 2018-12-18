/**
 * Created by GG on 16/4/28.
 */

const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const chalk = require('chalk')
const exec = require('child_process').exec
const easeftp = require('easeftp/upload')
const ftppass = JSON.parse(fs.readFileSync('.ftppass', 'utf-8'))

gulp.task('test', function () {
  return findNewFiles('test', uploadSCP)
})

gulp.task('publish', function () {
  return findNewFiles('publish', uploadCDN)
})

gulp.task('test-all', function () {
  return uploadSCP(findAllFiles())
})

gulp.task('publish-all', function () {
  return uploadCDN(findAllFiles())
})

function findAllFiles () {
  let result = []

  function finder (tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach((val) => {
      let fPath = path.join(tempPath, val)
      let stats = fs.statSync(fPath)

      if (stats.isDirectory()) {
        finder(fPath)
      } else if (stats.isFile() && !/\.DS_Store/.test(fPath))
        result.push(fPath)
    })
  }

  finder('dist/resource')
  return result
}

function findNewFiles (task, upload) {
  let allFiles = findAllFiles()

  let cacheFiles = []
  let cachePath = 'node_modules/.cache/' + task + '-files.json'
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }
  let files = allFiles.filter(item => cacheFiles.indexOf(item) === -1)

  return upload(files, () => {
    fs.writeFileSync(cachePath, JSON.stringify(allFiles))
  })
}

function uploadSCP (files, callback) {
  files = files.concat([
    'dist/index.html',
    'dist/service-worker.js'
  ])
  files.forEach(file => {
    console.log(chalk.green(file))
  })

  return gulp.src(files, { base: 'dist' })
    .pipe(gulp.dest(`${pkg.name}`))
    .on('end', () => {
      return exec(`scp -r ${pkg.name} ${ftppass.test.username}@${ftppass.test.host}:/home/appops/app/activity`, () => {
        exec(`rm -rf ${pkg.name}`)
        callback && callback()
      })
    })
}

function uploadCDN (files, callback) {
  files = files.map(item => item.replace(/^dist\//, ''))

  return easeftp.addFile(files, {
    debug: true,
    ...ftppass.publish,
    path: 'activity/' + pkg.name,
    cwd: path.resolve('dist')
  }).then(() => {
    callback && callback()

    easeftp.addFile(['index.html', 'service-worker.js'], {
      debug: true,
      ...ftppass.publish,
      path: 'html/activity/' + pkg.name,
      cwd: path.resolve('dist')
    })
  })
}