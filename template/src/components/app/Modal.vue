<template>
  <transition name="app-modal">
    <div class="app-modal" v-if="isShow" @touchmove="preventDefault" @click.self="clickClose">
      <component :is="dialog"></component>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'app-modal',
    computed: {
      isShow () {
        return this.modalConfig.isShow
      },
      isScroll () {
        return this.modalConfig.isScroll
      },
      isClickClose () {
        return this.modalConfig.isClickClose
      },
      dialog () {
        return this.modalConfig.dialog
      },
      ...mapState(['modalConfig'])
    },
    methods: {
      preventDefault (e) {
        !this.isScroll && e.preventDefault()
      },
      clickClose (e) {
        this.isClickClose && this.closeDialog()
      },
      ...mapActions(['closeDialog'])
    }
  }
</script>

<style>
  .app-modal {
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

  .app-modal-enter-active, .app-modal-leave-active {
    transition: opacity .3s;
  }

  .app-modal-enter, .app-modal-leave-to {
    opacity: 0;
  }
</style>