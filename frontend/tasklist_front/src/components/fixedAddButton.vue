<template>
<section class="fixed-add-button-section">
    <router-link v-bind:to="{ name: 'task.create'}">
        <v-btn
        dark
        fab
        fixed
        bottom
        right
        color="indigo accent-4"
        elevation="4"
        >
            <v-icon>mdi-pencil-plus</v-icon>
        </v-btn>
    </router-link>
</section>
</template>

<script>
    export default {

    }
</script>