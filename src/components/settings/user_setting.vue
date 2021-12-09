<template>
  <v-container>
    <v-row>
      <v-col class="title">
        <h3 :style="`color:${ui_control.theme_color.content}`">
          User's Perference
          <v-btn
            small
            class="ma-2 mx-15"
            @click="del_user"
            color="red"
            :dark="!ui_control.theme.dark"
          >
            Delete Current User Account
          </v-btn>
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <h4 :style="`color:${ui_control.theme_color.content}`">Avatar</h4>
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col cols="4">
        <v-file-input
          accept="image/png"
          placeholder="Pick an avatar"
          prepend-icon="mdi-camera"
          label="Select a image"
          @change="onFileChanged"
          :dark="ui_control.theme.brightness <= 50"
        ></v-file-input>
      </v-col>

      <v-col cols="6">
        <v-btn
          small
          class="ma-2"
          @click="upload_image"
          :dark="!ui_control.theme.dark"
        >
          Upload
        </v-btn>
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col>
        <h4 :style="`color:${ui_control.theme_color.content}`">
          Color perference
          <span class="caption"> (double click to delete) </span>
        </h4>
      </v-col>
    </v-row>

    <v-row class="my-0">
      <v-col cols="2">
        <template v-for="(item, index) in color_list">
          <v-hover v-slot="{ hover }" :key="index">
            <v-sheet
              :color="item"
              :elevation="hover || selected_color_index == index ? 7 : 2"
              height="25"
              width="80"
              class="ma-2"
              @click="selected_color_index = index"
              @dblclick="del_color"
              :style="'cursor:pointer'"
            >
              <v-icon class="mx-7" v-if="selected_color_index == index">
                mdi-check
              </v-icon>
            </v-sheet>
          </v-hover>
        </template>

        <v-hover v-slot="{ hover }">
          <v-sheet
            :dark="ui_control.theme.brightness <= 50"
            :elevation="hover ? 7 : 2"
            height="25"
            width="80"
            class="ma-2"
            :style="'cursor:pointer'"
            @click="add_color"
          >
            <v-icon class="mx-7"> mdi-plus </v-icon>
          </v-sheet>
        </v-hover>
      </v-col>
      <v-col>
        <v-color-picker
          class="ma-2"
          :dark="ui_control.theme.brightness <= 50"
          v-model="selected_color"
          hide-mode-switch
        ></v-color-picker>
      </v-col>
    </v-row>

    <v-row>
      <v-btn
        small
        class="ma-5"
        @click="save_color_list"
        :dark="!ui_control.theme.dark"
      >
        Save colors
      </v-btn>
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
  name: "user_settings",
  data: () => ({
    image_file: null,
    selected_color_index: 0,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    color_list() {
      return this.ui_control.user_color_list;
    },
    selected_color: {
      // getter
      get: function () {
        return this.ui_control.user_color_list[this.selected_color_index];
      },
      // setter
      set: function (newValue) {
        this.ui_control.user_color_list[this.selected_color_index] = newValue;
        this.ui_control.user_color_list.push(1);
        this.ui_control.user_color_list.pop();
      },
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    ...mapActions([]),
    del_color() {
      this.ui_control.user_color_list.splice(this.selected_color_index, 1);
    },
    add_color() {
      let color = Math.floor(Math.random() * 16777215).toString(16);
      this.ui_control.user_color_list.push("#" + color + "CC");
      console.log(this.ui_control.user_color_list)
    },
    async save_color_list(){
      this.app_data.user.color_list = this.ui_control.user_color_list
      await this.update_user('color_list')
    },
    async del_user() {
      if (
        confirm(
          "Are you sure you want to delete this user account, you will lose all the projects and figures under this user account!!"
        )
      ) {
        this.ui_control.isloading = true;
        let response = await this.app_data.user.del_user(this.app_data.headers);
        this.SET_MESSAGE(response);
        this.ui_control.isloading = false;
      }
    },
    async update_user(field) {
      this.ui_control.isloading = true;

      let response = await this.app_data.user.update_field(
        field,
        this.app_data.headers
      );

      this.SET_MESSAGE(response);
      this.ui_control.isloading = false;
    },

    async upload_image() {
      this.ui_control.isloading = true;

      let response = await this.app_data.user.upload_image(
        this.image_file,
        this.app_data.headers
      );

      this.SET_MESSAGE(response);
      this.ui_control.isloading = false;
    },
    onFileChanged(file) {
      this.image_file = file;
    },
  },
};
</script>
<style scoped lang="scss">
// .v-divider {
//   border-color: rgba(0, 0, 0, 0.12) !important;
// }
</style>