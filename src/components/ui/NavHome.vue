<template>
  <v-navigation-drawer
    app
    clipped
    width="275"
    :style="`background-color:${ui_control.theme_color.nav_bg}`"
  >
    <v-list class="pt-0">
      <v-list-item
        v-for="(item, i) in ui_control.home_view"
        :key="i"
        @click="router_to(item.router)"
      >

        <v-list-item-icon>
          <v-icon :color="ui_control.theme_color.content">{{ item.icon }}</v-icon>
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
import utilities from "@/app_class/utilities";

export default {
  data: () => ({
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations([]),
    router_to(router){
      this.$router
        .replace({
          path: "/"+router,
        })
        .catch(utilities.handle_redundant_route);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>