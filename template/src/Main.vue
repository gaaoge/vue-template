<template>
    <div class="main">
        <router-view></router-view>
    </div>
</template>

<script>
    import Vue from 'vue';
    import CommonShare from './common/Share.vue';
    import CommonToast from './common/Toast.vue';

    export default {
        created() {
            //注册全局通用组件
            Vue.component('common-share', CommonShare);
            Vue.component('common-toast', CommonToast);

            //分享配置
            NewsappShare.update({
                title: '分享标题',
                desc: '分享描述',
                img_url: NewsappShare.getAbsPath('resource/assets/share-icon.png'),
                link: NewsappShare.getAbsPath()
            });
        }
    }
</script>

<style type="text/postcss">
    html, body {
        height: 100%;
        overflow: hidden;
        background: #fff;
    }

    body {
        font: 28px/1.2 sans-serif;
        -webkit-tap-highlight-color: transparent;
        -webkit-overflow-scrolling: touch;
        -webkit-user-select: none;
    }

    .main {
        position: relative;
        width: 750px;
        height: 100%;
        margin: 0 auto;
        overflow: hidden;

        &:before {
            content: '';
            position: absolute;
            left: 0;
            top: 0;
        }
    }
</style>
