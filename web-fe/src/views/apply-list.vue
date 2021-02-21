<template>
  <div class="apply-list">
    <div class="list-title">
      <el-alert
        title="申请管理"
        center
        type="success"
        :closable="false">
      </el-alert>
    </div>
    <el-divider></el-divider>
      <div class="list-content" v-loading="loadingData">
      <el-table
        class="list-table"
        v-loading="loadingData"
        border
        :data="applyList"
        style="width: 100%">
        <el-table-column
          type="index"
          width="50">
        </el-table-column>
        <el-table-column
          label="场地名称"
          width="180">
          <template slot-scope="scope">
              <span>{{ scope.row.applyPlaceName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="场地位置"
          width="180">
          <template slot-scope="scope">
            <div class="cell-with-icon">
              <img class="place-name" src="../assets/place-name-icon.png" alt="place">
              <span style="margin-left: 10px">{{ scope.row.applyPlaceLocation}}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="申请人"
          width="100">
          <template slot-scope="scope">
            <!-- <div class="cell-with-icon"> -->
              <!-- <img class="place-name" src="../assets/place-name-icon.png" alt="place"> -->
              <span>{{ scope.row.applyUserName }}</span>
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="120">
          <template slot-scope="scope">
            <!-- <div class="cell-with-icon"> -->
              <!-- <img class="place-capacity" src="../assets/place-capacity.png" alt="place"> -->
              <span>{{ scope.row.applyUserContact }}</span>
            <!-- </div> -->
          </template>
        </el-table-column>
        <el-table-column
          label="申请状态"
          width="120">
          <template slot-scope="scope">
            <i :class="applyStatusIcon[scope.row.status]"></i>
            <span style="margin-left: 10px">{{ applyStatusMap[scope.row.status] }}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.status === '0' && enableEdit"
              size="mini" @click="handlePass(scope.row._id)">通过申请
            </el-button>
            <el-button
              v-if="scope.row.status === '0' && enableEdit"
              size="mini" @click="handleRefuse(scope.row._id)">拒绝申请
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'ApplyList',
    mixins:[placeMixin],
    data() {
      return {
        searchInput: '',
        applyList:[],
        loadingData:false
      };
    },
    mounted () {
      this.getApplyData()
    },
    computed: {
    },
    methods: {
      getApplyData(){
        this.loadingData = true
        setTimeout(()=>{
          this.$http.get('apply',{
            params: {
              searchInput:this.searchInput
            }
          }).then(res=>{
            if(res.status===200){
              this.loadingData = false
              this.applyList = res.data
            }
          }).catch(err=>{
            this.loadingData = false
            this.$message.error(err.message)
          })
        },1000)
      },
      handlePass(id){
        this.$http.put(`apply/pass/${id}`).then(res=>{
          if(res.status===200){
            this.getApplyData()
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      handleRefuse(id){
        this.$http.put(`apply/refuse/${id}`).then(res=>{
          if(res.status===200){
            this.getApplyData()
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      handleApply(row){
        this.applyPlaceDialog.isOpen = true
        this.applyPlaceDialog.placeId = row._id
      },
      searchPlace(){
        this.getApplyData()
      }
    }
  }
</script>
<style lang='scss' scpoed>
  .el-icon-question{
    color: #E6A23C;
  }
  .el-icon-success{
    color: #67C23A;
  }
  .el-icon-error{
    color: #F56C6C;
  }
</style>
