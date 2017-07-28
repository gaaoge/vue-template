<template>
    <transition name="common-toast">
        <div class="common-toast" v-show="isShow">
            <span>{{content}}</span>
        </div>
    </transition>
</template>

<script>
    export default {
        data() {
            return {
                content: '',
                isShow: false
            };
        },
        methods: {
            show(content) {
                this.content = content;
                this.isShow = true;
                setTimeout(() => {
                    this.isShow = false;
                }, 2000);
            }
        }
    }
</script>

<style type="text/postcss">
    .common-toast {
        position: fixed;
        left: 0;
        right: 0;
        bottom: 100px;
        text-align: center;
        transform: translate3d(0, 0, 0);
        z-index: 10000;

        & span {
            display: inline-block;
            max-width: 600px;
            padding: 10px 20px;
            border-radius: 8px;
            color: #fff;
            background: color(black alpha(-20%));
        }
    }

    .common-toast-enter-active, .common-toast-leave-active {
        transition-duration: .3s;
    }

    .common-toast-enter {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    .common-toast-leave-active {
        opacity: 0;
    }
</style>