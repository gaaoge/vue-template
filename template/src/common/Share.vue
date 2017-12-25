<template>
  <div class="common-share">
    <common-model ref="notice" :clickHide="true">
      <div class="notice"></div>
    </common-model>
    <common-model ref="panel">
      <div class="panel">
        <div class="weibo" @click="openShare('weibo')"></div>
        <div class="qq" @click="openShare('qq')"></div>
        <div class="qzone" @click="openShare('qzone')"></div>
        <div class="yixin" @click="openShare('yixin')"></div>
        <div class="close" @click="hidePanel"></div>
      </div>
    </common-model>
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
        NewsappShare.show((isApp) => {
          if (isApp) {
            this.$refs.notice.show()
            setTimeout(() => {
              this.$refs.notice.hide()
            }, 2000)
          } else {
            this.$refs.panel.show()
          }
        })
      },
      openShare (type) {
        window.location.href = NewsappShare.getShareUrl(type)
      },
      hidePanel () {
        this.$refs.panel.hide()
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

    & .panel {
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 400px;
      padding: 0 50px 150px;
      box-sizing: border-box;
      display: flex;
      justify-content: space-around;
      align-items: center;

      & .weibo, & .qq, & .qzone, & .yixin {
        width: 100px;
        height: 100px;
      }

      & .weibo {
        background: url("/resource/assets/share-weibo.png");
      }

      & .qq {
        background: url("/resource/assets/share-qq.png");
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