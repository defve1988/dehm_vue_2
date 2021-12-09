async function filtering(data, site, component) {
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
   return Promise.resolve(res)
}

export default {
   filtering
}