const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const Uploader = require('@newap/uploader')
const cacheDir = path.resolve('node_modules/.cache/uploader/')

function findFiles(rootPath, replacePath = '') {
  let result = []

  function finder(tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach(val => {
      let fPath = path.posix.join(tempPath, val)
      let stats = fs.statSync(fPath)

      if (stats.isDirectory()) {
        finder(fPath)
      } else if (stats.isFile()) {
        result.push(fPath.replace(rootPath, replacePath))
      }
    })
  }

  finder(rootPath)
  return result
}

async function uploadStatic() {
  let allFiles = findFiles(`dist/static/`)
  let cacheFiles = []
  let cachePath = `${cacheDir}/cache-files.json`
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }

  await new Uploader({
    dir: './dist/static',
    target: `activity/${pkg.name}/static`,
    exclude: cacheFiles.map(item => new RegExp(path.basename(item)))
  }).run()

  if (!fs.existsSync(cacheDir)) {
    cacheDir.split('/').reduce((current, next) => {
      const full = path.resolve(current, next)
      if (!fs.existsSync(full)) {
        fs.mkdirSync(full)
      }
      return full
    }, '/')
  }
  fs.writeFileSync(cachePath, JSON.stringify(allFiles))
}

async function uploadHtml() {
  let html = /index\.html/
  if (process.argv[2] === '--test') {
    fs.copyFileSync('./dist/index.html', './dist/test.html')
    html = /test\.html/
  }

  await new Uploader({
    dir: './dist',
    target: `page/newsapp/activity/${pkg.name}`,
    include: [html, /service-worker\.js/],
    htmlDefaultPath: false
  }).run()
}

async function upload() {
  await uploadStatic()
  await uploadHtml()
}

upload()
