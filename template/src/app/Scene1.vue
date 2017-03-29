<template>
    <div class="scene" v-tap="{methods:nextScene}">
        <h1>Scene1</h1>
    </div>
</template>

<script>
    export default {
        data() {
            return {};
        },
        methods: {
            nextScene() {
                this.$router.replace('/scene2');
            }
        }
    }
</script>

<style type="text/postcss">

</style>