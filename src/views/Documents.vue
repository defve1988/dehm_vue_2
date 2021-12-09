<template>
  <v-container class="px-10">
    <span> this is documents, introduction goes here. </span>
    <v-divider></v-divider>
    <div>
      TODO:
      <ul>
        <li>add code comments</li>
      </ul>
      Shortages:
      <ul>
        <li>No socket connection</li>
        <li>Security issues</li>
        <li>process data on backend</li>
      </ul>
    </div>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "Documents",
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  data: () => ({}),
  mounted() {},
  methods: {
    ...mapMutations([]),
  },
};
</script>
