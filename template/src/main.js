/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue';

import router from './router';
import store from './store';
import Main from './Main.vue';

//Vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
});

//离线缓存Service Worker
if(process.env.NODE_ENV === 'production') {
    require('offline-plugin/runtime').install();
}