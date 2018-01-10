<template>
  <div class="common-share">
    <common-modal ref="notice" :clickHide="true">
      <div class="notice"></div>
    </common-modal>
  </div>
</template>

<script>
  import NewsappShare from 'newsapp-share'

  export default {
    data () {
      return {}
    },
    methods: {
      show () {
        NewsappShare.show(() => {
          this.$refs.notice.show()
          setTimeout(() => {
            this.$refs.notice.hide()
          }, 2000)
        })
      }
    }
  }
</script>

<style type="text/postcss">
  .common-share {

    & .notice {
      position: absolute;
      right: 50px;
      top: 50px;
      width: 380px;
      height: 140px;
      background: url("/resource/assets/share-notice.png");
    }
  }
</style>