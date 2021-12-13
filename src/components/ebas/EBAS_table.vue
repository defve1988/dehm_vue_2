<template>
  <v-container class="pr-10">
    <div class="subtitle-1"> EBAS Data Table </div>
    <v-divider></v-divider>
    <v-data-table
      :headers="ebas_data.head"
      :items="ebas_data.data"
      :items-per-page="15"
      class="mt-3"
      dense
    ></v-data-table>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";

export default {
  name: "ebas_map",
  data: () => ({
    isLoading: false,
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
    ebas_data() {
      if (this.app_data.ebas.data == null) {
        return { data: [], head: [] };
      } else {
        return {
          data: this.app_data.ebas.data.data,
          head: this.app_data.ebas.data.schema.fields.map((x) => {
            return { text: x.name, value: x.name };
          }),
        };
      }
    },
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>
<style scoped lang="scss">
</style>