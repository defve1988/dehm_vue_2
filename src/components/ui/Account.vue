<template>
  <v-row>
    <v-col align="end" v-if="app_data.user.isLogin">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            icon
            small
            class="mx-2"
            v-bind="attrs"
            v-on="on"
            @click="logout"
          >
            <v-avatar
              v-if="app_data.user.user_image != null"
              size="35"
              :style="'cursor:pointer;'"
            >
              <img :src="'data:image/gif;base64,' + app_data.user.user_image" />
            </v-avatar>

            <v-icon
              v-if="
                app_data.user.user_image == null ||
                app_data.user.user_image == undefined
              "
              :style="'cursor:pointer;'"
            >
              mdi-account
            </v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>

      <span v-if="app_data.user.isLogin" class="font-weight-light ma-1">
        {{ app_data.user.user_name }}
      </span>
    </v-col>

    <v-col align="end" v-if="!app_data.user.isLogin">
      <v-btn plain class="mx-1" @click="login"> Login </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { mapState } from "vuex";

export default {
  data: () => ({}),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    login() {
      this.ui_control.register_dialog = true;
    },
    logout() {
      if (
        confirm(
          "Are you sure you want to logout, you will lose unsaved projects?"
        )
      ) {
        this.ui_control.snackbar = {
          show: true,
          text: `${this.app_data.user_name} is logout.`,
          color: "infor",
        };
        this.app_data.user.logout();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
span {
  vertical-align: bottom;
  // font-variant: small-caps;
  font-size: 1rem;
}
</style>