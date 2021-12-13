<template>
  <v-footer app color="grey darken-4" id="footer">
    <span class="mx-1 subtitle-2 text-right grey--text">
      Chuanlong Zhou<span class="copyleft">&copy;</span> 2021
    </span>
  </v-footer>
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
.copyleft {
  display: inline-block;
  transform: rotate(180deg);
}
</style>