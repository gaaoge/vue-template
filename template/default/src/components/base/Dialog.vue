<template>
  <base-modal :dialog="name">
    <div class="base-dialog">
      <slot></slot>
    </div>
    <div class="close" @click="close"></div>
  </base-modal>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'base-dialog',
  props: {
    name: {
      type: String,
      default: ''
    }
  },
  methods: {
    close() {
      this.closeDialog(this.name)
    },
    ...mapActions('app', ['closeDialog'])
  }
}
</script>

<style lang="postcss" scoped>
.base-dialog {
  position: relative;
  animation: dialog 0.3s both;
}

.close {
  flex: none;
  margin-top: 40px;
  background: url('../../assets/dialog-close.png');
  animation: close 0.3s both;
}

@keyframes dialog {
  0% {
    opacity: 0;
    transform: scale3d(0.6);
  }
  100% {
    opacity: 1;
    transform: scale3d(1);
  }
}

@keyframes close {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
