<template>
  <v-list class="pt-0">
    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="ui_control.theme_color.content">
          mdi-circle-half-full
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <div class="mt-1 mb-5 font-weight-regular body-1">Figure Style</div>

        <v-slider
          v-model="marker_size"
          label="Marker Size"
          thumb-label
          :max="20"
          @change="restyle('marker_size')"
        ></v-slider>

        <v-slider
          v-model="line_width"
          label="Line Width"
          thumb-label
          :max="12"
          @change="restyle('line_width')"
        ></v-slider>
        
        <v-slider
          v-model="marker_alpha"
          label="Marker Alpha"
          thumb-label
          step="0.1"
          :max="1"
          @change="restyle('marker_alpha')"
          disabled
        ></v-slider>

        <v-slider
          v-model="line_alpha"
          label="Line Alpha"
          thumb-label
          step="0.1"
          :max="1"
          @change="restyle('line_alpha')"
          disabled
        ></v-slider>
      </v-list-item-content>
    </v-list-item>

    <v-divider></v-divider>

    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="ui_control.theme_color.content">
          mdi-format-size
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <div class="mt-1 mb-5 font-weight-regular body-1">Font Size</div>
        <v-slider
          v-model="title_size"
          label="Title"
          thumb-label
          :max="48"
          @change="restyle('title_size')"
        ></v-slider>

        <v-slider
          v-model="axis_size"
          label="Axis"
          thumb-label
          :max="20"
          @change="restyle('axis_size')"
          disabled
        ></v-slider>

        <v-slider
          v-model="tick_size"
          label="Tick"
          thumb-label
          :max="20"
          @change="restyle('tick_size')"
          disabled
        ></v-slider>

        <v-slider
          v-model="legend_size"
          label="Legend"
          thumb-label
          :max="20"
          @change="restyle('legend_size')"
          disabled
        ></v-slider>
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
        <div class="mt-1 mb-5 font-weight-regular body-1">Figure Size</div>

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
    marker_alpha: 0.8,
    line_width: 1,
    line_alpha: 0.8,
    title_size: 20,
    axis_size: 12,
    tick_size: 10,
    legend_size: 10,
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
    restyle(attr) {
      console.log(attr);
      switch (attr) {
        case "marker_size":
          this.plot_case.restyle({
            "marker.size": this.marker_size,
          });
          break;
        case "line_width":
          this.plot_case.restyle({
            "line.width": this.line_width,
          });
          break;
        case "title_size":
          if ("font" in this.plot_case.layout.title){
            this.plot_case.layout.title.font.size = this.title_size;
          }
          else{
            this.plot_case.layout.title.font = {size: this.title_size}
          }
          this.plot_case.update_layout();
          break;
      }
    },
  },
};
</script>

<style lang="scss" scoped>
</style>