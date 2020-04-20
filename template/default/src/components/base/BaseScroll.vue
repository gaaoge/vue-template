<template>
  <div class="base-scroll">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: 'base-scroll',
  data() {
    return {
      bscroll: {
        instance: null,
      },
    }
  },
  provide() {
    return {
      bscroll: this.bscroll,
    }
  },
  mounted() {
    this.bscroll.instance = new BScroll(this.$el, {
      swipeBounceTime: 200,
      click: true,
      scrollbar: true,
      mouseWheel: true,
      observeDom: true,
      nestedScroll: true,
    })
  },
}
</script>

<style lang="postcss" scoped>
.base-scroll {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

.content {
  position: relative;
  height: auto;
}
</style>

<style lang="postcss">
.bscroll-vertical-scrollbar {
  width: 10px !important;
}
</style>
