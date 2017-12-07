<template>
  <common-mask ref="main">
    <div class="common-share">
      <div class="notice" @click="hide" v-if="isInApp">
        <span></span>
      </div>
      <div class="panel" v-else>
        <div class="weibo" @click="shareWeibo"></div>
        <div class="qzone" @click="shareQzone"></div>
        <div class="yixin" @click="shareYixin"></div>
        <div class="close" @click="hide"></div>
      </div>
    </div>
  </common-mask>
</template>

<script>
  import NewsappClient from 'newsapp-client'
  import NewsappShare from 'newsapp-share'

  export default {
    data () {
      return {
        isInApp: /micromessenger|weibo|qq|yixin/ig.test(navigator.userAgent)
      }
    },
    methods: {
      show () {
        if (NewsappClient.isNewsapp) {
          NewsappClient.share()
          return
        }

        this.$refs.main.show()
        this.isInApp && setTimeout(() => {
          this.$refs.main.hide()
        }, 2000)
      },
      hide () {
        this.$refs.main.hide()
      },
      shareWeibo () {
        window.location.href = NewsappShare.getShareUrl('weibo')
      },
      shareQzone () {
        window.location.href = NewsappShare.getShareUrl('qzone')
      },
      shareYixin () {
        window.location.href = NewsappShare.getShareUrl('yixin')
      }
    }
  }
</script>

<style type="text/postcss">
  .common-share {
    position: relative;
    height: 100%;

    & .notice {
      position: relative;
      height: 100%;

      & span {
        position: absolute;
        right: 50px;
        top: 50px;
        width: 380px;
        height: 140px;
        background: url("/resource/assets/share-notice.png");
      }
    }

    & .panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 400px;
      padding: 0 100px 150px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;

      & .weibo, & .qzone, & .yixin {
        width: 100px;
        height: 100px;
      }

      & .weibo {
        background: url("/resource/assets/share-weibo.png");
      }

      & .qzone {
        background: url("/resource/assets/share-qzone.png");
      }

      & .yixin {
        background: url("/resource/assets/share-yixin.png");
      }

      & .close {
        position: absolute;
        left: 50%;
        bottom: 80px;
        width: 72px;
        height: 72px;
        margin-left: -36px;
        background: url("/resource/assets/share-close.png");
      }
    }
  }
</style>