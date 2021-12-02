<template>
  <v-container>
    <v-row>
      <v-col class="title">
        <h3 :style="`color:${ui_control.theme_color.content}`">
          DEHM Model Pre-Processing
        </h3>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
          label="Porject Name"
          v-model="project_name"
          :dark="ui_control.theme.brightness <= 50"
        ></v-text-field>
      </v-col>
      <v-col cols="4">
        <v-text-field
          label="Case Name"
          v-model="case_name"
          :dark="ui_control.theme.brightness <= 50"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="8">
        <v-text-field
          label="Model Output directory"
          v-model="model_out_dir"
          :dark="ui_control.theme.brightness <= 50"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-text-field
          v-model="st"
          label="Starting Date (yyyy-mm-dd)"
          prepend-icon="mdi-calendar"
          :dark="ui_control.theme.brightness <= 50"
        ></v-text-field>
      </v-col>

      <v-col cols="4">
        <v-text-field
          v-model="ed"
          label="Ending Date (yyyy-mm-dd)"
          prepend-icon="mdi-calendar"
          :dark="ui_control.theme.brightness <= 50"
        ></v-text-field>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="4">
        <v-combobox
          v-model="file_type"
          :items="file_types"
          label="Output file type"
          outlined
          dense
          :dark="ui_control.theme.brightness <= 50"
        ></v-combobox>
      </v-col>

      <v-col cols="8" align="left">
        <v-btn
          class="mx-3"
          @click="generate_dehm"
          :loading="isLoading"
          :dark="!ui_control.theme.dark"
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
        </span>
      </v-col>
    </v-row>

    <v-row v-if="show_table">
      <span :style="`color:${ui_control.theme_color.content}`" class="overline">
        Generated Data:
      </span>

      <v-data-table
        :headers="table_head"
        :items="data_head"
        :items-per-page="10"
        class="ma-5 mb-10"
        dense
      ></v-data-table>
    </v-row>

    <!-- <v-row>
      <v-divider
        :style="`border-color:${ui_control.theme_color.content}`"
      ></v-divider>
    </v-row> -->

    TODO:
    <ul>
      <li>
        Here need a summary dashboard for current pre-processed DEHM model
        outputs
      </li>
      <li>List the case file numbers, names, project ...</li>
      <li>Add function to allow generate many files at one request.</li>
    </ul>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_settings",
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
  }),
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
    async generate_dehm() {
      this.isLoading = true;
      let headers = this.app_data.headers;
      var bodyFormData = new FormData();
      bodyFormData.append("user_name", this.app_data.user.user_name);
      bodyFormData.append("password", this.app_data.user.password);

      bodyFormData.append("project", this.project_name);
      bodyFormData.append("model_outdir", this.model_out_dir);
      bodyFormData.append("casename", this.case_name);
      bodyFormData.append("file_type", this.file_type);
      bodyFormData.append("st", this.st);
      bodyFormData.append("ed", this.ed);

      let response = await this.$http.post("/dehm/generate", bodyFormData, {
        headers: headers,
        withCredentials: true,
      });
      if (response.data.code == 0) {
        let res_data = JSON.parse(response.data.data);
        this.data_head = res_data.data;
        this.table_head = res_data.schema.fields.map((x) => {
          return { text: x.name, value: x.name };
        });
        this.show_table = true;
      }
      this.isLoading = false;
      this.SET_MESSAGE(response.data);
    },
  },
};
</script>
<style scoped lang="scss">
// .v-divider {
//   border-color: rgba(0, 0, 0, 0.12) !important;
// }
</style>