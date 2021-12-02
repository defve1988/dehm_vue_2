<template>
  <v-dialog v-model="ui_control.new_component_dialog" width="400">
    <v-system-bar color="primary" dark>
      Add New Component
      <v-spacer></v-spacer>
      <v-icon>mdi-close</v-icon>
    </v-system-bar>
    <v-card tile class="pa-1 ma-0 d-flex flex-column" height="500" flat>
      <v-card-text>
        <v-text-field
          label="Short Name"
          v-model="key_name"
          hide-details
        ></v-text-field>

        <v-text-field
          label="Long Name"
          class="mb-8"
          v-model="long_name"
          hide-details
        ></v-text-field>

        <v-combobox
          :items="possible_target_units"
          class="mb-5"
          hint="This is evaluation output unit."
          label="Target Unit"
          multiple
          small-chips
          dense
          v-model="target_units"
        >
        </v-combobox>

        <v-combobox
          :items="possible_dehm"
          class="mb-5"
          hint="Selected model output will be summed."
          label="Model Output Variables"
          multiple
          small-chips
          dense
          v-model="dehm_vars"
        >
        </v-combobox>

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
      </v-card-text>

      <v-data-table :headers="headers" :items="unit_data" dense disable-sort>
        <template v-slot:item.to1="props">
          <v-edit-dialog
            :return-value.sync="props.item.to1"
          >
            {{ props.item.to1 }}
            <template v-slot:input>
              <v-text-field
                v-model="props.item.to1"
                label="Edit"
                single-line
                counter
              ></v-text-field>
            </template>
          </v-edit-dialog>
        </template>
      </v-data-table>

      <v-spacer></v-spacer>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          small
          class="ma-0 mb-5"
          @click="add_group"
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
    key_name: "",
    long_name: "",
    target_units: [],
    dehm_vars: [],
    ebas_vars: [],
    headers: [
      { text: "from", value: "from" },
      { text: "to(1)", value: "to1" },
      { text: "to(2)", value: "to2" },
    ],
    unit_data: [
      {
        from: "u1",
        to1: 1,
        to2: 2,
      },
      {
        from: "u2",
        to1: 3,
        to2: 4,
      },
    ],
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
      var res = [];
      var res_text = [];
      for (const key in this.app_data.user.components) {
        let val = this.app_data.user.components[key];
        for (const [key, value] of Object.entries(val.DEHM)) {
          let units = Object.keys(value.convert_factor);
          units.forEach((u) => {
            let temp = `${key}, ${u}`;
            if (!res_text.includes(temp)) {
              res.push({
                c: key,
                unit: u,
                text: temp,
              });
              res_text.push(temp);
            }
          });
        }
      }
      return _.sortBy(res, "text");
    },

    possible_ebas() {
      var res = [];
      var res_text = [];
      this.app_data.ebas.site_list.forEach((x) => {
        x.components.forEach((c) => {
          let temp = `${c[0]}, ${c[1]}, ${c[5]}`;
          if (!res_text.includes(temp)) {
            res.push({
              c: c[0],
              matrix: c[1],
              unit: c[5],
              text: temp,
            });
            res_text.push(temp);
          }
        });
        res = Array.from(new Set(res));
      });
      return _.sortBy(res, "text");
    },
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>

<style lang="scss" scoped>
</style>