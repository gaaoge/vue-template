/**
 * Created by GG on 18/04/02.
 */

const pkg = require('../package.json')
const path = require('path')
const fs = require('fs')
const gulp = require('gulp')
const replace = require('gulp-replace')
const postcss = require('gulp-postcss')
const sprites = require('postcss-sprites')
const revHash = require('rev-hash')
const tinypng = require('gulp-tinypng-plugin')
const workbox = require('workbox-build')

let originalImages = []

function createSprites () {
  const spritesOptions = {
    spritePath: 'dist/img/sprites',
    spritesmith: {padding: 20},
    filterBy (image) {
      return /\?$/.test(image.originalUrl) ? Promise.reject(new Error('ignore')) : Promise.resolve()
    },
    groupBy (image) {
      let groupName = image.originalUrl.split('?')[1]
      let moduleName = path.basename(image.styleFilePath).replace(/\..*\.css/, '')
      return Promise.resolve(groupName || moduleName)
    },
    hooks: {
      onUpdateRule (rule, token, image) {
        const {coords, spriteUrl, spriteWidth, spriteHeight} = image
        const posX = (coords.x / (spriteWidth - coords.width)) * 100
        const posY = (coords.y / (spriteHeight - coords.height)) * 100
        const sizeX = (spriteWidth / coords.width) * 100
        const sizeY = (spriteHeight / coords.height) * 100

        token.cloneAfter({
          type: 'decl',
          prop: 'background-image',
          value: `url(${spriteUrl})`
        }).cloneAfter({
          prop: 'background-position',
          value: `${posX || 0}% ${posY || 0}%`
        }).cloneAfter({
          prop: 'background-size',
          value: `${sizeX || 0}% ${sizeY || 0}%`
        }).cloneAfter({
          prop: 'background-repeat',
          value: 'no-repeat'
        })
      },
      onSaveSpritesheet (opts, spritesheet) {
        originalImages = originalImages.concat(Object.keys(spritesheet.coordinates))
        originalImages = Array.from(new Set(originalImages))

        return path.join(opts.spritePath, spritesheet.groups.concat([
          revHash(spritesheet.image),
          spritesheet.extension
        ]).join('.'))
      }
    }
  }

  return gulp.src('dist/css/*.css')
    .pipe(replace(/(\.png|jpe?g)#/g, '$1?'))
    .pipe(postcss([sprites(spritesOptions)]))
    .pipe(gulp.dest('dist/css'))
}

function compressImages () {
  originalImages.forEach((path) => {
    fs.unlink(path, () => {})
  })

  return gulp.src('dist/img/**/*.png')
    .pipe(tinypng({
      key: '6-qmxQevyQCCYb-gqGTMnF6LTE8Dzo3j',
      cache: true
    }))
    .pipe(gulp.dest('dist/img'))
}

function generateSW () {
  let manifestTransforms = []
  if (process.argv.includes('--cdn')) {
    manifestTransforms.push((entries) => {
      return {
        manifest: entries.map((entry) => {
          if (entry.url !== 'index.html') {
            entry.url = `${pkg.cdn}/${pkg.name}/` + entry.url
          }
          return entry
        })
      }
    })
  }

  workbox.generateSW({
    swDest: 'dist/service-worker.js',
    importWorkboxFrom: 'disabled',
    importScripts: ['https://static.ws.126.net/utf8/libs/workbox/v3.1.0/workbox-sw.js'],
    cacheId: pkg.name,
    globDirectory: 'dist/',
    globPatterns: ['**/*'],
    manifestTransforms
  })
}

const optimize = gulp.series(createSprites, compressImages, generateSW)
module.exports = optimize
