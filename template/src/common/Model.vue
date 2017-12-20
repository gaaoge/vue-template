<template>
  <transition name="common-model">
    <div class="common-model" v-show="isShow" @touchmove="preventDefault" @click="onClick">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  export default {
    name: 'common-model',
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
  .common-model {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: color(black alpha(-25%));
    z-index: 9999;
  }

  .common-model-enter-active, .common-model-leave-active {
    transition: opacity .3s;
  }

  .common-model-enter, .common-model-leave-active {
    opacity: 0;
  }
</style>