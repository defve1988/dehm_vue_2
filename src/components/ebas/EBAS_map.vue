<template>
  <v-card> map </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
// import Plotly from "plotly.js-dist";

export default {
  name: "ebas_map",
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations([]),
    async update_ebas() {
      this.isLoading = true;
      let headers = this.app_data.headers;
      var bodyFormData = new FormData();
      bodyFormData.append("user_name", this.app_data.user.user_name);
      bodyFormData.append("password", this.app_data.user.password);

      let response = await this.$http.post("/ebas/update", bodyFormData, {
        headers: headers,
        withCredentials: true,
      });
      this.isLoading = false;
      this.SET_MESSAGE(response.data);
    },
  },
};
</script>
<style scoped lang="scss">
</style>