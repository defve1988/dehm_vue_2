import Figure from "./figs"
import Data from "./process_data"

export default class extends Figure {
   constructor(settings) {
      var div = settings.div
      var layout = settings.layout
      var config = settings.config
      var fig_type = settings.fig_type
      var fig_size = settings.fig_size

      super(div, layout, config, fig_type, fig_size)
      this.data = new Data()
   }

   async plot_figure(data, site, component, gathering, target_unit, averaging) {
      let trace = await this.data.filtering(data, site, component)
      trace = await this.data.unit_convert(trace, target_unit)
      trace = await this.data.gathering(trace, component, gathering)
      trace = await this.data.averaging(trace, averaging)

      this.trace = await this.gene_trace(trace, this.color_theme)
      await this.plot_new()

      return Promise.resolve(1)
   }

   set_color_theme(colors) {
      console.log(colors)
      this.color_theme = colors.map(x => this.hexa2rgba(x))
   }
}