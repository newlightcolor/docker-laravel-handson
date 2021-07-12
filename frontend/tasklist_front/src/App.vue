<template>
  <v-app>
    <HeaderComponent v-on:toggleDrawer="toggleDrawer"/>
    <SideDrawerComponent v-bind:showDrawer="showDrawer"/>

    <v-main>
      <v-container>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import HeaderComponent from "./components/HeaderComponent.vue";
import SideDrawerComponent from "./components/SideDrawerComponent.vue";

export default {
  name: 'App',

  components: {
    HeaderComponent,
    SideDrawerComponent,
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
