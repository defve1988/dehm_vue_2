<template>
  <v-container class="pr-10">
    <div class="subtitle-1">DEHM Model Pre-Processing</div>
    <v-divider></v-divider>
    <DEHMCase />

    <v-row class="mt-3">
      <v-col cols="6" class="pb-0">
        <v-subheader class="subtitle-1" dark
          >Cases will be processed</v-subheader
        >
        <v-list subheader height="650">
          <template v-for="(item, i) in app_data.process_cases">
            <v-divider :key="i + 'd'"></v-divider>
            <v-list-item :key="i">
              <v-list-item-content>
                Project Name: {{ item.project }} <br />
                Case Name: {{ item.casename }} <br />
                Output File Type: {{ item.file_type }} <br />
                Date: {{ item.st }} to {{ item.ed }} <br />
                Model Output directory : {{ item.model_outdir }} <br />
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon text @click="del_case(i)">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-col>

      <v-col cols="6" class="pb-0">
        <v-subheader class="subtitle-1" dark>
          Cases have already been processed
        </v-subheader>
        <v-list subheader height="650">
          <template v-for="(item, i) in app_data.dehm.project_list">
            <v-divider :key="i + 'd'"></v-divider>
            <v-list-item :key="i">
              <v-list-item-content>
                Project Name: {{ item.project }} <br />
                Case Name: {{ item.casename }} <br />
                Output File Type: {{ item.file_type }} <br />
                Model Output Directory : {{ item.model_outdir }} <br />

                <v-expansion-panels accordion flat dense>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="ma-0 pa-0"
                      >Processed Periods:
                      {{ item.month.length }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div
                        v-for="(m, m_index) in item.month"
                        :key="'month_' + m_index"
                      >
                        {{ m }}
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>

                <v-expansion-panels accordion flat dense>
                  <v-expansion-panel>
                    <v-expansion-panel-header class="ma-0 pa-0"
                      >Generated Files:
                      {{ item.ncfiles.length }}
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                      <div
                        v-for="(file, file_index) in item.ncfiles"
                        :key="'file_' + file_index"
                      >
                        {{ file }}
                      </div>
                    </v-expansion-panel-content>
                  </v-expansion-panel>
                </v-expansion-panels>
              </v-list-item-content>
              <v-list-item-action>
                <v-btn icon text @click="del_case_files(i)">
                  <v-icon> mdi-close </v-icon>
                </v-btn>
              </v-list-item-action>
            </v-list-item>
          </template>
        </v-list>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "dehm_settings",
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations(["SET_MESSAGE"]),
    del_case(index) {
      this.app_data.process_cases.splice(index, 1);
    },
    del_case_files(index){
      // todo: delete generated case files
      console.log(this.app_data.dehm.project_list[index])
    }
  },
};
</script>
<style scoped lang="scss">
.v-subheader {
  background-color: #555555;
  height: 25px;
}
.v-list {
  overflow: auto;
}
</style>