import Map from "./src/map";

export default class extends Map {
   constructor(settings) {
      var div = settings.div
      var layout = settings.layout
      var config = settings.config
      var fig_type = settings.fig_type

      super(div, layout, config, fig_type)
   }

   set_click_func() {
      this.plot = document.getElementById(this.div)
      this.plot.on('plotly_click', function (data) {
         console.log(data)
      });
   }


}