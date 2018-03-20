/**
 * Created by GG on 2017/1/4.
 */

import Vue from 'vue'
import VueRouter from 'vue-router'

const AppHome = () => import('../app/Home')

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {path: '/', component: AppHome}
  ]
})

export default router
