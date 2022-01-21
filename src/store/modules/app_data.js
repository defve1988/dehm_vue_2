// import User from "@/app_class/user";


const state = {
   headers: {
      "key": "d1e9f8v8e",
   },
   db_version: "v0.1",
   user: null,
   ebas: null,
   dehm: null,

   // first figure rendering issue
   ebas_plot_case: [],
   dehm_plot_case: [],
   eval_plot_case: [],
   ebas_plot_map: null,
   dehm_plot_map: null,
   eval_plot_map: null,

   process_cases: [],

   rep: {
      "ug/m3": "ugm-3",
      "ug N/m3": "ugNm-3",
      "ug S/m3": "ugSm-3",
      "ug C/m3": "ugCm-3",
      "ng/m3": "ngm-3",
      "ppbv": "ppbv",
      "pptv": "pptv",
      "ugm-3": "ug/m3",
      "ugNm-3": "ug N/m3",
      "ugSm-3": "ug S/m3",
      "ugCm-3": "ug C/m3",
      "ngm-3": "ng/m3",
   }
};

const getters = {

};

const actions = {

};

const mutations = {

};

export default {
   state,
   getters,
   actions,
   mutations
};