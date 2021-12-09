import Plotly from "plotly.js-dist"
import DefaultValue from "./src/default_value"

export default class extends DefaultValue {
   constructor(div) {
      super()
      this.div = div
   }

   set_layout(layout) {
      Object.assign(this.layout, layout)
   }

   set_config(config) {
      Object.assign(this.config, config)
   }

   set_fig_size(fig_size = "large") {
      this.config.staticPlot = this.fig_size_type[fig_size].staticPlot
      this.config.editable = this.fig_size_type[fig_size].editable
      this.layout.showlegend = this.fig_size_type[fig_size].showlegend
      this.layout.xaxis.showticklabels = this.fig_size_type[fig_size].showticklabels
      this.layout.yaxis.showticklabels = this.fig_size_type[fig_size].showticklabels
      this.layout.xaxis.zeroline = this.fig_size_type[fig_size].zeroline
      this.layout.height = this.fig_size_type[fig_size].height
      this.layout.width = this.fig_size_type[fig_size].width
      this.layout.margin = this.fig_size_type[fig_size].margin
   }

   update_layout() {
      // must be plot first
      Plotly.relayout(this.div, this.layout);
   }

   clear_image() {
      Plotly.purge(this.div)
   }

   save_image(file_name, height = null, width = null) {
      if (height == null) {
         height = this.layout.height
         width = this.layout.height
      }
      Plotly.toImage(
         this.div, {
         format: 'png',
         height: height,
         width: width,
      }).then(
         function (url) {
            var pom = document.createElement("a");
            pom.href = url;
            pom.setAttribute("download", file_name + ".png");
            pom.click();
         });
   }

}