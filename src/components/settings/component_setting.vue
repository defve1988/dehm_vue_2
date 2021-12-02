<template>
  <v-container>
    <Cgroups />

    <v-row class="mb-5">
      <v-divider
        :style="`border-color:${ui_control.theme_color.content}`"
      ></v-divider>
    </v-row>

    <Ccompoents />

    TODO:
    <ul>
      <li>Function to allow edit components</li>
      <li>Add, del, components</li>
      <li>Show and edit the units, converting factors</li>
      <li>Show and edit the units, converting factors</li>
    </ul>
    Bugs:
    <ul>
      <li>empty group list error</li>
    </ul>
  </v-container>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import Ccompoents from "../chemicals/Ccompoents.vue";
import Cgroups from "../chemicals/Cgroups.vue";

export default {
  components: { Cgroups, Ccompoents },
  name: "ebas_settings",
  data: () => ({
    selectedItem: 1,
    selected_c_group: 1,
    selected_c_group_item: 1,
    selectedDEHM: 1,
    selectedEBAS: 1,
    search: null,
    add_new_component: false,
    new_ebas_var: [],
    new_dehm_var: [],
  }),
  computed: {
    ...mapState({
      app_data: "app_data",
      ui_control: "ui_control",
    }),
  },
  methods: {
    ...mapMutations([]),
  },
};
</script>
<style scoped lang="scss">
.v-list {
  overflow-y: scroll;
}
.v-subheader {
  background-color: #555555;
  height: 25px;
}
</style>