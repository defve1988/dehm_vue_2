<template>
  <v-container class="px-10">
    <span>
      this is documents, introduction goes here.
    </span>
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
