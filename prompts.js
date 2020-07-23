module.exports = [
  {
    name: 'name',
    type: 'input',
    message: '项目名称',
  },
  {
    name: 'description',
    type: 'input',
    message: '项目描述',
  },
  {
    name: 'author',
    type: 'input',
    message: '项目作者',
  },
  {
    name: 'title',
    type: 'input',
    message: '首页标题',
  },
  {
    name: 'projectId',
    type: 'input',
    message: '蚂蚁统计Id',
  },
  {
    type: 'checkbox',
    name: 'extends',
    message: '扩展功能：',
    choices: [
      {
        name: 'dragonbones龙骨动画',
        value: 'dragonbones',
      },
      {
        name: '客户端离线功能',
        value: 'offline',
      },
    ],
  },
]
