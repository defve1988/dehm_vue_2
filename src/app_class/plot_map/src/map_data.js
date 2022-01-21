import {
   mean,
   // max,
   // min
} from "mathjs";


const color = "rgba(0, 150, 100,0.8)"
// const max_size = 150
const min_size = 5
const avg_size = 20


export default class {
   gene_map_scatter_trace(content) {
      // note: currently only plot one component
      let site = content.site
      let data = content.data
      let c = content.component


      data = data.filter(d => d.component == c)
      data = data.filter(d => d.val != null)
      // let ma = max(data.map(d => d.val))
      // let mi = min(data.map(d => d.val))

      let avg =  mean(data.map(d => d.val))

      let res = []

      site.forEach(s => {
         let temp = data.filter(d => d.site == s.id)
         if (temp.length > 0) {
            let val = mean(temp.map(d => d.val))
            let land_use = s.land_use == null ? "Unknown Land usage" : s.land_use
            let station_setting = s.station_setting == null ? "Unknown Station Setting" : s.station_setting
            res.push({
               lat: s.lat,
               lon: s.lon,
               id: s.id,
               name: c,
               val: val,
               text: `${s.id}: ${val.toFixed(2)} (${temp[0].unit}) <br> ${s.name}: ${land_use}, ${station_setting}`,
               color: color,
               // size: (val - mi) / (ma - mi) * max_size + min_size,
               size: val/avg*avg_size + min_size
            })
         }
      });

      return res

   }
}