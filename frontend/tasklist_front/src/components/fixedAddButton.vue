<template>
<section class="fixed-add-button-section">
    <router-link v-bind:to="{ name: 'task.create'}">
        <v-btn
        dark
        fab
        rounded
        color="blue"
        elevation="4"
        class="fixed-add-button"
        >
            <v-icon>
                mdi-playlist-plus
            </v-icon>
        </v-btn>
    </router-link>
</section>
</template>

<style scoped>
    .fixed-add-button-section {
        position: fixed;
        right: 60px;
        bottom: 60px;
    }
</style>

<script>
    export default {

    }
</script>