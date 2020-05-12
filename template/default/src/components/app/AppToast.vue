<template>
  <transition name="app-toast">
    <div v-if="isShow" class="app-toast">{{ content }}</div>
  </transition>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'app-toast',
  computed: {
    isShow() {
      return this.toastConfig.isShow
    },
    content() {
      return this.toastConfig.content
    },
    ...mapState('app', ['toastConfig']),
  },
}
</script>

<style lang="postcss" scoped>
.app-toast {
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  padding: 30px;
  color: #fff;
  font-size: 30px;
  white-space: pre-wrap;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.75);
  transform: translate(-50%, -75%);
  animation: toast 0.3s both;
}

.app-toast-enter-active,
.app-toast-leave-active {
  transition-duration: 0.3s;
}

.app-toast-enter,
.app-toast-leave-to {
  opacity: 0;
}

@keyframes toast {
  0% {
    transform: translate(-50%, -75%) scale(0.6);
  }
  100% {
    transform: translate(-50%, -75%) scale(1);
  }
}
</style>
