<template>
  <transition name="base-modal">
    <div v-if="isShow" class="base-modal" @touchmove="preventDefault" @click.self="clickClose">
      <slot></slot>
    </div>
  </transition>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'base-modal',
    props: {
      dialog: {
        type: String,
        default: ''
      }
    },
    computed: {
      config () {
        return this.dialogConfig[this.dialog]
      },
      isShow () {
        return !!this.config
      },
      isScroll () {
        return this.config.isScroll
      },
      isForce () {
        return this.config.isForce
      },
      ...mapState(['dialogConfig'])
    },
    methods: {
      preventDefault (e) {
        !this.isScroll && e.preventDefault()
      },
      clickClose (e) {
        !this.isForce && this.closeDialog(this.dialog)
      },
      ...mapActions(['closeDialog'])
    }
  }
</script>

<style>
  .base-modal {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    bottom: 0;
    width: 750px;
    background: rgba(0, 0, 0, 0.8);
    z-index: 9999;
  }

  .base-modal-enter-active, .base-modal-leave-active {
    transition: opacity .3s;
  }

  .base-modal-enter, .base-modal-leave-to {
    opacity: 0;
  }
</style>
