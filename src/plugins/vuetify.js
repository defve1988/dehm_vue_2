import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import au_logo from "@/assets/au_logo";


Vue.use(Vuetify);

export default new Vuetify({
   theme: {
      themes: {
         light: {
            primary: '#333',
            secondary: '#9F9F9F',
            success: '#20c948',
            accent: '#E91E63',
            error: '#F44336',
            info: '#26A69A',
            warning: '#FF9800',
            light: '#EEEEEE',
            dark: '#424242',
            background: '#424242'
         },
         dark: {
            light: '#EEEEEE',
            dark: '#424242'
         },
      },
   },
   icons: {
      values: {
         au_logo: { // name of our custom icon
          component: au_logo, // our custom component
        },
      },
    },
});
