<template>
  <div class="base-dialog" :class="name" v-if="isShow">
    <slot></slot>
    <div class="close" @click="closeDialog" v-if="!isHideClose"></div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex'

  export default {
    name: 'base-dialog',
    props: ['name'],
    computed: {
      isShow () {
        return this.modalConfig.dialog === this.name
      },
      isHideClose () {
        return this.modalConfig.isHideClose
      },
      ...mapState(['modalConfig'])
    },
    methods: {
      ...mapActions(['closeDialog'])
    }
  }
</script>

<style>
  .base-dialog {
    position: relative;
  }
</style>