import AppBar from './ui/AppBar.vue'
import Account from './ui/Account.vue'
import LoginRegister from './ui/LoginRegister.vue'
import Message from './ui/Message.vue'
import Footer from './ui/Footer.vue'

import NavHome from './ui/NavHome.vue'
import NavSetting from './ui/NavSetting.vue'
import NavEBAS from './ui/NavEBAS.vue'
import NavDEHM from './ui/NavDEHM.vue'

import ComponentSetting from './settings/component_setting.vue'
import ThemeSetting from './settings/theme_setting.vue'
import UserSetting from './settings/user_setting.vue'
import FileSetting from './settings/file_setting.vue'


import Ccompoents from './chemicals/Ccompoents.vue'
import Cgroups from './chemicals/Cgroups.vue'
import NewComponent from './chemicals/new_component.vue'


import EBAS from './ebas/EBAS.vue'
import EBASQuery from './ebas/EBAS_query.vue'
import EBASTable from './ebas/EBAS_table.vue'
import EBASPlot from './ebas/EBAS_plot.vue'
import EBASMap from './ebas/EBAS_map.vue'
import EBASSetting from './ebas/EBAS_setting.vue'

import DEHMSetting from './dehm/DEHM_setting.vue'
import DEHMCase from './dehm/DEHM_case.vue'
import DEHMPlot from './dehm/DEHM_plot.vue'
import DEHMMap from './dehm/DEHM_heatmap.vue'


import EditableTable from './toolbox/editable_table.vue'
import FigSetting from './toolbox/fig_setting.vue'
import MapSetting from './toolbox/map_setting.vue'



const installObj = {
  // install component
  install: function (Vue) {
    // app ui
    Vue.component('AppBar', AppBar)
    Vue.component('Account', Account)
    Vue.component('LoginRegister', LoginRegister)
    Vue.component('Message', Message)
    Vue.component('Footer', Footer)

    // app tools
    Vue.component('EditableTable', EditableTable)
    Vue.component('FigSetting', FigSetting)
    Vue.component('MapSetting', MapSetting)
    
    // app nav bar
    Vue.component('NavHome', NavHome)
    Vue.component('NavSetting', NavSetting)
    Vue.component('NavEBAS', NavEBAS)
    Vue.component('NavDEHM', NavDEHM)

    
    // app settings
    Vue.component('ComponentSetting', ComponentSetting)
    Vue.component('ThemeSetting', ThemeSetting)
    Vue.component('UserSetting', UserSetting)
    Vue.component('FileSetting', FileSetting)
    
    // analytical groups and components
    Vue.component('Ccompoents', Ccompoents)
    Vue.component('Cgroups', Cgroups)
    Vue.component('NewComponent', NewComponent)

    // EBAS viz 
    Vue.component('EBAS', EBAS)
    Vue.component('EBASQuery', EBASQuery)
    Vue.component('EBASTable', EBASTable)
    Vue.component('EBASPlot', EBASPlot)
    Vue.component('EBASMap', EBASMap)
    Vue.component('EBASSetting', EBASSetting)

    // DEHM viz
    Vue.component('DEHMSetting', DEHMSetting)
    Vue.component('DEHMCase', DEHMCase)
    Vue.component('DEHMMap', DEHMMap)
    Vue.component('DEHMPlot', DEHMPlot)
  }
}

// export
export default installObj