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
          <v-btn icon x-small @click="add_new_c">
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
      let names = [];
      for (const [key, value] of Object.entries(
        this.app_data.user.components
      )) {
        names.push({
          c: key,
          text: `${key} (${value.name})`,
        });
      }
      console.log(names)
      return names;
    },

    target_units() {
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
    ...mapMutations(["SET_MESSAGE"]),
    add_new_c(){
       this.ui_control.new_component_dialog=true
    },
    async save_changes(){

    }
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