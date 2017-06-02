import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../components/search.vue'
import Sent from '../components/sent.vue'
import List from '../components/list.vue'
Vue.use(VueRouter);

const routes = [
  { path: '/search', name: 'search', component: Search },
  { path: '/sent', name: 'sent', component: Sent },
  { path: '/list', name: 'list', component: List },
]

const router = new VueRouter({
  linkActiveClass: 'active',
  routes
})

router.push({ name: 'search'})

export default router;
