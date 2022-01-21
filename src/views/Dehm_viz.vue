<template>
  <v-container class="px-10">
    <NavDEHM />
    <span v-if="!islogin"> Please login for DEHM database. </span>

    <div v-else>
      <DEHMSetting v-if="ui_control.curr_dehm_view==='DEHM Preprocess'"/>
      <DEHMPlot v-if="ui_control.curr_dehm_view==='Time Series'"/>
      <DEHMMap v-if="ui_control.curr_dehm_view==='DEHM Heatmap'"/>
    </div>

    <div>
      TODO:
      <ul>
        <li>...</li>
      </ul>
      Bugs:
      <ul>
        <li>...</li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_viz",
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    islogin() {
      return this.app_data.user.isLogin;
    },
  },
  data: () => ({}),
  mounted() {},
  methods: {
    ...mapMutations([]),
  },
};
</script>
