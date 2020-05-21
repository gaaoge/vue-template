<template>
  <div class="app-router">
    <transition :name="direction">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app-router',
  data() {
    return {
      direction: '',
      paths: [],
      isGesture: false,
    }
  },
  watch: {
    '$route'(to, from) {
      let lastIndex = this.paths.findIndex((item, index) => {
        return item === to.path && index === to.meta.index
      })

      if (lastIndex === -1) {
        to.meta.index = this.paths.length
        this.paths.push(to.path)
        this.direction = from.path === '/' ? 'replace' : 'forward'
      } else {
        this.paths.splice(lastIndex + 1)
        this.direction = 'backward'
      }

      if (this.isGesture) {
        this.direction = 'replace'
      }
    },
  },
  created() {
    let touchX
    document.body.addEventListener('touchstart', (e) => {
      touchX = e.changedTouches[0].clientX
    })
    document.body.addEventListener('touchend', (e) => {
      if (Math.abs(e.changedTouches[0].clientX - touchX) > 10) {
        this.isGesture = true
      } else {
        this.isGesture = false
      }
    })
  },
}
</script>

<style lang="postcss" scoped>
.app-router {
  position: relative;
  overflow: hidden;
}

.forward-enter-active,
.forward-leave-active,
.backward-enter-active,
.backward-leave-active {
  transform-style: preserve-3d;
}

.forward-enter-active {
  position: absolute !important;
  top: 0 !important;
  animation: forward-enter 0.4s ease;
}

.forward-leave-active {
  animation: forward-leave 0.4s ease;
}

.backward-enter-active {
  position: absolute !important;
  top: 0 !important;
  animation: backward-enter 0.4s ease;
}

.backward-leave-active {
  animation: backward-leave 0.4s ease;
}

.replace-leave-active {
  display: none;
}

@keyframes forward-enter {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes forward-leave {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(-100%);
  }
}

@keyframes backward-enter {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(0%);
  }
}

@keyframes backward-leave {
  0% {
    transform: translateX(0%);
  }
  100% {
    transform: translateX(100%);
  }
}
</style>
