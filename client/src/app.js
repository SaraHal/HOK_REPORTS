import Vue from 'vue';
import VueRouter from 'vue-router'

import './components/organizations.component'
import './components/datePicker.component'
import CollectionReportPage from './pages/collectionReport.page'
Vue.use(VueRouter)


const routes = [
  { path: '/', component: CollectionReportPage },

]
const router = new VueRouter({
  routes
})

const app = new Vue({
  router
}).$mount('#app')
