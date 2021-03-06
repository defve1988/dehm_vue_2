import filtering from "./src/filtering"
import gathering from "./src/gathering"
import averaging from "./src/averaging"
import unit_convert from "./src/unit_convert"
import Trend from "./src/trend"

export default class {
   constructor() {
      this.filtering = filtering.filtering
      this.gathering = gathering.gathering
      this.averaging = averaging.averaging
      this.unit_convert = unit_convert.unit_convert
      this.trend = new Trend()
   }

   async gene_trend(trace, config) {
      let res = []
      trace.forEach(t => {
         // make sure the date string is converted to number
         let x_number = t.x.map(tx => new Date(tx).getTime())
         this.trend.run({ x: x_number, y: t.y }, config)
         res.push({
            x: t.x,
            y: this.trend.y_predict,
            y_upper: this.trend.y_upper,
            y_lower: this.trend.y_lower,
            y_name: t.y_name + ": " + this.trend.func
         })
      });
      return Promise.resolve(res)
   }

}