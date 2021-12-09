import Plotly from "plotly.js-dist"

import canvas from "@/app_class/plot_case/canvas"
import fig_ts from "./src/fig_ts"



export default class extends canvas {
   constructor(div, layout, config, fig_type, fig_size) {
      super(div)
      this.fig_type = fig_type

      this.all_figs = {
         ts_scatter: fig_ts.gene_scatter
         // ts_line:
         // ts_bar:
         // ts_error_bar:
         // ts_box:
         // scatter:
         // hist:
         // map_scatter:
      }


      this.set_fig_size(fig_size)

      this.set_layout(layout)
      this.set_config(config)

      this.gene_trace = this.all_figs[fig_type]
      this.trace = this.gene_trace([])
      this.plot_new()
   }
   
   restyle(update){
      Plotly.restyle(this.div, update);
   }

   plot_new(animated = false, animate_x = false) {
      let trace = this.trace
      if (animated) {
         var start_trace = []
         trace.forEach(t => {
            var temp = {}
            for (const [key, value] of Object.entries(t)) {
               temp[key] = value
            }
            if (animate_x) {
               temp.x = temp.x.map(x => x == null ? null : 0)
            }
            temp.y = temp.y.map(x => x == null ? null : 0)
            start_trace.push(temp)
         })
         Plotly.newPlot(this.div, start_trace, this.layout, this.config);
         Plotly.animate(this.div, {
            data: trace,
            traces: Array.from(Array(trace.length).keys()),
         }, {
            transition: {
               duration: 1000,
               easing: 'cubic-in-out'
            },
         })
      } else {
         Plotly.newPlot(this.div, this.trace, this.layout, this.config);
      }
   }

   add_trace() {
      Plotly.addTraces(this.div, this.trace);
   }

   set_trace(trace) {
      this.trace = this.trace.concat(trace)
   }

}