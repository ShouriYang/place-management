import Vue from 'vue'
import VueRouter from 'vue-router'
const AnnouncementList = () => import('@/views/announcement-list.vue')
const App = () => import('@/App.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'app',
    redirect: '/announcementList',
    component: App
  },
  {
    path: '/announcementList',
    name: 'AnnouncementList',
    components: {
      AnnouncementList: AnnouncementList
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
