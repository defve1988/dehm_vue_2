<template>
  <v-container>
    <v-row>
      <v-col class="title">
        <h3 :style="`color:${ui_control.theme_color.content}`">
          EBAS update
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                small
                class="ma-2 ml-15 mr-3"
                @click="update_ebas"
                :dark="!ui_control.theme.dark"
                v-bind="attrs"
                v-on="on"
                :loading="isLoading"
              >
                Update EBAS
              </v-btn>
            </template>
            <span>Download new files and update loacl EBAS database.</span>
          </v-tooltip>

          <span
            v-if="isLoading"
            class="caption"
            :style="`color:${ui_control.theme_color.content}`"
          >
            <v-icon :dark="ui_control.theme.dark" class="ma-2">
              mdi-coffee
            </v-icon>
            Take a break. This will take 10~15 minutes.
          </span>
        </h3>
      </v-col>
    </v-row>
    TODO:
    <ul>
      <li>Here need a summary dashboard for current ebas database</li>
      <li>A button to check how many files need to be updated</li>
      <li>List how many raw files, sites, ...</li>
    </ul>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_settings",
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
    ...mapMutations(["SET_MESSAGE"]),
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
// .v-divider {
//   border-color: rgba(0, 0, 0, 0.12) !important;
// }
</style>