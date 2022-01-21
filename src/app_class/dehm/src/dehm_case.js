// import _ from "underscore";

export default class {
  constructor(http) {
    this.$http = http
    this.project_list = null

  }

  async get_project_list(headers) {
    let response = await this.$http.get("/dehm/project_list", {
      headers: headers,
      withCredentials: true,
    });
    if (response.data.code == 0) {
      this.project_list = response.data.data;
    }

    return Promise.resolve({ code: response.data.code, msg: response.data.msg })
  }

  async generate_cases(process_cases, bodyFormData, headers) {
    bodyFormData.append(
      "projects",
      JSON.stringify(process_cases)
    );

    let response = await this.$http.post("/dehm/generate", bodyFormData, {
      headers: headers,
      withCredentials: true,
    });

    let res_data = null
    if (response.data.code == 0) {
      res_data = JSON.parse(response.data.data);
    }
    return Promise.resolve({ code: response.data.code, msg: response.data.msg, data: res_data })
  }

  async query_components(case_list, var_list, unit_list, gathering, averaging, bodyFormData, headers) {
    bodyFormData.append(
      "project_case",
      case_list
    );
    bodyFormData.append(
      "var_list",
      var_list
    );
    bodyFormData.append(
      "unit_list",
      unit_list
    );
    bodyFormData.append(
      "gathering",
      gathering
    );
    bodyFormData.append(
      "averaging",
      averaging
    );

    let response = await this.$http.post("/dehm/query_components", bodyFormData, {
      headers: headers,
      withCredentials: true,
    });

    let res_data = null
    if (response.data.code == 0) {
      res_data = JSON.parse(response.data.data);
    }
    return Promise.resolve({ code: response.data.code, msg: response.data.msg, data: res_data })
  }

}