export default class {
   constructor(http) {
      this.$http = http
      this.site_list = null
   }

   async get_site_list(headers) {
      let response = await this.$http.get("/ebas/site_list", {
        headers: headers,
        withCredentials: true,
      });
      if (response.data.code == 0) {
        this.site_list = response.data.data;
      } 

      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
    }

}