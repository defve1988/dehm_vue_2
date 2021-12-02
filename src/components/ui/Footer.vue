<template>
  <v-hover v-slot:default="{ hover }">
    <v-footer app color="grey darken-4" id="footer">
      <v-icon
        size="18 mb-2"
        :color="hover ? 'warning' : 'teal accent-1'"
        :class="hover ? '' : 'fa-bar-chart'"
        >mdi-fish</v-icon
      >
      <span class="mx-1 subtitle-2 text-right teal--text">
       &copy; 2020  Chuanlong Zhou.
      </span>
    </v-footer>
  </v-hover>
</template>

<script>
export default {
  name: "Footer",
};
</script>

<style scoped>
span {
  display: inline-block;
  vertical-align: middle;
}
</style>

<style scoped>
/* NOTE: span does not support margin or padding top, only vertical-align can be used*/
span {
  display: inline-block;
  vertical-align: buttom;
}
#footer {
  z-index: 9;
}
/* turn the fish side */
.fa-bar-chart {
  transform: rotate(360deg) scaleX(-1);
}
</style>