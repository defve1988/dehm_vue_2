const theme_default = {
   dark: false,
   brightness: 90,
   app_bg: 15 / 2.55,
   nav_bar_bg: 25 / 2.55,
   content_color: 180 / 2.55,
   card_bg: 45 / 2.55,

   text_font_size: null,
   text_font_wight: null,
   text_font: null,
}

const state = {
   theme: theme_default,
   theme_color: {},

   isloading: false,
   register_dialog: false,
   new_component_dialog: true,

   new_component_dialog_content:{
      key_name:"",
      long_name:"",
      target_unit:[],
      DEHM:[],
      EBAS:[]
   },

   user_color_list:[],

   snackbar: {
      show: true,
      text: 'This is DEHM model evaluation application.',
      color: 'info'
   },
   curr_setting_view: "User",
   home_view: [
      { text: "Documents", icon: "mdi-file-document-outline",router:"documents" },
      { text: "EBAS Visualization", icon: "mdi-chart-timeline-variant",router:"ebas_viz" },
      { text: "DEHM Visualization", icon: "mdi-earth",router:"dehm_viz" },
      { text: "DEHM Evaluations", icon: "mdi-chart-multiple",router:"dehm_eval" },
      { text: "App Settings", icon: "mdi-cog",router:"settings" },
   ],

   setting_view: [
      { text: "User", icon: "mdi-account-outline" },
      { text: "Components", icon: "mdi-poll" },
      { text: "EBAS Database", icon: "mdi-database-arrow-down-outline" },
      { text: "DEHM Preprocess", icon: "mdi-database-clock-outline" },
      { text: "APP Theme", icon: "mdi-brightness-6" },
   ],

   plot_default: {
      div: "",
      title: "",
      viz_type: "plotly",
      fig_type: "medium",
      layout: {
         title: "",
         showlegend: true,
         legend: {
            font: {
               size: 10,
               family: "",
               color: "black",
            },
            xanchor: "auto",
            yanchor: "auto",
            x: 1,
            y: 1,
         },
         width: null,
         height: null,
         autosize: true,
         margin: { r: 25, t: 25, b: 25, l: 50 },
      },
      config: {
         displaylogo: false,
         responsive: true,
         displayModeBar: true,
      },
   },
};

const getters = {

};

const actions = {

};

const mutations = {
   async SET_THEME(stat) {
      let brightness = stat.theme.brightness;
      let app_bg_color = stat.theme.app_bg * 2.55;
      let nav_bg_color = stat.theme.nav_bar_bg * 2.55;
      let card_bg_color = stat.theme.card_bg * 2.55;
      let content_color = stat.theme.content_color * 2.55;

      app_bg_color = app_bg_color + 2.55 * brightness;
      nav_bg_color = nav_bg_color + 2.55 * brightness;
      card_bg_color = card_bg_color + 2.55 * brightness;
      content_color = Math.abs(2.55 * brightness - content_color);
      // console.log(content_color)
      stat.theme_color = {
         app_bg: `rgba(${app_bg_color}, ${app_bg_color}, ${app_bg_color})`,
         nav_bg: `rgba(${nav_bg_color}, ${nav_bg_color}, ${nav_bg_color})`,
         card_bg: `rgba(${card_bg_color}, ${card_bg_color}, ${card_bg_color})`,
         content: `rgba(${content_color}, ${content_color}, ${content_color},1)`,
      };
   },

   SET_MESSAGE(stat, res) {
      stat.snackbar = {
         show: true,
         text: res.msg,
         color: res.code == 0 ? "success" : "error",
      };
   }
};

export default {
   state,
   getters,
   actions,
   mutations
};