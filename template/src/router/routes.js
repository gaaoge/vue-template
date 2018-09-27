import Home from '@/pages/home/Home'

const routes = [
  { path: '*', redirect: '/home' },
  { path: '/home', component: Home }
]

export default routes
