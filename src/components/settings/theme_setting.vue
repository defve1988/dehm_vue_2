<template>
  <v-container>
    <v-row>
      <v-col>
        <h3 :style="`color:${ui_control.theme_color.content}`">APP Theme</h3>
        <v-checkbox
          v-model="ui_control.theme.dark"
          @click="change_theme"
          label="Dark Theme"
          :dark="ui_control.theme.brightness <= 50"
        ></v-checkbox>
      </v-col>
    </v-row>

    <v-row>
      <v-col lg="6" md="4">
        <v-row v-for="(item, index) in theme_color" :key="index">
          <v-col>
            <v-slider
              v-model="ui_control.theme[item.val]"
              @change="onChange()"
              :label="item.label"
              max="100"
              min="0"
              thumb-label="always"
              :dark="ui_control.theme.brightness <= 50"
              :color="ui_control.theme_color.content"
            ></v-slider>
          </v-col>
        </v-row>
      </v-col>

      <v-col lg="4" md="4">
        <v-row>
          <v-col>
            <v-hover v-slot="{ hover }">
              <v-card
                height="300"
                :elevation="hover ? 6 : 2"
                class="
                  ma-3
                  d-flex
                  flex-column
                  align-center
                  justify-center
                  lighten-2
                "
                :color="ui_control.theme_color.card_bg"
              >
                <v-card-title
                  class="title text-uppercase"
                  :style="`color:${ui_control.theme_color.content}`"
                >
                  Example
                </v-card-title>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    
    <!-- <v-row>
      <v-divider
        :style="`border-color:${ui_control.theme_color.content}`"
      ></v-divider>
    </v-row> -->
  </v-container>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";

export default {
  name: "theme_setttings",
  data: () => ({
    theme_color: [
      { label: "Brightness", val: "brightness" },
      { label: "App background", val: "app_bg" },
      { label: "Nav Bar", val: "nav_bar_bg" },
      { label: "Card background", val: "card_bg" },
      { label: "Content", val: "content_color" },
    ],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations(["SET_THEME", "SET_MESSAGE"]),
    ...mapActions([]),
    async onChange() {
      await this.SET_THEME();
    },
    async change_theme() {
      if (this.ui_control.theme.dark) this.ui_control.theme.brightness = 10;
      if (!this.ui_control.theme.dark) this.ui_control.theme.brightness = 90;
      await this.SET_THEME();
    },
  },
};
</script>
<style scoped lang="scss">
// .v-divider {
//   border-color: rgba(0, 0, 0, 0.12) !important;
// }
</style>