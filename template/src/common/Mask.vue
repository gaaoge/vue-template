<template>
  <transition name="common-mask">
    <div class="common-mask" v-show="isShow" @touchmove="preventDefault">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'common-mask',
    data () {
      return {
        isShow: false
      }
    },
    props: {
      prevent: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      show () {
        this.isShow = true
      },
      hide () {
        this.isShow = false
      },
      preventDefault (e) {
        this.prevent && e.preventDefault()
      }
    }
  }
</script>

<style type="text/postcss">
  .common-mask {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: color(black alpha(-25%));
    z-index: 9999;
  }

  .common-mask-enter-active, .common-mask-leave-active {
    transition: opacity .3s;
  }

  .common-mask-enter, .common-mask-leave-active {
    opacity: 0;
  }
</style>