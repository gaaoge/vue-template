<template>
  <div class="base-page" :style="{ width, height }">
    <slot></slot>
    <div class="dialogs" :style="{ width }">
      <slot name="dialogs"></slot>
    </div>
  </div>
</template>

<script>
const designWidth = 750 // 设计稿宽度
const designHeight = 1206 // 设计稿高度
const designRem = 100 // 设计rem对应px的比例
const defaultRem = getDefaultRem() // 浏览器默认rem对应px的比例

function getDefaultRem() {
  return parseInt(window.getComputedStyle(document.documentElement).fontSize)
}

export default {
  name: 'base-page',
  props: {
    scrollable: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      isLandscape: false,
      timer: null,
    }
  },
  computed: {
    width() {
      if (this.isLandscape) {
        return designWidth / designRem + 'rem'
      }
      return '100vw'
    },
    height() {
      if (this.scrollable) {
        return 'auto'
      }
      if (this.isLandscape) {
        return designHeight / designRem + 'rem'
      }
      return '100vh'
    },
  },
  created() {
    this.updateRem()
    window.addEventListener('resize', this.onResize)
  },
  destroyed() {
    window.removeEventListener('resize', this.onResize)
  },
  methods: {
    updateRem() {
      let clientWidth = window.innerWidth
      let clientHeight = window.innerHeight
      this.isLandscape = clientWidth > clientHeight
      if (window.orientation === 0 || window.orientation === 180) {
        this.isLandscape = false
      }

      let scale
      if (this.isLandscape) {
        scale = (clientHeight * (designWidth / designHeight)) / designWidth
      } else {
        scale = clientWidth / designWidth

        if (clientHeight < designHeight * scale && !this.scrollable) {
          scale = scale * (clientHeight / (designHeight * scale))
        }
      }

      document.documentElement.style.fontSize =
        ((scale * designRem) / defaultRem) * 100 + '%'
    },
    onResize() {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.updateRem, 300)
    },
  },
}
</script>

<style lang="postcss" scoped>
.base-page {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
  background: #fff;
  border: 0 solid transparent;
  border-top-width: env(safe-area-inset-top);
  border-bottom-width: env(safe-area-inset-bottom);
}

.dialogs {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 9999;
  pointer-events: none;
}
</style>
