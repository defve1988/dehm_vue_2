import DEHMCase from "./src/dehm_case"
import _ from "underscore";


export default class extends DEHMCase {
   constructor(http) {
      super(http)
   }

   async convert2trace(data, unit_rep) {

      var component = Object.keys(data[0]).filter(x=>!x.endsWith("_std") && x!="station" && x!="date")
      var site = Array.from(new Set(data.map(x=>x.station)))

      console.log(component, site)

      var ts =[]
      for (const s of site) {
         for (const c of component) {
            let temp = data.filter((x) => s == x.station);
            if (temp.length > 0) {
               // filtering not null values
               temp = temp.filter(x => x[c] != null)
               temp = _.sortBy(temp, 'date');
               ts.push({
                  x: temp.map((x) => x.date),
                  y: temp.map((x) => x[c]),
                  error: temp.map((x) => x[c+"_std"]),
                  box_x: [],
                  box_y: [],
                  unit: unit_rep[c.split("_")[1]],
                  site: s,
                  component: c.split("_")[0],
                  y_name: `${s}, ${c.split("_")[0]} (${unit_rep[c.split("_")[1]]})` 
               })
            }
         }
      }

      console.log("ts", ts)
      return Promise.resolve(ts)
   }
}