import {
   mean,
   max,
   min,
   median,
} from "mathjs";


async function gathering(data, component, method) {
   // method: "None", "Mean", "Median", "Max", "Min"
   if (method == "None") {
      return Promise.resolve(data)
   }
   let gathered = []
   for (const c of component) {
      let tss = data.filter(x => x.component == c)
      let temp = await _gathering(tss, method)
      gathered.push({
         x: temp.x,
         y: temp.y,
         // unit: null,
         method: method,
         component: c,
         y_name: c + ", " + method
      })
   }

   return Promise.resolve(gathered)
}

// todo: too slow, check whether there is errors
async function _gathering(tss, method) {
   // tss is an array of tss
   // let st = new Date()

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

   for (const [key, value] of Object.entries(xx).sort()) {
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

   // console.log(new Date() - st)
   // console.log(x)
   return Promise.resolve({ x: x, y: y })
}


export default {
   gathering
}