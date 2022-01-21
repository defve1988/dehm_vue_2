import Figure from "./figs"
import TS from "@/app_class/ts";

export default class extends Figure {
   constructor(settings) {
      var div = settings.div
      var layout = settings.layout
      var config = settings.config
      var fig_type = settings.fig_type
      var fig_size = settings.fig_size

      super(div, layout, config, fig_type, fig_size)
      this.data = new TS()
   }

   async plot_figure(data, site, component, gathering, target_unit, averaging) {
      let trace = await this.data.filtering(data, site, component)
      trace = await this.data.unit_convert(trace, target_unit)
      trace = await this.data.gathering(trace, component, gathering)
      this.trace_data = await this.data.averaging(trace, averaging)

      this.trace_layout = await this.gene_trace(this.trace_data, this.color_theme)
      await this.plot_new()

      return Promise.resolve(1)
   }

   async plot_figure_simple(trace_data) {
      this.trace_data = trace_data
      this.trace_layout = await this.gene_trace(this.trace_data, this.color_theme)
      await this.plot_new()

      return Promise.resolve(1)
   }

   async plot_trend(trend_type, options) {
      if (options == null){
         options = { span: 0.5, band: 0.8, degree: 1 }
      }

      this.trend_data = await this.data.gene_trend(this.trace_data, { method: trend_type, options: options })
      this.trend_trace = await this.gene_trend_trace(this.trend_data, this.color_theme)
      // console.log(this.trend_trace)
      this.add_trace(this.trend_trace.trace)
   }

   set_color_theme(colors) {
      this.color_theme = colors.map(x => this.hexa2rgba(x))
   }
}