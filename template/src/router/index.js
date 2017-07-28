/**
 * Created by GG on 2017/1/4.
 */

import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '../app/Home.vue';

Vue.use(VueRouter);

const router = new VueRouter({
    routes: [
        {path: '/', component: Home}
    ]
});

export default router;