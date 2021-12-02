<template>
  <v-card
    height="600"
    class="px-5"
    :dark="ui_control.theme.dark"
    :style="`background-color:${ui_control.theme_color.card_bg}`"
  >
    <v-row>
      <v-col cols="3" class="pb-0">
        <v-switch
          dense
          v-model="use_id"
          :label="use_id ? 'Show Site ID' : 'Show Site Name'"
        ></v-switch>
      </v-col>

      <v-col cols="3" class="pb-0">
        <v-switch
          dense
          v-model="use_ebas"
          :label="use_ebas ? 'Use EBAS components' : 'Use DEHM targets'"
        ></v-switch>
      </v-col>

      <v-col cols="6" class="pb-0" align-self="center" align="end">
        <v-btn @click="filter_ebas" class="mx-2" small> Filter </v-btn>
        <v-btn @click="select_all_curr" class="mx-2" small> Select All </v-btn>
        <v-btn @click="reset_selection" class="mx-2" small> Reset </v-btn>
        <v-btn @click="query_data" class="mx-2" small> Query Data </v-btn>
        <v-btn @click="query_example" class="mx-2" small> Query Example </v-btn>
      </v-col>
    </v-row>

    <v-row>
      <template v-for="(sel, list_index) in selection_list">
        <v-col cols="3" class="pt-0 mt-0" :key="list_index">
          <v-subheader class="pt-0 mt-0 px-3" dark>
            {{ sel.title }}
            <v-spacer></v-spacer>
            all ({{ selection[sel.key].item.length }})
            <v-checkbox
              class="pt-0 my-0 py-0 pl-1"
              dense
              hide-details
              v-model="selection[sel.key].all"
              @click="select_all(sel.key)"
            ></v-checkbox>
          </v-subheader>
          <v-list subheader dense class="pt-0 mt-0" height="225" outlined>
            <v-list-item-group v-model="selection[sel.key].val" multiple dense>
              <template v-for="(item, i) in selection[sel.key].item">
                <v-list-item
                  :key="`item-${i}`"
                  :value="item"
                  active-class="primary--text text--accent-4"
                  dense
                >
                  <template v-slot:default="{ active }">
                    <v-list-item-content class="body-2 py-0">
                      <span v-if="sel.key == 'site'">
                        {{ use_id ? item.id : item.name }}
                        {{ active ? "&#10004;" : "" }}
                      </span>
                      <span v-else>
                        {{ item }} {{ active ? "&#10004;" : "" }}
                      </span>
                    </v-list-item-content>
                  </template>
                </v-list-item>
              </template>
            </v-list-item-group>
          </v-list>
        </v-col>
      </template>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import EbasQuery from "@/app_class/ebas_query";

export default {
  name: "ebas_query",
  data: () => ({
    isLoading: false,
    use_ebas: true,
    use_id: true,
    selection_list: [
      { title: "Sites", key: "site" },
      { title: "Components", key: "component" },
      { title: "Matrix", key: "matrix" },
      { title: "Years", key: "year" },
      { title: "Country", key: "country" },
      { title: "Land Usage", key: "land_use" },
      { title: "Station Setting", key: "station_setting" },
      { title: "*Resolution", key: "resolution" },
    ],

    selection: {
      site: { item: [], val: [], all: false },
      component: { item: [], val: [], all: false },
      matrix: { item: [], val: [], all: false },
      country: { item: [], val: [], all: false },
      land_use: { item: [], val: [], all: false },
      station_setting: { item: [], val: [], all: false },
      year: { item: [], val: [], all: false },
      resolution: { item: [], val: [], all: false },
    },
  }),
  mounted() {
    this.ebas_selection = new EbasQuery(this.app_data.ebas_site_list);
    this.selection = this.ebas_selection.selection;
  },
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    select_all(key) {
      if (this.selection[key].all) {
        this.selection[key].val = this.selection[key].item;
      } else {
        this.selection[key].val = [];
      }
    },
    select_all_curr() {
      var keys = this.selection_list.map((x) => x.key);
      for (const k of keys) {
        this.selection[k].all = true;
        this.select_all(k);
      }
    },
    filter_ebas() {
      this.ebas_selection.filter_ebas(this.selection);
      this.selection = this.ebas_selection.selection;
    },
    reset_selection() {
      this.ebas_selection.reset_selection();
      this.selection = this.ebas_selection.selection;
    },
    async query_example() {
      // let query_condition = {
      //   // id: ["AM0001R", "EE0009R", "ES0010R", "ES0011R","DK0010G"],
      //   component: ["NOx", "nitrate"],
      //   matrix: ["air", "aerosol"],
      //   st: "2020-01-01",
      //   ed: "2020-12-01",
      // };
      this.selection = {
        site: { item: [], val: [], all: false },
        component: {
          item: ["NOx", "nitrate"],
          val: ["NOx", "nitrate"],
          all: true,
        },
        matrix: {
          item: ["air", "aerosol"],
          val: ["air", "aerosol"],
          all: true,
        },
        country: { item: [], val: [], all: false },
        land_use: { item: [], val: [], all: false },
        station_setting: { item: [], val: [], all: false },
        year: { item: ["2020"], val: ["2020"], all: true },
        resolution: { item: [], val: [], all: false },
      };
      this.ebas_selection.filter_ebas(this.selection);
      this.selection = this.ebas_selection.selection;
      await this.query_data();
    },
    async query_data() {
      this.ui_control.isloading = true;
      this.select_all_curr();
      let query_condition = this.ebas_selection.selection2query(this.selection);
      console.log(query_condition)
      let headers = this.app_data.headers;
      var bodyFormData = new FormData();
      bodyFormData.append("user_name", this.app_data.user.user_name);
      bodyFormData.append("password", this.app_data.user.password);
      bodyFormData.append("query_condition", JSON.stringify(query_condition));

      let response = await this.$http.post("/ebas/query", bodyFormData, {
        headers: headers,
        withCredentials: true,
      });

      if (response.data.code == 0) {
        let res_data = JSON.parse(response.data.data);
        this.app_data.ebas_viz_data = res_data;
      }

      // console.log(response)
      this.SET_MESSAGE(response.data);
      this.ui_control.isloading = false;
    },
  },
};
</script>
<style scoped lang="scss">
.v-list {
  overflow-y: scroll;
}
.v-subheader {
  background-color: #555555;
  height: 25px;
}

// ::-webkit-scrollbar {
//   width: 5px;
// }
</style>