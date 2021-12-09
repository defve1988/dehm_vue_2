import {
   mean,
   max,
   min,
   median,
} from "mathjs";


export default class {
   constructor() {
      this.ts = null
      this.ts_gathered = null
      this.ts_averaged = null

   }
   // 1. generate array of time series combinations stored as ts
   // 2. convert unit
   // 3. gather ts to mean, max, ..., and stored as ts_gathered
   // 4. averaging ts to hourly, monthly, ... based on method, mean, max...
   // time string: '2020-01-01T06:00:00.000Z'


   async gene_ts(data, site, component) {
      this.component = component
      var temp
      var res = []

      // search for each possible combinations
      for (const s of site) {
         for (const c of component) {
            temp = data.filter((x) => s == x.site);
            temp = temp.filter((x) => c == x.component);
            if (temp.length > 0) {
               res.push({
                  x: temp.map((x) => x.st),
                  y: temp.map((x) => x.val),
                  unit: temp.map((x) => x.unit),
                  site: s,
                  component: c,
                  y_name: s + ", " + c
               })
            }
         }
      }
      this.ts = res
      return Promise.resolve(res)
   }

   async convert_unit() {
      // todo: convert the same component to the same unit
   }

   async gather_ts(method) {
      // method: "None", "Mean", "Median", "Max", "Min"
      if (method == "None") {
         this.ts_gathered = this.ts
      }
      else {
         this.ts_gathered = []
         for (const c of this.component) {
            let tss = this.ts.filter(x => x.component == c)
            let temp = await this._gathering(tss, method)
            this.ts_gathered.push({
               x: temp.x,
               y: temp.y,
               // unit: null,
               method: method,
               component: c,
               y_name: c + ", " + method
            })
         }
      }
      console.log(1, this.ts_gathered)

      return Promise.resolve(this.ts_gathered)
   }

   async averaging_ts(method) {
      // method: "Hourly", "Daily", "Weakly", "Monthly"

      console.log(this.ts_gathered, method)
      this.ts_averaged = []
      this.ts_gathered.forEach(ts => {
         var xx = {}
         ts.x.forEach((ts_x, index) => {
            let converted_ts_x = this._convert_date_string(ts_x, method)
            if (converted_ts_x in xx) {
               xx[converted_ts_x].push(ts.y[index])
            }
            else {
               xx[converted_ts_x] = [ts.y[index]]
            }
         })

         let x = []
         let y = []

         for (const [key, value] of Object.entries(xx)) {
            let val = value.filter(v => v != null)
            if (val.length > 0) {
               val = mean(val)
            }
            else {
               val = null
            }
            y.push(val)
            x.push(key)
         }

         this.ts_averaged.push({
            x: x,
            y: y,
            // unit: null,
            method: method,
            component: ts.component,
            y_name: ts.component + ", " + method
         })
      })

      return Promise.resolve(this.ts_averaged)

   }

   _convert_date_string(ts_x, method) {
      // time string: '2020-01-01T06:00:00.000Z'
      let res
      switch (method) {
         case "Hourly":
            res = ts_x.slice(0, 13)
            break;
         case "Daily":
            res = ts_x.slice(0, 10)
            break;
         case "Monthly":
            res = ts_x.slice(0, 7)
            break;
      }
      return res
   }


   // todo: too slow, check whether there is errors
   async _gathering(tss, method) {
      // tss is an array of tss

      let st = new Date()

      let xx = {}
      tss.forEach(ts => {
         ts.x.forEach((ts_x, index) => {
            if (ts_x in xx) {
               xx[ts_x].push(ts.y[index])
            }
            else {
               xx[ts_x] = [ts.y[index]]
            }
         })
      })

      let x = []
      let y = []

      for (const [key, value] of Object.entries(xx)) {
         let val = value.filter(v => v != null)
         if (val.length > 0) {
            switch (method) {
               case "Mean":
                  val = mean(val)
                  break;
               case "Median":
                  val = median(val)
                  break;
               case "Max":
                  val = max(val)
                  break;
               case "Min":
                  val = min(val)
                  break;
            }
         }
         else {
            val = null
         }

         y.push(val)
         x.push(key)
      }

      console.log(new Date() - st)
      console.log(y)
      return Promise.resolve({ x: x, y: y })
   }

}