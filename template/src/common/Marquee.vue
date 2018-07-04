<template>
  <div class="common-marquee" :style="{animation: animation}">
    <span ref="text">{{content}}</span>
  </div>
</template>

<script>
  export default {
    name: 'common-marquee',
    data () {
      return {
        style: null,
        animation: null
      }
    },
    mounted () {
      this.init()
    },
    destroyed () {
      this.deleteKeyFrame()
    },
    props: {
      content: String,
      speed: {
        type: Number,
        default: 1
      }
    },
    watch: {
      content () {
        this.$nextTick(() => {
          this.init()
        })
      }
    },
    methods: {
      init () {
        let containerWidth = this.getContainerWidth()
        let textWidth = this.getTextWidth()

        if (textWidth > containerWidth) {
          let animationName = 'marquee_' + Math.random().toString(36).substring(3, 8)
          let keyFrame = `@keyframes ${animationName} {
            0% {
              text-indent: ${containerWidth}px
            }
            100% {
              text-indent: ${-textWidth}px
            }
          } @-webkit-keyframes ${animationName} {
            0% {
              text-indent: ${containerWidth}px
            }
            100% {
              text-indent: ${-textWidth}px
            }
          }`
          this.insertKeyFrame(keyFrame)

          let timer = this.speed * (containerWidth + textWidth) / 50
          this.animation = `${animationName} ${timer}s linear infinite`
        } else {
          this.deleteKeyFrame()
          this.animation = null
        }
      },
      insertKeyFrame (rule) {
        this.style = document.createElement('style')
        this.style.innerHTML = rule
        document.head.appendChild(this.style)
      },
      deleteKeyFrame () {
        this.style && document.head.removeChild(this.style)
      },
      getContainerWidth () {
        return parseFloat(window.getComputedStyle(this.$el).getPropertyValue('width'))
      },
      getTextWidth () {
        return parseFloat(window.getComputedStyle(this.$refs.text).getPropertyValue('width'))
      }
    }
  }
</script>

<style type="text/postcss">
  .common-marquee {
    overflow: hidden;

    & > span {
      display: inline-block;
      white-space: nowrap;
      text-indent: 0 !important;
    }
  }
</style>