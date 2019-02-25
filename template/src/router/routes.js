import Home from '@/pages/home/Main'

const routes = [
  { path: '*', redirect: '/home' },
  { path: '/home', component: Home }
]

export default routes
