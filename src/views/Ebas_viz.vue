<template>
  <v-container class="px-10">
    <NavEBAS />
    <span v-if="!islogin"> Please login for EBAS database. </span>

    <div v-else>
      <EBASQuery v-if="ui_control.curr_ebas_view === 'Data Query'" />
      <EBASTable v-if="ui_control.curr_ebas_view === 'Data Table'" />
      <EBASPlot v-if="ui_control.curr_ebas_view === 'Time Series'" />
      <EBASMap v-if="ui_control.curr_ebas_view === 'Site Map'" />
    </div>

    <div>
      TODO:
      <ul>
        <li>Unit conversion</li>
        <li>SLR and Sen's slope confidence interval</li>
        <li>Error bar choice (std or percentiles)</li>
        <li>plot adjustment</li>
      </ul>
      Bugs:
      <ul>
        <li>Deleting middle figure will cause figure order error.</li>
        <li>Axis issues caused with Histogram and scatter.</li>
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
