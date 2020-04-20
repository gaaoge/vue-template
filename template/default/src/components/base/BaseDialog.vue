<template>
  <transition name="base-dialog">
    <div v-if="isShow" class="base-dialog" @touchmove.prevent>
      <div class="mask" :style="maskStyle" @click="clickMask"></div>
      <div :class="type">
        <slot></slot>
        <div v-if="mergedConfig.isShowClose" @click="close">
          <slot name="close">
            <div class="close"></div>
          </slot>
        </div>
      </div>
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
      default: '',
    },
    type: {
      type: String,
      default: 'dialog',
    },
    config: {
      type: Object,
      default() {
        return {}
      },
    },
  },
  data() {
    return {
      defaultConfig: {
        maskOpacity: 0.6,
        isMaskClose: true,
        isShowClose: true,
      },
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
    ...mapState('app', ['dialogConfig']),
  },
  watch: {
    isShow(val) {
      this.$emit(val ? 'open' : 'close', this.totalConfig.params)
    },
  },
  destroyed() {
    this.isShow && this.close()
  },
  methods: {
    clickMask() {
      this.mergedConfig.isMaskClose && this.close()
    },
    close() {
      this.closeDialog(this.name)
    },
    ...mapActions('app', ['closeDialog']),
  },
}
</script>

<style lang="postcss" scoped>
.base-dialog {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
}

.base-dialog-enter-active {
  transition: all 0.3s;

  & .mask {
    animation: fade-in 0.3s both;
  }

  & .dialog {
    animation: scale-in 0.3s both;
  }

  & .panel {
    animation: slide-in 0.3s both;
  }
}

.base-dialog-leave-active {
  transition: all 0.3s;

  & .mask {
    animation: fade-in 0.3s reverse both;
  }

  & .dialog {
    animation: scale-in 0.3s reverse both;
  }

  & .panel {
    animation: slide-in 0.3s reverse both;
  }
}

.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0.6);
}

.dialog {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -50px;
  transform: translate(-50%, -50%);
}

.panel {
  position: absolute;
  bottom: 0;
  width: 100%;
}

.close {
  position: absolute;
  left: 50%;
  bottom: -100px;
  background: url('../../assets/dialog-close.png');
  transform: translateX(-50%);
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
