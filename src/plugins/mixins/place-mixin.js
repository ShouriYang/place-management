export default {
  data () {
    return {
      
    }
  },
  computed: {
    listType () {
      return this.$route.path==='/' ? 'announcementList' : this.$route.path.split('/')[1]
    }
  },
  methods: {
    
  }
}