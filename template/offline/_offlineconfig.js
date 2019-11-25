const fs = require('fs')

module.exports = {
  product: 'newsapp', // 离线管理系统里对应的产品名
  secret: '5cb03c4ce2d7e58707ac3a42', // 离线管理系统产品下对应的秘钥
  ftp: {
    path: 'frontend/offline'
  },
  zipType: 'all' // 打包页面html依赖的所有符合规则的静态资源，包括js，css，图片等。缺省时静态资源只打包js和css。
}
