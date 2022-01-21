import _ from "underscore"

async function filtering(data, site, component) {
   var temp
   var res = []

   if (site=="all"){
      site = _.uniq(data.map(x=>x.site))
   }
   
   if (component=="all"){
      component = _.uniq(data.map(x=>x.component))
   }

   console.log(site,component)

   // search for each possible combinations
   for (const s of site) {
      for (const c of component) {
         temp = data.filter((x) => s == x.site);
         temp = temp.filter((x) => c == x.component);
         if (temp.length > 0) {
            // filtering not null values
            temp = temp.filter(x => x.val != null)
            temp = _.sortBy(temp, 'st');
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