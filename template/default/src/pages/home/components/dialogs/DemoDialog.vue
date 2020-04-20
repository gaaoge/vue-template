<template>
  <base-dialog name="demo-dialog">
    <div class="demo-dialog">
      <base-scroll ref="scroll">
        <logo-widget v-for="i in 3" :key="i"></logo-widget>
        <div class="btns">
          <div class="btn" @click="toTop">回到顶部</div>
          <div class="btn" @click="showShare">分享</div>
        </div>
      </base-scroll>
    </div>
  </base-dialog>
</template>

<script>
import { shareWithConfig } from '@/utils/share'
import LogoWidget from '../widgets/LogoWidget'

export default {
  name: 'demo-dialog',
  components: {
    LogoWidget,
  },
  methods: {
    toTop() {
      this.$refs.scroll.bscroll.instance.scrollTo(0, 0, 300)
    },
    showShare() {
      shareWithConfig()
    },
  },
}
</script>

<style lang="postcss" scoped>
.demo-dialog {
  width: 600px;
  height: 600px;
  border-radius: 20px;
  background: #fff;
}

.btns {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100px;
}

.btn {
  width: 200px;
  height: 60px;
  margin: 0 20px;
  border: 2.2px solid #4fc08d;
  border-radius: 30px;
  font-size: 28px;
  text-align: center;
  line-height: 60px;

  &:first-child {
    color: #fff;
    background: #4fc08d;
  }

  &:last-child {
    color: #42b983;
    background: #fff;
  }
}
</style>
