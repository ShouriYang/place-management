<template>
  <div class="user-list">
    <div class="list-title">
      <el-alert
        title="用户管理"
        center
        type="success"
        :closable="false">
      </el-alert>
    <el-divider></el-divider>
      <el-table
        class="list-table"
        v-loading="loadingData"
        border
        :data="userList"
        :row-class-name="tableRowClassName"
        style="width: 100%">
        <el-table-column
          label="用户名"
          width="180">
          <template slot-scope="scope">
            <span>{{ scope.row.userName }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="学院/组织"
          width="280">
          <template slot-scope="scope">
            <div class="cell-with-icon">
              <img class="user-college" src="../assets/user-college.png" alt="">
              <span style="margin-left: 10px">{{ scope.row.college }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          label="联系方式"
          width="180">
          <template slot-scope="scope">
            <div class="cell-with-icon">
              <img class="user-college" src="../assets/user-contact.png" alt="">
              <span style="margin-left: 10px">{{ scope.row.contact }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              v-if="scope.row.options === '2' && enableEdit"
              size="mini"
              @click="handlePass(scope.row)">申请通过</el-button>
            <el-button
              v-if="scope.row.options === '1' && enableEdit"
              size="mini"
              type="danger"
              @click="handleDisable(scope.row)">禁用用户</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import placeMixin from '@/plugins/mixins/place-mixin'
  export default {
    name: 'UserList',
    mixins:[placeMixin],
    data() {
      return {
        userList:[],
        loadingData:false
      };
    },
    mounted () {
      this.getUserData()
    },
    computed: {
    },
    methods: {
      getUserData(){
        this.loadingData = true
        setTimeout(()=>{
          this.$http.get('user').then(res=>{
            if(res.status===200){
              this.loadingData = false
              this.userList = res.data
            }
          }).catch(err=>{
            this.loadingData = false
            this.$message.error(err.message)
          })
        },1000)
      },
      handlePass(row) {
        this.$http.post(`user/pass/${row._id}`).then(res=>{
          if(res.status===200){
            this.getUserData()
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      handleDisable(row) {
        this.$http.post(`user/disable/${row._id}`).then(res=>{
          if(res.status===200){
            this.getUserData()
          }
        }).catch(err=>{
          this.$message.error(err.message)
        })
      },
      tableRowClassName({row}) {
        if (row.options === '2') {
          return 'warning-row'
        }
      }
    }
  }
</script>
<style>
  .list-table{
    margin: 20px 0 20px 0;
  }
  .user-college{
    height: 16px;
    width: 16px;
  }
  .el-table .warning-row {
    background: oldlace;
  }
</style>
