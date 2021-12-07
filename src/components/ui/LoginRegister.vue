<template>
  <v-dialog v-model="ui_control.register_dialog" width="500">
    <v-tabs v-model="tab">
      <v-tab>Login</v-tab>
      <v-tab>Register</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <v-card class="pa-5" :loading="isLoading">
          <v-text-field
            v-model="user_name_login"
            label="Account Name"
            required
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            v-model="pwd_login"
            label="Password"
            prepend-icon="mdi-key"
            required
          ></v-text-field>

          <v-card-actions align-self="end">
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2" @click="login"> Login </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>

      <v-tab-item>
        <v-card class="pa-5" :loading="isLoading">
          <v-text-field
            v-model="user_name_register"
            label="Account Name"
            required
            prepend-icon="mdi-account"
          ></v-text-field>

          <v-text-field
            v-model="pwd_register"
            label="Password"
            prepend-icon="mdi-key"
            required
          ></v-text-field>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary" class="mr-2" @click="register">
              Register
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  data: () => ({
    isLoading: false,
    tab: null,
    invitation: "",
    user_name_login: "",
    pwd_login: "",
    user_name_register: "",
    pwd_register: "",
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations(["SET_MESSAGE","SET_UI_FROM_USER"]),
    async register() {
      this.isLoading = true;
      let response = await this.app_data.user.register(
        { user_name: this.user_name_register, password: this.pwd_register },
        this.app_data.headers
      );
      if (response.code == 0) {
        this.ui_control.register_dialog = false;
        this.SET_UI_FROM_USER(this.app_data.user)
      }
      this.isLoading = false;
      this.SET_MESSAGE(response);
    },
    async login() {
      this.isLoading = true;
      let response = await this.app_data.user.login(
        { user_name: this.user_name_login, password: this.pwd_login },
        this.app_data.headers
      );
      if (response.code == 0) {
        this.ui_control.register_dialog = false;
        this.SET_UI_FROM_USER(this.app_data.user)
      }
      this.isLoading = false;
      this.SET_MESSAGE(response);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>