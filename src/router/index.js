import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Documents',
    component: () => import('../views/Documents.vue')
  },
  {
    path: '/ebas_viz',
    name: 'EBAS Data visualization',
    component: () => import('../views/Ebas_viz.vue')
  },
  {
    path: '/dehm_viz',
    name: 'DEHM Output Visualization',
    component: () => import('../views/Dehm_viz.vue')
  },
  {
    path: '/dehm_eval',
    name: 'DEHM Output Evaluations',
    component: () => import('../views/Dehm_eval.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Settings.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
