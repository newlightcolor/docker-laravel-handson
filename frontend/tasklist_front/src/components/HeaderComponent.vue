<template>
    <div>
        <v-app-bar
        app
        color="blue"
        dark
        >
            <nav class="navbar navbar-dark">
                <span class="navbar-brand mb-0 h1">Vue Laravel SPA</span>
            </nav>

            <v-spacer></v-spacer>

            <div>
                <router-link v-bind:to="{name: 'task.list'}">
                    <v-icon large>
                        mdi-clipboard-list
                    </v-icon>
                </router-link>
            </div>

            <div>
                <router-link v-bind:to="{name: 'task.create'}">
                    <v-icon large>
                        mdi-playlist-plus
                    </v-icon>
                </router-link>
            </div>
        </v-app-bar>
    </div>
</template>

<script>
    export default {}
</script>

<style scoped>
    .btn{
        margin: 0 5px;
    }
    .header-menu-right-btn{

    }
</style>