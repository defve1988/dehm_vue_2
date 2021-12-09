export default class {
   constructor() {
      // default plotly settings
      this.config = {
         displaylogo: false,
         responsive: true,
         displayModeBar: false,
         staticPlot: false,
         editable: false,
         mapboxAccessToken: "pk.eyJ1IjoiZGVmdmUxOTg4IiwiYSI6ImNrNzNzZmN3dzBmMnMzZ3FvMzJ0MDRpa2QifQ.xLG4lim5AonGbkDtgP9-5A",
      }

      this.fig_size_type = {
         small: {
            editable: false,
            staticPlot: true,
            showlegend: false,
            showticklabels: false,
            zeroline: false,
            height: 180,
            width: 300,
            margin: {
               r: 20,
               t: 25,
               b: 25,
               l: 20
            }
         },
         medium: {
            editable: false,
            staticPlot: true,
            showlegend: false,
            showticklabels: false,
            zeroline: false,
            height: 400,
            width: 500,
            margin: {
               r: 20,
               t: 50,
               b: 25,
               l: 20
            }
         },
         large: {
            editable: true,
            staticPlot: false,
            showlegend: false,
            showticklabels: false,
            zeroline: false,
            height: 600,
            width: 800,
            margin: {
               r: 50,
               t: 50,
               b: 50,
               l: 50
            }
         },
      }

      this.color_theme = [
         '#1E88E5',
         '#28965A',
         '#E53E20',
         '#7CB342',
         '#d95282',
         '#FBC02D',
         '#00B8DC',
         '#232322',
         '#AAAAAA',
      ]

      this.color_theme = this.color_theme.map(x => this.hex2rgba(x, 0.8))

      this.layout = {
         // figure size related
         width: 800,
         height: 600,
         autosize: true,
         margin: {
            r: 0,
            t: 0,
            b: 0,
            l: 0
         },
         // title
         title: "",
         // axis
         xaxis: {
            title: "",
            titlefont: {
               size: 10,
               family: '',
               color: 'black'
            },
            showticklabels: true,
            showline: true,
            showgrid: true,
            zeroline: true,
            autotick: true,
         },
         yaxis: {
            title: "",
            titlefont: {
               size: 10,
               family: '',
               color: 'black'
            },
            showticklabels: true,
            showline: true,
            showgrid: true,
            zeroline: true,
            autotick: true,
         },
         // font
         font: {
            size: 14,
            family: '',
            color: 'black'
         },
         // legend
         showlegend: false,
         legend: {
            font: {
               size: 10,
               family: '',
               color: 'black'
            },
            xanchor: "auto",
            yanchor: "auto",
            x: 1,
            y: 0
         },
         // color bar
         coloraxis: {
            colorscale: "Viridis",
            colorbar: {
               xanchor: "right",
               yanchor: "top",
               x: 1,
               y: 1,
               len: 0.3
            },
         },
         // others
         dragmode: "zoom",
         bargap: 0.05,
         bargroupgap: 0.2,
         barmode: "overlay",

         // map box style
         mapbox: {
            style: "light",
            center: {
               lat: 0,
               lon: 0
            },
            zoom: 2,
         },
      }
   }

   hex2rgba(hex, alpha) {
      // convert hex color to rgba
      hex = hex.substring(1,)
      if (hex.length === 3) {
         hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return `rgba(${r},${g},${b},${alpha})`;
   }

   hexa2rgba(hexa) {
      // convert hexa color to rgba
      let hex = hexa.substring(1, 7)
      let alpha = parseInt(hexa.slice(-2), 16) / 255

      if (hex.length < 6) {
         hex = `${hex[0]}${hex[0]}${hex[1]}${hex[1]}${hex[2]}${hex[2]}`;
      }

      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      return `rgba(${r},${g},${b},${alpha})`;
   }

}