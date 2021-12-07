<template>
  <v-container>
    <v-row>
      <v-col class="title">
        <h3 :style="`color:${ui_control.theme_color.content}`">
          Evaluation Components
        </h3>
      </v-col>
    </v-row>

    <v-row class="mb-5">
      <v-col cols="3">
        <v-subheader class="pt-0 mt-0 px-3" dark>
          Components
          <v-spacer></v-spacer>
          <v-btn icon x-small @click="ui_control.new_component_dialog = true">
            <v-icon> mdi-plus </v-icon>
          </v-btn>
        </v-subheader>
        <v-list dense height="600" id="component_list">
          <v-list-item-group v-model="selectedItem" color="primary">
            <v-list-item v-for="(item, i) in components" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.text"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="2">
        <v-subheader class="pt-0 mt-0 px-3" dark> DEHM Variables </v-subheader>
        <v-list dense height="280">
          <v-list-item-group v-model="selectedDEHM" color="primary" mandatory>
            <v-list-item v-for="(item, i) in selected_dehm" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-subheader class="pt-0 mt-5 px-3" dark> EBAS Variables </v-subheader>
        <v-list dense height="280">
          <v-list-item-group v-model="selectedEBAS" color="primary" mandatory>
            <v-list-item v-for="(item, i) in selected_ebas" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
      </v-col>

      <v-col cols="4">
        <v-subheader class="pt-0 mt-0 px-3" dark>
          DEHM Variable Units
        </v-subheader>
        <v-list dense height="280">
          <v-list-item-group v-model="selectedDEHM" color="primary" mandatory>
            <v-list-item v-for="(item, i) in selected_dehm" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>

                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">from</th>
                        <th
                          class="text-left"
                          v-for="(target_unit, t_index) in target_units"
                          :key="t_index"
                        >
                          to ({{ target_unit }})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(unit, u_index) in item.units" :key="u_index">
                        <td>{{ unit }}</td>
                        <td
                          v-for="(val, v_index) in item.vals[u_index]"
                          :key="v_index"
                        >
                          {{ val }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>

        <v-subheader class="pt-0 mt-5 px-3" dark>
          EBAS Variable Units
        </v-subheader>
        <v-list dense height="280">
          <v-list-item-group v-model="selectedEBAS" color="primary" mandatory>
            <v-list-item v-for="(item, i) in selected_ebas" :key="i">
              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr>
                        <th class="text-left">from</th>
                        <th
                          class="text-left"
                          v-for="(target_unit, t_index) in target_units"
                          :key="t_index"
                        >
                          to ({{ target_unit }})
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(unit, u_index) in item.units" :key="u_index">
                        <td>{{ unit }}</td>
                        <td
                          v-for="(val, v_index) in item.vals[u_index]"
                          :key="v_index"
                        >
                          {{ val }}
                        </td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </v-list-item-content>
            </v-list-item>
          </v-list-item-group>
        </v-list>
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

    <v-btn
      small
      class="ma-0 mb-5 ml-4"
      @click="del_c"
      color="red"
      :dark="!ui_control.theme.dark"
    >
      Delete Selected Component
    </v-btn>

    <NewComponent />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ccomponents",
  data: () => ({
    selectedItem: 0,
    selectedDEHM: 0,
    selectedEBAS: 0,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),

    components() {
      return this.ui_control.components;
    },

    target_units() {
      // note: if you delete a item, index will become undefined, remember to reset index
      let c = this.components[this.selectedItem].c;
      return this.app_data.user.components[c]["target_unit"];
    },

    selected_dehm() {
      let c = this.components[this.selectedItem].c;
      let content = this.app_data.user.components[c]["DEHM"];
      let vars = Object.keys(content);
      let res = [];
      vars.forEach((x) => {
        let units = Object.keys(content[x]["convert_factor"]);
        let vals = Object.values(content[x]["convert_factor"]);
        res.push({
          name: x,
          units: units,
          vals: vals,
        });
      });
      return res;
    },
    selected_ebas() {
      let c = this.components[this.selectedItem].c;
      if ("EBAS" in this.app_data.user.components[c]) {
        let content = this.app_data.user.components[c]["EBAS"];
        let vars = Object.keys(content);
        let res = [];
        vars.forEach((x) => {
          let units = Object.keys(content[x]["convert_factor"]);
          let vals = Object.values(content[x]["convert_factor"]);
          res.push({
            name: x,
            units: units,
            vals: vals,
          });
        });
        return res;
      } else {
        return [];
      }
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE", "SET_UI_FROM_USER"]),
    del_c() {
      let selected_c = this.components[this.selectedItem];
      var answer = window.confirm(`Are you sure to delete ${selected_c.c}?`);
      if (answer) {
        delete this.app_data.user.components[selected_c.c];
        this.SET_UI_FROM_USER(this.app_data.user);
        this.selectedItem = 0;
        this.ui_control.snackbar = {
          show: true,
          text: `Component ${selected_c.c} is deleted.`,
          color: "warning",
        };
      }
    },
    async save_changes() {
      await this.update_user("components");
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