<template>
  <v-app-bar app color="primary" dark clipped-left flat loading>
    <!-- <v-app-bar-nav-icon
      @click="app_data.mini_drawer = !app_data.mini_drawer"
    ></v-app-bar-nav-icon> -->
    <v-icon size="40" class="ma-2"> $au_logo </v-icon>
    <div
      class="app_title mx-2 pt-2"
      @click="route_home"
      style="cursor: pointer"
    >
      DEHM Model Evaluation
    </div>
    <v-progress-circular
      v-if="ui_control.isloading"
      class="mx-3 mt-3"
      :size="25"
      :width="3"
      indeterminate
      color="secondary"
    ></v-progress-circular>

    <v-spacer></v-spacer>
    <Account />
  </v-app-bar>
</template>


<script>
import { mapState, mapMutations } from "vuex";
import utilities from "@/app_class/utilities";

export default {
  name: "App",
  data: () => ({
    //
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    islogin() {
      return this.app_data.user.isLogin
    },
  },

  methods: {
    ...mapMutations([]),
    route_home() {
      this.$router
        .replace({
          path: "/",
        })
        .catch(utilities.handle_redundant_route);
    },
  },
  watch: {},
};
</script>
<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Roboto");
.app_title {
  font-size: 1.5rem;
  font-family: "Roboto", Helvetica, Arial, sans-serif;
  font-weight: medium;
}
html {
  scroll-behavior: smooth;
}
</style>