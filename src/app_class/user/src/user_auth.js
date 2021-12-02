export default class {
   constructor(http) {
      this._user = {}
      this.$http = http
      this.isLogin = false
   }

   init_user(user){
      for (const [key, value] of Object.entries(user)) {
         this[key] = value;
      }
      this._user = user
      this.isLogin = true
   }

   create_form(user=null) {
      var user_name, password
      if (user==null){
         user_name=this.user_name
         password=this.password
      }
      else{
         user_name=user.user_name
         password=user.password     
      }
      var bodyFormData = new FormData();
      bodyFormData.append("user_name", user_name);
      bodyFormData.append("password", password);
      return bodyFormData
   }

   async login(user, headers) {
      var bodyFormData = this.create_form(user)
      let response = await this.$http.post("/user/login", bodyFormData, {
         headers: headers,
         withCredentials: true,
      });

      if (response.data.code == 0) {
         this.init_user(response.data.data)
      }
      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

   async register(user, headers) {
      var bodyFormData = this.create_form(user)
      let response = await this.$http.post("/user/register", bodyFormData, {
        headers: headers,
        withCredentials: true,
      });

      if (response.data.code == 0) {
         this.init_user(response.data.data)
      }

      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

   async del_user(headers) {
      var bodyFormData = this.create_form()
      let response = await this.$http.post("/user/delete", bodyFormData, {
        headers: headers,
        withCredentials: true,
      });

      if (response.data.code == 0) {
         this.logout()
      }

      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

   logout() {
      for (const key of Object.keys(this._user)) {
         this[key] = null
         delete this[key]
      }
      this._user = {}
      this.isLogin = false
   }
}