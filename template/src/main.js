/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue';
import VueTap from 'v-tap';
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';

import router from './router';
import Main from './app/Main.vue';

//Vue插件
Vue.use(VueTap);
Vue.use(VueRouter);
Vue.use(VueAxios, axios);

//Vue实例
new Vue({
    el: '#app',
    router,
    render: h => h(Main)
});