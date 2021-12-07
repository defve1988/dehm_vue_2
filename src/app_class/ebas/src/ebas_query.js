
import EBASFilter from "./ebas_filter"

export default class extends EBASFilter {
   constructor(http) {
      super(http)
      this.data = null
   }

   async query_data(selection, bodyFormData, headers) {
      let query_condition = this.selection2query(selection);
      // console.log(query_condition)
      bodyFormData.append("query_condition", JSON.stringify(query_condition));

      let response = await this.$http.post("/ebas/query", bodyFormData, {
         headers: headers,
         withCredentials: true,
      });

      if (response.data.code == 0) {
         let res_data = JSON.parse(response.data.data);
         this.data = res_data;
      }
      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

   query_example() {
      // let query_condition = {
      //   // id: ["AM0001R", "EE0009R", "ES0010R", "ES0011R","DK0010G"],
      //   component: ["NOx", "nitrate"],
      //   matrix: ["air", "aerosol"],
      //   st: "2020-01-01",
      //   ed: "2020-12-01",
      // };
      this.selection = {
         site: { item: [], val: [], all: false },
         component: {
            item: ["NOx", "nitrate"],
            val: ["NOx", "nitrate"],
            all: true,
         },
         matrix: {
            item: ["air", "aerosol"],
            val: ["air", "aerosol"],
            all: true,
         },
         country: { item: [], val: [], all: false },
         land_use: { item: [], val: [], all: false },
         station_setting: { item: [], val: [], all: false },
         year: { item: ["2020"], val: ["2020"], all: true },
         resolution: { item: [], val: [], all: false },
      };
      this.filter_ebas(this.selection);
   }

}