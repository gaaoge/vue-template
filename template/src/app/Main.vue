<template>
    <div class="main">
        <transition name="slide">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    import Share from '../common/Share.vue';

    export default {
        name: 'main',
        created() {
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

        & .scene {
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            left: 0;
            display: flex;
            justify-content: center;
            align-items: center;
        }
    }

    .slide-enter-active, .slide-leave-active {
        transition: transform .6s ease;
    }

    .slide-enter {
        transform: translate(0, 100%);
    }

    .slide-leave-active {
        transform: translate(0, -100%);
    }
</style>
