<template>
  <div class="place-list">
    <div class="list-title">
      <el-alert
        title="场地管理"
        center
        type="success"
        :closable="false">
      </el-alert>
    </div>
    <el-divider></el-divider>
    <div class="list-header">
      <el-input placeholder="查询场地" v-model="searchInput" class="input-with-select header-search">
        <el-button slot="append" icon="el-icon-search" @click="searchPlace"></el-button>
      </el-input>
      <el-button type="primary" @click="addPlace" :disabled="!enableEdit">+ 添加场地</el-button>
    </div>
    <div class="list-content" v-loading="loadingData">
      <el-table
        class="list-table"
        v-loading="loadingData"
        border
        :data="placeList"
        style="width: 100%">
        <el-table-column
          label="名称"
          width="180">
          <template slot-scope="scope">
              <span>{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="类别"
          width="180">
          <template slot-scope="scope">
              <el-tag size="medium">{{ scope.row.type }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column
          label="位置信息"
          width="320">
          <template slot-scope="scope">
            <div class="cell-with-icon">
              <img class="place-name" src="../assets/place-name-icon.png" alt="place">
              <span style="margin-left: 10px">{{ scope.row.location }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="容纳人数"
          width="80">
          <template slot-scope="scope">
            <div class="cell-with-icon">
              <img class="place-capacity" src="../assets/place-capacity.png" alt="place">
              <span style="margin-left: 10px">{{ scope.row.capacity }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="使用状态"
          width="100">
          <template slot-scope="scope">
            <i :class="statusIcon[scope.row.status]"></i>
            <span style="margin-left: 10px">{{ statusMap[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === '0' && !enableEdit"
              size="mini"
              @click="handleApply(scope.row)">申请使用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <add-place-dialog
      :isOpen="addPlaceDialog.isOpen"
      @close="addPlaceDialog.isOpen = false"
      @getPlaceData="getPlaceData"
    />
    <apply-place-dialog
      :isOpen="applyPlaceDialog.isOpen"
      :placeId="applyPlaceDialog.placeId"
      @close="applyPlaceDialog.isOpen = false"
    />
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
import AddPlaceDialog from '@/components/place/add-place-dialog.vue'
import ApplyPlaceDialog from '@/components/place/apply-place-dialog.vue'
  export default {
    name: 'PlaceList',
    mixins:[placeMixin],
    components: {
      AddPlaceDialog,
      ApplyPlaceDialog
    },
    data() {
      return {
        searchInput: '',
        placeList:[],
        loadingData:false,
        addPlaceDialog:{
          isOpen: false
        },
        applyPlaceDialog:{
          isOpen: false,
          placeId: ''
        }
      };
    },
    mounted () {
      this.getPlaceData()
    },
    computed: {
    },
    methods: {
      getPlaceData(){
        this.loadingData = true
        setTimeout(()=>{
          this.$http.get('place',{
            params: {
              searchInput:this.searchInput
            }
          }).then(res=>{
            if(res.status===200){
              this.loadingData = false
              this.placeList = res.data
            }
          }).catch(err=>{
            this.loadingData = false
            this.$message.error(err.message)
          })
        },1000)
      },
      addPlace(){
        this.addPlaceDialog.isOpen = true
      },
      handleApply(row){
        this.applyPlaceDialog.isOpen = true
        this.applyPlaceDialog.placeId = row._id
      },
      // handleApply(row){
      //   const data = {
      //     userId: localStorage.token,
      //     placeId: row._id
      //   }
      //   this.$http.post('apply',data).then(res=>{
      //     if(res.status===200){
      //       this.$message.success("申请成功,请等待管理员审核")
      //     }else if (res.status===201){
      //       this.$message.error(res.data.message)
      //     }
      //   }).catch(err=>{
      //     this.$message.error(err.message)
      //   })
      // },
      searchPlace(){
        this.getPlaceData()
      }
    }
  }
</script>
<style lang="scss" scoped>
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
  .place-card{
    margin-bottom: 8px;
  }
  .el-icon-success{
    color: #67C23A;
  }
  .el-icon-error{
    color: #F56C6C;
  }
  .content-footer{
    margin-top: 12px;
  }
</style>
