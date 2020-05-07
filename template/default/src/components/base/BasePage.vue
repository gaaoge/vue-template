<template>
  <div class="base-page" :style="{ width, height }">
    <base-scroll v-if="scrollable">
      <slot></slot>
    </base-scroll>
    <slot v-else></slot>
    <slot name="dialogs"></slot>
  </div>
</template>

<script>
import { isAndroid } from '@/utils/detect'

const designWidth = 750 // 设计稿宽度
const designHeight = 1206 // 设计稿高度
const designRem = 100 // 设计rem对应px的比例

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
      return '100%'
    },
    height() {
      if (this.isLandscape) {
        return designHeight / designRem + 'rem'
      }
      return '100%'
    },
  },
  created() {
    this.updateRem()
    window.addEventListener(
      isAndroid ? 'orientationchange' : 'resize',
      this.onResize
    )
  },
  destroyed() {
    window.removeEventListener(
      isAndroid ? 'orientationchange' : 'resize',
      this.onResize
    )
  },
  methods: {
    updateRem() {
      let clientWidth = window.innerWidth
      let clientHeight = window.innerHeight
      this.isLandscape = clientWidth > clientHeight

      let scale
      if (this.isLandscape) {
        scale = (clientHeight * (designWidth / designHeight)) / designWidth
      } else {
        scale = clientWidth / designWidth

        if (clientHeight < designHeight * scale && !this.scrollable) {
          scale = scale * (clientHeight / (designHeight * scale))
        }
      }

      document.documentElement.style.fontSize = scale * designRem + 'px'
    },
    onResize() {
      clearTimeout(this.timer)
      this.timer = setTimeout(this.updateRem, 200)
    },
  },
}
</script>

<style lang="postcss" scoped>
.base-page {
  position: relative;
  margin: 0 auto;
  overflow: hidden;
}
</style>
