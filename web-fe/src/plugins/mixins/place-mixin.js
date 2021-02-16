export default {
  data () {
    return {
      
    }
  },
  computed: {
    listType () {
      return this.$route.path==='/' ? 'announcementList' : this.$route.path.split('/')[1]
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
    
  }
}