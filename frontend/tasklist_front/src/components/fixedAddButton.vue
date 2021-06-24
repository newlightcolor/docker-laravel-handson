<template>
<section class="fixed-add-button">
    <router-link v-bind:to="{ name: 'task.create'}">
        <a class="btn btn-primary"><fa-icon icon="plus"/></a>
    </router-link>
</section>
</template>

<style scoped>
    .fixed-add-button {
        position: fixed;
        right: 60px;
        bottom: 60px;
    }

    .fixed-add-button .btn{
        border-radius: 50px;
        font-size: 25px;
        height: 50px;
        width: 50px;
    }
</style>

<script>
    export default {

    }
</script>