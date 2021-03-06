import plotly_fig from "./src/plotly_fig"
import map_box from "./src/map_box"

// plot_config = {
//     viz_type: "plotly",
//     id:"",
//     name:"",
//     x_title:"",
//     y_title:"",
//     x_col:"",
//     y_col:"",
//     plot_type:null,
//     trace_data:null,
//     layout:null,

// }

export default class {
    init_config(plot_config){
        this.plot_config = plot_config
        var viz = this.plot_config.viz_type
        var div = this.plot_config.div
        var fig_type = this.plot_config.fig_type
        var layout = this.plot_config.layout
        var config = this.plot_config.config

        switch (viz) {
            case "plotly":
                var plot_type = this.plot_config.plot_type
                this.plot_obj = new plotly_fig(div, fig_type, plot_type)
                this.plot_obj.set_layout(layout)
                this.plot_obj.set_config(config)
                break
            case "mapbox":
                this.plot_obj = new map_box(div, fig_type)
                this.plot_obj.set_layout(layout)
                this.plot_obj.set_config(config)
                break
        }
    }

    set_color_theme(colors){
        this.plot_obj.color_theme=colors
    }

}