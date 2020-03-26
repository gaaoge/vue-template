<template>
  <div class="base-dialog">
    <transition name="mask">
      <div
        v-if="isShow"
        class="mask"
        :style="maskStyle"
        @click="clickMask"
        @touchmove.prevent
      ></div>
    </transition>
    <transition :name="type">
      <div v-if="isShow" :class="type" @touchmove.prevent>
        <slot></slot>
        <div v-if="mergedConfig.isShowClose" @click="close">
          <slot name="close">
            <div class="close"></div>
          </slot>
        </div>
      </div>
    </transition>
  </div>
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
    type: {
      type: String,
      default: 'dialog'
    },
    config: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      defaultConfig: {
        maskOpacity: 0.6,
        isMaskClose: true,
        isShowClose: true
      }
    }
  },
  computed: {
    isShow() {
      return !!this.dialogConfig[this.name]
    },
    totalConfig() {
      return this.dialogConfig[this.name] || {}
    },
    mergedConfig() {
      let mergedConfig = Object.assign({}, this.defaultConfig, this.config)
      return Object.assign({}, mergedConfig, this.totalConfig.config)
    },
    maskStyle() {
      return { background: `rgba(0, 0, 0, ${this.mergedConfig.maskOpacity})` }
    },
    ...mapState('app', ['dialogConfig'])
  },
  watch: {
    isShow(val) {
      this.$emit(val ? 'open' : 'close', this.totalConfig.params)
    }
  },
  methods: {
    clickMask() {
      this.mergedConfig.isMaskClose && this.close()
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
  position: fixed;
  z-index: 9999;
}

.mask {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750px;
  background: rgba(0, 0, 0.6);
}

.mask-enter-active {
  animation: fade-in 0.3s;
}

.mask-leave-active {
  animation: fade-in 0.3s reverse;
}

.dialog {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.dialog-enter-active {
  animation: scale-in 0.3s;
}

.dialog-leave-active {
  animation: scale-in 0.3s reverse;
}

.panel {
  position: fixed;
  bottom: 0;
}

.panel-enter-active {
  animation: slide-in 0.3s;
}

.panel-leave-active {
  animation: slide-in 0.3s reverse;
}

.close {
  margin: 50px auto 0;
  background: url('../../assets/dialog-close.png');
}

@keyframes fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes scale-in {
  0% {
    opacity: 0;
    transform: translate(-50%, -50%) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
