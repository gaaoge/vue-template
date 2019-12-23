const pkg = require('./package.json')
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const inquirer = require('inquirer')
const Uploader = require('@newap/uploader')
const offlineTool = require('@mf2e/offline-tool')

const cacheDir = path.resolve('node_modules/.cache/uploader/')
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

async function uploadStatic() {
  let allFiles = findFiles(`dist/static/`)
  let cacheFiles = []
  let cachePath = `${cacheDir}/cache-files.json`
  if (fs.existsSync(cachePath) && !uploadConfig.noCache) {
    cacheFiles = JSON.parse(fs.readFileSync(cachePath, 'utf-8'))
  }

  console.log(chalk.bold.yellow('正在上传static...'))
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
  if (uploadConfig.targets.length === 0) return
  if (uploadConfig.targets.includes('test')) {
    fs.copyFileSync('./dist/index.html', './dist/test.html')
  }

  let include = uploadConfig.targets.map(
    target => new RegExp(`${target}\.html`)
  )
  include.push(/service-worker\.js/)

  console.log(chalk.bold.yellow('正在上传html...'))
  await new Uploader({
    dir: './dist',
    target: `html/newsapp/activity/${pkg.name}`,
    include,
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
      message: '请选择目标:',
      choices: [
        {
          name: chalk.bold.yellow('测试地址'),
          value: 'test'
        },
        {
          name: chalk.bold.yellow('正式地址'),
          value: 'index'
        }
      ]
    },
    {
      type: 'confirm',
      name: 'noCache',
      message: '是否清缓存上传？',
      default: false
    }
  ])

  await uploadStatic()
  await uploadHtml()
  await uploadZip()
}

upload()
