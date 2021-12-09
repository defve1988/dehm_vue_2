<template>
  <v-container class="px-0 mx-0 mb-5">
    <span v-if="!islogin"> Please login first. </span>
    <div v-else>
      <v-tabs
        v-model="tab"
        :dark="ui_control.theme.dark"
        :color="ui_control.theme_color.content"
      >
        <v-tabs-slider :color="ui_control.theme_color.content"></v-tabs-slider>

        <v-tab v-for="item in items" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <EBASQuery />
        </v-tab-item>
        <v-tab-item>
          <v-card
            :height="ui_control.tab_height"
            class="pa-5 table-card"
            :dark="ui_control.theme.dark"
            :style="`background-color:${ui_control.theme_color.card_bg}`"
          >
            <v-data-table
              :headers="ebas_data.head"
              :items="ebas_data.data"
              :items-per-page="15"
              class="ma-5 mb-10"
              dense
            ></v-data-table>
          </v-card>
        </v-tab-item>
        <v-tab-item>
          <EBASPlot />
        </v-tab-item>
        <v-tab-item>
          <EBASMap />
        </v-tab-item>
      </v-tabs-items>
    </div>

    TODO:
    <ul>
      <li>allow add/del lines without re-plot</li>
      <li>...</li>
      <li>...</li>
    </ul>
    Bugs:
    <ul>
      <li>...</li>
    </ul>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas",
  data: () => ({
    isLoading: false,
    tab: 0,
    items: ["Data Query", "Data Table", "Time Series", "Map"],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    islogin() {
      return this.app_data.user.isLogin;
    },

    ebas_data() {
      if (this.app_data.ebas.data == null) {
        return { data: [], head: [] };
      } else {
        return {
          data: this.app_data.ebas.data.data,
          head: this.app_data.ebas.data.schema.fields.map((x) => {
            return { text: x.name, value: x.name };
          }),
        };
      }
    },
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
.table-card {
  overflow-y: auto;
}
</style>