<template>
  <v-container>
    <v-row>
      <v-col cols="2">
        <v-menu
          offset-y
          transition="scroll-x-transition"
          :close-on-content-click="false"
          v-model="menu"
        >
          <template v-slot:activator="{ on: meun }">
            <v-btn v-on="{ ...meun }" :dark="!ui_control.theme.dark">
              Add New Case
            </v-btn>
          </template>
          <v-card class="pa-5">
            <v-row>
              <v-col cols="6">
                <v-text-field
                  label="Porject Name"
                  v-model="project_name"
                  :dark="ui_control.theme.brightness <= 50"
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Case Name"
                  v-model="case_name"
                  :dark="ui_control.theme.brightness <= 50"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Model Output directory"
                  v-model="model_out_dir"
                  :dark="ui_control.theme.brightness <= 50"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  v-model="st"
                  label="Starting Date (yyyy-mm-dd)"
                  prepend-icon="mdi-calendar"
                  :dark="ui_control.theme.brightness <= 50"
                ></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-text-field
                  v-model="ed"
                  label="Ending Date (yyyy-mm-dd)"
                  prepend-icon="mdi-calendar"
                  :dark="ui_control.theme.brightness <= 50"
                ></v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-combobox
                  v-model="file_type"
                  :items="file_types"
                  label="Output file type"
                  outlined
                  dense
                  :dark="ui_control.theme.brightness <= 50"
                ></v-combobox>
              </v-col>
              <v-col cols="3">
                <v-btn
                  class="mx-3"
                  @click="add_case"
                  :loading="isLoading"
                  :dark="!ui_control.theme.dark"
                >
                  Add Case
                </v-btn>
              </v-col>
              <v-col cols="3">
                <v-btn
                  class="mx-3"
                  @click="menu = false"
                  :loading="isLoading"
                  :dark="!ui_control.theme.dark"
                >
                  Close
                </v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-menu>
      </v-col>

      <v-col cols="6" class="pb-0">
        <v-btn
          @click="generate_dehm"
          :loading="isLoading"
          :dark="!ui_control.theme.dark"
          color="warning"
        >
          Generate
        </v-btn>
        <span
          v-if="isLoading"
          class="caption"
          :style="`color:${ui_control.theme_color.content}`"
        >
          <v-icon :dark="ui_control.theme.dark" class="ma-2">
            mdi-coffee
          </v-icon>
          Take a break. This will take ~5 minutes per month if no files were
          generated.

          <v-btn icon x-small @click="isLoading = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </span>
      </v-col>
    </v-row>

    <v-row v-if="show_table">
      <v-subheader
        :style="`color:${ui_control.theme_color.content}`"
        class="overline"
      >
        Generated Data
        <v-btn  x-small icon @click="show_table=false">
          <v-icon>
            mdi-close
          </v-icon>
        </v-btn>
      </v-subheader>

      <v-data-table
        title="d"
        :headers="table_head"
        :items="data_head"
        :items-per-page="10"
        class="ma-5 mb-10"
        dense
      >
      </v-data-table>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_query",
  data: () => ({
    project_name: "novana",
    case_name: "novana2021",
    model_out_dir: "/nfsdata2/jc/novana_out/novana2021",
    file_type: "monthly",
    file_types: ["monthly", "dayily"],
    st: "2018-5-1",
    ed: "2018-5-30",
    isLoading: false,
    show_table: false,
    table_head: [],
    data_head: [],
    menu: false,
  }),
  watch: {},
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),

    islogin() {
      return "user_name" in this.app_data.user;
    },
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    add_case() {
      this.app_data.process_cases.push({
        project: this.project_name,
        casename: this.case_name,
        model_outdir: this.model_out_dir,
        file_type: this.file_type,
        st: this.st,
        ed: this.ed,
      });
    },
    async generate_dehm() {
      this.isLoading = true;

      let response = await this.app_data.dehm.generate_cases(
        this.app_data.process_cases,
        this.app_data.user.create_form(),
        this.app_data.headers
      );

      if (response.code == 0) {
        console.log(response.data);
        let res_data = response.data;
        this.data_head = res_data.data;
        this.table_head = res_data.schema.fields.map((x) => {
          return { text: x.name, value: x.name };
        });
        this.show_table = true;
      } else {
        this.SET_MESSAGE(response);
      }

      this.SET_MESSAGE(response);
      response = await this.app_data.dehm.get_project_list(
        this.app_data.headers
      );
      if (response.code != 0) {
        this.SET_MESSAGE(response);
      }

      this.isLoading = false;
    },
  },
};
</script>
<style scoped lang="scss">
// ::-webkit-scrollbar {
//   width: 5px;
// }
</style>