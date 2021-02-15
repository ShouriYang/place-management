import Vue from 'vue'
import VueRouter from 'vue-router'
const AnnouncementList = () => import('@/views/announcement-list.vue')
const PlaceList = () => import('@/views/place-list.vue')
const ApplyList = () => import('@/views/apply-list.vue')
const UserList = () => import('@/views/user-list.vue')
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
  },
  {
    path: '/placeList',
    name: 'PlaceList',
    components: {
      PlaceList: PlaceList
    }
  },
  {
    path: '/applyList',
    name: 'ApplyList',
    components: {
      ApplyList: ApplyList
    }
  },
  {
    path: '/userList',
    name: 'UserList',
    components: {
      UserList: UserList
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
