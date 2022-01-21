import {
   mean,
   std
} from "mathjs";


async function averaging(data, method) {
   // method: "Hourly", "Daily", "Weakly", "Monthly"
   if (method == "None") {
      return Promise.resolve(data)
   }
   // console.log(data, method)

   let averaged = []
   data.forEach(ts => {
      var xx = {}
      ts.x.forEach((ts_x, index) => {
         let converted_ts_x = _convert_date_string(ts_x, method)
         if (converted_ts_x in xx) {
            xx[converted_ts_x].push(ts.y[index])
         }
         else {
            xx[converted_ts_x] = [ts.y[index]]
         }
      })

      let x = []
      let y = []
      let box_x = []
      let box_y = []
      let error = []
      let err, avg

      for (const [key, value] of Object.entries(xx)) {
         let val = value.filter(v => v != null)
         if (val.length > 0) {
            err = std(val)
            avg = mean(val)
         }
         else {
            val = null
         }
         y.push(avg)
         x.push(key)
         error.push(err)
         box_x = [...box_x, ...Array(val.length).fill(key)]
         box_y = [...box_y, ...val]
      }

      averaged.push({
         x: x,
         y: y,
         error: error,
         box_x: box_x,
         box_y: box_y,
         // unit: null,
         method: method,
         component: ts.component,
         y_name: ts.y_name + ", " + method
      })
   })

   return Promise.resolve(averaged)
}

function _convert_date_string(ts_x, method) {
   // time string: '2020-01-01T06:00:00.000Z'
   // after converting: '2020-01-01T06:00'
   let res
   switch (method) {
      case "Hourly":
         res = ts_x.slice(0, 13) + ":00"
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


export default {
   averaging
}