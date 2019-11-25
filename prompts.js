module.exports = [
  {
    name: 'name',
    type: 'input',
    message: '项目名称(日期命名)'
  },
  {
    name: 'description',
    type: 'input',
    message: '项目描述'
  },
  {
    name: 'author',
    type: 'input',
    message: '项目作者'
  },
  {
    name: 'title',
    type: 'input',
    message: '首页标题'
  },
  {
    name: 'projectId',
    type: 'input',
    message: '蚂蚁统计Id'
  },
  {
    name: 'dragonbones',
    type: 'confirm',
    message: '是否使用dragonbones龙骨动画？',
    default: false
  },
  {
    name: 'offline',
    type: 'confirm',
    message: '是否端内离线项目？',
    default: false
  }
]
