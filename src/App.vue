<template>
  <v-app>
    <AppBar />
    <NavHome />
    <v-main :style="`background-color:${ui_control.theme_color.app_bg}`">
      <router-view />
    </v-main>
    <LoginRegister />
    <Message />
    <Footer />
  </v-app>
</template>

<script>
import { mapState, mapMutations } from "vuex";

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
  },
  async mounted() {
    this.ui_control.isloading = true;
    this.SET_THEME();
    var response
    // response = await this.app_data.ebas.get_site_list(
    //   this.app_data.headers
    // );
    // this.app_data.ebas.init_selections();
    // if (response.code != 0) {
    //   this.SET_MESSAGE(response);
    // }

    response = await this.app_data.dehm.get_project_list(
      this.app_data.headers
    );
    if (response.code != 0) {
      this.SET_MESSAGE(response);
    }

    this.ui_control.isloading = false;
  },

  methods: {
    ...mapMutations(["SET_THEME"]),
  },
  watch: {},
};
</script>
<style lang="scss">
html {
  scroll-behavior: smooth;
}
::-webkit-scrollbar {
  width: 7px;
}
::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
}
::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.8);
}
</style>