<template>
    <div class="scene" v-tap="{methods:nextScene}">
        <h1>Scene2</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            nextScene() {
                this.$router.replace('/scene1');
            }
        }
    }
</script>

<style type="text/postcss">

</style>