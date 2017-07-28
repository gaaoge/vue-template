/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue';
import VueTap from 'v-tap';

import router from './router';
import store from './store';
import Main from './Main.vue';

//Vue插件
Vue.use(VueTap);

//Vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
});