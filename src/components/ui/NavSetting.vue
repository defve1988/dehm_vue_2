<template>
  <v-navigation-drawer
    clipped
    width="275"
    :style="`background-color:${ui_control.theme_color.nav_bg}`"
    right
    absolute
    expand-on-hover
  >
    <v-list class="pt-0">
      <v-list-item
        v-for="(item, i) in ui_control.setting_view"
        :key="i"
        @click="switch_setting_view(item.text)"
      >
        <v-list-item-icon>
          <v-icon :color="ui_control.theme_color.content">{{
            item.icon
          }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title
            class="font-weight-light"
            :style="`color:${ui_control.theme_color.content}`"
            >{{ item.text }}</v-list-item-title
          >
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
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
  },
  methods: {
    ...mapMutations([]),
    switch_setting_view(text) {
      this.ui_control.curr_setting_view = text;
    },
  },
};
</script>

<style lang="scss" scoped>
</style>