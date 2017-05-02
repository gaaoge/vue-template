<template>
    <transition name="common-share">
        <div class="common-share" v-show="isShow" v-tap="{methods:hide}">
            <div class="notice"></div>
            <img src="../../resource/assets/share-icon.png" style="display: none">
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                isShow: false
            }
        },
        methods: {
            show(callback) {
                if (NewsappClient.isNewsapp) {
                    NewsappClient.share(callback);
                } else {
                    this.isShow = true;
                    setTimeout(() => {
                        this.isShow = false;
                    }, 2000);
                    NewsappClient.Callbacks.afterShare = [callback];
                }
            },
            hide() {
                this.isShow = false;
            }
        }
    }
</script>

<style type="text/postcss">
    .common-share {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: color(black alpha(-30%));
        z-index: 10000;

        & .notice {
            position: absolute;
            right: 50px;
            top: 50px;
            width: 380px;
            height: 140px;
            background: url("/resource/assets/share-notice.png");
        }
    }

    .common-share-enter-active, .common-share-leave-active {
        transition: opacity .3s;
    }

    .common-share-enter, .common-share-leave-active {
        opacity: 0
    }
</style>