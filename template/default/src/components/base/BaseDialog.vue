<template>
  <transition name="base-dialog">
    <div v-if="isShow" class="base-dialog" @click.self="onClick">
      <div class="dialog">
        <slot></slot>
      </div>
      <div v-if="showClose" class="close" @click="close"></div>
    </div>
  </transition>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'base-dialog',
  props: {
    name: {
      type: String,
      default: ''
    },
    clickClose: {
      type: Boolean,
      default: true
    },
    showClose: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    isShow() {
      return !!this.config
    },
    config() {
      return this.dialogConfig[this.name]
    },
    params() {
      return this.config && this.config.params
    },
    ...mapState('app', ['dialogConfig'])
  },
  watch: {
    isShow(val) {
      this.$emit(val ? 'open' : 'close', this.params)
    }
  },
  methods: {
    onClick() {
      this.clickClose && this.close()
    },
    close() {
      this.closeDialog(this.name)
    },
    ...mapActions('app', ['closeDialog'])
  }
}
</script>

<style lang="postcss" scoped>
.base-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 9999;
}

.base-dialog-enter-active,
.base-dialog-leave-active {
  transition: opacity 0.3s;
}

.base-dialog-enter,
.base-dialog-leave-to {
  opacity: 0;
}

.dialog {
  position: relative;
  animation: dialog 0.3s both;
}

.close {
  flex: none;
  margin-top: 50px;
  background: url('../../assets/dialog-close.png');
  animation: close 0.3s both;
}

@keyframes dialog {
  0% {
    opacity: 0;
    transform: scale(0.6);
  }
  100% {
    opacity: 1;
    transform: scale(1);
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
