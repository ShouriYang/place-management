<template>
  <div class="announcement-list">
    <div class="list-title">
      <el-tag style="fontSize:16px">公告管理</el-tag>
    </div>
    <div class="list-header">
      <el-input
        class="header-search"
        placeholder="查询公告"
        prefix-icon="el-icon-search"
        v-model="searchInput">
      </el-input>
      <el-button type="primary" @click="publishAnnouncement">+ 发布公告</el-button>
    </div>
    <div class="list-content" v-loading="loadingData">
      <el-card 
        v-for="(announcement,index) in announcementList" 
        class="announcement-card"
        :key="index">
        <div>
          <span>{{announcement.content}}</span>
          <div>
            <time class="time">{{ announcement.createTime }}</time>
            <el-popconfirm
              confirm-button-text='确定'
              cancel-button-text='取消'
              icon="el-icon-info"
              icon-color="red"
              title="你确定要删除这则公告吗？"
              @confirm="deleteConfirm(announcement.id)"
            >
              <el-button slot="reference" type="text" class="delete-btn">删除</el-button>
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
          this.loadingData = false
          this.announcementList = [
          {
            id:'daffdsf',
            content:'黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕',
            createTime:new Date()
          },
          {
            id:'daffdsf',
            content:'黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕',
            createTime:new Date()
          },
          {
            id:'daffdsf',
            content:'黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕黄金糕',
            createTime:new Date()
          }
          ]
        },1000)
      },
      publishAnnouncement(){
        this.addAnnouncementDialog.isOpen = true
      },
      deleteConfirm(id){
        console.log(id);
      }
    }
  }
</script>
<style lang="scss">
  .list-title{
    text-align: center;
  }
  .list-header{
    margin: 12px 0 12px 0;
    display: flex;
    justify-content: space-between;
    .header-search{
      max-width: 200px;
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
  .announcement-card{
    margin-bottom: 8px;
  }
</style>
