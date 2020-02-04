<script>
import { getStaticPath } from '@/utils'
import Display from './Display'

window.PIXI = require('pixi.js-legacy')
window.dragonbones = require('pixi5-dragonbones')

export default {
  name: 'pixi-dragonbones',
  mixins: [Display],
  props: {
    name: {
      type: String,
      default: ''
    },
    texCount: {
      type: [String, Number],
      default: 1
    },
    autoPlay: {
      type: Boolean,
      default: true
    },
    armatureName: {
      type: String,
      default: 'armature'
    },
    armatureSlots: {
      type: Array,
      default() {
        return []
      }
    },
    animationName: {
      type: String,
      default: 'animation'
    },
    animationFadeInNames: {
      type: Array,
      default() {
        return []
      }
    },
    animationProgress: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      skeJSON: `${this.name}_skeJSON`,
      texJSON: `${this.name}_texJSON`,
      texPNG: `${this.name}_texPNG`,
      pathPrefix: getStaticPath(`dragonbones/v14/${this.name}`)
    }
  },
  watch: {
    armatureName() {
      this.remove()
      this.create()
      this.add()
    },
    armatureSlots(val) {
      if (!this.$refs.display) return
      val.forEach(item => {
        let slot = this.$refs.display.armature.getSlot(item.name)
        if (slot) {
          slot.visible = item.visible === undefined ? true : item.visible
          slot.display.off('tap')
          if (item.onClick) {
            slot.display.interactive = true
            slot.display.on('tap', item.onClick)
          } else {
            slot.display.interactive = false
          }
        }
      })
    },
    animationName(val) {
      if (!this.$refs.display) return
      this.$refs.display.animation.play(val)
    },
    animationFadeInNames(val) {
      if (!this.$refs.display) return
      val.forEach(item => {
        this.$refs.display.animation.fadeIn(
          item,
          -1,
          -1,
          0,
          item
        ).resetToPose = false
      })
    },
    animationProgress(val) {
      if (!this.$refs.display) return
      let animationState = this.$refs.display.animation.lastAnimationState
      animationState.isPlaying && animationState.stop()
      animationState.currentTime =
        animationState.totalTime * Math.min(val, 0.999999)
    }
  },
  async mounted() {
    await this.load()
    this.parse()
    this.create()
    this.add()
  },
  methods: {
    async load() {
      let loader = new window.PIXI.Loader()
      loader.add(this.skeJSON, `${this.pathPrefix}_ske.json`)
      if (this.texCount > 1) {
        for (let i = 0; i < this.texCount; i++) {
          loader.add(`${this.texJSON}_${i}`, `${this.pathPrefix}_tex_${i}.json`)
          loader.add(`${this.texPNG}_${i}`, `${this.pathPrefix}_tex_${i}.png`)
        }
      } else {
        loader.add(this.texJSON, `${this.pathPrefix}_tex.json`)
        loader.add(this.texPNG, `${this.pathPrefix}_tex.png`)
      }

      return new Promise((resove, reject) => {
        loader.load((loader, resources) => {
          this.$options.resources = resources
          resove()
        })
      })
    },
    parse() {
      let factory = window.dragonbones.PixiFactory.factory
      factory.parseDragonBonesData(
        this.$options.resources[this.skeJSON].data,
        this.name
      )
      if (this.texCount > 1) {
        for (let i = 0; i < this.texCount; i++) {
          factory.parseTextureAtlasData(
            this.$options.resources[`${this.texJSON}_${i}`].data,
            this.$options.resources[`${this.texPNG}_${i}`].texture,
            this.name
          )
        }
      } else {
        factory.parseTextureAtlasData(
          this.$options.resources[this.texJSON].data,
          this.$options.resources[this.texPNG].texture,
          this.name
        )
      }
    },
    create() {
      let factory = window.dragonbones.PixiFactory.factory
      this.$refs.display = factory.buildArmatureDisplay(
        this.armatureName,
        this.name
      )

      this.armatureSlots.forEach(item => {
        let slot = this.$refs.display.armature.getSlot(item.name)
        if (slot) {
          slot.visible = item.visible === undefined ? true : item.visible
          if (item.onClick) {
            slot.display.interactive = true
            slot.display.on('tap', item.onClick)
          }
        }
      })

      const events = [
        dragonbones.EventObject.START,
        dragonbones.EventObject.LOOP_COMPLETE,
        dragonbones.EventObject.COMPLETE,
        dragonbones.EventObject.SOUND_EVENT
      ]
      events.forEach(event => {
        this.$refs.display.addDBEventListener(event, e => {
          this.$emit(event, e)
        })
      })

      if (this.autoPlay) {
        this.$refs.display.animation.play(this.animationName)
        this.animationFadeInNames.forEach(item => {
          this.$refs.display.animation.fadeIn(
            item,
            -1,
            -1,
            0,
            item
          ).resetToPose = false
        })
      }
    }
  }
}
</script>
