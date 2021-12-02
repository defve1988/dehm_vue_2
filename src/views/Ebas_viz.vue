<template>
  <v-container class="px-10">
    <EBAS />
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas viz",
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
