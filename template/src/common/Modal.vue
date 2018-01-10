<template>
  <transition name="common-modal">
    <div class="common-modal" v-show="isShow" @touchmove="preventDefault" @click="onClick">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'common-modal',
    data () {
      return {
        isShow: false
      }
    },
    props: {
      prevent: {
        type: Boolean,
        default: true
      },
      clickHide: {
        type: Boolean,
        default: false
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
      },
      onClick () {
        this.clickHide && this.hide()
      }
    }
  }
</script>

<style type="text/postcss">
  .common-modal {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: color(black alpha(-25%));
    z-index: 9999;
  }

  .common-modal-enter-active, .common-modal-leave-active {
    transition: opacity .3s;
  }

  .common-modal-enter, .common-modal-leave-active {
    opacity: 0;
  }
</style>