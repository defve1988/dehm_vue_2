async function unit_convert(data, target_unit) {
   // method: "Hourly", "Daily", "Weakly", "Monthly"
   if (target_unit == null) {
      return Promise.resolve(data)
   }

   return Promise.resolve(data)
}

export default {
   unit_convert
}