import Vue from 'vue';
import VueRouter from 'vue-router'

import './components/organizations.component'
import './components/datePicker.component'
import CollectionReportPage from './pages/collectionReport.page'
import './style/bootstrap.min.css';
import './style/style.scss';

Vue.use(VueRouter)


const routes = [
  { path: '/', component: CollectionReportPage },

]
const router = new VueRouter({
  routes
})

const element = document.createElement('div')
element.innerHTML = `<div id="app" class="container">
<h1>דוח גביה</h1>
<router-view></router-view>
</div>`;
document.body.appendChild(element);

const app = new Vue({
  router
}).$mount('#app')
