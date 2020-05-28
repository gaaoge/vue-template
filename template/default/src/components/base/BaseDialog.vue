<template>
  <transition name="base-dialog">
    <div v-if="isShow" class="base-dialog" @touchmove.prevent>
      <div class="mask" :style="maskStyle" @click="clickMask"></div>
      <div :class="type">
        <slot></slot>
        <slot v-if="mergedConfig.isShowClose" name="close">
          <div class="close" @click="close"></div>
        </slot>
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
    totalConfig(newVal, oldVal) {
      if (this.isShow) {
        this.$emit('open', newVal.params)
      } else {
        this.$emit('close', oldVal.params)
      }
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
  pointer-events: auto;
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

  & .close {
    position: absolute;
    left: 50%;
    bottom: -100px;
    transform: translate(-50%);
    background: url('../../assets/dialog-close.png');
  }
}

.panel {
  position: absolute;
  bottom: 0;
  width: 100%;

  & .close {
    position: absolute;
    top: 0;
    right: 0;

    &:before {
      content: '';
      display: block;
      margin: 40px;
      background: url('../../assets/panel-close.png');
    }
  }
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
    transform-style: preserve-3d;
  }
  100% {
    opacity: 1;
    transform: translate(-50%, -50%) scale(1);
  }
}

@keyframes slide-in {
  0% {
    transform: translateY(100%);
    transform-style: preserve-3d;
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
