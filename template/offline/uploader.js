const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const http = require('http')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Uploader = require('@newap/uploader')
const offlineTool = require('@mf2e/offline-tool')

let cacheDir = path.resolve('node_modules/.cache/uploader/')
let cachePath = `${cacheDir}/cache-files.json`
let uploadConfig = {}

function findFiles(rootPath, replacePath = '') {
  let result = []

  function finder(tempPath) {
    let files = fs.readdirSync(tempPath)
    files.forEach(val => {
      let fPath = path.posix.join(tempPath, val)
      let stats = fs.statSync(fPath)

      if (stats.isDirectory()) {
        finder(fPath)
      } else if (stats.isFile() && !/DS_Store/.test(fPath)) {
        result.push(fPath.replace(rootPath, replacePath))
      }
    })
  }

  finder(rootPath)
  return result
}

function getCacheFiles() {
  let cacheFiles = []
  if (fs.existsSync(cachePath)) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }
  return cacheFiles
}

function saveCacheFiles(files) {
  if (!fs.existsSync(cacheDir)) {
    cacheDir.split('/').reduce((current, next) => {
      const full = path.resolve(current, next)
      if (!fs.existsSync(full)) {
        fs.mkdirSync(full)
      }
      return full
    }, '/')
  }
  fs.writeFileSync(cachePath, JSON.stringify(files))
}

function clearStaticCache() {
  let cacheFiles = getCacheFiles()
  let updateFiles = cacheFiles.filter(item => item.split('.').length !== 3)

  updateFiles.forEach(item => {
    let url = `https://static.ws.126.net/163/activity/${pkg.name}/static/${item}`
    http.get(
      `http://purge.ws.netease.com/api/purge?url=${encodeURIComponent(url)}`
    )
  })
}

async function uploadStatic() {
  console.log(chalk.bold.yellow('正在上传static...'))

  let allFiles = findFiles(`dist/static/`)
  let cacheFiles = uploadConfig.clearCache ? [] : getCacheFiles()

  await new Uploader({
    dir: './dist/static',
    target: `activity/${pkg.name}/static`,
    exclude: cacheFiles.map(item => new RegExp(path.basename(item)))
  }).run()

  saveCacheFiles(allFiles)
  uploadConfig.clearCache && clearStaticCache()
}

async function uploadHtml() {
  console.log(chalk.bold.yellow('正在上传html...'))
  if (uploadConfig.targets.includes('test')) {
    fs.copyFileSync('./dist/index.html', './dist/test.html')
  }

  await new Uploader({
    dir: './dist',
    target: `page/newsapp/activity/${pkg.name}`,
    include: uploadConfig.targets
      .map(item => new RegExp(`${item}\.html`))
      .concat([/service-worker\.js/]),
    htmlDefaultPath: false
  }).run()
}

async function uploadZip() {
  if (uploadConfig.targets.includes('index')) {
    console.log(chalk.bold.yellow('正在上传zip...'))
    await offlineTool.build(
      [
        {
          name: `activity-${pkg.name}`,
          description: pkg.description,
          url: [
            `//wp.m.163.com/163/html/newsapp/activity/${pkg.name}/index.html`
          ],
          srcDir: './dist/index.html',
          apiList: []
        }
      ],
      'production'
    )
  }
}
async function upload() {
  uploadConfig = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'targets',
      message: `请选择上传目标：${chalk.bold.yellow('(可同时勾选)')}`,
      choices: [
        {
          name: chalk.bold.yellow('测试地址'),
          value: 'test'
        },
        {
          name: chalk.bold.yellow('正式地址'),
          value: 'index'
        }
      ],
      validate(input) {
        if (input.length === 0) {
          return '请至少选择一项'
        }
        return true
      }
    },
    {
      type: 'confirm',
      name: 'clearCache',
      message: `是否清缓存上传？${chalk.bold.yellow(
        '(若static资源有改动，请选是)'
      )}`,
      default: false
    }
  ])

  await uploadStatic()
  await uploadHtml()
  await uploadZip()
}

upload()
