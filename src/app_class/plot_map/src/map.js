import Canvas from "@/app_class/plot_case/canvas";
import Plotly from "plotly.js-dist"
import MapData from "./map_data"

import {
   mean
} from "mathjs";

const default_marker = {
   color: "rgba(0, 150, 100,0.5)",
   size: 12,
}

export default class extends Canvas {
   constructor(div, layout, config) {
      super(div)
      this.set_layout(layout)
      this.set_config(config)
      this.data = new MapData()
   }

   restyle(update) {
      Plotly.restyle(this.div, update);
   }

   async plot_dots(data = null, marker = null, show_text = null) {
      // gen one group of dots 
      if (marker == null) {
         marker = default_marker
      }
      // if only need an empty map
      if (data == null) {
         data = {
            text: [],
            lat: [],
            lon: [],
         }
      }

      var trace = [{
         type: "scattermapbox",
         text: data.text,
         lon: data.lon,
         lat: data.lat,
         hovertemplate: '%{text}<br>' +
            '%{lat:.2f}, %{lon:.2f}' +
            '<extra></extra>',
         hoverlabel: {
            bgcolor: "rgba(70,70,70,1)"
         },
         marker: marker
      }];

      if (show_text != null) {
         trace = trace.map(x => {
            x.mode = 'markers+text',
               x.textposition = show_text;
            return x
         })
      }

      if (data.lon.length > 0) {
         this.layout.mapbox.zoom = 4
         this.layout.mapbox.center = {
            lat: mean(data.lat),
            lon: mean(data.lon)
         }
      }
      Plotly.newPlot(this.div, trace, this.layout, this.config);
      this.trace = trace
   }

   async plot_map_scatter(data) {
      var trace = [];

      trace = [{
         type: "scattermapbox",
         name: data[0].name,
         text: data.map((x) => x.text),
         val: data.map((x) => x.val),
         id: data.map((x) => x.id),
         lon: data.map((x) => x.lon),
         lat: data.map((x) => x.lat),
         hovertemplate: '%{text}<br>' +
            'Location: (%{lat:.2f}, %{lon:.2f})' +
            '<extra></extra>',
         hoverlabel: {
            bgcolor: "rgba(70,70,70,1)"
         },
         marker: {
            color: data.map((x) => x.color),
            size: data.map((x) => x.size),
         },
         showlegend: true,
      },];

      this.layout.mapbox.zoom = 4
      this.layout.mapbox.center = {
         lat: mean(data.map((x) => x.lat)),
         lon: mean(data.map((x) => x.lon))
      }

      Plotly.newPlot(this.div, trace, this.layout, this.config);
      this.trace = trace
   }

   async plot_heat_map(data, radius = 15, opacity = 0.8) {
      data = [{
         type: "densitymapbox",
         lon: data.lon,
         lat: data.lat,
         z: data.z,
         coloraxis: 'coloraxis',
         radius: radius,
         opacity: opacity
      },];
      return this.add_trace(data)
   }


}