<template>
  <v-container class="pr-10">
    <div class="subtitle-1">DEHM Case Visualizations</div>
    <v-divider></v-divider>
    <v-row class="mt-3">
      <v-col cols="2" class="pb-0">
        <v-row>
          <v-col>
            <v-subheader class="pt-0 mt-0 px-3" dark>
              Project-Case
              <v-spacer></v-spacer>
              all ({{ project_case.length }})
              <v-checkbox
                class="pt-0 my-0 py-0 pl-1"
                dense
                hide-details
                v-model="is_select_all_project_case"
                @click="select_all_project_case"
              ></v-checkbox>
            </v-subheader>
            <v-list
              subheader
              dense
              class="pt-0 mt-0"
              :height="list_height"
              outlined
            >
              <v-list-item-group v-model="selected_project_case" multiple dense>
                <template v-for="(item, i) in project_case">
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

        <v-row class="py-0 my-0">
          <v-col class="py-0 my-0">
            <v-switch
              v-model="use_var"
              :label="use_var ? 'Use Variables' : 'Use Group'"
              hide-details=""
            ></v-switch>
          </v-col>
        </v-row>

        <v-row>
          <v-col v-if="use_var">
            <v-subheader class="pt-0 mt-0 px-3" dark>
              DEHM Variables
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
                        <span>
                          {{ item.text }} {{ active ? "&#10004;" : "" }}
                        </span>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>

          <v-col v-else>
            <v-subheader class="pt-0 mt-0 px-3" dark>
              DEHM Groups
              <v-spacer></v-spacer>
              all ({{ group_index.length }})
              <v-checkbox
                class="pt-0 my-0 py-0 pl-1"
                dense
                hide-details
                v-model="is_select_all_group"
                @click="select_all_group"
              ></v-checkbox>
            </v-subheader>
            <v-list
              subheader
              dense
              class="pt-0 mt-0"
              :height="list_height"
              outlined
            >
              <v-list-item-group v-model="selected_group" multiple dense>
                <template v-for="(item, i) in group_index">
                  <v-list-item
                    :key="`item-${i}`"
                    :value="item"
                    active-class="primary--text text--accent-4"
                    dense
                  >
                    <template v-slot:default="{ active }">
                      <v-list-item-content class="body-2 py-0">
                        <span>
                          {{ item.name }} {{ active ? "&#10004;" : "" }}
                        </span>
                      </v-list-item-content>
                    </template>
                  </v-list-item>
                </template>
              </v-list-item-group>
            </v-list>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="1" class="pa-0 mr-2" align="center">
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
          <v-btn @click="add_plot" :dark="!ui_control.theme.dark"> New </v-btn>
        </v-row>

        <v-row class="pa-0 my-3 mt-15" justify="center">
          <v-btn @click="new_plot" :dark="!ui_control.theme.dark"> Plot </v-btn>
        </v-row>
      </v-col>

      <v-col cols="8" class="ma-0 pa-0 px-3" align-self="center" align="center">
        <v-row>
          <v-col cols="3" class="mt-2 pa-0">
            <v-combobox
              v-model="avg_type_selected"
              :items="avg_types"
              @change="new_plot"
              label="Averaging"
              class="py-3 pr-8"
              outlined
              dense
              hide-details
            ></v-combobox>
          </v-col>

          <v-col cols="3" class="mt-2 pa-0">
            <v-combobox
              v-model="fig_type_selected"
              :items="fig_types"
              @change="change_fig_type"
              label="Figure Type"
              class="py-3 pr-8"
              outlined
              dense
              hide-details
            ></v-combobox>
          </v-col>

          <v-col cols="3" class="mt-2 pa-0">
            <v-combobox
              v-model="trend_type_selected"
              :items="trend_types"
              @change="change_trend_type"
              label="Trend"
              class="py-3 pr-8"
              outlined
              dense
              hide-details
            ></v-combobox>
          </v-col>
        </v-row>

        <v-row ref="dehm_viz_canvas">
          <v-col class="mt-2 pa-0">
            <v-tabs
              v-model="ui_control.dehm_curr_tab"
              :dark="!ui_control.theme.dark"
              dense
              show-arrows
              height="30"
              background-color="#555555"
              slider-color="amber"
            >
              <v-tab
                v-for="n in app_data.dehm_plot_case.length"
                :key="n"
                class="px-2"
              >
                Fig {{ n }}
                <v-btn
                  icon
                  x-small
                  class="ml-4"
                  @click.native.stop
                  @click="del_plot(n)"
                >
                  <v-icon>mdi-close</v-icon>
                </v-btn>
              </v-tab>
            </v-tabs>

            <v-tabs-items v-model="ui_control.dehm_curr_tab">
              <v-tab-item
                v-for="fn in app_data.dehm_plot_case.length + 1"
                :key="fn"
              >
                <div
                  :id="'dehm_viz_plot_' + fn"
                  :style="`height: ${plot_height}px`"
                ></div>
              </v-tab-item>
            </v-tabs-items>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlotCase from "@/app_class/plot_case";

export default {
  name: "dehm_plot",
  data: () => ({
    isLoading: false,
    selected_project_case: [],
    selected_component: [],
    selected_group: [],
    list_height: 300,
    plot_height: 600,
    avg_types: ["Hourly", "Daily", "Monthly", "None"],
    trend_types: ["None", "Linear", "Sen's Slope", "LOWESS"],
    avg_type_selected: "Hourly",
    fig_type_selected: {
      text: "TS-Scatter",
      val: "ts_scatter",
      mode: "markers",
      error: false,
    },
    trend_type_selected: "None",
    gathering_method: 0,
    gathering_methods: ["None", "Mean", "Median", "Max", "Min"],
    is_select_all_project_case: false,
    is_select_all_component: false,
    is_select_all_group: false,
    use_var: false,
  }),
  mounted() {
    this.add_plot();
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    fig_types() {
      var fig_type =
        this.avg_type_selected == "Monthly"
          ? this.ui_control.fig_type_2
          : this.ui_control.fig_type_1;
      return fig_type;
    },
    project_case() {
      if (this.app_data.dehm.project_list == null) return [];
      return Object.keys(this.app_data.dehm.project_list);
    },
    component_index() {
      return this.ui_control.components;
    },
    group_index() {
      return this.app_data.user.c_groups;
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),

    select_all_project_case() {
      if (this.is_select_all_project_case) {
        this.selected_project_case = this.project_case;
      } else {
        this.selected_project_case = [];
      }
    },
    select_all_component() {
      if (this.is_select_all_component) {
        this.selected_component = this.component_index;
      } else {
        this.selected_component = [];
      }
    },
    select_all_group() {
      if (this.is_select_all_group) {
        this.selected_group = this.group_index;
      } else {
        this.selected_group = [];
      }
    },
    async add_plot() {
      var plot = this.ui_control.plot_default;
      plot.layout.title = `DEHM Case ${
        this.app_data.dehm_plot_case.length + 1
      }`;
      plot.fig_type = this.fig_type_selected;
      plot.layout.width = this.$refs.dehm_viz_canvas.clientWidth;
      plot.layout.height = this.plot_height;
      plot.div = `dehm_viz_plot_${this.app_data.dehm_plot_case.length + 1}`;
      this.app_data.dehm_plot_case.push(new PlotCase(plot));

      this.ui_control.dehm_curr_tab = this.app_data.dehm_plot_case.length - 1;
      // console.log(this.app_data.dehm_plot_case, this.ui_control.dehm_curr_tab);
      await this.$nextTick();
      await this.$nextTick();
      let index = this.ui_control.dehm_curr_tab;
      this.app_data.dehm_plot_case[index].plot_new();
    },

    async new_plot() {
      this.ui_control.isloading = true;

      let case_list = this.selected_project_case;
      var response;
      var var_list = [];
      var unit_list = [];
      if (this.use_var) {
        var_list = this.selected_component.map((x) => x.c);

        // replace unit
        var unit_rep = this.app_data.rep;
        unit_list = this.selected_component.map(
          (x) => unit_rep[this.app_data.user.components[x.c]["target_unit"][0]]
        );

        response = await this.app_data.dehm.query_components(
          case_list,
          var_list,
          unit_list,
          this.gathering_methods[this.gathering_method],
          this.avg_type_selected,
          this.app_data.user.create_form(),
          this.app_data.headers
        );
      } else {
        // query_groups
        console.log(this.selected_group);
      }

      this.SET_MESSAGE(response);

      console.log(response.data.data);

      var trace_data = await this.app_data.dehm.convert2trace(
        response.data.data,
        unit_rep
      );
      console.log(trace_data);
      let index = this.ui_control.dehm_curr_tab;
      await this.app_data.dehm_plot_case[index].plot_figure_simple(trace_data);
      await this.change_trend_type();
      this.ui_control.isloading = false;
    },

    del_plot(n) {
      // console.log(n)
      this.app_data.dehm_plot_case.splice(n - 1, 1);
      if (this.app_data.dehm_plot_case.length == 0) {
        this.add_plot();
      }
    },

    async change_fig_type() {
      let index = this.ui_control.dehm_curr_tab;
      let fig_type = this.fig_type_selected;
      this.app_data.dehm_plot_case[index].set_fig_type(fig_type);

      await this.new_plot();
    },

    async update_plot() {},
    async change_trend_type() {
      this.ui_control.isloading = true;
      let index = this.ui_control.dehm_curr_tab;
      if (this.trend_type_selected != "None") {
        if (this.app_data.dehm_plot_case[index].trace_layout.trace.length > 0) {
          await this.app_data.dehm_plot_case[index].plot_trend(
            this.trend_type_selected
          );
        }
      }
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
</style>