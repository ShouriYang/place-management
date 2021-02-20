<template>
  <div class="announcement-list">
    <div class="list-title">
      <el-alert
        title="公告管理"
        center
        type="success"
        :closable="false">
      </el-alert>
    </div>
    <el-divider></el-divider>
    <div class="list-header">
      <el-input placeholder="查询公告" v-model="searchInput" class="input-with-select header-search">
        <el-button slot="append" icon="el-icon-search" @click="searchAnnouncement"></el-button>
      </el-input>
      <el-button type="primary" @click="publishAnnouncement" :disabled="!enableEdit">+ 发布公告</el-button>
    </div>
    <div class="list-content" v-loading="loadingData">
      <el-card 
        v-for="(announcement,index) in announcementList" 
        class="announcement-card"
        :key="index">
        <div slot="header">
          <div class="cell-with-icon">
            <img src="../assets/announcement-title.png" alt="">
            <span style="margin-left: 10px">{{announcement.title}}</span>
          </div>
        </div>
        <div>
          <span>{{announcement.content}}</span>
          <div class="content-footer">
            <time class="time">{{ announcement.date }}</time>
            <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="你确定要删除这则公告吗？"
              @confirm="deleteConfirm(announcement._id)"
            >
              <el-button slot="reference" type="text" class="delete-btn" :disabled="!enableEdit">
                <i class="el-icon-delete"></i>
                删除
              </el-button>
            </el-popconfirm>
          </div>
        </div>
      </el-card>
    </div>
    <add-announcement-dialog
      :isOpen="addAnnouncementDialog.isOpen"
      @close="addAnnouncementDialog.isOpen = false"
      @getAnnouncementData="getAnnouncementData"
    />
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
import AddAnnouncementDialog from '@/components/announcement/add-announcement-dialog.vue'
  export default {
    name: 'AnnouncementList',
    mixins:[placeMixin],
    components: {
      AddAnnouncementDialog
    },
    data() {
      return {
        searchInput: '',
        announcementList:[],
        loadingData:false,
        addAnnouncementDialog:{
          isOpen: false
        },
        deleteAnnouncementDialog:{
          isOpen: false
        }
      };
    },
    mounted () {
      this.getAnnouncementData()
    },
    computed: {
    },
    methods: {
      getAnnouncementData(){
        this.loadingData = true
        setTimeout(()=>{
          this.$http.get('announcement',{
            params: {
              searchInput:this.searchInput
            }
          }).then(res=>{
            if(res.status===200){
              this.loadingData = false
              this.announcementList = res.data
            }
          }).catch(err=>{
            this.loadingData = false
            this.$message.error(err.message)
          })
        },1000)
      },
      publishAnnouncement(){
        this.addAnnouncementDialog.isOpen = true
      },
      deleteConfirm(id){
        this.$http.delete(`announcement/${id}`).then(res=>{
          if(res.status===200){
            this.$message.success('删除公告成功')
            this.getAnnouncementData()
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      searchAnnouncement(){
        this.getAnnouncementData()
      }
    }
  }
</script>
<style lang="scss">
  .list-header{
    margin: 12px 0 12px 0;
    display: flex;
    justify-content: space-between;
    .header-search{
      max-width: 250px;
    }
  }
  .time {
    font-size: 13px;
    color: #999;
  }
  .delete-btn {
    padding: 0;
    float: right;
    color: #f56c6c;
  }
  .delete-btn:focus, .delete-btn:hover{
    color: #f56c6c;
  }
  .announcement-card{
    margin-bottom: 8px;
  }
  .content-footer{
    margin-top: 12px;
  }
</style>
