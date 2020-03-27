<template>
  <div class="pixi-stage">
    <slot></slot>
  </div>
</template>

<script>
import { Application } from 'pixi.js-legacy'

export default {
  name: 'pixi-stage',
  props: {
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    }
  },
  created() {
    this.create()
  },
  mounted() {
    this.mount()
  },
  destroyed() {
    this.destroy()
  },
  methods: {
    create() {
      let app = new Application({
        width: this.width,
        height: this.height,
        transparent: true
      })
      this.$refs.app = app
    },
    mount() {
      let app = this.$refs.app
      app.view.style.display = 'block'
      app.view.style.width = '100%'
      app.view.style.height = '100%'
      app.renderer.view.style['touch-action'] = 'auto'
      app.renderer.plugins.interaction.autoPreventDefault = false

      this.$el.appendChild(app.view)
    },
    destroy() {
      this.$refs.app.destroy(true, true)
    }
  }
}
</script>

<style lang="postcss" scoped>
.pixi-stage {
  overflow: hidden;
}
</style>
