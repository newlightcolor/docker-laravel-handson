<template>
  <v-app>
    <MenuBarComponent/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import MenuBarComponent from "./components/MenuBarComponent.vue";

export default {
  name: 'App',

  components: {
    MenuBarComponent,
  },

  data: () => ({
    showDrawer: true
  }),

  methods: {
    toggleDrawer() {
      this.showDrawer = !this.showDrawer
    }
  }
};
</script>
