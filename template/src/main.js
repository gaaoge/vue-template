/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue';

import router from './router';
import store from './store';
import Main from './Main.vue';

import * as OfflinePlugin from 'offline-plugin/runtime';

//Vue实例
new Vue({
    el: '#app',
    router,
    store,
    render: h => h(Main)
});

//离线缓存Service Worker
OfflinePlugin.install();