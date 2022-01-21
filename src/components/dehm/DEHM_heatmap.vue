<template>
  <v-container class="pr-10">
    <div class="subtitle-1">EBAS Maps</div>
    <v-divider></v-divider>
    <v-row class="mt-1">
      <v-col cols="2" class="pb-0">
        <v-combobox
          v-model="selected_component"
          :items="component_index"
          @change="plot_map"
          label="Component"
          class="py-3 pr-8"
          outlined
          dense
          hide-details
        ></v-combobox>
      </v-col>
    </v-row>

    <v-row class="mt-3">
      <v-col cols="12" class="pb-0">
        <div id="ebas_map" ref="ebas_map_canvas"></div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import PlotMap from "@/app_class/plot_map";

export default {
  name: "ebas_map",
  data: () => ({
    isLoading: false,
    map_height: 700,
    selected_component: null,
  }),
  async mounted() {
    await this.plot_map();
  },
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    component_index() {
      if (this.app_data.ebas.data == null) return [];
      let component = this.app_data.ebas.data.data.map((x) => x.component);
      component = [...new Set(component)];
      return component;
    },
  },
  methods: {
    ...mapMutations([]),
    async plot_map() {
      var plot = JSON.parse(JSON.stringify(this.ui_control.plot_default));
      plot.layout.width = this.$refs.ebas_map_canvas.clientWidth;
      plot.layout.height = this.map_height;
      plot.config.displayModeBar = false;
      plot.div = "ebas_map";
      this.app_data.ebas_plot_map = new PlotMap(plot);

      if (this.selected_component != null) {
        var map_data = this.app_data.ebas_plot_map.data.gene_map_scatter_trace({
          site:this.app_data.ebas.curr_site_list,
          data:this.app_data.ebas.data.data,
          component:this.selected_component
        });
        this.app_data.ebas_plot_map.plot_map_scatter(map_data);
        this.app_data.ebas_plot_map.set_click_func()
      } else {
        this.app_data.ebas_plot_map.plot_dots();
      }
    },
  },
};
</script>
<style scoped lang="scss">
</style>