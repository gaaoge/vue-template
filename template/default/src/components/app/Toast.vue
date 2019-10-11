<template>
  <transition name="app-toast">
    <div v-if="isShow" class="app-toast">
      <span>{{ content }}</span>
    </div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    isShow() {
      return this.toastConfig.isShow
    },
    content() {
      return this.toastConfig.content
    },
    ...mapState('app', ['toastConfig'])
  }
}
</script>

<style lang="postcss" scoped>
.app-toast {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate3d(-50%, -150%, 0);
  z-index: 10000;

  & span {
    display: block;
    max-width: 600px;
    padding: 30px;
    color: #fff;
    font-size: 30px;
    line-height: 50px;
    border-radius: 10px;
    background: rgba(0, 0, 0, 0.75);
    white-space: pre-wrap;
    text-align: center;
  }
}

.app-toast-enter-active,
.app-toast-leave-active {
  transition-duration: 0.3s;
}

.app-toast-enter {
  opacity: 0;
  transform: translate3d(-50%, -150%, 0) scale(0.8);
}

.app-toast-leave-to {
  opacity: 0;
}
</style>
