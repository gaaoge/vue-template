<template>
  <base-page class="home-page">
    <demo-panel></demo-panel>
    <template #dialogs>
      <demo-dialog></demo-dialog>
    </template>
  </base-page>
</template>

<script>
import DemoPanel from './components/panels/DemoPanel'
import DemoDialog from './components/dialogs/DemoDialog'

export default {
  name: 'home-page',
  components: {
    DemoPanel,
    DemoDialog,
  },
}
</script>

<style lang="postcss" scoped>
.home-page {
  background: #fff;
}
</style>
