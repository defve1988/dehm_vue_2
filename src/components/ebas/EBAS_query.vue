<template>
  <v-container class="pr-10">
    <div class="subtitle-1"> EBAS Data Query </div>
    <v-divider></v-divider>
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
          <v-list
            subheader
            dense
            class="pt-0 mt-0"
            :height="list_hight"
            outlined
          >
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
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_query",
  data: () => ({
    isLoading: false,
    use_ebas: true,
    use_id: true,
    list_hight: 275,
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
  }),
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    selection() {
      return this.app_data.ebas.selection;
    },
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
      this.app_data.ebas.filter_ebas(this.selection);
      this.selection = this.app_data.ebas.selection;
    },
    reset_selection() {
      this.app_data.ebas.reset_selection();
      this.selection = this.app_data.ebas.selection;
    },
    async query_example() {
      this.app_data.ebas.query_example();
      await this.query_data();
    },

    async query_data() {
      this.ui_control.isloading = true;

      this.select_all_curr();
      let response = await this.app_data.ebas.query_data(
        this.selection,
        this.app_data.user.create_form(),
        this.app_data.headers
      );

      this.SET_MESSAGE(response);
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