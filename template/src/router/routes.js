import Home from '@/pages/home/Page'

const routes = [
  { path: '*', redirect: '/home' },
  { path: '/home', component: Home }
]

export default routes
