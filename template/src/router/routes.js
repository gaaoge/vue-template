import Home from 'pages/Home'

const routes = [
  {path: '*', redirect: '/home'},
  {path: '/home', component: Home}
]

export default routes
