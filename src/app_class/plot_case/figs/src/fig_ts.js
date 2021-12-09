function gene_scatter(data, color_theme){
   var trace = []
   data.forEach((d,index) => {
       trace.push({
           x: d.x,
           y: d.y,
           type: 'scatter',
           mode: 'markers',

           text:d.text,
           name: d.y_name,
           marker: {
               size: 6,
               color: color_theme[index]
           },
       })
   })
   return trace
}

export default {
   gene_scatter
}