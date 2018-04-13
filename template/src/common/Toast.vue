<template>
  <transition name="common-toast">
    <div class="common-toast" v-if="isShow">
      <span>{{content}}</span>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data () {
      return {
        timer: null
      }
    },
    computed: {
      isShow () {
        return this.toastConfig.isShow
      },
      content () {
        return this.toastConfig.content
      },
      ...mapState(['toastConfig'])
    }
  }
</script>

<style type="text/postcss">
  .common-toast {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate3d(-50%, -50%, 0);
    z-index: 10000;

    & span {
      display: block;
      max-width: 600px;
      padding: 40px 30px;
      color: #fff;
      font-size: 30px;
      font-weight: 300;
      line-height: 50px;
      background: color(black alpha(-25%));
      white-space: pre-wrap;
    }
  }

  .common-toast-enter-active, .common-toast-leave-active {
    transition-duration: .3s;
  }

  .common-toast-enter {
    opacity: 0;
    transform: translate3d(-50%, -50%, 0) scale(0.8);
  }

  .common-toast-leave-active {
    opacity: 0;
  }
</style>