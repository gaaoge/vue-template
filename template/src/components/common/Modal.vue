<template>
  <transition name="common-modal">
    <div class="common-modal" v-if="isShow" @touchmove="preventDefault">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    name: 'common-modal',
    computed: {
      isShow () {
        return this.modalConfig.isShow
      },
      isScroll () {
        return this.modalConfig.isScroll
      },
      ...mapState(['modalConfig'])
    },
    methods: {
      preventDefault (e) {
        !this.isScroll && e.preventDefault()
      }
    }
  }
</script>

<style>
  .common-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 750px;
    background: rgba(0, 0, 0, 0.75);
    z-index: 9999;
  }

  .common-modal-enter-active, .common-modal-leave-active {
    transition: opacity .3s;
  }

  .common-modal-enter, .common-modal-leave-active {
    opacity: 0;
  }
</style>