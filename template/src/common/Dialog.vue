<template>
  <transition name="common-dialog">
    <div class="common-dialog" v-show="isOpen" @touchmove="preventDefault">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'common-dialog',
    data () {
      return {
        isOpen: false
      }
    },
    props: {
      prevent: {
        type: Boolean,
        default: true
      }
    },
    methods: {
      open () {
        this.isOpen = true
      },
      close () {
        this.isOpen = false
      },
      preventDefault (e) {
        this.prevent && e.preventDefault()
      }
    }
  }
</script>

<style type="text/postcss">
  .common-dialog {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: color(black alpha(-25%));
    z-index: 9999;
  }

  .common-dialog-enter-active, .common-dialog-leave-active {
    transition: opacity .3s;
  }

  .common-dialog-enter, .common-dialog-leave-active {
    opacity: 0;
  }
</style>