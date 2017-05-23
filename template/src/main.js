/**
 * Created by GG on 2016/11/30.
 */

import Vue from 'vue';
import VueTap from 'v-tap';
import VueRouter from 'vue-router';
import VueResource from 'vue-resource';

import router from './router';
import Main from './app/Main.vue';

//Vue插件
Vue.use(VueTap);
Vue.use(VueRouter);
Vue.use(VueResource);

//Vue实例
new Vue({
    el: '#app',
    router,
    render: h => h(Main)
});

//分享配置
NewsappShare.update({
    title: '',
    desc: '',
    img_url: NewsappShare.getAbsPath('resource/assets/share-icon.png'),
    link: NewsappShare.getAbsPath()
});