<template>
  <v-list class="pt-0">
    <v-list-item>
      <v-list-item-icon>
        <v-icon :color="ui_control.theme_color.content">
          mdi-cog
        </v-icon>
      </v-list-item-icon>

      <v-list-item-content>
        <v-slider v-model="margin" label="Figure margin" :max="200"></v-slider>

        <v-slider
          v-model="marker_size"
          label="Marker size"
          :max="20"
        ></v-slider>
      </v-list-item-content>
    </v-list-item>
  </v-list>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    margin: {
      get() {
        return 50;
      },
      set(val) {
        this.plot_case.layout.margin.r = val;
        this.plot_case.layout.margin.l = val;
        this.plot_case.layout.margin.t = val;
        this.plot_case.layout.margin.b = val;
      },
    },
  },
  methods: {
    ...mapMutations([]),
    relayout() {
      this.plot_case.update_layout();
    },
    restyle() {
      console.log(this.marker_size);
      this.plot_case.restyle({
        "marker.size": this.marker_size,
      });
    },
  },
};
</script>

<style lang="scss" scoped>
</style>