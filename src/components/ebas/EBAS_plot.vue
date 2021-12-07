<template>
  <v-card
    :height="ui_control.tab_height"
    class="pa-5"
    :dark="ui_control.theme.dark"
    :style="`background-color:${ui_control.theme_color.card_bg}`"
  >
    <v-row>
      <v-col cols="2" class="pb-0">
        <v-row>
          <v-col>
            <v-subheader class="pt-0 mt-0 px-3" dark>
              Sites
              <v-spacer></v-spacer>
              all ({{ site_index.length }})
              <v-checkbox
                class="pt-0 my-0 py-0 pl-1"
                dense
                hide-details
                v-model="is_select_all_site"
                @click="select_all_site"
              ></v-checkbox>
            </v-subheader>
            <v-list
              subheader
              dense
              class="pt-0 mt-0"
              :height="list_height"
              outlined
            >
              <v-list-item-group v-model="selected_site" multiple dense>
                <template v-for="(item, i) in site_index">
                  <v-divider
                    v-if="item == 'divider'"
                    :key="`item-${i}`"
                  ></v-divider>
                  <v-list-item
                    v-else
                    :key="`item-${i}`"
                    :value="item"
                    active-class="primary--text text--accent-4"
                    dense
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content class="body-2 py-0">
                        <span> {{ item }} {{ active ? "&#10004;" : "" }} </span>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-subheader class="pt-0 mt-0 px-3" dark>
              Components
              <v-spacer></v-spacer>
              all ({{ component_index.length }})
              <v-checkbox
                class="pt-0 my-0 py-0 pl-1"
                dense
                hide-details
                v-model="is_select_all_component"
                @click="select_all_component"
              ></v-checkbox>
            </v-subheader>
            <v-list
              subheader
              dense
              class="pt-0 mt-0"
              :height="list_height"
              outlined
            >
              <v-list-item-group v-model="selected_component" multiple dense>
                <template v-for="(item, i) in component_index">
                  <v-list-item
                    :key="`item-${i}`"
                    :value="item"
                    active-class="primary--text text--accent-4"
                    dense
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content class="body-2 py-0">
                        <span> {{ item }} {{ active ? "&#10004;" : "" }} </span>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="1" class="pa-0" align="center">
        <v-row class="pa-0 ma-0" justify="center">
          <v-radio-group v-model="gathering_method">
            Gathering
            <v-radio
              v-for="(method, index) in gathering_methods"
              :key="index"
              :label="method"
              :value="index"
            ></v-radio>
          </v-radio-group>
        </v-row>

        <v-row class="pa-0 my-3 mt-15" justify="center">
          <v-btn @click="new_plot" :dark="!ui_control.theme.dark"> >> </v-btn>
        </v-row>
      </v-col>

      <v-col cols="7" class="ma-0 pa-0 px-3" align-self="center" align="center">
        <v-row>
          <v-col cols="4" class="mt-2 mx-2 pa-0">
            <v-combobox
              v-model="avg_type_selected"
              :items="avg_types"
              @change="new_plot"
              label="Averaging"
              class="py-3 px-8"
              outlined
              dense
              hide-details
            ></v-combobox>
          </v-col>

          <v-col cols="4" class="mt-2 mx-2 pa-0">
            <v-combobox
              v-model="fig_type_selected"
              :items="fig_types"
              @change="change_fig_type"
              label="Figure Type"
              class="py-3 px-8"
              outlined
              dense
              hide-details
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row>
          <v-col clas="mx-2">
            <div
              ref="ebas_viz_plot"
              id="ebas_viz_plot"
              :style="`height: ${plot_height}px`"
            ></div>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="2" class="pb-0"> plot editing tools </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Viz from "@/app_class/viz";
import TS from "@/app_class/ts";

export default {
  name: "ebas_plot",
  data: () => ({
    isLoading: false,
    selected_site: [],
    selected_component: [],
    list_height: 285,
    plot_height:600,
    avg_types: ["Hourly", "Daily", "Monthly"],
    fig_types: ["TS-Scatter", "TS-Line", "TS-Bar", "TS-ErrorBar", "TS-Box", "Scatter", "Histogram"],
    avg_type_selected: "Hourly",
    fig_type_selected: "TS-Scatter",
    gathering_method: 0,
    gathering_methods: ["None", "Mean", "Median", "Max", "Min"],
    is_select_all_site: false,
    is_select_all_component: false,
    ts: new TS(),
  }),
  mounted() {
    this.data_viz = new Viz();
    var plot = this.ui_control.plot_default;
    plot.div = "ebas_viz_plot";
    plot.title = "EBAS data";
    plot.layout.width = this.$refs.ebas_viz_plot.clientWidth;
    plot.layout.height = this.plot_height-50;

    this.data_viz.init_config(plot);
    this.data_viz.plot_obj.gen_scatter([]);
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    site_index() {
      if (this.app_data.ebas.data == null) return [];
      let site = this.app_data.ebas.data.data.map((x) => x.site);
      site = [...new Set(site)];
      return site;
    },
    component_index() {
      if (this.app_data.ebas.data == null) return [];
      let component = this.app_data.ebas.data.data.map((x) => x.component);
      component = [...new Set(component)];
      return component;
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    select_all_site() {
      if (this.is_select_all_site) {
        this.selected_site = this.site_index;
      } else {
        this.selected_site = [];
      }
    },
    select_all_component() {
      if (this.is_select_all_component) {
        this.selected_component = this.component_index;
      } else {
        this.selected_component = [];
      }
    },
    async change_fig_type() {},
    async new_plot() {
      this.ui_control.isloading = true;
      this.data_viz.set_color_theme(this.app_data.user.color_list);

      // console.log(this.selected_site, this.selected_component);

      await this.ts.gene_ts(
        this.app_data.ebas.data.data,
        this.selected_site,
        this.selected_component
      );

      await this.ts.gather_ts(this.gathering_methods[this.gathering_method]);

      var data = await this.ts.averaging_ts(this.fig_type_selected);
      // // console.log(data)

      this.data_viz.plot_obj.gen_scatter(data);
      this.ui_control.isloading = false;
    },
    async update_plot() {},
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
// #ebas_viz_plot {
//   border-style: dotted;
// }
</style>