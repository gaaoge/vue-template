<template>
  <transition name="app-toast">
    <div v-if="isShow" class="app-toast">
      <div class="toast">{{ content }}</div>
    </div>
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
    ...mapState('app', ['toastConfig'])
  }
}
</script>

<style lang="postcss" scoped>
.app-toast {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  width: 750px;
  pointer-events: none;
  z-index: 10000;
}

.app-toast-enter-active,
.app-toast-leave-active {
  transition-duration: 0.3s;
}

.app-toast-enter,
.app-toast-leave-to {
  opacity: 0;
}

.toast {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 600px;
  margin-top: -100px;
  padding: 30px;
  color: #fff;
  font-size: 30px;
  border-radius: 10px;
  background: rgba(0, 0, 0, 0.75);
  white-space: pre-wrap;
  text-align: center;
  animation: toast 0.3s both;
}

@keyframes toast {
  0% {
    transform: scale(0.6);
  }
  100% {
    transform: scale(1);
  }
}
</style>
