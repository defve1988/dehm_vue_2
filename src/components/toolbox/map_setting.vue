<template>
  <v-list class="pt-0">
    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="ui_control.theme_color.content">
          mdi-earth-box
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <div class="mt-1 mb-5 font-weight-regular body-1">Map Style</div>

        <v-slider
          v-model="marker_size"
          label="Marker Size"
          thumb-label
          :max="100"
          @change="restyle('marker_size')"
        ></v-slider>

        <v-combobox
          v-model="selected_map_style"
          :items="ui_control.map_style"
          class="mb-3"
          label="Map Style"
          dense
          hide-details
          @change="change_map_style"
        ></v-combobox>

      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="ui_control.theme_color.content">
          mdi-arrow-expand
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <div class="mt-1 mb-5 font-weight-regular body-1">Map Size</div>

        <v-slider
          v-model="fig_width"
          label="Width"
          thumb-label
          :max="1500"
          @change="relayout"
        ></v-slider>

        <v-slider
          v-model="fig_height"
          label="Height"
          thumb-label
          :max="1500"
          @change="relayout"
        ></v-slider>

        <v-slider
          v-model="margin"
          label="Margin"
          thumb-label
          :max="200"
          @change="relayout"
        ></v-slider>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  props: ["plot_case"],
  data: () => ({
    marker_size: 6,
    selected_map_style: {
      text: "Light Style",
      mapbox: {
        style: "light",
      },
    },
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    fig_width: {
      get() {
        return this.plot_case != undefined ? this.plot_case.layout.width : null;
      },
      set(val) {
        if (this.plot_case != undefined) {
          this.plot_case.layout.width = val;
        }
      },
    },
    fig_height: {
      get() {
        return this.plot_case != undefined
          ? this.plot_case.layout.height
          : null;
      },
      set(val) {
        if (this.plot_case != undefined) {
          this.plot_case.layout.height = val;
        }
      },
    },
    margin: {
      get() {
        return this.plot_case != undefined
          ? this.plot_case.layout.margin.r
          : null;
      },
      set(val) {
        if (this.plot_case != undefined) {
          this.plot_case.layout.margin = {
            r: val,
            l: val,
            t: val,
            b: val,
          };
        }
      },
    },
  },
  methods: {
    ...mapMutations([]),
    relayout() {
      // console.log(tab_index)
      // console.log(this.plot_case)
      this.plot_case.update_layout();
    },
    change_map_style(){
      var map_box = { mapbox: this.selected_map_style.mapbox };
      this.plot_case.set_layout(map_box);
      this.plot_case.update_layout();
    },
    restyle(attr) {
      switch (attr) {
        case "marker_size":
          this.plot_case.restyle({
            "marker.size": this.marker_size,
          });
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>