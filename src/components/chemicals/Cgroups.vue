<template>
  <v-container>
    <v-row>
      <v-col class="title">
        <h3 :style="`color:${ui_control.theme_color.content}`">
          Evaluation Groups
        </h3>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col cols="2">
        <v-subheader class="pt-0 mt-0 px-3" dark>
          Groups
          <v-spacer></v-spacer>
          <v-btn
            class="mx-1"
            icon
            x-small
            @click="
              show_edit = true;
              new_group = false;
            "
          >
            <v-icon> mdi-pencil </v-icon>
          </v-btn>
          <v-btn
            class="mx-1"
            icon
            x-small
            @click="
              show_edit = true;
              new_group = true;
            "
          >
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-subheader>
        <v-list dense height="300" id="component_list">
          <v-list-item-group v-model="selectedItem" color="primary" mandatory>
            <v-list-item v-for="(item, i) in groups" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="2">
        <v-subheader class="pt-0 mt-0 px-3" dark>
          Group Components
        </v-subheader>
        <v-list dense height="300" id="component_list">
          <v-list-item-group color="primary">
            <v-list-item v-for="(item, i) in selected_group" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="3" v-if="show_edit">
        <v-subheader class="pt-0 mt-0 px-3" dark>
          {{ new_group ? "Adding new group" : "Editing group" }}
          <v-spacer></v-spacer>
          <v-btn icon x-small @click="show_edit = false">
            <v-icon> mdi-close </v-icon>
          </v-btn>
        </v-subheader>
        <v-card
          tile
          class="pa-2 px-4 ma-0 d-flex flex-column"
          height="300"
          flat
        >
          <v-card-text>
            <v-text-field
              label="Group Name"
              class="mb-5"
              v-model="edit_group_name"
            ></v-text-field>

            <v-combobox
              :items="possible_component"
              hint="Keyboard for search"
              label="Select Components"
              multiple
              small-chips
              dense
              v-model="edit_group_c"
            >
            </v-combobox>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              v-if="!new_group"
              small
              class="ma-0 mb-5 warning"
              @click="del_group"
              :dark="!ui_control.theme.dark"
            >
              Delete Group
            </v-btn>
            <v-btn
              v-else
              small
              class="ma-0 mb-5"
              @click="add_group"
              :dark="!ui_control.theme.dark"
            >
              Add Group
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-btn
      small
      class="ma-0 mb-5"
      @click="save_changes"
      :dark="!ui_control.theme.dark"
    >
      Save Changes
    </v-btn>

    <!-- todo: 
    1. deal with empty group list error
    -->
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "cgroups",
  data: () => ({
    selectedItem: 1,
    show_edit: false,
    new_group: false,
    new_group_name: "",
    new_group_c: [],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    groups() {
      return this.app_data.user.c_groups;
    },

    possible_component() {
      return Object.keys(this.app_data.user.components);
    },

    selected_group() {
      return this.app_data.user.c_groups[this.selectedItem].components;
    },
    edit_group_name: {
      get: function () {
        return this.new_group
          ? this.new_group_name
          : this.app_data.user.c_groups[this.selectedItem].name;
      },
      set: function (newValue) {
        if (!this.new_group) {
          this.app_data.user.c_groups[this.selectedItem].name = newValue;
        } else {
          this.new_group_name = newValue;
        }
      },
    },
    edit_group_c: {
      get: function () {
        return this.new_group
          ? this.new_group_c
          : this.app_data.user.c_groups[this.selectedItem].components;
      },
      set: function (newValue) {
        if (!this.new_group) {
          this.app_data.user.c_groups[this.selectedItem].components = newValue;
        } else {
          this.new_group_c = newValue;
        }
      },
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    async save_changes() {
      this.ui_control.isloading = true;

      let response = await this.app_data.user.update_field(
        "c_groups",
        this.app_data.headers
      );

      this.SET_MESSAGE(response);
      this.ui_control.isloading = false;
    },
    del_group() {
      this.app_data.user.c_groups.splice(this.selectedItem, 1);
      this.selectedItem = 1;
      this.selectedItem = 0;
    },
    add_group() {
      let new_group = {
        name: this.new_group_name,
        components: this.new_group_c,
      };
      this.app_data.user.c_groups.push(new_group);
      this.selectedItem = this.app_data.user.c_groups.length - 1;
    },
  },
};
</script>
<style scoped lang="scss">
.v-list {
  overflow-y: scroll;
}
.v-subheader {
  background-color: #555555;
  height: 25px;
}
</style>