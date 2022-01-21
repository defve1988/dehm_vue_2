<template>
  <v-container class="px-10">
    <NavSetting />
    <span v-if="!islogin"> Please login for settings </span>

    <div v-else>
      <UserSetting v-if="ui_control.curr_setting_view==='User'"/>
      <ComponentSetting v-if="ui_control.curr_setting_view==='Components'"/>
      <FileSetting v-if="ui_control.curr_setting_view==='Files'"/>
      <ThemeSetting v-if="ui_control.curr_setting_view==='APP Theme'"/>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Settings",
  data: () => ({}),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    islogin() {
      return this.app_data.user.isLogin;
    },
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>
<style scoped lang="scss">
// .v-divider {
//   border-color: rgba(0, 0, 0, 0.12) !important;
// }
</style>