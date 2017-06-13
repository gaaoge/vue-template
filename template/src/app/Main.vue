<template>
    <div class="main">

    </div>
</template>

<script>
    import Vue from 'vue';
    import CommonShare from '../common/Share.vue';

    export default {
        name: 'main',
        created() {
            //注册全局通用组件
            Vue.component('common-share', CommonShare);

            //分享配置
            NewsappShare.update({
                title: '',
                desc: '',
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
    }

    body {
        font: 28px/1.2 sans-serif;
        transform: translate3d(0, 0, 0);
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
    }
</style>
