import Plotly from "plotly.js-dist"

import TSPlot from "./src/fig_ts"

export default class extends TSPlot {
   constructor(div, layout, config, fig_type, fig_size) {
      super(div, fig_type)
      this.fig_type = fig_type
      
      this.set_fig_size(fig_size)
      this.set_layout(layout)
      this.set_config(config)
      this.set_fig_type(fig_type)

      this.trace_layout = this.gene_trace([])
      // this.plot_new()
      // console.log(this.gene_trace)
   }


   restyle(update) {
      Plotly.restyle(this.div, update);
   }

   plot_new(animated = false, animate_x = false) {
      this.clear_image()
      let trace = this.trace_layout.trace
      let layout = this.trace_layout.layout
      this.set_layout(layout)
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
         // console.log(this.layout)
         Plotly.newPlot(this.div, trace, this.layout, this.config);
      }
   }

   add_trace(trace) {
      Plotly.addTraces(this.div, trace);
   }

}