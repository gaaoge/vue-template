<script>
export default {
  name: 'pixi-display',
  props: {
    positionX: {
      type: [String, Number],
      default: 0
    },
    positionY: {
      type: [String, Number],
      default: 0
    },
    zIndex: {
      type: [String, Number],
      default: 'auto'
    },
    visible: {
      type: Boolean,
      default: true
    }
  },
  watch: {
    positionX(val) {
      if (!this.$refs.display) return
      this.$refs.display.x = val
    },
    positionY(val) {
      if (!this.$refs.display) return
      this.$refs.display.y = val
    },
    zIndex(val) {
      if (!this.$refs.display) return
      this.$refs.display.zIndex = val
    },
    visible(val) {
      if (!this.$refs.display) return
      this.$refs.display.visible = val
    }
  },
  destroyed() {
    this.remove()
  },
  methods: {
    add() {
      this.$refs.display.x = this.positionX
      this.$refs.display.y = this.positionY
      if (this.zIndex === 'auto') {
        this.$refs.display.zIndex = this.$parent.$slots.default.indexOf(
          this.$vnode
        )
      } else {
        this.$refs.display.zIndex = this.zIndex
      }
      this.$refs.display.visible = this.visible

      this.$parent.$refs.app.stage.addChild(this.$refs.display)
      this.$parent.$refs.app.stage.sortChildren()
    },
    remove() {
      this.$parent.$refs.app.stage.removeChild(this.$refs.display)
      this.$refs.display.destroy()
    }
  },
  render() {
    return ''
  }
}
</script>
