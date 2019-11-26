<template>
  <canvas class="common-dragonbones"></canvas>
</template>

<script>
import * as PIXI from 'pixi.js'
import { getStaticPath } from '@/utils'

window.PIXI = PIXI
const dragonbones = require('pixi5-dragonbones')
const factory = dragonbones.PixiFactory.factory

export default {
  name: 'common-dragonbones',
  props: {
    name: {
      type: String,
      default: ''
    },
    width: {
      type: [String, Number],
      default: 0
    },
    height: {
      type: [String, Number],
      default: 0
    },
    armatureName: {
      type: String,
      default() {
        return this.name
      }
    },
    animationName: {
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
    stopProgress: {
      type: [String, Number],
      default: 0
    }
  },
  data() {
    return {
      app: null,
      display: null
    }
  },
  computed: {
    skeJSON() {
      return `${this.name}_skeJSON`
    },
    texJSON() {
      return `${this.name}_texJSON`
    },
    texPNG() {
      return `${this.name}_texPNG`
    },
    pathPrefix() {
      return getStaticPath(`dragonbones/${this.name}`)
    }
  },
  watch: {
    animationName() {
      this.display.animation.play(this.animationName)
    },
    stopProgress() {
      this.display.animation.gotoAndStopByProgress(
        this.animationName,
        this.stopProgress
      )
    }
  },
  mounted() {
    this.create()
  },
  destroyed() {
    this.destroy()
  },
  methods: {
    async load() {
      let loader = new PIXI.Loader()
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
          resove(resources)
        })
      })
    },
    async parse() {
      let resources = await this.load()
      factory.parseDragonBonesData(resources[this.skeJSON].data)
      if (this.texCount > 1) {
        for (let i = 0; i < this.texCount; i++) {
          factory.parseTextureAtlasData(
            resources[`${this.texJSON}_${i}`].data,
            resources[`${this.texPNG}_${i}`].texture
          )
        }
      } else {
        factory.parseTextureAtlasData(
          resources[this.texJSON].data,
          resources[this.texPNG].texture
        )
      }
    },
    async build() {
      if (!factory.getDragonBonesData(this.name)) await this.parse()
      this.display = factory.buildArmatureDisplay(this.armatureName, this.name)
      const events = [
        dragonbones.EventObject.START,
        dragonbones.EventObject.LOOP_COMPLETE,
        dragonbones.EventObject.COMPLETE
      ]
      events.forEach(event => {
        this.display.addDBEventListener(event, () => {
          this.$emit(event)
        })
      })
    },
    async create() {
      await this.build()
      this.app = new PIXI.Application({
        view: this.$el,
        width: this.width,
        height: this.height,
        transparent: true
      })
      this.app.stage.addChild(this.display)
      this.app.renderer.view.style['touch-action'] = 'auto'
      this.app.renderer.plugins.interaction.autoPreventDefault = false
      this.autoPlay && this.display.animation.play(this.animationName)
    },
    destroy() {
      this.app.destroy(true, true)
    }
  }
}
</script>

<style lang="postcss" scoped>
.common-dragonbones {
  display: block;
  margin: 0;
  padding: 0;
  border: 0;
  background: transparent;
}
</style>
