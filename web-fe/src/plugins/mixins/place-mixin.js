
import {mapState , mapMutations} from 'vuex'
export default {
  data () {
    return {
      
    }
  },
  computed: {
    ...mapState(['loginUser']),
    listType () {
      return this.$route.path==='/' ? 'announcementList' : this.$route.path.split('/')[1]
    },
    enableEdit () {
      return localStorage.options === '0'
    },
    statusMap () {
      return {
        '0': '可申请',
        '1': '已占用'
      }
    },
    statusIcon () {
      return {
        '0': 'el-icon-success',
        '1': 'el-icon-error'
      }
    },
    menuMap () {
      const allMaps = [
        {
          title:'公告管理',
          key:'announcementList',
          icon:'el-icon-message-solid',
        },
        {
          title:'场地管理',
          key:'placeList',
          icon:'el-icon-s-home',
        },
        {
          title:'申请管理',
          key:'applyList',
          icon:'el-icon-s-claim',
        },
        {
          title:'用户管理',
          key:'userList',
          icon:'el-icon-user-solid',
        }
      ]
      return allMaps
    }
  },
  methods: {
    ...mapMutations(['updateLoginUser'])
  }
}