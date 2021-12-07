<template>
  <v-dialog v-model="ui_control.new_component_dialog" width="850">
    <v-system-bar color="primary" dark>
      Add New Component
      <v-spacer></v-spacer>
      <v-btn icon x-small>
        <v-icon
          class="pa-0 ma-0"
          @click="ui_control.new_component_dialog = false"
          >mdi-close</v-icon
        >
      </v-btn>
    </v-system-bar>
    <v-card tile class="pa-1 ma-0" flat>
      <v-row class="mx-3">
        <v-col cols="3" class="ma-3">
          <v-text-field
            label="Short Name"
            v-model="key_name"
            hint="Short name, e.g., GEM."
          ></v-text-field>
        </v-col>

        <v-col cols="3" class="ma-3">
          <v-text-field
            label="Long Name"
            v-model="long_name"
            hint="Full name, e.g., gaseous elemental mercury."
          ></v-text-field>
        </v-col>

        <v-col cols="4" class="ma-3">
          <v-combobox
            :items="possible_target_units"
            hint="This is evaluation output units."
            label="Target Unit"
            multiple
            small-chips
            v-model="target_units"
          >
          </v-combobox>
        </v-col>
      </v-row>

      <v-row class="mx-3">
        <v-col cols="4" class="ma-4 py-0">
          <v-combobox
            :items="possible_dehm"
            class="mb-5"
            hint="Selected model output will be summed."
            label="DEHM Output Variables"
            multiple
            small-chips
            dense
            v-model="dehm_vars"
          >
          </v-combobox>
        </v-col>

        <v-col cols="7" class="ma-4 py-0">
          <v-subheader class="pt-0 mt-0 px-3" dark>
            DEHM Variable Units
          </v-subheader>
          <v-list dense height="225">
            <v-list-item-group>
              <v-list-item v-for="(dehm_var, i) in dehm_vars" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="dehm_var.c"></v-list-item-title>
                  <EditableTable
                    :headers="dehm_var.headers"
                    :table_data="dehm_var.unit_data"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>

      <v-row class="mx-3">
        <v-col cols="4" class="ma-4 py-0">
          <v-combobox
            :items="possible_ebas"
            class="mb-5"
            label="EBAS measurement Variables"
            multiple
            small-chips
            dense
            v-model="ebas_vars"
          >
          </v-combobox>
        </v-col>
        <v-col cols="7" class="ma-4 py-0">
          <v-subheader class="pt-0 mt-0 px-3" dark>
            EBAS Variable Units
          </v-subheader>
          <v-list dense height="225">
            <v-list-item-group>
              <v-list-item v-for="(ebas_var, i) in ebas_vars" :key="i">
                <v-list-item-content>
                  <v-list-item-title v-text="ebas_var.c"></v-list-item-title>
                  <EditableTable
                    :headers="ebas_var.headers"
                    :table_data="ebas_var.unit_data"
                  />
                </v-list-item-content>
              </v-list-item>
            </v-list-item-group>
          </v-list>
        </v-col>
      </v-row>

      <v-card-actions class="mt-5">
        <v-spacer></v-spacer>
        <v-btn
          small
          class="ma-0 mb-5"
          @click="add_c"
          :dark="!ui_control.theme.dark"
        >
          Add Component
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import _ from "underscore";

export default {
  data: () => ({
    key_name: "TEST",
    long_name: "test_c",
    target_units: ["ug/m3", "ppbv"],
    dehm_vars: [],
    ebas_vars: [],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    possible_target_units() {
      var res = [];
      for (const key in this.app_data.user.components) {
        let val = this.app_data.user.components[key];
        res.push(...val.target_unit);
      }
      return Array.from(new Set(res));
    },
    possible_dehm() {
      var res = {};
      for (const key in this.app_data.user.components) {
        let val = this.app_data.user.components[key];
        for (const [key, value] of Object.entries(val.DEHM)) {
          let units = Object.keys(value.convert_factor);
          units.forEach((u) => {
            let temp = `${key} (${u})`;
            if (!(temp in res)) {
              let headers = [{ text: "from", value: "from" }];
              this.target_units.forEach((x, index) => {
                headers.push({ text: `to(${x})`, value: `u${index}` });
              });

              let unit_data = { from: u };
              this.target_units.forEach((x, index) => {
                unit_data[`u${index}`] = 1;
              });

              res[temp] = {
                text: temp,
                c: key,
                unit: [u],
                headers: headers,
                unit_data: [unit_data],
              };
            }
          });
        }
      }
      // console.log(res);
      return _.sortBy(Object.values(res), "text");
    },

    possible_ebas() {
      var res = {};
      this.app_data.ebas.site_list.forEach((x) => {
        x.components.forEach((c) => {
          let temp = `${c[0]}, ${c[1]}}`;
          let u = c[5];
          if (!(temp in res)) {
            let headers = [{ text: "from", value: "from" }];
            this.target_units.forEach((x, index) => {
              headers.push({ text: `to(${x})`, value: `u${index}` });
            });

            let unit_data = { from: u };
            this.target_units.forEach((x, index) => {
              unit_data[`u${index}`] = 1;
            });

            res[temp] = {
              c: c[0],
              matrix: c[1],
              unit: [u],
              text: `${c[0]}, ${c[1]} (${u})`,
              headers: headers,
              unit_data: [unit_data],
            };
          } else {
            if (!res[temp].unit.includes(u)) {
              let new_unit_data = { from: u };
              this.target_units.forEach((x, index) => {
                new_unit_data[`u${index}`] = 1;
              });

              res[temp].unit.push(u);
              let unit_str = res[temp].unit.join(", ");
              res[temp].text = `${c[0]}, ${c[1]} (${unit_str})`;
              res[temp].unit_data.push(new_unit_data);
            }
          }
        });
      });
      return _.sortBy(Object.values(res), "text");
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE","SET_UI_FROM_USER"]),
    add_c() {
      // console.log(this.app_data.user.components)
      if (this.key_name.length == 0 || this.long_name.length == 0) {
        this.ui_control.snackbar = {
          show: true,
          text: `Component name is needed!`,
          color: "error",
        };
      } else if (this.dehm_vars.length == 0) {
        this.ui_control.snackbar = {
          show: true,
          text: `DEHM must be selected!`,
          color: "error",
        };
      } else {
        let isSuccess = true;
        let target_unit = this.target_units;
        let new_c = {
          name: this.long_name,
          target_unit: target_unit,
          DEHM: {},
          EBAS: {},
        };
        // add dehm
        this.dehm_vars.forEach((dehm_var) => {
          let convert_factor = {};
          dehm_var.unit.forEach((u, index) => {
            let temp = [];
            for (let i = 0; i < target_unit.length; i++) {
              let value = parseFloat(dehm_var.unit_data[index][`u${i}`]);
              if (!isNaN(value)) {
                temp.push(value);
              } else {
                this.ui_control.snackbar = {
                  show: true,
                  text: `Unit converting number must be a number!`,
                  color: "error",
                };
                isSuccess = false;
              }
            }
            convert_factor[u] = temp;
          });
          new_c.DEHM[dehm_var.c] = { convert_factor: convert_factor };
        });
        // add ebas
        this.ebas_vars.forEach((ebas_var) => {
          let convert_factor = {};
          ebas_var.unit.forEach((u, index) => {
            let temp = [];
            for (let i = 0; i < target_unit.length; i++) {
              let value = parseFloat(ebas_var.unit_data[index][`u${i}`]);
              if (!isNaN(value)) {
                temp.push(value);
              } else {
                this.ui_control.snackbar = {
                  show: true,
                  text: `Unit converting number must be a number!`,
                  color: "error",
                };
                isSuccess = false;
              }
            }
            convert_factor[u] = temp;
          });
          new_c.EBAS[ebas_var.c] = {
            convert_factor: convert_factor,
            matrix: ebas_var.matrix,
          };
        });

        if (isSuccess) {
          this.app_data.user.components[this.key_name] = new_c;
          this.SET_UI_FROM_USER(this.app_data.user);
          this.ui_control.snackbar = {
            show: true,
            text: `New component ${this.key_name} is added.`,
            color: "success",
          };
        }
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.v-list {
  overflow-y: scroll;
}
.v-subheader {
  background-color: #555555;
  height: 25px;
}
</style>