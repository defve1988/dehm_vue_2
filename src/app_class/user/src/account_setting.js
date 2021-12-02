
import UserAuth from "./user_auth"

export default class extends UserAuth {
   constructor(http) {
      super(http)
   }

   async upload_image(image_file, headers) {
      var bodyFormData = this.create_form()
      bodyFormData.append("image", image_file);

      let response = await this.$http.post("/user/userimage", bodyFormData, {
         headers: headers,
         withCredentials: true,
      });

      if (response.data.code == 0) {
         this.init_user(response.data.data)
      }

      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

   async update_field(field, headers) {
      var bodyFormData = this.create_form()
      bodyFormData.append("field", field);
      bodyFormData.append(
        "field_data",
        JSON.stringify(this[field])
      );

      let response = await this.$http.post("/user/upadte", bodyFormData, {
         headers: headers,
         withCredentials: true,
      });

      if (response.data.code == 0) {
         this.init_user(response.data.data)
      }

      return Promise.resolve({ code: response.data.code, msg: response.data.msg })
   }

}